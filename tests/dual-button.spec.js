import { test, expect } from "@playwright/test";
import * as init from "./controller";

test("dual-button", async ({ page }) => {
	await init.loginToSiteAndCreatePage(
		page,
		"test",
		"play-diviflash.local",
		"sajib",
		"123"
	);
	await init.openDiviBuilder(page);
	await init.insertModule(page, "Dual Button", "difl_dual_button");
	await init.fillContents(page);
	await init.addDesign(page);
	// Save and Exit builder
	await init.saveAndExitBuilder(page);
	await init.removeTestPage(page);
	//remove page
});
