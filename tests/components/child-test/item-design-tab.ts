import { test, expect } from "@playwright/test";
import { Global } from '../../../includes/global-fixures.ts';
import { CompositionHelper } from '../../../includes/composition-helpers.ts';
import global_style_value from '../../../global-style-value.js';

export default async function (page, targetedSelector: string, {
    Alignment=false ,ImageSettings=false,BodyText=false,BeforeAfter=false,Spacing=false,Sizing=false,Border=false,BoxShadow=false
}){
    const compose = new CompositionHelper(page);
    await test.step('Design Element', async () => {
        await compose.enableDesignTab();
        if (Alignment) {
            await test.step('Alignment', async () => {
                await compose.settingsToggle({
                    label: 'Alignment'
                });
                await test.step('Text Alignment', async () => {
                    await compose.settingsSelectButton({
                        label: 'Text Alignment',
                        ...global_style_value.text_align_parent.value
                    })
                    await compose.expectStyleValue({
                        selector: targetedSelector,
                        ...global_style_value.text_align_parent.expected
                    })
                });
            });
        }
        if (BodyText) {
            await test.step('Body Text', async () => {
                await compose.settingsToggle({
                    label: 'Body Text',
                });
                await test.step('Body Font', async () => {
                    await compose.settingsSelectField({
                        label: 'Body Font',
                        ...global_style_value.font_family_parent.value,
                    })
                    await compose.expectStyleValue({
                        selector: targetedSelector,
                        ...global_style_value.font_family_parent.expected
                    })
                });
                await test.step('Body Font Weight', async () => {
                    await compose.settingsSelectField({
                        label: 'Body Font Weight',
                        option_name: 'Bold',
                        isItFont: true,
                    })
                    await compose.expectStyleValue({
                        selector: targetedSelector,
                        style_name: 'font-weight',
                        expected_value: '700'
                    })
                });
                await test.step('Body Font Style', async () => {
                    await compose.settingsSelectButton({
                        label: 'Body Font Style',
                        ...global_style_value.text_style_uppercase.value
                    })
                    await page.screenshot({ path: './../../../snapshots/bodyfontstyle.png' });
                    await compose.expectStyleValue({
                        selector: targetedSelector,
                        ...global_style_value.text_style_uppercase.expected
                    })
                });
                await test.step('BodyTextAlignment', async () => {
                    await compose.settingsSelectButton({
                        label: 'Body Text Alignment',
                        ...global_style_value.text_align_child.value
                    })
                    await page.screenshot({ path: './../../../snapshots/bodytextalignment.png' });
                    await compose.expectStyleValue({
                        selector: targetedSelector,
                        ...global_style_value.text_align_child.expected
                    })
                });
                await test.step('Body Text Color', async () => {
                    await compose.settingsColor({
                        label: 'Body Text Color',
                        ...global_style_value.element_color_parent.value
                    })
                    await compose.expectStyleValue({
                        selector: targetedSelector,
                        ...global_style_value.element_color_parent.expected
                    })
                });
                await test.step('Body Text Size', async () => {
                    await compose.settingsSlider({
                        label: 'Body Text Size',
                        ...global_style_value.font_size_parent.value
                    })

                    await compose.expectStyleValue({
                        selector: targetedSelector,
                        ...global_style_value.font_size_parent.expected
                    })
                });
                await test.step('Body Letter Spacing', async () => {
                    await compose.settingsSlider({
                        label: 'Body Letter Spacing',
                        ...global_style_value.letter_spacing_parent.value
                    })
                    await compose.expectStyleValue({
                        selector: targetedSelector,
                        ...global_style_value.letter_spacing_parent.expected
                    })
                });
                await test.step('Body Line Height', async () => {
                    await compose.settingsSlider({
                        label: 'Body Line Height',
                        ...global_style_value.line_height_parent.value
                    })
                    await compose.expectStyleValue({
                        selector: targetedSelector,
                        ...global_style_value.line_height_parent.expected
                    })
                });
                await test.step('Body Text Shadow', async () => {
                    await compose.settingsSelectButton({
                        label: 'Body Text Shadow', ...global_style_value.text_shadow_parent.value
                    })
                    await compose.expectStyleValue({
                        selector: targetedSelector, ...global_style_value.text_shadow_parent.expected
                    })
                });
            });
        }
        if (Spacing) {
            await test.step('Spacing', async () => {
                await compose.settingsToggle({
                    label: 'Spacing',
                })
                await test.step('Margin', async () => {
                    await compose.settingsMargin(global_style_value.margin_parent.value,'#et-fb-element_')
                    await compose.expectStyleValue({
                        'selector': targetedSelector,
                        ...global_style_value.margin_parent.expected
                    })
                });
                await test.step('Padding', async () => {
                    await compose.settingsMargin(global_style_value.padding_parent.value,'#et-fb-element_')
                    await compose.expectStyleValue({
                        'selector': targetedSelector,
                        ...global_style_value.margin_parent.expected
                    })
                });
            });

        }

    });

}
