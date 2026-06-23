import type { XelComponentProps } from "./types";

type EventPropName =
  | "onBeforeToggle"
  | "onChange"
  | "onClose"
  | "onOpen"
  | "onRemove"
  | "onToggle";

const eventPropToEventName = {
  onBeforeToggle: "beforetoggle",
  onChange: "change",
  onClose: "close",
  onOpen: "open",
  onRemove: "remove",
  onToggle: "toggle",
} as const satisfies Record<EventPropName, string>;

export const eventPropNames = Object.keys(eventPropToEventName) as EventPropName[];

export function bindXelEvents<TElement extends HTMLElement>(
  element: TElement,
  props: XelComponentProps<TElement>,
) {
  const cleanups: Array<() => void> = [];

  for (const propName of eventPropNames) {
    const handler = props[propName];

    if (typeof handler !== "function") {
      continue;
    }

    const eventName = eventPropToEventName[propName];
    const listener = (event: Event) => handler(event as Parameters<typeof handler>[0]);

    element.addEventListener(eventName, listener);
    cleanups.push(() => element.removeEventListener(eventName, listener));
  }

  return () => {
    for (const cleanup of cleanups) {
      cleanup();
    }
  };
}

