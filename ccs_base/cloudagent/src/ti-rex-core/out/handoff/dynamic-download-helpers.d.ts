import { RefreshRequestEntry } from '../lib/dbBuilder/dbBuilder';
export declare function getSubmittedModuleZipInfoPerPlatform(refreshParams: RefreshRequestEntry[], contentFolder: string, zipsFolder: string): Promise<({
    platform: string;
    zipPath: string;
    packagePublicUid: string;
} | null)[]>;
