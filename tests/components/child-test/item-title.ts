import { test, expect } from "@playwright/test";
import { Global } from '../../../includes/global-fixures.ts';
import { CompositionHelper } from '../../../includes/composition-helpers.ts';

export default async (page)=>{
	const compose = new CompositionHelper(page);

	/**
	 * Add New Item 
	 * Type: Title
	 */
	await test.step('✅ Select Post Title: and check visiblity', async () => {
		await compose.settingsAddNewChildItem({ tooltip_name: 'Add New Item' });
		//Add Type Of The Item
		await compose.settingsSelectField({

			label: 'Type',
			option_name: 'Title',
		})
		await compose.expectVisiblity({

			selector: 'article h2.df-cpt-title a',
			snap_label: 'Post-Title'
		})
	});
}


