import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('should login as admin and redirect to dashboard', async ({ page }) => {
    await page.goto('/login')
    
    await page.fill('input[type="email"]', 'admin@company.com')
    await page.fill('input[type="password"]', 'admin123')
    await page.click('button[type="submit"]')
    
    await page.waitForURL('/dashboard')
    expect(page.url()).toContain('/dashboard')
    
    await expect(page.locator('h1')).toContainText('Dashboard')
  })

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login')
    
    await page.fill('input[type="email"]', 'invalid@example.com')
    await page.fill('input[type="password"]', 'wrongpassword')
    await page.click('button[type="submit"]')
    
    await expect(page.locator('text=Invalid credentials')).toBeVisible()
  })

  test('should logout successfully', async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[type="email"]', 'admin@company.com')
    await page.fill('input[type="password"]', 'admin123')
    await page.click('button[type="submit"]')
    
    await page.waitForURL('/dashboard')
    
    await page.click('button[title="Logout"]')
    await page.waitForURL('/login')
    
    expect(page.url()).toContain('/login')
  })
})
