"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const syncAgent_1 = require("scripting/syncAgent");
const errors_1 = require("scripting/errors");
const scriptingWrapper_1 = require("scripting/scriptingWrapper");
const worker_threads_1 = require("worker_threads");
if (!worker_threads_1.parentPort) {
    throw new Error("Must be run within worker thread");
}
const { cloudAgentDir, cloudAgentPort, action, timeout, sessionObjects, } = worker_threads_1.workerData;
let syncEnv;
try {
    syncEnv = (0, syncAgent_1.setupSynchronousClient)(cloudAgentDir, { TimeoutError: errors_1.ScriptingTimeoutError });
    if (timeout) {
        syncEnv.setTimeout(timeout);
    }
    const ds = (0, scriptingWrapper_1.initScriptingConsole)(syncEnv, cloudAgentPort);
    const argNames = Object.keys(sessionObjects);
    const argValues = Object.values(sessionObjects).map((core) => ds.openSession(core));
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const result = Function(...argNames, action)(...argValues);
    worker_threads_1.parentPort.postMessage({ result });
}
catch (error) {
    worker_threads_1.parentPort.postMessage({ error });
}
finally {
    syncEnv?.shutdown();
}
