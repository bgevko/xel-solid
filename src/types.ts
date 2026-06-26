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

export type XelSize = "small" | "large";
export type XButtonSkin = "normal" | "flat" | "recessed" | "dock";
export type XDrawerPosition = "left" | "right" | "top" | "bottom";
export type XInputType = "text" | "email" | "password" | "url" | "color";
export type XInputValidation = "auto" | "instant" | "manual";
export type XTooltipType = "hint" | "error";
export type XColorSpace =
  | "srgb"
  | "srgb-linear"
  | "p3"
  | "rec2020"
  | "a98rgb"
  | "prophoto"
  | "oklch"
  | "oklab"
  | "lch"
  | "lab"
  | "xyz-d65"
  | "xyz-d50";
export type XSliderDragging = "start" | "end";
export type XStepperDisabled = Booleanish | "increment" | "decrement";
export type XPagerControl = "prev" | "next" | "first" | "last" | "nth";
export type XPagerControls =
  | readonly XPagerControl[]
  | XPagerControl
  | `${XPagerControl} ${XPagerControl}`
  | `${XPagerControl} ${XPagerControl} ${XPagerControl}`
  | `${XPagerControl} ${XPagerControl} ${XPagerControl} ${XPagerControl}`
  | `${XPagerControl} ${XPagerControl} ${XPagerControl} ${XPagerControl} ${XPagerControl}`;

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
  disabled?: Booleanish;
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
  href?: string;
  icon?: string;
  id?: string;
  level?: number | string;
  max?: number | string;
  maxlength?: number | string;
  min?: number | string;
  minlength?: number | string;
  prefix?: string;
  step?: number | string;
  suffix?: string;
  timeout?: number | string;
  tracking?: number | string;
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

type XelComponentPropsWith<
  TElement extends HTMLElement,
  TProps extends object,
> = Omit<XelComponentProps<TElement>, keyof TProps> & TProps;

type XelSizedProps = {
  size?: XelSize | null;
};

type XelSpacesProps = {
  spaces?: readonly string[] | string | null;
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

export type XAccordionProps = XelComponentPropsWith<
  XelComponentElementMap["XAccordion"],
  XelSizedProps
>;
export type XAvatarProps = XelComponentPropsWith<
  XelComponentElementMap["XAvatar"],
  XelSizedProps
>;
export type XBackdropProps = XelComponentProps<
  XelComponentElementMap["XBackdrop"]
>;
export type XBoxProps = XelComponentProps<XelComponentElementMap["XBox"]>;
export type XButtonType = "button" | "submit" | "reset";
export type XButtonProps = XelComponentPropsWith<
  XelComponentElementMap["XButton"],
  XelSizedProps & {
    skin?: XButtonSkin;
    type?: XButtonType;
  }
>;
export type XButtonsProps = XelComponentProps<
  XelComponentElementMap["XButtons"]
>;
export type XCardProps = XelComponentProps<XelComponentElementMap["XCard"]>;
export type XCheckboxProps = XelComponentPropsWith<
  XelComponentElementMap["XCheckbox"],
  XelSizedProps
>;
export type XColorInputProps = XelComponentPropsWith<
  XelComponentElementMap["XColorInput"],
  XelSizedProps & {
    space?: XColorSpace;
  }
>;
export type XColorPickerProps = XelComponentPropsWith<
  XelComponentElementMap["XColorPicker"],
  XelSpacesProps
>;
export type XColorSelectProps = XelComponentPropsWith<
  XelComponentElementMap["XColorSelect"],
  XelSizedProps & XelSpacesProps
>;
export type XContextMenuProps = XelComponentProps<
  XelComponentElementMap["XContextMenu"]
>;
export type XDocTabProps = XelComponentProps<XelComponentElementMap["XDocTab"]>;
export type XDocTabsProps = XelComponentPropsWith<
  XelComponentElementMap["XDocTabs"],
  XelSizedProps
>;
export type XDrawerProps = XelComponentPropsWith<
  XelComponentElementMap["XDrawer"],
  {
    position?: XDrawerPosition;
  }
>;
export type XDialogProps = JSX.DialogHtmlAttributes<HTMLDialogElement> & {
  ref?: HTMLDialogElement | ((element: HTMLDialogElement) => void);
};
export type XIconProps = XelComponentPropsWith<
  XelComponentElementMap["XIcon"],
  XelSizedProps
>;
export type XInputProps = XelComponentPropsWith<
  XelComponentElementMap["XInput"],
  XelSizedProps & {
    type?: XInputType;
    validation?: XInputValidation;
  }
>;
export type XLabelProps = XelComponentProps<XelComponentElementMap["XLabel"]>;
export type XMenuProps = XelComponentProps<XelComponentElementMap["XMenu"]>;
export type XMenubarProps = XelComponentPropsWith<
  XelComponentElementMap["XMenubar"],
  XelSizedProps
>;
export type XMenuItemProps = XelComponentPropsWith<
  XelComponentElementMap["XMenuItem"],
  XelSizedProps
>;
export type XMessageProps = XelComponentProps<
  XelComponentElementMap["XMessage"]
>;
export type XNavProps = XelComponentProps<XelComponentElementMap["XNav"]>;
export type XNavItemProps = XelComponentProps<
  XelComponentElementMap["XNavItem"]
>;
export type XNotificationProps = XelComponentPropsWith<
  XelComponentElementMap["XNotification"],
  XelSizedProps
>;
export type XNumberInputProps = XelComponentPropsWith<
  XelComponentElementMap["XNumberInput"],
  XelSizedProps
>;
export type XPagerProps = XelComponentPropsWith<
  XelComponentElementMap["XPager"],
  {
    controls?: XPagerControls | null;
  }
>;
export type XPopoverProps = XelComponentProps<
  XelComponentElementMap["XPopover"]
>;
export type XProgressbarProps = XelComponentPropsWith<
  XelComponentElementMap["XProgressbar"],
  XelSizedProps
>;
export type XRadioProps = XelComponentPropsWith<
  XelComponentElementMap["XRadio"],
  XelSizedProps
>;
export type XRadiosProps = XelComponentProps<XelComponentElementMap["XRadios"]>;
export type XSelectProps = XelComponentPropsWith<
  XelComponentElementMap["XSelect"],
  XelSizedProps
>;
export type XShortcutProps = XelComponentProps<
  XelComponentElementMap["XShortcut"]
>;
export type XSliderProps = XelComponentPropsWith<
  XelComponentElementMap["XSlider"],
  XelSizedProps & {
    dragging?: XSliderDragging | null;
  }
>;
export type XStepperProps = XelComponentPropsWith<
  XelComponentElementMap["XStepper"],
  {
    disabled?: XStepperDisabled;
  }
>;
export type XSwatchProps = XelComponentPropsWith<
  XelComponentElementMap["XSwatch"],
  XelSizedProps
>;
export type XSwitchProps = XelComponentPropsWith<
  XelComponentElementMap["XSwitch"],
  XelSizedProps
>;
export type XTabProps = XelComponentPropsWith<
  XelComponentElementMap["XTab"],
  XelSizedProps
>;
export type XTabsProps = XelComponentProps<XelComponentElementMap["XTabs"]>;
export type XTagProps = XelComponentPropsWith<
  XelComponentElementMap["XTag"],
  XelSizedProps
>;
export type XTagsProps = XelComponentProps<XelComponentElementMap["XTags"]>;
export type XTagsInputProps = XelComponentPropsWith<
  XelComponentElementMap["XTagsInput"],
  XelSizedProps
>;
export type XTextEditorProps = XelComponentPropsWith<
  XelComponentElementMap["XTextEditor"],
  XelSizedProps & {
    validation?: XInputValidation;
  }
>;
export type XThrobberProps = XelComponentPropsWith<
  XelComponentElementMap["XThrobber"],
  XelSizedProps
>;
export type XTitlebarProps = XelComponentProps<
  XelComponentElementMap["XTitlebar"]
>;
export type XTooltipProps = XelComponentPropsWith<
  XelComponentElementMap["XTooltip"],
  {
    type?: XTooltipType;
  }
>;
