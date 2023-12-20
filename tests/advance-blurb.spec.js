import { test, expect } from "@playwright/test";
import * as init from "./init";

test("advance-blurb", async ({ page }) => {
	await init.login_to_site_and_create_page(
		page,
		"test",
		"http://play-diviflash.test",
		"sajib",
		"123"
	);
	await init.open_divi_builder(page);
	await init.insert_module(page, "Advanced Blurb", "difl_advanced_blurb");

	// Add module content text
	await page.locator("input#et-fb-title").fill("This is test Title");
	await page.locator("input#et-fb-sub_title").fill("This is test Sub Title");
	await page
		.locator(
			"a.et-fb-switch-editor-mode__tab.et-fb-switch-editor-mode__tab--html"
		)
		.click();
	await page
		.locator(".et-fb-tinymce-html-input")
		.fill("This is Content Text");

	//Add button content
	await page
		.locator(".et-fb-form__toggle[data-order='2'][data-name='button']")
		.click();
	await page.locator("#et-fb-button_text").fill("Blurb Button");
	await page.locator("#et-fb-button_url").fill("google.com");

	await page.locator("#et-fb-button_url_new_window").click();
	await page.getByText("In The New Tab").click();

	await page
		.locator(".et-fb-form__toggle[data-order='3'][data-name='image']")
		.click();

	await init.upload_image(page);

	// check builder
	await init.vb_button_validation(
		page,
		".df_ab_blurb_button",
		"Blurb Button"
	);

	// Save and Exit builder
	await init.save_and_exit_builder(page);

	// Check in the fontend
	await init.front_end_button_validation(
		page,
		".df_ab_blurb_button",
		"Blurb Button",
		"_blank"
	);

	//remove page
	await init.remove_test_page(page);
});
