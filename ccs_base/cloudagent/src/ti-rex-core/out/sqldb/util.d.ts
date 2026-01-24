import { TraceFunction } from 'denum';
export type UnionKeys<T> = T extends T ? keyof T : never;
export type Expand<T> = T extends T ? {
    [K in keyof T]: T[K];
} : never;
export type OneOf<T extends {}[]> = {
    [K in keyof T]: Expand<T[K] & Partial<Record<Exclude<UnionKeys<T[number]>, keyof T[K]>, never>>>;
}[number];
export declare function hrtimeToSec(hrtime: [number, number] | null): number;
export declare function hrtimeToMillisec(hrtime?: [number, number]): number | undefined;
export declare function hrtimeToNanosec(hrtime: [number, number]): number;
export declare function nstimeToSec(nstime: number): number;
export declare function safeTrace<T>(traceFunc: TraceFunction, ...args: T[]): void;
