import { test, expect } from '@playwright/test';

test.beforeAll('Setup', async () => {
    console.log('Before tests from testing file');
});

test('my test', async ({ page }) => {
    await page.goto('/');
    console.log('test done goto ')
});
