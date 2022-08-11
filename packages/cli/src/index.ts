#! /usr/bin/env node

import { execSync } from "child_process";
import { build } from "./build";
import { killPortProcess } from "kill-port-process";
export * from "@swc-node/register";
import minimist = require("minimist");
const argv = minimist(process.argv.slice(2));

void (async (): Promise<void> => {
  if (argv._[0] === "build") return build();
  if (argv._[0] === "dev") {
    const PORT = parseInt(argv.port);
    process.env.PORT = argv.port;
    if (!PORT) throw new Error("Port not found");
    await killPortProcess(PORT);
    console.log("Killed port", PORT);
    await build();
    execSync(
      "node -r './node_modules/@nordjs/cli/node_modules/@swc-node/register' app.ts",
      { stdio: "inherit" }
    );
  }
})().catch((error): never => {
  console.error(error);
  process.exit(1);
});
