//SECTION - Helping Hand

import { expect } from "@playwright/test";

/**
 * Get the parent element by its title and a specific field name.
 *
 * @param {Object} props - The props for the function.
 * @param {Page} props.page - The page object containing the elements.
 * @param {string} props.fieldName - The name of the field to search for.
 * @returns {Promise<YourParentType>} A promise that resolves to the parent element.
 */
async function getParentByTitle({ page, fieldName }) {
	const child = await page.getByText(fieldName, { exact: true });
	const parent = await page
		.locator(".et-fb-form__group")
		.filter({ has: child });
	return await parent;
}
//!SECTION

/**
 * Toggle a control element on a page by clicking on it.
 *
 * @param {Object} props - The props for the function.
 * @param {Page} props.page - The page object containing the control element.
 * @param {string} props.control_name - The name of the control element to toggle.
 * @returns {Promise<void>} A promise that resolves when the control is toggled.
 */
export async function toggle_control({ page, control_name }) {
	await page.getByText(control_name, { exact: true }).click();
}

/**
 * Fill the input field associated with a specified label on a page.
 *
 * @param {Object} props - The props for the function.
 * @param {Page} props.page - The page object containing the input field.
 * @param {string} props.label - The label associated with the input field.
 * @param {string} props.text - The text to fill into the input field.
 * @returns {Promise<void>} A promise that resolves when the input field is filled.
 */
export async function fillInputField({ page, label, text }) {
	const parent = await getParentByTitle({
		page: page,
		fieldName: label,
	});
	await parent.locator('input[type="text"]').fill(text);
}

/**
 * Select an option in a field associated with a specified label on a page.
 *
 * @param {Object} props - The props for the function.
 * @param {Page} props.page - The page object containing the select field.
 * @param {string} props.label - The label associated with the select field.
 * @param {string} props.option_name - The name of the option to select.
 * @returns {Promise<void>} A promise that resolves when the option is selected.
 */
export async function selectField({ page, label, option_name }) {
	const parent = await getParentByTitle({
		page: page,
		fieldName: label,
	});
	await parent.locator(".et-fb-settings-option-select-advanced").click();
	await page.getByText(option_name, { exact: true }).click();
}

/**
 * Toggles the control switch associated with a specified label.
 *
 * @param {Object} props - The parameters for the function.
 * @param {Page} props.page - The Playwright page object.
 * @param {string} props.label - The label associated with the control switch.
 * @returns {Promise<void>} - A Promise that resolves when the control switch is toggled.
 */
export async function controlSwitch({ page, label }) {
	const parent = await getParentByTitle({
		page: page,
		fieldName: label,
	});

	await parent.locator(".et-core-control-toggle").click();
}

/**
 * Choose an icon from the icon list associated with a specified label.
 * @param {Object} props - The parameters for the function.
 * @param {Page} props.page - The Playwright page object.
 * @param {number} props.iconNumber - The index of the icon to choose (1-based index).
 * @returns {Promise<void>} - A Promise that resolves when the icon is chosen.
 */
export async function chooseIcon({ page, iconNumber }) {
	const parent = await getParentByTitle({
		page: page,
		fieldName: "Icon",
	});
	await parent.locator(`li:nth-child(${iconNumber})`).click();
}

/**
 * Choose a color from the color manager associated with a specified label.
 *
 * @param {Object} props - The parameters for the function.
 * @param {Page} props.page - The Playwright page object.
 * @param {string} props.label - The label associated with the color manager.
 * @param {number} props.colorNumber - The index of the color swatch to choose (1-based index).
 * @param {boolean} props.transparent - Whether to choose a transparent color.
 * @returns {Promise<void>} - A Promise that resolves when the color is chosen.
 */
export async function chooseColor({ page, label, colorNumber, transparent }) {
	const parent = await getParentByTitle({
		page: page,
		fieldName: label,
	});
	await parent
		.locator(".et-fb-settings-color-manager__swatches-row")
		.nth(colorNumber)
		.locator(".et-fb-settings-color-manager__swatches-swatch")
		.nth(1)
		.click();
	if (transparent) {
		await parent
			.locator(".et-fb-settings-color-manager__reset-color")
			.click();
	}
}
export async function setting_slider({ page, label, slide_value }) {
	const parent = await getParentByTitle({
		page: page,
		fieldName: label,
	});
	await parent.locator("input.et-fb-settings-option-input").click();

	// Press the "Up" key 10 times
	for (let i = 0; i < slide_value; i++) {
		await page.keyboard.press("ArrowUp");
	}
}
// async function upload_image(page) {
// 	await page.locator(".et-fb-item-addable-button").click();
// 	await page.waitForSelector("#menu-item-browse");
// 	await page.locator("#menu-item-browse").click();
// 	await page.locator("ul.attachments li:first-child").click();
// 	await page.locator("button.media-button-insert").click();
// }
//SECTION - Validation Section
//FIXME -
export async function content_validation_type_text({
	page,
	selector,
	expected_text,
}) {
	await expect.soft(page.frameLocator('iFrame').locator(selector)).toContainText(expected_text);
}
//!SECTION
