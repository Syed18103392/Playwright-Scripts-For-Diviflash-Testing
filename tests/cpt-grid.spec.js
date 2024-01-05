import { test, expect } from "@playwright/test";
import * as init from "./includes/components/cptGrid/controller";

test("test-cpt-grid", async ({ page }) => {
        await init.loginToSiteAndCreatePage(
                page,
                "cpt-test",
                "play-diviflash.local",
                "sajib",
                "123"
        );
        await init.openDiviBuilder(page);
        await init.insertModule(page, "CPT Grid", "difl_cptgrid");
        // await init.fillContents(page);
        // await init.addDesign(page);
        // Save and Exit builder
        await init.saveAndExitBuilder(page);
        await init.removeTestPage(page);
        //remove page
});
