
import { test, expect } from "@playwright/test";
import { Global } from '../includes/global-fixures.ts';
import { CompositionHelper } from '../includes/composition-helpers.ts';
import insert_author_steps from './components/child-test/item-author.ts';
import insert_read_more_steps from './components/child-test/item-read-more-button.ts';
import insert_image_steps from './components/child-test/item-image.ts';
import insert_title_steps from './components/child-test/item-title.ts';
import insert_content_steps from './components/child-test/item-content.ts';
import insert_publish_date_steps from './components/child-test/item-publish-date.ts';


// import * as compose from "../includes/composition-helpers.ts";

const credential = {
	// latest_plugin_file_path: '/Users/syedsajib/Downloads/Office/checking /production/marketplace/diviflash.zip',
	testing_page_name: 'cpt_test',
	module_name: 'CPT Grid',
	url: '',
	module_id: () => {
		let id = credential.module_name.toLowerCase();
		id = id.replace(/ /g, '');  // Use replace with a regular expression to remove all spaces
		return id;
	}
};

let context;
let page;

test.beforeAll(async ({ browser }) => {
	// global Declaration
	context = await browser.newContext();
	page = await context.newPage();
	const global_fixture = new Global(page);
	const compose = new CompositionHelper(page);

	await page.goto('/wp-admin/edit.php?post_type=page');
	await global_fixture.createPage({
		page_name: credential.testing_page_name
	});
	await page.goto('/wp-admin/edit.php?post_type=page');
	await global_fixture.openDiviBuilder();
	await global_fixture.insertModule(credential.module_name, `difl_${credential.module_id()}`);
	await test.step('✅ Module Inserting Done', async () => {
		await compose.expectText({
			selector: '.df_cptgrid_container h2',
			expected_text: 'Please select a Post Type.'
		});
	}, true);
	// CPT Settings Select Post Type = Post
	await compose.settingsSelectField({
		label: 'Post Type',
		option_name: 'Posts',
	});
});





test('CPT', async ({ }) => {
	const compose = new CompositionHelper(page);

	await test.step('Item ➡️  Author', async () => {
		await insert_author_steps(page,'.df-cpt-author-wrap');
		await compose.goto_parent();
	});
	await test.step('Item ➡️  Read More Steps', async () => {
		await insert_read_more_steps(page,'.df-cpt-button-wrap');
		// await compose.goto_parent();
	})
	// await test.step('Item ➡️  Image', async () => {
	// 	await insert_image_steps(page,'.df-cpt-image-wrap');
	// 	await compose.goto_parent();
	// })
	// await test.step('Item ➡️  Title', async () => {
	// 	await insert_title_steps(page);
	// 	await compose.goto_parent();
	// })
	// await test.step('Item ➡️  Content', async () => {
	// 	await insert_content_steps(page, '.df-cpt-content-wrap');
	// 	// await compose.goto_parent();
	// })
	// await test.step('Item ➡️  Publish Date', async () => {
	// 	await insert_publish_date_steps(page);
	// })

});

test.afterEach(async ({ }) => {
	await page.goto('wp-admin/edit.php?post_type=page')
	await page.locator('#cb-select-all-1').check();
	await page.locator('select#bulk-action-selector-top').selectOption('trash');
	await page.locator('input#doaction').click();
	await page.goto(`wp-admin/edit.php?post_status=trash&post_type=page&paged=1`);
	await page.locator('input', { hasText: "Empty Trash" }).first().click();
});
