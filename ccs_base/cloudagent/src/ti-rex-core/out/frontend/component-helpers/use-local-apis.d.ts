/// <reference types="agent" />
import * as React from 'react';
import { ErrorContextValue } from './context';
import { PackageData } from '../apis/filter-types';
import type { AgentMode } from '../../cloudagent/interface';
import { ProjectType } from '../../cloudagent/ccs-adapter';
import { LocalAPIs } from '../apis/local-apis';
import { LocalInfo } from '../../cloudagent/external-apis';
interface UseLocalApisBaseParams {
    localApis: LocalAPIs;
    errorCallback: React.RefObject<ErrorContextValue | null>;
    allowNoAgent?: boolean;
}
type UseGetPackageInstallInfoParams = UseLocalApisBaseParams;
type UseGetInstalledPackagesParams = UseLocalApisBaseParams;
interface UseGetAgentModeParams extends Omit<UseLocalApisBaseParams, 'localApis'> {
    localApis: LocalAPIs | null;
}
type UseGetProgressParams = UseLocalApisBaseParams;
type UseGetVersionParams = UseLocalApisBaseParams;
interface UseClearTaskProgressParams extends UseLocalApisBaseParams {
    progressId: string;
    trigger: boolean;
}
interface UseImportProjectParams extends UseLocalApisBaseParams {
    resourceType: ProjectType | null;
    packageUid: string | null;
    location: string | null;
    trigger: boolean;
    targetId: string | null;
    projectName: string | null;
}
interface UseInstallPackageParams extends UseLocalApisBaseParams {
    pkg: PackageData | PackageData[] | null;
    installLocation: string | null;
    trigger: boolean;
}
interface UseUninstallPackageParams extends UseLocalApisBaseParams {
    pkg: PackageData;
    trigger: boolean;
}
interface UseOpenExternallyParams extends UseLocalApisBaseParams {
    link: string;
    trigger: boolean;
}
interface UseGetLocalInfoParams extends UseLocalApisBaseParams {
    trigger: boolean;
}
export interface UseStartupDesktopServer extends UseLocalApisBaseParams {
    trigger: boolean;
}
interface UseApiParams<T> extends Omit<UseLocalApisBaseParams, 'localApis'> {
    api: (agent: TICloudAgent.AgentModule) => Promise<T> | null;
    dependencies: React.DependencyList;
    placeholder: T;
}
interface UseApiWithEventParams<T> extends Omit<UseApiParams<T>, 'dependencies'> {
    evtHandling: (onResultUpdated: (result: T) => void) => () => void;
}
export declare function useGetPackageInstallInfo(args: UseGetPackageInstallInfoParams): {
    result: string[];
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitialLoadingUI: boolean;
    initalLoadingInProgress: boolean;
} | {
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitalLoadingUI: boolean;
    initalLoadInProgress: boolean;
    result: string[] | null;
    shouldDisplayInitialLoadingUI?: undefined;
    initalLoadingInProgress?: undefined;
};
export declare function useGetInstalledPackages(args: UseGetInstalledPackagesParams): {
    result: import("../../cloudagent/response-data").InstalledPackage[];
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitialLoadingUI: boolean;
    initalLoadingInProgress: boolean;
} | {
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitalLoadingUI: boolean;
    initalLoadInProgress: boolean;
    result: import("../../cloudagent/response-data").InstalledPackage[] | null;
    shouldDisplayInitialLoadingUI?: undefined;
    initalLoadingInProgress?: undefined;
};
export declare function useGetAgentMode(args: UseGetAgentModeParams): {
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitalLoadingUI: boolean;
    initalLoadInProgress: boolean;
    result: AgentMode | null;
} | {
    result: AgentMode | null;
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitialLoadingUI: boolean;
    initalLoadingInProgress: boolean;
};
export declare function useGetProgress(args: UseGetProgressParams): {
    result: {
        [x: string]: import("../../cloudagent/progress-manager").Progress;
    };
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitialLoadingUI: boolean;
    initalLoadingInProgress: boolean;
} | {
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitalLoadingUI: boolean;
    initalLoadInProgress: boolean;
    result: {
        [x: string]: import("../../cloudagent/progress-manager").Progress;
    } | null;
    shouldDisplayInitialLoadingUI?: undefined;
    initalLoadingInProgress?: undefined;
};
export declare function useGetVersion(args: UseGetVersionParams): {
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitalLoadingUI: boolean;
    initalLoadInProgress: boolean;
    result: string | null;
} | {
    result: string;
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitialLoadingUI: boolean;
    initalLoadingInProgress: boolean;
};
export declare function useClearTaskProgress(args: UseClearTaskProgressParams): {
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitalLoadingUI: boolean;
    initalLoadInProgress: boolean;
    result: boolean | null;
} | {
    result: boolean;
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitialLoadingUI: boolean;
    initalLoadingInProgress: boolean;
};
export declare function useImportProject(args: UseImportProjectParams): {
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitalLoadingUI: boolean;
    initalLoadInProgress: boolean;
    result: boolean | null;
} | {
    result: boolean;
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitialLoadingUI: boolean;
    initalLoadingInProgress: boolean;
};
export declare function useInstallPackage(args: UseInstallPackageParams): {
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitalLoadingUI: boolean;
    initalLoadInProgress: boolean;
    result: string[] | null;
} | {
    result: string[] | null;
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitialLoadingUI: boolean;
    initalLoadingInProgress: boolean;
};
export declare function useUninstallPackage(args: UseUninstallPackageParams): {
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitalLoadingUI: boolean;
    initalLoadInProgress: boolean;
    result: string | null;
} | {
    result: string | null;
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitialLoadingUI: boolean;
    initalLoadingInProgress: boolean;
};
export declare function useOpenExternally(args: UseOpenExternallyParams): {
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitalLoadingUI: boolean;
    initalLoadInProgress: boolean;
    result: boolean | null;
} | {
    result: boolean | null;
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitialLoadingUI: boolean;
    initalLoadingInProgress: boolean;
};
export declare function useGetLocalInfo(args: UseGetLocalInfoParams): {
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitalLoadingUI: boolean;
    initalLoadInProgress: boolean;
    result: LocalInfo | null;
} | {
    result: LocalInfo;
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitialLoadingUI: boolean;
    initalLoadingInProgress: boolean;
};
export declare function useStartupDesktopServer(args: UseStartupDesktopServer): {
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitalLoadingUI: boolean;
    initalLoadInProgress: boolean;
    result: import("../../cloudagent/desktop-manager").ServerInfo | null;
} | {
    result: import("../../cloudagent/desktop-manager").ServerInfo | null;
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitialLoadingUI: boolean;
    initalLoadingInProgress: boolean;
};
export declare function useApi<T>(args: UseApiParams<T>): {
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitalLoadingUI: boolean;
    initalLoadInProgress: boolean;
    result: T | null;
} | {
    result: T;
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitialLoadingUI: boolean;
    initalLoadingInProgress: boolean;
};
declare function useApiWithEvent<T>(args: UseApiWithEventParams<T>): {
    result: T;
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitialLoadingUI: boolean;
    initalLoadingInProgress: boolean;
} | {
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitalLoadingUI: boolean;
    initalLoadInProgress: boolean;
    result: T | null;
    shouldDisplayInitialLoadingUI?: undefined;
    initalLoadingInProgress?: undefined;
};
export declare const _useApi: typeof useApi;
export declare const _useApiWithEvent: typeof useApiWithEvent;
export {};
