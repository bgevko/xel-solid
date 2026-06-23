import type { JSX } from "solid-js";
import { createComponent, createRenderEffect, mergeProps, onCleanup, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { bindXelEvents, eventPropNames } from "./events";
import type { XelComponentProps } from "./types";

const booleanPropNames = [
  "alpha",
  "checked",
  "compact",
  "condensed",
  "disabled",
  "ellipsis",
  "expanded",
  "expandable",
  "hidden",
  "mixed",
  "modal",
  "noautocollapse",
  "open",
  "opened",
  "readonly",
  "readOnly",
  "required",
  "selected",
  "spellcheck",
  "toggled",
  "togglable",
] as const;

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

function assignBooleanAttributes<TElement extends HTMLElement>(
  element: TElement,
  props: Partial<Record<(typeof booleanPropNames)[number], unknown>>,
) {
  for (const propName of booleanPropNames) {
    const value = props[propName];

    if (value === false || value === null || value === undefined) {
      element.removeAttribute(propName);
    }
    else {
      element.setAttribute(propName, "");
    }
  }
}

export function createXelComponent<TElement extends HTMLElement>(localName: string) {
  return function XelComponent(props: XelComponentProps<TElement>): JSX.Element {
    let element: TElement | undefined;
    const [local, eventProps, booleanProps, others] = splitProps(
      props,
      ["children", "properties", "ref"],
      eventPropNames,
      booleanPropNames,
    );

    createRenderEffect(() => {
      const properties = local.properties;
      const currentBooleanProps = { ...booleanProps };

      if (element) {
        assignProperties(element, properties);
        assignBooleanAttributes(element, currentBooleanProps);
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
            assignBooleanAttributes(node, booleanProps);

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
