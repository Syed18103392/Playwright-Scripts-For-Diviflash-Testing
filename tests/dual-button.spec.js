import { test, expect } from "@playwright/test";
import * as init from "./controller";

test("dual-button", async ({ page }) => {
	await init.login_to_site_and_create_page(
		page,
		"test",
		"play-diviflash.test",
		"sajib",
		"123"
	);
	await init.open_divi_builder(page);
	await init.insert_module(page, "Dual Button", "difl_dual_button");
	await init.fill_contents(page);
	// Save and Exit builder
	await init.save_and_exit_builder(page);

	//remove page
	await init.remove_test_page(page);
});
