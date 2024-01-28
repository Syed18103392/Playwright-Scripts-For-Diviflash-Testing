
import { test, expect } from "@playwright/test";
import { Global } from '../includes/global-fixures.ts';
import { CompositionHelper } from '../includes/composition-helpers.ts';
// import * as compose from "../includes/composition-helpers.ts";

const credential = {
       // latest_plugin_file_path: '/Users/syedsajib/Downloads/Office/checking /production/marketplace/diviflash.zip',
       testing_page_name: 'cpt_test',
       module_name: 'CPT Grid',
       module_id: () => {
              let id = credential.module_name.toLowerCase();
              id = id.replace(/ /g, '');  // Use replace with a regular expression to remove all spaces
              return id;
       }
};

test.beforeEach(async ({ page }) => {
       const compose = new CompositionHelper(page);
       const global_fixture = new Global(page);
       await page.goto('/wp-admin/edit.php?post_type=page')
       await global_fixture.createPage({
              page_name: credential.testing_page_name
       })
       await test.step('✅ Module Inserting Done', async () => {
              await global_fixture.openDiviBuilder();
              await global_fixture.insertModule(credential.module_name, `difl_${credential.module_id()}`);

              await compose.expectText({
                     selector: '.df_cptgrid_container h2',
                     expected_text: 'Please select a Post Type.'
              })
       }, true)


       //CPT Settings Select Post Type = Post 
       await compose.settingsSelectField({
              label: 'Post Type',
              option_name: 'Posts',
       })
});

test.describe('CPT', () => {
       test.describe.configure({ mode: "parallel" });
       test('🟢 Insert Post Thumbnail', async ({ page }) => {

              const compose = new CompositionHelper(page);

              /**
               * Add New Item 
               * Type: Image
               */
              await test.step('✅ Select image: and check visiblity', async () => {
                     await compose.settingsAddNewChildItem({ tooltip_name: 'Add New Item' });

                     await compose.settingsSelectField({
                            label: 'Type',
                            option_name: 'Image',
                     })
                     await compose.expectVisiblity({
                            selector: 'article a img',
                            snap_label: 'Post-Thumbnail'
                     })
              });
              await test.step('Out Side innerWrapper Testing ', async () => {
                     await test.step('Turn On', async () => {
                            await compose.settingsSwitch({

                                   label: 'Outside Inner Wrapper'
                            })
                            await compose.expectVisiblity({

                                   selector: '.df-cpt-outer-wrap img',
                                   snap_label: 'Outside Image Turn on',
                                   expect_visiblity: true
                            })
                     });
                     await test.step('Turn Off', async () => {
                            await compose.settingsSwitch({

                                   label: 'Outside Inner Wrapper'
                            })
                            await compose.expectVisiblity({

                                   selector: '.df-cpt-inner-wrap img',
                                   snap_label: 'Outside Image turn off',
                            })
                     });

              });

       });
       test('🟢 Insert Post Title ', async ({ page }) => {
              const compose = new CompositionHelper(page);

              /**
               * Add New Item 
               * Type: Title
               */
              await test.step('✅ Select Post Title: and check visiblity', async () => {
                     await compose.settingsAddNewChildItem({ tooltip_name: 'Add New Item' });
                     //Add Type Of The Item
                     await compose.settingsSelectField({

                            label: 'Type',
                            option_name: 'Title',
                     })
                     await compose.expectVisiblity({

                            selector: 'article h2.df-cpt-title a',
                            snap_label: 'Post-Title'
                     })
              });


       });
});

