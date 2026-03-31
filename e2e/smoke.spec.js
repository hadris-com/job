import { test, expect } from '@playwright/test'

test('job kanban shell loads and key interactions work', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Job Kanban - Hadris/)
  await expect(page.getByRole('heading', { level: 1, name: 'Job Kanban' })).toBeVisible()
  await expect(page.locator('#board-root')).toBeVisible()
  await expect(page.locator('#new-application-btn')).toHaveText('New application')
  await expect(page.getByRole('link', { name: 'Resume Builder' })).toHaveAttribute('href', 'https://resume.hadris.com/')
  await expect(page.getByRole('link', { name: 'Resume Builder' })).toHaveAttribute('target', '_blank')

  await page.locator('.lang-btn[data-lang="es"]').click()
  await expect(page.locator('#new-application-btn')).toHaveText('Nueva candidatura')
  await expect(page.getByRole('link', { name: 'Constructor de CV' })).toBeVisible()

  await page.locator('#theme-toggle').click()
  await expect(page.locator('body')).toHaveClass(/theme-dark/)

  await page.locator('#new-application-btn').click()
  await expect(page.getByRole('heading', { level: 2, name: 'Nueva candidatura' })).toBeVisible()
})
