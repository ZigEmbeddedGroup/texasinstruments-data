import * as React from 'react';
import { PackageData } from '../../apis/filter-types';
import { AppProps, CommonProps } from '../../component-helpers/util';
import type { AgentMode } from '../../../cloudagent/interface';
import { Nodes } from '../../../shared/routes/response-data';
import { InstallItem } from './util';
interface DoInstallOrDownloadProps extends CommonProps {
    appProps: AppProps;
    agentMode: AgentMode | null;
    pkgs: PackageData[];
    additonalDependencies: InstallItem[];
    installLocation: string | null;
    actionType: 'install' | 'download';
    downloadUrl: string | null;
    onClose: (progressIds: string[] | null) => void;
    onPopupDisabled: () => void;
    showForegroundInstall?: boolean;
}
type PkgOrNode = {
    pkg: PackageData;
    type: 'pkg';
} | {
    node: Nodes.Node;
    nodeExtended: Nodes.NodeExtended;
    type: 'node';
};
export declare function DoPackageInstallOrDownload(props: DoInstallOrDownloadProps): React.JSX.Element;
export declare function doDownload(pkgOrNode: PkgOrNode, agentMode: AgentMode, appProps: AppProps): boolean;
export {};
