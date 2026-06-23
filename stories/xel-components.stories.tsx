import type { JSX } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import {
  XAccordion,
  XAvatar,
  XBackdrop,
  XBox,
  XButton,
  XButtons,
  XCard,
  XCheckbox,
  XColorInput,
  XColorPicker,
  XColorSelect,
  XContextMenu,
  XDocTab,
  XDocTabs,
  XDrawer,
  XIcon,
  XInput,
  XLabel,
  XMenu,
  XMenubar,
  XMenuItem,
  XMessage,
  XNav,
  XNavItem,
  XNotification,
  XNumberInput,
  XPager,
  XPopover,
  XProgressbar,
  XRadio,
  XRadios,
  XSelect,
  XShortcut,
  XSlider,
  XStepper,
  XSwatch,
  XSwitch,
  XTab,
  XTabs,
  XTag,
  XTags,
  XTagsInput,
  XTextEditor,
  XThrobber,
  XTitlebar,
  XTooltip,
} from "../src";

const meta = {
  title: "Xel/Components",
  parameters: {
    docs: {
      description: {
        component: "Visual coverage for xel-solid wrappers rendered through Solid components.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

function Frame(props: { children: JSX.Element }) {
  return <section class="xel-story-frame">{props.children}</section>;
}

function Row(props: { children: JSX.Element }) {
  return <div class="xel-story-row">{props.children}</div>;
}

function Stack(props: { children: JSX.Element }) {
  return <div class="xel-story-stack">{props.children}</div>;
}

function Surface(props: { children: JSX.Element }) {
  return <div class="xel-story-surface">{props.children}</div>;
}

export const Accordion: Story = {
  name: "Accordion",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XAccordion expanded>
        <XLabel>Preferences</XLabel>
        <Surface>
          <XCheckbox toggled>
            <XLabel>Enable notifications</XLabel>
          </XCheckbox>
          <XSwitch toggled>
            <XLabel>Sync settings</XLabel>
          </XSwitch>
        </Surface>
      </XAccordion>
    </Frame>
  ),
};

export const Avatar: Story = {
  name: "Avatar",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Row>
        <XAvatar>
          <XLabel>AB</XLabel>
        </XAvatar>
        <XAvatar>
          <XIcon href="/icons/portal.svg#xel" />
        </XAvatar>
      </Row>
    </Frame>
  ),
};

export const Backdrop: Story = {
  name: "Backdrop",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Surface>
        <XBackdrop opened />
        <XLabel>Backdrop layer</XLabel>
      </Surface>
    </Frame>
  ),
};

export const Box: Story = {
  name: "Box",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XBox>
        <XLabel>Box content</XLabel>
      </XBox>
    </Frame>
  ),
};

export const Button: Story = {
  name: "Button",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Row>
        <XButton>
          <XIcon href="#home" />
          <XLabel>Button</XLabel>
        </XButton>
        <XButton disabled>
          <XLabel>Disabled</XLabel>
        </XButton>
      </Row>
    </Frame>
  ),
};

export const Buttons: Story = {
  name: "Buttons",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XButtons>
        <XButton toggled>
          <XLabel>Left</XLabel>
        </XButton>
        <XButton>
          <XLabel>Center</XLabel>
        </XButton>
        <XButton>
          <XLabel>Right</XLabel>
        </XButton>
      </XButtons>
    </Frame>
  ),
};

export const Card: Story = {
  name: "Card",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XCard>
        <h3>Card</h3>
        <p>Desktop panel content rendered inside a Xel card.</p>
      </XCard>
    </Frame>
  ),
};

export const Checkbox: Story = {
  name: "Checkbox",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XCheckbox>
          <XLabel>Unchecked</XLabel>
        </XCheckbox>
        <XCheckbox toggled>
          <XLabel>Checked</XLabel>
        </XCheckbox>
        <XCheckbox mixed>
          <XLabel>Mixed</XLabel>
        </XCheckbox>
      </Stack>
    </Frame>
  ),
};

export const ColorInput: Story = {
  name: "ColorInput",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XColorInput value="#0091ea" alpha />
    </Frame>
  ),
};

export const ColorPicker: Story = {
  name: "ColorPicker",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XColorPicker value="#bada55" alpha />
    </Frame>
  ),
};

export const ColorSelect: Story = {
  name: "ColorSelect",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XColorSelect value="#0091ea" />
    </Frame>
  ),
};

export const ContextMenu: Story = {
  name: "ContextMenu",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Surface>
        <XLabel>Context menu target</XLabel>
        <XContextMenu>
          <XMenuItem>
            <XLabel>Copy</XLabel>
            <XShortcut value="Control+C" />
          </XMenuItem>
          <XMenuItem>
            <XLabel>Paste</XLabel>
            <XShortcut value="Control+V" />
          </XMenuItem>
        </XContextMenu>
      </Surface>
    </Frame>
  ),
};

export const DocTab: Story = {
  name: "DocTab",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XDocTab selected>
        <XIcon href="#home" />
        <XLabel>Document.txt</XLabel>
      </XDocTab>
    </Frame>
  ),
};

export const DocTabs: Story = {
  name: "DocTabs",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XDocTabs>
        <XDocTab selected>
          <XLabel>index.ts</XLabel>
        </XDocTab>
        <XDocTab>
          <XLabel>README.md</XLabel>
        </XDocTab>
      </XDocTabs>
    </Frame>
  ),
};

export const Drawer: Story = {
  name: "Drawer",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Surface>
        <XDrawer opened>
          <XLabel>Drawer content</XLabel>
        </XDrawer>
      </Surface>
    </Frame>
  ),
};

export const Icon: Story = {
  name: "Icon",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Row>
        <XIcon href="#home" />
        <XIcon href="/icons/portal.svg#xel" />
      </Row>
    </Frame>
  ),
};

export const Input: Story = {
  name: "Input",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XInput value="Input value" />
    </Frame>
  ),
};

export const Label: Story = {
  name: "Label",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XLabel>Standalone label</XLabel>
    </Frame>
  ),
};

export const Menu: Story = {
  name: "Menu",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XMenu>
        <XMenuItem>
          <XIcon href="#home" />
          <XLabel>Home</XLabel>
        </XMenuItem>
        <XMenuItem>
          <XIcon href="#settings" />
          <XLabel>Settings</XLabel>
        </XMenuItem>
      </XMenu>
    </Frame>
  ),
};

export const Menubar: Story = {
  name: "Menubar",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XMenubar>
        <XMenuItem>
          <XLabel>File</XLabel>
          <XMenu>
            <XMenuItem>
              <XLabel>New</XLabel>
              <XShortcut value="Control+N" />
            </XMenuItem>
            <XMenuItem>
              <XLabel>Open</XLabel>
              <XShortcut value="Control+O" />
            </XMenuItem>
          </XMenu>
        </XMenuItem>
        <XMenuItem>
          <XLabel>Edit</XLabel>
        </XMenuItem>
      </XMenubar>
    </Frame>
  ),
};

export const MenuItem: Story = {
  name: "MenuItem",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XMenuItem>
        <XIcon href="#copy" />
        <XLabel>Copy</XLabel>
        <XShortcut value="Control+C" />
      </XMenuItem>
    </Frame>
  ),
};

export const Message: Story = {
  name: "Message",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XMessage>
        <XLabel>Changes saved.</XLabel>
      </XMessage>
    </Frame>
  ),
};

export const Nav: Story = {
  name: "Nav",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XNav>
        <XNavItem selected>
          <XIcon href="#home" />
          <XLabel>Home</XLabel>
        </XNavItem>
        <XNavItem>
          <XIcon href="#settings" />
          <XLabel>Settings</XLabel>
        </XNavItem>
      </XNav>
    </Frame>
  ),
};

export const NavItem: Story = {
  name: "NavItem",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XNavItem selected>
        <XIcon href="#home" />
        <XLabel>Home</XLabel>
      </XNavItem>
    </Frame>
  ),
};

export const Notification: Story = {
  name: "Notification",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XNotification opened>
        <XLabel>Sync complete</XLabel>
      </XNotification>
    </Frame>
  ),
};

export const NumberInput: Story = {
  name: "NumberInput",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XNumberInput value="42" min="0" max="100" step="1" />
    </Frame>
  ),
};

export const Pager: Story = {
  name: "Pager",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XPager value="3" max="10" />
    </Frame>
  ),
};

export const Popover: Story = {
  name: "Popover",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XButton>
        <XLabel>Popover target</XLabel>
        <XPopover opened>
          <XLabel>Popover content</XLabel>
        </XPopover>
      </XButton>
    </Frame>
  ),
};

export const Progressbar: Story = {
  name: "Progressbar",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XProgressbar value="65" max="100" />
    </Frame>
  ),
};

export const Radio: Story = {
  name: "Radio",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XRadio toggled>
        <XLabel>Selected radio</XLabel>
      </XRadio>
    </Frame>
  ),
};

export const Radios: Story = {
  name: "Radios",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XRadios>
        <XRadio toggled>
          <XLabel>One</XLabel>
        </XRadio>
        <XRadio>
          <XLabel>Two</XLabel>
        </XRadio>
        <XRadio>
          <XLabel>Three</XLabel>
        </XRadio>
      </XRadios>
    </Frame>
  ),
};

export const Select: Story = {
  name: "Select",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XSelect>
        <XMenu>
          <XMenuItem value="one" toggled>
            <XLabel>One</XLabel>
          </XMenuItem>
          <XMenuItem value="two">
            <XLabel>Two</XLabel>
          </XMenuItem>
          <XMenuItem value="three">
            <XLabel>Three</XLabel>
          </XMenuItem>
        </XMenu>
      </XSelect>
    </Frame>
  ),
};

export const Shortcut: Story = {
  name: "Shortcut",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XShortcut value="Control+Shift+P" />
    </Frame>
  ),
};

export const Slider: Story = {
  name: "Slider",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XSlider value="35" min="0" max="100" />
    </Frame>
  ),
};

export const Stepper: Story = {
  name: "Stepper",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XStepper />
    </Frame>
  ),
};

export const Swatch: Story = {
  name: "Swatch",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Row>
        <XSwatch value="#0091ea" />
        <XSwatch value="#8bc34a" />
        <XSwatch value="#f44336" />
      </Row>
    </Frame>
  ),
};

export const Switch: Story = {
  name: "Switch",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XSwitch toggled>
        <XLabel>Enabled</XLabel>
      </XSwitch>
    </Frame>
  ),
};

export const Tab: Story = {
  name: "Tab",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XTab selected>
        <XLabel>Selected tab</XLabel>
      </XTab>
    </Frame>
  ),
};

export const Tabs: Story = {
  name: "Tabs",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XTabs>
        <XTab selected>
          <XLabel>General</XLabel>
        </XTab>
        <XTab>
          <XLabel>Advanced</XLabel>
        </XTab>
      </XTabs>
    </Frame>
  ),
};

export const Tag: Story = {
  name: "Tag",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XTag>
        <XLabel>Tag</XLabel>
      </XTag>
    </Frame>
  ),
};

export const Tags: Story = {
  name: "Tags",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XTags>
        <XTag>
          <XLabel>Design</XLabel>
        </XTag>
        <XTag>
          <XLabel>Desktop</XLabel>
        </XTag>
        <XTag>
          <XLabel>Solid</XLabel>
        </XTag>
      </XTags>
    </Frame>
  ),
};

export const TagsInput: Story = {
  name: "TagsInput",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XTagsInput prop={{ value: ["Design", "Desktop"] }} />
    </Frame>
  ),
};

export const TextEditor: Story = {
  name: "TextEditor",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XTextEditor prop={{ value: "Editable text" }} />
    </Frame>
  ),
};

export const Throbber: Story = {
  name: "Throbber",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XThrobber />
    </Frame>
  ),
};

export const Titlebar: Story = {
  name: "Titlebar",
  tags: ["visual"],
  render: () => (
    <Frame>
      <div class="xel-story-titlebar-window">
        <XTitlebar>
          <XLabel>Document</XLabel>
        </XTitlebar>
        <div class="xel-story-titlebar-window-content">Window content</div>
      </div>
    </Frame>
  ),
};

export const Tooltip: Story = {
  name: "Tooltip",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XButton>
        <XLabel>Hover target</XLabel>
        <XTooltip opened>Tooltip content</XTooltip>
      </XButton>
    </Frame>
  ),
};
