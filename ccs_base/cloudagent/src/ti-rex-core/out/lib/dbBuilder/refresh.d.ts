import { BaseLogger } from '../../utils/logging';
import { RefreshRequestEntry, RefreshResult } from './dbBuilder';
import { ConsoleLogger } from '../../schema-validator/util';
import { ValidationType } from '../appConfig';
export interface PackageData {
    packageUids: Set<string>;
}
export type PackagePathGroup = {
    contentBasePath: string;
    packagePaths: string[];
};
/**
 * Manages DB Refreshes.
 */
export declare class RefreshManager {
    readonly dbBasePath: string;
    readonly defaultLogger: BaseLogger | ConsoleLogger;
    refreshUsingConfigFileCb: (arg1: string | PackagePathGroup[], arg2: string | undefined, arg3: ValidationType | undefined, callback: (err: any, result: {
        resultAsMap: Map<string, RefreshResult>;
        success: boolean;
        invalidSchemaPackages?: undefined;
    } | {
        resultAsMap: Map<string, RefreshResult>;
        invalidSchemaPackages: string[];
        success: boolean;
    }) => void) => void;
    private refreshQueueP;
    private dbs;
    /**
     * Create a refresh manager.
     * @param dbBasePath
     * @param defaultLogger: this logger is used by refresh except if a custom refresh logger is provided
     * when calling one of the refresh APIs; note though that rexdb will always use the default logger regardless
     * TODO: could enhance rexdb to allow setting a new logger (passed in with indiviudalRefresh) so that we get rexdb
     * logs as part of the refresh log for a handoff submission
     */
    constructor(dbBasePath: string, defaultLogger: BaseLogger | ConsoleLogger);
    createDB(): void;
    /**
     * Refresh individual packages
     * Note: if a device/devtool package is in the list a full refresh is performed
     */
    individualRefresh(fullPackageList: RefreshRequestEntry[], overrideBackup: boolean, logger?: BaseLogger, forceRefreshAll?: boolean, validationType?: ValidationType): Promise<{
        result: Map<string, RefreshResult>;
        success: boolean;
    }>;
    /**
     * Refresh using either a config file (e.g. default.json) or an array of package paths and their
     * content base paths
     */
    refreshUsingConfigFile(packagesFilepathOrArray: string | PackagePathGroup[], contentBasePath: string | undefined, validationType: ValidationType | undefined, logger?: BaseLogger): Promise<{
        resultAsMap: Map<string, RefreshResult>;
        success: boolean;
        invalidSchemaPackages?: undefined;
    } | {
        resultAsMap: Map<string, RefreshResult>;
        invalidSchemaPackages: string[];
        success: boolean;
    }>;
    removeBackup(): Promise<void>;
    private queueRefresh;
    /**
     * Handle a refresh task.
     *
     * No Unique package can be part of more than one list ie add/delete/replace
     * Check for device and devtool list
     */
    private refreshLayer;
    /**
     * Handle a refresh task.
     *
     * @param {Object} config - same as refreshDatabase.
     */
    private _refreshTask;
    /**
     * Fix up dependencies when deleting a package. Note: orphaned supplemental packages are ok.
     */
    private deletePackagesHandlingOverview;
    /**
     * Cleanup of the dependency links for main and supplemental package deletions
     */
    private reEstablishDependencyLinks;
}
