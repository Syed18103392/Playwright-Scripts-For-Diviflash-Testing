import { test, expect } from "@playwright/test";
import * as init from "./includes/components/cptGrid/controller"; // add content \\ add design
import * as global from './includes/global.ts' //global jobs : login,create page, save exit, 


test("test-cpt-grid", async ({ page }) => {
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
        await global.insertModule(page, "CPT Grid", "difl_cptgrid");
        await init.addContent(page);
        // await init.addDesign(page);
        // Save and Exit builder
        await global.saveAndExitBuilder(page);
        await global.removeTestPage(page);
        //remove page
});
