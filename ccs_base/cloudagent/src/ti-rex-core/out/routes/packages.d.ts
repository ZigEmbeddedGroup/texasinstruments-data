import { Request } from 'express';
import { DbSession, PackageRecordType } from '../lib/dbSession';
import { Nodes, PackageData } from '../shared/routes/response-data';
export declare function getRoutes(): import("express-serve-static-core").Router;
export declare function getPackages(sqldb: DbSession, _reqQuery: void, req: Request): Promise<PackageData[]>;
export declare function getPackageGroups(sqldb: DbSession): Promise<{
    packageGroupVersion: string;
    packageGroupPublicId: string;
    packageGroupPublicUid: string;
    packagesPublicUids: string[];
    mainPackagePublicUid: string | null;
    hideByDefault: boolean;
    packagesToListVersionsFrom: string[];
}[]>;
export declare function decodePackageType(packageType: PackageRecordType): Nodes.PackageType;
