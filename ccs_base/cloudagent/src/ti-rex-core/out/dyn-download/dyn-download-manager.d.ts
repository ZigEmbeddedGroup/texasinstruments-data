import { Request } from 'express';
import { DownloadHeadData, DynamicDownloadAdmin } from './dyn-download-admin';
import * as Sqldb from '../lib/dbSession';
import { Platform } from '../shared/routes/response-data';
import { RequestQueryInput, Response } from '../shared/routes/request-response';
import { RexObject } from '../lib/rex';
export declare class DynamicDownloadManager {
    readonly rex: RexObject;
    static readonly ZIP_CACHE_URL_DIR = "zipcache";
    static readonly REMOTE_ZIPS_CUSTOM_ZIP_DIR = "custom-zips";
    readonly inCacheDir: string;
    readonly extractedContentDir: string;
    readonly outZipDir: string;
    readonly admin: DynamicDownloadAdmin;
    private readonly downloadRequestQueue;
    private readonly pendingDownloads;
    private readonly tmpDir;
    private readonly logger;
    private readonly retryDelayOnError;
    constructor(rex: RexObject);
    getDynamicPackageDownload(sqldb: Sqldb.DbSession, query: RequestQueryInput.DynamicPackageDownload, req: Request): Promise<Response.DynamicDownloadRequest>;
    getDynamicPackageDownloadStatus(_sqldb: Sqldb.DbSession, query: RequestQueryInput.DynamicPackageDownloadStatus): Promise<Response.DynamicDownloadStatus>;
    getDynamicDownloadStatus(requestToken: string): Response.DynamicDownloadStatus | null;
    waitOnZipCreation(request: Response.DynamicDownloadRequest): Promise<void>;
    getUrlHeadData(url: string): Promise<DownloadHeadData>;
    getModuleGroupOutputZipFileName(mainPackage: Sqldb.PackageRecord, packages: Sqldb.PackageRecord[], platform: Platform): string;
    private getDynamicDownload;
    requestZipCreation(outputZipFileName: string, packages: Sqldb.PackageRecord[], platform: Platform, outputZipPath: string, downloadUrl: string): Promise<Response.DownloadPendingWithRequestToken | Response.DownloadSuccess | Response.DownloadFailure>;
    /**
     * Calculate the zip's pack name, which is 'full' if all modules are requsted, but otherwise a unique number
     * (returned as a string) representing the zips's mix of module and dependency packages. It is calculated by
     * enumerating all of the main package's modules and dependencies in alphanumeric order (from 0, with modules first
     * then dependencies). And then summing 2^N for each included package, where N is package enumeration. Note that the
     * main package is ommitted from this calculation since it's mandatory.
     */
    getZipVariantName(mainPackage: Sqldb.PackageRecord, packages: Sqldb.PackageRecord[]): string;
    private createZip;
    /**
     * Get current download request for given requestToken, creating if it doesn't yet exist
     */
    private getDownloadRequest;
    /**
     * Create new download request for given requestToken
     */
    private createDownloadRequest;
}
export declare function execFile(file: string, args: string[], options?: any): Promise<void>;
