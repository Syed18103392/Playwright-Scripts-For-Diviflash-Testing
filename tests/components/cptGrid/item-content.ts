import { test, expect } from "@playwright/test";
import { Global } from '../../../includes/global-fixures.ts';
import { CompositionHelper } from '../../../includes/composition-helpers.ts';

export default test('🟢 Insert Post Content @current', async ({ page }) => {
       const compose = new CompositionHelper(page);

       /**
        * Add New Item 
        * Type: Content
        */
       await test.step('Element', async () => {
              await compose.settingsAddNewChildItem({ tooltip_name: 'Add New Item' });
              //Add Type Of The Item
              await test.step('Select Type', async () => {
                     await compose.settingsSelectField({

                            label: 'Type',
                            option_name: 'Content',
                     })
                     await compose.expectVisiblity({

                            selector: 'article .df-cpt-content-wrap p',
                            snap_label: 'Post-Excerpt'
                     })
              });

              await test.step('Post Content', async () => {
                     await test.step('Show Content', async () => {
                            compose.settingsSelectField(
                                   {
                                          label: 'Post Content',
                                          option_name: 'Show Content'
                                   }
                            )
                            compose.expectVisiblity({
                                   selector: 'article .df-cpt-content-wrap',
                                   snap_label: 'Post-Content-content'
                            })
                     });
                     await test.step('Show Excerpt', async () => {
                            compose.settingsSelectField(
                                   {
                                          label: 'Post Content',
                                          option_name: 'Show Excerpt'
                                   }
                            )
                            compose.expectVisiblity({
                                   selector: 'article .df-cpt-content-wrap',
                                   snap_label: 'Post-Content-excerpt'
                            })
                     });


              });


       });
       await test.step('Module Background', async () => {
              await compose.settingsToggle({ label: 'Background' });
              await test.step('Color', async () => {
                     await compose.settingsBackgroundColor__DefaultDivi('.df-cpt-content-wrap');
              });
              await test.step('Gradient', async () => {
                     await compose.settingsBackgroundGradient__DefaultDivi('.df-cpt-content-wrap');
              });
              await test.step('Image', async () => {
                     await compose.settingsBackgroundImage__DefaultDivi('.df-cpt-content-wrap');
              });
       });





});
