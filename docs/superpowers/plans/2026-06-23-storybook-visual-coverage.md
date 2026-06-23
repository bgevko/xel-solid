# Storybook Visual Coverage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Storybook coverage for every `xel-solid` wrapper so each Xel component can be previewed as a Solid component under every Xel-provided theme from a Storybook toolbar.

**Architecture:** Storybook runs with the Solid/Vite framework and consumes `src` directly, not the built package. Xel remains the rendering source of truth: Storybook serves Xel themes, icons, and locales from the `xel` package, sets `Xel.theme` through a global toolbar decorator, and renders only `xel-solid` Solid wrapper components in stories. Coverage is enforced with a source audit that compares Xel’s public barrel against the story exports and requires the `visual` tag on every component story.

**Tech Stack:** Storybook, `storybook-solidjs-vite`, SolidJS, TypeScript, Vite, Xel Web Components, Node test runner, Bun scripts.

---

## File Structure

- `.storybook/main.ts`: Storybook Solid/Vite configuration, story globs, addons, and static Xel asset mounts.
- `.storybook/preview-head.html`: early Xel meta defaults for theme, icons, and locale before decorators run.
- `.storybook/preview.tsx`: Storybook toolbar globals and Solid decorator that applies `Xel.theme`, icons, locale, and preview shell styling.
- `.storybook/preview.css`: small unframed preview layout for Xel component demos.
- `stories/xel-components.stories.tsx`: one CSF file exporting one `visual` story per public `xel-solid` component, using only Solid wrappers.
- `tsconfig.storybook.json`: typecheck config for Storybook files and stories without changing package build output.
- `tests/storybook-coverage.test.ts`: static audit for Storybook scripts, theme toolbar coverage, static asset mounts, wrapper coverage, and `visual` tags.
- `package.json`: Storybook dev dependencies and scripts.

---

### Task 1: Add Storybook Tooling and Scripts

**Files:**
- Modify: `package.json`
- Create: `tsconfig.storybook.json`
- Create: `tests/storybook-coverage.test.ts`

- [ ] **Step 1: Install Storybook packages**

Run:

```bash
bun add -d storybook@latest @storybook/addon-docs@latest storybook-solidjs-vite@latest
```

Expected: `package.json` gains dev dependencies for `storybook`, `@storybook/addon-docs`, and `storybook-solidjs-vite`, and `bun.lock` changes.

- [ ] **Step 2: Add Storybook scripts**

Modify `package.json` scripts so this exact block is present:

```json
"scripts": {
  "build": "tsc -p tsconfig.json",
  "clean": "rm -rf dist",
  "storybook": "storybook dev -p 6006",
  "storybook:build": "storybook build",
  "storybook:typecheck": "tsc -p tsconfig.storybook.json --noEmit",
  "test": "bun run ts && node --test tests/coverage.test.ts && node --test tests/storybook-coverage.test.ts && bun run storybook:typecheck && bun run test:runtime && node --test tests/consumer-package.test.ts",
  "test:runtime": "node node_modules/@playwright/test/cli.js test --config=playwright.config.cjs",
  "ts": "tsc -p tsconfig.json --noEmit",
  "prepack": "bun run build"
}
```

- [ ] **Step 3: Add Storybook typecheck config**

Create `tsconfig.storybook.json`:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "rootDir": ".",
    "types": ["node"]
  },
  "include": [
    ".storybook/**/*.ts",
    ".storybook/**/*.tsx",
    "src/**/*.ts",
    "src/**/*.tsx",
    "stories/**/*.ts",
    "stories/**/*.tsx"
  ],
  "exclude": ["dist", "node_modules", "storybook-static"]
}
```

- [ ] **Step 4: Write the failing Storybook coverage audit**

Create `tests/storybook-coverage.test.ts`:

```ts
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
```

- [ ] **Step 5: Run the failing audit**

Run:

```bash
node --test tests/storybook-coverage.test.ts
```

Expected: fails because `.storybook/main.ts`, `.storybook/preview.tsx`, and `stories/xel-components.stories.tsx` do not exist.

- [ ] **Step 6: Commit tooling audit**

Run:

```bash
git add package.json bun.lock tsconfig.storybook.json tests/storybook-coverage.test.ts
git commit -m "test: add storybook coverage audit"
```

Expected: commit succeeds after dependency installation and test file creation.

---

### Task 2: Configure Storybook Theme Toolbar

**Files:**
- Create: `.storybook/main.ts`
- Create: `.storybook/preview-head.html`
- Create: `.storybook/preview.tsx`
- Create: `.storybook/preview.css`

- [ ] **Step 1: Add Storybook main config**

Create `.storybook/main.ts`:

```ts
import type { StorybookConfig } from "storybook-solidjs-vite";

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: "storybook-solidjs-vite",
  staticDirs: [
    { from: "../node_modules/xel/themes", to: "/themes" },
    { from: "../node_modules/xel/icons", to: "/icons" },
    { from: "../node_modules/xel/locales", to: "/locales" },
  ],
  docs: {
    autodocs: true,
  },
};

export default config;
```

- [ ] **Step 2: Add early Xel meta defaults**

Create `.storybook/preview-head.html`:

```html
<meta name="xel-theme" content="/themes/fluent.css" />
<meta name="xel-icons" content="/icons/fluent.svg,/icons/material.svg,/icons/portal.svg" />
<meta name="xel-locales" content="/locales/en.ftl" />
```

- [ ] **Step 3: Add toolbar globals and Xel theme decorator**

Create `.storybook/preview.tsx`:

```tsx
import type { Preview } from "storybook-solidjs-vite";
import { createDecorator } from "storybook-solidjs-vite";
import { Xel } from "../src";
import "../src/register";
import "./preview.css";

const themeItems = [
  { value: "fluent", title: "Fluent" },
  { value: "material", title: "Material" },
  { value: "cupertino", title: "Cupertino" },
  { value: "adwaita", title: "Adwaita" },
  { value: "fluent-dark", title: "Fluent Dark" },
  { value: "material-dark", title: "Material Dark" },
  { value: "cupertino-dark", title: "Cupertino Dark" },
  { value: "adwaita-dark", title: "Adwaita Dark" },
] as const;

type XelTheme = (typeof themeItems)[number]["value"];

function isXelTheme(value: unknown): value is XelTheme {
  return typeof value === "string" && themeItems.some((item) => item.value === value);
}

const withXelTheme = createDecorator((Story, context) => {
  const selectedTheme = isXelTheme(context.globals.xelTheme) ? context.globals.xelTheme : "fluent";
  const isDark = selectedTheme.endsWith("-dark");

  document.documentElement.dataset.xelTheme = selectedTheme;
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  Xel.theme = `/themes/${selectedTheme}.css`;
  Xel.icons = ["/icons/fluent.svg", "/icons/material.svg", "/icons/portal.svg"];
  Xel.locales = ["/locales/en.ftl"];

  return (
    <main class="xel-storybook-shell" data-xel-theme={selectedTheme}>
      <Story />
    </main>
  );
});

const preview: Preview = {
  decorators: [withXelTheme],
  globalTypes: {
    xelTheme: {
      name: "Xel Theme",
      description: "Switch Xel theme CSS for the current story.",
      defaultValue: "fluent",
      toolbar: {
        icon: "paintbrush",
        items: themeItems,
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    xelTheme: "fluent",
  },
  parameters: {
    layout: "centered",
    controls: {
      expanded: true,
    },
    docs: {
      source: {
        type: "code",
      },
    },
  },
};

export default preview;
```

- [ ] **Step 4: Add preview shell styles**

Create `.storybook/preview.css`:

```css
html,
body,
#storybook-root {
  min-height: 100%;
}

body {
  margin: 0;
  background: Canvas;
  color: CanvasText;
  font: 14px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.xel-storybook-shell {
  box-sizing: border-box;
  display: grid;
  place-items: center;
  min-width: min(920px, calc(100vw - 48px));
  min-height: min(520px, calc(100vh - 96px));
  padding: 32px;
}

.xel-story-frame {
  display: grid;
  gap: 18px;
  align-items: start;
  justify-items: start;
}

.xel-story-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.xel-story-stack {
  display: grid;
  gap: 10px;
  align-items: start;
  justify-items: start;
}

.xel-story-surface {
  box-sizing: border-box;
  display: grid;
  gap: 12px;
  min-width: 320px;
  padding: 16px;
  border: 1px solid color-mix(in srgb, CanvasText 18%, transparent);
  border-radius: 8px;
}

.xel-story-titlebar-window {
  width: 420px;
  border: 1px solid color-mix(in srgb, CanvasText 18%, transparent);
  border-radius: 8px;
  overflow: hidden;
}

.xel-story-titlebar-window-content {
  min-height: 120px;
  padding: 16px;
}
```

- [ ] **Step 5: Run the Storybook coverage audit**

Run:

```bash
node --test tests/storybook-coverage.test.ts
```

Expected: still fails because `stories/xel-components.stories.tsx` does not exist.

- [ ] **Step 6: Commit Storybook config**

Run:

```bash
git add .storybook/main.ts .storybook/preview-head.html .storybook/preview.tsx .storybook/preview.css tests/storybook-coverage.test.ts
git commit -m "feat: configure storybook xel themes"
```

Expected: commit succeeds.

---

### Task 3: Add Visual Stories for Every Solid Wrapper

**Files:**
- Create: `stories/xel-components.stories.tsx`

- [ ] **Step 1: Create the all-components Storybook file**

Create `stories/xel-components.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  XAccordion,
  XAvatar,
  XBackdrop,
  XBox,
  XButton,
  XButtons,
  XCard,
  XCheckbox,
  XColorInput,
  XColorPicker,
  XColorSelect,
  XContextMenu,
  XDocTab,
  XDocTabs,
  XDrawer,
  XIcon,
  XInput,
  XLabel,
  XMenu,
  XMenubar,
  XMenuItem,
  XMessage,
  XNav,
  XNavItem,
  XNotification,
  XNumberInput,
  XPager,
  XPopover,
  XProgressbar,
  XRadio,
  XRadios,
  XSelect,
  XShortcut,
  XSlider,
  XStepper,
  XSwatch,
  XSwitch,
  XTab,
  XTabs,
  XTag,
  XTags,
  XTagsInput,
  XTextEditor,
  XThrobber,
  XTitlebar,
  XTooltip,
} from "../src";

const meta = {
  title: "Xel/Components",
  parameters: {
    docs: {
      description: {
        component: "Visual coverage for xel-solid wrappers rendered through Solid components.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

function Frame(props: { children: import("solid-js").JSX.Element }) {
  return <section class="xel-story-frame">{props.children}</section>;
}

function Row(props: { children: import("solid-js").JSX.Element }) {
  return <div class="xel-story-row">{props.children}</div>;
}

function Stack(props: { children: import("solid-js").JSX.Element }) {
  return <div class="xel-story-stack">{props.children}</div>;
}

function Surface(props: { children: import("solid-js").JSX.Element }) {
  return <div class="xel-story-surface">{props.children}</div>;
}

export const Accordion: Story = {
  name: "Accordion",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XAccordion expanded>
        <XLabel>Preferences</XLabel>
        <Surface>
          <XCheckbox toggled><XLabel>Enable notifications</XLabel></XCheckbox>
          <XSwitch toggled><XLabel>Sync settings</XLabel></XSwitch>
        </Surface>
      </XAccordion>
    </Frame>
  ),
};

export const Avatar: Story = {
  name: "Avatar",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Row>
        <XAvatar><XLabel>AB</XLabel></XAvatar>
        <XAvatar><XIcon href="/icons/portal.svg#xel" /></XAvatar>
      </Row>
    </Frame>
  ),
};

export const Backdrop: Story = {
  name: "Backdrop",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Surface>
        <XBackdrop opened />
        <XLabel>Backdrop layer</XLabel>
      </Surface>
    </Frame>
  ),
};

export const Box: Story = {
  name: "Box",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XBox>
        <XLabel>Box content</XLabel>
      </XBox>
    </Frame>
  ),
};

export const Button: Story = {
  name: "Button",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Row>
        <XButton>
          <XIcon href="#home" />
          <XLabel>Button</XLabel>
        </XButton>
        <XButton disabled>
          <XLabel>Disabled</XLabel>
        </XButton>
      </Row>
    </Frame>
  ),
};

export const Buttons: Story = {
  name: "Buttons",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XButtons>
        <XButton toggled><XLabel>Left</XLabel></XButton>
        <XButton><XLabel>Center</XLabel></XButton>
        <XButton><XLabel>Right</XLabel></XButton>
      </XButtons>
    </Frame>
  ),
};

export const Card: Story = {
  name: "Card",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XCard>
        <h3>Card</h3>
        <p>Desktop panel content rendered inside a Xel card.</p>
      </XCard>
    </Frame>
  ),
};

export const Checkbox: Story = {
  name: "Checkbox",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XCheckbox><XLabel>Unchecked</XLabel></XCheckbox>
        <XCheckbox toggled><XLabel>Checked</XLabel></XCheckbox>
        <XCheckbox mixed><XLabel>Mixed</XLabel></XCheckbox>
      </Stack>
    </Frame>
  ),
};

export const ColorInput: Story = {
  name: "ColorInput",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XColorInput value="#0091ea" alpha />
    </Frame>
  ),
};

export const ColorPicker: Story = {
  name: "ColorPicker",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XColorPicker value="#bada55" alpha />
    </Frame>
  ),
};

export const ColorSelect: Story = {
  name: "ColorSelect",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XColorSelect value="#0091ea" />
    </Frame>
  ),
};

export const ContextMenu: Story = {
  name: "ContextMenu",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Surface>
        <XLabel>Context menu target</XLabel>
        <XContextMenu>
          <XMenuItem><XLabel>Copy</XLabel><XShortcut value="Control+C" /></XMenuItem>
          <XMenuItem><XLabel>Paste</XLabel><XShortcut value="Control+V" /></XMenuItem>
        </XContextMenu>
      </Surface>
    </Frame>
  ),
};

export const DocTab: Story = {
  name: "DocTab",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XDocTab selected>
        <XIcon href="#home" />
        <XLabel>Document.txt</XLabel>
      </XDocTab>
    </Frame>
  ),
};

export const DocTabs: Story = {
  name: "DocTabs",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XDocTabs>
        <XDocTab selected><XLabel>index.ts</XLabel></XDocTab>
        <XDocTab><XLabel>README.md</XLabel></XDocTab>
      </XDocTabs>
    </Frame>
  ),
};

export const Drawer: Story = {
  name: "Drawer",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Surface>
        <XDrawer opened>
          <XLabel>Drawer content</XLabel>
        </XDrawer>
      </Surface>
    </Frame>
  ),
};

export const Icon: Story = {
  name: "Icon",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Row>
        <XIcon href="#home" />
        <XIcon href="/icons/portal.svg#xel" />
      </Row>
    </Frame>
  ),
};

export const Input: Story = {
  name: "Input",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XInput value="Input value" />
    </Frame>
  ),
};

export const Label: Story = {
  name: "Label",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XLabel>Standalone label</XLabel>
    </Frame>
  ),
};

export const Menu: Story = {
  name: "Menu",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XMenu>
        <XMenuItem><XIcon href="#home" /><XLabel>Home</XLabel></XMenuItem>
        <XMenuItem><XIcon href="#settings" /><XLabel>Settings</XLabel></XMenuItem>
      </XMenu>
    </Frame>
  ),
};

export const Menubar: Story = {
  name: "Menubar",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XMenubar>
        <XMenuItem>
          <XLabel>File</XLabel>
          <XMenu>
            <XMenuItem><XLabel>New</XLabel><XShortcut value="Control+N" /></XMenuItem>
            <XMenuItem><XLabel>Open</XLabel><XShortcut value="Control+O" /></XMenuItem>
          </XMenu>
        </XMenuItem>
        <XMenuItem><XLabel>Edit</XLabel></XMenuItem>
      </XMenubar>
    </Frame>
  ),
};

export const MenuItem: Story = {
  name: "MenuItem",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XMenuItem>
        <XIcon href="#copy" />
        <XLabel>Copy</XLabel>
        <XShortcut value="Control+C" />
      </XMenuItem>
    </Frame>
  ),
};

export const Message: Story = {
  name: "Message",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XMessage>
        <XLabel>Changes saved.</XLabel>
      </XMessage>
    </Frame>
  ),
};

export const Nav: Story = {
  name: "Nav",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XNav>
        <XNavItem selected><XIcon href="#home" /><XLabel>Home</XLabel></XNavItem>
        <XNavItem><XIcon href="#settings" /><XLabel>Settings</XLabel></XNavItem>
      </XNav>
    </Frame>
  ),
};

export const NavItem: Story = {
  name: "NavItem",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XNavItem selected>
        <XIcon href="#home" />
        <XLabel>Home</XLabel>
      </XNavItem>
    </Frame>
  ),
};

export const Notification: Story = {
  name: "Notification",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XNotification opened>
        <XLabel>Sync complete</XLabel>
      </XNotification>
    </Frame>
  ),
};

export const NumberInput: Story = {
  name: "NumberInput",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XNumberInput value="42" min="0" max="100" step="1" />
    </Frame>
  ),
};

export const Pager: Story = {
  name: "Pager",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XPager value="3" max="10" />
    </Frame>
  ),
};

export const Popover: Story = {
  name: "Popover",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XButton>
        <XLabel>Popover target</XLabel>
        <XPopover opened>
          <XLabel>Popover content</XLabel>
        </XPopover>
      </XButton>
    </Frame>
  ),
};

export const Progressbar: Story = {
  name: "Progressbar",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XProgressbar value="65" max="100" />
    </Frame>
  ),
};

export const Radio: Story = {
  name: "Radio",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XRadio toggled>
        <XLabel>Selected radio</XLabel>
      </XRadio>
    </Frame>
  ),
};

export const Radios: Story = {
  name: "Radios",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XRadios>
        <XRadio toggled><XLabel>One</XLabel></XRadio>
        <XRadio><XLabel>Two</XLabel></XRadio>
        <XRadio><XLabel>Three</XLabel></XRadio>
      </XRadios>
    </Frame>
  ),
};

export const Select: Story = {
  name: "Select",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XSelect>
        <XMenu>
          <XMenuItem value="one" toggled><XLabel>One</XLabel></XMenuItem>
          <XMenuItem value="two"><XLabel>Two</XLabel></XMenuItem>
          <XMenuItem value="three"><XLabel>Three</XLabel></XMenuItem>
        </XMenu>
      </XSelect>
    </Frame>
  ),
};

export const Shortcut: Story = {
  name: "Shortcut",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XShortcut value="Control+Shift+P" />
    </Frame>
  ),
};

export const Slider: Story = {
  name: "Slider",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XSlider value="35" min="0" max="100" />
    </Frame>
  ),
};

export const Stepper: Story = {
  name: "Stepper",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XStepper />
    </Frame>
  ),
};

export const Swatch: Story = {
  name: "Swatch",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Row>
        <XSwatch value="#0091ea" />
        <XSwatch value="#8bc34a" />
        <XSwatch value="#f44336" />
      </Row>
    </Frame>
  ),
};

export const Switch: Story = {
  name: "Switch",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XSwitch toggled>
        <XLabel>Enabled</XLabel>
      </XSwitch>
    </Frame>
  ),
};

export const Tab: Story = {
  name: "Tab",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XTab selected>
        <XLabel>Selected tab</XLabel>
      </XTab>
    </Frame>
  ),
};

export const Tabs: Story = {
  name: "Tabs",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XTabs>
        <XTab selected><XLabel>General</XLabel></XTab>
        <XTab><XLabel>Advanced</XLabel></XTab>
      </XTabs>
    </Frame>
  ),
};

export const Tag: Story = {
  name: "Tag",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XTag>
        <XLabel>Tag</XLabel>
      </XTag>
    </Frame>
  ),
};

export const Tags: Story = {
  name: "Tags",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XTags>
        <XTag><XLabel>Design</XLabel></XTag>
        <XTag><XLabel>Desktop</XLabel></XTag>
        <XTag><XLabel>Solid</XLabel></XTag>
      </XTags>
    </Frame>
  ),
};

export const TagsInput: Story = {
  name: "TagsInput",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XTagsInput prop={{ value: ["Design", "Desktop"] }} />
    </Frame>
  ),
};

export const TextEditor: Story = {
  name: "TextEditor",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XTextEditor prop={{ value: "Editable text" }} />
    </Frame>
  ),
};

export const Throbber: Story = {
  name: "Throbber",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XThrobber />
    </Frame>
  ),
};

export const Titlebar: Story = {
  name: "Titlebar",
  tags: ["visual"],
  render: () => (
    <Frame>
      <div class="xel-story-titlebar-window">
        <XTitlebar>
          <XLabel>Document</XLabel>
        </XTitlebar>
        <div class="xel-story-titlebar-window-content">Window content</div>
      </div>
    </Frame>
  ),
};

export const Tooltip: Story = {
  name: "Tooltip",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XButton>
        <XLabel>Hover target</XLabel>
        <XTooltip opened>Tooltip content</XTooltip>
      </XButton>
    </Frame>
  ),
};
```

- [ ] **Step 2: Run the Storybook coverage audit**

Run:

```bash
node --test tests/storybook-coverage.test.ts
```

Expected: all Storybook coverage audit tests pass.

- [ ] **Step 3: Run Storybook typecheck**

Run:

```bash
bun run storybook:typecheck
```

Expected: TypeScript exits 0 with no Storybook or story type errors.

- [ ] **Step 4: Commit visual stories**

Run:

```bash
git add stories/xel-components.stories.tsx tests/storybook-coverage.test.ts
git commit -m "feat: add visual stories for xel wrappers"
```

Expected: commit succeeds.

---

### Task 4: Verify Storybook Build and Package Integrity

**Files:**
- Generated ignored: `storybook-static/*`
- Generated: `dist/*`

- [ ] **Step 1: Run the full package test suite**

Run:

```bash
bun run test
```

Expected output includes:

```text
Storybook visual coverage
10 passed
8 passed
packed package installs and builds in a separate Solid consumer
```

- [ ] **Step 2: Run Storybook production build**

Run:

```bash
bun run storybook:build
```

Expected: Storybook exits 0 and writes `storybook-static`.

- [ ] **Step 3: Run package build and pack checks**

Run:

```bash
bun run clean
bun run build
npm pack --dry-run
git status --short
```

Expected:

```text
storybook-static/
```

may appear in `git status --short` if Storybook build output is not ignored yet. Source files must not be modified by these commands.

- [ ] **Step 4: Ignore Storybook build output if needed**

If `git status --short` shows `?? storybook-static/`, append this line to `.gitignore`:

```gitignore
storybook-static/
```

Then run:

```bash
git status --short
```

Expected: no `storybook-static/` entry.

- [ ] **Step 5: Commit final verification metadata**

Run:

```bash
git add package.json bun.lock tsconfig.storybook.json .storybook stories tests .gitignore
git commit -m "chore: verify storybook visual coverage"
```

Expected: either commit succeeds or Git reports no changes to commit if `.gitignore` did not change.

---

### Task 5: Final Handoff Verification

**Files:**
- Generated ignored: `storybook-static/*`
- Generated ignored: `xel-solid-0.0.0.tgz` if `npm pack` is run manually

- [ ] **Step 1: Run final verification commands**

Run:

```bash
bun run test
bun run storybook:build
bun run clean
bun run build
npm pack --dry-run
git status --short
```

Expected:

```text
bun run test
```

exits 0 and includes `Storybook visual coverage`.

Expected:

```text
bun run storybook:build
```

exits 0 and emits a production Storybook.

Expected:

```text
npm pack --dry-run
```

lists only publishable package files and does not include `stories`, `.storybook`, or `storybook-static`, because the runtime package still ships only `dist`, `README.md`, and `LICENSE`.

Expected:

```text
git status --short
```

prints no output.

---

## Self-Review

- Spec coverage: The plan adds Storybook, a custom Xel theme toolbar, static theme/icon/locale serving from Xel, stories for all public wrappers, `visual` tags on every component story, Storybook typechecking, Storybook production build verification, and package pack verification.
- Placeholder scan: The plan contains concrete commands and complete file contents for the new Storybook config, typecheck config, coverage audit, and component stories.
- Type consistency: The plan uses `Xel.theme`, `Xel.icons`, `Xel.locales`, `storybook-solidjs-vite`, `Meta`, `StoryObj`, `visual` tags, and `X*` wrapper names consistently across config, stories, and tests.
