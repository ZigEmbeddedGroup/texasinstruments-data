import { InstalledPackage } from '../cloudagent/response-data';
import { Package } from '../sqldb/packages';
export declare function installedPackageArrayToString(packages: {
    packagePublicUid: string;
}[]): string;
export declare function databasePackageArrayToString(packages: {
    publicId: string;
    version: string;
}[]): string;
export declare function databaseAndInstalledPackagesMatch(databasePackage: Package, installedPackage: InstalledPackage): boolean;
