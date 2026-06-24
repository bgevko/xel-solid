# xel-solid

SolidJS bindings for [Xel](https://xel-toolkit.org/) Web Components.

## Install

```sh
bun add solid-js xel xel-solid
```

`solid-js` and `xel` are peer dependencies. Install them in each app that consumes `xel-solid`.

## Usage

```tsx
import { XButton, XLabel } from "xel-solid";

export function SaveButton() {
  return (
    <XButton onClick={() => console.log("save")}>
      <XLabel>Save</XLabel>
    </XButton>
  );
}
```
