#! /usr/bin/env node

import { exec } from "child_process";
import type { ChildProcess } from "child_process";
import { watch } from "chokidar";
import { build } from "./build";
export * from "@swc-node/register";
import detect = require("detect-port");
import { killPortProcess } from "kill-port-process";
import minimist = require("minimist");
import { resolve } from "path";
import debounce = require("debounce");

const argv = minimist(process.argv.slice(2));
const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
const WAIT_TIME = 100; // 100 ms
const MAX_TRIES = 100; // 100 tries after 100 ms each = 10 seconds

void (async (): Promise<void> => {
  if (argv._[0] === "build") return build();
  if (argv._[0] === "dev") {
    let running: ChildProcess;
    const PORT = parseInt(argv.port);
    process.env.PORT = argv.port;
    if (!PORT) throw new Error("Port not found");
    const path = resolve(".");
    const run = () => {
      running = exec(
        "node -r './node_modules/@nordjs/cli/node_modules/@swc-node/register' app.ts"
      );
      running.stdout.on("data", (data) => console.log(data.toString()));
      running.stderr.on("data", (data) => console.error(data.toString()));
    };
    const _restart = async () => {
      await build();
      let isPortAvailable = false;
      let tries = 0;
      while (!isPortAvailable) {
        tries++;
        if (tries > MAX_TRIES) throw new Error("Port not available");
        try {
          await killPortProcess(PORT);
        } catch (error) {
          // Ignore errors if this port doesn't exist
        }
        await wait(WAIT_TIME);
        const result = await detect(PORT);
        isPortAvailable = result === PORT;
      }
      tries = 0;
      run();
    };
    const restart = debounce(_restart, WAIT_TIME);
    await restart();
    watch(path, {
      persistent: true,
      ignoreInitial: true,
      ignored: ["**/node_modules/**/*", "**/.git/**/*", "**/*.gen.ts"],
    }).on("all", async () => restart());
  }
})().catch((error): never => {
  console.error(error);
  process.exit(1);
});
