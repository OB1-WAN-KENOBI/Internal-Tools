import { test, expect } from '@playwright/test'

test.describe('Users Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[type="email"]', 'admin@company.com')
    await page.fill('input[type="password"]', 'admin123')
    await page.click('button[type="submit"]')
    await page.waitForURL('/dashboard')
    
    await page.click('text=Users')
    await page.waitForURL('/users')
  })

  test('should display users table', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Users')
    await expect(page.locator('table')).toBeVisible()
  })

  test('should create a new user', async ({ page }) => {
    await page.click('text=Create User')
    
    await page.fill('#name', 'Test User')
    await page.fill('#email', 'test@example.com')
    await page.selectOption('#role', 'viewer')
    await page.selectOption('#status', 'active')
    
    await page.click('button[type="submit"]')
    
    await expect(page.locator('text=User created successfully')).toBeVisible()
    await expect(page.locator('text=Test User')).toBeVisible()
  })

  test('should search for users', async ({ page }) => {
    await page.fill('input[placeholder="Search users..."]', 'Admin')
    
    await page.waitForTimeout(500)
    
    await expect(page.locator('table >> text=Admin User')).toBeVisible()
  })
})
