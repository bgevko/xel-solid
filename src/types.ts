import type { JSX } from "solid-js";

export type Booleanish = boolean | "" | undefined | null;

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

export type XelBooleanProps = {
  checked?: Booleanish;
  disabled?: Booleanish;
  expanded?: Booleanish;
  hidden?: Booleanish;
  mixed?: Booleanish;
  open?: Booleanish;
  selected?: Booleanish;
  toggled?: Booleanish;
  togglable?: Booleanish;
};

export type XelCommonProps = {
  href?: string;
  icon?: string;
  id?: string;
  max?: number | string;
  min?: number | string;
  skin?: string;
  step?: number | string;
  value?: string | number | null;
};

export type XelComponentProps<TElement extends HTMLElement = HTMLElement> =
  Omit<JSX.HTMLAttributes<TElement>, keyof XelBooleanProps | keyof XelCommonProps> &
    XelBooleanProps &
    XelCommonProps &
    XelEventProps<TElement> & {
      children?: JSX.Element;
      properties?: Partial<TElement> & Record<string, unknown>;
    };
