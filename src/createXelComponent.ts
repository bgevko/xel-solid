import type { JSX } from "solid-js";
import { createComponent, createRenderEffect, mergeProps, onCleanup, splitProps } from "solid-js";
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

function assignProperties<TElement extends HTMLElement>(
  element: TElement,
  properties: XelComponentProps<TElement>["properties"],
) {
  if (!properties) {
    return;
  }

  for (const [name, value] of Object.entries(properties)) {
    (element as Record<string, unknown>)[name] = value;
  }
}

export function createXelComponent<TElement extends HTMLElement>(localName: string) {
  return function XelComponent(props: XelComponentProps<TElement>): JSX.Element {
    let element: TElement | undefined;
    const [local, eventProps, others] = splitProps(
      props,
      ["children", "properties", "ref"],
      eventPropNames,
    );

    createRenderEffect(() => {
      if (element) {
        assignProperties(element, local.properties);
      }
    });

    return createComponent(
      Dynamic,
      mergeProps(
        {
          component: localName,
          ref(node: TElement) {
            element = node;

            if (typeof local.ref === "function") {
              local.ref(node);
            }

            assignProperties(node, local.properties);

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
