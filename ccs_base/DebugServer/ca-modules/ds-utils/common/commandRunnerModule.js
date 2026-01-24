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
exports.createCommandRunnerModule = createCommandRunnerModule;
const child_process_1 = require("child_process");
const path = __importStar(require("path"));
async function createCommandRunnerModule(runnerName, logger, { cloudAgentDir }, onClose) {
    // Track sub-processes so we can kill any that are still running when we are closed
    let nextSubProcessId = 1;
    const subProcesses = {};
    // We don't know where CloudAgent is, so we need to import at run-time
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { createModule } = require(path.join(cloudAgentDir, "module.js"));
    function log(msg) {
        logger.info(`[${runnerName}] ${msg}`);
    }
    const module = await createModule(runnerName);
    // eslint-disable-next-line @typescript-eslint/require-await
    module.commands.onClose = async () => {
        const stillRunning = Object.values(subProcesses);
        if (stillRunning) {
            log("Warning: Module is closing with child processes still running. They will be terminated.");
        }
        for (const child of stillRunning) {
            child.kill();
        }
        onClose();
    };
    module.run = async (command, args, options, timeout) => {
        const subProcessId = nextSubProcessId++;
        return new Promise((resolve, reject) => {
            log(`Spawning child process ${subProcessId} with command ${command} and args ${args.join(", ")}`);
            const controller = new AbortController();
            const { signal } = controller;
            const spawnOptions = {
                ...options,
                stdio: ["ignore", "pipe", "pipe"],
                signal,
            };
            const child = (0, child_process_1.spawn)(command, args, spawnOptions);
            subProcesses[subProcessId] = child;
            const childTimeout = timeout && setTimeout(() => {
                log(`Child process ${subProcessId} timed out (timeout: ${timeout})`);
                reject(new Error("Script timed out"));
                controller.abort();
            }, timeout);
            const forwardOutput = (data) => module.triggerEvent("output", { data: data.toString() });
            child.stdout.on("data", forwardOutput);
            child.stderr.on("data", forwardOutput);
            child.on("close", (exitCode) => {
                log(`Child process ${subProcessId} closed with exit code ${exitCode}`);
                // Exit code should only be null if process failed to start, but then error event is emitted first.
                resolve({ exitCode: exitCode });
                if (childTimeout) {
                    clearTimeout(childTimeout);
                }
            });
            child.on("error", (err) => {
                log(`Child process ${subProcessId} error: ${err.message}`);
                reject(err);
                if (childTimeout) {
                    clearTimeout(childTimeout);
                }
                child.kill();
            });
        }).finally(() => {
            delete subProcesses[subProcessId];
        });
    };
    return module;
}
