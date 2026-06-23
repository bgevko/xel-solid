import type { JSX } from "solid-js";
import type { XelComponentProps } from "./types";

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "x-accordion": XelComponentProps<HTMLElement>;
      "x-avatar": XelComponentProps<HTMLElement>;
      "x-backdrop": XelComponentProps<HTMLElement>;
      "x-box": XelComponentProps<HTMLElement>;
      "x-button": XelComponentProps<HTMLElement>;
      "x-buttons": XelComponentProps<HTMLElement>;
      "x-card": XelComponentProps<HTMLElement>;
      "x-checkbox": XelComponentProps<HTMLElement>;
      "x-colorinput": XelComponentProps<HTMLElement>;
      "x-colorpicker": XelComponentProps<HTMLElement>;
      "x-colorselect": XelComponentProps<HTMLElement>;
      "x-contextmenu": XelComponentProps<HTMLElement>;
      "x-doctab": XelComponentProps<HTMLElement>;
      "x-doctabs": XelComponentProps<HTMLElement>;
      "x-drawer": XelComponentProps<HTMLElement>;
      "x-icon": XelComponentProps<HTMLElement>;
      "x-input": XelComponentProps<HTMLElement>;
      "x-label": XelComponentProps<HTMLElement>;
      "x-menu": XelComponentProps<HTMLElement>;
      "x-menubar": XelComponentProps<HTMLElement>;
      "x-menuitem": XelComponentProps<HTMLElement>;
      "x-message": XelComponentProps<HTMLElement>;
      "x-nav": XelComponentProps<HTMLElement>;
      "x-navitem": XelComponentProps<HTMLElement>;
      "x-notification": XelComponentProps<HTMLElement>;
      "x-numberinput": XelComponentProps<HTMLElement>;
      "x-pager": XelComponentProps<HTMLElement>;
      "x-popover": XelComponentProps<HTMLElement>;
      "x-progressbar": XelComponentProps<HTMLElement>;
      "x-radio": XelComponentProps<HTMLElement>;
      "x-radios": XelComponentProps<HTMLElement>;
      "x-select": XelComponentProps<HTMLElement>;
      "x-shortcut": XelComponentProps<HTMLElement>;
      "x-slider": XelComponentProps<HTMLElement>;
      "x-stepper": XelComponentProps<HTMLElement>;
      "x-swatch": XelComponentProps<HTMLElement>;
      "x-switch": XelComponentProps<HTMLElement>;
      "x-tab": XelComponentProps<HTMLElement>;
      "x-tabs": XelComponentProps<HTMLElement>;
      "x-tag": XelComponentProps<HTMLElement>;
      "x-tags": XelComponentProps<HTMLElement>;
      "x-tagsinput": XelComponentProps<HTMLElement>;
      "x-texteditor": XelComponentProps<HTMLElement>;
      "x-throbber": XelComponentProps<HTMLElement>;
      "x-titlebar": XelComponentProps<HTMLElement>;
      "x-tooltip": XelComponentProps<HTMLElement>;
    }
  }
}

export type XelIntrinsicElements = JSX.IntrinsicElements;

