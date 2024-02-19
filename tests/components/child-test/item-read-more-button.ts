import { test, expect } from "@playwright/test";
import { Global } from '../../../includes/global-fixures.ts';
import { CompositionHelper } from '../../../includes/composition-helpers.ts';
import exp from "constants";
import design_tab from './item-design-tab.ts'
import { ContentTab } from "./item-content-tab.ts";


export default async function (page,targetedSelector) {
       const compose = new CompositionHelper(page);
       const contentElement = new ContentTab(page,targetedSelector);
       /**
        * Add New Item 
        * Type: Read More Button
        */
       await test.step('Content', async () => {
              //Add Type Of The Item
              await test.step('Element', async () => {
                     await test.step('✅ Select Post Title: and check visiblity', async () => {
                            await compose.settingsAddNewChildItem({ tooltip_name: 'Add New Item' });
                            await test.step('Type', async () => {
                                   await compose.settingsSelectField({
                                          label: 'Type',
                                          option_name: 'Read More Button',
                                   })
                                   await compose.expectVisiblity({
                                          selector: `article ${targetedSelector}`,
                                          snap_label: 'Post-Read-more-button'
                                   })
                            });
                            await test.step('Read More Text', async () => {
                                   await compose.settingsFillInputField({
                                          label:'Read More Text',
                                          text:'Button'
                                   })
                                   await compose.expectText({
                                          selector:`${targetedSelector} a`,
                                          expected_text:'Button'
                                   })
                            });
                     });
                     await test.step('Icon Settings', async () => {
                            await compose.settingsToggle({
                                   label:'Icon Settings'
                            })

                            await compose.settingsIconSettings(test,targetedSelector,true)
                     });
                     

              });
              await test.step('Module Background', async () => {
			await contentElement.settingsModuleBackground()
		});
       });
await design_tab(page,targetedSelector,{
       Alignment:true,
       BodyText:true,
       Spacing:true,
       Border:true
})
       
}
