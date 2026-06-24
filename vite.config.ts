import { createReadStream, existsSync } from "node:fs";
import { join } from "node:path";
import solid from "vite-plugin-solid";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      name: "xel-solid-test-consumer-assets",
      configureServer(server) {
        server.middlewares.use("/tests/fixtures/consumer/dist/xel", (request, response, next) => {
          const requestPath = decodeURIComponent((request.url ?? "").split("?")[0].replace(/^\/+/, ""));
          const filePath = join(import.meta.dirname, "tests/fixtures/consumer/dist/xel", requestPath);

          if (!existsSync(filePath)) {
            next();
            return;
          }

          if (filePath.endsWith(".css")) {
            response.setHeader("Content-Type", "text/css; charset=utf-8");
          }
          else if (filePath.endsWith(".svg")) {
            response.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
          }

          createReadStream(filePath).pipe(response);
        });
      },
    },
    solid(),
  ],
  server: {
    host: "127.0.0.1",
    port: 5179,
    strictPort: true,
  },
});
