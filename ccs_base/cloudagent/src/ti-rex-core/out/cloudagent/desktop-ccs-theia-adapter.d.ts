import { Logger } from '../utils/logging';
import { Vars } from '../lib/vars';
import { CCSAdapterBase } from './ccs-adapter-base';
/**
 * CCS Adapter for Desktop Server
 */
export declare class DesktopCCSTheiaAdapter extends CCSAdapterBase {
    private readonly ccsTheiaRequest;
    private readonly defaultContentPath;
    constructor(logger: Logger, ccsPort: number, vars: Vars);
    /**
     * Get the list of search paths used by CCS Theia.
     */
    getSearchPaths(): Promise<string[]>;
    /**
     * Get the list of installed packages from CCS Theia.
     */
    getInstalledPackages(): Promise<import("./response-data").InstalledPackage[]>;
}
