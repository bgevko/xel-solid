import solid from "vite-plugin-solid";
import { defineConfig } from "vite";
import { xelSolidVitePlugin } from "xel-solid/vite";

export default defineConfig({
  plugins: [xelSolidVitePlugin(), solid()],
});
