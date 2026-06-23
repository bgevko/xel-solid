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

const booleanPropNameSet = new Set<string>(booleanPropNames);

function normalizeBooleanProps<TProps extends Record<string, unknown>>(props: TProps): TProps {
  return new Proxy(props, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);

      if (typeof prop === "string" && booleanPropNameSet.has(prop)) {
        return value === false || value === null ? undefined : value;
      }

      return value;
    },
  });
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
      const properties = local.properties;

      if (element) {
        assignProperties(element, properties);
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
