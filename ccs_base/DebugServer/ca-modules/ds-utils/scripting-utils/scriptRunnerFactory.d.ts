import * as loggerDef from "ticloudagent/host/logger";
import { HostAgentSetupArgs } from "ticloudagent/host/agentWrapper";
import { WebSocketModuleFactory } from "ticloudagent/host/module";
declare function createScriptRunner(runnerName: string, logger: typeof loggerDef, hostAgentSetupArgs: HostAgentSetupArgs, onClose: () => void): Promise<{
    port: number;
}>;
export declare function createScriptRunnerFactory(...args: Parameters<typeof createScriptRunner>): WebSocketModuleFactory;
export {};
