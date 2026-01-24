/**
 * Supports desktop server operations
 */
import { DesktopRequestHandler } from '../desktop-server/desktop-request-handler';
export declare class DesktopServerRoutes {
    private readonly desktopServerReqHandler;
    constructor(desktopServerReqHandler: DesktopRequestHandler);
    getStandardRoutes(): import("express-serve-static-core").Router;
    getContentRoutes(): import("express-serve-static-core").Router;
}
