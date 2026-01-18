import { test, expect } from '@playwright/test'

test.describe('Role-based Access Control', () => {
  test('admin should see Users menu item', async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[type="email"]', 'admin@company.com')
    await page.fill('input[type="password"]', 'admin123')
    await page.click('button[type="submit"]')
    
    await page.waitForURL('/dashboard')
    
    await expect(page.locator('text=Users')).toBeVisible()
  })

  test('manager should NOT see Users menu item', async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[type="email"]', 'manager@company.com')
    await page.fill('input[type="password"]', 'manager123')
    await page.click('button[type="submit"]')
    
    await page.waitForURL('/dashboard')
    
    await expect(page.locator('nav >> text=Users')).not.toBeVisible()
  })

  test('viewer should only see Dashboard and Settings', async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[type="email"]', 'viewer@company.com')
    await page.fill('input[type="password"]', 'viewer123')
    await page.click('button[type="submit"]')
    
    await page.waitForURL('/dashboard')
    
    await expect(page.locator('nav >> text=Dashboard')).toBeVisible()
    await expect(page.locator('nav >> text=Settings')).toBeVisible()
    await expect(page.locator('nav >> text=Users')).not.toBeVisible()
    await expect(page.locator('nav >> text=Data Table')).not.toBeVisible()
  })

  test('should show 403 when accessing restricted page', async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[type="email"]', 'viewer@company.com')
    await page.fill('input[type="password"]', 'viewer123')
    await page.click('button[type="submit"]')
    
    await page.waitForURL('/dashboard')
    
    await page.goto('/users')
    await page.waitForURL('/403')
    
    await expect(page.locator('text=403')).toBeVisible()
    await expect(page.locator('text=Access Denied')).toBeVisible()
  })
})
