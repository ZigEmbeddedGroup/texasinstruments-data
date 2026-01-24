import * as loggerDef from "ticloudagent/host/logger";
import { HostAgentSetupArgs } from "ticloudagent/host/agentWrapper";
import { WebSocketModuleFactory } from "ticloudagent/host/module";
export declare function connectionTesterFactory(logger: typeof loggerDef, hostAgentSetupArgs: HostAgentSetupArgs): WebSocketModuleFactory;
