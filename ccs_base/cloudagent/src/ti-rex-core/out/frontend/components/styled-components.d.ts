/**
 * HOCs for 3rd party components with our own stylings applied.
 *
 */
import * as React from 'react';
import { LinkProps as ReactRouterLinkProps } from 'react-router-dom';
import { LinkProps as MuiLinkProps } from '../imports/material-ui-imports';
import { UseStylesClasses } from '../component-helpers/util';
import { Omit } from '../../shared/generic-types';
type ClickableLinkProps = Omit<MuiLinkProps, 'classes'> & {
    classes?: UseStylesClasses<typeof useClickableLinkStyles>;
};
declare const useClickableLinkStyles: import("tss-react/tss").Tss.UseStyles<{
    theme: import("@mui/material/styles/createTheme").Theme;
}, {}, "root", import("tss-react/mui").MuiThemeStyleOverridesPluginParams>;
export declare const Link: React.ForwardRefExoticComponent<Omit<ReactRouterLinkProps, "classes"> & {
    classes?: Partial<Record<"root", string>> | undefined;
} & React.RefAttributes<any>>;
export declare const ClickableLink: React.ForwardRefExoticComponent<globalThis.Omit<ClickableLinkProps, "ref"> & React.RefAttributes<any>>;
export {};
