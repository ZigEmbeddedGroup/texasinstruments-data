/// <reference types="agent" />
import * as _ from 'lodash';
import * as sinon from 'sinon';
import { Options } from './util';
export declare const enum MockAgentType {
    AGENT_NOT_INSTALLED = 0,
    HOST_FILES_MISSING = 1,
    UNKNOWN_ERROR = 2
}
export declare const mockInstallWizard: {
    title: string;
    detailsLink: {
        text: string;
        url: string;
    };
    helpLink: {
        text: string;
        url: string;
    };
    finishStep: {
        description: string;
        action: {
            text: string;
            handler: () => void;
        };
    };
    initialMessage: {
        description: string;
        action: {
            text: string;
        };
    };
    description: string;
    steps: {
        description: string;
        action: {
            text: string;
            handler: () => void;
        };
    }[];
};
/**
 * Mock TICloudAgent namespace, but with only the functions we care about
 *
 */
declare class MockAgentNamespace implements Partial<typeof TICloudAgent> {
    private readonly options;
    Install: {
        getInstallWizard: () => Promise<{
            title: string;
            detailsLink: {
                text: string;
                url: string;
            };
            helpLink: {
                text: string;
                url: string;
            };
            finishStep: {
                description: string;
                action: {
                    text: string;
                    handler: () => void;
                };
            };
            initialMessage: {
                description: string;
                action: {
                    text: string;
                };
            };
            description: string;
            steps: {
                description: string;
                action: {
                    text: string;
                    handler: () => void;
                };
            }[];
        }>;
    };
    private agent;
    constructor(options: Options);
    Init(): Promise<TICloudAgent.AgentModule>;
}
/**
 * Install a mock TICloudAgent with the given options
 *
 */
export declare function installCloudAgent(options: Options): MockAgentNamespace;
/**
 * Remove any mock TICloudAgent
 *
 */
export declare function uninstallCloudAgent(): void;
export declare function getRexCloudAgentModuleSpies(): _.Dictionary<{
    callCount: number;
    args: any[][];
}>;
export declare function getFullRexCloudAgentModuleSpies(): {
    readonly ENTRY_MODULE_TYPE: sinon.SinonSpy<any[], any>;
    init: sinon.SinonSpy<any[], any>;
    onClose: sinon.SinonSpy<any[], any>;
    getEntryModuleType: sinon.SinonSpy<any[], any>;
    getCCSEclipseInitValues: sinon.SinonSpy<any[], any>;
    addListener: sinon.SinonSpy<any[], any>;
    removeListener: sinon.SinonSpy<any[], any>;
    getPackageInstallInfo: sinon.SinonSpy<any[], any>;
    getInstalledPackages: sinon.SinonSpy<any[], any>;
    getAgentMode: sinon.SinonSpy<any[], any>;
    getProgress: sinon.SinonSpy<any[], any>;
    getVersion: sinon.SinonSpy<any[], any>;
    clearTaskProgress: sinon.SinonSpy<any[], any>;
    installPackage: sinon.SinonSpy<any[], any>;
    uninstallPackage: sinon.SinonSpy<any[], any>;
    importProject: sinon.SinonSpy<any[], any>;
    openExternally: sinon.SinonSpy<any[], any>;
    onProductsChanged: sinon.SinonSpy<any[], any>;
    getBoardAndDeviceInfo: sinon.SinonSpy<any[], any>;
    getInstallInfoForPackageDependencies: sinon.SinonSpy<any[], any>;
    getInstallInfoForPackages: sinon.SinonSpy<any[], any>;
    _addProgressTask: sinon.SinonSpy<any[], any>;
};
export {};
