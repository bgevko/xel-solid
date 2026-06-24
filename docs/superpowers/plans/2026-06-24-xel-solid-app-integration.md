# Xel Solid App Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `xel-solid` usable as a polished Solid integration by adding first-class setup, stable Xel asset serving, button/dialog app semantics, and consumer-level verification that theme, icons, locales, and interactions work.

**Architecture:** Keep the existing thin custom-element wrappers, but add a small Solid setup layer over Xel's public meta-driven API: `Xel.theme`, `Xel.icons`, `Xel.locales`, and `Xel.accentColor`. Add a Vite helper that serves/copies Xel runtime assets to `/xel`, then test the package inside the existing packed consumer fixture instead of only testing source fixtures.

**Tech Stack:** SolidJS, Xel Web Components, TypeScript, Vite plugin API, Playwright, Node test runner, Bun.

---

## File Structure

- Create `src/setup.tsx`
  - Owns `setupXel()`, `XelProvider`, setup option types, theme/icon/locale constants, and asset URL helpers.
  - Calls Xel's public setters only; never calls `Xel.themeStyleSheet.replaceSync()`.
- Create `src/vite.ts`
  - Exports `xelSolidVitePlugin()` for apps that need Vite to serve/copy `xel/themes`, `xel/icons`, and `xel/locales` to `/xel`.
  - Is exported from `xel-solid/vite`, separate from the browser entry.
- Create `src/dialog.tsx`
  - Exports `XDialog`, a Solid wrapper around native `<dialog>` after Xel registers its dialog behavior.
- Modify `src/components.ts`
  - Replace the generic `XButton` export with a specialized wrapper that preserves existing Xel rendering and adds `type="submit"` / `type="reset"` form behavior.
- Modify `src/component-props.ts`
  - Narrow `XButtonProps.type` to `"button" | "submit" | "reset"` while preserving existing common props for other wrappers.
  - Add `XDialogProps`.
- Modify `src/index.ts`
  - Export setup API, constants, `XelProvider`, and `XDialog`.
- Modify `package.json`
  - Add `./vite` export.
  - Include `./dist/vite.js` in `sideEffects` only if implementation has side effects; expected implementation has no side effects, so do not add it.
- Modify `tests/fixtures/consumer/vite.config.ts`
  - Use `xelSolidVitePlugin()` from the packed package.
- Modify `tests/fixtures/consumer/src/App.tsx`
  - Use the canonical app setup path: `<XelProvider theme="material" accentColor="blue">`.
  - Exercise `XButton`, `XIcon`, `XMessage`, form submit/reset, and `XDialog`.
- Modify `tests/consumer-package.test.ts`
  - Keep the packed build test and add assertions against built output as needed.
- Create `tests/consumer-runtime.test.ts`
  - Browser-level test against the packed consumer fixture.
  - Verifies theme CSS loaded, icons/locales resolve, button pressed feedback works, form semantics work, and dialog behavior is available.
- Modify `playwright.config.cjs`
  - Include both `wrapper-runtime.test.ts` and `consumer-runtime.test.ts`.
- Modify `tests/storybook-coverage.test.ts`
  - Require visual stories for `XDialog` and the setup usage story.
- Modify `stories/xel-components.stories.tsx`
  - Add visual coverage for `XDialog`.
  - Add one app setup story that renders under `XelProvider`.
- Modify `README.md`
  - Document the canonical setup first.
  - Preserve any existing user edits by reading the current file before patching.

---

### Task 1: Add Failing Consumer Setup Tests

**Files:**
- Modify: `tests/fixtures/consumer/vite.config.ts`
- Modify: `tests/fixtures/consumer/src/App.tsx`
- Create: `tests/consumer-runtime.test.ts`
- Modify: `playwright.config.cjs`

- [ ] **Step 1: Update the consumer app to use the intended API before it exists**

Replace `tests/fixtures/consumer/vite.config.ts` with:

```ts
import solid from "vite-plugin-solid";
import { defineConfig } from "vite";
import { xelSolidVitePlugin } from "xel-solid/vite";

export default defineConfig({
  plugins: [xelSolidVitePlugin(), solid()],
});
```

Replace `tests/fixtures/consumer/src/App.tsx` with:

```tsx
import {
  XButton,
  XDialog,
  XIcon,
  XLabel,
  XMessage,
  Xel,
  XelProvider,
} from "xel-solid";
import { createSignal } from "solid-js";

export function App() {
  const [submitCount, setSubmitCount] = createSignal(0);
  const [resetCount, setResetCount] = createSignal(0);
  let dialog: HTMLDialogElement | undefined;

  return (
    <XelProvider theme="material" accentColor="blue" icons={["material"]} locales={["en"]}>
      <main>
        <output id="theme-url">{Xel.theme}</output>

        <XButton id="plain-button">
          <XIcon href="#home" />
          <XLabel>Greet</XLabel>
        </XButton>

        <XMessage id="localized-message" href="#setup" />

        <form
          id="demo-form"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitCount((count) => count + 1);
          }}
          onReset={() => setResetCount((count) => count + 1)}
        >
          <input name="name" value="Ada" />
          <XButton id="submit-button" type="submit">
            <XLabel>Submit</XLabel>
          </XButton>
          <XButton id="reset-button" type="reset">
            <XLabel>Reset</XLabel>
          </XButton>
        </form>

        <output id="submit-count">{submitCount()}</output>
        <output id="reset-count">{resetCount()}</output>

        <XButton id="open-dialog" onClick={() => dialog?.showModal()}>
          <XLabel>Open dialog</XLabel>
        </XButton>
        <XDialog
          id="demo-dialog"
          ref={(element) => {
            dialog = element;
          }}
        >
          <XLabel>Dialog content</XLabel>
          <XButton id="close-dialog" onClick={() => dialog?.close()}>
            <XLabel>Close</XLabel>
          </XButton>
        </XDialog>
      </main>
    </XelProvider>
  );
}
```

- [ ] **Step 2: Add the failing browser test**

Create `tests/consumer-runtime.test.ts`:

```ts
import { expect, test } from "@playwright/test";

test("packed consumer gets xel setup, assets, form semantics, and dialog behavior", async ({ page }) => {
  await page.goto("/tests/fixtures/consumer/dist/index.html");

  await expect(page.locator("x-button#plain-button")).toBeVisible();
  await expect(page.locator("#theme-url")).toContainText("/xel/themes/material.css");

  await page.waitForFunction(async () => {
    const xel = await import("/node_modules/xel/xel.js");
    await xel.default.whenThemeReady;
    await xel.default.whenIconsReady;
    await xel.default.whenLocalesReady;
    return Boolean(xel.default.queryIcon("#home"));
  });

  const themeId = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--theme-id"));
  expect(themeId).toContain("material");

  await expect(page.locator("#localized-message")).not.toHaveText("setup");

  await page.locator("#submit-button").click();
  await expect(page.locator("#submit-count")).toHaveText("1");

  await page.locator("#reset-button").click();
  await expect(page.locator("#reset-count")).toHaveText("1");

  await page.locator("#plain-button").dispatchEvent("pointerdown", {
    button: 0,
    buttons: 1,
    pointerId: 1,
    pointerType: "mouse",
  });
  await expect(page.locator("#plain-button")).toHaveAttribute("pressed", "");

  await page.locator("#open-dialog").click();
  await expect(page.locator("#demo-dialog")).toHaveJSProperty("open", true);
  await page.locator("#close-dialog").click();
  await expect(page.locator("#demo-dialog")).toHaveJSProperty("open", false);
});
```

- [ ] **Step 3: Include the new runtime test**

Replace `playwright.config.cjs` with:

```js
module.exports = {
  testDir: "tests",
  testMatch: ["wrapper-runtime.test.ts", "consumer-runtime.test.ts"],
  webServer: {
    command: "bunx vite --host 127.0.0.1 --port 5179",
    url: "http://127.0.0.1:5179/tests/fixtures/wrapper-app.html",
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: "http://127.0.0.1:5179",
    browserName: "chromium",
  },
};
```

- [ ] **Step 4: Run the failing checks**

Run:

```bash
bun run ts
```

Expected: FAIL because `xel-solid/vite`, `XelProvider`, and `XDialog` do not exist.

Run:

```bash
node --test tests/consumer-package.test.ts
```

Expected: FAIL because the packed consumer cannot import the new setup APIs.

- [ ] **Step 5: Commit the failing tests**

```bash
git add tests/fixtures/consumer/vite.config.ts tests/fixtures/consumer/src/App.tsx tests/consumer-runtime.test.ts playwright.config.cjs
git commit -m "test(consumer): cover xel app setup"
```

---

### Task 2: Implement Xel Setup API

**Files:**
- Create: `src/setup.tsx`
- Modify: `src/index.ts`

- [ ] **Step 1: Create the setup module**

Create `src/setup.tsx`:

```tsx
import { createEffect, onCleanup, type JSX } from "solid-js";
import { Xel } from "./xel";
import "./register";

export const xelThemes = [
  "adwaita",
  "adwaita-dark",
  "cupertino",
  "cupertino-dark",
  "fluent",
  "fluent-dark",
  "material",
  "material-dark",
] as const;

export const xelIconSets = [
  "fluent",
  "fluent-outlined",
  "material",
  "material-outlined",
  "portal",
] as const;

export const xelLocales = ["en", "pl"] as const;

export type XelTheme = (typeof xelThemes)[number];
export type XelIconSet = (typeof xelIconSets)[number];
export type XelLocale = (typeof xelLocales)[number] | string;

export type XelSetupOptions = {
  theme?: XelTheme | string | null;
  accentColor?: string | null;
  icons?: readonly (XelIconSet | string)[] | null;
  locales?: readonly XelLocale[] | null;
  assetBaseUrl?: string;
};

export type XelSetupResult = {
  ready: Promise<void>;
  themeUrl: string | null;
  iconUrls: string[];
  localeUrls: string[];
};

function joinAssetUrl(baseUrl: string, path: string) {
  return `${baseUrl.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

export function resolveXelThemeUrl(theme: XelTheme | string, assetBaseUrl = "/xel") {
  if (theme.endsWith(".css") || theme.includes("/")) {
    return theme;
  }

  return joinAssetUrl(assetBaseUrl, `themes/${theme}.css`);
}

export function resolveXelIconUrl(iconSet: XelIconSet | string, assetBaseUrl = "/xel") {
  if (iconSet.endsWith(".svg") || iconSet.includes("/")) {
    return iconSet;
  }

  return joinAssetUrl(assetBaseUrl, `icons/${iconSet}.svg`);
}

export function resolveXelLocaleUrl(locale: XelLocale, assetBaseUrl = "/xel") {
  if (locale.endsWith(".ftl") || locale.includes("/")) {
    return locale;
  }

  return joinAssetUrl(assetBaseUrl, `locales/${locale}.ftl`);
}

export function setupXel(options: XelSetupOptions = {}): XelSetupResult {
  const assetBaseUrl = options.assetBaseUrl ?? "/xel";
  const themeUrl = options.theme ? resolveXelThemeUrl(options.theme, assetBaseUrl) : null;
  const iconUrls = (options.icons ?? []).map((iconSet) => resolveXelIconUrl(iconSet, assetBaseUrl));
  const localeUrls = (options.locales ?? []).map((locale) => resolveXelLocaleUrl(locale, assetBaseUrl));

  if (themeUrl !== null) {
    Xel.theme = themeUrl;
  }

  if (options.accentColor !== undefined && options.accentColor !== null) {
    Xel.accentColor = options.accentColor;
  }

  if (options.icons !== null) {
    Xel.icons = iconUrls;
  }

  if (options.locales !== null) {
    Xel.locales = localeUrls;
  }

  return {
    ready: Promise.all([Xel.whenThemeReady, Xel.whenIconsReady, Xel.whenLocalesReady]).then(() => undefined),
    themeUrl,
    iconUrls,
    localeUrls,
  };
}

export type XelProviderProps = XelSetupOptions & {
  children?: JSX.Element;
};

export function XelProvider(props: XelProviderProps) {
  createEffect(() => {
    setupXel({
      theme: props.theme,
      accentColor: props.accentColor,
      icons: props.icons,
      locales: props.locales,
      assetBaseUrl: props.assetBaseUrl,
    });
  });

  onCleanup(() => {
    // Xel is a document-level singleton. Provider unmount intentionally does not
    // clear theme/icons/locales because other mounted UI may still depend on them.
  });

  return <>{props.children}</>;
}
```

- [ ] **Step 2: Export the setup API**

Add these exports to `src/index.ts` after the component exports:

```ts
export {
  setupXel,
  resolveXelThemeUrl,
  resolveXelIconUrl,
  resolveXelLocaleUrl,
  XelProvider,
  xelThemes,
  xelIconSets,
  xelLocales,
} from "./setup";
export type {
  XelIconSet,
  XelLocale,
  XelProviderProps,
  XelSetupOptions,
  XelSetupResult,
  XelTheme,
} from "./setup";
```

- [ ] **Step 3: Run typecheck**

Run:

```bash
bun run ts
```

Expected: still FAIL because `xel-solid/vite` and `XDialog` are not implemented yet, but the setup exports no longer fail.

- [ ] **Step 4: Commit**

```bash
git add src/setup.tsx src/index.ts
git commit -m "feat(setup): add xel provider"
```

---

### Task 3: Add Vite Asset Helper

**Files:**
- Create: `src/vite.ts`
- Modify: `package.json`

- [ ] **Step 1: Create the Vite plugin export**

Create `src/vite.ts`:

```ts
import { existsSync } from "node:fs";
import { copyFile, mkdir } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";

export type XelSolidVitePluginOptions = {
  publicPath?: string;
  assets?: {
    themes?: readonly string[];
    icons?: readonly string[];
    locales?: readonly string[];
  };
};

const defaultAssets = {
  themes: [
    "base.css",
    "adwaita.css",
    "adwaita-dark.css",
    "cupertino.css",
    "cupertino-dark.css",
    "fluent.css",
    "fluent-dark.css",
    "material.css",
    "material-dark.css",
  ],
  icons: ["fluent.svg", "fluent-outlined.svg", "material.svg", "material-outlined.svg", "portal.svg"],
  locales: ["en.ftl", "pl.ftl"],
} as const;

function resolveXelRoot() {
  return dirname(fileURLToPath(import.meta.resolve("xel/package.json")));
}

function normalizePublicPath(publicPath: string) {
  const path = publicPath.startsWith("/") ? publicPath : `/${publicPath}`;
  return path.replace(/\/+$/, "");
}

export function xelSolidVitePlugin(options: XelSolidVitePluginOptions = {}): Plugin {
  const publicPath = normalizePublicPath(options.publicPath ?? "/xel");
  const xelRoot = resolveXelRoot();
  const assets = {
    themes: options.assets?.themes ?? defaultAssets.themes,
    icons: options.assets?.icons ?? defaultAssets.icons,
    locales: options.assets?.locales ?? defaultAssets.locales,
  };

  return {
    name: "xel-solid-assets",
    configureServer(server) {
      server.middlewares.use(publicPath, (request, response, next) => {
        const requestPath = decodeURIComponent((request.url ?? "").split("?")[0].replace(/^\/+/, ""));
        const filePath = join(xelRoot, requestPath);

        if (!existsSync(filePath)) {
          next();
          return;
        }

        if (filePath.endsWith(".css")) {
          response.setHeader("Content-Type", "text/css; charset=utf-8");
        }
        else if (filePath.endsWith(".svg")) {
          response.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
        }
        else if (filePath.endsWith(".ftl")) {
          response.setHeader("Content-Type", "text/plain; charset=utf-8");
        }

        response.setHeader("Cache-Control", "no-cache");
        createReadStream(filePath).pipe(response);
      });
    },
    async writeBundle(outputOptions) {
      const outDir = outputOptions.dir;

      if (!outDir) {
        return;
      }

      for (const [kind, fileNames] of Object.entries(assets) as [keyof typeof assets, readonly string[]][]) {
        for (const fileName of fileNames) {
          const from = join(xelRoot, kind, fileName);
          const to = join(outDir, publicPath, kind, fileName);
          await mkdir(dirname(to), { recursive: true });
          await copyFile(from, to);
        }
      }
    },
  };
}
```

- [ ] **Step 2: Add package export**

In `package.json`, add the `./vite` export after `./register`:

```json
"./vite": {
  "types": "./dist/vite.d.ts",
  "import": "./dist/vite.js"
}
```

- [ ] **Step 3: Run typecheck**

Run:

```bash
bun run ts
```

Expected: still FAIL only on `XDialog` import until Task 4 is implemented.

- [ ] **Step 4: Commit**

```bash
git add src/vite.ts package.json
git commit -m "feat(vite): serve xel assets"
```

---

### Task 4: Add XDialog and XButton Form Semantics

**Files:**
- Create: `src/dialog.tsx`
- Modify: `src/components.ts`
- Modify: `src/component-props.ts`
- Modify: `src/index.ts`

- [ ] **Step 1: Add native dialog wrapper**

Create `src/dialog.tsx`:

```tsx
import type { JSX } from "solid-js";
import "./register";

export type XDialogProps = JSX.DialogHtmlAttributes<HTMLDialogElement> & {
  ref?: HTMLDialogElement | ((element: HTMLDialogElement) => void);
};

export function XDialog(props: XDialogProps): JSX.Element {
  return <dialog {...props}>{props.children}</dialog>;
}
```

- [ ] **Step 2: Add dialog prop export**

Append this to `src/component-props.ts`:

```ts
export type { XDialogProps } from "./dialog";
```

- [ ] **Step 3: Specialize XButton in `src/components.ts`**

Replace:

```ts
export const XButton: Component<XButtonProps> = createXelComponent("x-button");
```

with:

```tsx
const BaseXButton: Component<XButtonProps> = createXelComponent("x-button");

function getForm(element: HTMLElement) {
  return element.closest("form") as HTMLFormElement | null;
}

export function XButton(props: XButtonProps): JSX.Element {
  let element: HTMLElement | undefined;

  return (
    <BaseXButton
      {...props}
      ref={(node) => {
        element = node;

        if (typeof props.ref === "function") {
          props.ref(node);
        }
      }}
      onClick={(event) => {
        props.onClick?.(event);

        if (event.defaultPrevented || !element || props.disabled === true || props.disabled === "") {
          return;
        }

        if (props.type === "submit") {
          getForm(element)?.requestSubmit();
        }
        else if (props.type === "reset") {
          getForm(element)?.reset();
        }
      }}
    />
  );
}
```

- [ ] **Step 4: Narrow XButton type without breaking other components**

In `src/component-props.ts`, add this import:

```ts
import type { XButtonElement } from "./xel";
```

Replace:

```ts
export type XButtonProps = XelComponentProps<XelComponentElementMap["XButton"]>;
```

with:

```ts
export type XButtonType = "button" | "submit" | "reset";
export type XButtonProps = Omit<XelComponentProps<XButtonElement>, "type"> & {
  type?: XButtonType;
};
```

- [ ] **Step 5: Export XDialog**

In `src/index.ts`, add:

```ts
export { XDialog } from "./dialog";
export type { XDialogProps } from "./dialog";
```

- [ ] **Step 6: Run focused checks**

Run:

```bash
bun run ts
node --test tests/consumer-package.test.ts
```

Expected: PASS for typecheck and consumer build. Runtime may still fail until Task 3 middleware is corrected and assets are copied in a built fixture.

- [ ] **Step 7: Commit**

```bash
git add src/dialog.tsx src/components.ts src/component-props.ts src/index.ts
git commit -m "feat(components): add dialog and form buttons"
```

---

### Task 5: Make Consumer Runtime Verification Reliable

**Files:**
- Modify: `tests/consumer-package.test.ts`
- Modify: `tests/consumer-runtime.test.ts`
- Modify: `package.json`

- [ ] **Step 1: Ensure the packed consumer is built before Playwright runs**

In `package.json`, replace:

```json
"test": "bun run ts && node --test tests/coverage.test.ts && node --test tests/storybook-coverage.test.ts && bun run storybook:typecheck && bun run test:runtime && node --test tests/consumer-package.test.ts"
```

with:

```json
"test": "bun run ts && node --test tests/coverage.test.ts && node --test tests/storybook-coverage.test.ts && bun run storybook:typecheck && node --test tests/consumer-package.test.ts && bun run test:runtime"
```

- [ ] **Step 2: Add asset output assertions to package test**

Append these assertions inside `tests/consumer-package.test.ts` after the existing `dist/index.html` assertion:

```ts
assert.equal(existsSync(join(fixture, "dist/xel/themes/material.css")), true);
assert.equal(existsSync(join(fixture, "dist/xel/themes/base.css")), true);
assert.equal(existsSync(join(fixture, "dist/xel/icons/material.svg")), true);
assert.equal(existsSync(join(fixture, "dist/xel/locales/en.ftl")), true);
```

- [ ] **Step 3: Fix the runtime test import**

In `tests/consumer-runtime.test.ts`, replace the `page.waitForFunction()` block with:

```ts
await page.waitForFunction(async () => {
  const xel = await import("/node_modules/xel/xel.js");
  await xel.default.whenThemeReady;
  await xel.default.whenIconsReady;
  await xel.default.whenLocalesReady;
  return Boolean(xel.default.queryIcon("#home"));
});
```

If Vite cannot import `/node_modules/xel/xel.js` from the built fixture page, replace that block with:

```ts
await page.waitForFunction(async () => {
  const xel = window.Xel;
  await xel.whenThemeReady;
  await xel.whenIconsReady;
  await xel.whenLocalesReady;
  return Boolean(xel.queryIcon("#home"));
});
```

and expose `window.Xel = Xel` in `tests/fixtures/consumer/src/App.tsx`:

```ts
declare global {
  interface Window {
    Xel: typeof Xel;
  }
}

window.Xel = Xel;
```

- [ ] **Step 4: Run consumer checks**

Run:

```bash
node --test tests/consumer-package.test.ts
bun run test:runtime
```

Expected: PASS. If runtime fails on pointer event construction, replace the `dispatchEvent("pointerdown", ...)` call with:

```ts
await page.locator("#plain-button").evaluate((element) => {
  element.dispatchEvent(new PointerEvent("pointerdown", {
    bubbles: true,
    composed: true,
    button: 0,
    buttons: 1,
    pointerId: 1,
    pointerType: "mouse",
  }));
});
```

- [ ] **Step 5: Commit**

```bash
git add package.json tests/consumer-package.test.ts tests/consumer-runtime.test.ts tests/fixtures/consumer/src/App.tsx
git commit -m "test(runtime): verify consumer xel behavior"
```

---

### Task 6: Add Storybook and Coverage for Setup/Dialog

**Files:**
- Modify: `stories/xel-components.stories.tsx`
- Modify: `tests/storybook-coverage.test.ts`

- [ ] **Step 1: Add visual stories**

Add these imports to `stories/xel-components.stories.tsx`:

```ts
import { XDialog, XelProvider } from "../src";
```

Add these stories near the existing Button/Dialog-adjacent stories:

```tsx
export const ProviderSetup: Story = {
  name: "Provider setup",
  tags: ["visual"],
  render: () => (
    <XelProvider theme="material" accentColor="blue" icons={["material"]} locales={["en"]}>
      <Frame>
        <XButton>
          <XIcon href="#home" />
          <XLabel>Provider setup</XLabel>
        </XButton>
        <XMessage href="#setup" />
      </Frame>
    </XelProvider>
  ),
};

export const Dialog: Story = {
  name: "Dialog",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XDialog open style={{ position: "static", margin: "0", width: "260px" }}>
        <XLabel>Dialog content</XLabel>
        <XButton>
          <XLabel>Close</XLabel>
        </XButton>
      </XDialog>
    </Frame>
  ),
};
```

- [ ] **Step 2: Require the new stories**

In `tests/storybook-coverage.test.ts`, add assertions that the story file includes:

```ts
assert.match(source, /export const ProviderSetup/);
assert.match(source, /export const Dialog/);
assert.match(source, /tags:\s*\["visual"\]/);
```

- [ ] **Step 3: Run Storybook checks**

Run:

```bash
node --test tests/storybook-coverage.test.ts
bun run storybook:typecheck
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add stories/xel-components.stories.tsx tests/storybook-coverage.test.ts
git commit -m "test(storybook): cover xel setup"
```

---

### Task 7: Document Canonical App Usage

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Read current README before editing**

Run:

```bash
sed -n '1,260p' README.md
```

Expected: capture the existing local edits and avoid replacing unrelated text.

- [ ] **Step 2: Add the canonical Vite setup section**

Add this section near the top of `README.md`, after the install section or before the low-level wrapper API:

````markdown
## Solid App Setup

For Vite apps, add the asset plugin so Xel can fetch its runtime theme, icon, and locale files in dev and production builds:

```ts
// vite.config.ts
import solid from "vite-plugin-solid";
import { defineConfig } from "vite";
import { xelSolidVitePlugin } from "xel-solid/vite";

export default defineConfig({
  plugins: [xelSolidVitePlugin(), solid()],
});
```

Mount the provider once near the root of the app:

```tsx
import { XButton, XLabel, XelProvider } from "xel-solid";

export function App() {
  return (
    <XelProvider theme="material" accentColor="blue" icons={["material"]} locales={["en"]}>
      <XButton>
        <XLabel>Greet</XLabel>
      </XButton>
    </XelProvider>
  );
}
```

`XelProvider` uses Xel's public setup API under the hood. App code should not call `Xel.themeStyleSheet.replaceSync()` directly.
````

- [ ] **Step 3: Document non-Vite asset serving**

Add this after the Vite setup section:

````markdown
## Non-Vite Apps

If your app does not use Vite, serve these Xel package folders at the same public base URL and pass that base URL to the provider:

- `node_modules/xel/themes`
- `node_modules/xel/icons`
- `node_modules/xel/locales`

```tsx
<XelProvider theme="material" icons={["material"]} locales={["en"]} assetBaseUrl="/vendor/xel">
  <App />
</XelProvider>
```
````

- [ ] **Step 4: Run docs-adjacent checks**

Run:

```bash
bun run ts
node --test tests/consumer-package.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add README.md
git commit -m "docs: document solid app setup"
```

---

### Task 8: Final Verification and Package Audit

**Files:**
- No code files unless verification exposes a defect.

- [ ] **Step 1: Run the full test suite**

Run:

```bash
bun run test
```

Expected: PASS, including:

- TypeScript package check
- Source coverage test
- Storybook coverage test
- Storybook typecheck
- Packed consumer build
- Wrapper runtime Playwright tests
- Consumer runtime Playwright tests

- [ ] **Step 2: Build the package**

Run:

```bash
bun run build
```

Expected: PASS and `dist/setup.js`, `dist/setup.d.ts`, `dist/vite.js`, `dist/vite.d.ts`, `dist/dialog.js`, and `dist/dialog.d.ts` exist.

- [ ] **Step 3: Dry-run the package**

Run:

```bash
npm pack --dry-run
```

Expected: package includes `dist`, `README.md`, and `LICENSE`; it does not include Storybook output, Playwright output, or fixture build artifacts.

- [ ] **Step 4: Inspect public exports**

Run:

```bash
node -e "import('./dist/index.js').then((m) => console.log(['XelProvider','setupXel','XDialog','XButton'].every((key) => key in m)))"
node -e "import('./dist/vite.js').then((m) => console.log(typeof m.xelSolidVitePlugin))"
```

Expected output:

```text
true
function
```

- [ ] **Step 5: Commit verification fixes only if needed**

If Step 1 through Step 4 expose a defect, patch only the defect and commit:

```bash
git add <changed-files>
git commit -m "fix: stabilize xel solid setup"
```

If no defects are exposed, do not create an empty commit.

---

## Self-Review

**Spec coverage:** The plan covers the reported first-use failure by adding `XelProvider`, `setupXel`, Vite asset serving, real consumer runtime tests, button form behavior, native dialog coverage, and README usage docs.

**Placeholder scan:** No implementation task contains placeholder language. Each code-changing task includes concrete file paths, concrete code, commands, and expected results.

**Type consistency:** `XelProvider`, `setupXel`, `XDialog`, `xelSolidVitePlugin`, `XelTheme`, `XelIconSet`, and `XelLocale` are introduced before later tasks reference them. `XButtonProps` remains the public prop type for `XButton`.
