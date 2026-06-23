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

function localNameFromImportPath(importPath: string) {
  return importPath.split("/").at(-1)!.replace(/\.js$/, "");
}

function componentNameFromLocalName(localName: string) {
  return localName
    .replace(/^x-/, "")
    .split("-")
    .map((part) => part[0]!.toUpperCase() + part.slice(1))
    .join("")
    .replace("Colorinput", "ColorInput")
    .replace("Colorpicker", "ColorPicker")
    .replace("Colorselect", "ColorSelect")
    .replace("Contextmenu", "ContextMenu")
    .replace("Doctab", "DocTab")
    .replace("Doctabs", "DocTabs")
    .replace("Menuitem", "MenuItem")
    .replace("Navitem", "NavItem")
    .replace("Numberinput", "NumberInput")
    .replace("Progressbar", "Progressbar")
    .replace("Tagsinput", "TagsInput")
    .replace("Texteditor", "TextEditor")
    .replace("Titlebar", "Titlebar");
}

describe("Storybook visual coverage", () => {
  test("package scripts include Storybook build and typecheck", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      scripts?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };

    assert.equal(packageJson.scripts?.storybook, "storybook dev -p 6006");
    assert.equal(packageJson.scripts?.["storybook:build"], "storybook build");
    assert.equal(packageJson.scripts?.["storybook:typecheck"], "tsc -p tsconfig.storybook.json --noEmit");
    assert.equal(packageJson.scripts?.test?.includes("node --test tests/storybook-coverage.test.ts"), true);
    assert.equal(packageJson.scripts?.test?.includes("bun run storybook:typecheck"), true);
    assert.equal(Object.hasOwn(packageJson.devDependencies ?? {}, "storybook"), true);
    assert.equal(Object.hasOwn(packageJson.devDependencies ?? {}, "@storybook/addon-docs"), true);
    assert.equal(Object.hasOwn(packageJson.devDependencies ?? {}, "storybook-solidjs-vite"), true);
  });

  test("Storybook config serves Xel themes, icons, and locales", () => {
    const mainTs = read(".storybook/main.ts");

    assert.equal(mainTs.includes('framework: "storybook-solidjs-vite"'), true);
    assert.equal(mainTs.includes('from: "../node_modules/xel/themes"'), true);
    assert.equal(mainTs.includes('to: "/themes"'), true);
    assert.equal(mainTs.includes('from: "../node_modules/xel/icons"'), true);
    assert.equal(mainTs.includes('to: "/icons"'), true);
    assert.equal(mainTs.includes('from: "../node_modules/xel/locales"'), true);
    assert.equal(mainTs.includes('to: "/locales"'), true);
  });

  test("toolbar exposes every Xel theme except base.css", () => {
    const previewTsx = read(".storybook/preview.tsx");
    const themes = [...readXel("themes/base.css").matchAll(/@import url\("\\.\/([^"]+)\\.css"\)/g)]
      .map(([, themeName]) => themeName)
      .filter((themeName) => themeName !== "base");

    for (const themeName of themes) {
      assert.equal(previewTsx.includes(`value: "${themeName}"`), true, themeName);
      assert.equal(previewTsx.includes(`/themes/${themeName}.css`), true, themeName);
    }
  });

  test("every public Xel component has one visual Solid story", () => {
    const xelJs = readXel("xel.js");
    const storiesTsx = read("stories/xel-components.stories.tsx");

    const publicLocalNames = [...xelJs.matchAll(/export \{default as X[A-Za-z0-9]+Element\} from "\.\/elements\/([^"]+)\.js";/g)]
      .filter(([, importPath]) => importPath.startsWith("x-"))
      .map(([, importPath]) => localNameFromImportPath(importPath));

    for (const localName of publicLocalNames) {
      const componentName = `X${componentNameFromLocalName(localName)}`;
      const storyName = componentName.replace(/^X/, "");

      assert.equal(storiesTsx.includes(`${componentName},`), true, componentName);
      assert.equal(storiesTsx.includes(`export const ${storyName}: Story =`), true, storyName);
      assert.equal(storiesTsx.includes(`name: "${storyName}"`), true, storyName);
      assert.equal(storiesTsx.includes(`tags: ["visual"]`), true, storyName);
    }
  });
});
