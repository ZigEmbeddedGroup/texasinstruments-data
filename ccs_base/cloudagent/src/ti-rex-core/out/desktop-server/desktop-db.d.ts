import * as DinfraTypes from 'dinfra';
import { DbSessionFactory } from '../lib/dbSession';
import { RexObject } from '../lib/rex';
import { DatabaseUpdateOptions } from './desktop-request-handler';
import { GlobalMetaDataManager } from './global-metadata';
import { DesktopServerVars } from '../lib/vars';
import { DesktopServerManager } from './desktop-server-manager';
import { DesktopDatabaseSession } from './desktop-db-session';
export declare class DesktopDatabase {
    private readonly rex;
    private readonly dinfra;
    private readonly sqldbFactory;
    private readonly desktopConfig;
    private readonly desktopServerManager;
    private readonly globalMetaData;
    private readonly logger;
    private readonly log;
    constructor(rex: RexObject, dinfra: typeof DinfraTypes, sqldbFactory: DbSessionFactory, desktopConfig: DesktopServerVars, desktopServerManager: DesktopServerManager, globalMetaData: GlobalMetaDataManager, logger: DinfraTypes.Logger);
    /**
     * Update the database, if needed, with multiple retries on recoverable errors
     */
    updateDatabase(dbSession: DesktopDatabaseSession, options?: Partial<DatabaseUpdateOptions>): Promise<boolean>;
    /**
     * Reload database
     */
    reloadDatabase(): Promise<void>;
    /**
     * Promote the next database as "active" if available, and falling back to the default database
     * if necessary
     */
    promoteNextDatabase(): void;
}
