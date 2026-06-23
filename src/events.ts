import type { XelComponentProps } from "./types";

export const xelEventPropToEventName = {
  onAdd: "add",
  onBeforeToggle: "beforetoggle",
  onBeforeValidate: "beforevalidate",
  onButtonClick: "buttonclick",
  onChange: "change",
  onChangeEnd: "changeend",
  onChangeStart: "changestart",
  onClose: "close",
  onCollapse: "collapse",
  onDecrement: "decrement",
  onDecrementEnd: "decrementend",
  onDecrementStart: "decrementstart",
  onExpand: "expand",
  onIncrement: "increment",
  onIncrementEnd: "incrementend",
  onIncrementStart: "incrementstart",
  onInput: "input",
  onOpen: "open",
  onPin: "pin",
  onRearrange: "rearrange",
  onRemove: "remove",
  onSelect: "select",
  onTextInputModeEnd: "textinputmodeend",
  onTextInputModeStart: "textinputmodestart",
  onToggle: "toggle",
  onUserClose: "userclose",
} as const;

export type EventPropName = keyof typeof xelEventPropToEventName;

export const eventPropNames = Object.keys(xelEventPropToEventName) as EventPropName[];

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

    const eventName = xelEventPropToEventName[propName];
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

