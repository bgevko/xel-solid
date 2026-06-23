# xel-solid Production Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the remaining production-readiness gaps so `xel-solid` can be published and used confidently by Solid apps.

**Architecture:** Keep Xel as the implementation source of truth and keep `xel-solid` as a thin adapter package. Add generated/audited metadata for public Xel elements, broaden wrapper event and boolean support from the Xel source, ship raw JSX declarations, and verify the packed package in a separate consumer fixture.

**Tech Stack:** TypeScript, SolidJS, Xel, Bun scripts, Vite, Playwright, npm pack.

---

## File Structure

- `package.json`: publish flag, scripts, npm package metadata, export map.
- `src/events.ts`: supported custom event prop mapping.
- `src/types.ts`: public prop/event/boolean/common types.
- `src/createXelComponent.ts`: wrapper factory using shared event and boolean metadata.
- `src/jsx.ts`: package-shipped raw custom-element JSX module augmentation.
- `src/jsx.d.ts`: removed after `src/jsx.ts` replaces it.
- `src/index.ts`: public wrapper entrypoint and type exports.
- `src/register.ts`: side-effect registration entrypoint.
- `tests/coverage.test.ts`: static audit tests comparing `xel-solid` metadata to the Xel source tree.
- `tests/wrapper-runtime.test.ts`: runtime browser tests for wrapper behavior.
- `tests/fixtures/wrapper-app.tsx`: Solid runtime fixture app.
- `tests/fixtures/consumer/`: isolated app that installs the packed tarball and proves package consumption works.
- `README.md`: production usage and publishing docs.

---

### Task 1: Add Source Coverage Audit Tests

**Files:**
- Create: `tests/coverage.test.ts`
- Modify: `package.json`

- [ ] **Step 1: Add Node test script**

Modify `package.json` scripts to include a static test before runtime tests:

```json
{
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "clean": "rm -rf dist",
    "test": "bun run ts && bun test tests/coverage.test.ts && bun run test:runtime",
    "test:runtime": "playwright test",
    "ts": "tsc -p tsconfig.json --noEmit",
    "prepack": "bun run build"
  }
}
```

- [ ] **Step 2: Add coverage audit tests**

Create `tests/coverage.test.ts`:

```ts
import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dir, "..");
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

    expect(wrappedNames).toEqual(publicNames);
  });

  test("does not expose internal colorpicker slider helpers as wrappers", () => {
    const componentsTs = read("src/components.ts");

    expect(componentsTs).not.toContain("x-lablinearsliders");
    expect(componentsTs).not.toContain("x-labplanarsliders");
    expect(componentsTs).not.toContain("x-lchlinearsliders");
    expect(componentsTs).not.toContain("x-lchplanarsliders");
    expect(componentsTs).not.toContain("x-rgblinearsliders");
    expect(componentsTs).not.toContain("x-rgbplanarsliders");
    expect(componentsTs).not.toContain("x-rgbpolarsliders");
    expect(componentsTs).not.toContain("x-xyzlinearsliders");
    expect(componentsTs).not.toContain("x-xyzplanarsliders");
  });
});
```

- [ ] **Step 3: Run the new static tests**

Run:

```bash
bun test tests/coverage.test.ts
```

Expected:

```text
2 pass
```

- [ ] **Step 4: Run full tests**

Run:

```bash
bun run test
```

Expected:

```text
2 pass
5 passed
```

- [ ] **Step 5: Commit coverage audit**

Run:

```bash
git add package.json tests/coverage.test.ts
git commit -m "test: audit xel source coverage"
```

Expected: commit succeeds.

---

### Task 2: Broaden Custom Event Prop Support

**Files:**
- Modify: `src/events.ts`
- Modify: `src/types.ts`
- Modify: `tests/coverage.test.ts`
- Modify: `tests/fixtures/wrapper-app.tsx`
- Modify: `tests/wrapper-runtime.test.ts`

- [ ] **Step 1: Extend event prop types**

Replace the event-related section of `src/types.ts` with:

```ts
export type XelEventHandler<TElement extends HTMLElement, TEvent extends Event = Event> = (
  event: TEvent & {
    currentTarget: TElement;
    target: Element;
  },
) => void;

export type XelEventProps<TElement extends HTMLElement = HTMLElement> = {
  onAdd?: XelEventHandler<TElement, Event>;
  onBeforeToggle?: XelEventHandler<TElement, Event>;
  onBeforeValidate?: XelEventHandler<TElement, Event>;
  onButtonClick?: XelEventHandler<TElement, Event>;
  onChange?: XelEventHandler<TElement, Event>;
  onChangeEnd?: XelEventHandler<TElement, Event>;
  onChangeStart?: XelEventHandler<TElement, Event>;
  onClose?: XelEventHandler<TElement, Event>;
  onCollapse?: XelEventHandler<TElement, Event>;
  onDecrement?: XelEventHandler<TElement, Event>;
  onDecrementEnd?: XelEventHandler<TElement, Event>;
  onDecrementStart?: XelEventHandler<TElement, Event>;
  onExpand?: XelEventHandler<TElement, Event>;
  onIncrement?: XelEventHandler<TElement, Event>;
  onIncrementEnd?: XelEventHandler<TElement, Event>;
  onIncrementStart?: XelEventHandler<TElement, Event>;
  onInput?: XelEventHandler<TElement, Event>;
  onOpen?: XelEventHandler<TElement, Event>;
  onPin?: XelEventHandler<TElement, Event>;
  onRearrange?: XelEventHandler<TElement, Event>;
  onRemove?: XelEventHandler<TElement, Event>;
  onSelect?: XelEventHandler<TElement, Event>;
  onTextInputModeEnd?: XelEventHandler<TElement, Event>;
  onTextInputModeStart?: XelEventHandler<TElement, Event>;
  onToggle?: XelEventHandler<TElement, Event>;
  onUserClose?: XelEventHandler<TElement, Event>;
};
```

Keep the rest of `src/types.ts` unchanged for this step.

- [ ] **Step 2: Extend event binding map**

Replace `src/events.ts` with:

```ts
import type { XelComponentProps } from "./types";

export const xelEventPropToEventName = {
  onAdd: "add",
  onBeforeToggle: "beforetoggle",
  onBeforeValidate: "beforevalidate",
  onButtonClick: "buttonclick",
  onChange: "change",
  onChangeEnd: "changeend",
  onChangeStart: "changestart",
  onClose: "close",
  onCollapse: "collapse",
  onDecrement: "decrement",
  onDecrementEnd: "decrementend",
  onDecrementStart: "decrementstart",
  onExpand: "expand",
  onIncrement: "increment",
  onIncrementEnd: "incrementend",
  onIncrementStart: "incrementstart",
  onInput: "input",
  onOpen: "open",
  onPin: "pin",
  onRearrange: "rearrange",
  onRemove: "remove",
  onSelect: "select",
  onTextInputModeEnd: "textinputmodeend",
  onTextInputModeStart: "textinputmodestart",
  onToggle: "toggle",
  onUserClose: "userclose",
} as const;

export type EventPropName = keyof typeof xelEventPropToEventName;

export const eventPropNames = Object.keys(xelEventPropToEventName) as EventPropName[];

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

    const eventName = xelEventPropToEventName[propName];
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

- [ ] **Step 3: Add event coverage audit**

Append this test to `tests/coverage.test.ts` inside the `describe("Xel source coverage", ...)` block:

```ts
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
        expect(mappedEvents.has(eventName), eventName).toBe(true);
      }
    }
  });
```

- [ ] **Step 4: Extend runtime fixture for additional events**

In `tests/fixtures/wrapper-app.tsx`, add another signal after `eventCount`:

```tsx
  const [extraEventCount, setExtraEventCount] = createSignal(0);
```

Add this element after the existing `event-button`:

```tsx
      <XAccordion
        id="extra-event-accordion"
        onExpand={() => setExtraEventCount((count) => count + 1)}
        onCollapse={() => setExtraEventCount((count) => count + 1)}
      >
        <XLabel>Extra events</XLabel>
      </XAccordion>
```

Update the import:

```tsx
import { XAccordion, XButton, XInput, XLabel } from "../../src";
```

Add an output near `event-count`:

```tsx
      <output id="extra-event-count">{extraEventCount()}</output>
```

- [ ] **Step 5: Add runtime event test**

Append this test to `tests/wrapper-runtime.test.ts`:

```ts
test("binds the broader Xel custom event prop set", async ({ page }) => {
  await page.goto("/tests/fixtures/wrapper-app.html");

  await page.locator("x-accordion#extra-event-accordion").dispatchEvent("expand");
  await page.locator("x-accordion#extra-event-accordion").dispatchEvent("collapse");
  await expect(page.locator("#extra-event-count")).toHaveText("2");
});
```

- [ ] **Step 6: Run tests**

Run:

```bash
bun run test
```

Expected:

```text
3 pass
6 passed
```

- [ ] **Step 7: Commit event support**

Run:

```bash
git add src/events.ts src/types.ts tests/coverage.test.ts tests/fixtures/wrapper-app.tsx tests/wrapper-runtime.test.ts
git commit -m "feat: cover xel custom events"
```

Expected: commit succeeds.

---

### Task 3: Broaden Boolean Prop Coverage

**Files:**
- Modify: `src/types.ts`
- Modify: `src/createXelComponent.ts`
- Modify: `tests/coverage.test.ts`
- Modify: `tests/fixtures/wrapper-app.tsx`
- Modify: `tests/wrapper-runtime.test.ts`

- [ ] **Step 1: Extend boolean prop types**

Replace `XelBooleanProps` in `src/types.ts` with:

```ts
export type XelBooleanProps = {
  alpha?: Booleanish;
  checked?: Booleanish;
  compact?: Booleanish;
  condensed?: Booleanish;
  disabled?: Booleanish;
  ellipsis?: Booleanish;
  expanded?: Booleanish;
  expandable?: Booleanish;
  hidden?: Booleanish;
  mixed?: Booleanish;
  modal?: Booleanish;
  noautocollapse?: Booleanish;
  open?: Booleanish;
  opened?: Booleanish;
  readonly?: Booleanish;
  readOnly?: Booleanish;
  required?: Booleanish;
  selected?: Booleanish;
  spellcheck?: Booleanish;
  toggled?: Booleanish;
  togglable?: Booleanish;
};
```

- [ ] **Step 2: Extend boolean normalization list**

Replace `booleanPropNames` in `src/createXelComponent.ts` with:

```ts
const booleanPropNames = [
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
] as const;
```

- [ ] **Step 3: Add boolean coverage audit**

Append this test to `tests/coverage.test.ts` inside the `describe("Xel source coverage", ...)` block:

```ts
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
      expect(createXelComponentTs).toContain(`"${propName}"`);
      expect(typesTs).toContain(`${propName}?: Booleanish`);
    }
  });
```

- [ ] **Step 4: Extend runtime fixture for non-initial boolean props**

In `tests/fixtures/wrapper-app.tsx`, add this signal after `disabled`:

```tsx
  const [opened, setOpened] = createSignal(false);
```

Add this element after `boolean-button`:

```tsx
      <XMenu id="opened-menu" opened={opened()}>
        <XMenuItem>
          <XLabel>Menu item</XLabel>
        </XMenuItem>
      </XMenu>
```

Update the import:

```tsx
import { XAccordion, XButton, XInput, XLabel, XMenu, XMenuItem } from "../../src";
```

Add these buttons after `disable-button`:

```tsx
      <button id="open-menu" onClick={() => setOpened(true)}>
        open menu
      </button>

      <button id="close-menu" onClick={() => setOpened(false)}>
        close menu
      </button>
```

- [ ] **Step 5: Add runtime boolean test**

Append this test to `tests/wrapper-runtime.test.ts`:

```ts
test("normalizes additional Xel boolean props", async ({ page }) => {
  await page.goto("/tests/fixtures/wrapper-app.html");

  const menu = page.locator("x-menu#opened-menu");

  await expect(menu).not.toHaveAttribute("opened", "");
  await page.locator("#open-menu").click();
  await expect(menu).toHaveAttribute("opened", "");
  await page.locator("#close-menu").click();
  await expect(menu).not.toHaveAttribute("opened", "");
});
```

- [ ] **Step 6: Run tests**

Run:

```bash
bun run test
```

Expected:

```text
4 pass
7 passed
```

- [ ] **Step 7: Commit boolean coverage**

Run:

```bash
git add src/types.ts src/createXelComponent.ts tests/coverage.test.ts tests/fixtures/wrapper-app.tsx tests/wrapper-runtime.test.ts
git commit -m "feat: cover xel boolean props"
```

Expected: commit succeeds.

---

### Task 4: Ship Raw JSX Declarations

**Files:**
- Create: `src/jsx.ts`
- Delete: `src/jsx.d.ts`
- Modify: `src/types.ts`
- Modify: `tests/coverage.test.ts`
- Modify: `README.md`

- [ ] **Step 1: Replace non-emitted declaration file with emitted module**

Delete `src/jsx.d.ts`.

Create `src/jsx.ts`:

```ts
import type { JSX } from "solid-js";
import type { XelComponentProps } from "./types";

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "x-accordion": XelComponentProps<HTMLElement>;
      "x-avatar": XelComponentProps<HTMLElement>;
      "x-backdrop": XelComponentProps<HTMLElement>;
      "x-box": XelComponentProps<HTMLElement>;
      "x-button": XelComponentProps<HTMLElement>;
      "x-buttons": XelComponentProps<HTMLElement>;
      "x-card": XelComponentProps<HTMLElement>;
      "x-checkbox": XelComponentProps<HTMLElement>;
      "x-colorinput": XelComponentProps<HTMLElement>;
      "x-colorpicker": XelComponentProps<HTMLElement>;
      "x-colorselect": XelComponentProps<HTMLElement>;
      "x-contextmenu": XelComponentProps<HTMLElement>;
      "x-doctab": XelComponentProps<HTMLElement>;
      "x-doctabs": XelComponentProps<HTMLElement>;
      "x-drawer": XelComponentProps<HTMLElement>;
      "x-icon": XelComponentProps<HTMLElement>;
      "x-input": XelComponentProps<HTMLElement>;
      "x-label": XelComponentProps<HTMLElement>;
      "x-menu": XelComponentProps<HTMLElement>;
      "x-menubar": XelComponentProps<HTMLElement>;
      "x-menuitem": XelComponentProps<HTMLElement>;
      "x-message": XelComponentProps<HTMLElement>;
      "x-nav": XelComponentProps<HTMLElement>;
      "x-navitem": XelComponentProps<HTMLElement>;
      "x-notification": XelComponentProps<HTMLElement>;
      "x-numberinput": XelComponentProps<HTMLElement>;
      "x-pager": XelComponentProps<HTMLElement>;
      "x-popover": XelComponentProps<HTMLElement>;
      "x-progressbar": XelComponentProps<HTMLElement>;
      "x-radio": XelComponentProps<HTMLElement>;
      "x-radios": XelComponentProps<HTMLElement>;
      "x-select": XelComponentProps<HTMLElement>;
      "x-shortcut": XelComponentProps<HTMLElement>;
      "x-slider": XelComponentProps<HTMLElement>;
      "x-stepper": XelComponentProps<HTMLElement>;
      "x-swatch": XelComponentProps<HTMLElement>;
      "x-switch": XelComponentProps<HTMLElement>;
      "x-tab": XelComponentProps<HTMLElement>;
      "x-tabs": XelComponentProps<HTMLElement>;
      "x-tag": XelComponentProps<HTMLElement>;
      "x-tags": XelComponentProps<HTMLElement>;
      "x-tagsinput": XelComponentProps<HTMLElement>;
      "x-texteditor": XelComponentProps<HTMLElement>;
      "x-throbber": XelComponentProps<HTMLElement>;
      "x-titlebar": XelComponentProps<HTMLElement>;
      "x-tooltip": XelComponentProps<HTMLElement>;
    }
  }
}

export type XelIntrinsicElements = JSX.IntrinsicElements;
```

- [ ] **Step 2: Export raw JSX types from main entry**

Add this line to `src/index.ts`:

```ts
export type { XelIntrinsicElements } from "./jsx";
```

- [ ] **Step 3: Add JSX pack coverage test**

Append this test to `tests/coverage.test.ts` inside the `describe("Xel source coverage", ...)` block:

```ts
  test("ships raw custom element JSX declarations in dist", () => {
    const packageJson = JSON.parse(read("package.json")) as { files: string[] };
    const indexTs = read("src/index.ts");

    expect(packageJson.files).toContain("dist");
    expect(indexTs).toContain('export type { XelIntrinsicElements } from "./jsx";');
    expect(read("src/jsx.ts")).toContain('"x-button": XelComponentProps<HTMLElement>');
  });
```

- [ ] **Step 4: Run typecheck and build**

Run:

```bash
bun run ts
bun run build
find dist -maxdepth 1 -type f -name 'jsx.*' -print | sort
```

Expected output includes:

```text
dist/jsx.d.ts
dist/jsx.js
dist/jsx.js.map
```

- [ ] **Step 5: Run full tests**

Run:

```bash
bun run test
```

Expected:

```text
5 pass
7 passed
```

- [ ] **Step 6: Commit shipped JSX declarations**

Run:

```bash
git add src/jsx.ts src/jsx.d.ts src/index.ts tests/coverage.test.ts
git commit -m "feat: ship raw jsx declarations"
```

Expected: commit succeeds. `git add src/jsx.d.ts` stages the deletion.

---

### Task 5: Make Package Publishable

**Files:**
- Modify: `package.json`
- Modify: `README.md`
- Modify: `tests/coverage.test.ts`

- [ ] **Step 1: Remove private publish block and add publish config**

Modify the top of `package.json` so it contains:

```json
{
  "name": "xel-solid",
  "version": "0.0.0",
  "description": "SolidJS bindings for Xel Web Components.",
  "type": "module",
  "license": "MIT",
  "publishConfig": {
    "access": "public"
  },
```

Remove this line:

```json
  "private": true,
```

- [ ] **Step 2: Add publishability audit**

Append this test to `tests/coverage.test.ts` inside the `describe("Xel source coverage", ...)` block:

```ts
  test("package metadata allows public publishing", () => {
    const packageJson = JSON.parse(read("package.json")) as {
      private?: boolean;
      publishConfig?: { access?: string };
      exports?: Record<string, unknown>;
      files?: string[];
    };

    expect(packageJson.private).toBeUndefined();
    expect(packageJson.publishConfig?.access).toBe("public");
    expect(packageJson.files).toEqual(["dist", "README.md", "LICENSE"]);
    expect(packageJson.exports).toHaveProperty(".");
    expect(packageJson.exports).toHaveProperty("./register");
  });
```

- [ ] **Step 3: Update README install section**

In `README.md`, replace the install section with:

```md
## Install

```sh
bun add solid-js xel xel-solid
```

`solid-js` and `xel` are peer dependencies. Install them in each app that consumes `xel-solid`.
```

- [ ] **Step 4: Run tests and dry-run pack**

Run:

```bash
bun run test
npm pack --dry-run
```

Expected:

```text
6 pass
7 passed
```

`npm pack --dry-run` exits 0 and lists `dist/jsx.d.ts`.

- [ ] **Step 5: Commit publish metadata**

Run:

```bash
git add package.json README.md tests/coverage.test.ts
git commit -m "chore: make package publishable"
```

Expected: commit succeeds.

---

### Task 6: Add Packed Consumer Fixture

**Files:**
- Create: `tests/fixtures/consumer/package.json`
- Create: `tests/fixtures/consumer/index.html`
- Create: `tests/fixtures/consumer/src/App.tsx`
- Create: `tests/fixtures/consumer/src/main.tsx`
- Create: `tests/consumer-package.test.ts`
- Modify: `package.json`
- Modify: `.gitignore`

- [ ] **Step 1: Add consumer fixture files**

Create `tests/fixtures/consumer/package.json`:

```json
{
  "private": true,
  "type": "module",
  "scripts": {
    "build": "vite build"
  },
  "dependencies": {
    "@vitejs/plugin-solid": "npm:vite-plugin-solid@^2.11.12",
    "solid-js": "^1.9.0",
    "vite": "^8.1.0",
    "xel": "file:../../../../../xel",
    "xel-solid": "file:../../../xel-solid-0.0.0.tgz"
  },
  "devDependencies": {}
}
```

Create `tests/fixtures/consumer/index.html`:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>xel-solid packed consumer</title>
    <script type="module" src="/src/main.tsx"></script>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

Create `tests/fixtures/consumer/src/main.tsx`:

```tsx
import { render } from "solid-js/web";
import { App } from "./App";

render(() => <App />, document.getElementById("app")!);
```

Create `tests/fixtures/consumer/src/App.tsx`:

```tsx
import { XButton, XIcon, XLabel } from "xel-solid";
import "xel-solid/register";

export function App() {
  return (
    <main>
      <XButton disabled={false} onToggle={(event) => console.log(event.currentTarget.localName)}>
        <XIcon href="#home" />
        <XLabel>Consumer build</XLabel>
      </XButton>

      <x-button togglable onToggle={(event) => console.log(event.currentTarget.localName)}>
        <x-label>Raw consumer element</x-label>
      </x-button>
    </main>
  );
}
```

- [ ] **Step 2: Add consumer package test**

Create `tests/consumer-package.test.ts`:

```ts
import { expect, test } from "bun:test";
import { copyFileSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = join(import.meta.dir, "..");
const fixture = join(root, "tests/fixtures/consumer");
const tarball = join(root, "xel-solid-0.0.0.tgz");
const fixtureTarball = join(fixture, "xel-solid-0.0.0.tgz");

function run(command: string, args: string[], cwd: string) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    stdio: "pipe",
  });

  if (result.status !== 0) {
    throw new Error([
      `${command} ${args.join(" ")} failed`,
      result.stdout,
      result.stderr,
    ].join("\n"));
  }
}

test("packed package installs and builds in a separate Solid consumer", () => {
  rmSync(join(fixture, "node_modules"), { recursive: true, force: true });
  rmSync(join(fixture, "dist"), { recursive: true, force: true });
  rmSync(join(fixture, "bun.lock"), { force: true });
  rmSync(fixtureTarball, { force: true });

  run("npm", ["pack"], root);
  copyFileSync(tarball, fixtureTarball);
  run("bun", ["install"], fixture);
  run("bun", ["run", "build"], fixture);

  expect(existsSync(join(fixture, "dist/index.html"))).toBe(true);
});
```

- [ ] **Step 3: Ignore consumer fixture generated files**

Add these lines to `.gitignore`:

```gitignore
tests/fixtures/consumer/bun.lock
tests/fixtures/consumer/dist/
tests/fixtures/consumer/node_modules/
tests/fixtures/consumer/xel-solid-*.tgz
```

- [ ] **Step 4: Add consumer test script**

Modify `package.json` scripts:

```json
{
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "clean": "rm -rf dist",
    "test": "bun run ts && bun test tests/coverage.test.ts && bun run test:runtime && bun test tests/consumer-package.test.ts",
    "test:runtime": "playwright test",
    "ts": "tsc -p tsconfig.json --noEmit",
    "prepack": "bun run build"
  }
}
```

- [ ] **Step 5: Run consumer test**

Run:

```bash
bun test tests/consumer-package.test.ts
```

Expected:

```text
1 pass
```

- [ ] **Step 6: Run full tests**

Run:

```bash
bun run test
```

Expected:

```text
6 pass
7 passed
1 pass
```

- [ ] **Step 7: Commit consumer fixture**

Run:

```bash
git add .gitignore package.json tests/consumer-package.test.ts tests/fixtures/consumer
git commit -m "test: verify packed consumer install"
```

Expected: commit succeeds.

---

### Task 7: Final Production Verification

**Files:**
- Generated: `dist/*`
- Generated ignored: `xel-solid-0.0.0.tgz`

- [ ] **Step 1: Run final verification**

Run:

```bash
bun run test
bun run clean
bun run build
npm pack --dry-run
npm pack
tar -tf xel-solid-0.0.0.tgz | sort
git status --short
```

Expected test output includes:

```text
6 pass
7 passed
1 pass
```

Expected tarball output includes:

```text
package/LICENSE
package/README.md
package/dist/components.d.ts
package/dist/events.d.ts
package/dist/index.d.ts
package/dist/index.js
package/dist/jsx.d.ts
package/dist/jsx.js
package/dist/register.d.ts
package/dist/register.js
package/dist/types.d.ts
package/package.json
```

Expected tarball output does not include:

```text
package/src/
package/tests/
package/node_modules/
```

Expected `git status --short` output is empty.

- [ ] **Step 2: Commit any verification metadata changes**

If final verification caused source metadata changes, commit them:

```bash
git add .
git commit -m "chore: finalize production readiness"
```

Expected: commit succeeds or there are no changes to commit.

---

## Self-Review

- Spec coverage: The plan addresses the four identified production gaps: publishability, shipped raw JSX declarations, custom event coverage, and boolean prop coverage. It also adds source coverage audits and a packed consumer fixture.
- Unfinished-marker scan: The plan contains concrete code and commands for every task.
- Type consistency: `XelEventProps`, `xelEventPropToEventName`, `XelBooleanProps`, `XelComponentProps`, and `XelIntrinsicElements` are consistently named across tasks.

