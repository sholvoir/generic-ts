import { versionpp } from "./versionpp.ts";

// deno-lint-ignore-file no-explicit-any
const path = './deno.json';
const json = JSON.parse(await Deno.readTextFile(path));
console.log(json.version);
json.version = versionpp(json.version as string);
await Deno.writeTextFile(path, JSON.stringify(json, undefined, 4));
