import type { JSX } from "solid-js";
import {
  createComponent,
  createRenderEffect,
  mergeProps,
  onCleanup,
  splitProps,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import { bindXelEvents, eventPropNames } from "./events.js";
import type { XelComponentProps } from "./types.js";

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
  "manual",
  "maximized",
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
  "ticks",
  "toggled",
  "togglable",
  "vertical",
] as const;

const attributePropNames = [
  "args",
  "autocapitalize",
  "controls",
  "href",
  "icon",
  "id",
  "level",
  "max",
  "maxlength",
  "min",
  "minlength",
  "position",
  "prefix",
  "size",
  "skin",
  "step",
  "suffix",
  "timeout",
  "tracking",
  "type",
  "value",
] as const;

function assignProperties<TElement extends HTMLElement>(
  element: TElement,
  properties: Record<string, unknown> | undefined,
) {
  if (!properties) {
    return;
  }

  for (const [name, value] of Object.entries(properties)) {
    (element as Record<string, unknown>)[name] = value;
  }
}

function assignAttributes<TElement extends HTMLElement>(
  element: TElement,
  props: Partial<Record<(typeof attributePropNames)[number], unknown>>,
) {
  for (const propName of attributePropNames) {
    const value = props[propName];

    if (value === false || value === null || value === undefined) {
      element.removeAttribute(propName);
    } else {
      element.setAttribute(propName, String(value));
    }
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
    } else if (value === true || value === "") {
      element.setAttribute(propName, "");
    } else {
      element.setAttribute(propName, String(value));
    }
  }
}

export function createXelComponent<TElement extends HTMLElement>(
  localName: string,
) {
  return function XelComponent(
    props: XelComponentProps<TElement>,
  ): JSX.Element {
    let element: TElement | undefined;
    const [local, eventProps, booleanProps, attributeProps, others] =
      splitProps(
        props,
        ["children", "prop", "properties", "ref"],
        eventPropNames,
        booleanPropNames,
        attributePropNames,
      );

    createRenderEffect(() => {
      const properties = { ...local.properties, ...local.prop };
      const currentBooleanProps = { ...booleanProps };
      const currentAttributeProps = { ...attributeProps };

      if (element) {
        assignProperties(element, properties);
        assignAttributes(element, currentAttributeProps);
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
            assignProperties(node, local.prop);
            assignAttributes(node, attributeProps);
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
