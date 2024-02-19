import { test, expect } from "@playwright/test";
import { Global } from '../../../includes/global-fixures.ts';
import { CompositionHelper } from '../../../includes/composition-helpers.ts';
import design_tab from './item-design-tab.ts'
import { ContentTab } from "./item-content-tab.ts";

export default async (page, targetedSelector) => {
	const compose = new CompositionHelper(page);
	const contentElement = new ContentTab(page,targetedSelector)

	/**
	 * Add New Item 
	 * Type: Content
	 */

	await test.step('Content', async () => {
		
		//Add Type Of The Item
		await test.step('Element', async () => {
			await test.step('✅ Select Post Publish Date', async () => {
				await compose.settingsAddNewChildItem({ tooltip_name: 'Add New Item' });
				await compose.settingsSelectField({
					label: 'Type',
					option_name: 'Publish Date',
				})
				await compose.expectVisiblity({
					selector: `article ${targetedSelector}`,
					snap_label: 'Post-Read-more-button'
				})
				await test.step('Outside Inner Wrapper ', async () => {
					await contentElement.settingsOutsideInnerWrapper();
				})
				await test.step('Display', async () => {
					await compose.settingsDisplay(test, targetedSelector)
				});
			});
			await test.step('Icon Settings', async () => {
				await compose.settingsToggle({
					label: 'Icon Settings'
				})
				await compose.settingsIconSettings(test, targetedSelector)
			});
			await test.step('Module Background', async () => {
				await contentElement.settingsModuleBackground()
			});
		});
	});
	await design_tab(page, targetedSelector, {
		Alignment: true,
		BodyText:true,
		Spacing: true,
		// Sizing:true,
		Border: true,
		BoxShadow: true,
	});
}
