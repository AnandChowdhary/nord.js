import { join, resolve } from "path";
import { readdir, readFile, rm, writeFile, mkdir } from "fs/promises";

/**
 * Recursively get all files in a directory
 * @param directory - Directory to walk
 * @license CC BY-SA 4.0
 * @link https://stackoverflow.com/a/45130990/1656944
 */
async function* getFiles(directory: string): AsyncIterable<string> {
  const contents = await readdir(directory, { withFileTypes: true });
  for (const item of contents) {
    const res = resolve(directory, item.name);
    if (item.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

export const build = async () => {
  let appJs = await readFile(
    join(".", "framework", "templates", "express.ts"),
    "utf8"
  );

  const now = Date.now();
  for await (const file of getFiles(join("example", "routes"))) {
    const contents = await readFile(file, "utf8");
    const key = `Route_${Math.random().toString(36).substring(2)}`;
    const route = file
      .replace(join(__dirname, "..", "example", "routes"), "")
      .replace(/.ts$/, "")
      .replace(/index/g, "");
    console.log(`Mapped ${route}`);

    appJs = appJs.replace(
      "// inject-routes",
      `import { get as ${key} } from "./routes${route}";

app.get("${route}", (request, response) => {
  return ${key}(transformRequestParams(request, response));
});

// inject-routes`
    );
  }

  await writeFile(join("example", "dist.ts"), appJs);
  console.log(`Compiled in ${Date.now() - now}ms`);
};

build();
