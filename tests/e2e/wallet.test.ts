import { test, expect } from '@playwright/test';

test.describe('Multisig Wallet End-to-End Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000'); // Adjust the URL based on your local setup
  });

  test('Create a new multisig wallet', async ({ page }) => {
    await page.click('text=Create Wallet'); // Adjust selector based on your UI
    await page.fill('input[name="walletName"]', 'Test Wallet');
    await page.fill('input[name="requiredSignatures"]', '2');
    await page.click('text=Submit');

    const successMessage = await page.locator('text=Wallet created successfully');
    await expect(successMessage).toBeVisible();
  });

  test('View transactions in the multisig wallet', async ({ page }) => {
    await page.click('text=View Wallets'); // Adjust selector based on your UI
    await page.click('text=Test Wallet'); // Click on the wallet created in the previous test

    const transactionList = await page.locator('.transaction-list'); // Adjust selector based on your UI
    await expect(transactionList).toBeVisible();
  });

  test('Sign a transaction', async ({ page }) => {
    await page.click('text=View Wallets');
    await page.click('text=Test Wallet');
    await page.click('text=Sign Transaction'); // Adjust selector based on your UI

    await page.fill('input[name="transactionId"]', '12345'); // Example transaction ID
    await page.click('text=Sign');

    const signMessage = await page.locator('text=Transaction signed successfully');
    await expect(signMessage).toBeVisible();
  });
});