import { AppConfig } from '../lib/appConfig';
import { Vars } from '../lib/vars';
import { TriggerEvent, CommonParams } from './util';
import { Logger } from '../utils/logging';
import { LocalInfo } from './external-apis';
export interface CloudAgentLogger {
    info: (msg: any) => void;
}
interface EventBroker {
    fetchData: (dataName: string) => any;
    hasData: (dataName: string) => boolean;
}
interface InitParams {
    ccsPort: number;
    proxy: string | null;
    isTheia: boolean;
}
export declare class EntryModuleBase {
    protected readonly triggerEvent: TriggerEvent;
    private readonly loggerInput;
    protected readonly eventBroker: EventBroker;
    private readonly getProxy?;
    protected commonParams: CommonParams;
    protected logger: Logger;
    protected vars: Vars;
    private config;
    private rex3Config;
    private initPromiseBase;
    constructor(triggerEvent: TriggerEvent, loggerInput: CloudAgentLogger, eventBroker: EventBroker, getProxy?: ((url: string) => Promise<string>) | undefined, config?: AppConfig, rex3Config?: AppConfig);
    init(params: InitParams): Promise<void>;
    /**
     * Called by cloud agent when the last client is gone to perform any clean up
     * Must be synchronous, or else cloud agent must be updated
     *
     */
    onClose(): void;
    getConfig(): Promise<AppConfig>;
    getVersion(): Promise<string>;
    getLocalInfo(): Promise<LocalInfo>;
    _addProgressTask(): Promise<(task: Promise<any>) => string>;
    /**
     * Private Functions
     * Note: all private functions must start with _ or will be exposed by agent.js (which uses
     * run time reflection, not typescript)
     */
    private _initInnerBase;
    private _setupProxy;
}
export declare function handleResponse<T>(promise: Promise<T>): Promise<T>;
export {};
