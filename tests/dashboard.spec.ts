import { test, expect } from '@playwright/test'

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[type="email"]', 'admin@company.com')
    await page.fill('input[type="password"]', 'admin123')
    await page.click('button[type="submit"]')
    await page.waitForURL('/dashboard')
  })

  test('should load and display metrics', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Dashboard')
    
    await expect(page.locator('text=Active Users')).toBeVisible()
    await expect(page.locator('text=Events per Minute')).toBeVisible()
    await expect(page.locator('text=Error Rate')).toBeVisible()
    await expect(page.locator('text=Revenue')).toBeVisible()
  })

  test('should show live indicator', async ({ page }) => {
    await expect(page.locator('text=Live')).toBeVisible()
  })

  test('should update metrics in real-time', async ({ page }) => {
    const activeUsersElement = page.locator('text=Active Users').locator('..').locator('..')
    const initialValue = await activeUsersElement.locator('.text-2xl').textContent()
    
    await page.waitForTimeout(4000)
    
    const updatedValue = await activeUsersElement.locator('.text-2xl').textContent()
    
    expect(initialValue).not.toBe(updatedValue)
  })
})
