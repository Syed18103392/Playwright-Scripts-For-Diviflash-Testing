
import { test, expect } from "@playwright/test";
import { Global } from '../includes/global-fixures.ts';
import { CompositionHelper } from '../includes/composition-helpers.ts';

// import * as compose from "../includes/composition-helpers.ts";

const credential = {
	// latest_plugin_file_path: '/Users/syedsajib/Downloads/Office/checking /production/marketplace/diviflash.zip',
	testing_page_name: 'cpt_test',
	module_name: 'CPT Grid',
	module_id: () => {
		let id = credential.module_name.toLowerCase();
		id = id.replace(/ /g, '');  // Use replace with a regular expression to remove all spaces
		return id;
	}
};

test.beforeEach(async ({ page }) => {
	const compose = new CompositionHelper(page);
	const global_fixture = new Global(page);
	await page.goto('/wp-admin/edit.php?post_type=page')
	await global_fixture.createPage({
		page_name: credential.testing_page_name
	})
	await test.step('✅ Module Inserting Done', async () => {
		await global_fixture.openDiviBuilder();
		await global_fixture.insertModule(credential.module_name, `difl_${credential.module_id()}`);

		await compose.expectText({
			selector: '.df_cptgrid_container h2',
			expected_text: 'Please select a Post Type.'
		})
	}, true)


	//CPT Settings Select Post Type = Post 
	await compose.settingsSelectField({
		label: 'Post Type',
		option_name: 'Posts',
	})
});

test.describe('CPT', () => {
	test.describe.configure({ mode: "parallel" });

	require('./components/cptGrid/item-author.ts')
	require('./components/cptGrid/item-read-more-button.ts')
	require('./components/cptGrid/item-image.ts')
	require('./components/cptGrid/item-title-title.ts');
	require('./components/cptGrid/item-content.ts');
	require('./components/cptGrid/item-publish-date.ts');



});

test.afterEach(async ({ page }) => {
	await test.step('Removing Pages', async () => {
		await page.goto('/wp-admin/edit.php?post_type=page');
		await page.locator('#cb-select-all-1').check();
		await page.locator('select#bulk-action-selector-top').selectOption('trash');
		await page.locator('input#doaction').click();
	});


});
