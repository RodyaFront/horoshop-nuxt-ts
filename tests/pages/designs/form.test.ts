/**
 * @vitest-environment node
 */
import { describe, it } from 'vitest';
import { expect } from '@playwright/test';
import { setup, createPage } from '@nuxt/test-utils/e2e';

describe('Design Form E2E', async () => {
  await setup({
    browser: true,
  });

  it('shows validation errors on empty submit and allows creation', async () => {
    const page = await createPage('/designs/new');

    try {
      const saveButton = page.getByRole('button', { name: /Зберегти і вийти/i });
      await expect(saveButton).toBeVisible();

      await saveButton.click();

      await expect(page.locator('p.app-input__error:has-text("Назва обовʼязкова")')).toBeVisible();
      await expect(page.locator('p.app-input__error:has-text("URL обовʼязковий")')).toBeVisible();

      await page.locator('input[placeholder="###"]').fill('123');
      await page.locator('input[placeholder="Назва дизайну"]').fill('Мій тестовий дизайн');
      await page.locator('input[placeholder="https://design###.horoshop.ua/"]').fill('https://example.com/image.jpg');

      await saveButton.click();

      await page.waitForURL('**/');
      
    } finally {
      await page.close();
    }
  }, 30000); 
}); 