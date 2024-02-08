import { test, expect } from "@playwright/test";
import { Global } from '../../../includes/global-fixures.ts';
import { CompositionHelper } from '../../../includes/composition-helpers.ts';

export default async function(page){
       const compose = new CompositionHelper(page);

       /**
        * Add New Item 
        * Type: Image
        */
       
       await test.step('Elements', async () => {
              await compose.settingsAddNewChildItem({ tooltip_name: 'Add New Item' });
              await test.step('Type', async () => {
                     await compose.settingsSelectField({
                            label: 'Type',
                            option_name: 'Image',
                     })
                     await compose.expectVisiblity({
                            selector: 'article a img',
                            snap_label: 'Post-Thumbnail'
                     })
              });


              await test.step('Outside Inner Wrapper ', async () => {
                     await test.step('Turn On', async () => {
                            await compose.settingsSwitch({

                                   label: 'Outside Inner Wrapper'
                            })
                            await compose.expectVisiblity({

                                   selector: '.df-cpt-inner-wrap img',
                                   snap_label: 'Outside Image Turn on',
                                   expect_visiblity: false
                            })
                     });
                     await test.step('Turn Off', async () => {
                            await compose.settingsSwitch({

                                   label: 'Outside Inner Wrapper'
                            })
                            await compose.expectVisiblity({

                                   selector: '.df-cpt-inner-wrap img',
                                   snap_label: 'Outside Image turn off',
                            })
                     });

              });
       });
       await test.step('Overlay & Scale', async () => {
              await compose.settingsToggle({
                     label: 'Overlay & Scale'
              })
              await test.step('Image Scale Type', async () => {
                     for (const [key, value] of Object.entries(compose.image_scale_type)) {
                            await compose.settingsSelectField({
                                   label: 'Image Scale Type',
                                   option_name: key,
                            })
                            await compose.expectVisiblity({
                                   selector: `a.${value}`,
                                   snap_label: ''
                            })
                     }
              });
              await test.step('Overlay', async () => {
                     // Enable Overlay
                     await test.step('Turn On Overlay', async () => {
                            await compose.settingsSwitch({
                                   label: 'Overlay'
                            })
                            await compose.expectVisiblity({
                                   selector: '.df-hover-effect .df-overlay',
                                   expect_visiblity:false,
                                   snap_label:'Turn On Overlay'
                            })
                            await test.step('Check Default', async () => {
                                   await compose.expectStyleValue({
                                          selector: '.df-hover-effect .df-overlay',
                                          style_name: 'background-image',
                                          expected_value: `linear-gradient(rgb(0, 180, 219) 0px, rgb(0, 131, 176) 100%)`
                                   })
                            });
                     });


              });


       });
}
