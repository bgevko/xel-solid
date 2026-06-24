import type { JSX } from "solid-js";
import type {
  XAccordionElement,
  XAvatarElement,
  XBackdropElement,
  XBoxElement,
  XButtonElement,
  XButtonsElement,
  XCardElement,
  XCheckboxElement,
  XColorInputElement,
  XColorPickerElement,
  XColorSelectElement,
  XContextMenuElement,
  XDocTabElement,
  XDocTabsElement,
  XDrawerElement,
  XIconElement,
  XInputElement,
  XLabelElement,
  XMenuElement,
  XMenubarElement,
  XMenuItemElement,
  XMessageElement,
  XNavElement,
  XNavItemElement,
  XNotificationElement,
  XNumberInputElement,
  XPagerElement,
  XPopoverElement,
  XProgressbarElement,
  XRadioElement,
  XRadiosElement,
  XSelectElement,
  XShortcutElement,
  XSliderElement,
  XStepperElement,
  XSwatchElement,
  XSwitchElement,
  XTabElement,
  XTabsElement,
  XTagElement,
  XTagsElement,
  XTagsInputElement,
  XTextEditorElement,
  XThrobberElement,
  XTitlebarElement,
  XTooltipElement,
} from "./xel.js";

export type Booleanish = boolean | "" | undefined | null;

export type XelCustomEvent<TDetail = unknown> = CustomEvent<TDetail>;

export type XelEventHandler<
  TElement extends HTMLElement,
  TEvent extends Event = Event,
> = (
  event: TEvent & {
    currentTarget: TElement;
    target: Element;
  },
) => void;

type XelTypedEventHandler<
  TElement extends HTMLElement,
  TName extends XelEventName,
> = XelEventHandler<TElement, XelTypedCustomEvent<TName>>;

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
  disabled?: Booleanish | string;
  ellipsis?: Booleanish;
  expanded?: Booleanish;
  expandable?: Booleanish;
  hidden?: Booleanish;
  manual?: Booleanish;
  maximized?: Booleanish;
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
  ticks?: Booleanish;
  toggled?: Booleanish;
  togglable?: Booleanish;
  vertical?: Booleanish;
};

export type XelCommonProps = {
  args?: string;
  autocapitalize?: string | Booleanish;
  controls?: string;
  href?: string;
  icon?: string;
  id?: string;
  level?: number | string;
  max?: number | string;
  maxlength?: number | string;
  min?: number | string;
  minlength?: number | string;
  position?: string;
  prefix?: string;
  size?: string;
  skin?: string;
  step?: number | string;
  suffix?: string;
  timeout?: number | string;
  tracking?: number | string;
  type?: string;
  value?: string | number | null;
};

export type XelPropertyProps<TElement extends HTMLElement = HTMLElement> = {
  prop?: Partial<TElement> & Record<string, unknown>;
  properties?: Partial<TElement> & Record<string, unknown>;
};

export type XelComponentProps<TElement extends HTMLElement = HTMLElement> =
  Omit<
    JSX.HTMLAttributes<TElement>,
    keyof XelBooleanProps | keyof XelCommonProps
  > &
    XelBooleanProps &
    XelCommonProps &
    XelEventProps<TElement> &
    XelPropertyProps<TElement> & {
      children?: JSX.Element;
    };

export type XelEventDetailMap = {
  add: HTMLElement;
  beforetoggle: undefined;
  beforevalidate: undefined;
  buttonclick: string | null;
  change: { oldValue?: string | null; newValue?: string | null } | undefined;
  changeend: boolean | undefined;
  changestart: undefined;
  close: HTMLElement | undefined;
  collapse: undefined;
  decrement: { shiftKey: boolean };
  decrementend: undefined;
  decrementstart: undefined;
  expand: undefined;
  increment: { shiftKey: boolean };
  incrementend: undefined;
  incrementstart: undefined;
  input: undefined;
  open: HTMLElement | undefined;
  pin: HTMLElement;
  rearrange: undefined;
  remove: HTMLElement | undefined;
  select: HTMLElement | undefined;
  textinputmodeend: undefined;
  textinputmodestart: undefined;
  toggle: HTMLElement | undefined;
  userclose: undefined;
};

export type XelEventName = keyof XelEventDetailMap;

export type XelTypedCustomEvent<TName extends XelEventName> = CustomEvent<
  XelEventDetailMap[TName]
>;

export type XelLocalNameElementMap = {
  "x-accordion": XAccordionElement;
  "x-avatar": XAvatarElement;
  "x-backdrop": XBackdropElement;
  "x-box": XBoxElement;
  "x-button": XButtonElement;
  "x-buttons": XButtonsElement;
  "x-card": XCardElement;
  "x-checkbox": XCheckboxElement;
  "x-colorinput": XColorInputElement;
  "x-colorpicker": XColorPickerElement;
  "x-colorselect": XColorSelectElement;
  "x-contextmenu": XContextMenuElement;
  "x-doctab": XDocTabElement;
  "x-doctabs": XDocTabsElement;
  "x-drawer": XDrawerElement;
  "x-icon": XIconElement;
  "x-input": XInputElement;
  "x-label": XLabelElement;
  "x-menu": XMenuElement;
  "x-menubar": XMenubarElement;
  "x-menuitem": XMenuItemElement;
  "x-message": XMessageElement;
  "x-nav": XNavElement;
  "x-navitem": XNavItemElement;
  "x-notification": XNotificationElement;
  "x-numberinput": XNumberInputElement;
  "x-pager": XPagerElement;
  "x-popover": XPopoverElement;
  "x-progressbar": XProgressbarElement;
  "x-radio": XRadioElement;
  "x-radios": XRadiosElement;
  "x-select": XSelectElement;
  "x-shortcut": XShortcutElement;
  "x-slider": XSliderElement;
  "x-stepper": XStepperElement;
  "x-swatch": XSwatchElement;
  "x-switch": XSwitchElement;
  "x-tab": XTabElement;
  "x-tabs": XTabsElement;
  "x-tag": XTagElement;
  "x-tags": XTagsElement;
  "x-tagsinput": XTagsInputElement;
  "x-texteditor": XTextEditorElement;
  "x-throbber": XThrobberElement;
  "x-titlebar": XTitlebarElement;
  "x-tooltip": XTooltipElement;
};

export type XelComponentElementMap = {
  XAccordion: XAccordionElement;
  XAvatar: XAvatarElement;
  XBackdrop: XBackdropElement;
  XBox: XBoxElement;
  XButton: XButtonElement;
  XButtons: XButtonsElement;
  XCard: XCardElement;
  XCheckbox: XCheckboxElement;
  XColorInput: XColorInputElement;
  XColorPicker: XColorPickerElement;
  XColorSelect: XColorSelectElement;
  XContextMenu: XContextMenuElement;
  XDocTab: XDocTabElement;
  XDocTabs: XDocTabsElement;
  XDrawer: XDrawerElement;
  XIcon: XIconElement;
  XInput: XInputElement;
  XLabel: XLabelElement;
  XMenu: XMenuElement;
  XMenubar: XMenubarElement;
  XMenuItem: XMenuItemElement;
  XMessage: XMessageElement;
  XNav: XNavElement;
  XNavItem: XNavItemElement;
  XNotification: XNotificationElement;
  XNumberInput: XNumberInputElement;
  XPager: XPagerElement;
  XPopover: XPopoverElement;
  XProgressbar: XProgressbarElement;
  XRadio: XRadioElement;
  XRadios: XRadiosElement;
  XSelect: XSelectElement;
  XShortcut: XShortcutElement;
  XSlider: XSliderElement;
  XStepper: XStepperElement;
  XSwatch: XSwatchElement;
  XSwitch: XSwitchElement;
  XTab: XTabElement;
  XTabs: XTabsElement;
  XTag: XTagElement;
  XTags: XTagsElement;
  XTagsInput: XTagsInputElement;
  XTextEditor: XTextEditorElement;
  XThrobber: XThrobberElement;
  XTitlebar: XTitlebarElement;
  XTooltip: XTooltipElement;
};

export type XAccordionProps = XelComponentProps<
  XelComponentElementMap["XAccordion"]
>;
export type XAvatarProps = XelComponentProps<XelComponentElementMap["XAvatar"]>;
export type XBackdropProps = XelComponentProps<
  XelComponentElementMap["XBackdrop"]
>;
export type XBoxProps = XelComponentProps<XelComponentElementMap["XBox"]>;
export type XButtonType = "button" | "submit" | "reset";
export type XButtonProps = Omit<
  XelComponentProps<XelComponentElementMap["XButton"]>,
  "type"
> & {
  type?: XButtonType;
};
export type XButtonsProps = XelComponentProps<
  XelComponentElementMap["XButtons"]
>;
export type XCardProps = XelComponentProps<XelComponentElementMap["XCard"]>;
export type XCheckboxProps = XelComponentProps<
  XelComponentElementMap["XCheckbox"]
>;
export type XColorInputProps = XelComponentProps<
  XelComponentElementMap["XColorInput"]
>;
export type XColorPickerProps = XelComponentProps<
  XelComponentElementMap["XColorPicker"]
>;
export type XColorSelectProps = XelComponentProps<
  XelComponentElementMap["XColorSelect"]
>;
export type XContextMenuProps = XelComponentProps<
  XelComponentElementMap["XContextMenu"]
>;
export type XDocTabProps = XelComponentProps<XelComponentElementMap["XDocTab"]>;
export type XDocTabsProps = XelComponentProps<
  XelComponentElementMap["XDocTabs"]
>;
export type XDrawerProps = XelComponentProps<XelComponentElementMap["XDrawer"]>;
export type XDialogProps = JSX.DialogHtmlAttributes<HTMLDialogElement> & {
  ref?: HTMLDialogElement | ((element: HTMLDialogElement) => void);
};
export type XIconProps = XelComponentProps<XelComponentElementMap["XIcon"]>;
export type XInputProps = XelComponentProps<XelComponentElementMap["XInput"]>;
export type XLabelProps = XelComponentProps<XelComponentElementMap["XLabel"]>;
export type XMenuProps = XelComponentProps<XelComponentElementMap["XMenu"]>;
export type XMenubarProps = XelComponentProps<
  XelComponentElementMap["XMenubar"]
>;
export type XMenuItemProps = XelComponentProps<
  XelComponentElementMap["XMenuItem"]
>;
export type XMessageProps = XelComponentProps<
  XelComponentElementMap["XMessage"]
>;
export type XNavProps = XelComponentProps<XelComponentElementMap["XNav"]>;
export type XNavItemProps = XelComponentProps<
  XelComponentElementMap["XNavItem"]
>;
export type XNotificationProps = XelComponentProps<
  XelComponentElementMap["XNotification"]
>;
export type XNumberInputProps = XelComponentProps<
  XelComponentElementMap["XNumberInput"]
>;
export type XPagerProps = XelComponentProps<XelComponentElementMap["XPager"]>;
export type XPopoverProps = XelComponentProps<
  XelComponentElementMap["XPopover"]
>;
export type XProgressbarProps = XelComponentProps<
  XelComponentElementMap["XProgressbar"]
>;
export type XRadioProps = XelComponentProps<XelComponentElementMap["XRadio"]>;
export type XRadiosProps = XelComponentProps<XelComponentElementMap["XRadios"]>;
export type XSelectProps = XelComponentProps<XelComponentElementMap["XSelect"]>;
export type XShortcutProps = XelComponentProps<
  XelComponentElementMap["XShortcut"]
>;
export type XSliderProps = XelComponentProps<XelComponentElementMap["XSlider"]>;
export type XStepperProps = XelComponentProps<
  XelComponentElementMap["XStepper"]
>;
export type XSwatchProps = XelComponentProps<XelComponentElementMap["XSwatch"]>;
export type XSwitchProps = XelComponentProps<XelComponentElementMap["XSwitch"]>;
export type XTabProps = XelComponentProps<XelComponentElementMap["XTab"]>;
export type XTabsProps = XelComponentProps<XelComponentElementMap["XTabs"]>;
export type XTagProps = XelComponentProps<XelComponentElementMap["XTag"]>;
export type XTagsProps = XelComponentProps<XelComponentElementMap["XTags"]>;
export type XTagsInputProps = XelComponentProps<
  XelComponentElementMap["XTagsInput"]
>;
export type XTextEditorProps = XelComponentProps<
  XelComponentElementMap["XTextEditor"]
>;
export type XThrobberProps = XelComponentProps<
  XelComponentElementMap["XThrobber"]
>;
export type XTitlebarProps = XelComponentProps<
  XelComponentElementMap["XTitlebar"]
>;
export type XTooltipProps = XelComponentProps<
  XelComponentElementMap["XTooltip"]
>;
