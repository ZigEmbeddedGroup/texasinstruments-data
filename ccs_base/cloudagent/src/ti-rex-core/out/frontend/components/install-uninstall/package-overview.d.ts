import * as React from 'react';
import { AppProps, CommonProps, UseStylesClasses } from '../../component-helpers/util';
import type { InstalledPackage } from '../../../cloudagent/response-data';
import { InstallPackageData, SelectionItem } from './util';
import { AgentMode } from '../../../cloudagent/interface';
interface PackageOverviewRowProps extends CommonProps {
    appProps: AppProps;
    agentMode: AgentMode;
    installedPackages: InstalledPackage[];
    selectionData: SelectionItem;
    onChange: (installData: InstallPackageData, value: boolean) => void;
    onPopupDisabled: () => void;
    downloadMode: boolean;
    classes?: UseStylesClasses<typeof useInstallPackageOverviewStyles>;
}
declare const useInstallPackageOverviewStyles: import("tss-react/tss").Tss.UseStyles<{
    theme: import("@mui/material/styles/createTheme").Theme;
}, {}, "root" | "checkboxModuleGroup" | "tableCell" | "tableCellPackageName", import("tss-react/mui").MuiThemeStyleOverridesPluginParams>;
export declare function PackageOverviewRowDependency(props: PackageOverviewRowProps): React.JSX.Element;
export declare function PackageOverviewRowModuleGroup(props: PackageOverviewRowProps): React.JSX.Element;
export {};
