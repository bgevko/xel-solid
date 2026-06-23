# xel-solid 100 Parity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring `xel-solid` to 1:1 practical parity with Xel for Solid consumers: all public Xel APIs remain available, all public Xel elements have Solid wrappers typed to their real element classes, custom event details are typed, and consumer apps can use wrappers and raw elements as drop-in Xel access.

**Architecture:** Keep Xel as the source of truth. `xel-solid` adds a Solid adapter layer with exact element-class imports from `xel`, typed wrapper props, typed raw JSX declarations, and audit tests that compare `xel-solid` exports against Xel’s public barrel.

**Tech Stack:** TypeScript, SolidJS, Xel, Node test runner, Playwright, Vite, Bun scripts, npm pack.

---

## File Structure

- `src/xel.ts`: re-export Xel default, `ftl`, and every public `*Element` class from Xel.
- `src/element-types.ts`: central typed maps from custom element local names and wrapper names to Xel element classes.
- `src/event-types.ts`: event detail types and event prop types for Xel custom events.
- `src/types.ts`: shared wrapper prop types using `XelEventProps<TElement>`.
- `src/components.ts`: wrapper exports typed with exact Xel element classes and named prop aliases.
- `src/jsx.ts`: raw custom element JSX declarations typed with exact Xel element classes.
- `src/index.ts`: public entrypoint for wrappers, Xel API re-exports, JSX types, element maps, and prop aliases.
- `tests/coverage.test.ts`: static API parity tests against `/Users/bgevko/.local/opt/xel/xel.js`.
- `tests/consumer-package.test.ts`: packed consumer build test proving wrapper, raw JSX, `Xel`, `ftl`, and element-class imports work.
- `tests/fixtures/consumer/src/App.tsx`: consumer compile fixture using the public API surface.
- `README.md`: documents 1:1 API access and typed wrapper/raw element usage.

---

### Task 1: Re-Export Xel Public API

**Files:**
- Create: `src/xel.ts`
- Modify: `src/index.ts`
- Modify: `tests/coverage.test.ts`
- Modify: `tests/fixtures/consumer/src/App.tsx`

- [ ] **Step 1: Write failing API parity audit**

Append this test inside `describe("Xel source coverage", ...)` in `tests/coverage.test.ts`:

```ts
  test("re-exports every public non-Solid Xel API from the Xel barrel", () => {
    const xelJs = readXel("xel.js");
    const xelSolidIndex = read("src/index.ts");
    const xelSolidXel = read("src/xel.ts");

    const xelElementExports = [...xelJs.matchAll(/export \{default as (X[A-Za-z0-9]+Element)\} from/g)]
      .map(([, exportName]) => exportName)
      .sort((a, b) => a.localeCompare(b));

    for (const exportName of xelElementExports) {
      assert.equal(xelSolidXel.includes(exportName), true, exportName);
      assert.equal(xelSolidIndex.includes(exportName), true, exportName);
    }

    assert.equal(xelSolidXel.includes("export { default as Xel"), true);
    assert.equal(xelSolidXel.includes("export { ftl }"), true);
    assert.equal(xelSolidIndex.includes("export { ftl, Xel"), true);
  });
```

- [ ] **Step 2: Run the failing audit**

Run:

```bash
node --test tests/coverage.test.ts
```

Expected: fails because `src/xel.ts` does not exist.

- [ ] **Step 3: Create Xel API re-export module**

Create `src/xel.ts`:

```ts
export {
  default as Xel,
  ftl,
  XAccordionElement,
  XAvatarElement,
  XBackdropElement,
  XBoxElement,
  XButtonElement,
  XButtonsElement,
  XCardElement,
  XCheckboxElement,
  XColorInputElement,
  XColorPickerElement,
  XColorSelectElement,
  XContextMenuElement,
  XDocTabElement,
  XDocTabsElement,
  XDrawerElement,
  XIconElement,
  XInputElement,
  XLabelElement,
  XMenuElement,
  XMenubarElement,
  XMenuItemElement,
  XMessageElement,
  XNavElement,
  XNavItemElement,
  XNotificationElement,
  XNumberInputElement,
  XPagerElement,
  XPopoverElement,
  XProgressbarElement,
  XRadioElement,
  XRadiosElement,
  XSelectElement,
  XShortcutElement,
  XSliderElement,
  XStepperElement,
  XSwatchElement,
  XSwitchElement,
  XTabElement,
  XTabsElement,
  XTagElement,
  XTagsElement,
  XTagsInputElement,
  XTextEditorElement,
  XThrobberElement,
  XTitlebarElement,
  XTooltipElement,
} from "xel";
```

- [ ] **Step 4: Export Xel API from main entrypoint**

Add this block to `src/index.ts` after `import "./register";`:

```ts
export {
  ftl,
  Xel,
  XAccordionElement,
  XAvatarElement,
  XBackdropElement,
  XBoxElement,
  XButtonElement,
  XButtonsElement,
  XCardElement,
  XCheckboxElement,
  XColorInputElement,
  XColorPickerElement,
  XColorSelectElement,
  XContextMenuElement,
  XDocTabElement,
  XDocTabsElement,
  XDrawerElement,
  XIconElement,
  XInputElement,
  XLabelElement,
  XMenuElement,
  XMenubarElement,
  XMenuItemElement,
  XMessageElement,
  XNavElement,
  XNavItemElement,
  XNotificationElement,
  XNumberInputElement,
  XPagerElement,
  XPopoverElement,
  XProgressbarElement,
  XRadioElement,
  XRadiosElement,
  XSelectElement,
  XShortcutElement,
  XSliderElement,
  XStepperElement,
  XSwatchElement,
  XSwitchElement,
  XTabElement,
  XTabsElement,
  XTagElement,
  XTagsElement,
  XTagsInputElement,
  XTextEditorElement,
  XThrobberElement,
  XTitlebarElement,
  XTooltipElement,
} from "./xel";
```

- [ ] **Step 5: Prove consumer can import Xel API**

Modify `tests/fixtures/consumer/src/App.tsx` imports:

```tsx
import { ftl, XButton, XButtonElement, XIcon, XLabel, Xel } from "xel-solid";
```

Add these lines at the start of `App()` before `return`:

```tsx
  const buttonClassName: string = XButtonElement.name;
  const xelReady: Promise<void> = Xel.whenThemeReady;
  const template = ftl`consumer.title = Consumer build`;
  void xelReady;
  void template;
```

Add this output inside `<main>`:

```tsx
      <output id="button-class-name">{buttonClassName}</output>
```

- [ ] **Step 6: Run tests**

Run:

```bash
bun run test
```

Expected: all audit, runtime, and packed consumer tests pass.

- [ ] **Step 7: Commit Xel API parity**

Run:

```bash
git add src/xel.ts src/index.ts tests/coverage.test.ts tests/fixtures/consumer/src/App.tsx
git commit -m "feat: re-export xel public api"
```

Expected: commit succeeds.

---

### Task 2: Add Exact Element Class Type Maps

**Files:**
- Create: `src/element-types.ts`
- Modify: `src/components.ts`
- Modify: `src/jsx.ts`
- Modify: `src/index.ts`
- Modify: `tests/coverage.test.ts`

- [ ] **Step 1: Write failing type-map audit**

Append this test inside `describe("Xel source coverage", ...)` in `tests/coverage.test.ts`:

```ts
  test("has exact element class maps for every public wrapper and raw element", () => {
    const xelJs = readXel("xel.js");
    const elementTypesTs = read("src/element-types.ts");
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
      assert.equal(elementTypesTs.includes(`${item.localName}: ${item.elementClassName}`), true, item.localName);
      assert.equal(elementTypesTs.includes(`${item.componentName}: ${item.elementClassName}`), true, item.componentName);
      assert.equal(componentsTs.includes(`Component<${item.elementClassName}>`), true, item.componentName);
      assert.equal(jsxTs.includes(`"${item.localName}": XelComponentProps<${item.elementClassName}>`), true, item.localName);
    }
  });
```

- [ ] **Step 2: Run the failing audit**

Run:

```bash
node --test tests/coverage.test.ts
```

Expected: fails because `src/element-types.ts` does not exist.

- [ ] **Step 3: Create element type map module**

Create `src/element-types.ts`:

```ts
import type {
  XAccordionElement,
  XAvatarElement,
  XBackdropElement,
  XBoxElement,
  XButtonElement,
  XButtonsElement,
  XCardElement,
  XCheckboxElement,
  XColorInputElement,
  XColorPickerElement,
  XColorSelectElement,
  XContextMenuElement,
  XDocTabElement,
  XDocTabsElement,
  XDrawerElement,
  XIconElement,
  XInputElement,
  XLabelElement,
  XMenuElement,
  XMenubarElement,
  XMenuItemElement,
  XMessageElement,
  XNavElement,
  XNavItemElement,
  XNotificationElement,
  XNumberInputElement,
  XPagerElement,
  XPopoverElement,
  XProgressbarElement,
  XRadioElement,
  XRadiosElement,
  XSelectElement,
  XShortcutElement,
  XSliderElement,
  XStepperElement,
  XSwatchElement,
  XSwitchElement,
  XTabElement,
  XTabsElement,
  XTagElement,
  XTagsElement,
  XTagsInputElement,
  XTextEditorElement,
  XThrobberElement,
  XTitlebarElement,
  XTooltipElement,
} from "./xel";

export type XelLocalNameElementMap = {
  "x-accordion": XAccordionElement;
  "x-avatar": XAvatarElement;
  "x-backdrop": XBackdropElement;
  "x-box": XBoxElement;
  "x-button": XButtonElement;
  "x-buttons": XButtonsElement;
  "x-card": XCardElement;
  "x-checkbox": XCheckboxElement;
  "x-colorinput": XColorInputElement;
  "x-colorpicker": XColorPickerElement;
  "x-colorselect": XColorSelectElement;
  "x-contextmenu": XContextMenuElement;
  "x-doctab": XDocTabElement;
  "x-doctabs": XDocTabsElement;
  "x-drawer": XDrawerElement;
  "x-icon": XIconElement;
  "x-input": XInputElement;
  "x-label": XLabelElement;
  "x-menu": XMenuElement;
  "x-menubar": XMenubarElement;
  "x-menuitem": XMenuItemElement;
  "x-message": XMessageElement;
  "x-nav": XNavElement;
  "x-navitem": XNavItemElement;
  "x-notification": XNotificationElement;
  "x-numberinput": XNumberInputElement;
  "x-pager": XPagerElement;
  "x-popover": XPopoverElement;
  "x-progressbar": XProgressbarElement;
  "x-radio": XRadioElement;
  "x-radios": XRadiosElement;
  "x-select": XSelectElement;
  "x-shortcut": XShortcutElement;
  "x-slider": XSliderElement;
  "x-stepper": XStepperElement;
  "x-swatch": XSwatchElement;
  "x-switch": XSwitchElement;
  "x-tab": XTabElement;
  "x-tabs": XTabsElement;
  "x-tag": XTagElement;
  "x-tags": XTagsElement;
  "x-tagsinput": XTagsInputElement;
  "x-texteditor": XTextEditorElement;
  "x-throbber": XThrobberElement;
  "x-titlebar": XTitlebarElement;
  "x-tooltip": XTooltipElement;
};

export type XelComponentElementMap = {
  XAccordion: XAccordionElement;
  XAvatar: XAvatarElement;
  XBackdrop: XBackdropElement;
  XBox: XBoxElement;
  XButton: XButtonElement;
  XButtons: XButtonsElement;
  XCard: XCardElement;
  XCheckbox: XCheckboxElement;
  XColorInput: XColorInputElement;
  XColorPicker: XColorPickerElement;
  XColorSelect: XColorSelectElement;
  XContextMenu: XContextMenuElement;
  XDocTab: XDocTabElement;
  XDocTabs: XDocTabsElement;
  XDrawer: XDrawerElement;
  XIcon: XIconElement;
  XInput: XInputElement;
  XLabel: XLabelElement;
  XMenu: XMenuElement;
  XMenubar: XMenubarElement;
  XMenuItem: XMenuItemElement;
  XMessage: XMessageElement;
  XNav: XNavElement;
  XNavItem: XNavItemElement;
  XNotification: XNotificationElement;
  XNumberInput: XNumberInputElement;
  XPager: XPagerElement;
  XPopover: XPopoverElement;
  XProgressbar: XProgressbarElement;
  XRadio: XRadioElement;
  XRadios: XRadiosElement;
  XSelect: XSelectElement;
  XShortcut: XShortcutElement;
  XSlider: XSliderElement;
  XStepper: XStepperElement;
  XSwatch: XSwatchElement;
  XSwitch: XSwitchElement;
  XTab: XTabElement;
  XTabs: XTabsElement;
  XTag: XTagElement;
  XTags: XTagsElement;
  XTagsInput: XTagsInputElement;
  XTextEditor: XTextEditorElement;
  XThrobber: XThrobberElement;
  XTitlebar: XTitlebarElement;
  XTooltip: XTooltipElement;
};
```

- [ ] **Step 4: Type wrappers with exact element classes**

Modify `src/components.ts`:

1. Add this import after existing type imports:

```ts
import type {
  XAccordionElement,
  XAvatarElement,
  XBackdropElement,
  XBoxElement,
  XButtonElement,
  XButtonsElement,
  XCardElement,
  XCheckboxElement,
  XColorInputElement,
  XColorPickerElement,
  XColorSelectElement,
  XContextMenuElement,
  XDocTabElement,
  XDocTabsElement,
  XDrawerElement,
  XIconElement,
  XInputElement,
  XLabelElement,
  XMenuElement,
  XMenubarElement,
  XMenuItemElement,
  XMessageElement,
  XNavElement,
  XNavItemElement,
  XNotificationElement,
  XNumberInputElement,
  XPagerElement,
  XPopoverElement,
  XProgressbarElement,
  XRadioElement,
  XRadiosElement,
  XSelectElement,
  XShortcutElement,
  XSliderElement,
  XStepperElement,
  XSwatchElement,
  XSwitchElement,
  XTabElement,
  XTabsElement,
  XTagElement,
  XTagsElement,
  XTagsInputElement,
  XTextEditorElement,
  XThrobberElement,
  XTitlebarElement,
  XTooltipElement,
} from "./xel";
```

2. Replace each wrapper declaration with exact element types:

```ts
export const XAccordion: Component<XAccordionElement> = createXelComponent("x-accordion");
export const XAvatar: Component<XAvatarElement> = createXelComponent("x-avatar");
export const XBackdrop: Component<XBackdropElement> = createXelComponent("x-backdrop");
export const XBox: Component<XBoxElement> = createXelComponent("x-box");
export const XButton: Component<XButtonElement> = createXelComponent("x-button");
export const XButtons: Component<XButtonsElement> = createXelComponent("x-buttons");
export const XCard: Component<XCardElement> = createXelComponent("x-card");
export const XCheckbox: Component<XCheckboxElement> = createXelComponent("x-checkbox");
export const XColorInput: Component<XColorInputElement> = createXelComponent("x-colorinput");
export const XColorPicker: Component<XColorPickerElement> = createXelComponent("x-colorpicker");
export const XColorSelect: Component<XColorSelectElement> = createXelComponent("x-colorselect");
export const XContextMenu: Component<XContextMenuElement> = createXelComponent("x-contextmenu");
export const XDocTab: Component<XDocTabElement> = createXelComponent("x-doctab");
export const XDocTabs: Component<XDocTabsElement> = createXelComponent("x-doctabs");
export const XDrawer: Component<XDrawerElement> = createXelComponent("x-drawer");
export const XIcon: Component<XIconElement> = createXelComponent("x-icon");
export const XInput: Component<XInputElement> = createXelComponent("x-input");
export const XLabel: Component<XLabelElement> = createXelComponent("x-label");
export const XMenu: Component<XMenuElement> = createXelComponent("x-menu");
export const XMenubar: Component<XMenubarElement> = createXelComponent("x-menubar");
export const XMenuItem: Component<XMenuItemElement> = createXelComponent("x-menuitem");
export const XMessage: Component<XMessageElement> = createXelComponent("x-message");
export const XNav: Component<XNavElement> = createXelComponent("x-nav");
export const XNavItem: Component<XNavItemElement> = createXelComponent("x-navitem");
export const XNotification: Component<XNotificationElement> = createXelComponent("x-notification");
export const XNumberInput: Component<XNumberInputElement> = createXelComponent("x-numberinput");
export const XPager: Component<XPagerElement> = createXelComponent("x-pager");
export const XPopover: Component<XPopoverElement> = createXelComponent("x-popover");
export const XProgressbar: Component<XProgressbarElement> = createXelComponent("x-progressbar");
export const XRadio: Component<XRadioElement> = createXelComponent("x-radio");
export const XRadios: Component<XRadiosElement> = createXelComponent("x-radios");
export const XSelect: Component<XSelectElement> = createXelComponent("x-select");
export const XShortcut: Component<XShortcutElement> = createXelComponent("x-shortcut");
export const XSlider: Component<XSliderElement> = createXelComponent("x-slider");
export const XStepper: Component<XStepperElement> = createXelComponent("x-stepper");
export const XSwatch: Component<XSwatchElement> = createXelComponent("x-swatch");
export const XSwitch: Component<XSwitchElement> = createXelComponent("x-switch");
export const XTab: Component<XTabElement> = createXelComponent("x-tab");
export const XTabs: Component<XTabsElement> = createXelComponent("x-tabs");
export const XTag: Component<XTagElement> = createXelComponent("x-tag");
export const XTags: Component<XTagsElement> = createXelComponent("x-tags");
export const XTagsInput: Component<XTagsInputElement> = createXelComponent("x-tagsinput");
export const XTextEditor: Component<XTextEditorElement> = createXelComponent("x-texteditor");
export const XThrobber: Component<XThrobberElement> = createXelComponent("x-throbber");
export const XTitlebar: Component<XTitlebarElement> = createXelComponent("x-titlebar");
export const XTooltip: Component<XTooltipElement> = createXelComponent("x-tooltip");
```

- [ ] **Step 5: Type raw JSX declarations with exact element classes**

Replace `src/jsx.ts` with this complete content:

```ts
import type { JSX } from "solid-js";
import type { XelComponentProps } from "./types";
import type {
  XAccordionElement,
  XAvatarElement,
  XBackdropElement,
  XBoxElement,
  XButtonElement,
  XButtonsElement,
  XCardElement,
  XCheckboxElement,
  XColorInputElement,
  XColorPickerElement,
  XColorSelectElement,
  XContextMenuElement,
  XDocTabElement,
  XDocTabsElement,
  XDrawerElement,
  XIconElement,
  XInputElement,
  XLabelElement,
  XMenuElement,
  XMenubarElement,
  XMenuItemElement,
  XMessageElement,
  XNavElement,
  XNavItemElement,
  XNotificationElement,
  XNumberInputElement,
  XPagerElement,
  XPopoverElement,
  XProgressbarElement,
  XRadioElement,
  XRadiosElement,
  XSelectElement,
  XShortcutElement,
  XSliderElement,
  XStepperElement,
  XSwatchElement,
  XSwitchElement,
  XTabElement,
  XTabsElement,
  XTagElement,
  XTagsElement,
  XTagsInputElement,
  XTextEditorElement,
  XThrobberElement,
  XTitlebarElement,
  XTooltipElement,
} from "./xel";

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "x-accordion": XelComponentProps<XAccordionElement>;
      "x-avatar": XelComponentProps<XAvatarElement>;
      "x-backdrop": XelComponentProps<XBackdropElement>;
      "x-box": XelComponentProps<XBoxElement>;
      "x-button": XelComponentProps<XButtonElement>;
      "x-buttons": XelComponentProps<XButtonsElement>;
      "x-card": XelComponentProps<XCardElement>;
      "x-checkbox": XelComponentProps<XCheckboxElement>;
      "x-colorinput": XelComponentProps<XColorInputElement>;
      "x-colorpicker": XelComponentProps<XColorPickerElement>;
      "x-colorselect": XelComponentProps<XColorSelectElement>;
      "x-contextmenu": XelComponentProps<XContextMenuElement>;
      "x-doctab": XelComponentProps<XDocTabElement>;
      "x-doctabs": XelComponentProps<XDocTabsElement>;
      "x-drawer": XelComponentProps<XDrawerElement>;
      "x-icon": XelComponentProps<XIconElement>;
      "x-input": XelComponentProps<XInputElement>;
      "x-label": XelComponentProps<XLabelElement>;
      "x-menu": XelComponentProps<XMenuElement>;
      "x-menubar": XelComponentProps<XMenubarElement>;
      "x-menuitem": XelComponentProps<XMenuItemElement>;
      "x-message": XelComponentProps<XMessageElement>;
      "x-nav": XelComponentProps<XNavElement>;
      "x-navitem": XelComponentProps<XNavItemElement>;
      "x-notification": XelComponentProps<XNotificationElement>;
      "x-numberinput": XelComponentProps<XNumberInputElement>;
      "x-pager": XelComponentProps<XPagerElement>;
      "x-popover": XelComponentProps<XPopoverElement>;
      "x-progressbar": XelComponentProps<XProgressbarElement>;
      "x-radio": XelComponentProps<XRadioElement>;
      "x-radios": XelComponentProps<XRadiosElement>;
      "x-select": XelComponentProps<XSelectElement>;
      "x-shortcut": XelComponentProps<XShortcutElement>;
      "x-slider": XelComponentProps<XSliderElement>;
      "x-stepper": XelComponentProps<XStepperElement>;
      "x-swatch": XelComponentProps<XSwatchElement>;
      "x-switch": XelComponentProps<XSwitchElement>;
      "x-tab": XelComponentProps<XTabElement>;
      "x-tabs": XelComponentProps<XTabsElement>;
      "x-tag": XelComponentProps<XTagElement>;
      "x-tags": XelComponentProps<XTagsElement>;
      "x-tagsinput": XelComponentProps<XTagsInputElement>;
      "x-texteditor": XelComponentProps<XTextEditorElement>;
      "x-throbber": XelComponentProps<XThrobberElement>;
      "x-titlebar": XelComponentProps<XTitlebarElement>;
      "x-tooltip": XelComponentProps<XTooltipElement>;
    }
  }
}

export type XelIntrinsicElements = JSX.IntrinsicElements;
```

- [ ] **Step 6: Export element type maps**

Add this line to `src/index.ts`:

```ts
export type { XelComponentElementMap, XelLocalNameElementMap } from "./element-types";
```

- [ ] **Step 7: Run tests**

Run:

```bash
bun run test
```

Expected: all tests pass.

- [ ] **Step 8: Commit exact element typing**

Run:

```bash
git add src/element-types.ts src/components.ts src/jsx.ts src/index.ts tests/coverage.test.ts
git commit -m "feat: type wrappers with xel element classes"
```

Expected: commit succeeds.

---

### Task 3: Add Component-Specific Prop Aliases

**Files:**
- Create: `src/component-props.ts`
- Modify: `src/components.ts`
- Modify: `src/index.ts`
- Modify: `tests/coverage.test.ts`

- [ ] **Step 1: Write failing prop alias audit**

Append this test inside `describe("Xel source coverage", ...)` in `tests/coverage.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the failing audit**

Run:

```bash
node --test tests/coverage.test.ts
```

Expected: fails because `src/component-props.ts` does not exist.

- [ ] **Step 3: Create component prop alias module**

Create `src/component-props.ts`:

```ts
import type { XelComponentProps } from "./types";
import type {
  XelComponentElementMap,
} from "./element-types";

export type XAccordionProps = XelComponentProps<XelComponentElementMap["XAccordion"]>;
export type XAvatarProps = XelComponentProps<XelComponentElementMap["XAvatar"]>;
export type XBackdropProps = XelComponentProps<XelComponentElementMap["XBackdrop"]>;
export type XBoxProps = XelComponentProps<XelComponentElementMap["XBox"]>;
export type XButtonProps = XelComponentProps<XelComponentElementMap["XButton"]>;
export type XButtonsProps = XelComponentProps<XelComponentElementMap["XButtons"]>;
export type XCardProps = XelComponentProps<XelComponentElementMap["XCard"]>;
export type XCheckboxProps = XelComponentProps<XelComponentElementMap["XCheckbox"]>;
export type XColorInputProps = XelComponentProps<XelComponentElementMap["XColorInput"]>;
export type XColorPickerProps = XelComponentProps<XelComponentElementMap["XColorPicker"]>;
export type XColorSelectProps = XelComponentProps<XelComponentElementMap["XColorSelect"]>;
export type XContextMenuProps = XelComponentProps<XelComponentElementMap["XContextMenu"]>;
export type XDocTabProps = XelComponentProps<XelComponentElementMap["XDocTab"]>;
export type XDocTabsProps = XelComponentProps<XelComponentElementMap["XDocTabs"]>;
export type XDrawerProps = XelComponentProps<XelComponentElementMap["XDrawer"]>;
export type XIconProps = XelComponentProps<XelComponentElementMap["XIcon"]>;
export type XInputProps = XelComponentProps<XelComponentElementMap["XInput"]>;
export type XLabelProps = XelComponentProps<XelComponentElementMap["XLabel"]>;
export type XMenuProps = XelComponentProps<XelComponentElementMap["XMenu"]>;
export type XMenubarProps = XelComponentProps<XelComponentElementMap["XMenubar"]>;
export type XMenuItemProps = XelComponentProps<XelComponentElementMap["XMenuItem"]>;
export type XMessageProps = XelComponentProps<XelComponentElementMap["XMessage"]>;
export type XNavProps = XelComponentProps<XelComponentElementMap["XNav"]>;
export type XNavItemProps = XelComponentProps<XelComponentElementMap["XNavItem"]>;
export type XNotificationProps = XelComponentProps<XelComponentElementMap["XNotification"]>;
export type XNumberInputProps = XelComponentProps<XelComponentElementMap["XNumberInput"]>;
export type XPagerProps = XelComponentProps<XelComponentElementMap["XPager"]>;
export type XPopoverProps = XelComponentProps<XelComponentElementMap["XPopover"]>;
export type XProgressbarProps = XelComponentProps<XelComponentElementMap["XProgressbar"]>;
export type XRadioProps = XelComponentProps<XelComponentElementMap["XRadio"]>;
export type XRadiosProps = XelComponentProps<XelComponentElementMap["XRadios"]>;
export type XSelectProps = XelComponentProps<XelComponentElementMap["XSelect"]>;
export type XShortcutProps = XelComponentProps<XelComponentElementMap["XShortcut"]>;
export type XSliderProps = XelComponentProps<XelComponentElementMap["XSlider"]>;
export type XStepperProps = XelComponentProps<XelComponentElementMap["XStepper"]>;
export type XSwatchProps = XelComponentProps<XelComponentElementMap["XSwatch"]>;
export type XSwitchProps = XelComponentProps<XelComponentElementMap["XSwitch"]>;
export type XTabProps = XelComponentProps<XelComponentElementMap["XTab"]>;
export type XTabsProps = XelComponentProps<XelComponentElementMap["XTabs"]>;
export type XTagProps = XelComponentProps<XelComponentElementMap["XTag"]>;
export type XTagsProps = XelComponentProps<XelComponentElementMap["XTags"]>;
export type XTagsInputProps = XelComponentProps<XelComponentElementMap["XTagsInput"]>;
export type XTextEditorProps = XelComponentProps<XelComponentElementMap["XTextEditor"]>;
export type XThrobberProps = XelComponentProps<XelComponentElementMap["XThrobber"]>;
export type XTitlebarProps = XelComponentProps<XelComponentElementMap["XTitlebar"]>;
export type XTooltipProps = XelComponentProps<XelComponentElementMap["XTooltip"]>;
```

- [ ] **Step 4: Use prop aliases in component declarations**

Modify `src/components.ts`:

1. Add:

```ts
import type {
  XAccordionProps,
  XAvatarProps,
  XBackdropProps,
  XBoxProps,
  XButtonProps,
  XButtonsProps,
  XCardProps,
  XCheckboxProps,
  XColorInputProps,
  XColorPickerProps,
  XColorSelectProps,
  XContextMenuProps,
  XDocTabProps,
  XDocTabsProps,
  XDrawerProps,
  XIconProps,
  XInputProps,
  XLabelProps,
  XMenuProps,
  XMenubarProps,
  XMenuItemProps,
  XMessageProps,
  XNavProps,
  XNavItemProps,
  XNotificationProps,
  XNumberInputProps,
  XPagerProps,
  XPopoverProps,
  XProgressbarProps,
  XRadioProps,
  XRadiosProps,
  XSelectProps,
  XShortcutProps,
  XSliderProps,
  XStepperProps,
  XSwatchProps,
  XSwitchProps,
  XTabProps,
  XTabsProps,
  XTagProps,
  XTagsProps,
  XTagsInputProps,
  XTextEditorProps,
  XThrobberProps,
  XTitlebarProps,
  XTooltipProps,
} from "./component-props";
```

2. Replace the generic component type helper with:

```ts
type Component<TProps> = (props: TProps) => JSX.Element;
```

3. Replace every wrapper declaration with prop aliases:

```ts
export const XAccordion: Component<XAccordionProps> = createXelComponent("x-accordion");
export const XAvatar: Component<XAvatarProps> = createXelComponent("x-avatar");
export const XBackdrop: Component<XBackdropProps> = createXelComponent("x-backdrop");
export const XBox: Component<XBoxProps> = createXelComponent("x-box");
export const XButton: Component<XButtonProps> = createXelComponent("x-button");
export const XButtons: Component<XButtonsProps> = createXelComponent("x-buttons");
export const XCard: Component<XCardProps> = createXelComponent("x-card");
export const XCheckbox: Component<XCheckboxProps> = createXelComponent("x-checkbox");
export const XColorInput: Component<XColorInputProps> = createXelComponent("x-colorinput");
export const XColorPicker: Component<XColorPickerProps> = createXelComponent("x-colorpicker");
export const XColorSelect: Component<XColorSelectProps> = createXelComponent("x-colorselect");
export const XContextMenu: Component<XContextMenuProps> = createXelComponent("x-contextmenu");
export const XDocTab: Component<XDocTabProps> = createXelComponent("x-doctab");
export const XDocTabs: Component<XDocTabsProps> = createXelComponent("x-doctabs");
export const XDrawer: Component<XDrawerProps> = createXelComponent("x-drawer");
export const XIcon: Component<XIconProps> = createXelComponent("x-icon");
export const XInput: Component<XInputProps> = createXelComponent("x-input");
export const XLabel: Component<XLabelProps> = createXelComponent("x-label");
export const XMenu: Component<XMenuProps> = createXelComponent("x-menu");
export const XMenubar: Component<XMenubarProps> = createXelComponent("x-menubar");
export const XMenuItem: Component<XMenuItemProps> = createXelComponent("x-menuitem");
export const XMessage: Component<XMessageProps> = createXelComponent("x-message");
export const XNav: Component<XNavProps> = createXelComponent("x-nav");
export const XNavItem: Component<XNavItemProps> = createXelComponent("x-navitem");
export const XNotification: Component<XNotificationProps> = createXelComponent("x-notification");
export const XNumberInput: Component<XNumberInputProps> = createXelComponent("x-numberinput");
export const XPager: Component<XPagerProps> = createXelComponent("x-pager");
export const XPopover: Component<XPopoverProps> = createXelComponent("x-popover");
export const XProgressbar: Component<XProgressbarProps> = createXelComponent("x-progressbar");
export const XRadio: Component<XRadioProps> = createXelComponent("x-radio");
export const XRadios: Component<XRadiosProps> = createXelComponent("x-radios");
export const XSelect: Component<XSelectProps> = createXelComponent("x-select");
export const XShortcut: Component<XShortcutProps> = createXelComponent("x-shortcut");
export const XSlider: Component<XSliderProps> = createXelComponent("x-slider");
export const XStepper: Component<XStepperProps> = createXelComponent("x-stepper");
export const XSwatch: Component<XSwatchProps> = createXelComponent("x-swatch");
export const XSwitch: Component<XSwitchProps> = createXelComponent("x-switch");
export const XTab: Component<XTabProps> = createXelComponent("x-tab");
export const XTabs: Component<XTabsProps> = createXelComponent("x-tabs");
export const XTag: Component<XTagProps> = createXelComponent("x-tag");
export const XTags: Component<XTagsProps> = createXelComponent("x-tags");
export const XTagsInput: Component<XTagsInputProps> = createXelComponent("x-tagsinput");
export const XTextEditor: Component<XTextEditorProps> = createXelComponent("x-texteditor");
export const XThrobber: Component<XThrobberProps> = createXelComponent("x-throbber");
export const XTitlebar: Component<XTitlebarProps> = createXelComponent("x-titlebar");
export const XTooltip: Component<XTooltipProps> = createXelComponent("x-tooltip");
```

- [ ] **Step 5: Export prop aliases**

Add this to `src/index.ts`:

```ts
export type {
  XAccordionProps,
  XAvatarProps,
  XBackdropProps,
  XBoxProps,
  XButtonProps,
  XButtonsProps,
  XCardProps,
  XCheckboxProps,
  XColorInputProps,
  XColorPickerProps,
  XColorSelectProps,
  XContextMenuProps,
  XDocTabProps,
  XDocTabsProps,
  XDrawerProps,
  XIconProps,
  XInputProps,
  XLabelProps,
  XMenuProps,
  XMenubarProps,
  XMenuItemProps,
  XMessageProps,
  XNavProps,
  XNavItemProps,
  XNotificationProps,
  XNumberInputProps,
  XPagerProps,
  XPopoverProps,
  XProgressbarProps,
  XRadioProps,
  XRadiosProps,
  XSelectProps,
  XShortcutProps,
  XSliderProps,
  XStepperProps,
  XSwatchProps,
  XSwitchProps,
  XTabProps,
  XTabsProps,
  XTagProps,
  XTagsProps,
  XTagsInputProps,
  XTextEditorProps,
  XThrobberProps,
  XTitlebarProps,
  XTooltipProps,
} from "./component-props";
```

- [ ] **Step 6: Run tests**

Run:

```bash
bun run test
```

Expected: all tests pass.

- [ ] **Step 7: Commit prop alias coverage**

Run:

```bash
git add src/component-props.ts src/components.ts src/index.ts tests/coverage.test.ts
git commit -m "feat: export component prop aliases"
```

Expected: commit succeeds.

---

### Task 4: Add Typed Event Detail Maps

**Files:**
- Modify: `src/event-types.ts`
- Modify: `src/types.ts`
- Modify: `src/index.ts`
- Modify: `tests/coverage.test.ts`
- Modify: `tests/fixtures/consumer/src/App.tsx`

- [ ] **Step 1: Write failing event detail audit**

Append this test inside `describe("Xel source coverage", ...)` in `tests/coverage.test.ts`:

```ts
  test("exports typed event detail maps for all supported custom events", () => {
    const eventTypesTs = read("src/event-types.ts");
    const eventsTs = read("src/events.ts");
    const typesTs = read("src/types.ts");

    const eventNames = [...eventsTs.matchAll(/: "([^"]+)"/g)].map(([, eventName]) => eventName);

    for (const eventName of eventNames) {
      assert.equal(eventTypesTs.includes(`${eventName}:`), true, eventName);
    }

    assert.equal(typesTs.includes("XelEventDetailMap"), true);
    assert.equal(typesTs.includes("XelTypedCustomEvent"), true);
  });
```

- [ ] **Step 2: Run the failing audit**

Run:

```bash
node --test tests/coverage.test.ts
```

Expected: fails because `src/event-types.ts` does not exist.

- [ ] **Step 3: Create typed event detail map**

Create `src/event-types.ts`:

```ts
export type XelEventDetailMap = {
  add: HTMLElement;
  beforetoggle: undefined;
  beforevalidate: undefined;
  buttonclick: string | null;
  change: { oldValue?: string | null; newValue?: string | null } | undefined;
  changeend: boolean | undefined;
  changestart: undefined;
  close: HTMLElement | undefined;
  collapse: undefined;
  decrement: { shiftKey: boolean };
  decrementend: undefined;
  decrementstart: undefined;
  expand: undefined;
  increment: { shiftKey: boolean };
  incrementend: undefined;
  incrementstart: undefined;
  input: undefined;
  open: HTMLElement | undefined;
  pin: HTMLElement;
  rearrange: undefined;
  remove: HTMLElement | undefined;
  select: HTMLElement | undefined;
  textinputmodeend: undefined;
  textinputmodestart: undefined;
  toggle: HTMLElement | undefined;
  userclose: undefined;
};

export type XelEventName = keyof XelEventDetailMap;

export type XelTypedCustomEvent<TName extends XelEventName> = CustomEvent<XelEventDetailMap[TName]>;
```

- [ ] **Step 4: Use typed custom events in prop types**

Modify `src/types.ts`:

1. Add:

```ts
import type { XelEventDetailMap, XelEventName, XelTypedCustomEvent } from "./event-types";
```

2. Replace `XelEventProps` with:

```ts
export type XelEventProps<TElement extends HTMLElement = HTMLElement> = {
  onAdd?: XelEventHandler<TElement, XelTypedCustomEvent<"add">>;
  onBeforeToggle?: XelEventHandler<TElement, XelTypedCustomEvent<"beforetoggle">>;
  onBeforeValidate?: XelEventHandler<TElement, XelTypedCustomEvent<"beforevalidate">>;
  onButtonClick?: XelEventHandler<TElement, XelTypedCustomEvent<"buttonclick">>;
  onChange?: XelEventHandler<TElement, XelTypedCustomEvent<"change">>;
  onChangeEnd?: XelEventHandler<TElement, XelTypedCustomEvent<"changeend">>;
  onChangeStart?: XelEventHandler<TElement, XelTypedCustomEvent<"changestart">>;
  onClose?: XelEventHandler<TElement, XelTypedCustomEvent<"close">>;
  onCollapse?: XelEventHandler<TElement, XelTypedCustomEvent<"collapse">>;
  onDecrement?: XelEventHandler<TElement, XelTypedCustomEvent<"decrement">>;
  onDecrementEnd?: XelEventHandler<TElement, XelTypedCustomEvent<"decrementend">>;
  onDecrementStart?: XelEventHandler<TElement, XelTypedCustomEvent<"decrementstart">>;
  onExpand?: XelEventHandler<TElement, XelTypedCustomEvent<"expand">>;
  onIncrement?: XelEventHandler<TElement, XelTypedCustomEvent<"increment">>;
  onIncrementEnd?: XelEventHandler<TElement, XelTypedCustomEvent<"incrementend">>;
  onIncrementStart?: XelEventHandler<TElement, XelTypedCustomEvent<"incrementstart">>;
  onInput?: XelEventHandler<TElement, XelTypedCustomEvent<"input">>;
  onOpen?: XelEventHandler<TElement, XelTypedCustomEvent<"open">>;
  onPin?: XelEventHandler<TElement, XelTypedCustomEvent<"pin">>;
  onRearrange?: XelEventHandler<TElement, XelTypedCustomEvent<"rearrange">>;
  onRemove?: XelEventHandler<TElement, XelTypedCustomEvent<"remove">>;
  onSelect?: XelEventHandler<TElement, XelTypedCustomEvent<"select">>;
  onTextInputModeEnd?: XelEventHandler<TElement, XelTypedCustomEvent<"textinputmodeend">>;
  onTextInputModeStart?: XelEventHandler<TElement, XelTypedCustomEvent<"textinputmodestart">>;
  onToggle?: XelEventHandler<TElement, XelTypedCustomEvent<"toggle">>;
  onUserClose?: XelEventHandler<TElement, XelTypedCustomEvent<"userclose">>;
};
```

3. Add this export near `XelCustomEvent`:

```ts
export type { XelEventDetailMap, XelEventName, XelTypedCustomEvent };
```

- [ ] **Step 5: Export event detail types from entrypoint**

Modify `src/index.ts` type export from `./types` to include:

```ts
export type {
  XelComponentProps,
  XelCustomEvent,
  XelEventDetailMap,
  XelEventName,
  XelTypedCustomEvent,
} from "./types";
```

- [ ] **Step 6: Prove consumer can use event detail types**

Modify the first `<XButton>` in `tests/fixtures/consumer/src/App.tsx`:

```tsx
      <XButton
        disabled={false}
        onToggle={(event) => {
          const detail: HTMLElement | undefined = event.detail;
          console.log(event.currentTarget.localName, detail?.localName);
        }}
      >
```

Add this import:

```tsx
import type { XelEventDetailMap } from "xel-solid";
```

Add this line inside `App()` before `return`:

```tsx
  const toggleDetail: XelEventDetailMap["toggle"] = undefined;
  void toggleDetail;
```

- [ ] **Step 7: Run tests**

Run:

```bash
bun run test
```

Expected: all tests pass.

- [ ] **Step 8: Commit typed event details**

Run:

```bash
git add src/event-types.ts src/types.ts src/index.ts tests/coverage.test.ts tests/fixtures/consumer/src/App.tsx
git commit -m "feat: type xel custom event details"
```

Expected: commit succeeds.

---

### Task 5: Add Native-Like Property Convenience Props

**Files:**
- Modify: `src/types.ts`
- Modify: `src/createXelComponent.ts`
- Modify: `tests/fixtures/wrapper-app.tsx`
- Modify: `tests/wrapper-runtime.test.ts`
- Modify: `tests/fixtures/consumer/src/App.tsx`
- Modify: `README.md`

- [ ] **Step 1: Add property prop namespace**

Modify `src/types.ts`:

1. Add:

```ts
export type XelPropertyProps<TElement extends HTMLElement = HTMLElement> = {
  prop?: Partial<TElement> & Record<string, unknown>;
};
```

2. Modify `XelComponentProps` final block:

```ts
    XelEventProps<TElement> &
    XelPropertyProps<TElement> & {
      children?: JSX.Element;
      properties?: Partial<TElement> & Record<string, unknown>;
    };
```

This keeps existing `properties` compatibility and adds a shorter `prop` alias.

- [ ] **Step 2: Assign both `prop` and `properties`**

Modify `src/createXelComponent.ts`:

1. Change the local split list:

```ts
["children", "prop", "properties", "ref"],
```

2. In the render effect, replace:

```ts
const properties = local.properties;
```

with:

```ts
const properties = { ...local.properties, ...local.prop };
```

3. In the ref callback, replace:

```ts
assignProperties(node, local.properties);
```

with:

```ts
assignProperties(node, { ...local.properties, ...local.prop });
```

- [ ] **Step 3: Add runtime test for `prop` alias**

Modify `tests/fixtures/wrapper-app.tsx`: add after `property-input`:

```tsx
      <XInput id="prop-input" prop={{ value: "from-prop" } as Partial<HTMLElement> & { value: string }} />
```

Append this test to `tests/wrapper-runtime.test.ts`:

```ts
test("assigns rich values through the prop alias", async ({ page }) => {
  await page.goto("/tests/fixtures/wrapper-app.html");

  await expect(page.locator("x-input#prop-input")).toHaveJSProperty("value", "from-prop");
});
```

- [ ] **Step 4: Prove consumer can use `prop`**

In `tests/fixtures/consumer/src/App.tsx`, add after the first `<XButton>`:

```tsx
      <XLabel prop={{ value: "consumer-label" } as Partial<HTMLElement> & { value: string }}>
        Property alias
      </XLabel>
```

- [ ] **Step 5: Document the property alias**

In `README.md`, replace the “Rich Properties” example with:

```md
## Rich Properties

Use `prop` when a custom element property needs an object, array, or non-attribute value:

```tsx
import { XInput } from "xel-solid";

export function NamedInput() {
  return <XInput prop={{ value: "Ada" }} />;
}
```

The older `properties` prop is also supported for compatibility.
```

- [ ] **Step 6: Run tests**

Run:

```bash
bun run test
```

Expected: all tests pass.

- [ ] **Step 7: Commit prop convenience**

Run:

```bash
git add src/types.ts src/createXelComponent.ts tests/fixtures/wrapper-app.tsx tests/wrapper-runtime.test.ts tests/fixtures/consumer/src/App.tsx README.md
git commit -m "feat: add custom element prop alias"
```

Expected: commit succeeds.

---

### Task 6: Final 100-Parity Verification

**Files:**
- Generated: `dist/*`
- Generated ignored: `xel-solid-0.0.0.tgz`

- [ ] **Step 1: Run final full verification**

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

Expected test output includes all of:

```text
Xel source coverage
packed package installs and builds in a separate Solid consumer
8 passed
```

Expected tarball output includes:

```text
package/dist/component-props.d.ts
package/dist/element-types.d.ts
package/dist/event-types.d.ts
package/dist/index.d.ts
package/dist/jsx.d.ts
package/dist/xel.d.ts
```

Expected `git status --short` output is empty.

- [ ] **Step 2: Commit final metadata if needed**

If final verification causes source changes, commit them:

```bash
git add .
git commit -m "chore: finalize xel parity"
```

Expected: either commit succeeds or there are no changes to commit.

---

## Self-Review

- Spec coverage: This plan addresses all remaining 82/100 gaps: Xel default/`ftl`/element class re-exports, exact element class typing, component prop aliases, typed custom event details, and a more native property assignment alias.
- Unfinished-marker scan: The plan contains concrete code and commands for every task.
- Type consistency: `XelLocalNameElementMap`, `XelComponentElementMap`, `XelEventDetailMap`, `XelTypedCustomEvent`, `XelComponentProps`, and component prop aliases are consistently named across tasks.
