# xel-solid

SolidJS bindings for Xel Web Components.

This package keeps Xel as the source of truth. The Solid components are thin adapters that render the underlying custom elements and give app code a framework-native import surface.

## Usage

```tsx
import { XButton, XIcon, XLabel } from "xel-solid";

export function SaveButton() {
  return (
    <XButton onClick={() => console.log("save")}>
      <XIcon href="#save" />
      <XLabel>Save</XLabel>
    </XButton>
  );
}
```

For raw custom-element usage, import the registration side effect:

```ts
import "xel-solid/register";
```

## Development

```sh
npm install
npm run build
```

