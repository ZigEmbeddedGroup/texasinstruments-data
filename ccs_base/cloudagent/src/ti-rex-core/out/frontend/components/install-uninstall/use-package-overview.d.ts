import { AppProps } from '../../component-helpers/util';
import { InstallItem, InstallPackageData, LocalPackage, NotFoundPackage, PlatformSupport, RemotePackage } from './util';
import { InstalledPackage } from '../../../cloudagent/response-data';
import { PackageData } from '../../../shared/routes/response-data';
interface SelectionItem {
    installPackageData: InstallPackageData;
    selected: boolean;
    support: PlatformSupport;
}
export declare function usePackageOverview(appProps: AppProps, installItems: InstallItem[], installedPackages: InstalledPackage[], onSelectionUpdate: (packageUids: string[]) => void): {
    getSelection: () => SelectionItem[];
    getUpdatedSelection: (installPackageDataOuter: InstallPackageData, value: boolean) => ({
        installPackageData: NotFoundPackage;
        selected: boolean;
        support: PlatformSupport;
    } | {
        installPackageData: LocalPackage | RemotePackage;
        selected: boolean;
        support: PlatformSupport;
    })[];
    getSelectedUids: (keepPlaceholders?: boolean) => string[];
    updateSelection: (selection: SelectionItem[]) => void;
};
export declare function getGroupedPackageSelection(selection: SelectionItem[], installedPackages: InstalledPackage[], allPackages: PackageData[]): {
    installSize: number;
    moduleGroupsNonDefault: SelectionItem[];
    defaultModuleGroup: SelectionItem | undefined;
    packageDependencies: SelectionItem[];
};
export declare function sortByPackageName(item1: SelectionItem, item2: SelectionItem): 1 | -1 | 0;
export declare function getInstallDataPresentationInfo(installData: InstallPackageData): {
    nameOrId: string;
    version: string;
};
export {};
