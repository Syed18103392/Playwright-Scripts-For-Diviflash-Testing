.
test/
-----includes/
---------- components/
---------------cptGrid/
--------------------component-elements.ts [Child Components Ex: Button]
--------------------controller.ts [Handel global Components Ex:Add Content]
---------------dualButton
--------------------composition-helpers.ts [Slice settings Ex: Input/Color/Slider/Toggle]
--------------------global.ts [Global Settings Ex: Create/Remove Page]
-----cpt-grid.spec.ts [Test File - Content && Design Handeller]
-----dual-button.spec.ts [Test File - Content && Design Handeller]
Test CPT Grid :
npx playwright test -g "test-cpt-grid" --project chromium --headed --debug
