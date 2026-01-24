/// <reference types="node" />
import * as scriptsUtil from '../../scripts-lib/util';
export declare function getUniqueFileName(): string;
/**
 * Get a unique folder name (at least for the current execution)
 *
 * @returns folder - an absolute path
 */
export declare function getUniqueFolderName(prefix?: string): string;
interface TestingGlobals {
    dinfraPath: string;
    remoteserverUrl: string;
    testConfig: scriptsUtil.TestConfig;
    reqLimit: number;
    testMode: scriptsUtil.TestMode;
    dbMode: scriptsUtil.DbMode;
    customTest: string;
    testdataPath: string;
}
export declare let testingGlobals: TestingGlobals;
export declare function setTestingGlobals(args: any): void;
export type TestCategory = 'frontend' | 'cloudagent' | 'handoff' | 'db' | 'db3' | 'backend' | 'seo' | 'other';
export declare function mochaSuiteTitle(title: string, category: TestCategory, module: NodeModule): string;
export {};
