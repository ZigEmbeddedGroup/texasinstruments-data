import * as React from 'react';
import { AppProps, CommonProps, UseStylesClasses } from '../../component-helpers/util';
import { InstallItem } from './util';
import { AgentMode } from '../../../cloudagent/interface';
interface InstallPackageOverviewProps extends CommonProps {
    appProps: AppProps;
    agentMode: AgentMode;
    onSelectionUpdate: (packageUids: string[], installLocation: string) => void;
    onPopupDisabled: () => void;
    installItems: InstallItem[];
    classes?: UseStylesClasses<typeof useInstallPackageOverviewStyles>;
}
declare const useInstallPackageOverviewStyles: import("tss-react/tss").Tss.UseStyles<{
    theme: import("@mui/material/styles/createTheme").Theme;
}, {}, "root" | "header" | "checkboxDefaultModuleGroup" | "checkboxNonDefaultModuleGroup" | "footerContainer" | "footerItem" | "installSizeTable" | "messageContainer" | "installSizeTableCell", import("tss-react/mui").MuiThemeStyleOverridesPluginParams>;
export declare function InstallPackageOverview(props: InstallPackageOverviewProps): React.JSX.Element;
export {};
