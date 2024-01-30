import { test, expect } from "@playwright/test";
import { Global } from '../../../includes/global-fixures.ts';
import { CompositionHelper } from '../../../includes/composition-helpers.ts';

const selector = '.df-cpt-content-wrap';

export default test('🟢 Insert Post Content @current', async ({ page }) => {
	const compose = new CompositionHelper(page);

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

					selector: selector,
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
						selector: selector,
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
						selector: selector,
						snap_label: 'Post-Content-excerpt'
					})
				});


			});


		});
		await test.step('Module Background', async () => {
			await compose.settingsToggle({ label: 'Background' });
			await test.step('Color', async () => {
				await compose.settingsBackgroundColor__DefaultDivi(selector);
			});
			await test.step('Transparent', async () => {
				await compose.settingsBackgroundTransparent__DefaultDivi(selector);
			});
			await test.step('Gradient', async () => {
				await compose.settingsBackgroundGradient__DefaultDivi(selector);
			});
			await test.step('Image', async () => {
				await compose.settingsBackgroundImage__DefaultDivi(selector);
			});
		});
	});

	await test.step('Design Element', async () => {
		await compose.enableDesignTab();
		await test.step('Alignment', async () => {
			await compose.settingsToggle({
				label: 'Alignment'
			});
			await test.step('Text Alignment', async () => {
				await compose.settingsSelectButton({
					label: 'Text Alignment',
					select_number: 2,
				})
				await compose.expectStyleValue({
					selector: selector,
					style_name: 'text-align',
					expected_value: 'right',
				})
			});
		});
		await test.step('BodyText', async () => {
			await compose.settingsToggle({
				label : 'Body Text',
			});
			await test.step('BodyFont', async () => {
				await compose.settingsSelectField({
					label: 'Body Font',
					option_name: 'Abel',
					isItFont:true,
				})
				await compose.expectStyleValue({
					selector: selector,
					style_name: 'font-family',
					expected_value: "Abel, Helvetica, Arial, Lucida, sans-serif"
				})
			});
			await test.step('BodyFontWeight', async () => {
				await compose.settingsSelectField({
					label: 'Body Font Weight',
					option_name: 'Bold',
					isItFont:true,
				})
				await compose.expectStyleValue({
					selector: selector,
					style_name: 'font-weight',
					expected_value: '700'
				})
			});
			await test.step('BodyFontStyle', async () => {
				await compose.settingsSelectButton({
					label: 'Body Font Style',
					select_number: 1, //uppercase
					isItFont:true,
				})
				await page.screenshot({path:'./../../../snapshots/bodyfontstyle.png'});
				await compose.expectStyleValue({
					selector: selector,
					style_name: 'text-transform',
					expected_value: 'uppercase'
				})
			});
			await test.step('BodyTextAlignment', async () => {
				await compose.settingsSelectButton({
					label: 'Body Text Alignment',
					select_number: 1, //center
				})
				await page.screenshot({path:'./../../../snapshots/bodytextalignment.png'});
				await compose.expectStyleValue({
					selector: selector,
					style_name: 'text-align',
					expected_value: 'center'
				})
			});
		});


	});
});
