//SECTION - Helping Hand
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

export async function controlToggle({ page, label, trigger }) {
	const parent = await getParentByTitle({
		page: page,
		fieldName: label,
	});
	const status = await parent.getByText(trigger);
	if (!status) {
		await parent.locator(".et-core-control-toggle").click();
	}
}
// async function upload_image(page) {
// 	await page.locator(".et-fb-item-addable-button").click();
// 	await page.waitForSelector("#menu-item-browse");
// 	await page.locator("#menu-item-browse").click();
// 	await page.locator("ul.attachments li:first-child").click();
// 	await page.locator("button.media-button-insert").click();
// }
