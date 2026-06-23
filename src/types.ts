import type { JSX } from "solid-js";

export type XelComponentProps<TElement extends HTMLElement = HTMLElement> =
  JSX.HTMLAttributes<TElement> & {
    children?: JSX.Element;
  };

export type XelCustomEvent<TDetail = unknown> = CustomEvent<TDetail>;

