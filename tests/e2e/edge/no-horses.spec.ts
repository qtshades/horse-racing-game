import { test, expect } from '@playwright/test';

test('scheduling with no horses does nothing', async ({ page }) => {
  await page.goto('/');
  const scheduleBtn = page.getByTestId('control-schedule');

  await expect(scheduleBtn).toBeDisabled();
  await expect(page.locator('.app-table tbody tr')).toHaveCount(0);
});
