import { test, expect } from "@playwright/test";
import { CompositionHelper } from '../../../includes/composition-helpers.ts';
import itemDesignTab from './item-design-tab.ts'
import { ContentTab } from "./item-content-tab.ts";


export default async function (page, targetedSelector) {
    const compose = new CompositionHelper(page);
    const contentElement = new ContentTab(page, targetedSelector);
    await test.step('Content', async () => {

        await test.step('Element', async () => {
            await test.step('Add Child Item Type', async () => {

                await contentElement.addChildItem('Taxonomy', false);

                await test.step('Post Type', async () => {
                    await contentElement.postType('Posts');

                    await test.step('Select Taxonomy', async () => {
                        await contentElement.selectTaxonomy('category')

                        //Check Visiblity
                        await compose.expectVisiblity({
                            selector: targetedSelector,
                        })

                    });
                    
                });

            });
            await test.step('Outside Inner Wrapper', async () => {
                await contentElement.settingsOutsideInnerWrapper();
            });
            await test.step('Display', async () => {
                await contentElement.cssDisplay();
            });
        });

        await test.step('Icon Settings', async () => {
            
            await compose.settingsToggle({
				label: 'Icon Settings'
			})
            await contentElement.contentIconSettings();

        });
    });


    await itemDesignTab(page, targetedSelector, {
        Alignment: true,
        BodyText: true,
        Spacing: true,
        Border: true,
        BoxShadow: true
    })






}
