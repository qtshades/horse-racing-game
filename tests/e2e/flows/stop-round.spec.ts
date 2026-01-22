import { test, expect } from '@playwright/test';

test('start then stop cancels running round', async ({ page }) => {
  await page.goto('/');

  const generate = page.getByTestId('control-generate');
  const scheduleBtn = page.getByTestId('control-schedule');
  const startBtn = page.getByTestId('control-start');
  const stopBtn = page.getByTestId('control-stop');

  await generate.click();
  await scheduleBtn.click();

  await startBtn.click();

  await expect(page.locator('.runner.running').first()).toBeVisible({ timeout: 5000 });

  await stopBtn.click();

  const firstPlaceholder = page.locator('.round__table tbody tr td.col-pos').first();
  await expect(firstPlaceholder).toHaveText('—', { timeout: 5000 });
});
