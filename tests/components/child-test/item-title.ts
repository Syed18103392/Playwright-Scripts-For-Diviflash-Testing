import { test, expect } from "@playwright/test";
import { Global } from '../../../includes/global-fixures.ts';
import { CompositionHelper } from '../../../includes/composition-helpers.ts';
import design_tab from './item-design-tab.ts'
import { ContentTab } from "./item-content-tab.ts";

export default async (page,targetedSelector) => {
	const compose = new CompositionHelper(page);
	const contentElement = new ContentTab(page,targetedSelector);
	/**
	 * Add New Item 
	 * Type: Title
	 */
	await test.step('Content', async () => {
		await test.step('Element', async () => {
			await test.step('✅ Select Post Title: and check visiblity', async () => {
				await compose.settingsAddNewChildItem({ tooltip_name: 'Add New Item' });
				//Add Type Of The Item
				await compose.settingsSelectField({

					label: 'Type',
					option_name: 'Title',
				})
				await compose.expectVisiblity({

					selector: `article ${targetedSelector} h2.df-cpt-title a`,
					snap_label: 'Post-Title'
				})
				
			});
			await test.step('Title Tag', async () => {
				await contentElement.htmlTags
				('Title Tag',
				[
					'h1 tag','h2 tag','h3 tag','h4 tag','h5 tag','h6 tag','span tag','div tag'
				],
				' tag' // suffix ["h1 tag"], here ' tag' is the suffix
				)
			});
			
		});

	});
	await design_tab(page, targetedSelector, {
		Alignment: true,
		// BodyText: true,
		// Spacing: true,
		// Border: true
	})



}
