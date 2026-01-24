import * as React from 'react';
import { Progress } from '../../cloudagent/progress-manager';
import { AppProps, CommonProps, UseStylesClasses } from '../component-helpers/util';
interface BackgroundTasksProps extends CommonProps {
    appProps: AppProps;
    disableClose?: boolean;
    classes?: UseStylesClasses<typeof useBackgroundTasksStyles>;
}
interface TaskDisplayProps extends CommonProps {
    appProps: AppProps;
    progress: Progress;
    progressId: string;
    onDisplayError: (message: string) => void;
    disableClose?: boolean;
    classes?: UseStylesClasses<typeof useTaskDisplayStyles>;
}
declare const useBackgroundTasksStyles: import("tss-react/tss").Tss.UseStyles<{
    theme: import("@mui/material/styles/createTheme").Theme;
}, {}, "icon" | "root" | "alertToolTip" | "containedButton" | "iconButton" | "circularProgress", import("tss-react/mui").MuiThemeStyleOverridesPluginParams>;
export declare function BackgroundTasks(props: BackgroundTasksProps): React.JSX.Element;
declare const useTaskDisplayStyles: import("tss-react/tss").Tss.UseStyles<{
    theme: import("@mui/material/styles/createTheme").Theme;
}, {}, "root" | "completeIcon" | "errorIcon" | "inProgressIcon" | "linearProgress" | "listItemText" | "statusListItemIcon" | "taskInfoContainer", import("tss-react/mui").MuiThemeStyleOverridesPluginParams>;
export declare function TaskDisplay(props: TaskDisplayProps): React.JSX.Element;
export {};
