import * as React from 'react';
import { Response } from '../../../shared/routes/request-response';
import { Nodes } from '../../../shared/routes/response-data';
import { AppProps, UseStylesClasses } from '../../component-helpers/util';
import type { AgentMode } from '../../../cloudagent/interface';
interface ImportInstallDoneInfo {
    importInfo: Response.ImportInfoData;
    node: Nodes.Node;
}
interface ImportInstallProps {
    appProps: AppProps;
    agentMode: AgentMode | null;
    node: Nodes.Node;
    projectName: string | null;
    onImportInstallDone: (info: ImportInstallDoneInfo | null) => void;
    onInstall?: (progressIds: string[]) => void;
    skipInstallingMessage?: boolean;
    classes?: UseStylesClasses<typeof useStyles>;
}
declare const useStyles: import("tss-react/tss").Tss.UseStyles<{
    theme: import("@mui/material/styles/createTheme").Theme;
}, {}, "root" | "buttonText" | "iconWithText", import("tss-react/mui").MuiThemeStyleOverridesPluginParams>;
/**
 * Checks for missing dependencies and prompts to install.
 * onImportInstallDone is used once we are ready to proceed with import.
 */
export declare function ImportInstall(props: ImportInstallProps): React.ReactElement<any, string | React.JSXElementConstructor<any>> | null;
export {};
