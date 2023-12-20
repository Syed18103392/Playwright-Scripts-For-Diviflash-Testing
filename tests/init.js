import { expect } from "@playwright/test";

export async function login_to_site_and_create_page(
	page,
	page_name,
	url,
	username,
	password
) {
	await page.goto(`http://${url}/wp-admin`);
	await page.getByLabel("Username or Email Address").fill(username);
	await page.getByLabel("Password", { exact: true }).click();
	await page.getByLabel("Password", { exact: true }).fill(password);
	await page.getByRole("button", { name: "Log In" }).click();
	await page.getByRole("link", { name: "Pages", exact: true }).click();
	await page
		.locator("#wpbody-content")
		.getByRole("link", { name: "Add New Page" })
		.click();
	await page.getByLabel("Add title").fill(page_name);
	await page
		.locator(
			".edit-post-header__settings .editor-post-publish-button__button"
		)
		.filter({ hasText: "Publish", exact: true })
		.click();
	await page
		.locator(".editor-post-publish-panel__header-publish-button button")
		.filter({ hasText: "Publish", exact: true })
		.click();
	await page.getByLabel("Close panel").click();
}
export async function open_divi_builder(page) {
	await page.waitForSelector(".components-snackbar");
	await page.getByRole("button", { name: "Use Divi Builder" }).click();
	await page.getByRole("button", { name: "Start Building" }).click();
	await page.locator('span.column-block[data-layout="4_4"]').click();
}

export async function upload_image(page) {
	await page.locator(".et-fb-item-addable-button").click();
	await page.waitForSelector("#menu-item-browse");
	await page.locator("#menu-item-browse").click();
	await page.locator("ul.attachments li:first-child").click();
	await page.locator("button.media-button-insert").click();
}

export async function remove_test_page(page) {
	await page.locator("#wp-admin-bar-edit").click();
	await page.getByRole("button", { name: "Move to trash" }).click();
}
export async function insert_module(page, module_name, module_selector) {
	await page.locator("input#et-fb-filterByTitle").fill(module_name);
	await page.locator(`li.${module_selector}`).click();
}
export async function save_and_exit_builder(page) {
	await page.locator("li#wp-admin-bar-et-disable-visual-builder").click();
	await page.locator(".et_pb_prompt_buttons a:last-child").click();
}
