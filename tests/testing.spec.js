import { test, expect } from "@playwright/test";
import * as init from "./includes/components/cptGrid/controller"; // add content \\ add design
import * as global from './includes/global.ts' //global jobs : login,create page, save exit, 


const wordpressURL = 'http://play-diviflash.test';
const pluginFilePath = '/Users/syedsajib/Downloads/Office/checking /production/marketplace/diviflash.zip';
test("login-install-plugin", async ({ page }) => {
        await global.loginToSite(
                page,
                "play-diviflash.test",
                "admin",
                "admin"
        );
        await global.installPlugin(
                page, wordpressURL, pluginFilePath
        )
});
