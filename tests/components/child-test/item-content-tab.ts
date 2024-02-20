import { Page, test, expect } from "@playwright/test";
import { CompositionHelper } from '../../../includes/composition-helpers.ts';
import global_style_value from '../../../global-style-value.js';

export class ContentTab extends CompositionHelper {
    private targetedSelector;
    constructor(public readonly page: Page, selector) {
        super(page);
        this.targetedSelector = selector
    }
    async postType(type_name) {
        await this.settingsSelectField({
            label: 'Post Type',
            option_name: type_name,
        });
    }
    async selectTaxonomy(type_name) {
        await this.settingsSelectField({
            label: 'Select Taxonomy',
            option_name: type_name,
        });
    }

    async addChildItem(child_name, check_visiblity = true) {
        await this.settingsAddNewChildItem({ tooltip_name: 'Add New Item' });
        await test.step('Type', async () => {
            await this.settingsSelectField({
                label: 'Type',
                option_name: child_name,
            })
            if (check_visiblity) {
                await this.expectVisiblity({
                    selector: `article ${this.targetedSelector}`,
                    snap_label: child_name
                })
            }

        });
    }
    async htmlTags(settings_label: string, tags: Array<string>, option_suffix) {

        const tag_count = tags.length;
        for (let i = 0; i < tag_count; ++i) {
            let tag_name = tags[i].replace(option_suffix, '');

            await test.step(tag_name, async () => {
                await this.settingsSelectField({
                    label: settings_label,
                    option_name: tags[i]
                })
                await this.expectVisiblity({
                    selector: `${this.targetedSelector} ${(tag_name)}`
                })
            });
        }

    }

    async settingsModuleBackground() {
        await this.settingsToggle({ label: 'Background' });

        await test.step('Color', async () => {
            await this.settingsBackgroundColor__DefaultDivi(this.targetedSelector);
        });

        await test.step('Transparent', async () => {
            await this.settingsBackgroundTransparent__DefaultDivi(this.targetedSelector);
        });

        // await test.step('Gradient', async () => {
        //     await this.settingsBackgroundGradient__DefaultDivi(this.targetedSelector);
        // });

        // await test.step('Image', async () => {
        //     await this.settingsBackgroundImage__DefaultDivi(this.targetedSelector);
        // });
    }
    async contentIconSettings(only_icon = false) {
        if (!only_icon) {

            await test.step('Use Image', async () => {
                
                //insert image
                this.useImage();
                await this.expectVisiblity({
                    selector: `${this.targetedSelector} img.df-icon-image`,
                    snap_label: 'Author Icon Image',
                })

                //image width :: Slider 
                await test.step('Image Width', async () => {
                    await this.settingsSlider({
                        label: 'Image Width',
                        ...global_style_value.icon_image_width.value
                    })
                    await this.expectStyleValue({
                        selector: `${this.targetedSelector} img.df-icon-image`,
                        ...global_style_value.icon_image_width.expected,
                    })
                });

                //Vertical Alignment :: Select Field
                await test.step('Vertical alig', async () => {

                    await this.settingsSelectField({
                        label: 'Vertical align',
                        option_name: 'Middle',
                    })
                    await this.expectStyleValue({
                        selector: `${this.targetedSelector} img.df-icon-image `,
                        expected_value: 'middle',
                        style_name: 'vertical-align'
                    })
                });
            });
        }

        await test.step('Use Icon', async () => {
            //Check Default Behaviour 
            await test.step('Default-Icon-Visiblity', async () => {
                await this.expectVisiblity({
                    selector: `${this.targetedSelector} .et-pb-icon`,
                    expect_visiblity: false
                })
            });

            //Turn on icon toggle
            await this.settingsSwitch({
                label: 'Use Icon'
            })
            await this.expectVisiblity({
                selector: `${this.targetedSelector} span.et-pb-icon`,
            })

            // Insert Icon Color
            await test.step('Icon Color', async () => {
                await this.settingsColor({
                    'label': 'Icon Color',
                    ...global_style_value.element_color_parent.value
                })
                await this.expectStyleValue({
                    selector: `${this.targetedSelector} span.et-pb-icon`,
                    ...global_style_value.element_color_parent.expected
                })
                this.page
            });

            //Insert Icon Size
            await test.step('Icon Size', async () => {
                await this.settingsSlider({
                    label: 'Icon Size',
                    ...global_style_value.icon_size_parent.value
                })
                await this.expectStyleValue({
                    selector: `${this.targetedSelector} span.et-pb-icon`,
                    ...global_style_value.icon_size_parent.expected
                })
            });

        });
    }
    async cssDisplay() {
        await test.step('Default=Inline Block', async () => {
            await this.expectStyleValue({
                selector: this.targetedSelector,
                style_name: 'display',
                expected_value: 'inline-flex'
            })
            await test.step('Align', async () => {
                await test.step('Right', async () => {
                    await this.settingsSelectField({
                        label: 'Align',
                        option_name: 'Right'
                    })
                    await this.expectStyleValue({
                        selector: this.targetedSelector,
                        style_name: 'float',
                        expected_value: 'right'
                    })
                });
                await test.step('Default', async () => {
                    await this.settingsSelectField({
                        label: 'Align',
                        option_name: 'Default'
                    })
                    await this.expectStyleValue({
                        selector: this.targetedSelector,
                        style_name: 'float',
                        expected_value: 'none'
                    })
                });
            });

        });
        await test.step('Inline', async () => {
            await this.settingsSelectField({
                label: 'Display',
                option_name: 'Inline'
            })
            await this.expectStyleValue({
                selector: this.targetedSelector,
                expected_value: 'inline',
                style_name: 'display'
            })
            await test.step('Align', async () => {
                await test.step('Right', async () => {
                    await this.settingsSelectField({
                        label: 'Align',
                        option_name: 'Right'
                    })
                    await this.expectStyleValue({
                        selector: this.targetedSelector,
                        style_name: 'float',
                        expected_value: 'right'
                    })
                });
                await test.step('Default', async () => {
                    await this.settingsSelectField({
                        label: 'Align',
                        option_name: 'Default'
                    })
                    await this.expectStyleValue({
                        selector: this.targetedSelector,
                        style_name: 'float',
                        expected_value: 'none'
                    })
                });
            });
        });
        await test.step('Block', async () => {
            await this.settingsSelectField({
                label: 'Display',
                option_name: 'Block'
            })
            await this.expectStyleValue({
                selector: this.targetedSelector,
                expected_value: 'block',
                style_name: 'display'
            })
        });
    }
    async settingsOutsideInnerWrapper(): Promise<void> {
        await test.step('Outside InnerWrapper On', async () => {
            await this.settingsSwitch({
                label: 'Outside Inner Wrapper'
            })
            await this.expectVisiblity({

                selector: `.df-cpt-inner-wrap ${this.targetedSelector}`,
                snap_label: 'Outside Image Turn on',
                expect_visiblity: false
            })
        });
        await test.step('Outside InnerWrapper Off', async () => {
            await this.settingsSwitch({
                label: 'Outside Inner Wrapper'
            })
            await this.expectVisiblity({

                selector: `.df-cpt-inner-wrap ${this.targetedSelector}`,
                snap_label: 'Outside Image turn off',
            })
        });


    }
}
