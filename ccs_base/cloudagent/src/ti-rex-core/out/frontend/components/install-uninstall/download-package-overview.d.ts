import * as React from 'react';
import { AppProps, UseStylesClasses, CommonProps } from '../../component-helpers/util';
import { InstallItem } from './util';
import { AgentMode } from '../../../cloudagent/interface';
export interface DownloadPackageOverviewProps extends CommonProps {
    appProps: AppProps;
    agentMode: AgentMode;
    onPopupDisabled: () => void;
    installItems: InstallItem[];
    onSelectionUpdate: (packageUids: string[]) => void;
    classes?: UseStylesClasses<typeof useDownloadPackageOverviewStyles>;
    standaloneMode?: boolean;
}
interface DownloadDependencyOverviewProps extends CommonProps {
    appProps: AppProps;
    agentMode: AgentMode;
    onPopupDisabled: () => void;
    dependencies: InstallItem[];
    classes?: UseStylesClasses<typeof useDownloadPackageOverviewStyles>;
}
declare const useDownloadPackageOverviewStyles: import("tss-react/tss").Tss.UseStyles<{
    theme: import("@mui/material/styles/createTheme").Theme;
}, {}, "root" | "header" | "checkboxDefaultModuleGroup" | "checkboxNonDefaultModuleGroup" | "footerContainer" | "footerItem" | "installSizeTable", import("tss-react/mui").MuiThemeStyleOverridesPluginParams>;
export declare function DownloadPackageOverview(props: DownloadPackageOverviewProps): React.JSX.Element;
export declare function DownloadDependencyOverview(props: DownloadDependencyOverviewProps): React.JSX.Element;
export {};
