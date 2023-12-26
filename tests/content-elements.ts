import * as compose from "./composition-helpers";
import { Page } from 'playwright';


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
		await compose.toggle_control({ page: page, control_name: toggle_name });
	}
	//fill text & Url
	await compose.fillInputField({ page: page, label: "Text", text: btn_name });
	await compose.fillInputField({ page: page, label: "URL", text: btn_url });
	//set Link Target

	if (in_the_new_tab) {
		await compose.selectField({
			page: page,
			label: "Link Target",
			option_name: "In The New Tab",
		});
	}
}
