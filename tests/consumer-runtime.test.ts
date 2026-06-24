import { expect, test } from "@playwright/test";

test("packed consumer gets xel setup, assets, form semantics, and dialog behavior", async ({ page }) => {
  await page.goto("/tests/fixtures/consumer/dist/index.html");

  await expect(page.locator("x-button#plain-button")).toBeVisible();
  await expect(page.locator("#theme-url")).toContainText("./xel/themes/material.css");
  await expect.poll(() => page.evaluate(() => window.Xel.theme)).toContain("./xel/themes/material.css");

  await page.waitForFunction(async () => {
    const xel = window.Xel;
    await xel.whenThemeReady;
    await xel.whenIconsReady;
    return Boolean(xel.queryIcon("#home"));
  });

  const themeId = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--theme-id"));
  expect(themeId).toContain("material");

  await page.locator("#submit-button").click();
  await expect(page.locator("#submit-count")).toHaveText("1");

  await page.locator("#reset-button").click();
  await expect(page.locator("#reset-count")).toHaveText("1");

  await page.locator("#plain-button").dispatchEvent("pointerdown", {
    button: 0,
    buttons: 1,
    pointerId: 1,
    pointerType: "mouse",
  });
  await expect(page.locator("#plain-button")).toHaveAttribute("pressed", "");

  await page.locator("#open-dialog").click();
  await expect(page.locator("#demo-dialog")).toHaveJSProperty("open", true);
  await page.locator("#close-dialog").click();
  await expect(page.locator("#demo-dialog")).toHaveJSProperty("open", false);
});

test("packed consumer can render another packaged theme", async ({ page }) => {
  await page.goto("/tests/fixtures/consumer/dist/index.html?theme=fluent");

  await expect(page.locator("x-button#plain-button")).toBeVisible();
  await expect(page.locator("#theme-url")).toContainText("./xel/themes/fluent.css");
  await expect.poll(() => page.evaluate(() => window.Xel.theme)).toContain("./xel/themes/fluent.css");

  await page.waitForFunction(async () => {
    await window.Xel.whenThemeReady;
    return getComputedStyle(document.documentElement).getPropertyValue("--theme-id").includes("fluent");
  });
});
