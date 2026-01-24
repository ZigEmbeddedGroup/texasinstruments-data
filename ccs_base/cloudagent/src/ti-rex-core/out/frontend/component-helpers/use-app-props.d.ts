import * as React from 'react';
import { ErrorContextValue } from './context';
import { BrowserUrlQuery } from '../apis/filter-types';
import { AppProps, Page } from './util';
interface UseAppPropsArgs {
    appPropsInitial: AppPropsInitial;
    errorCallback: React.RefObject<ErrorContextValue | null>;
}
interface CreateAppPropsForTestingParams {
    page: Page;
    urlQuery: BrowserUrlQuery.Params;
}
export type AppPropsInitial = Omit<AppProps, 'navigate' | 'urlQuery' | 'filter' | 'filterOptions' | 'packages' | 'packageGroups' | 'selectedNode' | 'selectedNodeExtended'>;
export declare function useAppProps(args: UseAppPropsArgs): {
    shouldDisplayLoadingUI: boolean;
    shouldDisplayInitalLoadingUI: boolean;
    initalLoadInProgress: boolean;
    result: AppProps | null;
};
/**
 * Only use for testing code!
 *
 */
export declare function createAppPropsForTesting({ page, urlQuery }: CreateAppPropsForTestingParams): Promise<AppProps>;
export {};
