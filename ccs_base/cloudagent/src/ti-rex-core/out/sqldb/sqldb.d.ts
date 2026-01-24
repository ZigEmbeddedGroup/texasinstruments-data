import { Db } from './db/db';
import { Packages } from './packages';
import { Devices } from './devices';
import { Devtools } from './devtools';
import { Resources } from './resources';
import { Tree } from './tree';
import { Manage } from './manage';
import { PartialConfig } from './config';
import { TableViews } from './table-views';
import { ConsoleLogger } from './console';
import { Vars } from '../lib/vars';
export type DbVars = Pick<Vars, 'dbTablePrefix' | 'dbUseMode' | 'packageAuxDataFile' | 'localDbDir' | 'foundationTreeFile'>;
export declare class SqlDb {
    private readonly fullConfig;
    private readonly logger;
    private readonly dinfraLibPath;
    private readonly vars;
    readonly packages: Packages;
    readonly tree: Tree;
    readonly tableViews: TableViews;
    readonly resources: Resources;
    readonly devices: Devices;
    readonly devtools: Devtools;
    readonly manage: Manage;
    readonly db: Db;
    readonly console: ConsoleLogger;
    private static inst;
    /**
     * Get the primary instance, creating it if it doesn't yet exist
     */
    static primaryInstance(config: PartialConfig, vars?: DbVars, databasePath?: string): Promise<SqlDb>;
    /**
     * Get the current primary instance, if it exists
     */
    static existingPrimaryInstance(): SqlDb | undefined;
    /**
     * Create and return a new primary instance, based off and replacing the current primary
     * instance. Throws an error if the current primary instance doesn't exist.
     */
    static reloadPrimaryInstance(setupNewDatabase: () => void): SqlDb;
    /**
     * Create a new sqldb instance
     */
    private static createSqlDb;
    /**
     * Create a new sqldb instance based off another
     */
    static cloneSqlDb(sqldb: SqlDb, databasePath?: string): SqlDb;
    private constructor();
    /**
     * Invalidate
     */
    invalidate(): void;
    /**
     * Reset state/caches
     */
    reset(): void;
}
