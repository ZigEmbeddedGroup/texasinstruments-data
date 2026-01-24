import * as DinfraTypes from 'dinfra';
import { RexObject } from '../lib/rex';
import { DbSession, DbSessionFactory } from '../lib/dbSession';
import { DatabaseUpdateOptions, DesktopRequestHandler } from './desktop-request-handler';
import { DesktopServerRoutes } from './desktop-routes';
import { PackagePathGroup } from '../lib/dbBuilder/refresh';
export declare const packagePathsFileName = "package-paths.json";
export interface DesktopServerStatus {
    isReady: boolean;
    reasonNotReady?: NotReadyReason;
    reasonDetail?: any;
    updateStatus?: {
        currentlyUpdating?: boolean;
        updateNeeded?: boolean;
        lastCheckForUpdate?: number;
        lastSuccessfulUpdate?: number;
        lastFailedUpdate?: number;
    };
    activeDatabaseInfo?: DatabaseUpdateInfo;
    inProgressDatabaseUpdate?: DatabaseUpdateInfo;
    lastDatabaseUpdate?: DatabaseUpdateInfo;
}
export type NotReadyReason = 'startup' | 'db-empty' | 'no-local-packages' | 'no-importable-local-packages' | 'other';
export interface DatabaseUpdateInfo {
    successful: boolean;
    stage?: DatabaseUpdateStage;
    failures?: any[];
    localPackages: {
        allDetected?: string[];
        markedExclude?: string[];
        markedUnsupported?: string[];
        markedBad?: string[];
        importedPackages?: string[];
        omittedPackages?: string[];
    };
    globalMetadata: {
        devicePackages?: string[];
        devtoolPackages?: string[];
    };
    metrics: DatabaseUpdateMetrics;
}
export type DatabaseUpdateStage = 'check' | 'init' | 'db3-refresh' | 'sqlite-build' | 'deploy' | 'db-reload' | 'done';
export interface DatabaseUpdateMetrics {
    start: number;
    end?: number;
    duration?: number;
    durationCheck?: number;
    durationInit?: number;
    startDb3Build?: number;
    durationDb3Build?: number;
    startDbBuild?: number;
    durationDbBuild?: number;
    durationFin?: number;
    packages?: {
        uid: string;
        db3Build?: {
            start: number;
            duration: number;
        };
        dbBuild?: {
            start: number;
            duration: number;
        };
    }[];
}
export declare class DesktopServerManager {
    readonly rex: RexObject;
    private readonly dinfra;
    private readonly sqldbFactory;
    private readonly logger;
    private readonly mutatableRequestQueue;
    private readonly desktopDatabase;
    private readonly globalMetaData;
    private readonly requestHandler;
    private readonly desktopRoutes;
    private readonly desktopConfig;
    private status;
    private packagePathGroups;
    private packagesLastUpdated;
    private allowDatabaseOps;
    constructor(rex: RexObject, dinfra: typeof DinfraTypes, sqldbFactory: DbSessionFactory, logger: DinfraTypes.Logger);
    getRequestHandler(): DesktopRequestHandler;
    getRoutes(): DesktopServerRoutes;
    /**
     * Activate desktop server, including db session creation and triggering database update check
     */
    activate(): Promise<void>;
    /**
     * Products have changed, trigger a database update check
     */
    productChange(): Promise<void>;
    /**
     * Request execution of the given database impacting operation (maybe just be database
     * impacting). Request is rejected immediately if an op has already been accepted or is running.
     *
     * @param op - async database or database-impacting operation
     * @returns whether or not request was accepted
     */
    requestDatabaseOpExecution(op: () => Promise<any>): boolean;
    /**
     * Update the database if needed
     */
    updateDatabase(sqldb: DbSession, options?: Partial<DatabaseUpdateOptions>): Promise<boolean>;
    /**
     * Trigger database reload
     */
    reloadDatabase(): Promise<void>;
    /**
     * Update global metadata
     */
    updateGlobalMetadataRequest(): Promise<boolean>;
    /**
     * Get desktop server status
     */
    getStatus(): Promise<DesktopServerStatus>;
    /**
     * Get locally cached package path groups, first getting from filesytem if needed
     */
    getPackagePathGroups(): PackagePathGroup[];
    /**
     * Update locally cached package path groups and persist to filesytem
     */
    updatePackagePathGroups(packagePathGroups: PackagePathGroup[]): Promise<void>;
    updateReadyStatus(sqldb: DbSession): Promise<void>;
    updateDbUpdateStatus(updateStatus: {
        currentlyUpdating: boolean;
    }): Promise<void>;
    private readPackagesLastUpdated;
    private initStatus;
}
