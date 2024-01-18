import { expect } from "@playwright/test";
import { Page } from "playwright";

export async function loginToSite(
        page: Page,
        url: string,
        username: string,
        password: string,
) {
        await page.goto(`${url}/wp-admin`);
        await page.getByLabel("Username or Email Address").fill(username);
        await page.getByLabel("Password", { exact: true }).click();
        await page.getByLabel("Password", { exact: true }).fill(password);
        await page.getByRole("button", { name: "Log In" }).click();
}
export async function createPage({
        page,
        page_name
}: {
        page: Page,
        page_name: string
}) {
        await page.getByRole("link", { name: "Pages", exact: true }).click();
        await page
                .locator("#wpbody-content")
                .getByRole("link", { name: "Add New Page" })
                .click();
        await page.getByLabel("Add title").fill(page_name);
        await page
                .locator(".edit-post-header__settings .editor-post-publish-button__button")
                .filter({ hasText: "Publish" })
                .click();
        await page
                .locator(".editor-post-publish-panel__header-publish-button button")
                .filter({ hasText: "Publish" })
                .click();
        await page.getByLabel("Close panel").click();
}
export async function installPlugin(page, wordpressURL, pluginFilePath) {
        await page.goto(`${wordpressURL}/wp-admin/plugins.php`);

        const dfPluginStatus = await page.$('a[aria-label="Deactivate DiviFlash"]');
        const isPluginActivated = dfPluginStatus !== null;
        await page.click('a.page-title-action');

        await page.getByRole("button", { name: "Upload Plugin", exact: true }).click();
        const fileInput = await page.$('input[type="file"]');
        await fileInput.setInputFiles(pluginFilePath);
        await page.click('input#install-plugin-submit');

        if (isPluginActivated) {
                // console.trace(`Plugin Status: ${isPluginActivated}`);
                await page.screenshot({ path: 'snapshots/pluginActivatePanel.png' });
                expect(page.locator('.button').filter({ hasText: 'Replace current with uploaded' })).toBeVisible();
                await page.locator('.button').filter({ hasText: 'Replace current with uploaded' }).click();
        }
        else {
                console.log('not replace');
                await page.screenshot({ path: 'snapshots/pluginActivatePanel.png' });
                expect(page.locator('.button').filter({ hasText: 'Activate Plugin' })).toBeVisible();

                await page.locator('.button').filter({ hasText: 'Activate Plugin' }).click();
        }
        await page.goto(`${wordpressURL}/wp-admin/plugins.php`);
        await page.screenshot({ path: 'snapshots/pluginPage.png' });
        await expect(await page.getByLabel('Deactivate DiviFlash')).toBeVisible();
}
export async function openDiviBuilder(page) {
        await page.waitForSelector(".components-snackbar");
        await page.getByRole("button", { name: "Use Divi Builder" }).click();
        await page.getByRole("button", { name: "Start Building" }).click();
        await page.locator('span.column-block[data-layout="4_4"]').click();
}
export async function insertModule(page, module_name, module_selector) {
        await page.locator("input#et-fb-filterByTitle").fill(module_name);
        await page.locator(`li.${module_selector}`).click();
}
export async function removeTestPage(page) {
        await page.click("#wp-admin-bar-edit");
        // await page.click('button[aria-label="Move to trash"]');
        await page.getByRole('button', { name: "Move to trash" });
        await page.waitForLoadState("load");
        console.log("Delete Complete");
}
export async function saveAndExitBuilder(page) {
        await page.locator("li#wp-admin-bar-et-disable-visual-builder").click();
        await page.locator(".et_pb_prompt_buttons a:last-child").click();
}
