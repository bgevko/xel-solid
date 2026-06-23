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

export type XelTypedCustomEvent<TName extends XelEventName> = CustomEvent<XelEventDetailMap[TName]>;
