import { test, expect, selectors } from "@playwright/test";
import { Global } from '../../../includes/global-fixures.ts';
import { CompositionHelper } from '../../../includes/composition-helpers.ts';
import global_style_value from '../../../global-style-value.js';
import design_tab from './item-design-tab.ts'
import { ContentTab } from "./item-content-tab.ts";


export default async function (page, targetedSelector) {
	const compose = new CompositionHelper(page);
	const contentElement = new ContentTab(page,targetedSelector);
	/**
	 * Add New Item 
	 * Type: Content
	 */
	await test.step('Content', async () => {
		await test.step('Element', async () => {
			await test.step('✅ Select Post Title: and check visiblity', async () => {
				await compose.settingsAddNewChildItem({ tooltip_name: 'Add New Item' });
				//Add Type Of The Item
				await compose.settingsSelectField({

					label: 'Type',
					option_name: 'Author',
				})
				await compose.expectVisiblity({

					selector: 'article .df-cpt-author-wrap a',
					snap_label: 'Post-Read-more-button'
				})
			});
			await test.step('Outside Inner Wrapper', async () => {
				await contentElement.settingsOutsideInnerWrapper()
			});
			await test.step('Show Author Image', async () => {
				await test.step('ON', async () => {
					await compose.settingsSwitch({
						label: 'Show Author Image'
					})
					await compose.expectVisiblity({
						selector: '.author-image',
						expect_visiblity: false,
						snap_label: 'author-image'
					})

				});
				await test.step('Off', async () => {
					await compose.settingsSwitch({
						label: 'Show Author Image'
					})
					await compose.expectVisiblity({
						selector: '.author-image',
						expect_visiblity: false,
						snap_label: 'author-image'
					})
					await compose.settingsSwitch({
						label: 'Show Author Image'
					})
				});
			});

			await test.step('Author Image Size', async () => {
				await compose.settingsSelectField({
					label: 'Author Image Size',
					...global_style_value.author_image_width.value,
				})
				await compose.expectStyleValue({
					selector: '.author-image img',
					...global_style_value.author_image_width.expected,
				})
			});
			await test.step('Hide Author Text', async () => {
				await test.step('On ', async () => {
					await compose.settingsSwitch({
						label: 'Hide Author Text'
					})
					await compose.expectVisiblity({
						selector: 'a[rel="author"]',
						expect_visiblity: false,
						snap_label: 'Hide-Author-Text-turn-on'
					})
				});
				await test.step('Off ', async () => {
					await compose.settingsSwitch({
						label: 'Hide Author Text'
					})
					await compose.expectVisiblity({
						selector: 'a[rel="author"]',
						expect_visiblity: true,
						snap_label: 'Hide-Author-Text-turn-off'
					})
				});
			});
			await test.step('Display', async () => {
				
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
	await design_tab(page, targetedSelector, {
		Alignment: true,
		BodyText: true,
		Spacing: true,
		Author_spacing: true,
		Border: true,
		BoxShadow: true
		// Sizing:true //FIXME - this
	});
}
