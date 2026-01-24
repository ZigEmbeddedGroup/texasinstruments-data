import * as sqlStats from './sql-stats';
import { Config } from '../config';
import { DbLogger } from '../dblogger';
import { DbQueryOptions } from './connection';
import { SqliteDatabase } from './sqlite';
import { Statement } from 'better-sqlite3';
import { DbVars } from '../sqldb';
export interface MySqlInsertResult {
    affectedRows: number;
    warningCount?: number;
}
export type MySqlWriteResult = MySqlInsertResult & {
    changedRows?: number;
};
export type MySqlQueryArg = string | number | string[] | number[];
export interface QueryExtras {
    sqliteRowTransform?: (row: any) => any;
}
export declare function sqlRespDiffers(sql: string | Statement, sqliteResponse: any, mysqlResponse: any, sqliteError: any, mysqlError: any, lastInsertRowCount?: number, mainStatementPos?: number): void;
export type DBEngine = 'mysql' | 'sqlite';
export type DBUseMode = DBEngine | 'both';
export declare class DbError extends Error {
    readonly sql?: string | undefined;
    constructor(message: string, sql?: string | undefined);
}
export interface Tables {
    filters: string;
    chunks: string;
    trailingSubChunks: string;
    filtersXChunks: string;
    nodes: string;
    nodeAncestors: string;
    resources: string;
    resourceProjFiles: string;
    devices: string;
    devtools: string;
    packages: string;
    packageDepends: string;
    devtoolDevices: string;
    resourceDevtools: string;
    resourceDevices: string;
    filterAffectsNode: string;
    filterAffectsNodeCDesc: string;
    contentSources: string;
    contentSourcePackages: string;
    nodeDevResourceGroups: string;
    resourceFilters: string;
    resourceGroups: string;
    resourceGroupNodes: string;
    nodePublicIds: string;
    nodeCustomResourceIds: string;
    deviceAliases: string;
    devtoolAliases: string;
    packageAliases: string;
}
export interface MultiSql {
    mysql?: string;
    sqlite?: string | Statement;
}
export declare class Db {
    private readonly logger;
    readonly vars: DbVars;
    readonly tables: Tables;
    readonly sqlStats: sqlStats.SqlStats;
    readonly sqliteDb: SqliteDatabase;
    private readonly dinfra;
    private readonly mysql;
    constructor(config: Config, logger: DbLogger, dinfraLibPath: string, vars: DbVars, databasePath?: string);
    invalidate(): void;
    simpleQuery<ROW>(qid: string, sqlArg: string | Statement | MultiSql, args?: MySqlQueryArg[], mainStatementPos?: number, options?: DbQueryOptions, extras?: QueryExtras): Promise<ROW[]>;
    manipulate(qid: string, sqlArg: string | MultiSql, args?: MySqlQueryArg[] | null): Promise<MySqlWriteResult>;
    nullSafeSqlComparison(value: number | null, dbType?: DBEngine): string;
    escapeValue(value: any, dbType?: DBEngine): any;
    formatSql(sql: string, values: any[], dbType?: DBEngine): string | Statement;
    formatSqlFragment(sql: string, values: any[], dbType?: DBEngine): string;
    getDbUseMode(): DBUseMode;
}
/**
 * Drop the very rightmost query argument if null, otherwise keep it.
 *
 * Meant as a safe way to use a single nullable query argument in a dynamic query that has a single
 * optional parameter.
 *
 * @param args - query arguments, with one possible non-null at the end
 * @returns
 */
export declare function dropRightmostQueryArgIfNull<T = MySqlQueryArg>(args: [...T[], T | null]): T[];
