import { test, expect } from "@playwright/test";
import * as init from "./includes/components/duelButton/controller";
import * as global from './includes/global.ts'

test("test-dual-button", async ({ page }) => {
	await global.loginToSiteAndCreatePage(
		page,
		"test",
		"play-diviflash.local",
		"sajib",
		"123"
	);
	await global.openDiviBuilder(page);
	await global.insertModule(page, "Dual Button", "difl_dual_button");
	await init.fillContents(page);
	await init.addDesign(page);
	// Save and Exit builder
	await global.saveAndExitBuilder(page);
	await global.removeTestPage(page);
	//remove page
});
