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
exports.instance = instance;
const consoleFactory_1 = require("./scripting-utils/consoleFactory");
const path = __importStar(require("path"));
const util = __importStar(require("util"));
const worker_threads_1 = require("worker_threads");
const scriptRunnerFactory_1 = require("./scripting-utils/scriptRunnerFactory");
const connectionTester_1 = require("./connectionTester");
function instance(...[, createSiblingModule, logger, , getHostAgentSetupArgs,]) {
    let nextSubModuleId = 1;
    const hostAgentSetupArgs = getHostAgentSetupArgs();
    const self = {
        subModules: {
            ConnectionTester: (0, connectionTester_1.connectionTesterFactory)(logger, hostAgentSetupArgs)
        },
        commands: {
            async createConsole(prompt, options) {
                const subModuleName = `console${nextSubModuleId++}`;
                logger.info(`Creating console module '${subModuleName}'`);
                const dsModuleInfo = await createSiblingModule("DS");
                const onClose = () => { delete self.subModules[subModuleName]; };
                // node-pty prevents node.js from exiting if we don't kill the pty.
                // However, if we kill the pty, node-pty crashes the entire node process
                // 10 seconds after we kill the pty. Disable it by default for now.
                options = { noPty: false, ...options };
                self.subModules[subModuleName] = (0, consoleFactory_1.createConsoleFactory)(subModuleName, { ...options, prompt, dsModuleInfo }, logger, hostAgentSetupArgs, onClose);
                return { consoleModule: subModuleName };
            },
            createScriptRunner() {
                const subModuleName = `runner${nextSubModuleId++}`;
                logger.info(`Creating scriptRunner module '${subModuleName}'`);
                const onClose = () => { delete self.subModules[subModuleName]; };
                self.subModules[subModuleName] = (0, scriptRunnerFactory_1.createScriptRunnerFactory)(subModuleName, logger, hostAgentSetupArgs, onClose);
                return Promise.resolve({ runnerModule: subModuleName });
            },
            async execScriptingAction(action, sessionObjects, timeout) {
                const actionWorkerMain = path.join(__dirname, "scripting-utils", "actionMain.js");
                const workerData = {
                    cloudAgentDir: path.dirname(hostAgentSetupArgs.cloudAgentDir),
                    cloudAgentPort: hostAgentSetupArgs.port,
                    action,
                    timeout,
                    sessionObjects,
                };
                const workerOptions = {
                    stdin: false,
                    stdout: true,
                    stderr: true,
                    workerData,
                    name: "Scripting Action Worker",
                };
                return new Promise((resolve, reject) => {
                    logger.info(`Starting scripting action worker with ${util.inspect(workerOptions)}`);
                    const worker = new worker_threads_1.Worker(actionWorkerMain, workerOptions);
                    worker.on("message", (data) => {
                        logger.info(`received ${util.inspect(data)} from action worker`);
                        if ("error" in data) {
                            reject(data.error);
                        }
                        else {
                            resolve();
                        }
                    });
                    worker.on("error", (error) => reject(error));
                });
            },
        },
    };
    return self;
}
