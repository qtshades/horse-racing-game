import { test, expect } from '@playwright/test';

test.describe('Horse racing app (smoke)', () => {
  test('loads the app and shows controls', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('control-generate')).toBeVisible();
    await expect(page.getByTestId('control-schedule')).toBeVisible();
    await expect(page.getByTestId('control-start')).toBeVisible();
  });

  test('can generate horses and schedule and run a round', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('control-generate').click();

    await page.getByTestId('control-schedule').click();

    await page.getByTestId('control-start').click();

    await expect(page.locator('.results .app-table__title').first()).toBeVisible({ timeout: 10000 });
  });
});
