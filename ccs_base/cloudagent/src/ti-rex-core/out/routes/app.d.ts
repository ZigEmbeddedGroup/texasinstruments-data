import { Request, Response } from 'express';
import { AppConfig } from '../lib/appConfig';
import * as DinfraTypes from 'dinfra';
import { DesktopServerManager } from '../desktop-server/desktop-server-manager';
export declare function getRoutes(dinfra: typeof DinfraTypes, config: AppConfig, desktopServer?: DesktopServerManager): import("express-serve-static-core").Router;
export declare function components(config: AppConfig): (req: Request, res: Response) => void;
