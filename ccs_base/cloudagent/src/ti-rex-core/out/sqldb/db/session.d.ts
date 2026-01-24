import { Config } from '../config.js';
import { DbLogger } from '../dblogger';
import { DbConnection } from './connection.js';
import { SqliteDatabase } from './sqlite';
import { DBUseMode } from './db.js';
export declare class DbSession {
    private readonly logger;
    private readonly sqliteDb;
    private readonly dbUseMode;
    private readonly dinfra;
    private conn;
    constructor(logger: DbLogger, config: Config, sqliteDb: SqliteDatabase | undefined, dbUseMode: DBUseMode);
    openConnection(writable: boolean): Promise<void>;
    /**
     * Close connection, if open.
     *
     * Because this function is called on cleanup (including on error handling), errors are logged
     * and swallowed instead of re-thrown.
     */
    closeConnection(): Promise<void>;
    getConnection(): DbConnection | undefined | null;
}
