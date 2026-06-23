import solid from "vite-plugin-solid";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [solid()],
  server: {
    host: "127.0.0.1",
    port: 5179,
    strictPort: true,
  },
});

