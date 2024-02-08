import { test, expect } from "@playwright/test";
import { Global } from '../../../includes/global-fixures.ts';
import { CompositionHelper } from '../../../includes/composition-helpers.ts';

export default async (page)=>{
       const compose = new CompositionHelper(page);

       /**
        * Add New Item 
        * Type: Content
        */
       await test.step('✅ Select Post Publish Date: and check visiblity', async () => {
              await compose.settingsAddNewChildItem({ tooltip_name: 'Add New Item' });
              //Add Type Of The Item
              await compose.settingsSelectField({

                     label: 'Type',
                     option_name: 'Publish Date',
              })
              await compose.expectVisiblity({

                     selector: 'article .df-cpt-date-wrap',
                     snap_label: 'Post-Read-more-button'
              })
       });
}
