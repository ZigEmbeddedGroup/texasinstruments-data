import * as React from 'react';
export interface UnknownErrorProps {
    error: string;
    onClose: () => void;
}
export declare function UnknownError(props: UnknownErrorProps): React.JSX.Element;
