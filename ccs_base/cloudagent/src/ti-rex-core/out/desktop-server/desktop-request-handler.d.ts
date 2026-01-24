import { Request, Response } from 'express';
import { DesktopServerManager, DesktopServerStatus } from './desktop-server-manager';
import { DbSession } from '../lib/dbSession';
import { RexObject } from '../lib/rex';
export interface DatabaseUpdateOptions {
    forceImport: boolean;
    skipRefresh: boolean;
}
export declare const defaultDatabaseUpdateOptions: DatabaseUpdateOptions;
export declare class DesktopRequestHandler {
    private readonly rex;
    private readonly desktopServerManager;
    private readonly dbOpRequestQueue;
    constructor(rex: RexObject, desktopServerManager: DesktopServerManager);
    handleDatabaseUpdateRequest(sqldb: DbSession): Promise<boolean>;
    handleGlobalMetadataUpdateRequest(_sqldb: DbSession, _query: any, _req: Request): Promise<boolean>;
    handleAdminOpRequest(sqldb: DbSession, query: any, _req: Request): Promise<boolean>;
    handleDesktopServerStatusRequest(_sqldb: DbSession, _query: any, _req: Request): Promise<DesktopServerStatus>;
    /**
     * Serve local content on desktop
     */
    serveLocalContent(): (req: Request, res: Response) => Promise<void>;
}
