import * as DinfraTypes from 'dinfra';
import { GlobalMetadataData } from '../shared/routes/response-data';
import { RexObject } from '../lib/rex';
import { DesktopServerVars } from '../lib/vars';
type LocalGlobalMetadata = GlobalMetadataData & {
    sessionId?: string;
    packageUids?: string[];
};
export declare const defaultGlobalMetadataFileName = "default-global-metadata.json";
export declare const latestGlobalMetadataFileName = "latest-global-metadata.json";
export declare class GlobalMetaDataManager {
    private readonly rex;
    private readonly desktopConfig;
    private readonly logger;
    private localGlobalMetadata;
    constructor(rex: RexObject, desktopConfig: DesktopServerVars, logger: DinfraTypes.Logger);
    /**
     * Get latest global metadata and database sessionId from remote server
     */
    updateLocalGlobalDataFromRemoteServer(): Promise<boolean>;
    reloadLocalGlobalMetadata(): Promise<void>;
    getLocalGlobalMetadata(): Promise<LocalGlobalMetadata>;
    /**
     * Read and verify global metadata json file, if file exists; otherwise return undefined
     */
    private readGlobalMetadataJsonFile;
}
export {};
