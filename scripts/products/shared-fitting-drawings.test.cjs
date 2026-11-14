const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { geometryKey } = require('./import-shared-fitting-drawings.cjs');
const root = path.resolve(__dirname, '../..');
const manifest = require('../../data/products/detail/fitting-drawing-manifest.json');
const plugDrawings = require('../../data/products/detail/hard-tube-plug-cad-manifest.json');

test('material variants share drawings without conflating size, barb profile or mating configuration', () => {
  assert.equal(geometryKey('BA-40F-PP-N'), geometryKey('BA-40F-PA-W'));
  assert.notEqual(geometryKey('BA-40F-PP-N'), geometryKey('BA-40D-PP-N'));
  assert.notEqual(geometryKey('BA-40F-PP-N'), geometryKey('BA-64F-PP-N'));
  assert.notEqual(geometryKey('HN-U28-16-AC-B'), geometryKey('HN-U28-32-AC-B'));
  assert.equal(geometryKey('Q2001-PNX-SACN'), geometryKey('Q2001-PNX-SPPE'));
  for (const other of ['Q2001-PNX-LPPE','Q2001-SNX-SACN','Q2001-PNV-SACN','Q2001-PMX-SACN']) {
    assert.notEqual(geometryKey('Q2001-PNX-SACN'), geometryKey(other));
  }
  assert.equal(manifest.products['barbed-fittings']['ba-40f-pp-n'].url, manifest.products['barbed-fittings']['ba-40f-pa-w'].url);
  assert.equal(manifest.products['quick-connect-fittings']['q2001-pnx-sacn'].url, manifest.products['quick-connect-fittings']['q2001-pnx-sppe'].url);
});

test('all mapped PDFs exist and variants of each geometry use a single URL', () => {
  const files = new Set();
  for (const [family, products] of Object.entries(manifest.products)) {
    const urlsByGeometry = new Map();
    for (const [slug, product] of Object.entries(products)) {
      const exactPlug = family === 'hard-tube-fittings' && plugDrawings.products[slug];
      if (exactPlug) {
        assert.equal(path.basename(product.url), `${exactPlug.part.toLowerCase()}-c.pdf`, `${slug}: preserve its approved original drawing`);
        files.add(product.url);
        continue;
      }
      const previous = urlsByGeometry.get(product.geometryKey);
      if (previous) assert.equal(product.url,previous,`${family}/${slug} must share 2D`);
      urlsByGeometry.set(product.geometryKey,product.url);
      files.add(product.url);
    }
  }
  for (const url of files) {
    const pdf = fs.readFileSync(path.join(root,'public',url));
    assert.equal(pdf.subarray(0,5).toString(),'%PDF-',url);
    assert.ok(pdf.length>1000,url);
  }
});
