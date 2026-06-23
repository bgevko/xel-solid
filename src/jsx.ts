import type { JSX } from "solid-js";
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

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "x-accordion": XelComponentProps<XAccordionElement>;
      "x-avatar": XelComponentProps<XAvatarElement>;
      "x-backdrop": XelComponentProps<XBackdropElement>;
      "x-box": XelComponentProps<XBoxElement>;
      "x-button": XelComponentProps<XButtonElement>;
      "x-buttons": XelComponentProps<XButtonsElement>;
      "x-card": XelComponentProps<XCardElement>;
      "x-checkbox": XelComponentProps<XCheckboxElement>;
      "x-colorinput": XelComponentProps<XColorInputElement>;
      "x-colorpicker": XelComponentProps<XColorPickerElement>;
      "x-colorselect": XelComponentProps<XColorSelectElement>;
      "x-contextmenu": XelComponentProps<XContextMenuElement>;
      "x-doctab": XelComponentProps<XDocTabElement>;
      "x-doctabs": XelComponentProps<XDocTabsElement>;
      "x-drawer": XelComponentProps<XDrawerElement>;
      "x-icon": XelComponentProps<XIconElement>;
      "x-input": XelComponentProps<XInputElement>;
      "x-label": XelComponentProps<XLabelElement>;
      "x-menu": XelComponentProps<XMenuElement>;
      "x-menubar": XelComponentProps<XMenubarElement>;
      "x-menuitem": XelComponentProps<XMenuItemElement>;
      "x-message": XelComponentProps<XMessageElement>;
      "x-nav": XelComponentProps<XNavElement>;
      "x-navitem": XelComponentProps<XNavItemElement>;
      "x-notification": XelComponentProps<XNotificationElement>;
      "x-numberinput": XelComponentProps<XNumberInputElement>;
      "x-pager": XelComponentProps<XPagerElement>;
      "x-popover": XelComponentProps<XPopoverElement>;
      "x-progressbar": XelComponentProps<XProgressbarElement>;
      "x-radio": XelComponentProps<XRadioElement>;
      "x-radios": XelComponentProps<XRadiosElement>;
      "x-select": XelComponentProps<XSelectElement>;
      "x-shortcut": XelComponentProps<XShortcutElement>;
      "x-slider": XelComponentProps<XSliderElement>;
      "x-stepper": XelComponentProps<XStepperElement>;
      "x-swatch": XelComponentProps<XSwatchElement>;
      "x-switch": XelComponentProps<XSwitchElement>;
      "x-tab": XelComponentProps<XTabElement>;
      "x-tabs": XelComponentProps<XTabsElement>;
      "x-tag": XelComponentProps<XTagElement>;
      "x-tags": XelComponentProps<XTagsElement>;
      "x-tagsinput": XelComponentProps<XTagsInputElement>;
      "x-texteditor": XelComponentProps<XTextEditorElement>;
      "x-throbber": XelComponentProps<XThrobberElement>;
      "x-titlebar": XelComponentProps<XTitlebarElement>;
      "x-tooltip": XelComponentProps<XTooltipElement>;
    }
  }
}

export type XelIntrinsicElements = JSX.IntrinsicElements;
