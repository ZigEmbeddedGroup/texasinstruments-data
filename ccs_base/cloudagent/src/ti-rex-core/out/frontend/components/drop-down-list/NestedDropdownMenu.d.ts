import * as React from 'react';
import { ListProps, ListItemButtonProps } from '../../imports/material-ui-imports';
import { DropDownDirection } from './drop-down-list-types';
import { CommonProps, UseStylesClasses } from '../../component-helpers/util';
interface NestedDropdownMenuProps extends CommonProps {
    toggle: JSX.Element;
    direction: DropDownDirection;
    header?: JSX.Element;
    listItemProps?: Partial<ListItemButtonProps>;
    listProps?: Partial<ListProps>;
    children?: React.ReactNode;
    classes?: UseStylesClasses<typeof useStyles>;
}
declare const useStyles: import("tss-react/tss").Tss.UseStyles<{
    theme: import("@mui/material/styles/createTheme").Theme;
}, {}, "root" | "paper", import("tss-react/mui").MuiThemeStyleOverridesPluginParams>;
export declare const NestedDropdownMenu: (props: NestedDropdownMenuProps) => React.JSX.Element;
export {};
