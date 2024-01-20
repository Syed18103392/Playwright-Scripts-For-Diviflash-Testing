import { expect } from "@playwright/test";
import { Page } from "playwright";



//SECTION - Helping Hand
/**
 * Enable the Content tab on a page.
 *
 * @param {Object} props - The props for the function.
 * @param {Page} props.page - The page object.
 * @returns {Promise<void>} A promise that resolves when the Content tab is enabled.
 */
export async function enableContentTab(page: Page) {
	await page.locator(".et-fb-tabs__item.et-fb-tabs__item--general").click();
}

/**
 * Enable the Design tab on a page.
 *
 * @param {Object} props - The props for the function.
 * @param {Page} props.page - The page object.
 * @returns {Promise<void>} A promise that resolves when the Design tab is enabled.
 */
export async function enableDesignTab(page: Page) {
	await page.locator(".et-fb-tabs__item.et-fb-tabs__item--advanced").click();
}
//!SECTION

/**
 * Get the parent element by its title and a specific field name.
 *
 * @param {Object} props - The props for the function.
 * @param {Page} props.page - The page object containing the elements.
 * @param {string} props.fieldName - The name of the field to search for.
 * @returns {Promise<YourParentType>} A promise that resolves to the parent element.
 */
async function getParentByTitle({
	page,
	fieldName,
	isItFont = false,
}: {
	page: Page,
	fieldName: string,
	isItFont?: boolean
}) {
	const child = await page.getByText(fieldName, { exact: true });
	const parent = await page
		.locator((isItFont) ? ".et-fb-font-option-container-with-label" : ".et-fb-form__group")
		.filter({ has: child });
	return await parent;
}

/**
 * Toggle a control element on a page by clicking on it.
 *
 * @param {Object} props - The props for the function.
 * @param {Page} props.page - The page object containing the control element.
 * @param {string} props.label - The name of the control element to toggle.
 * @returns {Promise<void>} A promise that resolves when the control is toggled.
 */
export async function settingsToggle({ page, label }: { page: Page, label: string }) {
	await page.getByText(label, { exact: true }).click();
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
export async function settingsFillInputField({ page, label, text }: { page: Page, label: string, text: string }) {
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
export async function settingsSelectField({ page, label, option_name, isItFont = false }: { page: Page, label: string, option_name: string, isItFont?: boolean }): Promise<void> {
	const parent = await getParentByTitle({
		page: page,
		fieldName: label,
		isItFont: isItFont
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
export async function settingsSwitch({ page, label }: { page: Page, label: string }) {
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
 * @param {string} props.iconNumber - The index of the icon to choose (1-based index).
 * @returns {Promise<void>} - A Promise that resolves when the icon is chosen.
 */
export async function settingsChooseIcon({ page, iconNumber }: { page: Page, iconNumber: string }) {
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


export async function settingsColor({
	page,
	label,
	colorNumber,
}: {
	page: Page,
	label: string,
	colorNumber: number,
}) {
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
}
export async function settingsColor__Transparent({
	page,
	label,
}: {
	page: Page,
	label: string,
}) {
	const parent = await getParentByTitle({
		page: page,
		fieldName: label,
	});
	await parent.locator(".et-fb-settings-color-manager__reset-color").click();
}
export async function settingsColor__Gradient({
	page,
}: {
	page: Page,
}) {
	await page.locator('.et-fb-icon--background-gradient').click();
	await settingsSwitch({
		page: page,
		label: 'Use gradient background'
	});
}


export async function settingsColor__Image({
	page,
}: {
	page: Page,
}) {
	await page.locator('.et-fb-icon--background-image').click();
	await page.locator('.et-fb-settings-option-upload-type-image').click();
	await page.locator('#menu-item-browse').click();
	await page.locator('li.attachment').nth(1).click();
	await page.locator('.media-button-insert').click();
}

/**
 * Adjust the value of a slider associated with a specified label.
 *
 * @param {Object} props - The parameters for the function.
 * @param {Page} props.page - The Playwright page object.
 * @param {string} props.label - The label associated with the slider.
 * @param {number} props.slide_value - The value to set on the slider.
 * @returns {Promise<void>} - A Promise that resolves when the slider value is adjusted.
 */
export async function settingsSlider({ page, label, slide_value }: { page: Page, label: string, slide_value: number }) {
	const parent = await getParentByTitle({
		page: page,
		fieldName: label,
	});
	await parent.locator("input.et-fb-settings-option-input").click();

	// Press the "Up" key 'slide_value' times
	for (let i = 0; i < slide_value; i++) {
		await page.keyboard.press("ArrowUp");
	}
}

/**
 * Select a style like 'Alignment/ Font Style' from a list associated with a specified label on a page.
 *
 * @param {Object} props - The parameters for the function.
 * @param {Page} props.page - The Playwright page object.
 * @param {string} props.label - The label associated with the button list.
 * @param {number} props.select_number - The number of the style [for example first button[align-left] = 0].
 * @returns {Promise<void>} - A Promise that resolves when the button is selected.
 */
export async function settingsSelectButton({ page, label, select_number, isItFont = false, isItAnchor = false }: {
	page: Page,
	label: string,
	select_number: number,
	isItFont?: boolean,
	isItAnchor?: boolean,
}) {
	const parent = await getParentByTitle({
		page: page,
		fieldName: label,
		isItFont: isItFont
	})
	await parent.locator(isItAnchor ? 'a' : 'button').nth(select_number).click();
}

export async function settingsAddNewChildItem({ page, tooltip_name }: {
	page: Page,
	tooltip_name: string,
}) {
	await page.locator(`button[data-tip='${tooltip_name}']`).click();
}

//SECTION - Validation Section
/**
 * Assert that a specific text is present in the specified selector.
 *
 * @param {Object} props - The parameters for the function.
 * @param {Page} props.page - The Playwright page object.
 * @param {string} props.selector - The selector to check for text.
 * @param {string} props.expected_text - The expected text.
 * @returns {Promise<void>} - A Promise that resolves when the text assertion is complete.
 */
export async function expectText({
	page,
	selector,
	expected_text,
}: {
	page: Page,
	selector: string,
	expected_text: string
}) {
	await expect.soft(await page.frameLocator('iFrame').locator(selector)).toContainText(expected_text);
}

export async function expectStyleValue({
	page,
	selector,
	style_name,
	expected_value
}: {
	page: Page,
	selector: string,
	style_name: string,
	expected_value: string,
}) {
	await expect.soft(await page.frameLocator('iFrame').locator(selector)).toHaveCSS(style_name, expected_value);
}
//!SECTION

export async function expectImageVisiblity({
	page,
	selector,
}: {
	page: Page,
	selector: string
}) {
	await page.on('request', request => console.log(`Request sent: ${request.url()}`));
	expect.soft(await page.frameLocator('iFrame').locator(selector)).toBeVisible();
}

