import * as React from 'react';
import { CommonProps, UseStylesClasses } from '../component-helpers/util';
interface LicenseProps extends CommonProps {
    onAgree: () => void;
    onDisagree: () => void;
    license: string[];
    classes?: UseStylesClasses<typeof useStyles>;
}
declare const useStyles: import("tss-react/tss").Tss.UseStyles<{
    theme: import("@mui/material/styles/createTheme").Theme;
}, {}, "root" | "iframe" | "agreeButton" | "disagreeButton" | "dialogContent", import("tss-react/mui").MuiThemeStyleOverridesPluginParams>;
export declare function License(props: LicenseProps): React.JSX.Element;
export {};
