
import { test, expect } from "@playwright/test";
// import * as init from "./includes/components/cptGrid/controller"; // add content \\ add design
// import * as global from './includes/global.ts' //global jobs : login,create page, save exit, 
// import { Global } from './includes/global-fixures.ts';


import { chromium, type FullConfig } from '@playwright/test';
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

async function globalSetup(config: FullConfig) {
       const { baseURL, storageState } = config.projects[0].use;
       const browser = await chromium.launch();
       const page = await browser.newPage();
       await page.goto(`${baseURL}wp-admin`);
       await page.screenshot();
       await page.getByLabel("Username or Email Address").fill(credential.login_username);
       await page.getByLabel("Password", { exact: true }).click();
       await page.getByLabel("Password", { exact: true }).fill(credential.login_password);
       await page.getByRole("button", { name: "Log In" }).click();
       await page.context().storageState({ path: storageState as string });
       await browser.close();
} 

export default globalSetup;
