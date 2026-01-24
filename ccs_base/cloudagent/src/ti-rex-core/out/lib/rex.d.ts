import { Logger as DinfraLogger } from 'dinfra';
import { Log, LoggerManager } from '../utils/logging';
import { Vars } from './vars';
export interface RexObject {
    log: Log;
    loggerManager: LoggerManager;
    vars: Vars;
}
interface RexArgs {
    dinfraLogger: DinfraLogger;
    vars: Vars;
}
export declare function Rex(args: RexArgs): RexObject;
export declare function _getRex(): RexObject;
export {};
