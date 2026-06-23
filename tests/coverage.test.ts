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

  test("binds every custom event emitted by public Xel elements and dialog augmentation", () => {
    const eventTs = read("src/events.ts");
    const xelJs = readXel("xel.js");
    const publicImportPaths = [...xelJs.matchAll(/export \{default as X[A-Za-z0-9]+Element\} from "\.\/elements\/([^"]+)\.js";/g)]
      .filter(([, importPath]) => importPath.startsWith("x-"))
      .map(([, importPath]) => `elements/${importPath}.js`);

    const emittedEvents = new Set<string>();

    for (const importPath of [...publicImportPaths, "elements/dialog.js"]) {
      const source = readXel(importPath);

      for (const [, eventName] of source.matchAll(/new CustomEvent\("([^"]+)"/g)) {
        emittedEvents.add(eventName);
      }
    }

    const intentionallyForwardedBySolid = new Set(["click", "pointerdown", "keydown"]);
    const mappedEvents = new Set(
      [...eventTs.matchAll(/: "([^"]+)"/g)].map(([, eventName]) => eventName),
    );

    for (const eventName of emittedEvents) {
      if (!intentionallyForwardedBySolid.has(eventName)) {
        assert.equal(mappedEvents.has(eventName), true, eventName);
      }
    }
  });

  test("normalizes every boolean property documented by public Xel element getters", () => {
    const createXelComponentTs = read("src/createXelComponent.ts");
    const typesTs = read("src/types.ts");

    const expectedBooleanProps = [
      "alpha",
      "checked",
      "compact",
      "condensed",
      "disabled",
      "ellipsis",
      "expanded",
      "expandable",
      "hidden",
      "mixed",
      "modal",
      "noautocollapse",
      "open",
      "opened",
      "readonly",
      "readOnly",
      "required",
      "selected",
      "spellcheck",
      "toggled",
      "togglable",
    ];

    for (const propName of expectedBooleanProps) {
      assert.equal(createXelComponentTs.includes(`"${propName}"`), true, propName);
      assert.equal(typesTs.includes(`${propName}?: Booleanish`), true, propName);
    }
  });

  test("ships raw custom element JSX declarations in dist", () => {
    const packageJson = JSON.parse(read("package.json")) as { files: string[] };
    const indexTs = read("src/index.ts");

    assert.equal(packageJson.files.includes("dist"), true);
    assert.equal(indexTs.includes('export type { XelIntrinsicElements } from "./jsx";'), true);
    assert.equal(read("src/jsx.ts").includes('"x-button": XelComponentProps<HTMLElement>'), true);
  });
});
