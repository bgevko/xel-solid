import { createEffect, onCleanup, type JSX } from "solid-js";
import { Xel } from "./xel.js";

export const xelThemes = [
  "adwaita",
  "adwaita-dark",
  "cupertino",
  "cupertino-dark",
  "fluent",
  "fluent-dark",
  "material",
  "material-dark",
] as const;

export const xelIconSets = [
  "fluent",
  "fluent-outlined",
  "material",
  "material-outlined",
] as const;

export const xelLocales = ["en", "pl"] as const;

export const xelAccentColors = [
  "blue",
  "purple",
  "pink",
  "red",
  "orange",
  "yellow",
  "green",
  "gray",
] as const;

export type XelTheme = (typeof xelThemes)[number];
export type XelIconSet = (typeof xelIconSets)[number];
export type XelLocale = (typeof xelLocales)[number];
export type XelAccentColor = (typeof xelAccentColors)[number];

export type XelSetupOptions = {
  theme?: XelTheme | null;
  accentColor?: XelAccentColor | null;
  icons?: readonly XelIconSet[] | null;
  locales?: readonly XelLocale[] | null;
  assetBaseUrl?: string;
};

export type XelSetupResult = {
  ready: Promise<void>;
  themeUrl: string | null;
  iconUrls: string[];
  localeUrls: string[];
};

function joinAssetUrl(baseUrl: string, path: string) {
  return `${baseUrl.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

export function resolveXelThemeUrl(theme: XelTheme, assetBaseUrl = "/xel") {
  return joinAssetUrl(assetBaseUrl, `themes/${theme}.css`);
}

export function resolveXelIconUrl(iconSet: XelIconSet, assetBaseUrl = "/xel") {
  return joinAssetUrl(assetBaseUrl, `icons/${iconSet}.svg`);
}

export function resolveXelLocaleUrl(locale: XelLocale, assetBaseUrl = "/xel") {
  return joinAssetUrl(assetBaseUrl, `locales/${locale}.ftl`);
}

export function setupXel(options: XelSetupOptions = {}): XelSetupResult {
  const assetBaseUrl = options.assetBaseUrl ?? "/xel";
  const themeUrl = options.theme
    ? resolveXelThemeUrl(options.theme, assetBaseUrl)
    : null;
  const iconUrls = (options.icons ?? []).map((iconSet) =>
    resolveXelIconUrl(iconSet, assetBaseUrl),
  );
  const localeUrls = (options.locales ?? []).map((locale) =>
    resolveXelLocaleUrl(locale, assetBaseUrl),
  );

  if (themeUrl !== null) {
    Xel.theme = themeUrl;
  }

  if (options.accentColor !== undefined && options.accentColor !== null) {
    Xel.accentColor = options.accentColor;
  }

  if (options.icons !== undefined && options.icons !== null) {
    Xel.icons = iconUrls;
  }

  if (options.locales !== undefined && options.locales !== null) {
    Xel.locales = localeUrls;
  }

  const readiness = [
    themeUrl ? Xel.whenThemeReady : Promise.resolve(),
    iconUrls.length > 0 ? Xel.whenIconsReady : Promise.resolve(),
    localeUrls.length > 0 ? Xel.whenLocalesReady : Promise.resolve(),
  ];

  return {
    ready: Promise.all(readiness).then(() => undefined),
    themeUrl,
    iconUrls,
    localeUrls,
  };
}

export type XelProviderProps = XelSetupOptions & {
  children?: JSX.Element;
};

export function XelProvider(props: XelProviderProps) {
  createEffect(() => {
    setupXel({
      theme: props.theme,
      accentColor: props.accentColor,
      icons: props.icons,
      locales: props.locales,
      assetBaseUrl: props.assetBaseUrl,
    });
  });

  onCleanup(() => {
    // Xel is a document-level singleton, so unmounting one provider must not
    // clear setup that another mounted subtree may still need.
  });

  return props.children;
}
