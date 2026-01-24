import { Logger } from '../utils/logging';
import { CCSProduct } from './util';
import { InstalledPackage } from './response-data';
/**
 * This is a class that interfaces with CCS desktop to communicate
 * project/package information.  It can be used to:
 *  - discover what packages the IDE already knows about (which should trigger a meta-data download
 *    for any packages the rex doesn't know about)
 *  - list what search paths the IDE uses, and thus where rex should install packages to
 *  - notify the IDE that a new package has been installed (which should trigger it to re-discover
 *    packages)
 *  - import a project into the IDE
 *
 * In CCS Theia we will communicate to the browser, using the triggerEvent mechanism. The browser will talk to CCS and return the response via the same triggerEvent mechanism.
 * In CCS Eclipse we will use http apis to talk directly with CCS.
 */
export declare class CCSAdapterBase {
    protected readonly logger: Logger;
    constructor(logger: Logger);
    protected getPackageInfoForProducts(idePackages: CCSProduct[]): Promise<InstalledPackage[]>;
    private getCCSBaseItems;
}
