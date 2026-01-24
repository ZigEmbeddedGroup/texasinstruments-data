"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConsoleFactory = createConsoleFactory;
const child_process_1 = require("child_process");
const path = __importStar(require("path"));
const pty = __importStar(require("node-pty"));
async function createConsoleModule(consoleName, setupInfo, logger, { cloudAgentDir, port: cloudAgentPort }, onClose) {
    // We don't know where CloudAgent is, so we need to import at run-time
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { createModule } = require(path.join(cloudAgentDir, "module.js"));
    // Externally everything is async, but the actual commands might not need to await anything
    /* eslint-disable @typescript-eslint/require-await */
    function log(msg) {
        logger.info(`[${consoleName}] ${msg}`);
    }
    const module = await createModule(consoleName);
    const consoleMain = path.resolve(path.join(__dirname, "consoleMain.js"));
    const externalCommands = {};
    let nextCommandId = 1;
    const pendingCommands = {};
    const cleanup = () => {
        log("Cleaning up");
        try {
            if (cleanupConsole) {
                void cleanupConsole();
            }
            const pending = Object.values(pendingCommands);
            for (const { reject } of pending) {
                reject(new Error("Console has closed."));
            }
            // We might have been closed before the console process fully initialized
            consoleMgr.commands.getSetupInfo = () => {
                throw new Error("Console has already been closed.");
            };
            onClose();
        }
        catch (e) {
            log(`Error during cleanup: ${e.toString()}`);
        }
    };
    module.onClose = cleanup;
    const consoleMgr = await createModule(`${consoleName}Mgr`, cleanup);
    const consoleMgrCommands = {
        getSetupInfo: async () => {
            return { ...setupInfo, replOptions: { preview: !setupInfo.noPty, ...(setupInfo.replOptions || {}) } };
        },
        listExternalCommands: async () => {
            return Object.keys(externalCommands);
        },
        evalExternalCommand: async (command, args) => {
            if (!(command in externalCommands)) {
                throw new Error(`No command named ${command}`);
            }
            const commandId = nextCommandId++;
            const promise = new Promise((resolve, reject) => {
                pendingCommands[commandId] = { resolve, reject };
                module.triggerEvent("command", {
                    id: commandId, command, args, context: externalCommands[command],
                });
            });
            return promise.finally(() => { delete pendingCommands[commandId]; });
        },
        logMessage: async (msg) => { log(msg); },
    };
    const consoleCommands = {
        terminate: async () => cleanup(),
        interrupt: async () => { consoleMgr.triggerEvent("SIGINT"); },
        sendInput: async (input) => {
            if (input == "\x03") {
                // The Node.js REPL can only react to a CTRL-C when the event loop
                // has control. If the console is blocked on a synchronous call, it
                // will not process it until the call returns.
                // So if we see a CTRL-C, we fire a SIGINT event so that the thread
                // unblocks (to process the event) and then we can tell any blocking
                // calls that we are interrupting them.
                consoleMgr.triggerEvent("SIGINT");
            }
            await sendInputToConsole(input);
        },
        resize: (...args) => resizeConsole(...args),
        resolveCommand: async (commandId, result) => {
            const pending = pendingCommands[commandId];
            if (!pending) {
                throw new Error(`No pending command found for id ${commandId}`);
            }
            pending.resolve(result);
        },
        rejectCommand: async (commandId, errorMsg) => {
            const pending = pendingCommands[commandId];
            if (!pending) {
                throw new Error(`No pending command found for id ${commandId}`);
            }
            pending.reject(new Error(errorMsg));
        },
        registerCommand: async (command, context) => {
            if (command in externalCommands) {
                throw new Error(`A command named '${command}' already exists`);
            }
            externalCommands[command] = context;
            consoleMgr.triggerEvent("externalCommandAdded", { command });
        },
        unregisterCommand: async (command) => {
            if (!(command in externalCommands)) {
                throw new Error(`No command named '${command}' exists`);
            }
            delete externalCommands[command];
            consoleMgr.triggerEvent("externalCommandRemoved", { command });
        },
    };
    for (const [name, command] of Object.entries(consoleMgrCommands)) {
        consoleMgr.commands[name] = command;
    }
    for (const [name, command] of Object.entries(consoleCommands)) {
        module.commands[name] = command;
    }
    let cleanupConsole;
    let sendInputToConsole;
    let resizeConsole;
    // Environment variables for console:
    // * TI_CLOUD_AGENT_PORT: We set this so that any attempt to launch scripting
    //   in the console will connect to this CloudAgent instance instead of
    //   attempting to spawn a new one.
    // * NODE_PATH: We set this so that require("scripting") will work in the
    //   scripting console.
    const consoleEnv = {
        ...process.env,
        TI_CLOUD_AGENT_PORT: cloudAgentPort.toString(),
        NODE_PATH: path.join(path.dirname(__dirname), "node_modules"),
    };
    if (!setupInfo.noPty) {
        // Pseudo TTY console
        // Note: I have found that using conpty prevents Node.js from exiting
        let consolePty = pty.spawn(process.argv[0], [consoleMain, path.dirname(cloudAgentDir), consoleMgr.getPort().toString()], {
            name: consoleName,
            cols: 80,
            rows: 30,
            cwd: __dirname,
            useConpty: false,
            env: consoleEnv,
        });
        cleanupConsole = async () => {
            consoleMgr.triggerEvent("exit");
            cleanupConsole = null;
        };
        consolePty.onData((data) => module.triggerEvent("output", { data: data.toString() }));
        consolePty.onExit(({ exitCode, signal }) => {
            log(`console pty exited (code: ${exitCode}, signal: ${signal})`);
            if (consolePty) {
                log(`destroying console pty`);
                // Calling kill twice will crash us on Windows
                consolePty.kill();
                consolePty = null;
            }
            module.close();
        });
        sendInputToConsole = async (input) => consolePty?.write(input);
        resizeConsole = async (columns, rows) => consolePty?.resize(columns, rows);
    }
    else {
        // Plain console
        const consoleProc = (0, child_process_1.spawn)(process.argv[0], [consoleMain, path.dirname(cloudAgentDir), consoleMgr.getPort().toString()], { detached: true, env: consoleEnv });
        cleanupConsole = async () => {
            consoleMgr.triggerEvent("exit");
        };
        consoleProc.stdout.on("data", (data) => module.triggerEvent("output", { data: data.toString() }));
        consoleProc.stderr.on("data", (data) => module.triggerEvent("output", { data: data.toString() }));
        consoleProc.on("close", (code) => {
            log(`console process close event (code: ${code})`);
            module.close();
        });
        consoleProc.on("exit", (code) => {
            log(`console process exit event (code: ${code})`);
        });
        consoleProc.on("disconnect", () => {
            log("console process disconnect event");
        });
        consoleProc.on("error", (err) => {
            log(`console process error event (${err.toString()})`);
        });
        sendInputToConsole = async (input) => { consoleProc.stdin.write(input); };
        resizeConsole = async () => {
            throw new Error("Resizing is only supported for pseudo TTY");
        };
    }
    return { port: module.getPort() };
}
function createConsoleFactory(...args) {
    const [name] = args;
    return {
        name,
        create() {
            return createConsoleModule(...args);
        },
    };
}
