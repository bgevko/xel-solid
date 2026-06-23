import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const xelRoot = join(root, "..", "xel");

function read(relativePath: string) {
  return readFileSync(join(root, relativePath), "utf8");
}

function readXel(relativePath: string) {
  return readFileSync(join(xelRoot, relativePath), "utf8");
}

function sorted(values: Iterable<string>) {
  return [...values].sort((a, b) => a.localeCompare(b));
}

function localNameFromImportPath(importPath: string) {
  return importPath.split("/").at(-1)!.replace(/\.js$/, "");
}

describe("Xel source coverage", () => {
  test("wraps every public Xel element export", () => {
    const xelJs = readXel("xel.js");
    const componentsTs = read("src/components.ts");

    const publicNames = sorted(
      [...xelJs.matchAll(/export \{default as X[A-Za-z0-9]+Element\} from "\.\/elements\/([^"]+)\.js";/g)]
        .filter(([, importPath]) => importPath.startsWith("x-"))
        .map(([, importPath]) => localNameFromImportPath(importPath)),
    );

    const wrappedNames = sorted(
      [...componentsTs.matchAll(/createXelComponent\("(x-[^"]+)"\)/g)].map(([, localName]) => localName),
    );

    assert.deepEqual(wrappedNames, publicNames);
  });

  test("does not expose internal colorpicker slider helpers as wrappers", () => {
    const componentsTs = read("src/components.ts");

    assert.equal(componentsTs.includes("x-lablinearsliders"), false);
    assert.equal(componentsTs.includes("x-labplanarsliders"), false);
    assert.equal(componentsTs.includes("x-lchlinearsliders"), false);
    assert.equal(componentsTs.includes("x-lchplanarsliders"), false);
    assert.equal(componentsTs.includes("x-rgblinearsliders"), false);
    assert.equal(componentsTs.includes("x-rgbplanarsliders"), false);
    assert.equal(componentsTs.includes("x-rgbpolarsliders"), false);
    assert.equal(componentsTs.includes("x-xyzlinearsliders"), false);
    assert.equal(componentsTs.includes("x-xyzplanarsliders"), false);
  });
});
