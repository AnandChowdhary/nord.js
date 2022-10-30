#! /usr/bin/env node

import { ChildProcess, exec } from "child_process";
import { watch } from "chokidar";
import { access } from "fs/promises";
import { killPortProcess } from "kill-port-process";
import { resolve } from "path";
import { build } from "./build";
import clear = require("console-clear");
import detect = require("detect-port");
import minimist = require("minimist");
import debounce = require("debounce");

const argv = minimist(process.argv.slice(2));
const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
const WAIT_TIME = 100; // 100 ms
const MAX_TRIES = 100; // 100 tries after 100 ms each = 10 seconds

void (async (): Promise<void> => {
  const debug = process.env.DEBUG === "true";
  if (debug) console.log(`ℹ️ Verbose logging enabled (debug mode)`);

  let running: ChildProcess;
  const run = async () => {
    let hasFile: string | undefined = undefined;
    for (const potentialFilePath of [
      "./node_modules/@nordjs/cli/node_modules/@swc-node/register",
      "./node_modules/@swc-node/register",
    ]) {
      if (hasFile) continue;
      try {
        await access(resolve(".", potentialFilePath));
        hasFile = potentialFilePath;
      } catch (error) {
        // Ignore errors if unable to access file
      }
    }
    if (!hasFile) throw new Error("Unable to find @swc-node/register binary");
    running = exec(`node -r '${hasFile}' app.ts`);
    running.stdout.on("data", (data) => console.log(data.toString()));
    running.stderr.on("data", (data) => console.error(data.toString()));
    running.on("exit", (code) => {
      if (code > 0) process.exit(code);
    });
  };

  if (argv._[0] === "build") {
    await build();
    let nowTime = Date.now();
    let hasFile: string | undefined = undefined;
    for (const potentialFilePath of [
      "./node_modules/@nordjs/cli/node_modules/typescript/bin/tsc",
      "./node_modules/typescript/bin/tsc",
    ]) {
      if (hasFile) continue;
      try {
        await access(resolve(".", potentialFilePath));
        hasFile = potentialFilePath;
      } catch (error) {
        // Ignore errors if unable to access file
      }
    }
    if (!hasFile) throw new Error("Unable to find tsc binary");
    const running = exec(`${hasFile} --noEmit`);
    running.stdout.on("data", (data) => console.log(data.toString()));
    running.stderr.on("data", (data) => console.error(data.toString()));
    running.on("exit", (code) => {
      if (code > 0) process.exit(code);
      console.log(
        `✅ Type checking completed in ${(
          (Date.now() - nowTime) /
          1000
        ).toFixed(2)}s`
      );
    });
  } else if (argv._[0] === "start") {
    if (argv.mode !== "production") await build();
    const PORT = parseInt(argv.port);
    process.env.PORT = argv.port;
    if (!PORT) throw new Error("Port not found");
    await run();
  } else if (argv._[0] === "dev") {
    const PORT = parseInt(argv.port);
    process.env.PORT = argv.port;
    if (!PORT) throw new Error("Port not found");
    const path = resolve(".");
    const _restart = async () => {
      clear();
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
      await run();
    };
    const restart = debounce(_restart, WAIT_TIME);
    await restart();
    watch(path, {
      persistent: true,
      ignoreInitial: true,
      ignored: ["**/.git/**/*", "**/*.gen.ts"],
    }).on("all", async () => restart());
  }
})().catch((error): never => {
  console.error(error);
  process.exit(1);
});
