/// <reference types="agent" />
import * as React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { APIControl } from '../apis/api-control';
import { APIs } from '../apis/apis';
import { AutoDetect } from './auto-detect';
import { ErrorContextValue } from './context';
import { CloudAgentError } from '../../shared/errors';
import { BrowserUrlQuery, Filter } from '../apis/filter-types';
import { NodeJumpOptions, BuIdJumpOptions } from './live-actions';
import { FilterData, Nodes, PackageData, PackageGroupData, TableView } from '../../shared/routes/response-data';
import { LocalAPIs } from '../apis/local-apis';
import { NodesState } from './nodes-state';
import { Page } from '../../shared/routes/page';
import { ServerConfig } from '../../shared/server-config';
import { TestingHelpers } from '../testing-helpers/testing-helpers';
import { TourState } from './tour-state';
import { MountComponentTemporarily } from './mount-component-temporarily';
import { AppPropsInitial } from './use-app-props';
import type { AgentMode } from '../../cloudagent/interface';
export interface AppProps {
    apis: APIs;
    autoDetect: AutoDetect;
    filter: Filter;
    filterOptions: FilterData.Options;
    navigate: NavigateFunction;
    localApis: LocalAPIs;
    mountComponentTemporarily: MountComponentTemporarily;
    nodesState: NodesState;
    packages: PackageData[];
    packageGroups: PackageGroupData[];
    page: Page;
    selectedNode: Nodes.Node | null;
    selectedNodeExtended: Nodes.NodeExtended | null;
    tourState: TourState;
    urlQuery: BrowserUrlQuery.Params;
    errorCallback: React.MutableRefObject<ErrorContextValue | null>;
}
export interface CommonProps {
    className?: string;
    id?: string;
    style?: Partial<React.CSSProperties>;
    key?: string;
    innerRef?: React.Ref<any>;
}
declare global {
    interface Window {
        jumpToTirexNode: (publicId: string, options?: NodeJumpOptions) => Promise<void>;
        jumpToTirexNodeInCurrentPackage: (nodePublicId: string, options?: NodeJumpOptions) => Promise<void>;
        jumpToTirexNodeOnGlobal: (localId: string, options?: BuIdJumpOptions) => Promise<void>;
        jumpToTirexNodeOnLocal: (localId: string, packageId?: string, packageVersion?: string, options?: BuIdJumpOptions) => Promise<void>;
        importProject: (agentMode: AgentMode, publicId: string) => Promise<void>;
        importProjectInCurrentPackage: (agentMode: AgentMode, nodePublicId: string) => Promise<void>;
        getTirexTheme: () => Promise<string | undefined>;
        TICloudAgent?: typeof TICloudAgent;
        tiUserGeo: object;
        _tiAnalyticsTrack: (arg1: string, arg2: string, eventName: string, eventData: object) => void;
        rexRegisterData: (callbackName: string) => void;
        rexRegisterDataCallback: (() => void) | null;
        appPropsInitial: AppPropsInitial | null;
        initialPage: string | null;
        testingHelpers: typeof TestingHelpers | null;
        fakeXML: (new () => XMLHttpRequest) | null;
    }
}
export interface SearchData {
    link: string;
    htmlTitle: string;
    htmlSnippet: string;
}
export interface SearchResultPage {
    items: SearchData[];
    searchInformation: {
        totalResults: number;
    };
    error?: string;
}
export declare const enum LocalStorageKey {
    LAST_VISITED = "LastVisited",
    RESTORE_LAST_VISITED = "RestoreLastVisited",
    LAST_INSTALL_LOCATION = "LastInstallLocation",
    OPEN_EXTERNALLY_AUTOMATICALLY = "OpenExternallyAutomatically",
    IMPORT_OLDER_PACKAGE_AUTOMATICALLY = "ImportOlderPackageAutomatically",
    THEME = "Theme",
    LAST_AUTOMATIC_PAGE_REFRESH = "LastAutomaticPageRefresh"
}
export declare const enum NodeMessage {
    DOWNLOAD_ONLY = "DownloadOnly",
    EXTERNAL_ONLY = "ExternalOnly",
    FILTERED_NODE = "FilteredNode",
    NO_RESULTS = "NoResults",
    UNKNOWN_NODE = "UnknownNode",
    NO_MESSAGE = "NoMessage"
}
export { Page } from '../../shared/routes/page';
export declare const enum ServerMode {
    REMOTESERVER = "remoteserver",
    LOCALSERVER = "localserver"
}
export type UseStylesClasses<UseStylesFn extends (...args: any) => any> = Partial<ReturnType<UseStylesFn>['classes']>;
export declare const DEFAULT_PAGE_TITLE = "TI Resource Explorer";
export declare const FILTER_TITLE_MAP: {
    [key in keyof Filter]: string;
};
export declare const GAPI_KEY = "AIzaSyCF84mS_LOb9Xj58LA6jv4lOHj75ifI36k";
export declare const BAPI_KEY = "99c3245eaf374f9db4074287b8a08db3";
export declare const HIGHEST_SAFE_NUMBER = 2147483647;
export declare const LATEST = "LATEST";
export declare const LOADING_DELAY_MS = 300;
export declare const enum SearchEngineId {
    SEARCH_ENGINE_ID_GOOGLE = "009639744219465978673:d9p5mpo0vbe",
    SEARCH_ENGINE_ID_BING = "a69a88cc-3287-4749-8642-fefff9d6da81"
}
export declare const enum SearchEngine {
    BING = 0,
    GOOGLE = 1
}
export declare const TEST_ID: {
    autoDetectButton: string;
    autoDetectDetectedMenu: string;
    autoDetectDetectedMenuItem: (id: string) => string;
    autoDetectDialogClose: string;
    autoDetectDialogContent: string;
    autoDetectDownloadProgressBar: string;
    breadcrumbHome: string;
    breadcrumbNode: (dbId: string) => string;
    changeVersionDropdownElementsMenuItem: (packageGroupUid: string, latest: boolean) => string;
    changeVersionDropdownElementsMenuItemNoVersions: string;
    filterAllFiltersButton: string;
    filterBoardDeviceFilter: string;
    filterKeywordsFilter: string;
    filterRadioButton: (key: string, id: string) => string;
    iframeElement: string;
    importSelectTargetApply: string;
    importSelectTargetCancel: string;
    importSelectTargetRadio: (targetId: string) => string;
    importInstallMissingDialog: string;
    importInstallMissingInstallButton: string;
    importInstallMissingCancelButton: string;
    importSelectTargetDialog: string;
    importConfirmImportDialog: string;
    importConfrimImportImportButton: string;
    importConfirmImportCancelButton: string;
    installButton: string;
    installCancelButton: string;
    installConfirmationDialog: string;
    installMessageText: (packageId: string, versionRange: string) => string;
    installDialog: string;
    installLocationContextMenu: string;
    installLocationContextMenuButton: string;
    installLocationDropdownElementsMenuItem: (idx: string) => string;
    installLocationText: (packageId: string, versionRange: string) => string;
    installModifyButton: string;
    installSelectCheckbox: (packageId: string, versionRange: string) => string;
    installNextButton: string;
    licenseAcceptButton: string;
    licenseDeclineButton: string;
    licenseDialog: string;
    messageText: string;
    navbarDialog: string;
    navbarTitle: string;
    navbarMenu: string;
    navbarMenuButton: string;
    navbarMenuPackageManager: string;
    navbarMenuLoadLastSession: string;
    navbarMenuAutoLoadLastSession: string;
    navbarMenuTableView: string;
    nodeContentMenuDialog: string;
    nodeContextMenuDownloadVersion: string;
    nodeContextMenuImport: string;
    nodeContextMenuInstall: string;
    nodeContextMenuInstallModify: string;
    nodeContextMenuUninstall: string;
    nodeContextMenuOpenInNewTab: string;
    nodeContextMenuManageVersions: string;
    nodePresentationContextMenu: string;
    nodePresentationContextMenuButton: (nodeDbId: string) => string;
    packageContextMenuAddVersion: string;
    packageContextMenuChangeVersion: string;
    packageContextMenuDownloadVersion: string;
    packageContextMenuHideVersion: string;
    packageManagerActionsMenu: string;
    packageManagerActionsMenuButton: (packageUid: string) => string;
    packageManagerApplyButton: string;
    packageManagerCancelButton: string;
    packageManagerMoreInfoButton: (packageId: string) => string;
    packageManagerPackageNameText: (packageUid: string) => string;
    packageManagerShowInTreeAllCheckbox: string;
    packageManagerShowInTreeCheckbox: (packageUid: string, latest: boolean) => string;
    packageManagerSummaryButton: string;
    packageManagerTable: string;
    packageManagerVersionText: (packageUid: string) => string;
    selectTableItemVariantDialog: string;
    selectTableItemVariantOkButton: string;
    selectTableItemVariantCancelButton: string;
    selectTableItemVariantCompilerContextMenu: string;
    selectTableItemVariantCompilerContextMenuButton: string;
    selectTableItemVariantCompilerDropdownElementsMenuItem: (idx: string) => string;
    selectTableItemVariantKernelContextMenu: string;
    selectTableItemVariantKernelContextMenuButton: string;
    selectTableItemVariantKernelDropdownElementsMenuItem: (idx: string) => string;
    suggestionsItem: (key: string) => string;
    suggestionsList: string;
    tableViewDisplay: string;
    tableViewMessage: string;
    tableViewItemImport: (id: string) => string;
    tableViewItemNodeLink: (id: string) => string;
    tableViewItemReadme: (id: string) => string;
    testLandingPageButton: string;
    uninstallYesButton: string;
    uninstallNoButton: string;
    wizardNextButton: string;
};
export declare function convertToCloudAgentError(err: Error | string): CloudAgentError;
/**
 * Do a controlled task - this is a task which uses the APIControl task to perform synchronization.
 *
 * @param apiControl
 * @param masterName
 * @param task
 *
 */
export declare function doControledTask<T>(apiControl: APIControl, masterName: string, task: () => Promise<T>): Promise<void>;
export declare function evtHandler<T extends any[], U>(onEvt: (...arg: T) => U, errorCallback: React.RefObject<ErrorContextValue | null>): (...args: T) => void;
export declare function evtHandlerAsync<T extends any[], U>(onEvt: (...arg: T) => Promise<U>, errorCallback: React.RefObject<ErrorContextValue | null>): (...args: T) => void;
export declare function handleError(e: Error, errorCallback: React.RefObject<ErrorContextValue | null>): void;
/**
 * If the cloud agent or the tirex module are not available use this fallback method to determine if we're in desktop / cloud.
 *
 */
export declare function fallbackIsDesktop(): boolean;
export declare function isNoConnectionPageMode(): boolean | "";
type ServerConfigExtended = ServerConfig & {
    isDesktopServer?: boolean;
};
export declare function getServerConfig(): ServerConfigExtended;
export declare function getPackageLicense(node: Nodes.Node, appProps: AppProps): string[] | undefined;
export declare function getPlatform(): import("../../shared/routes/response-data").Platform;
export declare function getTICloudAgentObject(): Promise<typeof TICloudAgent>;
export declare function _clearTICloudAgentObject(): void;
/**
 * Get the tableItemVariant as a string (sorted). Useful for comparing.
 *
 */
export declare function getTableItemVariantAsString(variant: TableView.TableItemVariant): string;
export declare function getWizardPermanentFilters(appProps: AppProps): {
    resourceClasses: FilterData.Data[];
};
export declare function isBrowserEnvironment(): boolean;
export declare function isCloudAgentInstalled(): Promise<boolean>;
export declare function isNodeInFilter(nodeExtended: Nodes.NodeExtended, urlQuery: BrowserUrlQuery.Params, apis: APIs): Promise<boolean>;
/**
 * Determine if there are any results for the given urlQuery
 *
 * @param urlQuery
 * @param apis
 *
 * @returns resultsFound
 */
export declare function resultsFound(urlQuery: BrowserUrlQuery.Params, apis: APIs): Promise<boolean>;
export declare function setTestingHelpers(): Promise<void>;
export declare function refreshTirexPage(isNetworkErrorWithOfflineAvaliable: boolean): void;
/**
 * Script for Geo location
 *
 */
export declare function setTiUserGeo(): Promise<void>;
export declare function humanFileSize(size: number): string;
/**
 *  Modes
 */
export declare function isTableViewMode(appProps: AppProps): boolean;
export declare function getTheiaPort(): number;
export declare function getApplicationTheme(): string;
export declare function getTheiaCookieConsent(): boolean;
export declare function isPopupEnabledInner({ windowObj, agentMode }: {
    windowObj: WindowProxy | null;
    agentMode: 'desktop' | 'cloud';
}): boolean;
