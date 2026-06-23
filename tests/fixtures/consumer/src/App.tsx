import { XButton, XIcon, XLabel } from "xel-solid";
import "xel-solid/register";

export function App() {
  return (
    <main>
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

