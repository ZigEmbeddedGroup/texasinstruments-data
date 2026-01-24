import * as React from 'react';
import { ListProps, PopoverProps } from '../../imports/material-ui-imports';
import { DropDownDirection } from './drop-down-list-types';
import { CommonProps, UseStylesClasses } from '../../component-helpers/util';
interface DropdownMenuProps extends CommonProps {
    isOpen: boolean;
    onClose: () => void;
    toggle: JSX.Element;
    direction: DropDownDirection;
    listProps?: Partial<ListProps>;
    popoverProps?: Partial<PopoverProps>;
    children?: React.ReactNode;
    classes?: UseStylesClasses<typeof useStyles>;
}
declare const useStyles: import("tss-react/tss").Tss.UseStyles<{
    theme: import("@mui/material/styles/createTheme").Theme;
}, {}, "root" | "paper", import("tss-react/mui").MuiThemeStyleOverridesPluginParams>;
export declare const DropdownMenu: React.ForwardRefExoticComponent<DropdownMenuProps & React.RefAttributes<any>>;
export {};
