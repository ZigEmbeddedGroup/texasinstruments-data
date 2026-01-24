/// <reference types="node" />
import * as sqlite from 'better-sqlite3';
import { DbQueryOptions } from './connection';
import { QueryExtras } from './db';
type BindingValueType = null | number | bigint | string | Buffer;
interface DatabaseSchema {
    format: string;
    version: string;
    tables: Record<string, DatabaseTable>;
}
interface DatabaseTable {
    columns: DatabaseColumn[];
    indexes: DatabaseIndex[];
}
interface DatabaseColumn {
    name: string;
    type: string;
    nullable?: boolean;
    auto?: boolean;
    size?: string;
}
interface DatabaseIndex {
    unique?: boolean;
    columns: {
        name: string;
    }[];
}
export declare class SqliteDatabase {
    private sqliteDb;
    constructor(dbPath: string);
    createDatabase(tablePrefix: string, schema: DatabaseSchema): void;
    closeDatabase(): void;
    all(qid: string, sql: string | sqlite.Statement, args?: any[], options?: DbQueryOptions, extras?: QueryExtras): unknown[];
    run(sql: string | sqlite.Statement, rows?: any[][] | any[], multi?: boolean, options?: DbQueryOptions): any;
    prepareSql(sql: string): sqlite.Statement;
    toBindingValues(values: any[]): BindingValueType[];
    toBindingValue(value: any): BindingValueType;
    private adaptSql;
    private createTable;
    private generateTableSql;
    private generateColumnSql;
    private generateIndexSql;
}
export {};
