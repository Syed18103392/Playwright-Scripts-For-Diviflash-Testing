
import { test, expect } from "@playwright/test";
import { chromium, type FullConfig } from '@playwright/test';

const credential = {
    login_username: 'admin',
    login_password: 'admin',
};
async function globalTeaardown(config: FullConfig) {

    const { baseURL, storageState } = config.projects[0].use;
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(`${baseURL}wp-admin/edit.php?post_type=page`);
    await page.getByLabel("Username or Email Address").fill(credential.login_username);
    await page.getByLabel("Password", { exact: true }).click();
    await page.getByLabel("Password", { exact: true }).fill(credential.login_password);
    await page.getByRole("button", { name: "Log In" }).click();
    await page.screenshot({ path: 'snapshots/global-logout-page.png' });
    await page.locator('#cb-select-all-1').check();
    if(await page.$('select#bulk-action-selector-top')){
        await page.locator('select#bulk-action-selector-top').selectOption('trash');
        await page.locator('input#doaction').click();
        await page.goto(`${baseURL}wp-admin/edit.php?post_status=trash&post_type=page&paged=1`);
        await page.locator('input',{hasText:"Empty Trash"}).first().click();
    }
    await browser.close();
    console.log('All Page Deleted ☄️')
}

export default globalTeaardown;
