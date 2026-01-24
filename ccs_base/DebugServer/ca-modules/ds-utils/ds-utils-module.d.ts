import { Module, ModuleFactory } from "ticloudagent/host/module";
import { DSUtils } from "./index";
interface DSUtilsModule extends Module {
    commands: Omit<DSUtils, "getSubModule" | "addListener" | "removeListener">;
}
export declare function instance(...[, createSiblingModule, logger, , getHostAgentSetupArgs,]: Parameters<ModuleFactory["instance"]>): DSUtilsModule;
export {};
