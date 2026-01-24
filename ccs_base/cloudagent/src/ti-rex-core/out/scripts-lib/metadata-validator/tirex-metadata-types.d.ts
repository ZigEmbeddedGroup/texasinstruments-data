import * as TJS from 'typescript-json-schema';
export interface Package {
    id: nonEmptyString;
    aliases?: nonEmptyStringArray;
    name: nonEmptyString;
    version: nonEmptyString;
    type: 'devices' | 'devtools' | 'software';
    subType?: 'ccsComponent' | 'featureSupport';
    featureType?: 'deviceSupport';
    ccsVersion?: nonEmptyString;
    ccsInstallLocation?: nonEmptyString;
    license?: nonEmptyString;
    image: nonEmptyString;
    description: nonEmptyString;
    location?: nonEmptyString;
    tags?: nonEmptyStringArray;
    devtools?: nonEmptyStringArray;
    devices?: nonEmptyStringArray;
    metadataVersion: '3.1.0';
    supplements?: Supplement;
    /**
     * @minItems 1
     */
    dependencies?: Dependencies[];
    rootCategory?: nonEmptyStringArray;
    restrictions?: nonEmptyStringArray;
    installCommand?: InstallCommand;
    sort?: 'filesAndFoldersAlphabetical' | 'manual' | 'default';
    hideNodeDirPanel?: 'true' | 'false';
    moduleOf?: Supplement;
    moduleGroup?: ModuleGroup;
}
interface Supplement {
    packageId: nonEmptyString;
    semver: nonEmptyString;
}
interface Dependencies {
    packageId: nonEmptyString;
    version: nonEmptyString;
    require: 'optional' | 'mandatory';
}
interface InstallCommand {
    linux?: nonEmptyString;
    macos?: nonEmptyString;
    win?: nonEmptyString;
    all?: nonEmptyString;
}
interface ModuleGroup {
    corePackage: Supplement;
    package: nonEmptyStringArray;
}
export interface Devices {
    id: nonEmptyString;
    aliases?: nonEmptyStringArray;
    name: nonEmptyString;
    type: 'device' | 'family' | 'subfamily';
    parent: nonEmptyString;
    description?: nonEmptyString;
    descriptionLocation?: nonEmptyString;
    image?: nonEmptyString;
    /**
     * @minItems 1
     */
    coreTypes: CoreType[];
}
interface CoreType {
    name: nonEmptyString;
    id: nonEmptyString;
}
export interface Devtools {
    id: nonEmptyString;
    aliases?: nonEmptyStringArray;
    name: nonEmptyString;
    type: 'board' | 'ide' | 'probe' | 'programmer' | 'utility';
    devices?: nonEmptyStringArray;
    description?: nonEmptyString;
    descriptionLocation?: nonEmptyString;
    image: nonEmptyString;
    connections: nonEmptyStringArray;
    buyLink?: nonEmptyString;
    toolsPage?: nonEmptyString;
}
export interface Content {
    localId?: nonEmptyString;
    localAliases?: nonEmptyStringArray;
    globalAliases?: nonEmptyStringArray;
    name: nonEmptyString;
    devices?: nonEmptyStringArray;
    devtools?: nonEmptyStringArray;
    coreTypes?: nonEmptyStringArray;
    tags?: nonEmptyStringArray;
    resourceType: 'project.ccs' | 'project.energia' | 'project.iar' | 'project.keil' | 'file' | 'file.importable' | 'file.executable' | 'folder' | 'folder.importable' | 'web.page' | 'web.app' | 'categoryInfo' | 'other';
    resourceClass: ['example' | 'document' | 'other'];
    resourceSubClass?: [
        'example.outofbox' | 'example.gettingstarted' | 'example.empty' | 'example.general' | 'example.helloworld'
    ];
    fileType?: nonEmptyString;
    shortDescription?: nonEmptyString;
    description: nonEmptyString;
    location: nonEmptyString;
    /**
     * @minItems 1
     * @items.type array
     * @items.items {"type": "string", "enum": ["Devices", "Development Tools", "Documents", "Examples", "Datasheet", "Errata", "Wiki", "White papers", "Reference designs", "Solution guides", "Selection guides", "User guides", "Application notes"]}
     * @items.minItems 1
     */
    mainCategories: mainCategories[][];
    subCategories?: nonEmptyStringArray;
    icon?: nonEmptyString;
    /**
     * @minItems 1
     */
    ide?: ide[];
    /**
     * @minItems 1
     */
    hostOS?: hostOS[];
    /**
     * @minItems 1
     */
    kernel?: kernel[];
    /**
     * @minItems 1
     */
    language?: language[];
    /**
     * @minItems 1
     */
    compiler?: compiler[];
    /**
     * @minItems 1
     */
    viewLimitations?: viewLimitations[];
    advanced?: Advanced;
    sort?: 'filesAndFoldersAlphabetical' | 'manual' | 'default';
}
interface Advanced {
    overrideProjectSpecDeviceId: boolean;
}
export interface Dependency {
    files: nonEmptyStringArray;
}
export interface Macros {
    arraymacro?: nonEmptyString;
    textmacro?: nonEmptyString;
    setmacro?: nonEmptyString;
    value?: any;
    comment?: nonEmptyString;
    values?: any;
    fields?: nonEmptyStringArray;
}
export interface FilterOptions {
    payload: Payload;
    sideBand: SideBand;
}
interface Payload {
    devices: FilterObj[];
    devtools: FilterObj[];
    resourceClasses: FilterObj[];
    ides: FilterObj[];
    compilers: FilterObj[];
    kernels: FilterObj[];
    packageGroups: FilterObj[];
    languages: FilterObj[];
}
interface SideBand {
    sessionId: nonEmptyString;
}
export interface FilterObj {
    publicId: nonEmptyString;
    name: nonEmptyString;
    overviewNodeDbId?: number;
}
/**
 * @TJS-pattern ^(?!\s*$).+
 */
type nonEmptyString = string;
/**
 * @minItems 1
 * @items.pattern ^(?!\s*$).+
 */
type nonEmptyStringArray = string[];
type mainCategories = 'Devices' | 'Development Tools' | 'Documents' | 'Examples' | 'Datasheet' | 'Errata' | 'Wiki' | 'White papers' | 'Reference designs' | 'Solution guides' | 'Selection guides' | 'User guides' | 'Application notes';
type ide = 'ccs' | 'iar' | 'keil';
type hostOS = 'macos' | 'linux' | 'win';
type kernel = 'tirtos' | 'freertos' | 'nortos';
type language = 'english' | 'chinese';
type compiler = 'ccs' | 'gcc' | 'iar' | 'ticlang';
type viewLimitations = 'aws' | 'e2e' | 'guicomposer' | 'h264codec' | 'nohttps' | 'parasoft' | 'elprotronic' | 'xeltex' | 'hilosystems' | 'tlsmbed' | 'tiSensortag' | 'tiTraining' | 'tiC2000' | 'tiWiki';
export declare const packageAllOf: TJS.Definition[];
export declare const devicesAllOf: TJS.Definition[];
export declare const contentAllOf: TJS.Definition[];
export {};
