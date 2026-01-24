import { Overview as CloudOverview } from '../lib/dbBuilder/dbTypes';
import { CommonParams } from './util';
import { Logger } from '../utils/logging';
export interface DesktopOverviewItems {
    localPackagePath: string;
}
export type DesktopOverview = CloudOverview & DesktopOverviewItems;
export type ServerType = 'remote' | 'desktop';
export interface ServerInfo {
    serverType: ServerType;
    serverUrl: string;
}
/**
 * For management of and access to tirex from the desktop, just Theia right now but potentially
 * others in the future; desktop only
 */
export declare class DesktopManager {
    private readonly commonParams;
    private readonly logger;
    private readonly desktopConfig;
    private readonly dinfraConfigFile;
    private readonly dinfraDataDir;
    constructor(commonParams: CommonParams, logger: Logger);
    startupDesktopServer(): Promise<ServerInfo | null>;
    /**
     * Launch desktop server if not already running
     */
    private startDesktopServer;
    private openRexAtDesktopServer;
    private getDesktopServerUrl;
    private connectToDesktopServer;
    private canConnectToServer;
    private createDinfraConfigFile;
}
export declare function isProcessRunning(processNameRegex: RegExp): Promise<boolean>;
