import type { StorybookConfig } from "storybook-solidjs-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: "storybook-solidjs-vite",
  staticDirs: [
    { from: "../node_modules/xel/themes", to: "/themes" },
    { from: "../node_modules/xel/icons", to: "/icons" },
  ],
  viteFinal: async (config) => {
    config.plugins ??= [];
    config.plugins.push(tailwindcss());
    return config;
  },
};

export default config;
