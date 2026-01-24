import { APIControl } from './api-control';
import { BrowserUrlQuery, PackageScopedResourceIdUrlQuery, GlobalResourceIdUrlQuery } from './filter-types';
import { TableView } from '../../shared/routes/response-data';
import { SearchEngine, SearchEngineId } from '../component-helpers/util';
export declare class APIs {
    private apiControl;
    private apisInternal;
    private counter;
    getNodes(ids: string[], masterName?: string): Promise<import("../../shared/routes/response-data").Nodes.Node[]>;
    getExtendedNodes(id: string, masterName?: string): Promise<import("../../shared/routes/response-data").Nodes.NodeExtended>;
    getFilteredChildrenNodes(parentIds: string[], urlQuery: BrowserUrlQuery.Params, masterName?: string): Promise<import("../../shared/routes/response-data").Nodes.Node[][]>;
    getFilteredTableItems(parentId: string, urlQuery: BrowserUrlQuery.Params, isProjectWizard: boolean, masterName?: string): Promise<TableView.TableItem[]>;
    getNodeDataForTableItemVariant(tableItemId: string, urlQuery: BrowserUrlQuery.Params, variant: TableView.TableItemVariant, masterName?: string): Promise<Readonly<import("../../shared/routes/response-data").Nodes.FolderNode> | Readonly<import("../../shared/routes/response-data").Nodes.FolderWithResourceNode> | Readonly<import("../../shared/routes/response-data").Nodes.PackageFolderNode> | Readonly<import("../../shared/routes/response-data").Nodes.LeafNode>>;
    getTableViewFilters(parentId: string, urlQuery: BrowserUrlQuery.Params, isProjectWizard: boolean, masterName?: string): Promise<import("../../lib/dbBuilder/dbTypes").AvailableTableViewFilters>;
    expandNode(id: string, urlQuery: BrowserUrlQuery.Params, masterName?: string): Promise<void>;
    getSearchSuggestions(text: string, urlQuery: BrowserUrlQuery.Params, masterName?: string): Promise<import("../../shared/routes/request-response").Response.SearchSugestionsData>;
    getImportInfo(id: string, urlQuery: BrowserUrlQuery.Params, masterName?: string): Promise<import("../../shared/routes/request-response").Response.ImportInfoData>;
    getDynamicPackageDownload(packages: string[], masterName?: string): Promise<import("../../shared/routes/request-response").Response.DynamicDownloadRequest>;
    getDynamicPackageDownloadStatus(requestToken: string, masterName?: string): Promise<import("../../shared/routes/request-response").Response.DynamicDownloadStatus>;
    getPackages(masterName?: string): Promise<import("./filter-types").PackageData[]>;
    getPackageGroups(masterName?: string): Promise<import("./filter-types").PackageGroupData[]>;
    getFilterOptions(masterName?: string): Promise<import("./filter-types").FilterData.Options>;
    getNodeInfoForResourceId(query: PackageScopedResourceIdUrlQuery, masterName?: string): Promise<import("../../shared/routes/request-response").Response.NodeInfoForResourceIdData>;
    getNodeInfoForGlobalId(query: GlobalResourceIdUrlQuery, masterName?: string): Promise<import("../../shared/routes/request-response").Response.NodeInfoForResourceIdData>;
    getNodeDbId(nodePublicId: string, packageGroupPublicUid: string | null, packagePublicId: string | null, isLatest: boolean, masterName?: string): Promise<string>;
    getRex3LinkToDbId(link: string, masterName?: string): Promise<string>;
    getSearchResultsPage({ textSearch, pageNum, resultsPerPage, searchEngine, searchEngineId, masterName }: {
        textSearch: string;
        pageNum: number;
        resultsPerPage: number;
        searchEngine: SearchEngine;
        searchEngineId: SearchEngineId;
        masterName?: string;
    }): Promise<import("../component-helpers/util").SearchResultPage>;
    getDesktopServerStatus(masterName?: string): Promise<import("../../shared/routes/request-response").Response.DesktopServerStatusData>;
    getAPIControl(): APIControl;
    _getServerInterface(): import("./server-interface").ServerInterface;
    _getCacheInterface(): import("./apis-cache-interface").ApisCacheInterface;
    private static measureTime;
    private apiWithFilterQuery;
    private apiNoQuery;
    /**
     * Register a tasks to be processed. If another master has control your
     * request will only be processed once it is finished.
     *
     */
    private registerTask;
}
