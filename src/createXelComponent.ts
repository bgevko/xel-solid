import type { JSX } from "solid-js";
import { createComponent, mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { XelComponentProps } from "./types";

export function createXelComponent<TElement extends HTMLElement>(localName: string) {
  return function XelComponent(props: XelComponentProps<TElement>): JSX.Element {
    const [local, others] = splitProps(props, ["children"]);

    return createComponent(
      Dynamic,
      mergeProps({ component: localName }, others, {
        get children() {
          return local.children;
        },
      }),
    );
  };
}

