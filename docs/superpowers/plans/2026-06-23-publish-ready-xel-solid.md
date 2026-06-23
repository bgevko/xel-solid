# Publish-Ready xel-solid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn `xel-solid` from a skeleton into a valid, tested, publish-ready SolidJS adapter package for Xel Web Components.

**Architecture:** Xel remains the source of truth for actual Web Component behavior. `xel-solid` provides thin Solid wrappers, typed public exports, event/ref/property interop, and a small browser fixture that verifies wrapper behavior in a real Solid runtime.

**Tech Stack:** TypeScript, SolidJS, Xel, Bun package scripts, Vite for browser fixture tests, Playwright for runtime verification.

---

## File Structure

- `package.json`: package metadata, publish fields, scripts, peer/dev dependency policy.
- `tsconfig.json`: strict package typechecking and declaration emit.
- `src/createXelComponent.ts`: shared wrapper factory for all Xel custom elements.
- `src/components.ts`: public wrapper exports for every public Xel `x-*` element.
- `src/events.ts`: event prop binding helpers for custom DOM events.
- `src/types.ts`: shared wrapper prop/event/property types.
- `src/jsx.d.ts`: raw custom-element JSX declarations for users who want direct `<x-button>` usage.
- `src/xel-modules.d.ts`: module declarations for Xel JS subpath imports.
- `src/index.ts`: public package entrypoint.
- `src/register.ts`: registration-only side-effect entrypoint.
- `tests/wrapper-runtime.test.ts`: browser runtime tests for ref, boolean, custom event, and property behavior.
- `tests/fixtures/wrapper-app.html`: browser fixture page loaded by Playwright.
- `tests/fixtures/wrapper-app.tsx`: Solid fixture app rendered by Vite.
- `vite.config.ts`: Vite config for browser fixture testing.
- `playwright.config.ts`: Playwright config for runtime tests.

---

### Task 1: Lock Package Metadata And Scripts

**Files:**
- Modify: `package.json`
- Read: `README.md`

- [ ] **Step 1: Update package metadata**

Replace `package.json` with:

```json
{
  "name": "xel-solid",
  "version": "0.0.0",
  "description": "SolidJS bindings for Xel Web Components.",
  "type": "module",
  "private": true,
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/bgevko/xel-solid.git"
  },
  "bugs": {
    "url": "https://github.com/bgevko/xel-solid/issues"
  },
  "homepage": "https://github.com/bgevko/xel-solid#readme",
  "keywords": [
    "xel",
    "solid",
    "solidjs",
    "web-components",
    "custom-elements",
    "ui"
  ],
  "sideEffects": [
    "./dist/register.js",
    "./dist/components.js"
  ],
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./register": {
      "types": "./dist/register.d.ts",
      "import": "./dist/register.js"
    }
  },
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "clean": "rm -rf dist",
    "test": "bun run ts && bun run test:runtime",
    "test:runtime": "playwright test",
    "ts": "tsc -p tsconfig.json --noEmit",
    "prepack": "bun run build"
  },
  "peerDependencies": {
    "solid-js": "^1.9.0",
    "xel": "*"
  },
  "devDependencies": {
    "@playwright/test": "^1.61.1",
    "solid-js": "^1.9.0",
    "typescript": "^6.0.0",
    "vite": "^8.1.0",
    "vite-plugin-solid": "^2.11.12",
    "xel": "file:../xel"
  }
}
```

- [ ] **Step 2: Run package typecheck**

Run:

```bash
bun install
bun run ts
```

Expected: TypeScript exits 0 with no diagnostics.

- [ ] **Step 3: Commit package metadata**

Run:

```bash
git add package.json bun.lock
git commit -m "chore: prepare package metadata"
```

Expected: commit succeeds.

---

### Task 2: Add Event Binding Helper

**Files:**
- Create: `src/events.ts`
- Modify: `src/types.ts`
- Modify: `src/createXelComponent.ts`

- [ ] **Step 1: Add event prop types**

Replace `src/types.ts` with:

```ts
import type { JSX } from "solid-js";

export type XelCustomEvent<TDetail = unknown> = CustomEvent<TDetail>;

export type XelEventHandler<TElement extends HTMLElement, TEvent extends Event = Event> = (
  event: TEvent & {
    currentTarget: TElement;
    target: Element;
  },
) => void;

export type XelEventProps<TElement extends HTMLElement = HTMLElement> = {
  onBeforeToggle?: XelEventHandler<TElement, Event>;
  onChange?: XelEventHandler<TElement, Event>;
  onClose?: XelEventHandler<TElement, Event>;
  onOpen?: XelEventHandler<TElement, Event>;
  onRemove?: XelEventHandler<TElement, Event>;
  onToggle?: XelEventHandler<TElement, Event>;
};

export type XelComponentProps<TElement extends HTMLElement = HTMLElement> =
  JSX.HTMLAttributes<TElement> &
    XelEventProps<TElement> & {
      children?: JSX.Element;
    };
```

- [ ] **Step 2: Add DOM event mapping helper**

Create `src/events.ts`:

```ts
import type { XelComponentProps } from "./types";

type EventPropName =
  | "onBeforeToggle"
  | "onChange"
  | "onClose"
  | "onOpen"
  | "onRemove"
  | "onToggle";

const eventPropToEventName = {
  onBeforeToggle: "beforetoggle",
  onChange: "change",
  onClose: "close",
  onOpen: "open",
  onRemove: "remove",
  onToggle: "toggle",
} as const satisfies Record<EventPropName, string>;

export const eventPropNames = Object.keys(eventPropToEventName) as EventPropName[];

export function bindXelEvents<TElement extends HTMLElement>(
  element: TElement,
  props: XelComponentProps<TElement>,
) {
  const cleanups: Array<() => void> = [];

  for (const propName of eventPropNames) {
    const handler = props[propName];

    if (typeof handler !== "function") {
      continue;
    }

    const eventName = eventPropToEventName[propName];
    const listener = (event: Event) => handler(event as Parameters<typeof handler>[0]);

    element.addEventListener(eventName, listener);
    cleanups.push(() => element.removeEventListener(eventName, listener));
  }

  return () => {
    for (const cleanup of cleanups) {
      cleanup();
    }
  };
}
```

- [ ] **Step 3: Wire event cleanup into wrapper factory**

Replace `src/createXelComponent.ts` with:

```ts
import type { JSX } from "solid-js";
import { createComponent, mergeProps, onCleanup, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { bindXelEvents, eventPropNames } from "./events";
import type { XelComponentProps } from "./types";

export function createXelComponent<TElement extends HTMLElement>(localName: string) {
  return function XelComponent(props: XelComponentProps<TElement>): JSX.Element {
    const [local, eventProps, others] = splitProps(props, ["children", "ref"], eventPropNames);

    return createComponent(
      Dynamic,
      mergeProps(
        {
          component: localName,
          ref(node: TElement) {
            if (typeof local.ref === "function") {
              local.ref(node);
            }

            const cleanup = bindXelEvents(node, eventProps);
            onCleanup(cleanup);
          },
        },
        others,
        {
          get children() {
            return local.children;
          },
        },
      ),
    );
  };
}
```

- [ ] **Step 4: Run typecheck**

Run:

```bash
bun run ts
```

Expected: no TypeScript errors.

- [ ] **Step 5: Commit event helper**

Run:

```bash
git add src/types.ts src/events.ts src/createXelComponent.ts
git commit -m "feat: bind xel custom events"
```

Expected: commit succeeds.

---

### Task 3: Normalize Boolean Attributes

**Files:**
- Modify: `src/createXelComponent.ts`
- Modify: `src/types.ts`

- [ ] **Step 1: Add boolean prop names**

Replace `src/types.ts` with:

```ts
import type { JSX } from "solid-js";

export type Booleanish = boolean | "" | undefined | null;

export type XelCustomEvent<TDetail = unknown> = CustomEvent<TDetail>;

export type XelEventHandler<TElement extends HTMLElement, TEvent extends Event = Event> = (
  event: TEvent & {
    currentTarget: TElement;
    target: Element;
  },
) => void;

export type XelEventProps<TElement extends HTMLElement = HTMLElement> = {
  onBeforeToggle?: XelEventHandler<TElement, Event>;
  onChange?: XelEventHandler<TElement, Event>;
  onClose?: XelEventHandler<TElement, Event>;
  onOpen?: XelEventHandler<TElement, Event>;
  onRemove?: XelEventHandler<TElement, Event>;
  onToggle?: XelEventHandler<TElement, Event>;
};

export type XelBooleanProps = {
  checked?: Booleanish;
  disabled?: Booleanish;
  expanded?: Booleanish;
  hidden?: Booleanish;
  mixed?: Booleanish;
  open?: Booleanish;
  selected?: Booleanish;
  toggled?: Booleanish;
  togglable?: Booleanish;
};

export type XelComponentProps<TElement extends HTMLElement = HTMLElement> =
  Omit<JSX.HTMLAttributes<TElement>, keyof XelBooleanProps> &
    XelBooleanProps &
    XelEventProps<TElement> & {
      children?: JSX.Element;
    };
```

- [ ] **Step 2: Normalize booleans before render**

Replace `src/createXelComponent.ts` with:

```ts
import type { JSX } from "solid-js";
import { createComponent, mergeProps, onCleanup, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { bindXelEvents, eventPropNames } from "./events";
import type { XelComponentProps } from "./types";

const booleanPropNames = [
  "checked",
  "disabled",
  "expanded",
  "hidden",
  "mixed",
  "open",
  "selected",
  "toggled",
  "togglable",
] as const;

function normalizeBooleanProps(props: Record<string, unknown>) {
  const normalized = { ...props };

  for (const propName of booleanPropNames) {
    if (normalized[propName] === false || normalized[propName] === null) {
      normalized[propName] = undefined;
    }
  }

  return normalized;
}

export function createXelComponent<TElement extends HTMLElement>(localName: string) {
  return function XelComponent(props: XelComponentProps<TElement>): JSX.Element {
    const [local, eventProps, others] = splitProps(props, ["children", "ref"], eventPropNames);

    return createComponent(
      Dynamic,
      mergeProps(
        {
          component: localName,
          ref(node: TElement) {
            if (typeof local.ref === "function") {
              local.ref(node);
            }

            const cleanup = bindXelEvents(node, eventProps);
            onCleanup(cleanup);
          },
        },
        normalizeBooleanProps(others),
        {
          get children() {
            return local.children;
          },
        },
      ),
    );
  };
}
```

- [ ] **Step 3: Run typecheck**

Run:

```bash
bun run ts
```

Expected: no TypeScript errors.

- [ ] **Step 4: Commit boolean normalization**

Run:

```bash
git add src/types.ts src/createXelComponent.ts
git commit -m "feat: normalize boolean wrapper props"
```

Expected: commit succeeds.

---

### Task 4: Add Property Assignment For Rich Values

**Files:**
- Modify: `src/types.ts`
- Modify: `src/createXelComponent.ts`

- [ ] **Step 1: Add `properties` adapter prop**

Replace `src/types.ts` with:

```ts
import type { JSX } from "solid-js";

export type Booleanish = boolean | "" | undefined | null;

export type XelCustomEvent<TDetail = unknown> = CustomEvent<TDetail>;

export type XelEventHandler<TElement extends HTMLElement, TEvent extends Event = Event> = (
  event: TEvent & {
    currentTarget: TElement;
    target: Element;
  },
) => void;

export type XelEventProps<TElement extends HTMLElement = HTMLElement> = {
  onBeforeToggle?: XelEventHandler<TElement, Event>;
  onChange?: XelEventHandler<TElement, Event>;
  onClose?: XelEventHandler<TElement, Event>;
  onOpen?: XelEventHandler<TElement, Event>;
  onRemove?: XelEventHandler<TElement, Event>;
  onToggle?: XelEventHandler<TElement, Event>;
};

export type XelBooleanProps = {
  checked?: Booleanish;
  disabled?: Booleanish;
  expanded?: Booleanish;
  hidden?: Booleanish;
  mixed?: Booleanish;
  open?: Booleanish;
  selected?: Booleanish;
  toggled?: Booleanish;
  togglable?: Booleanish;
};

export type XelComponentProps<TElement extends HTMLElement = HTMLElement> =
  Omit<JSX.HTMLAttributes<TElement>, keyof XelBooleanProps> &
    XelBooleanProps &
    XelEventProps<TElement> & {
      children?: JSX.Element;
      properties?: Partial<TElement> & Record<string, unknown>;
    };
```

- [ ] **Step 2: Assign rich properties through `properties`**

Replace `src/createXelComponent.ts` with:

```ts
import type { JSX } from "solid-js";
import { createComponent, createRenderEffect, mergeProps, onCleanup, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { bindXelEvents, eventPropNames } from "./events";
import type { XelComponentProps } from "./types";

const booleanPropNames = [
  "checked",
  "disabled",
  "expanded",
  "hidden",
  "mixed",
  "open",
  "selected",
  "toggled",
  "togglable",
] as const;

function normalizeBooleanProps(props: Record<string, unknown>) {
  const normalized = { ...props };

  for (const propName of booleanPropNames) {
    if (normalized[propName] === false || normalized[propName] === null) {
      normalized[propName] = undefined;
    }
  }

  return normalized;
}

function assignProperties<TElement extends HTMLElement>(
  element: TElement,
  properties: XelComponentProps<TElement>["properties"],
) {
  if (!properties) {
    return;
  }

  for (const [name, value] of Object.entries(properties)) {
    (element as Record<string, unknown>)[name] = value;
  }
}

export function createXelComponent<TElement extends HTMLElement>(localName: string) {
  return function XelComponent(props: XelComponentProps<TElement>): JSX.Element {
    let element: TElement | undefined;
    const [local, eventProps, others] = splitProps(
      props,
      ["children", "properties", "ref"],
      eventPropNames,
    );

    createRenderEffect(() => {
      if (element) {
        assignProperties(element, local.properties);
      }
    });

    return createComponent(
      Dynamic,
      mergeProps(
        {
          component: localName,
          ref(node: TElement) {
            element = node;

            if (typeof local.ref === "function") {
              local.ref(node);
            }

            assignProperties(node, local.properties);

            const cleanup = bindXelEvents(node, eventProps);
            onCleanup(cleanup);
          },
        },
        normalizeBooleanProps(others),
        {
          get children() {
            return local.children;
          },
        },
      ),
    );
  };
}
```

- [ ] **Step 3: Run typecheck**

Run:

```bash
bun run ts
```

Expected: no TypeScript errors.

- [ ] **Step 4: Commit property support**

Run:

```bash
git add src/types.ts src/createXelComponent.ts
git commit -m "feat: support custom element properties"
```

Expected: commit succeeds.

---

### Task 5: Add Runtime Fixture Tests

**Files:**
- Create: `vite.config.ts`
- Create: `playwright.config.ts`
- Create: `tests/fixtures/wrapper-app.html`
- Create: `tests/fixtures/wrapper-app.tsx`
- Create: `tests/wrapper-runtime.test.ts`
- Modify: `package.json`

- [ ] **Step 1: Add Vite config**

Create `vite.config.ts`:

```ts
import solid from "vite-plugin-solid";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [solid()],
  server: {
    host: "127.0.0.1",
    port: 5179,
    strictPort: true,
  },
});
```

- [ ] **Step 2: Add Playwright config**

Create `playwright.config.ts`:

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  webServer: {
    command: "bunx vite --host 127.0.0.1 --port 5179",
    url: "http://127.0.0.1:5179/tests/fixtures/wrapper-app.html",
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: "http://127.0.0.1:5179",
    browserName: "chromium",
  },
});
```

- [ ] **Step 3: Add browser fixture HTML**

Create `tests/fixtures/wrapper-app.html`:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>xel-solid wrapper fixture</title>
    <script type="module" src="./wrapper-app.tsx"></script>
  </head>
  <body>
    <main id="app"></main>
  </body>
</html>
```

- [ ] **Step 4: Add Solid fixture app**

Create `tests/fixtures/wrapper-app.tsx`:

```tsx
import { createSignal } from "solid-js";
import { render } from "solid-js/web";
import { XButton, XInput, XLabel } from "../../src";

function App() {
  const [disabled, setDisabled] = createSignal(false);
  const [eventCount, setEventCount] = createSignal(0);
  const [propertyValue, setPropertyValue] = createSignal("initial");

  let inputRef: HTMLElement | undefined;

  return (
    <>
      <XButton id="event-button" onToggle={() => setEventCount((count) => count + 1)}>
        <XLabel>Toggle event</XLabel>
      </XButton>

      <XButton id="boolean-button" disabled={disabled()}>
        <XLabel>Boolean button</XLabel>
      </XButton>

      <button id="enable-button" onClick={() => setDisabled(false)}>
        enable
      </button>

      <button id="disable-button" onClick={() => setDisabled(true)}>
        disable
      </button>

      <XInput
        id="property-input"
        ref={(element) => {
          inputRef = element;
          window.xelSolidInputRef = element;
        }}
        properties={{ value: propertyValue() } as Partial<HTMLElement> & { value: string }}
      />

      <button id="change-property" onClick={() => setPropertyValue("changed")}>
        change property
      </button>

      <output id="event-count">{eventCount()}</output>
      <output id="ref-local-name">{inputRef?.localName}</output>
    </>
  );
}

declare global {
  interface Window {
    xelSolidInputRef?: HTMLElement;
  }
}

render(() => <App />, document.getElementById("app")!);
```

- [ ] **Step 5: Add runtime tests**

Create `tests/wrapper-runtime.test.ts`:

```ts
import { expect, test } from "@playwright/test";

test("renders wrappers as Xel custom elements", async ({ page }) => {
  await page.goto("/tests/fixtures/wrapper-app.html");

  await expect(page.locator("x-button#event-button")).toBeVisible();
  await expect(page.locator("x-label", { hasText: "Toggle event" })).toBeVisible();
  await expect(page.locator("x-input#property-input")).toBeVisible();
});

test("forwards refs to the underlying custom element", async ({ page }) => {
  await page.goto("/tests/fixtures/wrapper-app.html");

  await expect(page.locator("#ref-local-name")).toHaveText("x-input");
  const refLocalName = await page.evaluate(() => window.xelSolidInputRef?.localName);

  expect(refLocalName).toBe("x-input");
});

test("normalizes false boolean props by removing attributes", async ({ page }) => {
  await page.goto("/tests/fixtures/wrapper-app.html");

  const button = page.locator("x-button#boolean-button");

  await expect(button).not.toHaveAttribute("disabled", "");
  await page.locator("#disable-button").click();
  await expect(button).toHaveAttribute("disabled", "");
  await page.locator("#enable-button").click();
  await expect(button).not.toHaveAttribute("disabled", "");
});

test("binds custom Xel event props", async ({ page }) => {
  await page.goto("/tests/fixtures/wrapper-app.html");

  await page.locator("x-button#event-button").dispatchEvent("toggle");
  await expect(page.locator("#event-count")).toHaveText("1");
});

test("assigns rich values through the properties prop", async ({ page }) => {
  await page.goto("/tests/fixtures/wrapper-app.html");

  await expect(page.locator("x-input#property-input")).toHaveJSProperty("value", "initial");
  await page.locator("#change-property").click();
  await expect(page.locator("x-input#property-input")).toHaveJSProperty("value", "changed");
});
```

- [ ] **Step 6: Run tests and install Chromium if needed**

Run:

```bash
bun run test
```

Expected:

```text
5 passed
```

If Playwright reports that Chromium is missing, run:

```bash
bunx playwright install chromium
bun run test
```

Expected:

```text
5 passed
```

- [ ] **Step 7: Commit runtime tests**

Run:

```bash
git add package.json bun.lock vite.config.ts playwright.config.ts tests
git commit -m "test: verify solid wrapper runtime behavior"
```

Expected: commit succeeds.

---

### Task 6: Add Specific Prop Types For Common Xel Attributes

**Files:**
- Modify: `src/types.ts`

- [ ] **Step 1: Add common Xel prop groups**

Replace `src/types.ts` with:

```ts
import type { JSX } from "solid-js";

export type Booleanish = boolean | "" | undefined | null;

export type XelCustomEvent<TDetail = unknown> = CustomEvent<TDetail>;

export type XelEventHandler<TElement extends HTMLElement, TEvent extends Event = Event> = (
  event: TEvent & {
    currentTarget: TElement;
    target: Element;
  },
) => void;

export type XelEventProps<TElement extends HTMLElement = HTMLElement> = {
  onBeforeToggle?: XelEventHandler<TElement, Event>;
  onChange?: XelEventHandler<TElement, Event>;
  onClose?: XelEventHandler<TElement, Event>;
  onOpen?: XelEventHandler<TElement, Event>;
  onRemove?: XelEventHandler<TElement, Event>;
  onToggle?: XelEventHandler<TElement, Event>;
};

export type XelBooleanProps = {
  checked?: Booleanish;
  disabled?: Booleanish;
  expanded?: Booleanish;
  hidden?: Booleanish;
  mixed?: Booleanish;
  open?: Booleanish;
  selected?: Booleanish;
  toggled?: Booleanish;
  togglable?: Booleanish;
};

export type XelCommonProps = {
  href?: string;
  icon?: string;
  id?: string;
  max?: number | string;
  min?: number | string;
  skin?: string;
  step?: number | string;
  value?: string | number | null;
};

export type XelComponentProps<TElement extends HTMLElement = HTMLElement> =
  Omit<JSX.HTMLAttributes<TElement>, keyof XelBooleanProps | keyof XelCommonProps> &
    XelBooleanProps &
    XelCommonProps &
    XelEventProps<TElement> & {
      children?: JSX.Element;
      properties?: Partial<TElement> & Record<string, unknown>;
    };
```

- [ ] **Step 2: Run typecheck**

Run:

```bash
bun run ts
```

Expected: no TypeScript errors.

- [ ] **Step 3: Commit common prop types**

Run:

```bash
git add src/types.ts
git commit -m "feat: type common xel wrapper props"
```

Expected: commit succeeds.

---

### Task 7: Verify Build Output And Pack Contents

**Files:**
- Modify: `package.json` only if pack/build exposes missing files
- Generated: `dist/*`

- [ ] **Step 1: Clean and build**

Run:

```bash
bun run clean
bun run build
```

Expected: `tsc -p tsconfig.json` exits 0. `dist/index.js`, `dist/index.d.ts`, `dist/register.js`, and `dist/register.d.ts` exist.

- [ ] **Step 2: Inspect emitted files**

Run:

```bash
find dist -maxdepth 2 -type f -print | sort
```

Expected output includes:

```text
dist/components.d.ts
dist/components.js
dist/createXelComponent.d.ts
dist/createXelComponent.js
dist/events.d.ts
dist/events.js
dist/index.d.ts
dist/index.js
dist/register.d.ts
dist/register.js
dist/types.d.ts
dist/types.js
```

- [ ] **Step 3: Pack dry run**

Run:

```bash
npm pack --dry-run
```

Expected output includes `dist`, `README.md`, `LICENSE`, and `package.json`. Expected output does not include `src`, `tests`, or `node_modules`.

- [ ] **Step 4: Commit publish metadata fix when pack contents change**

If Step 3 reveals missing package files, update `package.json` `files` or `exports` to include only required publish files, then run:

```bash
bun run build
npm pack --dry-run
git add package.json
git commit -m "chore: fix publish package contents"
```

Expected: build succeeds, dry run includes the required package files, commit succeeds.

If Step 3 already shows correct contents, run:

```bash
git status --short
```

Expected: no source changes from this task except ignored `dist/`.

---

### Task 8: Add Publish-Ready README

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace README**

Replace `README.md` with:

````md
# xel-solid

SolidJS bindings for [Xel](https://xel-toolkit.org/) Web Components.

`xel-solid` keeps Xel as the source of truth. The exported Solid components are thin adapters that render Xel custom elements, normalize common boolean props, bind common custom events, forward refs, and provide a property escape hatch for rich custom-element values.

## Install

```sh
bun add solid-js xel xel-solid
```

## Usage

```tsx
import { XButton, XIcon, XLabel } from "xel-solid";

export function SaveButton() {
  return (
    <XButton disabled={false} onClick={() => console.log("save")}>
      <XIcon href="#save" />
      <XLabel>Save</XLabel>
    </XButton>
  );
}
```

## Custom Events

Common Xel custom events are exposed with Solid-style props:

```tsx
import { XButton } from "xel-solid";

export function ToggleButton() {
  return <XButton togglable onToggle={(event) => console.log(event.currentTarget)} />;
}
```

## Rich Properties

Use `properties` when a custom element property needs an object, array, or non-attribute value:

```tsx
import { XInput } from "xel-solid";

export function NamedInput() {
  return <XInput properties={{ value: "Ada" }} />;
}
```

## Raw Custom Elements

To register Xel elements without using wrapper components:

```ts
import "xel-solid/register";
```

Then use raw custom elements in Solid JSX:

```tsx
<x-button>
  <x-label>Raw element</x-label>
</x-button>
```

## Development

```sh
bun install
bun run ts
bun run test
bun run build
npm pack --dry-run
```
````

- [ ] **Step 2: Run final verification**

Run:

```bash
bun run test
bun run build
npm pack --dry-run
```

Expected: tests pass, build succeeds, pack dry run includes only publishable files.

- [ ] **Step 3: Commit README**

Run:

```bash
git add README.md
git commit -m "docs: document solid wrapper package"
```

Expected: commit succeeds.

---

## Final Verification

- [ ] **Step 1: Confirm clean working tree**

Run:

```bash
git status --short
```

Expected: no uncommitted source files. Ignored `dist/` may exist if `.gitignore` excludes it.

- [ ] **Step 2: Run full verification**

Run:

```bash
bun run test
bun run build
npm pack --dry-run
```

Expected: `bun run test` reports `5 passed`, `bun run build` exits 0, and `npm pack --dry-run` lists `dist`, `README.md`, `LICENSE`, and `package.json`.

- [ ] **Step 3: Inspect package tarball metadata**

Run:

```bash
npm pack
tar -tf xel-solid-0.0.0.tgz | sort
rm xel-solid-0.0.0.tgz
```

Expected output includes:

```text
package/LICENSE
package/README.md
package/dist/index.d.ts
package/dist/index.js
package/dist/register.d.ts
package/dist/register.js
package/package.json
```

Expected output does not include:

```text
package/src/
package/tests/
package/node_modules/
```

---

## Self-Review

- Spec coverage: This plan covers package metadata, wrapper runtime behavior, refs, boolean attributes, custom events, rich property assignment, runtime tests, build output, package contents, and README publishing docs.
- Placeholder scan: The plan contains no unfinished markers or unspecified implementation steps.
- Type consistency: `XelComponentProps`, `XelEventProps`, `bindXelEvents`, `createXelComponent`, and wrapper export names are consistent across tasks.
