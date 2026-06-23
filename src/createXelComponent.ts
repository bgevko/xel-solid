import type { JSX } from "solid-js";
import { createComponent, mergeProps, onCleanup, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { bindXelEvents, eventPropNames } from "./events";
import type { XelComponentProps } from "./types";

const booleanPropNames = [
  "checked",
  "disabled",
  "expanded",
  "hidden",
  "mixed",
  "open",
  "selected",
  "toggled",
  "togglable",
] as const;

function normalizeBooleanProps<TProps extends Record<string, unknown>>(props: TProps): TProps {
  const normalized: Record<string, unknown> = { ...props };

  for (const propName of booleanPropNames) {
    if (normalized[propName] === false || normalized[propName] === null) {
      normalized[propName] = undefined;
    }
  }

  return normalized as TProps;
}

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
        normalizeBooleanProps(others),
        {
          get children() {
            return local.children;
          },
        },
      ),
    );
  };
}
