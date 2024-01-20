import * as components from "./component-elements";
import * as compose from "../../composition-helpers";
import { Page } from "playwright";

export async function addContent(page) {

        //placeholder texting

        await compose.expectText({
                page: page,
                selector: '.df_cptgrid_container h2',
                expected_text: 'Please select a Post Type.'
        })
        //CPT Settings
        await compose.settingsSelectField({
                page: page,
                label: 'Post Type',
                option_name: 'Posts',
        })
        console.log(`🔥 Selected Post type = post 🔥`)
        //Add New 
        await compose.settingsAddNewChildItem({ page: page, tooltip_name: 'Add New Item' });
        console.log(`🔥 Adding new child item  🔥`)
        //Add Type Of The Item
        await compose.settingsSelectField({
                page: page,
                label: 'Type',
                option_name: 'Image',
        })
        await page.screenshot({ path: 'snapshots/imageVisiblity.png' });
        await compose.expectImageVisiblity({
                page:page,
                selector:'article:nth-child(1) a img'
        })

        console.log(`🔥 Select image: and check visiblity  ✅`)
        // await compose.settingsSelectField({
        //         page: page,
        //         label: 'Display Post By',
        //         option_name: 'Default',
        // })
        // await compose.settingsSelectField({
        //         page: page,
        //         label: 'Orderby',
        //         option_name: 'Oldest to newest',
        // })

}
