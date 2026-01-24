import * as React from 'react';
interface ErrorBoundaryProps {
    children: JSX.Element;
}
export declare class ErrorBoundary extends React.Component<ErrorBoundaryProps, {
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}> {
    constructor(props: ErrorBoundaryProps);
    componentDidCatch(error: Error, info: React.ErrorInfo): void;
    render(): React.JSX.Element;
    private handleInboundError;
}
export {};
