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

  test("can create a collection", async () => {
    await page.getByRole("heading", { name: "Welcome!" }).click()
    await page.getByRole("button", { name: "+ Create Your First Collection" }).click()
    await page.getByPlaceholder("Enter collection name").fill("Testimonials")
    await page.getByPlaceholder("Enter collection name").press("Enter")
    await page.getByPlaceholder("Enter name for item label").fill("Name")
    await page.getByPlaceholder("Enter name for item label").press("Enter")
    await page.getByPlaceholder("Enter field name").fill("Title")
    await page.getByPlaceholder("Enter field name").press("Enter")
    await page.getByRole("button", { name: "Tt Text A plain text field" }).click()
    await page.getByRole("heading", { name: "Testimonials" }).click()
    await page.getByRole("button", { name: "+ Add Field" }).click()
    await page.getByPlaceholder("Enter field name").fill("Photo")
    await page.getByRole("button", { name: "Next" }).click()
    await page.getByRole("button", { name: "Image Upload an image" }).click()
    await page.getByRole("button", { name: "+ Add Field" }).click()
    await page.getByPlaceholder("Enter field name").fill("Company")
    await page.getByRole("button", { name: "Next" }).click()
    await page.getByRole("button", { name: "Tt Text A plain text field" }).click()
    await page.getByRole("button", { name: "+ Add Field" }).click()
    await page.getByPlaceholder("Enter field name").fill("Testimonial")
    await page.getByRole("button", { name: "Next" }).click()
    await page.getByRole("button", { name: "Rich Text Text with rich formatting options" }).click()
    await page.getByRole("button", { name: "+ Add Field" }).click()
    await page.getByPlaceholder("Enter field name").click()
    await page.getByPlaceholder("Enter field name").fill("Project Date")
    await page.getByRole("button", { name: "Next" }).click()
    await page.getByRole("button", { name: "Date Choose a date" }).click()
    await page.locator("#item-preview").getByText("Form Preview").isVisible()
    await page.locator("#item-preview").getByText("Name", { exact: true }).isVisible()
    await page.locator("#item-preview").getByText("Title", { exact: true }).isVisible()
    await page.locator("#item-preview").getByText("Photo").isVisible()
    await page.locator("#item-preview").getByText("Company").isVisible()
    await page.locator("#item-preview").getByText("Testimonial", { exact: true }).isVisible()
    await page.locator("#item-preview").getByText("Project Date").isVisible()
  })

  test.afterAll(async () => {
    await page.close()
  })
})
