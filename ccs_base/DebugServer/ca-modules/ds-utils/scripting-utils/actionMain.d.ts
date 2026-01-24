export interface ActionWorkerData {
    cloudAgentDir: string;
    cloudAgentPort: number;
    action: string;
    timeout?: number;
    sessionObjects: Record<string, string>;
}
export type ActionWorkerResult = {
    error?: unknown;
};
