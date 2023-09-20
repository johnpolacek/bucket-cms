import { test, expect } from "@playwright/test"

test.describe("Public User", () => {
  test("can view the home page", async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto("/")
    await await expect(page.getByRole("heading", { name: "How about a Bucket?" })).toBeVisible()
  })

  test("can view documentation", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("button", { name: "Documentation" }).click()
    await expect(page.getByRole("heading", { name: "Bucket CMS Docs" })).toBeVisible()
    await expect(page.locator("h2").filter({ hasText: "Overview" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Introduction" })).toBeVisible()
  })

  test("can access demo login", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("main").getByRole("button", { name: "Try the Demo" }).click()
    await expect(page.getByRole("heading", { name: "Welcome to Bucket" })).toBeVisible()
    await expect(page.getByRole("button", { name: "Github Sign in with Github" })).toBeVisible()
  })
})
