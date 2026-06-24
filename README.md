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

`XelProvider` uses Xel's public setup API under the hood. App code should not call `Xel.themeStyleSheet.replaceSync()` directly.

## Non-Vite Apps

If your app does not use Vite, serve these Xel package folders at the same public base URL and pass that base URL to the provider:

- `node_modules/xel/themes`
- `node_modules/xel/icons`

```tsx
<XelProvider theme="material" icons={["material"]} assetBaseUrl="/vendor/xel">
  <App />
</XelProvider>
```

Locales are opt-in because the published `xel` package does not currently ship locale files. If your app serves Fluent `.ftl` files, pass their URLs with `locales={["/locales/en.ftl"]}`.

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
