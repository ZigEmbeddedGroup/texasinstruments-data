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
exports.connectionTesterFactory = connectionTesterFactory;
const commandRunnerModule_1 = require("./common/commandRunnerModule");
const path = __importStar(require("path"));
function connectionTesterFactory(logger, hostAgentSetupArgs) {
    const { cloudAgentDir } = hostAgentSetupArgs;
    // We don't know where CloudAgent is, so we need to import at run-time
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { constructHostAgent } = require(path.join(cloudAgentDir, "agentWrapper.js"));
    const name = "ConnectionTester";
    return {
        name,
        async create() {
            const module = await (0, commandRunnerModule_1.createCommandRunnerModule)(name, logger, hostAgentSetupArgs, () => { });
            const getDiagnosticCommand = async (ccxmlFile, connectionIndex, skipSubstitution) => {
                let cloudAgent;
                let ds;
                try {
                    cloudAgent = await constructHostAgent(hostAgentSetupArgs);
                    ds = await cloudAgent.getSubModule("DS");
                    const { command } = await ds.getDiagnosticCommand(ccxmlFile, connectionIndex, skipSubstitution);
                    return command;
                }
                finally {
                    if (ds) {
                        await ds.close();
                    }
                    if (cloudAgent) {
                        await cloudAgent.close();
                    }
                }
            };
            module.commands.canTestConnection = async (ccxmlFile, connectionIndex) => {
                const command = await getDiagnosticCommand(ccxmlFile, connectionIndex, true);
                return { isSupported: command !== "" };
            };
            module.commands.testConnection = async (ccxmlFile, connectionIndex, timeout) => {
                const command = await getDiagnosticCommand(ccxmlFile, connectionIndex);
                if (command === "") {
                    throw new Error("Connection test is not supported for this connection");
                }
                return await module.run(command, [], { shell: true }, timeout);
            };
            return { port: module.getPort() };
        },
    };
}
