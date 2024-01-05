import * as components from "./component-elements";
import * as compose from "../../composition-helpers";
import { Page } from "playwright";


//SECTION - Add Content
export async function fillContents(page) {
	await compose.enableContentTab(page);
	//add data
	await components.button({
		page: page,
		toggle_name: "Left button",
		click: false,
		btn_name: "First Button",
		btn_url: "google.com",
		in_the_new_tab: false,
	});

	//validation
	await compose.expectText({
		page: page,
		selector: ".df_button_left",
		expected_text: "First Button",
	});
	//add button data
	await components.button({
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
		label: "Button Separator",
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

	//Button Styles
	await compose.settingsToggle({
		page: page,
		label: "Button Styles",
	});
	await components.buttonStyles(page);
	await components.buttonText({ page: page, button_name: "Left" });
	await components.buttonStyle({ page: page, button_name: 'Left' });
	await components.buttonText({ page: page, button_name: "Right" });
}

//!SECTION
