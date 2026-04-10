import { expect, test } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should display the title', async ({ page }) => {
    await page.goto('/en');

    await expect(page.getByTestId('title')).toBeVisible();
  });
});
