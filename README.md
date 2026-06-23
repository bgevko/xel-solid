# xel-solid

SolidJS bindings for [Xel](https://xel-toolkit.org/) Web Components.

`xel-solid` keeps Xel as the source of truth. The exported Solid components are thin adapters that render Xel custom elements, normalize common boolean props, bind common custom events, forward refs, and provide a property escape hatch for rich custom-element values.

## Install

```sh
bun add solid-js xel xel-solid
```

`solid-js` and `xel` are peer dependencies. Install them in each app that consumes `xel-solid`.

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
