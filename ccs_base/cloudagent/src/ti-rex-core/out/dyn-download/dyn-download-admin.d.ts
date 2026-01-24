import { Request, Response } from 'express';
import { RexObject } from '../lib/rex';
import { DynamicDownloadManager } from './dyn-download-manager';
import { Logger } from '../utils/logging';
import { Vars } from '../lib/vars';
export interface DownloadHeadData {
    etag: string | null;
    lastModified: string | null;
    contentLength: number | null;
}
export declare class DynamicDownloadAdmin {
    private readonly dynamicDownloadManager;
    private readonly rex;
    private readonly logger;
    private readonly requestQueue;
    private readonly lastExtractionCacheUpdateOp;
    private readonly lastZipCreateOp;
    private currentOp;
    constructor(dynamicDownloadManager: DynamicDownloadManager, rex: RexObject);
    handleExtractionCacheUpdateRequest(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    extractionCacheUpdateStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * Create multiple zip files, for use both in pre-populating cache or creating zips to be
     * deployed to software-dl
     */
    handleBatchZipCreateRequest(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    batchZipCreateStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getPackagePlatformDownloadInfo(packagePublicUid: string, platform: string): Promise<DownloadHeadData | null>;
    static cleanupPackageZip({ packagePublicUid, platform, vars }: {
        packagePublicUid: string;
        platform: string;
        logger: Logger;
        vars: Vars;
    }): Promise<void>;
    static extractPackageZip({ zipPath, packagePublicUid, platform, vars, logger }: {
        zipPath: string;
        packagePublicUid: string;
        platform: string;
        vars: Vars;
        logger: Logger;
    }): Promise<void>;
    private createZips;
    private addAdminOpToRequestQueue;
    private createZip;
    private updateExtractionCache;
    private handleAdminOpRequest;
    private createNewAdminOpStatus;
    private authenticate;
}
export declare function getExtractDirName(packagePublicUid: string, platform: string): string;
