import { parse } from "@swc/core";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { getFiles } from "./helpers";

export const build = async (): Promise<void> => {
  let appJs = await readFile(join(__dirname, "..", "src", "app.ts"), "utf8");

  const now = Date.now();
  for await (const file of getFiles(join(".", "routes"))) {
    const contents = await readFile(file, "utf8");
    const parsed = await parse(contents, { syntax: "typescript" });

    const verbs = new Set<string>();
    parsed.body.forEach((i): void => {
      if (i.type === "ExportDeclaration")
        if (i.declaration.type === "VariableDeclaration")
          i.declaration.declarations.forEach((j): void => {
            if (j.id.type === "Identifier") verbs.add(j.id.value);
          });
    });

    verbs.forEach((verb): void => {
      if (
        ![
          "get",
          "head",
          "post",
          "put",
          "delete",
          "connect",
          "options",
          "trace",
          "patch",
        ].includes(verb)
      )
        return;

      const route = file
        .replace(join(".", "routes"), "")
        .replace(/.ts$/, "")
        .replace(/index/g, "");
      const key = `${verb}${route.replace(/\W/g, "_")}`;

      appJs = appJs.replace(
        "// inject-routes",
        `import { ${verb} as ${key} } from "./routes${route}";
app.${verb}("${route}", (request, response) => {
  return transformResponse({ method: ${key}, route: "${route}", request, response });
});
// inject-routes`
      );

      if (verb === "get")
        appJs = appJs.replace(
          "// inject-routes",
          `app.head("${route}", (request, response) => {
  return transformResponse({ method: ${key}, route: "${route}", request, response });
});
// inject-routes`
        );

      console.log(`Mapped ${verb} ${route}`);
    });
  }

  await writeFile(join(".", "dist.ts"), appJs);
  console.log(`Compiled in ${Date.now() - now}ms`);
};
