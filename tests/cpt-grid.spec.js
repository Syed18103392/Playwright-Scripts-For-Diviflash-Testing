
import { test, expect } from "@playwright/test";
import * as init from "./includes/components/cptGrid/controller"; // add content \\ add design
import * as global from './includes/global.ts' //global jobs : login,create page, save exit, 

const credential = {
        // latest_plugin_file_path: '/Users/syedsajib/Downloads/Office/checking /production/marketplace/diviflash.zip',
        wordpressURL: 'http://play-diviflash.test',
        login_username: 'admin',
        login_password: 'admin',
        testing_page_name: 'cpt_test',
        module_name: 'CPT Grid',
        module_id: () => {
                let id = credential.module_name.toLowerCase();
                id = id.replace(/ /g, '');  // Use replace with a regular expression to remove all spaces
                return id;
        }
};


test("test-cpt-grid", async ({ page }) => {
        console.group();
        await global.loginToSite(
                page,
                credential.wordpressURL,
                credential.login_username,
                credential.login_password
        );
        console.log(`🔥 Login To Site .. finised 🔥`);
        await global.createPage({
                page: page,
                page_name: credential.testing_page_name
        })
        if (credential.latest_plugin_file_path) {
                console.log(`🔥 Installing Latest Diviflash 🔥`);
                await global.installPlugin(
                        page, credential.wordpressURL, credential.latest_plugin_file_path
                )
                console.log(`🔥 Diviflash Installed 🔥`);
        }

        console.log(`🔥 Start opening Divi Builder 🔥`);
        await global.openDiviBuilder(page);
        console.log(`🔥 Ending opening Divi Builder 🔥`);

        console.log(`🔥 Start Module Inserting 🔥`);
        await global.insertModule(page, credential.module_name, `difl_${credential.module_id()}`);
        console.log(`🔥 Module Inserting Done 🔥`);

        console.log(`🔥 Start Content Inserting 🔥`);
        await init.addContent(page);
        console.log(`🔥 Content Adding Done 🔥`);
        // await init.addDesign(page);
        // Save and Exit builder
        await global.saveAndExitBuilder(page);
        console.log(`🔥 Close the builder 🔥`);
        await global.removeTestPage(page);

        console.groupEnd();
        //remove page
});
