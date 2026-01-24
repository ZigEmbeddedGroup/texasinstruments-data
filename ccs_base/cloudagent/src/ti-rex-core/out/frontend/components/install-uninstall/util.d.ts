import type { InstalledPackage } from '../../../cloudagent/response-data';
import type { ModuleGroup } from '../../../lib/dbBuilder/dbTypes';
import type { PackageData } from '../../apis/filter-types';
export declare const enum DisplayMode {
    BUTTON = "button",
    LIST_ITEM = "listItem",
    STANDALONE = "standalone"
}
export declare const enum InstallOrUninstallVariantType {
    PACKAGE = "package",
    NODE = "node"
}
export declare const enum PlatformSupport {
    SUPPORTED = "supported",
    NOT_SUPPORTED = "notSupported",
    UNKNOWN = "unknown"
}
export declare const enum InstallItemType {
    MAIN = "main",
    MODULE_GROUP = "moduleGroup",
    DEFAULT_MODULE_GROUP = "defaultModuleGroup",
    DEPENDENCY = "dependency",
    NA = "na"
}
export declare const enum PackageOrigin {
    LOCAL = "Local",
    REMOTE = "Remote",
    NOT_FOUND = "NotFound"
}
export interface LocalPackage {
    origin: PackageOrigin.LOCAL;
    data: InstalledPackage;
    installItemType: InstallItemType;
}
export interface RemotePackage {
    origin: PackageOrigin.REMOTE;
    data: PackageData;
    installItemType: InstallItemType;
}
export interface NotFoundPackage {
    origin: PackageOrigin.NOT_FOUND;
    data: InstallItem;
    installItemType: InstallItemType;
}
export type InstallPackageData = LocalPackage | RemotePackage | NotFoundPackage;
export interface SelectionItem {
    installPackageData: InstallPackageData;
    selected: boolean;
    support: PlatformSupport;
}
export interface InstallItem {
    packagePublicId: string;
    versionRange: string;
    installItemType: InstallItemType;
}
export declare function getModulesFromModuleGroup(moduleGroup: ModuleGroup, allPackages: PackageData[], installedPackages: InstalledPackage[]): (LocalPackage | RemotePackage)[];
export declare function getRowDescription(selectionData: SelectionItem): {
    description: string;
    extraInfo: boolean;
};
