import { test, expect } from '@playwright/test';

test('generate → schedule → start produces results', async ({ page }) => {
  await page.goto('/');

  const generate = page.getByTestId('control-generate');
  const scheduleBtn = page.getByTestId('control-schedule');
  const startBtn = page.getByTestId('control-start');

  await expect(generate).toBeVisible({ timeout: 10000 });
  await generate.click();

  await expect(scheduleBtn).toBeVisible({ timeout: 5000 });
  await scheduleBtn.click();

  const scheduleRow = page.locator('.app-table tbody tr').first();
  await expect(scheduleRow).toBeVisible({ timeout: 5000 });

  await startBtn.click();

  await expect(page.locator('.results .app-table__title').first()).toBeVisible({ timeout: 15000 });
});
