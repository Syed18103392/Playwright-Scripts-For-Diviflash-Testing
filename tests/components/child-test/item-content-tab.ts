import { Page, test, expect } from "@playwright/test";
import { Global } from '../../../includes/global-fixures.ts';
import { CompositionHelper } from '../../../includes/composition-helpers.ts';
import global_style_value from '../../../global-style-value.js';

export class ContentTab extends CompositionHelper {
    private targetedSelector;
    constructor(public readonly page: Page,selector) {
        super(page);
        this.targetedSelector = selector
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
        await test.step('Gradient', async () => {
            await this.settingsBackgroundGradient__DefaultDivi(this.targetedSelector);
        });
        await test.step('Image', async () => {
            await this.settingsBackgroundImage__DefaultDivi(this.targetedSelector);
        });
    }
    async cssDisplay(){
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
