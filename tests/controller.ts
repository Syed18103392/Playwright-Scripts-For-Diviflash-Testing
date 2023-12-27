import * as contentElements from "./content-elements";
import * as compose from "./composition-helpers";
import { Page } from 'playwright';

export async function loginToSiteAndCreatePage(
	page: Page,
	page_name: string,
	url: string,
	username: string,
	password: string
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
export async function openDiviBuilder(page) {
	await page.waitForSelector(".components-snackbar");
	await page.getByRole("button", { name: "Use Divi Builder" }).click();
	await page.getByRole("button", { name: "Start Building" }).click();
	await page.locator('span.column-block[data-layout="4_4"]').click();
}

//SECTION - Add Content
export async function fillContents(page) {
	await compose.enableContentTab(page);
	//add data
	await contentElements.button({
		page: page,
		toggle_name: "Left button",
		click: false,
		btn_name: "First Button",
		btn_url: "google.com",
		in_the_new_tab: false
	});

	//validation
	await compose.expectText({
		page: page,
		selector: ".df_button_left",
		expected_text: "First Button",
	});
	//add button data
	await contentElements.button({
		page: page,
		toggle_name: "Right Button",
		click: true,
		btn_name: "Last Button",
		btn_url: "google.com",
		in_the_new_tab: true,
	});
	//validation
	await compose.expectText({
		page: page,
		selector: ".df_button_right",
		expected_text: "Last Button",
	});

	//button separator
	//toggle setting
	await compose.settingsToggle({
		page: page,
		control_name: "Button Separator",
	});

	//Turn on button separator
	await compose.settingsSwitch({
		page: page,
		label: "Use button separator",
	});
	//add separetor text
	await compose.settingsFillInputField({
		page: page,
		label: "Separator text",
		text: "Ami separator text",
	});
	//validation
	await compose.expectText({
		page: page,
		selector: ".button-separator",
		expected_text: "Ami separator text",
	});

	// Use icon
	await compose.settingsSwitch({
		page: page,
		label: "Use Icon",
	});
	//choose icon
	await compose.settingsChooseIcon({
		page: page,
		iconNumber: "22",
	});
	// Choose icon color
	await compose.settingsColor({
		page: page,
		label: "Icon Color",
		colorNumber: 3,
		transparent: true,
	});
	//turn on use font size
	await compose.settingsSwitch({
		page: page,
		label: "Use Icon Font Size",
	});
	await compose.settingsSlider({
		page: page,
		label: "Icon Font Size",
		slide_value: 10,
	});
}
//!SECTION
//SECTION - Add Design
export async function addDesign(page: Page) {
	await compose.enableDesignTab(page);
	await compose.settingsToggle({
		page: page,
		control_name: 'Button Styles'
	});
	await compose.settingsSelectField({
		page: page,
		label: "Button Style",
		option_name: "Vertical"
	})

}

//!SECTION
export async function removeTestPage(page) {
	await page.locator("#wp-admin-bar-edit").click();
	// await page.waitForSelector("body.wp-admin");
	await page.getByRole("button", { name: "Move to trash" }).click();
}
export async function insertModule(page, module_name, module_selector) {
	await page.locator("input#et-fb-filterByTitle").fill(module_name);
	await page.locator(`li.${module_selector}`).click();
}
export async function saveAndExitBuilder(page) {
	await page.locator("li#wp-admin-bar-et-disable-visual-builder").click();
	await page.locator(".et_pb_prompt_buttons a:last-child").click();
}
