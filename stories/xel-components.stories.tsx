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
  XDialog,
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
  XelProvider,
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

export const ProviderSetup: Story = {
  name: "Provider setup",
  tags: ["visual"],
  render: () => (
    <XelProvider theme="material" accentColor="blue" icons={["material"]} assetBaseUrl="">
      <Frame>
        <XButton>
          <XIcon href="#home" />
          <XLabel>Provider setup</XLabel>
        </XButton>
      </Frame>
    </XelProvider>
  ),
};

function EditMenu() {
  return (
    <XMenu>
      <XMenuItem>
        <XIcon href="#history-undo" />
        <XLabel>Undo</XLabel>
        <XShortcut value="Control+Z" />
      </XMenuItem>
      <XMenuItem>
        <XIcon href="#history-redo" />
        <XLabel>Redo</XLabel>
        <XShortcut value="Control+Shift+Z" />
      </XMenuItem>
      <hr />
      <XMenuItem>
        <XIcon href="#cut" />
        <XLabel>Cut</XLabel>
        <XShortcut value="Control+X" />
      </XMenuItem>
      <XMenuItem>
        <XIcon href="#copy" />
        <XLabel>Copy</XLabel>
        <XShortcut value="Control+C" />
      </XMenuItem>
      <XMenuItem>
        <XIcon href="#paste" />
        <XLabel>Paste</XLabel>
        <XShortcut value="Control+V" />
      </XMenuItem>
    </XMenu>
  );
}

function CountryMenu() {
  return (
    <XMenu>
      <XMenuItem value="australia">
        <XLabel>Australia</XLabel>
      </XMenuItem>
      <XMenuItem value="canada" toggled>
        <XLabel>Canada</XLabel>
      </XMenuItem>
      <XMenuItem value="ireland" disabled>
        <XLabel>Ireland</XLabel>
      </XMenuItem>
      <XMenuItem value="new-zealand">
        <XLabel>New Zealand</XLabel>
      </XMenuItem>
      <XMenuItem value="usa">
        <XLabel>United States</XLabel>
      </XMenuItem>
    </XMenu>
  );
}

function VehicleMenu() {
  return (
    <XMenu>
      <XMenuItem value="car">
        <XIcon href="#vehicle-car" />
        <XLabel>Car</XLabel>
      </XMenuItem>
      <XMenuItem value="bus">
        <XIcon href="#vehicle-bus" />
        <XLabel>Bus</XLabel>
      </XMenuItem>
      <XMenuItem value="bicycle">
        <XIcon href="#vehicle-bicycle" />
        <XLabel>Bicycle</XLabel>
      </XMenuItem>
      <XMenuItem value="boat" toggled>
        <XIcon href="#vehicle-boat" />
        <XLabel>Boat</XLabel>
      </XMenuItem>
    </XMenu>
  );
}

function ColorMenu() {
  return (
    <XMenu>
      <XMenuItem value="red" toggled>
        <XSwatch value="#f44336" />
        <XLabel>Red</XLabel>
      </XMenuItem>
      <XMenuItem value="blue">
        <XSwatch value="#0091ea" />
        <XLabel>Blue</XLabel>
      </XMenuItem>
      <XMenuItem value="green">
        <XSwatch value="#8bc34a" />
        <XLabel>Green</XLabel>
      </XMenuItem>
      <hr />
      <XMenuItem value="system">
        <XSwatch value="#78909c" />
        <XLabel>System</XLabel>
      </XMenuItem>
    </XMenu>
  );
}

export const Accordion: Story = {
  name: "Accordion",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XAccordion>
          <header>
            <XLabel>Header</XLabel>
          </header>
          <XLabel>Main content</XLabel>
        </XAccordion>

        <XAccordion expanded>
          <header>
            <XLabel>Expanded header</XLabel>
          </header>
          <XLabel>Main content</XLabel>
        </XAccordion>

        <div style={{ width: "180px" }}>
          <XAccordion>
            <header>
              <XLabel>Fill</XLabel>
              <XColorSelect value="#a8cfff" style={{ width: "40px", height: "20px" }} />
            </header>
            <XSelect style={{ width: "100%" }}>
              <XMenu>
                <XMenuItem toggled>
                  <XLabel>Solid</XLabel>
                </XMenuItem>
                <XMenuItem>
                  <XLabel>Linear Gradient</XLabel>
                </XMenuItem>
                <XMenuItem>
                  <XLabel>Radial Gradient</XLabel>
                </XMenuItem>
              </XMenu>
            </XSelect>
            <XButton style={{ width: "100%", "margin-top": "7px" }}>
              <XLabel>Reset</XLabel>
            </XButton>
          </XAccordion>

          <hr />

          <XAccordion>
            <header>
              <XLabel>Border</XLabel>
              <XColorSelect value="#bada55" style={{ width: "40px", height: "20px" }} />
            </header>
            <XSlider min="0" max="10" value="5" style={{ width: "100%" }}>
              <XLabel value="0">0</XLabel>
              <XLabel value="5">5</XLabel>
              <XLabel value="10">10</XLabel>
            </XSlider>
          </XAccordion>
        </div>
      </Stack>
    </Frame>
  ),
};

export const Avatar: Story = {
  name: "Avatar",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <Row>
          <XAvatar>
            <img src="https://xel-toolkit.org/favicon.svg" />
          </XAvatar>
          <XAvatar>
            <XIcon href="#person" />
          </XAvatar>
          <XAvatar>
            <XLabel>AB</XLabel>
          </XAvatar>
          <XAvatar style={{ color: "white", "background-color": "#e16daa" }}>
            <XIcon href="#person" />
          </XAvatar>
        </Row>
        <XBox style={{ gap: "6px" }}>
          <XAvatar size="small">
            <img src="https://xel-toolkit.org/favicon.svg" />
          </XAvatar>
          <XAvatar size="small">
            <XIcon href="#person" />
          </XAvatar>
          <XAvatar size="small">
            <XLabel>AB</XLabel>
          </XAvatar>
          <XAvatar>
            <img src="https://xel-toolkit.org/favicon.svg" />
          </XAvatar>
          <XAvatar>
            <XIcon href="#person" />
          </XAvatar>
          <XAvatar>
            <XLabel>AB</XLabel>
          </XAvatar>
          <XAvatar size="large">
            <img src="https://xel-toolkit.org/favicon.svg" />
          </XAvatar>
          <XAvatar size="large">
            <XIcon href="#person" />
          </XAvatar>
          <XAvatar size="large">
            <XLabel>AB</XLabel>
          </XAvatar>
        </XBox>
      </Stack>
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
      <Stack>
        <XBox style={{ gap: "10px" }}>
          <XIcon href="#mail" />
          <XIcon href="#delete" />
          <XIcon href="#settings" />
        </XBox>
        <XBox style={{ gap: "10px" }} vertical>
          <XIcon href="#mail" />
          <XIcon href="#delete" />
          <XIcon href="#settings" />
        </XBox>
        <XBox style={{ gap: "5px" }}>
          <XButton>
            <XLabel>Button</XLabel>
          </XButton>
          <XButton>
            <XLabel>Button</XLabel>
          </XButton>
        </XBox>
        <XBox style={{ gap: "5px" }} vertical>
          <XButton>
            <XLabel>Button</XLabel>
          </XButton>
          <XButton>
            <XLabel>Button</XLabel>
          </XButton>
        </XBox>
      </Stack>
    </Frame>
  ),
};

export const Button: Story = {
  name: "Button",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <Row>
          <XButton>
            <XLabel>Button</XLabel>
          </XButton>
          <XButton>
            <XIcon href="#home" />
          </XButton>
          <XButton>
            <XIcon href="#home" />
            <XLabel>Button</XLabel>
          </XButton>
          <XButton>
            <XLabel>Button</XLabel>
            <XIcon href="#home" />
          </XButton>
          <a href="https://developers.google.com/web/" target="_blank">
            <XButton>
              <XIcon href="#open" />
              <XLabel>Button</XLabel>
            </XButton>
          </a>
          <XButton style={{ width: "73px" }}>
            <XLabel>More options</XLabel>
          </XButton>
        </Row>
        <Row>
          <XButton disabled>
            <XIcon href="#delete" />
            <XLabel>Button</XLabel>
          </XButton>
          <XButton toggled>
            <XIcon href="#settings" />
            <XLabel>Button</XLabel>
          </XButton>
          <XButton toggled togglable>
            <XIcon href="#home" />
            <XLabel>Button</XLabel>
          </XButton>
          <XButton toggled disabled>
            <XIcon href="#home" />
            <XLabel>Button</XLabel>
          </XButton>
          <XButton condensed>
            <XIcon href="#home" />
            <XLabel>Button</XLabel>
          </XButton>
        </Row>
        <Row>
          <XButton>
            <XIcon href="#settings" />
            <EditMenu />
          </XButton>
          <XButton>
            <XIcon href="#settings" />
            <XPopover modal>
              <XLabel>Popover</XLabel>
            </XPopover>
          </XButton>
          <XButton>
            <XLabel>Button</XLabel>
            <XNotification>You clicked the button.</XNotification>
          </XButton>
        </Row>
        <Row>
          <XButton skin="flat">
            <XIcon href="#home" />
            <XLabel>Button</XLabel>
          </XButton>
          <XButton skin="flat" toggled togglable>
            <XIcon href="#home" />
            <XLabel>Button</XLabel>
          </XButton>
          <XButton skin="flat" disabled>
            <XIcon href="#home" />
            <XLabel>Button</XLabel>
          </XButton>
        </Row>
        <Row>
          <XButton skin="recessed">
            <XLabel>Button</XLabel>
          </XButton>
          <XButton skin="recessed" toggled togglable>
            <XLabel>Button</XLabel>
          </XButton>
          <XButton skin="recessed" disabled>
            <XLabel>Button</XLabel>
          </XButton>
        </Row>
        <Row>
          <XButton skin="dock">
            <XIcon href="#home" />
          </XButton>
          <XButton skin="dock" toggled togglable>
            <XIcon href="#home" />
          </XButton>
          <XButton skin="dock" disabled>
            <XIcon href="#home" />
          </XButton>
        </Row>
        <Row>
          <XButton size="small" togglable>
            <XIcon href="#settings" />
            <XLabel>Small</XLabel>
          </XButton>
          <XButton togglable>
            <XIcon href="#settings" />
            <XLabel>Normal</XLabel>
          </XButton>
          <XButton size="large" togglable>
            <XIcon href="#settings" />
            <XLabel>Large</XLabel>
          </XButton>
        </Row>
      </Stack>
    </Frame>
  ),
};

export const Buttons: Story = {
  name: "Buttons",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XButtons tracking="-1">
          <XButton>
            <XIcon href="#home" />
          </XButton>
          <XButton>
            <XIcon href="#mail" />
          </XButton>
          <XButton>
            <XIcon href="#settings" />
          </XButton>
        </XButtons>
        <XButtons tracking="0">
          <XButton toggled>
            <XIcon href="#home" />
          </XButton>
          <XButton>
            <XIcon href="#mail" />
          </XButton>
          <XButton>
            <XIcon href="#settings" />
          </XButton>
        </XButtons>
        <XButtons tracking="1">
          <XButton toggled>
            <XIcon href="#text-align-left" />
          </XButton>
          <XButton>
            <XIcon href="#text-align-center" />
          </XButton>
          <XButton>
            <XIcon href="#text-align-right" />
          </XButton>
        </XButtons>

        <XButtons tracking="2">
          <XButton toggled>
            <XIcon href="#text-bold" />
          </XButton>
          <XButton>
            <XIcon href="#text-underline" />
          </XButton>
          <XButton>
            <XIcon href="#text-italic" />
          </XButton>
        </XButtons>
        <XButtons tracking="3">
          <XButton toggled>
            <XIcon href="#home" />
          </XButton>
          <XButton>
            <XIcon href="#mail" />
          </XButton>
          <XButton>
            <XIcon href="#settings" />
          </XButton>
        </XButtons>

        <XButtons tracking="1" vertical>
          <XButton toggled>
            <XIcon href="#home" />
            <XLabel>Home</XLabel>
          </XButton>
          <XButton>
            <XIcon href="#mail" />
            <XLabel>Mail</XLabel>
          </XButton>
          <XButton>
            <XIcon href="#settings" />
            <XLabel>Settings</XLabel>
          </XButton>
        </XButtons>
        <XButtons tracking="1">
          <XButton skin="flat" toggled>
            <XIcon href="#home" />
          </XButton>
          <XButton skin="flat">
            <XIcon href="#mail" />
          </XButton>
          <XButton skin="flat">
            <XIcon href="#settings" />
          </XButton>
        </XButtons>
        <XButtons tracking="1">
          <XButton skin="recessed" toggled>
            <XLabel>Inbox</XLabel>
          </XButton>
          <XButton skin="recessed">
            <XLabel>Sent</XLabel>
          </XButton>
          <XButton skin="recessed">
            <XLabel>Drafts</XLabel>
          </XButton>
        </XButtons>
        <XButtons tracking="1">
          <XButton skin="dock" toggled>
            <XIcon href="#home" />
          </XButton>
          <XButton skin="dock">
            <XIcon href="#wrench" />
          </XButton>
          <XButton skin="dock">
            <XIcon href="#bookmark" />
          </XButton>
        </XButtons>
      </Stack>
    </Frame>
  ),
};

export const Card: Story = {
  name: "Card",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XCard />
        <XCard>
          <h3>Card title</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae aliquet lacus. In sed nulla eu
            lorem commodo sollicitudin.
          </p>
          <footer>Sample footer</footer>
        </XCard>
        <XCard>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <p>
            Sample paragraph with <strong>strong text</strong>, <em>emphasized text</em>, <mark>marked text</mark>,{" "}
            <a href="https://boxy-svg.com">link</a> and <code>code</code>.
          </p>
          <blockquote>Sample blockquote</blockquote>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Visits</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2025</td>
                <td>237.452</td>
              </tr>
              <tr>
                <td>2024</td>
                <td>193.433</td>
              </tr>
              <tr>
                <td>2023</td>
                <td>140.192</td>
              </tr>
            </tbody>
          </table>
        </XCard>
      </Stack>
    </Frame>
  ),
};

export const Checkbox: Story = {
  name: "Checkbox",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XCheckbox />
        <XCheckbox toggled />
        <XCheckbox mixed />
        <XCheckbox toggled mixed />
        <XCheckbox toggled disabled />
        <XCheckbox>
          <XLabel>This is sample description</XLabel>
        </XCheckbox>
        <XCheckbox>
          <XLabel>
            <strong>Option</strong>
          </XLabel>
          <XLabel>
            Description with a <a href="#">link</a>.
          </XLabel>
        </XCheckbox>
        <Row>
          <XCheckbox size="small" />
          <XCheckbox />
          <XCheckbox size="large" />
        </Row>
      </Stack>
    </Frame>
  ),
};

export const ColorInput: Story = {
  name: "ColorInput",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XColorInput value="#bada55" />
        <XColorInput value="#bada55aa" alpha />
        <XColorInput value="#bada55" size="small" />
        <XColorInput value="#bada55" disabled />
      </Stack>
    </Frame>
  ),
};

export const ColorPicker: Story = {
  name: "ColorPicker",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Row>
        <XColorPicker value="#bada55" />
        <XColorPicker value="#bada55" alpha />
        <XColorPicker value="#bada55" size="small" />
      </Row>
    </Frame>
  ),
};

export const ColorSelect: Story = {
  name: "ColorSelect",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Row>
        <XColorSelect value="#bada55" />
        <XColorSelect value="#bada55aa" alpha />
        <XColorSelect value="color(display-p3 1 0 0)" />
        <XColorSelect value="#bada55" disabled />
        <XColorSelect value="#bada55" size="small" />
        <XColorSelect value="#bada55" size="large" />
      </Row>
    </Frame>
  ),
};

export const ContextMenu: Story = {
  name: "ContextMenu",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XCard>
          <XLabel>Right-click to open the context menu.</XLabel>
          <XContextMenu>
            <XMenu>
              <XMenuItem>
                <XLabel>Undo</XLabel>
              </XMenuItem>
              <XMenuItem>
                <XLabel>Redo</XLabel>
              </XMenuItem>
              <hr />
              <XMenuItem>
                <XLabel>Cut</XLabel>
              </XMenuItem>
              <XMenuItem>
                <XLabel>Copy</XLabel>
              </XMenuItem>
              <XMenuItem>
                <XLabel>Paste</XLabel>
              </XMenuItem>
            </XMenu>
          </XContextMenu>
        </XCard>
        <XCard>
          <XLabel>Right-click to open the context menu.</XLabel>
          <XContextMenu>
            <EditMenu />
          </XContextMenu>
        </XCard>
        <XCard>
          <XLabel>Right-click to open the context menu.</XLabel>
          <XContextMenu>
            <XMenu>
              <XMenuItem>
                <XIcon href="#history-undo" />
                <XLabel>Undo</XLabel>
                <XShortcut value="Control+Z" />
              </XMenuItem>
              <XMenuItem>
                <XIcon href="#history-redo" />
                <XLabel>Redo</XLabel>
                <XShortcut value="Control+Shift+Z" />
              </XMenuItem>
              <hr />
              <XMenuItem>
                <XIcon />
                <XLabel>Select</XLabel>
                <XMenu>
                  <XMenuItem value="selectAll">
                    <XLabel>Select all</XLabel>
                    <XShortcut value="Control+A" />
                  </XMenuItem>
                  <XMenuItem value="deselectAll">
                    <XLabel>Deselect all</XLabel>
                    <XShortcut value="Control+Shift+A" />
                  </XMenuItem>
                </XMenu>
              </XMenuItem>
            </XMenu>
          </XContextMenu>
        </XCard>
      </Stack>
    </Frame>
  ),
};

export const DocTab: Story = {
  name: "DocTab",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XDocTabs>
        <XDocTab selected>
          <XLabel>Document 1</XLabel>
        </XDocTab>
        <XDocTab>
          <XLabel>Document 2</XLabel>
        </XDocTab>
      </XDocTabs>
    </Frame>
  ),
};

export const DocTabs: Story = {
  name: "DocTabs",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XDocTabs size="small">
          <XDocTab selected>
            <XLabel>Document 1</XLabel>
          </XDocTab>
          <XDocTab>
            <XLabel>Document 2</XLabel>
          </XDocTab>
        </XDocTabs>
        <XDocTabs style={{ margin: "20px 0" }}>
          <XDocTab selected>
            <XLabel>Document 1</XLabel>
          </XDocTab>
          <XDocTab>
            <XLabel>Document 2</XLabel>
          </XDocTab>
        </XDocTabs>
        <XDocTabs size="large">
          <XDocTab selected>
            <XLabel>Document 1</XLabel>
          </XDocTab>
          <XDocTab>
            <XLabel>Document 2</XLabel>
          </XDocTab>
        </XDocTabs>
      </Stack>
    </Frame>
  ),
};

export const Drawer: Story = {
  name: "Drawer",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <Row>
          <XButton>
            <XLabel>Open</XLabel>
            <XDrawer />
          </XButton>
          <XButton>
            <XLabel>Open</XLabel>
            <XDrawer position="right" />
          </XButton>
          <XButton>
            <XLabel>Open</XLabel>
            <XDrawer position="top" />
          </XButton>
          <XButton>
            <XLabel>Open</XLabel>
            <XDrawer position="bottom" />
          </XButton>
        </Row>
        <XButton>
          <XLabel>Open</XLabel>
          <XDrawer id="drawer" manual>
            <XButton id="close-button" style={{ margin: "10px auto" }}>
              <XLabel>Close this drawer</XLabel>
            </XButton>
          </XDrawer>
        </XButton>
        <XButton>
          <XLabel>Open</XLabel>
          <XDrawer
            position="left"
            style={{
              color: "white",
              background: "#009788",
              "border-width": "1px",
              "border-style": "solid",
              "border-color": "#326960",
              "border-radius": "0 15px 15px 0",
              opacity: "0.85",
            }}
          />
        </XButton>
      </Stack>
    </Frame>
  ),
};

export const Dialog: Story = {
  name: "Dialog",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XDialog open style={{ position: "static", margin: "0", width: "260px" }}>
        <XLabel>Dialog content</XLabel>
        <XButton>
          <XLabel>Close</XLabel>
        </XButton>
      </XDialog>
    </Frame>
  ),
};

export const Icon: Story = {
  name: "Icon",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XIcon href="#mail" />
        <XIcon href="/node_modules/xel/icons/material.svg#folder" />
        <XIcon href="https://xel-toolkit.org/icons/fluent.svg#lock" />
        <XBox style={{ gap: "10px" }}>
          <XIcon href="#mail" size="small" />
          <XIcon href="#mail" />
          <XIcon href="#mail" size="large" />
        </XBox>
      </Stack>
    </Frame>
  ),
};

export const Input: Story = {
  name: "Input",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XInput />
        <XInput value="Sample text" />
        <XInput>
          <XIcon href="#person" />
          <XLabel>Name</XLabel>
        </XInput>
        <XInput value="There is a typo heree" spellcheck />
        <XInput value="Sample value" readonly />
        <XInput value="Sample value" disabled />
        <XInput required>
          <XLabel>Last name</XLabel>
        </XInput>
        <XInput value="user" minlength="3" maxlength="10">
          <XLabel>Login</XLabel>
        </XInput>
        <XInput type="text" value="Sample text" />
        <XInput type="email" value="contact@boxy-svg.com">
          <XIcon href="#mail" />
        </XInput>
        <XInput type="password" minlength="4" maxlength="12" value="abc123">
          <XIcon href="#lock" />
        </XInput>
        <XInput type="url" value="https://boxy-svg.com">
          <XIcon href="#earth" />
        </XInput>
        <XInput type="color" value="#bada55">
          <XIcon href="#color-palette" />
        </XInput>
        <XInput>
          <XIcon href="#search" />
          <XLabel>Search</XLabel>
        </XInput>
        <Row>
          <XInput size="small">
            <XIcon href="#search" />
            <XLabel>Small</XLabel>
          </XInput>
          <XInput>
            <XIcon href="#search" />
            <XLabel>Normal</XLabel>
          </XInput>
          <XInput size="large">
            <XIcon href="#search" />
            <XLabel>Large</XLabel>
          </XInput>
        </Row>
      </Stack>
    </Frame>
  ),
};

export const Label: Story = {
  name: "Label",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XLabel>Name</XLabel>
        <XLabel level="1">Level 1</XLabel>
        <XLabel level="2">Level 2</XLabel>
        <XLabel level="3">Level 3</XLabel>
        <XLabel>Level 4</XLabel>
        <XButton>
          <XLabel>Button</XLabel>
        </XButton>
        <XInput>
          <XLabel>Name</XLabel>
        </XInput>
        <XCheckbox>
          <XLabel>Show tooltips</XLabel>
        </XCheckbox>
      </Stack>
    </Frame>
  ),
};

export const Menu: Story = {
  name: "Menu",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XMenu opened>
        <XMenuItem>
          <XIcon href="#history-undo" />
          <XLabel>Undo</XLabel>
          <XShortcut value="Control+Z" />
        </XMenuItem>
        <XMenuItem>
          <XIcon href="#history-redo" />
          <XLabel>Redo</XLabel>
          <XShortcut value="Control+Shift+Z" />
        </XMenuItem>
        <hr />
        <XMenuItem>
          <XIcon href="#cut" />
          <XLabel>Cut</XLabel>
          <XShortcut value="Control+X" />
        </XMenuItem>
        <XMenuItem>
          <XIcon href="#copy" />
          <XLabel>Copy</XLabel>
          <XShortcut value="Control+C" />
        </XMenuItem>
        <XMenuItem>
          <XIcon href="#paste" />
          <XLabel>Paste</XLabel>
          <XShortcut value="Control+V" />
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
      <Stack>
        <XMenubar>
          <XMenuItem>
            <XLabel>File</XLabel>
            <XMenu>
              <XMenuItem>
                <XLabel>New</XLabel>
                <XShortcut value="Control+N" />
              </XMenuItem>
              <XMenuItem>
                <XLabel>Open...</XLabel>
                <XShortcut value="Control+O" />
              </XMenuItem>
            </XMenu>
          </XMenuItem>
          <XMenuItem>
            <XLabel>Edit</XLabel>
            <EditMenu />
          </XMenuItem>
        </XMenubar>
        <XMenubar>
          <XMenuItem>
            <XLabel>File</XLabel>
            <XMenu>
              <XMenuItem>
                <XLabel>New</XLabel>
                <XShortcut value="Control+N" />
              </XMenuItem>
              <XMenuItem>
                <XLabel>Open...</XLabel>
                <XShortcut value="Control+O" />
              </XMenuItem>
            </XMenu>
          </XMenuItem>
          <XMenuItem>
            <XLabel>Edit</XLabel>
            <EditMenu />
          </XMenuItem>
          <XMenuItem>
            <XLabel>View</XLabel>
          </XMenuItem>
          <XMenuItem>
            <XLabel>Help</XLabel>
          </XMenuItem>
        </XMenubar>
      </Stack>
    </Frame>
  ),
};

export const MenuItem: Story = {
  name: "MenuItem",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XMenu opened>
          <XMenuItem>
            <XLabel>Copy</XLabel>
          </XMenuItem>
        </XMenu>
        <XMenu opened>
          <XMenuItem>
            <XIcon href="#copy" />
            <XLabel>Copy</XLabel>
          </XMenuItem>
        </XMenu>
        <XMenu opened>
          <XMenuItem>
            <XIcon href="#copy" />
            <XLabel>Copy</XLabel>
            <XShortcut value="Control+C" />
          </XMenuItem>
        </XMenu>
        <XMenu opened>
          <XMenuItem disabled>
            <XIcon href="#copy" />
            <XLabel>Copy</XLabel>
          </XMenuItem>
        </XMenu>
        <XMenu opened>
          <XMenuItem toggled>
            <XLabel>Inspector</XLabel>
          </XMenuItem>
        </XMenu>
        <XMenu opened>
          <XMenuItem togglable toggled>
            <XLabel>Show Grid</XLabel>
          </XMenuItem>
          <XMenuItem togglable>
            <XLabel>Show Guides</XLabel>
          </XMenuItem>
        </XMenu>
      </Stack>
    </Frame>
  ),
};

export const Message: Story = {
  name: "Message",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XMessage href="#about" />
        <XMessage href="#slogan-1" />
        <XMessage href="#unread-emails" args="count:4, date:2024-05-01" />
        <XMessage href="#source-code" autocapitalize />
        <XMessage>Scoped message fallback</XMessage>
      </Stack>
    </Frame>
  ),
};

export const Nav: Story = {
  name: "Nav",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XNav>
          <XNavItem value="first" toggled>
            <XIcon href="#mail" />
            <XLabel>First page</XLabel>
          </XNavItem>
          <XNavItem value="second">
            <XIcon href="#send" />
            <XLabel>Second page</XLabel>
          </XNavItem>
          <XNavItem value="third">
            <XIcon href="#wrench" />
            <XLabel>Third page</XLabel>
          </XNavItem>
        </XNav>
        <XNav>
          <XNavItem toggled>
            <XIcon href="#mail" />
          </XNavItem>
          <XNavItem>
            <XIcon href="#send" />
          </XNavItem>
          <XNavItem>
            <XIcon href="#wrench" />
          </XNavItem>
        </XNav>
        <XNav>
          <XNavItem toggled>
            <XLabel>First page</XLabel>
          </XNavItem>
          <XNavItem>
            <XLabel>Second page</XLabel>
          </XNavItem>
          <XNavItem>
            <XLabel>Third page</XLabel>
          </XNavItem>
        </XNav>
        <XNav>
          <XNavItem toggled>
            <XIcon href="#mail" />
            <XLabel>First page</XLabel>
          </XNavItem>
          <XNavItem>
            <XIcon href="#send" />
            <XLabel>Second page</XLabel>
            <XNav>
              <XNavItem>
                <XIcon href="#mail" />
                <XLabel>First subpage</XLabel>
              </XNavItem>
              <XNavItem>
                <XIcon href="#send" />
                <XLabel>Second subpage</XLabel>
              </XNavItem>
            </XNav>
          </XNavItem>
        </XNav>
      </Stack>
    </Frame>
  ),
};

export const NavItem: Story = {
  name: "NavItem",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XNav>
          <XNavItem>
            <XIcon href="#home" />
            <XLabel>Home</XLabel>
          </XNavItem>
        </XNav>
        <XNav>
          <XNavItem>
            <XIcon href="#home" />
          </XNavItem>
        </XNav>
        <XNav>
          <XNavItem>
            <XLabel>Home</XLabel>
          </XNavItem>
        </XNav>
        <XNav>
          <XNavItem toggled>
            <XIcon href="#home" />
            <XLabel>Home</XLabel>
          </XNavItem>
        </XNav>
        <XNav>
          <XNavItem>
            <XIcon href="#home" />
            <XLabel>Home</XLabel>
            <XNav>
              <XNavItem>
                <XIcon href="#search" />
                <XLabel>Search</XLabel>
              </XNavItem>
              <XNavItem>
                <XIcon href="#tune" />
                <XLabel>Settings</XLabel>
              </XNavItem>
            </XNav>
          </XNavItem>
        </XNav>
        <XNav>
          <a href="https://xel-toolkit.org" target="_blank">
            <XNavItem>
              <XIcon href="#home" />
              <XLabel>Home</XLabel>
              <XIcon href="#open" />
            </XNavItem>
          </a>
        </XNav>
      </Stack>
    </Frame>
  ),
};

export const Notification: Story = {
  name: "Notification",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XButton>
          <XLabel>Open notification</XLabel>
          <XNotification>
            Sample notification text with a{" "}
            <a href="https://xel-toolkit.org" target="_blank">
              link
            </a>
            .
          </XNotification>
        </XButton>
        <XButton>
          <XLabel>Open notification</XLabel>
          <XNotification timeout="2000">This notification will disappear after 2000 miliseconds.</XNotification>
        </XButton>
        <XNotification id="notification" timeout="800" />
        <XInput id="input">
          <XLabel>Enter text here</XLabel>
        </XInput>
      </Stack>
    </Frame>
  ),
};

export const NumberInput: Story = {
  name: "NumberInput",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XNumberInput value="0" />
        <XNumberInput value="0">
          <XStepper />
        </XNumberInput>
        <XNumberInput value="499" prefix="$" min="0">
          <XStepper />
        </XNumberInput>
        <XNumberInput value="100" suffix=" px">
          <XStepper />
        </XNumberInput>
        <XNumberInput value="0" min="0" max="100">
          <XStepper />
        </XNumberInput>
        <XNumberInput>
          <XLabel>Width</XLabel>
          <XStepper />
        </XNumberInput>
        <XNumberInput value="0.50" min="0" max="1" step="0.01">
          <XStepper />
        </XNumberInput>
        <XNumberInput value="0" disabled>
          <XStepper />
        </XNumberInput>
        <XNumberInput size="small">
          <XLabel>Small</XLabel>
          <XStepper />
        </XNumberInput>
        <XNumberInput style={{ margin: "10px 0" }}>
          <XLabel>Normal</XLabel>
          <XStepper />
        </XNumberInput>
        <XNumberInput size="large">
          <XLabel>Large</XLabel>
          <XStepper />
        </XNumberInput>
      </Stack>
    </Frame>
  ),
};

export const Pager: Story = {
  name: "Pager",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XPager value="1" max="5" />
        <XPager value="1" max="5" controls="first last prev next nth" />
        <XPager value="2" max="5" controls="prev next" />
        <XPager max="200" />
        <XPager href="https://boxy-svg.com/ideas" />
      </Stack>
    </Frame>
  ),
};

export const Popover: Story = {
  name: "Popover",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Row>
        <XButton>
          <XIcon href="#settings" />
          <XPopover modal>
            <XLabel>Popover</XLabel>
          </XPopover>
        </XButton>
        <XButton>
          <XLabel>Menu</XLabel>
          <XPopover>
            <EditMenu />
          </XPopover>
        </XButton>
      </Row>
    </Frame>
  ),
};

export const Progressbar: Story = {
  name: "Progressbar",
  tags: ["visual"],
  render: () => (
    <Frame>
      <div class="xel-story-stack" style={{ width: "280px" }}>
        <XProgressbar />
        <XProgressbar value="0.5" />
        <XProgressbar value="50" max="100" />
        <XProgressbar value="0" />
        <XProgressbar disabled />
        <XProgressbar value="0.5" size="small" />
        <XProgressbar value="0.5" style={{ margin: "20px 0" }} />
        <XProgressbar value="0.5" size="large" />
      </div>
    </Frame>
  ),
};

export const Radio: Story = {
  name: "Radio",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XRadio />
        <XRadio toggled />
        <XRadio toggled mixed />
        <XRadio disabled />
        <XRadio toggled disabled />
        <XRadio>
          <XLabel>Sample label</XLabel>
        </XRadio>
        <XRadio>
          <XLabel>
            <strong>Switch</strong>
          </XLabel>
          <XLabel>
            Description with a <a href="#">link</a>
          </XLabel>
        </XRadio>
        <Row>
          <XRadio size="small" />
          <XRadio />
          <XRadio size="large" />
        </Row>
      </Stack>
    </Frame>
  ),
};

export const Radios: Story = {
  name: "Radios",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XRadios>
          <XRadio toggled>
            <XLabel>First option</XLabel>
          </XRadio>
          <XRadio>
            <XLabel>Second option</XLabel>
          </XRadio>
        </XRadios>
        <XRadios>
          <XRadio>
            <XLabel>First option</XLabel>
          </XRadio>
          <XRadio>
            <XLabel>Second option</XLabel>
          </XRadio>
          <XRadio toggled mixed>
            <XLabel>Mixed option</XLabel>
          </XRadio>
          <XRadio disabled>
            <XLabel>Disabled option</XLabel>
          </XRadio>
        </XRadios>
      </Stack>
    </Frame>
  ),
};

export const Select: Story = {
  name: "Select",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XSelect>
          <CountryMenu />
        </XSelect>
        <XSelect>
          <XMenu>
            <XMenuItem value="car">
              <XIcon href="#vehicle-car" />
            </XMenuItem>
            <XMenuItem value="bus">
              <XIcon href="#vehicle-bus" />
            </XMenuItem>
            <XMenuItem value="bicycle">
              <XIcon href="#vehicle-bicycle" />
            </XMenuItem>
            <XMenuItem value="boat" toggled>
              <XIcon href="#vehicle-boat" />
            </XMenuItem>
          </XMenu>
        </XSelect>
        <XSelect>
          <VehicleMenu />
        </XSelect>
        <XSelect compact>
          <XTooltip>Vehicle</XTooltip>
          <VehicleMenu />
        </XSelect>
        <XSelect>
          <ColorMenu />
        </XSelect>
        <XSelect style={{ width: "125px" }}>
          <XMenu>
            <XMenuItem value="car">
              <XIcon href="#vehicle-car" />
              <XLabel>Car</XLabel>
            </XMenuItem>
            <XMenuItem value="bicycle">
              <XIcon href="#vehicle-bicycle" />
              <XLabel>Bicycle</XLabel>
            </XMenuItem>
          </XMenu>
        </XSelect>
        <XSelect>
          <XMenu>
            <XMenuItem value="car" toggled>
              <XIcon href="#vehicle-car" />
              <XLabel>Car</XLabel>
            </XMenuItem>
          </XMenu>
        </XSelect>
        <XSelect disabled>
          <VehicleMenu />
        </XSelect>
        <XSelect>
          <XMenu>
            <XMenuItem value="car" toggled>
              <XIcon href="#vehicle-car" />
              <XLabel>Car</XLabel>
            </XMenuItem>
            <XMenuItem value="bicycle" disabled>
              <XIcon href="#vehicle-bicycle" />
              <XLabel>Bicycle</XLabel>
            </XMenuItem>
          </XMenu>
        </XSelect>
        <XSelect style={{ width: "100%" }}>
          <VehicleMenu />
        </XSelect>
        <XSelect style={{ width: "150px" }}>
          <XMenu>
            <XMenuItem value="car" toggled>
              <XIcon href="#vehicle-car" />
              <XLabel>Car - shortest route</XLabel>
            </XMenuItem>
            <XMenuItem value="bicycle">
              <XIcon href="#vehicle-bicycle" />
              <XLabel>Bicycle - scenic route through the park</XLabel>
            </XMenuItem>
          </XMenu>
        </XSelect>
        <Row>
          <XSelect size="small">
            <XMenu>
              <XMenuItem value="one" toggled>
                <XLabel>Item 1</XLabel>
              </XMenuItem>
              <XMenuItem value="two">
                <XLabel>Item 2</XLabel>
              </XMenuItem>
            </XMenu>
          </XSelect>
          <XSelect>
            <XMenu>
              <XMenuItem value="one" toggled>
                <XLabel>Item 1</XLabel>
              </XMenuItem>
              <XMenuItem value="two">
                <XLabel>Item 2</XLabel>
              </XMenuItem>
            </XMenu>
          </XSelect>
          <XSelect size="large">
            <XMenu>
              <XMenuItem value="one" toggled>
                <XLabel>Item 1</XLabel>
              </XMenuItem>
              <XMenuItem value="two">
                <XLabel>Item 2</XLabel>
              </XMenuItem>
            </XMenu>
          </XSelect>
        </Row>
      </Stack>
    </Frame>
  ),
};

export const Shortcut: Story = {
  name: "Shortcut",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XShortcut value="Control+C" />
        <XShortcut value="Control+Alt+Shift+P" />
      </Stack>
    </Frame>
  ),
};

export const Slider: Story = {
  name: "Slider",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XSlider value="10" />
        <XSlider value="10" min="-50" max="50" />
        <XSlider value="10" step="10" />
        <XSlider value="10" step="10" ticks />
        <XSlider value="20 80" />
        <XSlider value="20 80" step="5" />
        <XSlider disabled value="10" />
        <XSlider value="10" size="small" />
        <XSlider value="10" style={{ margin: "20px 0" }} />
        <XSlider value="10" size="large" />
        <XBox>
          <XSlider min="0" max="100" value="100" style={{ flex: 1 }} />
          <XNumberInput value="100" min="0" max="100" suffix="%" style={{ "margin-left": "12px", width: "70px" }}>
            <XStepper />
          </XNumberInput>
        </XBox>
      </Stack>
    </Frame>
  ),
};

export const Stepper: Story = {
  name: "Stepper",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Row>
        <XStepper />
        <XStepper disabled />
        <XStepper disabled="increment" style={{ margin: "5px 0" }} />
        <XStepper disabled="decrement" />
      </Row>
    </Frame>
  ),
};

export const Swatch: Story = {
  name: "Swatch",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Row>
        <XSwatch />
        <XSwatch value="#bada55" />
        <XSwatch value="color(display-p3 1 0 0)" />
        <XSwatch value="rgb(100% 0% 0% / 30%)" />
        <XBox style={{ gap: "10px" }}>
          <XSwatch value="#bada55" size="small" />
          <XSwatch value="#bada55" />
          <XSwatch value="#bada55" size="large" />
        </XBox>
      </Row>
    </Frame>
  ),
};

export const Switch: Story = {
  name: "Switch",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XSwitch />
        <XSwitch toggled />
        <XSwitch mixed />
        <XSwitch toggled mixed />
        <XSwitch disabled />
        <XSwitch toggled disabled />
        <XSwitch>
          <XLabel>Switch</XLabel>
        </XSwitch>
        <XSwitch>
          <XLabel>
            <strong>Switch</strong>
          </XLabel>
          <XLabel>
            Description with a <a href="#">link</a>
          </XLabel>
        </XSwitch>
        <Row>
          <XSwitch size="small" />
          <XSwitch />
          <XSwitch size="large" />
        </Row>
      </Stack>
    </Frame>
  ),
};

export const Tab: Story = {
  name: "Tab",
  tags: ["visual"],
  render: () => (
    <Frame>
      <XTabs>
        <XTab toggled>
          <XIcon href="#mail" />
          <XLabel>Item one</XLabel>
        </XTab>
        <XTab>
          <XIcon href="#send" />
          <XLabel>Item two</XLabel>
        </XTab>
      </XTabs>
    </Frame>
  ),
};

export const Tabs: Story = {
  name: "Tabs",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XTabs>
          <XTab toggled>
            <XIcon href="#mail" />
            <XLabel>Item one</XLabel>
          </XTab>
          <XTab>
            <XIcon href="#send" />
            <XLabel>Item two</XLabel>
          </XTab>
          <XTab>
            <XIcon href="#wrench" />
            <XLabel>Item three</XLabel>
          </XTab>
        </XTabs>
        <XTabs>
          <XTab toggled>
            <XIcon href="#mail" />
          </XTab>
          <XTab>
            <XIcon href="#send" />
          </XTab>
          <XTab>
            <XIcon href="#wrench" />
          </XTab>
        </XTabs>
        <XTabs>
          <XTab toggled>
            <XLabel>Item one</XLabel>
          </XTab>
          <XTab>
            <XLabel>Item two</XLabel>
          </XTab>
        </XTabs>
      </Stack>
    </Frame>
  ),
};

export const Tag: Story = {
  name: "Tag",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Row>
        <XTag>
          <XLabel>Tag</XLabel>
        </XTag>
        <XTag>
          <XIcon href="#bookmark" />
          <XLabel>Tag</XLabel>
        </XTag>
        <XTag>
          <XSwatch value="#f44336" />
          <XLabel>Tag</XLabel>
        </XTag>
        <XTag toggled>
          <XIcon href="#bookmark" />
          <XLabel>Tag</XLabel>
        </XTag>
        <XTag disabled>
          <XIcon href="#bookmark" />
          <XLabel>Tag</XLabel>
        </XTag>
        <XTag>
          <XLabel slot="scope">OS</XLabel>
          <XLabel>Linux</XLabel>
        </XTag>
        <XTag value="red" style={{ color: "white", border: "none", background: "#d02b2b" }}>
          <XLabel>Red</XLabel>
        </XTag>
        <XTag value="green" style={{ color: "white", border: "none", background: "#62a81c" }}>
          <XLabel>Green</XLabel>
        </XTag>
        <XTag value="blue" style={{ color: "white", border: "none", background: "#3168c6" }}>
          <XLabel>Blue</XLabel>
        </XTag>
      </Row>
    </Frame>
  ),
};

export const Tags: Story = {
  name: "Tags",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XTags>
          <XTag value="tag-1">
            <XLabel>Tag 1</XLabel>
          </XTag>
          <XTag value="tag-2">
            <XLabel>Tag 2</XLabel>
          </XTag>
          <XTag value="tag-3">
            <XLabel>Tag 3</XLabel>
          </XTag>
        </XTags>
        <XTags prefix="@">
          <XTag value="car">
            <XIcon href="#vehicle-car" />
            <XLabel>Car</XLabel>
          </XTag>
          <XTag value="airplane">
            <XIcon href="#vehicle-airplane" />
            <XLabel>Plane</XLabel>
          </XTag>
          <XTag value="boat">
            <XIcon href="#vehicle-boat" />
            <XLabel>Boat</XLabel>
          </XTag>
        </XTags>
        <XTags>
          <XTag value="red">
            <XSwatch value="#fc7b7e" />
            <XLabel>Red</XLabel>
          </XTag>
          <XTag value="green">
            <XSwatch value="#83e283" />
            <XLabel>Green</XLabel>
          </XTag>
          <XTag value="yellow">
            <XSwatch value="#fde05b" />
            <XLabel>Yellow</XLabel>
          </XTag>
        </XTags>
        <XTags>
          <XTag>
            <XLabel slot="scope">OS</XLabel>
            <XLabel>Linux</XLabel>
          </XTag>
          <XTag>
            <XLabel slot="scope">OS</XLabel>
            <XLabel>macOS</XLabel>
          </XTag>
          <XTag>
            <XLabel slot="scope">OS</XLabel>
            <XLabel>Windows</XLabel>
          </XTag>
        </XTags>
      </Stack>
    </Frame>
  ),
};

export const TagsInput: Story = {
  name: "TagsInput",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XTagsInput>
          <XTag value="tag-1">
            <XLabel>Tag 1</XLabel>
          </XTag>
          <XTag value="tag-2">
            <XLabel>Tag 2</XLabel>
          </XTag>
          <XTag value="tag-3">
            <XLabel>Tag 3</XLabel>
          </XTag>
        </XTagsInput>
        <XTagsInput>
          <XTag value="car">
            <XIcon href="#vehicle-car" />
            <XLabel>Car</XLabel>
          </XTag>
          <XTag value="airplane">
            <XIcon href="#vehicle-airplane" />
            <XLabel>Plane</XLabel>
          </XTag>
          <XTag value="boat">
            <XIcon href="#vehicle-boat" />
            <XLabel>Boat</XLabel>
          </XTag>
        </XTagsInput>
        <XTagsInput>
          <XTag value="red">
            <XSwatch value="#fc7b7e" />
            <XLabel>Red</XLabel>
          </XTag>
          <XTag value="green">
            <XSwatch value="#83e283" />
            <XLabel>Green</XLabel>
          </XTag>
          <XTag value="yellow">
            <XSwatch value="#fde05b" />
            <XLabel>Yellow</XLabel>
          </XTag>
        </XTagsInput>
        <XTagsInput>
          <XLabel>Enter your tags</XLabel>
        </XTagsInput>
        <XTagsInput disabled>
          <XTag value="tag-1">
            <XLabel>Tag 1</XLabel>
          </XTag>
          <XTag value="tag-2">
            <XLabel>Tag 2</XLabel>
          </XTag>
        </XTagsInput>
        <XTagsInput size="small">
          <XTag value="tag-1"><XLabel>Tag 1</XLabel></XTag>
          <XTag value="tag-2"><XLabel>Tag 2</XLabel></XTag>
        </XTagsInput>
        <XTagsInput style={{ margin: "12px 0" }}>
          <XTag value="tag-1"><XLabel>Tag 1</XLabel></XTag>
          <XTag value="tag-2"><XLabel>Tag 2</XLabel></XTag>
        </XTagsInput>
        <XTagsInput size="large">
          <XTag value="tag-1"><XLabel>Tag 1</XLabel></XTag>
          <XTag value="tag-2"><XLabel>Tag 2</XLabel></XTag>
        </XTagsInput>
      </Stack>
    </Frame>
  ),
};

export const TextEditor: Story = {
  name: "TextEditor",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XTextEditor />
        <XTextEditor value="Sample text" />
        <XTextEditor>
          <XLabel>Name</XLabel>
        </XTextEditor>
        <XTextEditor value="There is a typo heree" spellcheck />
        <XTextEditor value="Sample value" disabled />
        <XTextEditor required>
          <XLabel>Last name</XLabel>
        </XTextEditor>
      </Stack>
    </Frame>
  ),
};

export const Throbber: Story = {
  name: "Throbber",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <XThrobber />
        <XBox style={{ gap: "10px" }}>
          <XThrobber size="small" />
          <XThrobber />
          <XThrobber size="large" />
        </XBox>
      </Stack>
    </Frame>
  ),
};

export const Titlebar: Story = {
  name: "Titlebar",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Stack>
        <div class="xel-story-titlebar-window">
          <XTitlebar>
            <XLabel>About</XLabel>
          </XTitlebar>
          <div class="xel-story-titlebar-window-content">Window content</div>
        </div>
        <div class="xel-story-titlebar-window">
          <XTitlebar>
            <XBox>
              <XIcon href="#document" />
              <XLabel>Untilted.svg</XLabel>
            </XBox>
          </XTitlebar>
          <div class="xel-story-titlebar-window-content">Window content</div>
        </div>
        <div class="xel-story-titlebar-window">
          <XTitlebar maximized>
            <XLabel>About</XLabel>
          </XTitlebar>
          <div class="xel-story-titlebar-window-content">Maximized state</div>
        </div>
        <div class="xel-story-titlebar-window">
          <XTitlebar maximized>
            <XBox>
              <XIcon href="#document" />
              <XLabel>Untilted.svg</XLabel>
            </XBox>
          </XTitlebar>
          <div class="xel-story-titlebar-window-content">Maximized state</div>
        </div>
      </Stack>
    </Frame>
  ),
};

export const Tooltip: Story = {
  name: "Tooltip",
  tags: ["visual"],
  render: () => (
    <Frame>
      <Row>
        <XButton>
          <XIcon href="#refresh" />
          <XTooltip href="#about">Refresh</XTooltip>
        </XButton>
        <XButtons tracking="1">
          <XButton toggled>
            <XIcon href="#text-align-left" />
            <XTooltip>Align left</XTooltip>
          </XButton>
          <XButton>
            <XIcon href="#text-align-center" />
            <XTooltip>Align center</XTooltip>
          </XButton>
          <XButton>
            <XIcon href="#text-align-right" />
            <XTooltip>Align right</XTooltip>
          </XButton>
        </XButtons>
        <XButton>
          <XIcon href="#refresh" />
          <XTooltip href="#about" style={{ "--align": "top" }}>
            Refresh
          </XTooltip>
        </XButton>
        <XButton>
          <XIcon href="#refresh" />
          <XTooltip href="#about" style={{ "--align": "left" }}>
            Refresh
          </XTooltip>
        </XButton>
        <XButton>
          <XIcon href="#refresh" />
          <XTooltip href="#about" style={{ "--align": "right" }}>
            Refresh
          </XTooltip>
        </XButton>
      </Row>
    </Frame>
  ),
};
