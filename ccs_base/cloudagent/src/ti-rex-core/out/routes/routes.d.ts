import { AppConfig } from '../lib/appConfig';
import * as DinfraTypes from 'dinfra';
import { LinkType } from '../lib/dbBuilder/dbTypes';
import { RexObject } from '../lib/rex';
import { DesktopServerManager } from '../desktop-server/desktop-server-manager';
interface Args {
    rex: RexObject;
    dinfra: typeof DinfraTypes;
    config: AppConfig;
    desktopServer?: DesktopServerManager;
}
export declare function getRoutes({ rex, dinfra, config, desktopServer }: Args): import("express-serve-static-core").Router;
export declare function makeLink(link: string, linkType: LinkType, localContentDirSeqNo?: number): string;
export {};
