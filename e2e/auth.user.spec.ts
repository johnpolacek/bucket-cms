import { test, expect, Page } from "@playwright/test"

test.describe("Authenticated User", () => {
  let page: Page

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    await page.route("**/*", (route, request) => {
      route.continue({ headers: { ...request.headers(), "x-test-auth": "true" } })
    })
    await page.goto("/demo")
    await page.click("text=Sign in with Test")
  })

  test("my authenticated test", async () => {
    // Your test code
    await page.pause()
    // ... assert something on the page
  })

  test.afterAll(async () => {
    await page.close()
  })
})
