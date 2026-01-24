import { DbSession } from '../lib/dbSession';
import { Package } from '../sqldb/packages';
import { DesktopServerStatus } from './desktop-server-manager';
/**
 * A shorter-lived sqlite database session
 */
export declare class DesktopDatabaseSession {
    private readonly sqldb;
    private status;
    constructor(sqldb: DbSession);
    /**
     * Get database session status
     */
    getStatus(): Promise<DesktopServerStatus>;
    /**
     * Get updated database status
     */
    updateStatus(): Promise<DesktopServerStatus>;
    /**
     * Get all existing software packages from database
     */
    getDatabaseSoftwarePackages(): Promise<Package[]>;
    /**
     * Get all existing global packages from database
     */
    getDatabaseGlobalPackages(): Promise<Package[]>;
    /**
     * Get all packages from database, grouped by type
     */
    private getDatabasePackagesByType;
}
