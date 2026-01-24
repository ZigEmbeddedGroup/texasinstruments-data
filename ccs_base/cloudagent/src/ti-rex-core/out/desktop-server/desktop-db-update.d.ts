import * as DinfraTypes from 'dinfra';
import { RexObject } from '../lib/rex';
import { DatabaseUpdateOptions } from './desktop-request-handler';
import { GlobalMetaDataManager } from './global-metadata';
import { DesktopServerVars } from '../lib/vars';
import { DesktopServerManager } from './desktop-server-manager';
import { DesktopDatabaseSession } from './desktop-db-session';
export type DatabaseUpdateResult = 'success' | 'aborted' | 'failed' | 'failed-retryable';
export declare class DesktopDatabaseUpdate {
    private readonly rex;
    private readonly dinfra;
    private readonly desktopConfig;
    private readonly desktopServerManager;
    private readonly globalMetaDataManager;
    private readonly log;
    private readonly logger;
    private readonly badPackagesFile;
    private readonly ccsPort;
    private readonly ccsAdapterDesktop;
    private readonly ccsTheiaRequest;
    private localPackageInstallInfo;
    constructor(rex: RexObject, dinfra: typeof DinfraTypes, desktopConfig: DesktopServerVars, desktopServerManager: DesktopServerManager, globalMetaDataManager: GlobalMetaDataManager, log: (message: string) => void);
    /**
     * Determine if the database is out of date and an update needed
     */
    isNeeded(dbSession: DesktopDatabaseSession): Promise<boolean>;
    /**
     * Perform database update if needed
     */
    updateDatabase(options: DatabaseUpdateOptions): Promise<DatabaseUpdateResult>;
    /**
     * Get packages marked bad due to earlier failures
     */
    getBadPackages(): Promise<string[]>;
    /**
     * Update set of packages marked bad due to failure
     */
    saveBadPackages(badPackages: string[]): Promise<void>;
    private getLocalPackageInstallInfo;
    /**
     * Get packages to be omitted from import into the database
     *
     * This includes packages that are intentionally unsupported for locally install for whatever
     * reason, as well as packages that previously failed on import previously due an error, unless
     * the error was unrelated to the package itself.
     */
    private getPackagesExcludedFromDatabase;
    /**
     * Filter out from the given locally installed software packages those that are unsupported or
     * on which import previously failed in some way unrelated to the package itself
     */
    private getSupportedInstalledSoftwarePackages;
    private isInstalledPackageTypeSoftware;
}
