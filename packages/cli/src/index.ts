#! /usr/bin/env node

import { execSync } from "child_process";
import { build } from "./build";
import {} from "process";
import { register } from "@swc-node/register/lib/register";
import { compile } from "./compile";

void (async (): Promise<void> => {
  const command = process.argv.pop();
  if (!command) throw new Error("Command not found");

  if (command === "build") return build();
  if (command === "dev") {
    return compile();
    // execSync(
    //   "node --loader=node_modules/@nordjs/cli/node_modules/@swc-node/register app.ts",
    //   { stdio: "inherit" }
    // );
  }
})().catch((error): never => {
  console.error(error);
  process.exit(1);
});