import {
  XButton,
  XDialog,
  XIcon,
  XLabel,
  resolveXelThemeUrl,
  XelProvider,
} from "xel-solid";
import { createSignal } from "solid-js";
import Xel from "xel/xel.js";

declare global {
  interface Window {
    Xel: typeof Xel;
  }
}

window.Xel = Xel;

export function App() {
  const [submitCount, setSubmitCount] = createSignal(0);
  const [resetCount, setResetCount] = createSignal(0);
  const themeUrl = resolveXelThemeUrl("material", "./xel");
  let dialog: HTMLDialogElement | undefined;

  return (
    <XelProvider theme="material" accentColor="blue" icons={["material"]} assetBaseUrl="./xel">
      <main>
        <output id="theme-url">{themeUrl}</output>

        <XButton id="plain-button">
          <XIcon href="#home" />
          <XLabel>Greet</XLabel>
        </XButton>

        <form
          id="demo-form"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitCount((count) => count + 1);
          }}
          onReset={() => setResetCount((count) => count + 1)}
        >
          <input name="name" value="Ada" />
          <XButton id="submit-button" type="submit">
            <XLabel>Submit</XLabel>
          </XButton>
          <XButton id="reset-button" type="reset">
            <XLabel>Reset</XLabel>
          </XButton>
        </form>

        <output id="submit-count">{submitCount()}</output>
        <output id="reset-count">{resetCount()}</output>

        <XButton id="open-dialog" onClick={() => dialog?.showModal()}>
          <XLabel>Open dialog</XLabel>
        </XButton>
        <XDialog
          id="demo-dialog"
          ref={(element) => {
            dialog = element;
          }}
        >
          <XLabel>Dialog content</XLabel>
          <XButton id="close-dialog" onClick={() => dialog?.close()}>
            <XLabel>Close</XLabel>
          </XButton>
        </XDialog>
      </main>
    </XelProvider>
  );
}
