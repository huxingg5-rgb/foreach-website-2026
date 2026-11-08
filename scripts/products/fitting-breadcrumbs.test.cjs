/* eslint-disable @typescript-eslint/no-require-imports -- Exercise the TypeScript route adapter in Node. */
const test = require('node:test');
const assert = require('node:assert/strict');
require('tsx/cjs');
const { getFittingDetailBreadcrumbs } = require('../../lib/seo/fitting-breadcrumbs.ts');
const { FITTING_PUBLISHED_PRODUCTS } = require('../../data/products/selection/fitting-publication.generated.ts');

test('the reported barbed fitting retains every category level and its exact model', () => {
  assert.deepEqual(getFittingDetailBreadcrumbs('/en/products/fittings/barbed-fittings/bl-24f-pp-n/', 'en', 'BL-24F-PP-N'), [
    { label: 'Home', href: '/en/' },
    { label: 'Product Center', href: '/en/products/' },
    { label: 'Fittings', href: '/en/products/fittings/' },
    { label: 'Barbed Fittings', href: '/en/products/fittings/barbed-fittings/' },
    { label: 'BL-24F-PP-N' },
  ]);
});

test('all published fitting details have linked parents, an unlinked model and no invalid check-valve parent', () => {
  const types = new Set();
  for (const product of FITTING_PUBLISHED_PRODUCTS) {
    types.add(product.productTypeId);
    const result = getFittingDetailBreadcrumbs('/en' + product.detailHref + '/', 'en', product.foreachModel);
    assert.equal(result.length, 5, product.foreachModel);
    assert.deepEqual(result.at(-1), { label: product.foreachModel });
    assert.ok(result.slice(0, -1).every(item => item.href.startsWith('/en/') && item.label && !/[\u3400-\u9fff]/.test(item.label)));
    assert.equal(new Set(result.slice(0, -1).map(item => item.href)).size, 4);
    assert.equal(result[3].href, `/en/products/fittings/${product.productTypeId === 'check-valves' ? 'filters' : product.productTypeId}/`);
  }
  assert.equal(types.size, 9);
});

test('unrelated families, languages, category pages and series collections keep their existing breadcrumbs', () => {
  for (const locale of ['zh', 'zh-CN', 'es', 'fr', 'ko', 'ru']) {
    assert.equal(getFittingDetailBreadcrumbs(`/${locale}/products/fittings/barbed-fittings/bl-24f-pp-n/`, locale, 'BL-24F-PP-N'), null);
  }
  for (const pathname of [null, '/products/fittings/barbed-fittings/bl-24f-pp-n/', '/en/products/pumps/piston-pump/ea-100-pmma/', '/en/products/fittings/', '/en/products/fittings/barbed-fittings/', '/en/products/fittings/quick-connect-fittings/q20/', '/en/products/fittings/unknown/model/']) {
    assert.equal(getFittingDetailBreadcrumbs(pathname, 'en', 'MODEL'), null);
  }
  assert.equal(getFittingDetailBreadcrumbs('/en/products/fittings/barbed-fittings/bl-24f-pp-n/', 'en', ''), null);
});
