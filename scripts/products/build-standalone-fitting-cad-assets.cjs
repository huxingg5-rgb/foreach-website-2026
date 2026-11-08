/*
 * Build compact FCAD/GZIP assets for the non-pairing fitting families.
 *
 * Usage:
 *   node scripts/products/build-standalone-fitting-cad-assets.cjs \
 *     <workbook.xlsx> <FIT+外发图纸 root> <report directory>
 *
 * The workbook is the exact model/part mapping. Different material variants
 * intentionally share one geometry per family/model key; finish is kept on
 * the product record for rendering.
 */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const XLSX = require('xlsx');
const { packCompactCad } = require('./compact-cad/pack.cjs');

const root = path.resolve(__dirname, '../..');
const [workbookPath, sourceRoot, reportDirectory] = process.argv.slice(2);
if (!workbookPath || !sourceRoot || !reportDirectory) throw Error('Workbook, source root and report directory are required');

const families = [
  { productTypeId: 'barbed-fittings', sheet: '02_倒刺接头', sourceFolder: '02倒刺接头', modelColumn: 3, codeColumn: 4, partColumn: 2 },
  { productTypeId: 'thread-to-barbed-fittings', sheet: '05_螺纹转倒刺接头', sourceFolder: '05螺纹转倒刺', modelColumn: 3, codeColumn: 4, partColumn: 2 },
  { productTypeId: 'female-thread-adapters', sheet: '07_内螺纹互转接头', sourceFolder: '06内螺纹互转', modelColumn: 3, codeColumn: 4, partColumn: 2 },
];

const normalize = value => String(value || '').trim().replace(/\s+/g, ' ');
const slugify = value => normalize(value).toLowerCase().replace(/μ/g, 'u').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const canonicalModel = value => {
  const raw = normalize(value).toUpperCase();
  const matches = raw.match(/[A-Z0-9]+(?:-[A-Z0-9/]+)+/g);
  return matches?.at(-1) || raw;
};
const modelKey = model => canonicalModel(model).split('-').slice(0, -2).join('-').toLowerCase().replace(/\//g, '');
const sha256 = input => crypto.createHash('sha256').update(input).digest('hex');
const sourceName = value => path.basename(String(value || '')).toLowerCase().replace(/\.pdf$|\.stp$|\.step$/i, '').replace(/-c$/i, '');
const sourceCandidates = part => [part, String(part || '').replace(/^443-/, '433-')];
const detailByCode = new Map();
for (const family of families) {
  const detailPath = path.join(root, 'data', 'products', 'generated', 'fittings', family.productTypeId, 'detail', 'index.json');
  if (!fs.existsSync(detailPath)) continue;
  const details = JSON.parse(fs.readFileSync(detailPath, 'utf8'));
  detailByCode.set(family.productTypeId, new Map(details.map(detail => [String(detail.productCode || detail.productId || ''), detail])));
}
const finishFor = model => {
  const upper = normalize(model).toUpperCase();
  if (/-AC-B$|-(?:PK|PEEK)-[A-Z]$/.test(upper) || /-B$/.test(upper)) return /PK|PEEK/.test(upper) ? 'peek' : 'black';
  if (/-SS-|SUS/.test(upper)) return 'steel';
  if (/-Y$/.test(upper)) return 'yellow';
  return 'natural';
};

function collectFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).map(entry => ({
    name: entry.name,
    path: path.join(directory, entry.name),
  })).filter(entry => entry.name.toLowerCase().endsWith('.stp') || entry.name.toLowerCase().endsWith('.step') || entry.name.toLowerCase().endsWith('.pdf'));
}

function importRows(workbook, family) {
  const rows = XLSX.utils.sheet_to_json(workbook.Sheets[family.sheet], { header: 1, defval: '' });
  return rows.slice(2).map((row, index) => ({
    row: index + 3,
    model: canonicalModel(row[family.modelColumn]),
    productCode: normalize(row[family.codeColumn]),
    part: normalize(row[family.partColumn]),
  })).filter(row => row.model && row.productCode && row.part);
}

async function main() {
  const workbook = XLSX.readFile(path.resolve(workbookPath));
  const occt = await require(path.join(root, 'public/vendor/occt/occt-import-js.js'))();
  const manifest = { schemaVersion: 1, products: {}, geometries: {}, sourceStatus: { families: {}, unavailable: [] } };
  const prepared = [];

  for (const family of families) {
    const rows = importRows(workbook, family);
    const files = collectFiles(path.join(sourceRoot, family.sourceFolder));
    const stepByName = new Map(files.filter(file => /\.stp$|\.step$/i.test(file.name)).map(file => [sourceName(file.name), file]));
    const pdfByName = new Map(files.filter(file => /\.pdf$/i.test(file.name)).map(file => [sourceName(file.name), file]));
    const productRows = rows.map(row => ({
      ...row,
      step: sourceCandidates(row.part).map(part => stepByName.get(sourceName(part + '.stp'))).find(Boolean),
      pdf: sourceCandidates(row.part).map(part => pdfByName.get(sourceName(part + '.pdf'))).find(Boolean),
    }));
    const geometryRows = new Map();
    for (const row of productRows) {
      const key = modelKey(row.model);
      if (!geometryRows.has(key) && row.step) geometryRows.set(key, row);
      if (!row.step) manifest.sourceStatus.unavailable.push({ productTypeId: family.productTypeId, model: row.model, productCode: row.productCode, part: row.part, reason: 'No exact STEP in supplied source folder' });
    }
    const familyProducts = {};
    for (const row of productRows) {
      const detail = detailByCode.get(family.productTypeId)?.get(String(row.productCode));
      const slug = detail?.slug || slugify(row.model);
      const key = modelKey(row.model);
      const sourcePdfUrl = `/downloads/products/fittings/${family.productTypeId}/${slug}.pdf`;
      if (row.pdf) {
        fs.mkdirSync(path.join(root, 'public', path.dirname(sourcePdfUrl)), { recursive: true });
        fs.copyFileSync(row.pdf.path, path.join(root, 'public', sourcePdfUrl));
      }
      const geometry = manifest.geometries[`${family.productTypeId}:${key}`];
      familyProducts[slug] = {
        model: detail?.model || row.model,
        productCode: row.productCode,
        viewerId: geometry?.viewerId || null,
        finish: finishFor(row.model),
        drawingPdfUrl: row.pdf ? sourcePdfUrl : null,
        sourcePart: row.part,
        workbookRow: row.row,
      };
    }
    for (const [key, row] of geometryRows) {
      const input = fs.readFileSync(row.step.path);
      if (!input.subarray(0, 128).includes(Buffer.from('ISO-10303-21'))) throw Error(`Invalid STEP: ${row.step.path}`);
      const result = occt.ReadStepFile(input, { linearUnit: 'millimeter', linearDeflectionType: 'absolute_value', linearDeflection: .01, angularDeflection: .15 });
      if (!result.success || !result.meshes?.length) throw Error(`STEP import failed: ${row.step.path}`);
      const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
      result.meshes.forEach((mesh, index) => {
        mesh.name = `${row.model} ${index + 1}`;
        for (const attribute of ['position', 'normal']) if (mesh.attributes[attribute]) mesh.attributes[attribute].array = mesh.attributes[attribute].array.map(value => Number(value.toFixed(5)));
        mesh.attributes.position.array.forEach((value, index) => { min[index % 3] = Math.min(min[index % 3], value); max[index % 3] = Math.max(max[index % 3], value); });
      });
      const size = max.map((value, index) => value - min[index]);
      const viewerId = `${family.productTypeId}-${slugify(key)}`;
      const model3dUrl = `/models/products/fittings/${family.productTypeId}/cad/${viewerId}.fcad.gz`;
      const data = {
        name: key.toUpperCase(), success: true,
        root: { name: key.toUpperCase(), meshes: result.meshes.map((_, index) => index), children: [] },
        meshes: result.meshes,
        appearance: { fitting: true, standaloneFitting: true },
        rotationEuler: [0, 0, 0],
        dimensions: { min, max, size, axes: [[1, 0, 0], [0, 1, 0], [0, 0, 1]] },
      };
      const packed = packCompactCad(data);
      fs.mkdirSync(path.join(root, 'public', path.dirname(model3dUrl)), { recursive: true });
      fs.writeFileSync(path.join(root, 'public', model3dUrl), packed.gzip);
      const geometry = { viewerId, model3dUrl, family: family.productTypeId, geometryKey: key, sourcePart: row.part, sourceSha256: sha256(input), sizeMm: size, rotationEuler: data.rotationEuler };
      manifest.geometries[`${family.productTypeId}:${key}`] = geometry;
      prepared.push({ ...geometry, bytes: packed.gzip.length, stats: packed.stats });
      for (const product of Object.values(familyProducts)) if (product.sourcePart === row.part || modelKey(product.model) === key) product.viewerId = viewerId;
    }
    manifest.products[family.productTypeId] = familyProducts;
    manifest.sourceStatus.families[family.productTypeId] = { workbookRows: rows.length, products: Object.keys(familyProducts).length, geometries: geometryRows.size, sourceStepFiles: files.filter(file => /\.stp$/i.test(file.name)).length, sourcePdfFiles: files.filter(file => /\.pdf$/i.test(file.name)).length };
  }

  for (const products of Object.values(manifest.products)) for (const [slug, product] of Object.entries(products)) if (!product.viewerId) manifest.sourceStatus.unavailable.push({ model: product.model, productCode: product.productCode, reason: 'No exact compact geometry generated' });
  fs.writeFileSync(path.join(root, 'data/products/detail/standalone-fitting-cad-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  fs.mkdirSync(reportDirectory, { recursive: true });
  fs.writeFileSync(path.join(reportDirectory, 'standalone-fitting-cad-import.json'), JSON.stringify({ manifest: manifest.sourceStatus, geometries: prepared }, null, 2) + '\n');
  console.log(JSON.stringify({ families: manifest.sourceStatus.families, geometries: prepared.length, unavailable: manifest.sourceStatus.unavailable.length, bytes: prepared.reduce((sum, item) => sum + item.bytes, 0) }, null, 2));
}

main().catch(error => { console.error(error); process.exitCode = 1; });
