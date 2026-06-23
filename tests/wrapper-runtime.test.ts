import { expect, test } from "@playwright/test";

test("renders wrappers as Xel custom elements", async ({ page }) => {
  await page.goto("/tests/fixtures/wrapper-app.html");

  await expect(page.locator("x-button#event-button")).toBeVisible();
  await expect(page.locator("x-label", { hasText: "Toggle event" })).toBeVisible();
  await expect(page.locator("x-input#property-input")).toBeVisible();
});

test("forwards refs to the underlying custom element", async ({ page }) => {
  await page.goto("/tests/fixtures/wrapper-app.html");

  await expect(page.locator("#ref-local-name")).toHaveText("x-input");
  const refLocalName = await page.evaluate(() => window.xelSolidInputRef?.localName);

  expect(refLocalName).toBe("x-input");
});

test("normalizes false boolean props by removing attributes", async ({ page }) => {
  await page.goto("/tests/fixtures/wrapper-app.html");

  const button = page.locator("x-button#boolean-button");

  await expect(button).not.toHaveAttribute("disabled", "");
  await page.locator("#disable-button").click();
  await expect(button).toHaveAttribute("disabled", "");
  await page.locator("#enable-button").click();
  await expect(button).not.toHaveAttribute("disabled", "");
});

test("binds custom Xel event props", async ({ page }) => {
  await page.goto("/tests/fixtures/wrapper-app.html");

  await page.locator("x-button#event-button").dispatchEvent("toggle");
  await expect(page.locator("#event-count")).toHaveText("1");
});

test("assigns rich values through the properties prop", async ({ page }) => {
  await page.goto("/tests/fixtures/wrapper-app.html");

  await expect(page.locator("x-input#property-input")).toHaveJSProperty("value", "initial");
  await page.locator("#change-property").click();
  await expect(page.locator("x-input#property-input")).toHaveJSProperty("value", "changed");
});

test("binds the broader Xel custom event prop set", async ({ page }) => {
  await page.goto("/tests/fixtures/wrapper-app.html");

  await page.locator("x-accordion#extra-event-accordion").dispatchEvent("expand");
  await page.locator("x-accordion#extra-event-accordion").dispatchEvent("collapse");
  await expect(page.locator("#extra-event-count")).toHaveText("2");
});
