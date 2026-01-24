import * as React from 'react';
import { AppProps, CommonProps, UseStylesClasses } from '../../component-helpers/util';
import { PackageData } from '../../apis/filter-types';
import type { AgentMode } from '../../../cloudagent/interface';
import { DisplayMode, InstallItem } from './util';
import { PackageDependency } from '../../../shared/routes/response-data';
export interface InstallOrDownloadPackageProps extends CommonProps {
    appProps: AppProps;
    agentMode: AgentMode | null;
    installItems: InstallItem[];
    onOpen: () => void;
    onClose: (progressIds: string[] | null, packageUids: string[] | null) => void;
    displayMode: DisplayMode;
    skipInstallingMessage?: boolean;
    modifyInstall?: boolean;
    downloadMode?: boolean;
    classes?: UseStylesClasses<typeof useInstallOrDownloadPackageStyles>;
    showForegroundInstall?: boolean;
}
declare const useInstallOrDownloadPackageStyles: import("tss-react/tss").Tss.UseStyles<{
    theme: import("@mui/material/styles/createTheme").Theme;
}, {}, "root" | "button" | "buttonText" | "iconWithText", import("tss-react/mui").MuiThemeStyleOverridesPluginParams>;
/**
 * Button that prompts for install or download.
 */
export declare function InstallOrDownloadPackage(props: InstallOrDownloadPackageProps): React.JSX.Element;
export declare function getInstallItemsFromRequestedItem(packagePublicUid: string, packages: PackageData[], additionalDependencies?: PackageDependency[]): InstallItem[];
export {};
