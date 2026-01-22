import { test, expect } from '@playwright/test';

test('schedule generation respects horses presence', async ({ page }) => {
  await page.goto('/');

  const scheduleBtn = page.getByTestId('control-schedule');
  const generate = page.getByTestId('control-generate');

  await expect(scheduleBtn).toBeDisabled();
  await expect(page.locator('.app-table tbody tr')).toHaveCount(0);

  await generate.click();
  await scheduleBtn.click();
  await expect(page.locator('.app-table tbody tr').first()).toBeVisible({ timeout: 5000 });
});
