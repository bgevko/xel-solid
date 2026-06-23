import type { JSX } from "solid-js";
import { createXelComponent } from "./createXelComponent";
import type {
  XAccordionProps,
  XAvatarProps,
  XBackdropProps,
  XBoxProps,
  XButtonProps,
  XButtonsProps,
  XCardProps,
  XCheckboxProps,
  XColorInputProps,
  XColorPickerProps,
  XColorSelectProps,
  XContextMenuProps,
  XDocTabProps,
  XDocTabsProps,
  XDrawerProps,
  XIconProps,
  XInputProps,
  XLabelProps,
  XMenuProps,
  XMenubarProps,
  XMenuItemProps,
  XMessageProps,
  XNavProps,
  XNavItemProps,
  XNotificationProps,
  XNumberInputProps,
  XPagerProps,
  XPopoverProps,
  XProgressbarProps,
  XRadioProps,
  XRadiosProps,
  XSelectProps,
  XShortcutProps,
  XSliderProps,
  XStepperProps,
  XSwatchProps,
  XSwitchProps,
  XTabProps,
  XTabsProps,
  XTagProps,
  XTagsProps,
  XTagsInputProps,
  XTextEditorProps,
  XThrobberProps,
  XTitlebarProps,
  XTooltipProps,
} from "./component-props";

import "xel/elements/x-accordion.js";
import "xel/elements/x-avatar.js";
import "xel/elements/x-backdrop.js";
import "xel/elements/x-box.js";
import "xel/elements/x-button.js";
import "xel/elements/x-buttons.js";
import "xel/elements/x-card.js";
import "xel/elements/x-checkbox.js";
import "xel/elements/x-colorinput.js";
import "xel/elements/x-colorpicker/x-colorpicker.js";
import "xel/elements/x-colorselect.js";
import "xel/elements/x-contextmenu.js";
import "xel/elements/x-doctab.js";
import "xel/elements/x-doctabs.js";
import "xel/elements/x-drawer.js";
import "xel/elements/x-icon.js";
import "xel/elements/x-input.js";
import "xel/elements/x-label.js";
import "xel/elements/x-menu.js";
import "xel/elements/x-menubar.js";
import "xel/elements/x-menuitem.js";
import "xel/elements/x-message.js";
import "xel/elements/x-nav.js";
import "xel/elements/x-navitem.js";
import "xel/elements/x-notification.js";
import "xel/elements/x-numberinput.js";
import "xel/elements/x-pager.js";
import "xel/elements/x-popover.js";
import "xel/elements/x-progressbar.js";
import "xel/elements/x-radio.js";
import "xel/elements/x-radios.js";
import "xel/elements/x-select.js";
import "xel/elements/x-shortcut.js";
import "xel/elements/x-slider.js";
import "xel/elements/x-stepper.js";
import "xel/elements/x-swatch.js";
import "xel/elements/x-switch.js";
import "xel/elements/x-tab.js";
import "xel/elements/x-tabs.js";
import "xel/elements/x-tag.js";
import "xel/elements/x-tags.js";
import "xel/elements/x-tagsinput.js";
import "xel/elements/x-texteditor.js";
import "xel/elements/x-throbber.js";
import "xel/elements/x-titlebar.js";
import "xel/elements/x-tooltip.js";

type Component<TProps> = (props: TProps) => JSX.Element;

export const XAccordion: Component<XAccordionProps> = createXelComponent("x-accordion");
export const XAvatar: Component<XAvatarProps> = createXelComponent("x-avatar");
export const XBackdrop: Component<XBackdropProps> = createXelComponent("x-backdrop");
export const XBox: Component<XBoxProps> = createXelComponent("x-box");
export const XButton: Component<XButtonProps> = createXelComponent("x-button");
export const XButtons: Component<XButtonsProps> = createXelComponent("x-buttons");
export const XCard: Component<XCardProps> = createXelComponent("x-card");
export const XCheckbox: Component<XCheckboxProps> = createXelComponent("x-checkbox");
export const XColorInput: Component<XColorInputProps> = createXelComponent("x-colorinput");
export const XColorPicker: Component<XColorPickerProps> = createXelComponent("x-colorpicker");
export const XColorSelect: Component<XColorSelectProps> = createXelComponent("x-colorselect");
export const XContextMenu: Component<XContextMenuProps> = createXelComponent("x-contextmenu");
export const XDocTab: Component<XDocTabProps> = createXelComponent("x-doctab");
export const XDocTabs: Component<XDocTabsProps> = createXelComponent("x-doctabs");
export const XDrawer: Component<XDrawerProps> = createXelComponent("x-drawer");
export const XIcon: Component<XIconProps> = createXelComponent("x-icon");
export const XInput: Component<XInputProps> = createXelComponent("x-input");
export const XLabel: Component<XLabelProps> = createXelComponent("x-label");
export const XMenu: Component<XMenuProps> = createXelComponent("x-menu");
export const XMenubar: Component<XMenubarProps> = createXelComponent("x-menubar");
export const XMenuItem: Component<XMenuItemProps> = createXelComponent("x-menuitem");
export const XMessage: Component<XMessageProps> = createXelComponent("x-message");
export const XNav: Component<XNavProps> = createXelComponent("x-nav");
export const XNavItem: Component<XNavItemProps> = createXelComponent("x-navitem");
export const XNotification: Component<XNotificationProps> = createXelComponent("x-notification");
export const XNumberInput: Component<XNumberInputProps> = createXelComponent("x-numberinput");
export const XPager: Component<XPagerProps> = createXelComponent("x-pager");
export const XPopover: Component<XPopoverProps> = createXelComponent("x-popover");
export const XProgressbar: Component<XProgressbarProps> = createXelComponent("x-progressbar");
export const XRadio: Component<XRadioProps> = createXelComponent("x-radio");
export const XRadios: Component<XRadiosProps> = createXelComponent("x-radios");
export const XSelect: Component<XSelectProps> = createXelComponent("x-select");
export const XShortcut: Component<XShortcutProps> = createXelComponent("x-shortcut");
export const XSlider: Component<XSliderProps> = createXelComponent("x-slider");
export const XStepper: Component<XStepperProps> = createXelComponent("x-stepper");
export const XSwatch: Component<XSwatchProps> = createXelComponent("x-swatch");
export const XSwitch: Component<XSwitchProps> = createXelComponent("x-switch");
export const XTab: Component<XTabProps> = createXelComponent("x-tab");
export const XTabs: Component<XTabsProps> = createXelComponent("x-tabs");
export const XTag: Component<XTagProps> = createXelComponent("x-tag");
export const XTags: Component<XTagsProps> = createXelComponent("x-tags");
export const XTagsInput: Component<XTagsInputProps> = createXelComponent("x-tagsinput");
export const XTextEditor: Component<XTextEditorProps> = createXelComponent("x-texteditor");
export const XThrobber: Component<XThrobberProps> = createXelComponent("x-throbber");
export const XTitlebar: Component<XTitlebarProps> = createXelComponent("x-titlebar");
export const XTooltip: Component<XTooltipProps> = createXelComponent("x-tooltip");
