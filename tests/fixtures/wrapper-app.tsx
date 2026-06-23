import { createSignal } from "solid-js";
import { render } from "solid-js/web";
import { XAccordion, XButton, XInput, XLabel } from "../../src";

function App() {
  const [disabled, setDisabled] = createSignal(false);
  const [eventCount, setEventCount] = createSignal(0);
  const [extraEventCount, setExtraEventCount] = createSignal(0);
  const [propertyValue, setPropertyValue] = createSignal("initial");

  let inputRef: HTMLElement | undefined;

  return (
    <>
      <XButton id="event-button" onToggle={() => setEventCount((count) => count + 1)}>
        <XLabel>Toggle event</XLabel>
      </XButton>

      <XAccordion
        id="extra-event-accordion"
        onExpand={() => setExtraEventCount((count) => count + 1)}
        onCollapse={() => setExtraEventCount((count) => count + 1)}
      >
        <XLabel>Extra events</XLabel>
      </XAccordion>

      <XButton id="boolean-button" disabled={disabled()}>
        <XLabel>Boolean button</XLabel>
      </XButton>

      <button id="enable-button" onClick={() => setDisabled(false)}>
        enable
      </button>

      <button id="disable-button" onClick={() => setDisabled(true)}>
        disable
      </button>

      <XInput
        id="property-input"
        ref={(element) => {
          inputRef = element;
          window.xelSolidInputRef = element;
        }}
        properties={{ value: propertyValue() } as Partial<HTMLElement> & { value: string }}
      />

      <button id="change-property" onClick={() => setPropertyValue("changed")}>
        change property
      </button>

      <output id="event-count">{eventCount()}</output>
      <output id="extra-event-count">{extraEventCount()}</output>
      <output id="ref-local-name">{inputRef?.localName}</output>
    </>
  );
}

declare global {
  interface Window {
    xelSolidInputRef?: HTMLElement;
  }
}

render(() => <App />, document.getElementById("app")!);
