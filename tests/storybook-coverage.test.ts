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
  test("package scripts include Storybook commands", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      scripts?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };

    assert.equal(packageJson.scripts?.storybook, "storybook dev -p 6006");
    assert.equal(packageJson.scripts?.["storybook:build"], "storybook build");
    assert.equal(packageJson.scripts?.test?.includes("node --test tests/storybook-coverage.test.ts"), true);
    assert.equal(Object.hasOwn(packageJson.devDependencies ?? {}, "storybook"), true);
    assert.equal(Object.hasOwn(packageJson.devDependencies ?? {}, "@storybook/addon-docs"), true);
    assert.equal(Object.hasOwn(packageJson.devDependencies ?? {}, "storybook-solidjs-vite"), true);
  });

  test("Storybook config serves Xel themes and icons", () => {
    const mainTs = read(".storybook/main.ts");
    const previewHeadHtml = read(".storybook/preview-head.html");
    const previewTsx = read(".storybook/preview.tsx");

    assert.equal(mainTs.includes('framework: "storybook-solidjs-vite"'), true);
    assert.equal(mainTs.includes('from: "../node_modules/xel/themes"'), true);
    assert.equal(mainTs.includes('to: "/themes"'), true);
    assert.equal(mainTs.includes('from: "../node_modules/xel/icons"'), true);
    assert.equal(mainTs.includes('to: "/icons"'), true);
    assert.equal(mainTs.includes('from: "../node_modules/xel/locales"'), false);
    assert.equal(mainTs.includes('to: "/locales"'), false);
    assert.equal(previewHeadHtml.includes("/locales/"), false);
    assert.equal(previewHeadHtml.includes("portal.svg"), false);
    assert.equal(previewTsx.includes("portal.svg"), false);
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
    const storiesJsx = read("stories/xel-components.stories.jsx");

    const publicLocalNames = [...xelJs.matchAll(/export \{default as X[A-Za-z0-9]+Element\} from "\.\/elements\/([^"]+)\.js";/g)]
      .filter(([, importPath]) => importPath.startsWith("x-"))
      .map(([, importPath]) => localNameFromImportPath(importPath));

    for (const localName of publicLocalNames) {
      const componentName = `X${componentNameFromLocalName(localName)}`;
      const storyName = componentName.replace(/^X/, "");

      assert.equal(storiesJsx.includes(`${componentName},`), true, componentName);
      assert.equal(storiesJsx.includes(`export const ${storyName} =`), true, storyName);
      assert.equal(storiesJsx.includes(`name: "${storyName}"`), true, storyName);
      assert.equal(storiesJsx.includes(`tags: ["visual"]`), true, storyName);
    }
  });

  test("Storybook covers Solid setup and native dialog surfaces", () => {
    const storiesJsx = read("stories/xel-components.stories.jsx");

    assert.match(storiesJsx, /export const ProviderSetup =/);
    assert.match(storiesJsx, /name: "Provider setup"/);
    assert.match(storiesJsx, /<XelProvider/);
    assert.match(storiesJsx, /export const Dialog =/);
    assert.match(storiesJsx, /name: "Dialog"/);
    assert.match(storiesJsx, /<XDialog open/);
  });
});
