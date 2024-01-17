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

        //Add New Item
        await compose.settingsAddNewChildItem({ page: page, tooltip_name: 'Add New Item' });

        //Add Type Of The Item
        await compose.settingsSelectField({
                page: page,
                label: 'Type',
                option_name: 'Image',
        })

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