export declare class VirtualNodeId {
    readonly realNodeId: number;
    readonly fileId: number;
    constructor(realNodeId: number, fileId: number);
    static isNodeIdVirtual(nodeId: number): boolean;
    static recomposeVirtualNodeId(nodeId: number): VirtualNodeId;
    decompose(): number;
}
export declare function createVirtualPublicNodeId(realPublicNodeId: string, virtualFileId: number | string): string;
export declare function isPublicNodeIdVirtual(publicNodeId: string): boolean;
export declare function getVirtualPublicNodeComponents(virtualPublicNodeId: string): {
    realNodePublicId: string;
    virtualFileId: string | number;
} | null;
/**
 * Returns given string as number, but only if it's a true integer and positive with no whitespace
 */
export declare function strictStringToPositiveInteger(s: string): number | null;
