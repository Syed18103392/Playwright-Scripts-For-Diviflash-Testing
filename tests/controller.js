import * as contentElements from "./content-elements";
import * as compose from "./composition-helpers";
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
export async function fill_contents(page) {
	await contentElements.enableContentTab(page);
	//add data
	await contentElements.button({
		page: page,
		toggle_name: "Left button",
		click: false,
		btn_name: "First Button",
		btn_url: "google.com",
	});
	//add button data
	await contentElements.button({
		page: page,
		toggle_name: "Right Button",
		click: true,
		btn_name: "Last Button",
		btn_url: "google.com",
	});
	//button separator
	//toggle setting
	await compose.toggle_control({
		page: page,
		control_name: "Button Separator",
	});
	await compose.controlToggle({
		page: page,
		label: "Use button separator",
		trigger: "YES",
	});
}

//FIXME - this load before page load
export async function remove_test_page(page) {
	await page.waitForSelector("body.wp-admin");
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
