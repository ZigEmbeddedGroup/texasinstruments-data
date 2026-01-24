import { ServerFilterQuery, PackageScopedResourceIdUrlQuery, GlobalResourceIdUrlQuery } from './filter-types';
import { Response } from '../../shared/routes/request-response';
import { TableView } from '../../shared/routes/response-data';
import { SearchEngineId, SearchResultPage } from '../component-helpers/util';
interface GoogleSearchQuery {
    textSearch: string;
    pageNum: number;
    resultsPerPage: number;
    searchEngineId: SearchEngineId;
}
interface BingSearchQuery {
    textSearch: string;
    pageNum: number;
    resultsPerPage: number;
    searchEngineId: SearchEngineId;
}
export declare class ServerInterface {
    private lastSessionId;
    private nodesDataPromises;
    private extendedNodesDataPromises;
    private filteredChildrenNodesPromises;
    private filteredTableItemsDataPromises;
    private nodeDataForTableItemVariantPromises;
    private tableViewFiltersPromises;
    private expandedFilteredDescendantNodesDataPromises;
    private searchSuggestionsPromises;
    private importInfoPromises;
    private downloadRequestPromises;
    private downloadStatusPromises;
    private packagesPromises;
    private packageGroupsPromises;
    private filterOptionsPromises;
    private nodePublicIdToDbIdPromises;
    private rex3LinkToDbIdPromises;
    private googleSearchResultsPagePromises;
    private bingSearchResultsPagePromises;
    private nodeInfoForResourceIdPromises;
    private nodeInfoForGlobalIdPromises;
    private desktopServerStatusPromises;
    getNodesData(ids: string[]): Promise<Response.NodesData>;
    getExtendedNodesData(id: string): Promise<Response.NodeExtendedData>;
    getFilteredChildrenNodeIds(parentIds: string[], query: ServerFilterQuery.Params): Promise<Response.FilteredChildrenNodeIds>;
    getExpandedFilteredDescendantNodesData(parentId: string, query: ServerFilterQuery.Params): Promise<Response.ExpandedFilteredDescendantNodesData>;
    getFilteredTableItemsData(parentId: string, query: ServerFilterQuery.Params, isProjectWizard: boolean): Promise<Response.FilteredTableItemsData>;
    getTableViewFilters(parentId: string, query: ServerFilterQuery.Params, isProjectWizard: boolean): Promise<Response.TableViewFiltersData>;
    getNodeDataForTableItemVariant(tableItemDbId: string, query: ServerFilterQuery.Params, variant: TableView.TableItemVariant): Promise<Response.NodesData>;
    getSearchSuggestions(text: string, query: ServerFilterQuery.Params): Promise<Response.SearchSugestionsData>;
    getImportInfo(id: string, query: ServerFilterQuery.Params): Promise<Response.ImportInfoData>;
    getDynamicPackageDownload(packages: string[]): Promise<Response.DynamicDownloadRequest>;
    getDynamicPackageDownloadStatus(requestToken: string): Promise<Response.DynamicDownloadStatus>;
    getPackages(): Promise<Response.PackagesData>;
    getPackageGroups(): Promise<Response.PackageGroupsData>;
    getFilterOptions(): Promise<import("./filter-types").FilterData.Options>;
    getNodeInfoForResourceId({ resourceId, packageId, packageVersion, device, devtool }: PackageScopedResourceIdUrlQuery): Promise<Response.NodeInfoForResourceIdData>;
    getNodeInfoForGlobalId({ globalId, device, devtool }: GlobalResourceIdUrlQuery): Promise<Response.NodeInfoForGlobalIdData>;
    getNodePublicIdToDbId(nodePublicId: string, packageGroupPublicUid: string | null, packagePublicId: string | null, isLatest: boolean): Promise<string>;
    getRex3LinkToDbId(linkField: string): Promise<string>;
    getGoogleSearchResultsPage({ textSearch, pageNum, resultsPerPage, searchEngineId }: GoogleSearchQuery): Promise<SearchResultPage>;
    getBingSearchResultsPage({ textSearch, pageNum, resultsPerPage, searchEngineId }: BingSearchQuery): Promise<SearchResultPage>;
    getDesktopServerStatus(): Promise<Response.DesktopServerStatusData>;
    /**
     * Do an ajax.get on the url.
     * Ensures there isn't an identical request outgoing using the promise tracker.
     * Return the registered promise.
     *
     * @param urls
     * @param promiseTracker
     *
     * @returns registered Promise
     */
    private getFromUrl;
    private validateSearchResultPageAndHandleMissingItems;
    /**
     * Retry the request (twice) to handle intermitent network issues
     */
    private handleRetryRequest;
}
export {};
