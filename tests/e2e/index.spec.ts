import { test, expect } from "@playwright/test";

test("input in form field", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.type("#user-input", "Test List");
  await page.click("#add-button");
  const locator = page.locator("#Test List");
  await expect(locator).toBeVisible();
});
