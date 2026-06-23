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
    assert.equal(read("src/jsx.ts").includes('"x-button": XelComponentProps<XButtonElement>'), true);
  });

  test("package metadata allows public publishing", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      private?: boolean;
      publishConfig?: { access?: string };
      exports?: Record<string, unknown>;
      files?: string[];
    };

    assert.equal(packageJson.private, undefined);
    assert.equal(packageJson.publishConfig?.access, "public");
    assert.deepEqual(packageJson.files, ["dist", "README.md", "LICENSE"]);
    assert.equal(Object.hasOwn(packageJson.exports ?? {}, "."), true);
    assert.equal(Object.hasOwn(packageJson.exports ?? {}, "./register"), true);
  });

  test("re-exports every public non-Solid Xel API from the Xel barrel", () => {
    const xelJs = readXel("xel.js");
    const xelSolidIndex = read("src/index.ts");
    const xelSolidXel = read("src/xel.ts");

    const xelElementExports = sorted(
      [...xelJs.matchAll(/export \{default as (X[A-Za-z0-9]+Element)\} from/g)].map(
        ([, exportName]) => exportName,
      ),
    );

    for (const exportName of xelElementExports) {
      assert.equal(xelSolidXel.includes(exportName), true, exportName);
      assert.equal(xelSolidIndex.includes(exportName), true, exportName);
    }

    assert.equal(xelSolidXel.includes("default as Xel"), true);
    assert.equal(xelSolidXel.includes("ftl"), true);
    assert.equal(xelSolidIndex.includes("ftl"), true);
    assert.equal(xelSolidIndex.includes("Xel"), true);
  });

  test("has exact element class maps for every public wrapper and raw element", () => {
    const xelJs = readXel("xel.js");
    const elementTypesTs = read("src/element-types.ts");
    const componentPropsTs = read("src/component-props.ts");
    const componentsTs = read("src/components.ts");
    const jsxTs = read("src/jsx.ts");

    const publicExports = [...xelJs.matchAll(/export \{default as (X[A-Za-z0-9]+Element)\} from "\.\/elements\/([^"]+)\.js";/g)]
      .filter(([, , importPath]) => importPath.startsWith("x-"))
      .map(([, elementClassName, importPath]) => ({
        elementClassName,
        componentName: elementClassName.replace(/Element$/, ""),
        localName: localNameFromImportPath(importPath),
      }));

    for (const item of publicExports) {
      assert.equal(elementTypesTs.includes(`"${item.localName}": ${item.elementClassName}`), true, item.localName);
      assert.equal(elementTypesTs.includes(`${item.componentName}: ${item.elementClassName}`), true, item.componentName);
      assert.equal(componentPropsTs.includes(`XelComponentProps<XelComponentElementMap["${item.componentName}"]>`), true, item.componentName);
      assert.equal(componentsTs.includes(`Component<${item.componentName}Props>`), true, item.componentName);
      assert.equal(jsxTs.includes(`"${item.localName}": XelComponentProps<${item.elementClassName}>`), true, item.localName);
    }
  });

  test("exports component-specific prop aliases for every wrapper", () => {
    const xelJs = readXel("xel.js");
    const componentPropsTs = read("src/component-props.ts");
    const indexTs = read("src/index.ts");

    const componentNames = [...xelJs.matchAll(/export \{default as (X[A-Za-z0-9]+)Element\} from "\.\/elements\/([^"]+)\.js";/g)]
      .filter(([, , importPath]) => importPath.startsWith("x-"))
      .map(([, componentName]) => componentName);

    for (const componentName of componentNames) {
      assert.equal(componentPropsTs.includes(`export type ${componentName}Props =`), true, componentName);
      assert.equal(indexTs.includes(`${componentName}Props`), true, componentName);
    }
  });
});
