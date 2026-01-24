import * as _ from 'lodash';
import { QueryOptions } from 'mysql/index.js';
import * as dinfraTypes from 'dinfra';
import { DbValue, DbObj } from './types';
import { MySqlInsertResult, MySqlQueryArg, MultiSql, QueryExtras, DBUseMode } from './db';
import { DbLogger } from '../dblogger';
import { Omit } from '../../shared/generic-types';
import { SqliteDatabase } from './sqlite';
import { Statement } from 'better-sqlite3';
export declare const errorIfMysql: undefined | boolean;
export declare const errorIfSqlite: boolean | undefined;
export declare function assertMysqlAllowed(): void;
export declare function assertSqliteAllowed(): void;
interface WriteOptions {
    ignoreDuplicates?: boolean;
    ignoreWarnings?: boolean;
}
type DbObjWriteOptions = WriteOptions & {
    getAutoIncrementId?: boolean;
};
export type DbQueryOptions = Omit<QueryOptions, 'sql' | 'values'> & {
    bigints?: boolean;
};
export declare class DbConnection {
    private readonly writable;
    private readonly dinfra;
    private readonly logger;
    private readonly sqliteDb;
    private readonly dbUseMode;
    private mysqlConnection;
    constructor(writable: boolean, dinfra: typeof dinfraTypes, logger: DbLogger, sqliteDb: SqliteDatabase | undefined, dbUseMode: DBUseMode);
    init(): Promise<void>;
    close(): Promise<void>;
    static query<ROW>(mysqlConnection: dinfraTypes.DMysqlConnection | undefined, sqliteDb: SqliteDatabase | undefined, dbUseMode: DBUseMode, logger: DbLogger, qid: string, sqlArg: string | Statement | MultiSql, args?: MySqlQueryArg[], options?: DbQueryOptions, lastInsertRowCount?: number, extras?: QueryExtras, mainStatementPos?: number): Promise<ROW[]>;
    query<ROW>(qid: string, sql: string | Statement | MultiSql, args?: MySqlQueryArg[], options?: DbQueryOptions, lastInsertRowCount?: number, extras?: QueryExtras, mainStatementPos?: number): Promise<ROW[]>;
    writeDbObjsToDb<T extends DbObj>(qid: string, objs: T[], tableName: string, columnNames: string[], mapObjToDbRow: (obj: T) => DbValue[], options?: DbObjWriteOptions): Promise<void>;
    writeObjsToDb<T>(qid: string, objs: T[], tableName: string, columnNames: string[], mapToDbRows: _.ListIterator<T, DbValue[][]>, options?: WriteOptions): Promise<(number | bigint | null)[] | MySqlInsertResult | null | undefined>;
    writeRowsToDb(qid: string, rowsToInsert: DbValue[][], tableName: string, columnNames: string[], options?: WriteOptions): Promise<(number | bigint | null)[] | null | MySqlInsertResult | undefined>;
}
export {};
