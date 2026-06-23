import type { StorybookConfig } from "storybook-solidjs-vite";

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: "storybook-solidjs-vite",
  staticDirs: [
    { from: "../node_modules/xel/themes", to: "/themes" },
    { from: "../node_modules/xel/icons", to: "/icons" },
    { from: "../node_modules/xel/locales", to: "/locales" },
  ],
  docs: {
    autodocs: true,
  },
};

export default config;
