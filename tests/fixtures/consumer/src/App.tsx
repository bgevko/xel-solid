import { ftl, XButton, XButtonElement, XIcon, XLabel, Xel } from "xel-solid";
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

      <XButton disabled={false} onToggle={(event) => console.log(event.currentTarget.localName)}>
        <XIcon href="#home" />
        <XLabel>Consumer build</XLabel>
      </XButton>

      <x-button togglable onToggle={(event) => console.log(event.currentTarget.localName)}>
        <x-label>Raw consumer element</x-label>
      </x-button>
    </main>
  );
}
