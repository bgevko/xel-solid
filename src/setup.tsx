import { createEffect, onCleanup, type JSX } from "solid-js";
import { Xel } from "./xel";
import "./register";

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
  "portal",
] as const;

export const xelLocales = ["en", "pl"] as const;

export type XelTheme = (typeof xelThemes)[number];
export type XelIconSet = (typeof xelIconSets)[number];
export type XelLocale = (typeof xelLocales)[number] | string;

export type XelSetupOptions = {
  theme?: XelTheme | string | null;
  accentColor?: string | null;
  icons?: readonly (XelIconSet | string)[] | null;
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

export function resolveXelThemeUrl(theme: XelTheme | string, assetBaseUrl = "/xel") {
  if (theme.endsWith(".css") || theme.includes("/")) {
    return theme;
  }

  return joinAssetUrl(assetBaseUrl, `themes/${theme}.css`);
}

export function resolveXelIconUrl(iconSet: XelIconSet | string, assetBaseUrl = "/xel") {
  if (iconSet.endsWith(".svg") || iconSet.includes("/")) {
    return iconSet;
  }

  return joinAssetUrl(assetBaseUrl, `icons/${iconSet}.svg`);
}

export function resolveXelLocaleUrl(locale: XelLocale, assetBaseUrl = "/xel") {
  if (locale.endsWith(".ftl") || locale.includes("/")) {
    return locale;
  }

  return joinAssetUrl(assetBaseUrl, `locales/${locale}.ftl`);
}

export function setupXel(options: XelSetupOptions = {}): XelSetupResult {
  const assetBaseUrl = options.assetBaseUrl ?? "/xel";
  const themeUrl = options.theme ? resolveXelThemeUrl(options.theme, assetBaseUrl) : null;
  const iconUrls = (options.icons ?? []).map((iconSet) => resolveXelIconUrl(iconSet, assetBaseUrl));
  const localeUrls = (options.locales ?? []).map((locale) => resolveXelLocaleUrl(locale, assetBaseUrl));

  if (themeUrl !== null) {
    Xel.theme = themeUrl;
  }

  if (options.accentColor !== undefined && options.accentColor !== null) {
    Xel.accentColor = options.accentColor;
  }

  if (options.icons !== null) {
    Xel.icons = iconUrls;
  }

  if (options.locales !== null) {
    Xel.locales = localeUrls;
  }

  return {
    ready: Promise.all([Xel.whenThemeReady, Xel.whenIconsReady, Xel.whenLocalesReady]).then(() => undefined),
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

  return <>{props.children}</>;
}
