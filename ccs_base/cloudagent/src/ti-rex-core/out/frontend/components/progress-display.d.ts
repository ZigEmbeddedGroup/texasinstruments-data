import * as React from 'react';
import { AppProps, CommonProps } from '../component-helpers/util';
import { useGetProgress } from '../component-helpers/use-local-apis';
interface ProgressDisplayProps extends CommonProps {
    appProps: AppProps;
    progressIds: string[];
    title: string;
    onClose: () => void;
    disableClose?: boolean;
    useCustomProgress?: () => ReturnType<typeof useGetProgress>;
    noDialog?: boolean;
}
export declare const ProgressDisplay: React.ForwardRefExoticComponent<ProgressDisplayProps & React.RefAttributes<any>>;
export {};
