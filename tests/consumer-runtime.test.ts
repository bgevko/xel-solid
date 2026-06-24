import { expect, test } from "@playwright/test";

test("packed consumer gets xel setup, assets, form semantics, and dialog behavior", async ({ page }) => {
  await page.goto("/tests/fixtures/consumer/dist/index.html");

  await expect(page.locator("x-button#plain-button")).toBeVisible();
  await expect(page.locator("#theme-url")).toContainText("/xel/themes/material.css");

  await page.waitForFunction(async () => {
    const xel = await import("/node_modules/xel/xel.js");
    await xel.default.whenThemeReady;
    await xel.default.whenIconsReady;
    await xel.default.whenLocalesReady;
    return Boolean(xel.default.queryIcon("#home"));
  });

  const themeId = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--theme-id"));
  expect(themeId).toContain("material");

  await expect(page.locator("#localized-message")).not.toHaveText("setup");

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
