import type { JSX } from "solid-js";
import { createXelComponent } from "./createXelComponent";
import type { XelComponentProps } from "./types";
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
} from "./xel";

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

type Component<TElement extends HTMLElement = HTMLElement> = (
  props: XelComponentProps<TElement>,
) => JSX.Element;

export const XAccordion: Component<XAccordionElement> = createXelComponent("x-accordion");
export const XAvatar: Component<XAvatarElement> = createXelComponent("x-avatar");
export const XBackdrop: Component<XBackdropElement> = createXelComponent("x-backdrop");
export const XBox: Component<XBoxElement> = createXelComponent("x-box");
export const XButton: Component<XButtonElement> = createXelComponent("x-button");
export const XButtons: Component<XButtonsElement> = createXelComponent("x-buttons");
export const XCard: Component<XCardElement> = createXelComponent("x-card");
export const XCheckbox: Component<XCheckboxElement> = createXelComponent("x-checkbox");
export const XColorInput: Component<XColorInputElement> = createXelComponent("x-colorinput");
export const XColorPicker: Component<XColorPickerElement> = createXelComponent("x-colorpicker");
export const XColorSelect: Component<XColorSelectElement> = createXelComponent("x-colorselect");
export const XContextMenu: Component<XContextMenuElement> = createXelComponent("x-contextmenu");
export const XDocTab: Component<XDocTabElement> = createXelComponent("x-doctab");
export const XDocTabs: Component<XDocTabsElement> = createXelComponent("x-doctabs");
export const XDrawer: Component<XDrawerElement> = createXelComponent("x-drawer");
export const XIcon: Component<XIconElement> = createXelComponent("x-icon");
export const XInput: Component<XInputElement> = createXelComponent("x-input");
export const XLabel: Component<XLabelElement> = createXelComponent("x-label");
export const XMenu: Component<XMenuElement> = createXelComponent("x-menu");
export const XMenubar: Component<XMenubarElement> = createXelComponent("x-menubar");
export const XMenuItem: Component<XMenuItemElement> = createXelComponent("x-menuitem");
export const XMessage: Component<XMessageElement> = createXelComponent("x-message");
export const XNav: Component<XNavElement> = createXelComponent("x-nav");
export const XNavItem: Component<XNavItemElement> = createXelComponent("x-navitem");
export const XNotification: Component<XNotificationElement> = createXelComponent("x-notification");
export const XNumberInput: Component<XNumberInputElement> = createXelComponent("x-numberinput");
export const XPager: Component<XPagerElement> = createXelComponent("x-pager");
export const XPopover: Component<XPopoverElement> = createXelComponent("x-popover");
export const XProgressbar: Component<XProgressbarElement> = createXelComponent("x-progressbar");
export const XRadio: Component<XRadioElement> = createXelComponent("x-radio");
export const XRadios: Component<XRadiosElement> = createXelComponent("x-radios");
export const XSelect: Component<XSelectElement> = createXelComponent("x-select");
export const XShortcut: Component<XShortcutElement> = createXelComponent("x-shortcut");
export const XSlider: Component<XSliderElement> = createXelComponent("x-slider");
export const XStepper: Component<XStepperElement> = createXelComponent("x-stepper");
export const XSwatch: Component<XSwatchElement> = createXelComponent("x-swatch");
export const XSwitch: Component<XSwitchElement> = createXelComponent("x-switch");
export const XTab: Component<XTabElement> = createXelComponent("x-tab");
export const XTabs: Component<XTabsElement> = createXelComponent("x-tabs");
export const XTag: Component<XTagElement> = createXelComponent("x-tag");
export const XTags: Component<XTagsElement> = createXelComponent("x-tags");
export const XTagsInput: Component<XTagsInputElement> = createXelComponent("x-tagsinput");
export const XTextEditor: Component<XTextEditorElement> = createXelComponent("x-texteditor");
export const XThrobber: Component<XThrobberElement> = createXelComponent("x-throbber");
export const XTitlebar: Component<XTitlebarElement> = createXelComponent("x-titlebar");
export const XTooltip: Component<XTooltipElement> = createXelComponent("x-tooltip");
