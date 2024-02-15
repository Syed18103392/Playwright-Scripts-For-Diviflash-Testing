import { test, expect, selectors } from "@playwright/test";
import { Global } from '../../../includes/global-fixures.ts';
import { CompositionHelper } from '../../../includes/composition-helpers.ts';
import global_style_value from '../../../global-style-value.js';
import design_tab from './item-design-tab.ts'


export default async function (page, targetedSelector) {
	const compose = new CompositionHelper(page);
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
				await test.step('On', async () => {
					await compose.outsideWrapperTurnOn(targetedSelector)
				});
				await test.step('Off', async () => {
					await compose.outsideWrapperTurnOff(targetedSelector)
				});
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
				await test.step('Default=Inline Block', async () => {
					await compose.expectStyleValue({
						selector: targetedSelector,
						style_name: 'display',
						expected_value: 'inline-flex'
					})
					await test.step('Align', async () => {
						await test.step('Right', async () => {
							await compose.settingsSelectField({
								label: 'Align',
								option_name: 'Right'
							})
							await compose.expectStyleValue({
								selector: targetedSelector,
								style_name: 'float',
								expected_value: 'right'
							})
						});
						await test.step('Default', async () => {
							await compose.settingsSelectField({
								label: 'Align',
								option_name: 'Default'
							})
							await compose.expectStyleValue({
								selector: targetedSelector,
								style_name: 'float',
								expected_value: 'none'
							})
						});
					});
	
				});
				await test.step('Inline', async () => {
					await compose.settingsSelectField({
						label: 'Display',
						option_name: 'Inline'
					})
					await compose.expectStyleValue({
						selector: targetedSelector,
						expected_value: 'inline',
						style_name: 'display'
					})
					await test.step('Align', async () => {
						await test.step('Right', async () => {
							await compose.settingsSelectField({
								label: 'Align',
								option_name: 'Right'
							})
							await compose.expectStyleValue({
								selector: targetedSelector,
								style_name: 'float',
								expected_value: 'right'
							})
						});
						await test.step('Default', async () => {
							await compose.settingsSelectField({
								label: 'Align',
								option_name: 'Default'
							})
							await compose.expectStyleValue({
								selector: targetedSelector,
								style_name: 'float',
								expected_value: 'none'
							})
						});
					});
				});
				await test.step('Block', async () => {
					await compose.settingsSelectField({
						label: 'Display',
						option_name: 'Block'
					})
					await compose.expectStyleValue({
						selector: targetedSelector,
						expected_value: 'block',
						style_name: 'display'
					})
				});
			});
	
		});
		await test.step('Icon Settings', async () => {
			await compose.settingsToggle({
				label: 'Icon Settings'
			})
			await test.step('Use Image', async () => {
				compose.useImage();
				await compose.expectVisiblity({
					selector: `${targetedSelector} img.df-icon-image`,
					snap_label: 'Author Icon Image',
				})
				await test.step('Image Width', async () => {
					await compose.settingsSlider({
						label: 'Image Width',
						...global_style_value.icon_image_width.value
					})
					await compose.expectStyleValue({
						selector: `${targetedSelector} img.df-icon-image`,
						...global_style_value.icon_image_width.expected,
					})
				});
				await test.step('Vertical alig', async () => {
					
					await compose.settingsSelectField({
						label: 'Vertical align',
						option_name: 'Middle',
					})
					await compose.expectStyleValue({
						selector: `${targetedSelector} img.df-icon-image `,
						expected_value: 'middle',
						style_name: 'vertical-align'
					})
				});
			});
			await test.step('Use Icon', async () => {
				await compose.settingsSwitch({
					label:'Use Icon'
				})
				await compose.expectVisiblity({
					selector: `${targetedSelector} span.et-pb-icon`,
				})
				await test.step('Icon Color', async () => {
					await compose.settingsColor({
						'label' : 'Icon Color',
						...global_style_value.element_color_parent.value
					})
					await compose.expectStyleValue({
						selector:`${targetedSelector} span.et-pb-icon`,
						...global_style_value.element_color_parent.expected
					})
					page
				});
				await test.step('Icon Size', async () => {
					await compose.settingsSlider({
						label:'Icon Size',
						...global_style_value.icon_size_parent.value
					})
					await compose.expectStyleValue({
						selector: `${targetedSelector} span.et-pb-icon`,
						...global_style_value.icon_size_parent.expected
					})
				});
				
				
			});
			
	
	
	
		});
	});
	await design_tab(page,targetedSelector,{
		Alignment:true,
		BodyText:true,
		Spacing:true,
		Author_spacing:true
	});
}
