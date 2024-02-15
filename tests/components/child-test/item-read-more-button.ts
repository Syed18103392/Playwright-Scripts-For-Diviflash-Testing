import { test, expect } from "@playwright/test";
import { Global } from '../../../includes/global-fixures.ts';
import { CompositionHelper } from '../../../includes/composition-helpers.ts';
import exp from "constants";

export default async function (page,selector) {
       const compose = new CompositionHelper(page);
       /**
        * Add New Item 
        * Type: Read More Button
        */
       await test.step('✅ Select Post Title: and check visiblity', async () => {
              await compose.settingsAddNewChildItem({ tooltip_name: 'Add New Item' });
              //Add Type Of The Item
              await test.step('Content', async () => {
                     await test.step('Element', async () => {

                            await test.step('Type', async () => {
                                   await compose.settingsSelectField({
                                          label: 'Type',
                                          option_name: 'Read More Button',
                                   })
                                   await compose.expectVisiblity({
                                          selector: `article ${selector}`,
                                          snap_label: 'Post-Read-more-button'
                                   })
                            });
                            await test.step('Read More Text', async () => {
                                   await compose.settingsFillInputField({
                                          label:'Read More Text',
                                          text:'Button'
                                   })
                                   await compose.expectText({
                                          selector:`${selector} a`,
                                          expected_text:'Button'
                                   })
                            });

                     });
                     await test.step('Icon Settings', async () => {
                            await compose.settingsToggle({
                                   label:'Icon Settings'
                            })

                            await compose.settingsUseIcons(test,selector)
                     });
                     

              });



       });
}
