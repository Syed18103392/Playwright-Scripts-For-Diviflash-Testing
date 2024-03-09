import { Page, test, expect } from "@playwright/test";
import { CompositionHelper } from '../../../includes/composition-helpers.ts';
import itemDesignTab from './item-design-tab.ts'
import { ContentTab } from "./item-content-tab.ts";

export default async (page: Page, targetedSelector: string) => {
    const compose = new CompositionHelper(page);
    const contentElement = new ContentTab(page, targetedSelector)

    await test.step('Content', async () => {

        //Element 
        await test.step('Element', async () => {

            //Add Type Of The Item
            await test.step('Add Child Item Type', async () => {
                await contentElement.addChildItem('Custom Text',false);
            });

            //Custom text Content
            await test.step('Custom Text', async () => {
                await compose.settingsFillInputField({
                    label: 'Custom Text',
                    text: 'Custom Content'
                })
                await compose.expectVisiblity({
                    selector: targetedSelector
                })
            });

            //Outside Wrapper
            await test.step('Outside Wrapper', async () => {
                await contentElement.settingsOutsideInnerWrapper();
            });

            //Display
            await test.step('Display', async () => {
                await contentElement.cssDisplay();
            });


        });

        await test.step('Background', async () => {
            await contentElement.settingsModuleBackground()
        });

    });
    await itemDesignTab(page,targetedSelector,{
		Alignment:true,
		BodyText:true,
		Spacing:true,
		Border:true,
		BoxShadow:true,	
	});

}
