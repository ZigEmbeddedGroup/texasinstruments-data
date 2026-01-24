import * as React from 'react';
import { CommonProps, UseStylesClasses } from '../component-helpers/util';
interface SplashPresentationProps extends CommonProps {
    message: JSX.Element | string;
    messageType: MESSAGE_TYPE;
    isNetworkErrorWithOfflineAvaliable?: boolean;
    classes?: UseStylesClasses<typeof useStyles>;
}
export declare enum MESSAGE_TYPE {
    ERROR = "error",
    INFO = "INFO"
}
declare const useStyles: import("tss-react/tss").Tss.UseStyles<{
    theme: import("@mui/material/styles/createTheme").Theme;
}, {}, "text" | "root" | "paper" | "errorIcon" | "refreshButton" | "warningIcon" | "messageBody" | "messageText" | "offlineContent", import("tss-react/mui").MuiThemeStyleOverridesPluginParams>;
export declare const Message: React.ForwardRefExoticComponent<SplashPresentationProps & React.RefAttributes<any>>;
export {};
