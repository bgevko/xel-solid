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
  onAdd?: XelEventHandler<TElement, Event>;
  onBeforeToggle?: XelEventHandler<TElement, Event>;
  onBeforeValidate?: XelEventHandler<TElement, Event>;
  onButtonClick?: XelEventHandler<TElement, Event>;
  onChange?: XelEventHandler<TElement, Event>;
  onChangeEnd?: XelEventHandler<TElement, Event>;
  onChangeStart?: XelEventHandler<TElement, Event>;
  onClose?: XelEventHandler<TElement, Event>;
  onCollapse?: XelEventHandler<TElement, Event>;
  onDecrement?: XelEventHandler<TElement, Event>;
  onDecrementEnd?: XelEventHandler<TElement, Event>;
  onDecrementStart?: XelEventHandler<TElement, Event>;
  onExpand?: XelEventHandler<TElement, Event>;
  onIncrement?: XelEventHandler<TElement, Event>;
  onIncrementEnd?: XelEventHandler<TElement, Event>;
  onIncrementStart?: XelEventHandler<TElement, Event>;
  onInput?: XelEventHandler<TElement, Event>;
  onOpen?: XelEventHandler<TElement, Event>;
  onPin?: XelEventHandler<TElement, Event>;
  onRearrange?: XelEventHandler<TElement, Event>;
  onRemove?: XelEventHandler<TElement, Event>;
  onSelect?: XelEventHandler<TElement, Event>;
  onTextInputModeEnd?: XelEventHandler<TElement, Event>;
  onTextInputModeStart?: XelEventHandler<TElement, Event>;
  onToggle?: XelEventHandler<TElement, Event>;
  onUserClose?: XelEventHandler<TElement, Event>;
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
