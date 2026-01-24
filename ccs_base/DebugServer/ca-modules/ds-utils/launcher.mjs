import { initScripting, ScriptingTimeoutError, sleep } from "scripting";
import { join, isAbsolute } from "node:path";
import { spawn } from "node:child_process"
import { platform } from "node:process";

global.initScripting = initScripting;
global.ScriptingTimeoutError = ScriptingTimeoutError;
global.sleep = sleep;

let script = process.argv[2];
if (!isAbsolute(script)) {
	script = join(process.cwd(), script);
}

// We want CTRL+C to exit the process even if we are currently blocked on a synchronous
// call. This seems to work fine on Linux and Mac, but not on Windows. Running the
// script in a child process that inherits the parent's stdin/stdout/stderr seems to
// work around the limitation.
if (platform === "win32" && !process.env.TI_SCRIPT_LAUNCHER_WRAPPED) {
	await new Promise(() => {
		const child = spawn(
			process.argv[0],
			process.argv.slice(1),
			{ stdio: "inherit", env: { ...process.env, TI_SCRIPT_LAUNCHER_WRAPPED: "1" } }
		);
		child.on("close", () => process.exit(child.exitCode ?? 1));
	});
} else {
	await import("file://" + script);
}

// If the script has completed, we assume that it is a success and that there is no
// more work to do.
// Some advanced scripts may want to keep the event loop running after they complete.
// In those cases, the this launcher should be modified to not exit.
process.exit(0);
