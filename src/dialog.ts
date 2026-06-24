import type { JSX } from "solid-js";
import { createComponent, mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import "./register.js";

export type XDialogProps = JSX.DialogHtmlAttributes<HTMLDialogElement> & {
  ref?: HTMLDialogElement | ((element: HTMLDialogElement) => void);
};

export function XDialog(props: XDialogProps): JSX.Element {
  const [local, others] = splitProps(props, ["children"]);

  return createComponent(
    Dynamic,
    mergeProps(
      {
        component: "dialog",
      },
      others,
      {
        get children() {
          return local.children;
        },
      },
    ),
  );
}
