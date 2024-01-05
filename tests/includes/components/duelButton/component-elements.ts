import { expect } from "@playwright/test";
import * as compose from "../../composition-helpers";
import { Page } from "playwright";

/**
 * Perform some action on button.
 *
 * @param {Object} props - The props for the function.
 * @param {Page} props.page - The page object on which the action will be performed.
 * @param {string} props.toggle_name - The name for toggling.
 * @param {boolean} props.click - Whether to perform a click action.
 * @param {string} props.btn_name - The name for a button.
 * @param {string} props.btn_url - The URL for a button.
 * @param {boolean} props.in_the_new_tab - Whether to open the link in a new tab.
 * @returns {Promise<void>} A promise that resolves when the action is completed.
 */
export async function button({
	page,
	toggle_name,
	click,
	btn_name,
	btn_url,
	in_the_new_tab,
}: {
	page: Page;
	toggle_name: string;
	click: boolean;
	btn_name: string;
	btn_url: string;
	in_the_new_tab: boolean;
}) {
	if (click) {
		await compose.settingsToggle({ page: page, label: toggle_name });
	}
	//fill text & Url
	await compose.settingsFillInputField({
		page: page,
		label: "Text",
		text: btn_name,
	});
	await compose.settingsFillInputField({
		page: page,
		label: "URL",
		text: btn_url,
	});
	//set Link Target

	if (in_the_new_tab) {
		await compose.settingsSelectField({
			page: page,
			label: "Link Target",
			option_name: "In The New Tab",
		});
	}
}

export async function buttonStyles(page: Page) {
	// Button Style
	//--Vertical
	await compose.settingsSelectField({
		page: page,
		label: "Button Style",
		option_name: "Vertical",
	});
	await compose.expectStyleValue({
		page: page,
		selector: ".df_button_container",
		style_name: "flex-direction",
		expected_value: "column",
	});

	//--Horizontal
	await compose.settingsSelectField({
		page: page,
		label: "Button Style",
		option_name: "Horizontal",
	});
	await compose.expectStyleValue({
		page: page,
		selector: ".df_button_container",
		style_name: "flex-direction",
		expected_value: "row",
	});

	// Alignment

	//--Left
	await compose.settingsSelectButton({
		page: page,
		label: "Alignment",
		select_number: 0,
	});
	await compose.expectStyleValue({
		page: page,
		selector: ".df_button_container",
		style_name: "justify-content",
		expected_value: "flex-start",
	});
	//--center
	await compose.settingsSelectButton({
		page: page,
		label: "Alignment",
		select_number: 1,
	});
	await compose.expectStyleValue({
		page: page,
		selector: ".df_button_container",
		style_name: "justify-content",
		expected_value: "center",
	});
	//--right
	await compose.settingsSelectButton({
		page: page,
		label: "Alignment",
		select_number: 2,
	});
	await compose.expectStyleValue({
		page: page,
		selector: ".df_button_container",
		style_name: "justify-content",
		expected_value: "flex-end",
	});
}

export async function buttonText({
	page,
	button_name,
}: {
	page: Page;
	button_name: string;
}) {
	await compose.settingsToggle({
		page: page,
		label: `${button_name} Button Text`,
	});
	await compose.settingsSelectField({
		page: page,
		label: `${button_name} Button Font`,
		option_name: "Abel",
		isItFont: true,
	});
	await compose.settingsSelectButton({
		page: page,
		label: `${button_name} Button Font Style`,
		select_number: 2,
		isItFont: true,
	});
	await compose.settingsSelectButton({
		page: page,
		label: `${button_name} Button Text Alignment`,
		select_number: 2,
	});
	await compose.settingsColor({
		page: page,
		label: `${button_name} Button Text Color`,
		colorNumber: 3,
	});
	// await compose.settingsColor__Transparent({
	// 	page: page,
	// 	label: `${button_name} Button Text Color`
	// })

	await compose.settingsSlider({
		page: page,
		label: `${button_name} Button Text Size`,
		slide_value: 10,
	});
	await compose.settingsSlider({
		page: page,
		label: `${button_name} Button Letter Spacing`,
		slide_value: 6,
	});
	await compose.settingsSlider({
		page: page,
		label: `${button_name} Button Line Height`,
		slide_value: 2,
	});
	await compose.settingsSelectButton({
		page: page,
		label: `${button_name} Button Text Shadow`,
		select_number: 2,
		isItAnchor: true,
	});
}
export async function buttonStyle({ page, button_name }: { page: Page, button_name: string }) {
	await compose.settingsToggle({
		page: page,
		label: `${button_name} Button Style`
	})
	// await compose.settingsColor__Transparent({
	// 	page: page,
	// 	label: 'Backgound Color'
	// });
	await compose.settingsColor({
		page: page,
		label: 'Background Color',
		colorNumber: 3,
	})
	await compose.expectStyleValue({
		page: page,
		selector: `.df_button_${button_name.toLocaleLowerCase()}`,
		style_name: 'background-color',
		expected_value: 'rgb(224, 43, 32)' //#E02B20
	})
	await compose.settingsColor__Gradient({ page: page });

	await compose.expectStyleValue({
		page: page,
		selector: `.df_button_${button_name.toLocaleLowerCase()}`,
		style_name: 'background-image',
		expected_value: 'linear-gradient(rgb(43, 135, 218) 0%, rgb(41, 196, 169) 100%)' //linear-gradient( 180deg, #2b87da 0%, #29c4a9 100% )
	})
	await compose.settingsColor__Image({ page: page });
}
