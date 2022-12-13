import { test, expect } from "@playwright/test";
import mongoose from "mongoose";

mongoose.set("strictQuery", true);
// test.describe("Home page", () => {
// test.beforeEach(async ({ page }) => {
//   await page.goto("http://localhost:3000");
// });

test("input in form field", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.locator("#user-input").click();
  await page.locator("#user-input").fill("Test List");
  await page.getByRole("button", { name: "Add list" }).click();
  const locator = page.getByRole("button", { name: "Test List" });
  await expect(locator).toBeVisible();
});

// test("Clicking on list goes to list page", async ({ page }) => {
//   await page.goto("http://localhost:3000");
//   await page.getByRole("button", { name: "Personal" }).click();
//   await expect(page).toHaveURL("/list/635c03fc63bd12f022aaa6ac");
// });
// });
