import { createReadStream, existsSync } from "node:fs";
import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";

export type XelSolidVitePluginOptions = {
  publicPath?: string;
  assets?: {
    themes?: readonly string[];
    icons?: readonly string[];
    locales?: readonly string[];
  };
};

const defaultAssets = {
  themes: [
    "base.css",
    "adwaita.css",
    "adwaita-dark.css",
    "cupertino.css",
    "cupertino-dark.css",
    "fluent.css",
    "fluent-dark.css",
    "material.css",
    "material-dark.css",
  ],
  icons: ["fluent.svg", "fluent-outlined.svg", "material.svg", "material-outlined.svg", "portal.svg"],
  locales: ["en.ftl", "pl.ftl"],
} as const;

function resolveXelRoot() {
  return dirname(fileURLToPath(import.meta.resolve("xel/package.json")));
}

function normalizePublicPath(publicPath: string) {
  const path = publicPath.startsWith("/") ? publicPath : `/${publicPath}`;
  return path.replace(/\/+$/, "");
}

function outputPublicPath(publicPath: string) {
  return publicPath.replace(/^\/+/, "");
}

export function xelSolidVitePlugin(options: XelSolidVitePluginOptions = {}): Plugin {
  const publicPath = normalizePublicPath(options.publicPath ?? "/xel");
  const xelRoot = resolveXelRoot();
  const assets = {
    themes: options.assets?.themes ?? defaultAssets.themes,
    icons: options.assets?.icons ?? defaultAssets.icons,
    locales: options.assets?.locales ?? defaultAssets.locales,
  };

  return {
    name: "xel-solid-assets",
    configureServer(server) {
      server.middlewares.use(publicPath, (request, response, next) => {
        const requestPath = decodeURIComponent((request.url ?? "").split("?")[0].replace(/^\/+/, ""));
        const filePath = join(xelRoot, requestPath);

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
        else if (filePath.endsWith(".ftl")) {
          response.setHeader("Content-Type", "text/plain; charset=utf-8");
        }

        response.setHeader("Cache-Control", "no-cache");
        createReadStream(filePath).pipe(response);
      });
    },
    async writeBundle(outputOptions) {
      const outDir = outputOptions.dir;

      if (!outDir) {
        return;
      }

      for (const [kind, fileNames] of Object.entries(assets) as [keyof typeof assets, readonly string[]][]) {
        for (const fileName of fileNames) {
          const from = join(xelRoot, kind, fileName);
          const to = join(outDir, outputPublicPath(publicPath), kind, fileName);
          await mkdir(dirname(to), { recursive: true });
          await copyFile(from, to);
        }
      }
    },
  };
}
