import { test, expect } from "@playwright/test";
import { CompositionHelper } from '../../../includes/composition-helpers.ts';
import itemDesignTab from './item-design-tab.ts'
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
				await test.step('Add Child Item Type', async () => {
					await contentElement.addChildItem('Title');
				});
				
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

			await test.step('Background', async () => {
				contentElement.settingsModuleBackground();
			});
		});

	});
	await itemDesignTab(page, targetedSelector, {
		Alignment: true,
		BodyText: true,
		Spacing: true,
		Border: true
	})



}
