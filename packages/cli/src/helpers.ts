import { readdir } from "fs/promises";
import { resolve } from "path";

/**
 * Recursively get all files in a directory
 * @param directory - Directory to walk
 * @license CC BY-SA 4.0
 * @link https://stackoverflow.com/a/45130990/1656944
 */
export async function* getFiles(directory: string): AsyncIterable<string> {
  const contents = await readdir(directory, { withFileTypes: true });
  for (const item of contents) {
    const res = resolve(directory, item.name);
    if (item.isDirectory()) yield* getFiles(res);
    else yield res;
  }
}
