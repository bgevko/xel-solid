import type { JSX } from "solid-js";

export type XelCustomEvent<TDetail = unknown> = CustomEvent<TDetail>;

export type XelEventHandler<TElement extends HTMLElement, TEvent extends Event = Event> = (
  event: TEvent & {
    currentTarget: TElement;
    target: Element;
  },
) => void;

export type XelEventProps<TElement extends HTMLElement = HTMLElement> = {
  onBeforeToggle?: XelEventHandler<TElement, Event>;
  onChange?: XelEventHandler<TElement, Event>;
  onClose?: XelEventHandler<TElement, Event>;
  onOpen?: XelEventHandler<TElement, Event>;
  onRemove?: XelEventHandler<TElement, Event>;
  onToggle?: XelEventHandler<TElement, Event>;
};

export type XelComponentProps<TElement extends HTMLElement = HTMLElement> =
  JSX.HTMLAttributes<TElement> &
    XelEventProps<TElement> & {
      children?: JSX.Element;
    };

