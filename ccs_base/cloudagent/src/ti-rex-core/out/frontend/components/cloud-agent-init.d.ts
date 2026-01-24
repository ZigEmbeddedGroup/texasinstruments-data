/// <reference types="agent" />
import * as React from 'react';
import { MountComponentTemporarily } from '../component-helpers/mount-component-temporarily';
import { CommonProps } from '../component-helpers/util';
import { AgentState } from '../component-helpers/use-cloud-agent';
import { ErrorContextValue } from '../component-helpers/context';
interface CloudAgentInitProps extends CommonProps {
    agentState: AgentState | null;
    children: JSX.Element;
    mountComponentTemporarily: MountComponentTemporarily;
    onChange: () => void;
    errorCallback: React.MutableRefObject<ErrorContextValue | null>;
}
interface InstallCloudAgentProps extends CommonProps {
    cloudAgentInitErrors: TICloudAgent.Error[];
    children: JSX.Element;
    mountComponentTemporarily: MountComponentTemporarily;
    onClose: () => void;
    errorCallback: React.MutableRefObject<ErrorContextValue | null>;
}
export declare function CloudAgentInit(props: CloudAgentInitProps): React.JSX.Element;
export declare const InstallWizard: React.ForwardRefExoticComponent<InstallCloudAgentProps & React.RefAttributes<any>>;
export {};
