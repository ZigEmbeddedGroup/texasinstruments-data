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
const syncAgent_1 = require("scripting/syncAgent");
const scriptingWrapper_1 = require("scripting/scriptingWrapper");
const scripting_1 = require("scripting");
const repl = __importStar(require("repl"));
const util = __importStar(require("util"));
if (process.argv.length <= 3) {
    console.error("Error: too few arguments provided");
    process.exit(1);
}
const cloudAgentDir = process.argv[2];
let consoleMgrPort;
try {
    consoleMgrPort = Number(process.argv[3]);
}
catch (err) {
    console.error("Error: expected first argument to be a number");
    process.exit(1);
}
const syncEnv = (0, syncAgent_1.setupSynchronousClient)(cloudAgentDir);
const consoleMgr = syncEnv.createModule(consoleMgrPort);
// First we start listening for an event telling us to shutdown so we don't stay open
// when we shouldn't
consoleMgr.addListener("exit", () => {
    consoleMgr.logMessage("closing repl");
    server.close();
});
// Interrupt any ongoing blocking operations if we get a SIGINT signal
consoleMgr.addListener("SIGINT", () => { syncEnv.interruptWaits("User interrupt"); });
let setupInfo;
try {
    setupInfo = consoleMgr.getSetupInfo();
}
catch {
    process.exit(0);
}
// Module objects are printed too verbosely by default. We hook into openSession to
// keep a list of module objects so we can print them more briefly.
const moduleObjects = new Map();
function hookOpenSession(module) {
    moduleObjects.set(module, "[DebuggerScripting]");
    const origOpenSession = module.openSession.bind(module);
    module.openSession = function (...args) {
        const session = origOpenSession(...args);
        moduleObjects.set(session, `[Session: ${session.getName()}]`);
        return session;
    };
    return module;
}
const { prompt, replOptions, historyFile } = setupInfo;
function writer(val) {
    const repr = moduleObjects.get(val);
    return repr || util.inspect(val, { colors: replOptions?.useColors ?? true });
}
const server = repl.start({
    prompt,
    terminal: true,
    writer,
    ...replOptions
});
if (historyFile) {
    server.setupHistory(historyFile, (err) => { if (err) {
        console.error(err);
    } });
}
server.on("exit", () => {
    consoleMgr.logMessage("server exited");
    syncEnv.shutdown();
    process.exit(0);
});
let ds;
function resetContext(context) {
    moduleObjects.clear();
    const cloudAgentPort = Number(process.env["TI_CLOUD_AGENT_PORT"]);
    ds = hookOpenSession((0, scriptingWrapper_1.initScriptingConsole)(syncEnv, cloudAgentPort));
    context.ds = ds;
    context.initScripting = () => ds;
    context.ScriptingTimeoutError = scripting_1.ScriptingTimeoutError;
    context.sleep = scripting_1.sleep;
    refreshCommands(context);
}
function setProp(obj, path, value) {
    const [name, ...rest] = path;
    if (rest.length === 0) {
        obj[name] = value;
    }
    else {
        if (!obj[name]) {
            obj[name] = {};
        }
        setProp(obj[name], rest, value);
    }
}
function unsetProp(obj, path, expectedValue) {
    const [name, ...rest] = path;
    if (rest.length === 0) {
        if (obj[name] === expectedValue) {
            delete obj[name];
        }
    }
    else {
        if (name in obj) {
            unsetProp(obj[name], rest, expectedValue);
            if (Object.keys(obj[name]).length === 0) {
                delete obj[name];
            }
        }
    }
}
let commandRemovers = {};
function addCommand(command, context) {
    if (commandRemovers[command]) {
        consoleMgr.logMessage(`Cannot add external command '${command}', it already exists.`);
        throw new Error(`Command '${command}' already exists`);
    }
    const commandPath = command.split(".");
    const displayName = commandPath[commandPath.length - 1];
    let wasRemoved = false;
    const commandFn = (...args) => {
        if (wasRemoved) {
            throw new Error(`Command ${displayName} no longer exists`);
        }
        return consoleMgr.evalExternalCommand(command, args);
    };
    // Set the function name so it is displayed when inspected by the console
    Object.defineProperty(commandFn, "name", { value: displayName });
    setProp(context ?? server.context, commandPath, commandFn);
    commandRemovers[command] = () => {
        wasRemoved = true;
        consoleMgr.logMessage(`Removed external command '${command}'`);
        unsetProp(server.context, commandPath, commandFn);
        delete commandRemovers[command];
    };
    consoleMgr.logMessage(`Added external command '${command}'`);
}
function removeCommand(command) {
    const remover = commandRemovers[command];
    if (remover) {
        remover();
    }
    else {
        consoleMgr.logMessage(`Cannot remove external command '${command}'. It doesn't exist.`);
    }
}
function refreshCommands(context) {
    const commands = Object.keys(commandRemovers);
    commandRemovers = {};
    commands.forEach((name) => addCommand(name, context));
}
resetContext(server.context);
server.on("reset", resetContext);
consoleMgr.listExternalCommands().forEach((name) => addCommand(name));
consoleMgr.addListener("externalCommandAdded", ({ command }) => addCommand(command));
consoleMgr.addListener("externalCommandRemoved", ({ command }) => removeCommand(command));
