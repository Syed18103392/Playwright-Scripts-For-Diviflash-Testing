import { test, expect } from "@playwright/test";
import { CompositionHelper } from '../../../includes/composition-helpers.ts';
import itemDesignTab from './item-design-tab.ts'
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
				await test.step('Add Child Item Type', async () => {
					await contentElement.addChildItem('Read More Button');
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

                            await contentElement.contentIconSettings(true);
                     });
                     

              });
              await test.step('Module Background', async () => {
			await contentElement.settingsModuleBackground()
		});
       });
await itemDesignTab(page,targetedSelector,{
       Alignment:true,
       BodyText:true,
       Spacing:true,
       Border:true
})
       
}
