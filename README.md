# xel-solid

SolidJS bindings for [Xel](https://xel-toolkit.org/) Web Components.

## Install

```sh
bun add solid-js xel xel-solid
```

`solid-js` and `xel` are peer dependencies. Install them in each app that consumes `xel-solid`.

## Solid App Setup

For Vite apps, add the asset plugin so Xel can fetch its runtime theme and icon files in dev and production builds:

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
    <XelProvider theme="material" accentColor="blue" icons={["material"]}>
      <XButton>
        <XLabel>Greet</XLabel>
      </XButton>
    </XelProvider>
  );
}
```
