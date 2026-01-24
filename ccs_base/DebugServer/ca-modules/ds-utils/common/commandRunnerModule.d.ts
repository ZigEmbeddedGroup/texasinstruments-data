import * as loggerDef from "ticloudagent/host/logger";
import { HostAgentSetupArgs } from "ticloudagent/host/agentWrapper";
import { WebSocketModule } from "ticloudagent/host/module";
import { SpawnOptionsWithStdioTuple, StdioNull, StdioPipe } from "child_process";
import { SubProcessResult } from "../index";
type RunOptions = Omit<SpawnOptionsWithStdioTuple<StdioNull, StdioPipe, StdioPipe>, "stdio" | "signal">;
interface CommandRunnerWebSocketModule extends WebSocketModule {
    /**
     * Spawn the specified command as a child process with the provided args and options.
     */
    run(command: string, args: string[], options: RunOptions, timeout?: number): Promise<SubProcessResult>;
}
export declare function createCommandRunnerModule(runnerName: string, logger: typeof loggerDef, { cloudAgentDir }: HostAgentSetupArgs, onClose: () => void): Promise<CommandRunnerWebSocketModule>;
export {};
