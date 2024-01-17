import { test, expect } from "@playwright/test";
import * as init from "./includes/components/duelButton/controller";
import * as global from './includes/global.ts'

test("test-dual-button", async ({ page }) => {
	await global.loginToSite(
		page,
		"play-diviflash.test",
		"admin",
		"admin"
	);
	await global.createPage({
		page: page,
		page_name: 'test-cpt'
	})
	await global.openDiviBuilder(page);
	await global.insertModule(page, "Dual Button", "difl_dual_button");
	await init.fillContents(page);
	await init.addDesign(page);
	// Save and Exit builder
	await global.saveAndExitBuilder(page);
	await global.removeTestPage(page);
	//remove page
});
