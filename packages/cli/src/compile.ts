import { transform } from "@swc/core";
import { join, resolve } from "path";

export const compile = async (): Promise<void> => {
  await transform(
    "/Users/anandchowdhary/Projects/web-framework/examples/express-app/app.ts",
    {
      outputPath:
        "/Users/anandchowdhary/Projects/web-framework/examples/express-app/dist/app.ts",
    }
  );
};
