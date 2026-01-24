/**
 * Get the passed in appConfig, dconfig, and dinfra paths
 *
 * TODO this is a major hack, remove.
 */
export declare function getAppConfig(): Promise<{
    dinfra: string | null;
    dconfig: string | null;
    appConfig: string | null;
}>;
