import * as React from 'react';
import { Nodes } from '../../shared/routes/response-data';
import { AppProps, CommonProps } from '../component-helpers/util';
import type { AgentMode } from '../../cloudagent/interface';
export interface ImportProps extends CommonProps {
    appProps: AppProps;
    agentMode: AgentMode | null;
    node: Nodes.Node;
    projectName: string | null;
    onClose?: (importComplete: boolean) => void;
    onInstall?: (progressIds: string[]) => void;
    skipInstallingMessage?: boolean;
}
export declare function Import(props: ImportProps): React.JSX.Element;
