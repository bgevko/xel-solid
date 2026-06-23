import type { JSX } from "solid-js";
import type { XelEventDetailMap, XelEventName, XelTypedCustomEvent } from "./event-types";

export type Booleanish = boolean | "" | undefined | null;

export type XelCustomEvent<TDetail = unknown> = CustomEvent<TDetail>;

export type XelEventHandler<TElement extends HTMLElement, TEvent extends Event = Event> = (
  event: TEvent & {
    currentTarget: TElement;
    target: Element;
  },
) => void;

type XelTypedEventHandler<TElement extends HTMLElement, TName extends XelEventName> =
  XelEventHandler<TElement, XelTypedCustomEvent<TName>>;

export type XelEventProps<TElement extends HTMLElement = HTMLElement> = {
  onAdd?: XelTypedEventHandler<TElement, "add">;
  onBeforeToggle?: XelTypedEventHandler<TElement, "beforetoggle">;
  onBeforeValidate?: XelTypedEventHandler<TElement, "beforevalidate">;
  onButtonClick?: XelTypedEventHandler<TElement, "buttonclick">;
  onChange?: XelTypedEventHandler<TElement, "change">;
  onChangeEnd?: XelTypedEventHandler<TElement, "changeend">;
  onChangeStart?: XelTypedEventHandler<TElement, "changestart">;
  onClose?: XelTypedEventHandler<TElement, "close">;
  onCollapse?: XelTypedEventHandler<TElement, "collapse">;
  onDecrement?: XelTypedEventHandler<TElement, "decrement">;
  onDecrementEnd?: XelTypedEventHandler<TElement, "decrementend">;
  onDecrementStart?: XelTypedEventHandler<TElement, "decrementstart">;
  onExpand?: XelTypedEventHandler<TElement, "expand">;
  onIncrement?: XelTypedEventHandler<TElement, "increment">;
  onIncrementEnd?: XelTypedEventHandler<TElement, "incrementend">;
  onIncrementStart?: XelTypedEventHandler<TElement, "incrementstart">;
  onInput?: XelTypedEventHandler<TElement, "input">;
  onOpen?: XelTypedEventHandler<TElement, "open">;
  onPin?: XelTypedEventHandler<TElement, "pin">;
  onRearrange?: XelTypedEventHandler<TElement, "rearrange">;
  onRemove?: XelTypedEventHandler<TElement, "remove">;
  onSelect?: XelTypedEventHandler<TElement, "select">;
  onTextInputModeEnd?: XelTypedEventHandler<TElement, "textinputmodeend">;
  onTextInputModeStart?: XelTypedEventHandler<TElement, "textinputmodestart">;
  onToggle?: XelTypedEventHandler<TElement, "toggle">;
  onUserClose?: XelTypedEventHandler<TElement, "userclose">;
};

export type XelBooleanProps = {
  alpha?: Booleanish;
  checked?: Booleanish;
  compact?: Booleanish;
  condensed?: Booleanish;
  disabled?: Booleanish;
  ellipsis?: Booleanish;
  expanded?: Booleanish;
  expandable?: Booleanish;
  hidden?: Booleanish;
  mixed?: Booleanish;
  modal?: Booleanish;
  noautocollapse?: Booleanish;
  open?: Booleanish;
  opened?: Booleanish;
  readonly?: Booleanish;
  readOnly?: Booleanish;
  required?: Booleanish;
  selected?: Booleanish;
  spellcheck?: Booleanish;
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

export type XelPropertyProps<TElement extends HTMLElement = HTMLElement> = {
  prop?: Partial<TElement> & Record<string, unknown>;
  properties?: Partial<TElement> & Record<string, unknown>;
};

export type XelComponentProps<TElement extends HTMLElement = HTMLElement> =
  Omit<JSX.HTMLAttributes<TElement>, keyof XelBooleanProps | keyof XelCommonProps> &
    XelBooleanProps &
    XelCommonProps &
    XelEventProps<TElement> &
    XelPropertyProps<TElement> & {
      children?: JSX.Element;
    };
