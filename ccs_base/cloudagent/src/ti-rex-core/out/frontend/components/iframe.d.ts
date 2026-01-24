import * as React from 'react';
import { CommonProps, UseStylesClasses } from '../component-helpers/util';
interface IframeProps extends CommonProps {
    src?: string;
    srcDoc?: string;
    onLoad?: () => void;
    classes?: UseStylesClasses<typeof useStyles>;
}
declare const useStyles: import("tss-react/tss").Tss.UseStyles<{
    theme: import("@mui/material/styles/createTheme").Theme;
}, {}, "iframe" | "iframeContainer" | "loadingBar", import("tss-react/mui").MuiThemeStyleOverridesPluginParams>;
export declare function Iframe(props: IframeProps): React.JSX.Element;
export {};
