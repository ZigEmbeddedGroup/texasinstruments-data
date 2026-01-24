import * as React from 'react';
import { ErrorContextValue } from './context';
import { AppProps } from './util';
interface UseIsPackageInstalledParams {
    appProps: AppProps;
    errorCallback: React.RefObject<ErrorContextValue | null>;
    packageUid: string;
    allowNoAgent?: boolean;
}
interface UseIsPackageInstalledWithMatchingNodeParams {
    appProps: AppProps;
    errorCallback: React.RefObject<ErrorContextValue | null>;
    packageUid: string;
    nodePublicId: string;
    allowNoAgent?: boolean;
}
export declare const enum PackageInstalled {
    NOT_INSTALLED = "NOT_INSTALLED",
    INSTALLED = "INSTALLED"
}
export declare function useIsPackageInstalled(args: UseIsPackageInstalledParams): {
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitialLoadingUI: boolean;
    initalLoadingInProgress: boolean;
    result: null;
} | {
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitalLoadingUI: boolean;
    initalLoadInProgress: boolean;
    shouldDisplayInitialLoadingUI?: undefined;
    initalLoadingInProgress?: undefined;
    result: null;
} | {
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitialLoadingUI: boolean;
    initalLoadingInProgress: boolean;
    result: PackageInstalled;
} | {
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitalLoadingUI: boolean;
    initalLoadInProgress: boolean;
    shouldDisplayInitialLoadingUI?: undefined;
    initalLoadingInProgress?: undefined;
    result: PackageInstalled;
};
/**
 * Find a node with the same nodePublicId in other packages
 */
export declare function useFindMatchingNodeInOtherPackage(args: UseIsPackageInstalledWithMatchingNodeParams): {
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitalLoadingUI: boolean;
    initalLoadInProgress: boolean;
    result: import("../../shared/routes/response-data").Nodes.Node[] | null;
} | {
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitialLoadingUI: boolean;
    initalLoadingInProgress: boolean;
    result: null;
} | {
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitialLoadingUI: boolean;
    initalLoadingInProgress: boolean;
    result: PackageInstalled.NOT_INSTALLED;
} | {
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitalLoadingUI: boolean;
    initalLoadInProgress: boolean;
    shouldDisplayInitialLoadingUI?: undefined;
    initalLoadingInProgress?: undefined;
    result: PackageInstalled.NOT_INSTALLED;
};
export {};
