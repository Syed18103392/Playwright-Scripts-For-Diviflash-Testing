import { test, expect } from "@playwright/test";
import { CompositionHelper } from '../../../includes/composition-helpers.ts';
import global_style_value from '../../../global-style-value.js';

export default async function (page, targetedSelector: string, {
    Alignment = false,
    ImageSettings = false,
    BodyText = false,
    BeforeAfter = false,
    Spacing = false,
    Author_spacing = false,
    Sizing = false,
    Border = false,
    BoxShadow = false
}) {
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
                    await page.screenshot();
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
                    await page.screenshot();
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
                    await compose.settingsMargin(global_style_value.margin_parent.value, '#et-fb-element_')
                    await compose.expectStyleValue({
                        'selector': targetedSelector,
                        ...global_style_value.margin_parent.expected
                    })
                });
                await test.step('Padding', async () => {
                    await compose.settingsMargin(global_style_value.padding_parent.value, '#et-fb-element_')
                    await compose.expectStyleValue({
                        'selector': targetedSelector,
                        ...global_style_value.margin_parent.expected
                    })
                });
                if (Author_spacing) {
                    await test.step('Author Image Margin', async () => {
                        await compose.settingsMargin(
                            global_style_value.author_margin_parent.value,
                            '#et-fb-author_image_'
                        )

                        await compose.expectStyleValue({
                            'selector': `${targetedSelector} .author-image`,
                            ...global_style_value.author_margin_parent.expected
                        })
                    });
                    await test.step('Icon Margin', async () => {
                        await compose.settingsMargin(global_style_value.icon_margin_parent.value, '#et-fb-icon_')
                        await compose.expectStyleValue({
                            'selector': `${targetedSelector} .et-pb-icon`,
                            ...global_style_value.icon_margin_parent.expected
                        })
                    });
                }
            });


        }
        //FIXME - This has percentage value. but Playwright return computed css value which is in pixel
        if (Sizing) {
            await test.step('Sizing', async () => {
                await compose.settingsToggle({
                    label: 'Sizing'
                })
                await test.step('Width', async () => {
                    await compose.settingsModuleWidth(targetedSelector);

                });

            });

        }
        // ------------

        if (Border) {
            await test.step('Border', async () => {
                await compose.settingsToggle({ label: 'Border' });
                await test.step('Border Radius', async () => {
                    await compose.settingsModuleBorderRadius(targetedSelector);
                });
                await await test.step('Border Width', async () => {
                    await compose.settingsSlider({
                        label: 'Border Width',
                        slide_value: 3,
                    });
                    await compose.expectStyleValue({
                        selector: targetedSelector,
                        style_name: 'border-width',
                        expected_value: '3px'
                    })
                });
                await test.step('Border color', async () => {
                    await compose.settingsColor({
                        label: 'Border Color',
                        ...global_style_value.border_color_parent.value
                    })
                    await compose.expectStyleValue({
                        selector: targetedSelector,
                        ...global_style_value.border_color_parent.expected
                    })
                });

            });

        }
        if (BoxShadow) {
            await test.step('Box Shadow', async () => {
                await compose.settingsToggle({ label: 'Box Shadow' });
                await compose.settingsSelectButton({
                    label: 'Box Shadow',
                    ...global_style_value.box_shadow_parent.value
                })
                await compose.expectStyleValue({
                    selector: targetedSelector,
                    ...global_style_value.box_shadow_parent.expected
                })
            });
        }
    });

}
