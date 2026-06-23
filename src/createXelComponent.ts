import type { JSX } from "solid-js";
import { createComponent, mergeProps, onCleanup, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { bindXelEvents, eventPropNames } from "./events";
import type { XelComponentProps } from "./types";

export function createXelComponent<TElement extends HTMLElement>(localName: string) {
  return function XelComponent(props: XelComponentProps<TElement>): JSX.Element {
    const [local, eventProps, others] = splitProps(props, ["children", "ref"], eventPropNames);

    return createComponent(
      Dynamic,
      mergeProps(
        {
          component: localName,
          ref(node: TElement) {
            if (typeof local.ref === "function") {
              local.ref(node);
            }

            const cleanup = bindXelEvents(node, eventProps);
            onCleanup(cleanup);
          },
        },
        others,
        {
          get children() {
            return local.children;
          },
        },
      ),
    );
  };
}

