#! /usr/bin/env node

import { build } from "./index";

void (async (): Promise<void> => {
  const command = process.argv.pop();
  if (!command) throw new Error("Command not found");

  if (command === "build") return build();
})().catch((error): never => {
  console.error(error);
  process.exit(1);
});
