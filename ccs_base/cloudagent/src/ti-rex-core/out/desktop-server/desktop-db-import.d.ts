import * as DinfraTypes from 'dinfra';
import { DatabaseUpdateOptions } from './desktop-request-handler';
import { GlobalMetaDataManager } from './global-metadata';
import { DesktopServerVars } from '../lib/vars';
import { InstalledPackage } from '../cloudagent/response-data';
import { RexObject } from '../lib/rex';
import { DatabaseUpdateResult, DesktopDatabaseUpdate } from './desktop-db-update';
import { DesktopServerManager } from './desktop-server-manager';
export declare class DesktopDatabaseImport {
    private readonly dbUpdate;
    private readonly rex;
    private readonly dinfra;
    private readonly desktopConfig;
    private readonly desktopServerManager;
    private readonly globalMetaDataManager;
    private readonly log;
    private readonly globalPackagesDir;
    private readonly moduleGroupPackagesDir;
    constructor(dbUpdate: DesktopDatabaseUpdate, rex: RexObject, dinfra: typeof DinfraTypes, desktopConfig: DesktopServerVars, desktopServerManager: DesktopServerManager, globalMetaDataManager: GlobalMetaDataManager, log: (message: string) => void);
    /**
     * Perform database update if needed
     */
    buildDatabase(installedSoftwarePackages: InstalledPackage[], packageSearchPaths: string[], options: DatabaseUpdateOptions): Promise<DatabaseUpdateResult>;
    private buildRex3Database;
    private buildSqliteDatabase;
    /**
     * Update device and devtool package metadata directories on the user's desktop
     */
    private updateLocalDeviceAndDevtoolPackageDirs;
    /**
     * Prepare package info for rex3 db refresh
     */
    private prepareRex3RefreshPackageInfo;
    /**
     * Determine the content base directory paths from which local package content will be served by
     * the desktop server from CCS's product discovery paths, and assign them to the packages as
     * contentDir, with the package paths adjusted to be relative to them.
     */
    private assignSoftwarePackagesBaseContentDirs;
    /**
     * Update foundation tree json file from local global metadata
     */
    private updateFoundationTreeJsonFile;
    /**
     * Update package aux data json file from local global metadata
     */
    private updatePackageAuxDataJsonFile;
    /**
     * Is a rex3 db-refresh or rex4 db-import process already running?
     */
    private isRefreshOrImportProcessRunning;
    /**
     * Get necessary module group packages
     */
    private getModuleGroupPackages;
}
