import { spawn } from "node:child_process";
import dotenv from "dotenv";

dotenv.config();

export function run(command, extraArgs = []) {
    spawn(
        "npx",
        ["next", command, "-p", process.env.PORT, ...extraArgs],
        { stdio: "inherit", shell: true }
    );
}