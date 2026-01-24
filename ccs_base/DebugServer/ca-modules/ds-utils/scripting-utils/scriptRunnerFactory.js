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
exports.createScriptRunnerFactory = createScriptRunnerFactory;
const path = __importStar(require("path"));
const commandRunnerModule_1 = require("../common/commandRunnerModule");
async function createScriptRunner(runnerName, logger, hostAgentSetupArgs, onClose) {
    const module = await (0, commandRunnerModule_1.createCommandRunnerModule)(runnerName, logger, hostAgentSetupArgs, onClose);
    module.commands.runScript = (filePath, timeout) => {
        const launcher = path.join(__dirname, "..", "launcher.mjs");
        // Pass CloudAgent port so script runner connects to same instance
        const { port: cloudAgentPort } = hostAgentSetupArgs;
        const env = {
            ...process.env,
            TI_CLOUD_AGENT_PORT: cloudAgentPort.toString(),
        };
        return module.run(process.argv[0], [launcher, filePath], { env }, timeout);
    };
    return { port: module.getPort() };
}
function createScriptRunnerFactory(...args) {
    const [name] = args;
    return {
        name,
        create() {
            return createScriptRunner(...args);
        },
    };
}
