import { ftl, XButton, XButtonElement, XIcon, XLabel, Xel } from "xel-solid";
import type { XelEventDetailMap } from "xel-solid";
import "xel-solid/register";

export function App() {
  const buttonClassName: string = XButtonElement.name;
  const xelReady: Promise<void> = Xel.whenThemeReady;
  const template = ftl`consumer.title = Consumer build`;
  void xelReady;
  void template;

  return (
    <main>
      <output id="button-class-name">{buttonClassName}</output>

      <XButton
        disabled={false}
        onToggle={(event) => {
          const detail: XelEventDetailMap["toggle"] = event.detail;
          console.log(event.currentTarget.localName, detail?.localName);
        }}
      >
        <XIcon href="#home" />
        <XLabel>Consumer build</XLabel>
      </XButton>

      <XLabel prop={{ value: "consumer-label" } as Partial<HTMLElement> & { value: string }}>
        Property alias
      </XLabel>

      <x-button togglable onToggle={(event) => console.log(event.currentTarget.localName)}>
        <x-label>Raw consumer element</x-label>
      </x-button>
    </main>
  );
}
