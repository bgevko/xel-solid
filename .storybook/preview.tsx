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
        items: [...themeItems],
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
