export interface ReplOptions {
    /**
     * If true, specifies that the default writer function should include ANSI color styling to REPL output.
     * (default: true if terminal supports it, false otherwise)
     */
    useColors?: boolean;
    /**
     * If true, specifies that the default writer will not output the return value of a command if it evaluates to undefined
     * (default: false)
     */
    ignoreUndefined?: boolean;
    /**
     * Defines if the repl prints autocomplete and output previews or not.
     * (default: true if using pseudo TTY, false otherwise)
     */
    preview?: boolean;
    /**
     * If true, specifies that the output should be treated as a TTY terminal.
     * (default: true if using a pseudo TTY, false otherwise)
     */
    terminal?: boolean;
}
export interface ConsoleOptions {
    /**
     * Whether a plain console should be used instead of a pseudo TTY (default: false)
     */
    noPty?: boolean;
    /**
     * Additional options for the REPL (Read Evaluate Print Loop)
     */
    replOptions?: ReplOptions;
    /**
     * The path to a history file for the console (default: no file)
     */
    historyFile?: string;
}
/**
 * Interface for a console
 */
export interface ConsoleModule {
    /**
     * Send input to console
     *
     * @param input - The input to be passed to the console
     */
    sendInput(input: string): Promise<void>;
    /**
     * Close the connection to the console module.
     * When all connections are closed, the module is closed. At that time, the console
     * process will be terminated if it is still running.
     */
    close(): Promise<void>;
    /**
     * Terminate the console process and close the console module
     */
    terminate(): Promise<void>;
    /**
     * Interrupts any blocking call in from syncAgent.
     *
     * @remarks
     * This will not interrupt other synchronous calls like fs.readSync().
     */
    interrupt(): Promise<void>;
    /**
     * Resize the console window
     * Fails if not using a pseudo TTY
     *
     * @param columns - The new number of columns
     * @param rows - The new number of rows
     */
    resize(columns: number, rows: number): Promise<void>;
    /**
     * Resolve a call to an external command made from the console
     *
     * @param commandId - The id for the call provided by the "command" event
     * @param result - The result of the call
     */
    resolveCommand(commandId: number, result?: any): Promise<void>;
    /**
     * Reject a call to an external command made from the console
     *
     * @param commandId - The id for the call provided by the "command" event
     * @param errorMsg - The error message for the error to be thrown in the console
     */
    rejectCommand(commandId: number, errorMsg: string): Promise<void>;
    /**
     * Register an external command in the console
     *
     * @param command - Path to the command from the global object (e.g. "memoryView.settings.open")
     * @param context - A value to be provided by then "command" event when the command is called
     */
    registerCommand(command: string, context?: any): Promise<void>;
    /**
     * Unregister an external command in the console
     *
     * @param command - Path to the command from the global object (e.g. "memoryView.settings.open")
     */
    unregisterCommand(command: string): Promise<void>;
    /**
     * Event emitted when a call is made by the console to an external command
     *
     * @param id - Uniquely identifies this call to the command
     * @param command - The command that was called
     * @param args - An array containing all the arguments passed to the command
     * @param context - The context value that was provided when the command was registered
     */
    addListener(event: "command", listener: (args: {
        id: number;
        command: string;
        args: any[];
        context: any;
    }) => void): void;
    removeListener(event: "command", listener: (args: {
        id: number;
        command: string;
        args: any[];
        context: any;
    }) => void): void;
    /**
     * Event fired when any output is emitted by the console
     *
     * @param data - The console's output
     */
    addListener(event: "output", listener: (args: {
        data: string;
    }) => void): void;
    removeListener(event: "output", listener: (args: {
        data: string;
    }) => void): void;
}
export interface SubProcessResult {
    /**
     * The sub-process's exit code,
     */
    exitCode: number;
}
export interface ScriptRunnerModule {
    /**
     * Run a script file in a sub-process
     *
     * @remarks
     * Each script call will create its own sub-process.
     * In the event of a timeout, the exit code will be a non-zero number.
     *
     * @param filePath - Full path to the script file
     * @param timeout - Optional timeout in milliseconds (default: no timeout)
     *
     * @returns The exit code of the script sub-process
     */
    runScript(filePath: string, timeout?: number): Promise<SubProcessResult>;
    /**
     * Close the connection to the module.
     * When all connections are closed, the module is closed. Any still running scripts
     * will have their process terminated.
     */
    close(): Promise<void>;
    /**
     * Event fired when any output is emitted by a script sub-process
     */
    addListener(event: "output", listener: (args: {
        data: string;
    }) => void): void;
    removeListener(event: "output", listener: (args: {
        data: string;
    }) => void): void;
}
export interface CanTestConnectionResult {
    /**
     * Indicates that the connection test is supported
     */
    isSupported: boolean;
}
export interface ConnectionTester {
    /**
     * Returns true if we support performing a connection test on the specified
     * connection, false otherwise.
     *
     * @param ccxmlFile - Full path to the configuration file
     * @param connectionIndex - The index of the connection in the configuration that
     * should be tested. (The first connection is indexed 0.)
     */
    canTestConnection(ccxmlFile: string, connectionIndex: number): Promise<CanTestConnectionResult>;
    /**
     * Run the connection test tool for the given target.
     * Output from the tool should be captured by listening to the "output" event.
     *
     * @remarks Will reject if a connection test is not supported for the specified
     * connection
     *
     * @param ccxmlFile - Full path to the configuration file
     * @param connectionIndex - The index of the connection in the configuration that
     * should be tested. (The first connection is indexed 0.)
     * @param timeout - Timeout in milliseconds
     *
     * @returns The exit code of the connection test tool
     */
    testConnection(ccxmlFile: string, connectionIndex: number, timeout: number): Promise<SubProcessResult>;
    /**
     * Close the connection to the module.
     * When all connections are closed, the module is closed. Any still running sub-process
     * will be terminated.
     */
    close(): Promise<void>;
    /**
     * Event fired when any output is emitted by a sub-process
     */
    addListener(event: "output", listener: (args: {
        data: string;
    }) => void): void;
    removeListener(event: "output", listener: (args: {
        data: string;
    }) => void): void;
}
export interface DSUtils {
    /**
     * Returns the specified sub-module
     */
    getSubModule(name: "ConnectionTester"): Promise<ConnectionTester>;
    getSubModule(consoleName: string): Promise<ConsoleModule | ScriptRunnerModule>;
    /**
     * Create a new console sub-module.
     *
     * @param prompt - The console prompt (e.g. ">> ")
     * @param options - Additional console options (optional)
     *
     * @returns The name of the created console sub-module
     */
    createConsole(prompt: string, options?: ConsoleOptions): Promise<{
        consoleModule: string;
    }>;
    /**
     * Create a new script runner sub-module
     *
     * @returns The name of the created sub-module
     */
    createScriptRunner(): Promise<{
        runnerModule: string;
    }>;
    /**
     * Execute the action string as a script
     *
     * @remarks Throws any uncaught value thrown by the action.
     * Throws a ScriptingTimeoutError if the action times out.
     *
     * @param action - The string to be executed as a script
     * @param sessionObjects - A mapping of objects names in the action to cores
     * @param timeout - Optional timeout in milliseconds (default: no timeout)
     *
     * @example
     * The following might halt the C28xx_CPU1 core of a device, with a 3 second timeout.
     * ```
     *     execScriptingAction("activeDS.target.halt()", { activeDS: "Texas Instruments XDS110 USB Debug Probe_0/C28xx_CPU1" }, 3000);
     * ```
     */
    execScriptingAction(action: string, sessionObjects: Record<string, string>, timeout?: number): Promise<void>;
}
