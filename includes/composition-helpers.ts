import { Page, expect } from '@playwright/test';

export class CompositionHelper {

	constructor(public readonly page: Page) { }
	//SECTION - Helping Hand
	/**
	 * Enable the Content tab on a this.page.
	 *
	 * @param {Object} props - The props for the .
	 * @param {Page} props.page - The page object.
	 * @returns {Promise<void>} A promise that resolves when the Content tab is enabled.
	 */
	async enableContentTab() {
		await this.page.locator(".et-fb-tabs__item.et-fb-tabs__item--general").click();
	}

	/**
	 * Enable the Design tab on a this.page.
	 *
	 * @param {Object} props - The props for the .
	 * @param {Page} props.page - The page object.
	 * @returns {Promise<void>} A promise that resolves when the Design tab is enabled.
	 */
	async enableDesignTab() {
		await this.page.locator(".et-fb-tabs__item.et-fb-tabs__item--advanced").click();
	}
	//!SECTION

	/**
	 * Get the parent element by its title and a specific field name.
	 *
	 * @param {Object} props - The props for the .
	 * @param {Page} props.page - The page object containing the elements.
	 * @param {string} props.fieldName - The name of the field to search for.
	 * @returns {Promise<YourParentType>} A promise that resolves to the parent element.
	 */
	async getParentByTitle({

		fieldName,
		isItFont = false,
	}: {

		fieldName: string,
		isItFont?: boolean
	}) {
		const child = await this.page.getByText(fieldName, { exact: true });
		const parent = await this.page
			.locator((isItFont) ? ".et-fb-font-option-container-with-label" : ".et-fb-form__group")
			.filter({ has: child });
		return await parent;
	}

	/**
	 * Toggle a control element on a page by clicking on it.
	 *
	 * @param {Object} props - The props for the .
	 * @param {Page} props.page - The page object containing the control element.
	 * @param {string} props.label - The name of the control element to toggle.
	 * @returns {Promise<void>} A promise that resolves when the control is toggled.
	 */
	async settingsToggle({ label }: { label: string }) {
		await this.page.getByText(label, { exact: true }).click();
	}

	/**
	 * Fill the input field associated with a specified label on a this.page.
	 *
	 * @param {Object} props - The props for the .
	 * @param {Page} props.page - The page object containing the input field.
	 * @param {string} props.label - The label associated with the input field.
	 * @param {string} props.text - The text to fill into the input field.
	 * @returns {Promise<void>} A promise that resolves when the input field is filled.
	 */
	async settingsFillInputField({ label, text }: { label: string, text: string }) {
		const parent = await this.getParentByTitle({
			fieldName: label,
		});
		await parent.locator('input[type="text"]').fill(text);
	}

	/**
	 * Select an option in a field associated with a specified label on a this.page.
	 *
	 * @param {Object} props - The props for the .
	 * @param {Page} props.page - The page object containing the select field.
	 * @param {string} props.label - The label associated with the select field.
	 * @param {string} props.option_name - The name of the option to select.
	 * @returns {Promise<void>} A promise that resolves when the option is selected.
	 */
	async settingsSelectField({ label, option_name, isItFont = false }: { label: string, option_name: string, isItFont?: boolean }): Promise<void> {
		const parent = await this.getParentByTitle({

			fieldName: label,
			isItFont: isItFont
		});
		await parent.locator(".et-fb-settings-option-select-advanced").click();
		await this.page.getByText(option_name, { exact: true }).click();
	}

	/**
	 * Toggles the control switch associated with a specified label.
	 *
	 * @param {Object} props - The parameters for the .
	 * @param {Page} props.page - The Playwright page object.
	 * @param {string} props.label - The label associated with the control switch.
	 * @returns {Promise<void>} - A Promise that resolves when the control switch is toggled.
	 */
	async settingsSwitch({ label }: { label: string }) {
		const parent = await this.getParentByTitle({

			fieldName: label,
		});

		await parent.locator(".et-core-control-toggle").click();
		await this.page.waitForLoadState();
	}

	/**
	 * Choose an icon from the icon list associated with a specified label.
	 * @param {Object} props - The parameters for the .
	 * @param {Page} props.page - The Playwright page object.
	 * @param {string} props.iconNumber - The index of the icon to choose (1-based index).
	 * @returns {Promise<void>} - A Promise that resolves when the icon is chosen.
	 */
	async settingsChooseIcon({ iconNumber }: { iconNumber: string }) {
		const parent = await this.getParentByTitle({

			fieldName: "Icon",
		});
		await parent.locator(`li:nth-child(${iconNumber})`).click();
	}

	/**
	 * Choose a color from the color manager associated with a specified label.
	 *
	 * @param {Object} props - The parameters for the .
	 * @param {Page} props.page - The Playwright page object.
	 * @param {string} props.label - The label associated with the color manager.
	 * @param {number} props.colorNumber - The index of the color swatch to choose (1-based index).
	 * @param {boolean} props.transparent - Whether to choose a transparent color.
	 * @returns {Promise<void>} - A Promise that resolves when the color is chosen.
	 */


	async settingsColor({

		label,
		colorNumber,
	}: {

		label: string,
		colorNumber: number,
	}) {
		const parent = await this.getParentByTitle({

			fieldName: label,
		});
		await parent
			.locator(".et-fb-settings-color-manager__swatches-row")
			.nth(colorNumber)
			.locator(".et-fb-settings-color-manager__swatches-swatch")
			.nth(1)
			.click();
	}
	async settingsColor__Transparent({

		label,
	}: {

		label: string,
	}) {
		const parent = await this.getParentByTitle({

			fieldName: label,
		});
		await parent.locator(".et-fb-settings-color-manager__reset-color").click();
	}
	async settingsColor__Gradient({

	}: {

		}) {
		await this.page.locator('.et-fb-icon--background-gradient').click();
		await this.settingsSwitch({

			label: 'Use gradient background'
		});
	}


	async settingsColor__Image({

	}: {

		}) {
		await this.page.locator('.et-fb-icon--background-image').click();
		await this.page.locator('.et-fb-settings-option-upload-type-image').click();
		await this.page.locator('#menu-item-browse').click();
		await this.page.locator('li.attachment').nth(1).click();
		await this.page.locator('.media-button-insert').click();
	}

	/**
	 * Adjust the value of a slider associated with a specified label.
	 *
	 * @param {Object} props - The parameters for the .
	 * @param {Page} props.page - The Playwright page object.
	 * @param {string} props.label - The label associated with the slider.
	 * @param {number} props.slide_value - The value to set on the slider.
	 * @returns {Promise<void>} - A Promise that resolves when the slider value is adjusted.
	 */
	async settingsSlider({ label, slide_value }: { label: string, slide_value: number }) {
		const parent = await this.getParentByTitle({

			fieldName: label,
		});
		await parent.locator("input.et-fb-settings-option-input").click();

		// Press the "Up" key 'slide_value' times
		for (let i = 0; i < slide_value; i++) {
			await this.page.keyboard.press("ArrowUp");
		}
	}

	/**
	 * Select a style like 'Alignment/ Font Style' from a list associated with a specified label on a this.page.
	 *
	 * @param {Object} props - The parameters for the .
	 * @param {Page} props.page - The Playwright page object.
	 * @param {string} props.label - The label associated with the button list.
	 * @param {number} props.select_number - The number of the style [for example first button[align-left] = 0].
	 * @returns {Promise<void>} - A Promise that resolves when the button is selected.
	 */
	async settingsSelectButton({ label, select_number, isItFont = false, isItAnchor = false }: {

		label: string,
		select_number: number,
		isItFont?: boolean,
		isItAnchor?: boolean,
	}) {
		const parent = await this.getParentByTitle({

			fieldName: label,
			isItFont: isItFont
		})
		await parent.locator(isItAnchor ? 'a' : 'button').nth(select_number).click();
	}

	async settingsAddNewChildItem({ tooltip_name }: {

		tooltip_name: string,
	}) {
		await this.page.locator(`button[data-tip='${tooltip_name}']`).click();
	}

	//SECTION - Validation Section
	/**
	 * Assert that a specific text is present in the specified selector.
	 *
	 * @param {Object} props - The parameters for the .
	 * @param {Page} props.page - The Playwright page object.
	 * @param {string} props.selector - The selector to check for text.
	 * @param {string} props.expected_text - The expected text.
	 * @returns {Promise<void>} - A Promise that resolves when the text assertion is complete.
	 */
	async expectText({

		selector,
		expected_text,
	}: {

		selector: string,
		expected_text: string
	}) {
		await expect.soft(await this.page.frameLocator('iFrame').locator(selector)).toContainText(expected_text);
	}

	async expectStyleValue({

		selector,
		style_name,
		expected_value
	}: {

		selector: string,
		style_name: string,
		expected_value: string,
	}) {
		await expect.soft(await this.page.frameLocator('iFrame').locator(selector)).toHaveCSS(style_name, expected_value);
	}
	//!SECTION

	async expectVisiblity({

		selector,
		expect_visiblity = true,
		snap_label,
	}: {

		selector: string,
		expect_visiblity?: boolean
		snap_label: string,
	}) {
		if (await expect_visiblity) {

			await expect.soft(await this.page.frameLocator('iFrame').locator(selector).first()).toBeVisible();
		}
		else {
			await expect.soft(await this.page.frameLocator('iFrame').locator(selector).first()).not.toBeVisible();
		}
		await this.page.screenshot({ path: `snapshots/expectVisiblity:${snap_label}.png` });
	}

}
