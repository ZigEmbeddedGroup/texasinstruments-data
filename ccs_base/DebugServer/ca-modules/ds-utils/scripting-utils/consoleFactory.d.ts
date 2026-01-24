import * as loggerDef from "ticloudagent/host/logger";
import { HostAgentSetupArgs } from "ticloudagent/host/agentWrapper";
import { ModuleInfo, WebSocketModuleFactory } from "ticloudagent/host/module";
import { Module } from "scripting/syncAgent";
import { ReplOptions } from "../index";
export interface ConsoleSetupInfo {
    prompt: string;
    dsModuleInfo: ModuleInfo;
    noPty?: boolean;
    historyFile?: string;
    replOptions?: ReplOptions;
}
export interface InternalConsoleMgrModule extends Module {
    getSetupInfo(): ConsoleSetupInfo;
    listExternalCommands(): string[];
    evalExternalCommand(command: string, args: unknown[]): unknown;
    addListener(event: "externalCommandAdded" | "externalCommandRemoved", listener: (args: {
        command: string;
    }) => void): void;
    removeListener(event: "externalCommandAdded" | "externalCommandRemoved", listener: (args: {
        command: string;
    }) => void): void;
    addListener(event: "SIGINT", listener: (_: void) => void): void;
    removeListener(event: "SIGINT", listener: (_: void) => void): void;
    addListener(event: "exit", listener: (_: void) => void): void;
    removeListener(event: "exit", listener: (_: void) => void): void;
    addListener(event: "close", listener: (_: void) => void): void;
    removeListener(event: "close", listener: (_: void) => void): void;
    logMessage(msg: string): void;
}
declare function createConsoleModule(consoleName: string, setupInfo: Omit<ConsoleSetupInfo, "preview">, logger: typeof loggerDef, { cloudAgentDir, port: cloudAgentPort }: HostAgentSetupArgs, onClose: () => void): Promise<{
    port: number;
}>;
export declare function createConsoleFactory(...args: Parameters<typeof createConsoleModule>): WebSocketModuleFactory;
export {};
