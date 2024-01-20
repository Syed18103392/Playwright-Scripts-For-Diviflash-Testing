import type { Page , expect} from '@playwright/test';

export class Global {

       constructor(public readonly page: Page) {}
       async loginToSite(
              url: string,
              username: string,
              password: string,
       ) {
              await this.page.goto(`${url}/wp-admin`);
              await this.page.getByLabel("Username or Email Address").fill(username);
              await this.page.getByLabel("Password", { exact: true }).click();
              await this.page.getByLabel("Password", { exact: true }).fill(password);
              await this.page.getByRole("button", { name: "Log In" }).click();
       }
       async createPage({
              page_name
       }: {
              page_name: string
       }) {
              await this.page.getByRole("link", { name: "Pages", exact: true }).click();
              await this.page.locator("#wpbody-content")
                     .getByRole("link", { name: "Add New Page" })
                     .click();
              await this.page.getByLabel("Add title").fill(page_name);
              await this.page
                     .locator(".edit-post-header__settings .editor-post-publish-button__button")
                     .filter({ hasText: "Publish" })
                     .click();
              await this.page.locator(".editor-post-publish-panel__header-publish-button button")
                     .filter({ hasText: "Publish" })
                     .click();
              await this.page.getByLabel("Close panel").click();
       }
       async installPlugin( wordpressURL, pluginFilePath) {
              await this.page.goto(`${wordpressURL}/wp-admin/plugins.php`);

              const dfPluginStatus = await this.page.$('a[aria-label="Deactivate DiviFlash"]');
              const isPluginActivated = dfPluginStatus !== null;
              await this.page.click('a.page-title-action');

              await this.page.getByRole("button", { name: "Upload Plugin", exact: true }).click();
              const fileInput = await this.page.$('input[type="file"]');
              await fileInput.setInputFiles(pluginFilePath);
              await this.page.click('input#install-plugin-submit');

              if (isPluginActivated) {
                     // console.trace(`Plugin Status: ${isPluginActivated}`);
                     await this.page.screenshot({ path: 'snapshots/pluginActivatePanel.png' });
                     expect(this.page.locator('.button').filter({ hasText: 'Replace current with uploaded' })).toBeVisible();
                     await this.page.locator('.button').filter({ hasText: 'Replace current with uploaded' }).click();
              }
              else {
                     console.log('not replace');
                     await this.page.screenshot({ path: 'snapshots/pluginActivatePanel.png' });
                     expect(this.page.locator('.button').filter({ hasText: 'Activate Plugin' })).toBeVisible();

                     await this.page.locator('.button').filter({ hasText: 'Activate Plugin' }).click();
              }
              await this.page.goto(`${wordpressURL}/wp-admin/plugins.php`);
              await this.page.screenshot({ path: 'snapshots/pluginthis.Page.png' });
              await expect(await this.page.getByLabel('Deactivate DiviFlash')).toBeVisible();
       }
       async openDiviBuilder(page) {
              await this.page.waitForSelector(".components-snackbar");
              await this.page.getByRole("button", { name: "Use Divi Builder" }).click();
              await this.page.getByRole("button", { name: "Start Building" }).click();
              await this.page.locator('span.column-block[data-layout="4_4"]').click();
       }
       async insertModule( module_name, module_selector) {
              await this.page.locator("input#et-fb-filterByTitle").fill(module_name);
              await this.page.locator(`li.${module_selector}`).click();
       }
       async removeTestPage(page) {
              await this.page.click("#wp-admin-bar-edit");
              // await this.page.click('button[aria-label="Move to trash"]');
              await this.page.getByRole('button', { name: "Move to trash" });
              await this.page.waitForLoadState("load");
              console.log("Delete Complete");
       }
       async saveAndExitBuilder(page) {
              await this.page.locator("li#wp-admin-bar-et-disable-visual-builder").click();
              await this.page.locator(".et_pb_prompt_buttons a:last-child").click();
       }
}
