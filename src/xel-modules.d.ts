declare module "xel" {
  export class XAccordionElement extends HTMLElement {}
  export class XAvatarElement extends HTMLElement {}
  export class XBackdropElement extends HTMLElement {}
  export class XBoxElement extends HTMLElement {}
  export class XButtonElement extends HTMLElement {}
  export class XButtonsElement extends HTMLElement {}
  export class XCardElement extends HTMLElement {}
  export class XCheckboxElement extends HTMLElement {}
  export class XColorInputElement extends HTMLElement {}
  export class XColorPickerElement extends HTMLElement {}
  export class XColorSelectElement extends HTMLElement {}
  export class XContextMenuElement extends HTMLElement {}
  export class XDocTabElement extends HTMLElement {}
  export class XDocTabsElement extends HTMLElement {}
  export class XDrawerElement extends HTMLElement {}
  export class XIconElement extends HTMLElement {}
  export class XInputElement extends HTMLElement {}
  export class XLabelElement extends HTMLElement {}
  export class XMenuElement extends HTMLElement {}
  export class XMenubarElement extends HTMLElement {}
  export class XMenuItemElement extends HTMLElement {}
  export class XMessageElement extends HTMLElement {}
  export class XNavElement extends HTMLElement {}
  export class XNavItemElement extends HTMLElement {}
  export class XNotificationElement extends HTMLElement {}
  export class XNumberInputElement extends HTMLElement {}
  export class XPagerElement extends HTMLElement {}
  export class XPopoverElement extends HTMLElement {}
  export class XProgressbarElement extends HTMLElement {}
  export class XRadioElement extends HTMLElement {}
  export class XRadiosElement extends HTMLElement {}
  export class XSelectElement extends HTMLElement {}
  export class XShortcutElement extends HTMLElement {}
  export class XSliderElement extends HTMLElement {}
  export class XStepperElement extends HTMLElement {}
  export class XSwatchElement extends HTMLElement {}
  export class XSwitchElement extends HTMLElement {}
  export class XTabElement extends HTMLElement {}
  export class XTabsElement extends HTMLElement {}
  export class XTagElement extends HTMLElement {}
  export class XTagsElement extends HTMLElement {}
  export class XTagsInputElement extends HTMLElement {}
  export class XTextEditorElement extends HTMLElement {}
  export class XThrobberElement extends HTMLElement {}
  export class XTitlebarElement extends HTMLElement {}
  export class XTooltipElement extends HTMLElement {}

  export const ftl: (strings: TemplateStringsArray, ...values: unknown[]) => string;

  const Xel: {
    readonly whenThemeReady: Promise<void>;
    readonly whenIconsReady: Promise<void>;
    readonly whenLocalesReady: Promise<void>;
    theme: string | null;
    accentColor: string | null;
    icons: string[];
    locales: string[];
  };

  export default Xel;
}
