import { test, expect } from "@playwright/test";
import { Global } from '../../../includes/global-fixures.ts';
import { CompositionHelper } from '../../../includes/composition-helpers.ts';
import global_style_value from '../../../global-style-value.js';
import design_tab from './item-design-tab.ts'
import { ContentTab } from "./item-content-tab.ts";

export default async (page, targetedSelector) => {
	const compose = new CompositionHelper(page);
const contentElement = new ContentTab(page,targetedSelector)
	await test.step('Content', async () => {
		await compose.settingsAddNewChildItem({ tooltip_name: 'Add New Item' });

		await test.step('Element', async () => {
			//Add Type Of The Item
			await test.step('Select Type', async () => {
				await compose.settingsSelectField({

					label: 'Type',
					option_name: 'Content',
				})
				await compose.expectVisiblity({
					selector: targetedSelector,
					snap_label: 'Post-Excerpt'
				})
			});

			await test.step('Post Content', async () => {
				await test.step('Show Content', async () => {
					await compose.settingsSelectField(
						{
							label: 'Post Content',
							option_name: 'Show Content'
						}
					)
					await compose.expectVisiblity({
						selector: targetedSelector,
						snap_label: 'Post-Content-content'
					})
				});
				await test.step('Show Excerpt', async () => {
					await compose.settingsSelectField(
						{
							label: 'Post Content',
							option_name: 'Show Excerpt'
						}
					)
					await compose.expectVisiblity({
						selector: targetedSelector,
						snap_label: 'Post-Content-excerpt'
					})
				});
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
		Border:true,
		BoxShadow:true,
		
	});

}
