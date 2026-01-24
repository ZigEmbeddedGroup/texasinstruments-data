export declare function validator(validationPath: string, deviceIdSource: string): Promise<void>;
export declare const command = "metadata-validator [options]";
export declare const describe = "Validate metadata files";
export declare const builder: {
    contentPath: {
        describe: string;
        demandOption: boolean;
    };
    deviceIdSource: {
        describe: string;
        demandOption: boolean;
        default: string;
    };
};
export declare const handler: (argv: any) => void;
