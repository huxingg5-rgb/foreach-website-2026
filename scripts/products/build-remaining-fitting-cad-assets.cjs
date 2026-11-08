/*
 * Reviewed Chinese detail-page CAD for female adapters, PMB, F-PE and CV-BE.
 * Usage: node scripts/products/build-remaining-fitting-cad-assets.cjs <3D图 root> <report-dir>
 * Import real STEP assemblies and original PDFs only. Existing CAD is preserved.
 */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { packCompactCad } = require('./compact-cad/pack.cjs');
const root = path.resolve(__dirname, '../..');
const [sourceRoot, reportDir] = process.argv.slice(2);
const sha = data => crypto.createHash('sha256').update(data).digest('hex');
const read = file => JSON.parse(fs.readFileSync(path.join(root, file)));
const legacy = read('data/products/detail/standalone-fitting-cad-manifest.json');
const femaleSlugs = [
  'u-m6-20-ac-b', 'u-u28-20-pp-n', 'u-m6-20-pp-n',
  'us-m6-05-ac-b', 'us-m6-10-ac-b', 'us-m6-15-ac-b',
  'us-m6-05-pp-n', 'us-m6-10-pp-n', 'us-m6-15-pp-n',
  'ut-u28-15-ps-b', 'ut-u28-15-pp-n', 'ut-u28-20-ps-b', 'ut-u28-20-pp-n',
  'uy-u28-10-pp-n', 'uy-u28-15-pp-n', 'uy-u28-20-pp-n', 'pmu-m12-u28-20-pp-n',
];
// Correct title blocks and the updated M12 x 1.5 PMU mounting thread drawing.
const correctedFemaleDrawings = {
  'ut-u28-15-pp-n': '01-接头/01-硬管接头/二通接头/443-02-00260_001_cn.pdf',
  'ut-u28-20-ps-b': '01-接头/07-内螺纹接头/UT系列/443-02-00261-C.pdf',
  'uy-u28-20-pp-n': '01-接头/07-内螺纹接头/UY系列/443-02-00477-C.pdf',
  'pmu-m12-u28-20-pp-n': '01-接头/07-内螺纹接头/PMU系列/443-02-00104-C.pdf',
};
const pmb = [
  ['PMB-U28-16D-PP-N', '809304', '443-02-00323', 21],
  ['PMB-U28-16D-PA-W', '809517', '443-02-00470', 21],
  ['PMB-U28-24D-PP-N', '809462', '443-02-00039', 25],
  ['PMB-U28-24D-PA-W', '809496', '443-02-00073', 25],
  ['PMB-U28-32D-PP-N', '809463', '443-02-00040', 31],
  ['PMB-U28-32D-PA-W', '809497', '443-02-00074', 31],
];
const flows = [
  ['filters', 'F-PE-60-32-PP-N', '139003', '443-02-00455', 32.7, '443-02-00455-C.pdf'],
  ['filters', 'F-PE-100-32-PP-N', '139001', '443-02-00282', 32.7, '443-02-00282_002_cn.pdf'],
  ['check-valves', 'CV-BE-32-PP-N', '129001', '443-02-00281', 32.74, '443-02-00281-C.pdf'],
];
const relativeSource = file => path.relative(sourceRoot, file).replaceAll('\\', '/');
function copyPdf(source, url) {
  const bytes = fs.readFileSync(source);
  if (bytes.subarray(0, 5).toString() !== '%PDF-' || bytes.length < 1000) throw Error('Invalid PDF: ' + source);
  const target = path.join(root, 'public', url);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  if (!fs.existsSync(target) || sha(fs.readFileSync(target)) !== sha(bytes)) fs.writeFileSync(target, bytes);
  return { drawingPdfUrl: url, drawingSha256: sha(bytes), drawingSource: relativeSource(source) };
}
async function main() {
  if (!sourceRoot || !reportDir) throw Error('Source root and report directory are required');
  const manifest = { schemaVersion: 1, products: {}, geometries: {} };
  const report = { products: [], geometries: [], sourceWarnings: [
    'F-PE-60: 443-02-00455_001_cn.pdf says 80–100 um, contradicting its 60 model. Use the reviewed -C drawing (40–60 um).',
    'CV-BE: use the complete _asm STEP; the alternate -C STEP includes a non-product SHELL object.',
    'PMB-16D PA shares PP geometry after reviewing both exact PDFs: 21 mm length, 7.8 mm across flats, 1/4-28 UNF, 2.4 mm barb, 1.2 mm bore.',
    'F-PE-60 and F-PE-100 source STEP geometry is identical; pore-size specification comes from each product drawing, not the tessellated filter disk.',
  ] };
  const femaleType = 'female-thread-adapters';
  manifest.products[femaleType] = {};
  for (const slug of femaleSlugs) {
    const old = legacy.products[femaleType][slug];
    if (!old?.viewerId) throw Error('Missing existing female CAD: ' + slug);
    const geometry = Object.values(legacy.geometries).find(g => g.viewerId === old.viewerId);
    if (!geometry || !fs.existsSync(path.join(root, 'public', geometry.model3dUrl))) throw Error('Missing legacy geometry: ' + slug);
    const drawing = correctedFemaleDrawings[slug]
      ? copyPdf(path.join(sourceRoot, correctedFemaleDrawings[slug]), `/downloads/products/fittings/${femaleType}/reviewed/${slug}.pdf`)
      : { drawingPdfUrl: old.drawingPdfUrl, drawingSha256: sha(fs.readFileSync(path.join(root, 'public', old.drawingPdfUrl))), drawingSource: 'existing-reviewed-exact-model' };
    manifest.products[femaleType][slug] = { model: old.model, productCode: old.productCode, viewerId: old.viewerId, finish: old.finish, sourcePart: old.sourcePart, ...drawing };
    report.products.push({ family: femaleType, slug, ...manifest.products[femaleType][slug] });
  }
  const occt = await require(path.join(root, 'public/vendor/occt/occt-import-js.js'))();
  const imported = new Map();
  function importStep(source) {
    if (imported.has(source)) return imported.get(source);
    const bytes = fs.readFileSync(source);
    if (!bytes.subarray(0, 128).includes(Buffer.from('ISO-10303-21'))) throw Error('Invalid STEP: ' + source);
    const result = occt.ReadStepFile(bytes, { linearUnit: 'millimeter', linearDeflectionType: 'absolute_value', linearDeflection: .01, angularDeflection: .15 });
    if (!result.success || !result.meshes?.length) throw Error('STEP import failed: ' + source);
    const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
    result.meshes.forEach(mesh => {
      for (const key of ['position', 'normal']) if (mesh.attributes[key]) mesh.attributes[key].array = mesh.attributes[key].array.map(x => Number(x.toFixed(5)));
      mesh.attributes.position.array.forEach((v, i) => { const a = i % 3; min[a] = Math.min(min[a], v); max[a] = Math.max(max[a], v); });
    });
    const value = { meshes: result.meshes, min, max, size: max.map((v, i) => v - min[i]), sourceSha256: sha(bytes), sourceFile: relativeSource(source) };
    imported.set(source, value);
    return value;
  }
  function buildGeometry(family, key, source, expectedSize, componentNames = [], rotationEuler = [0, -Math.PI / 2, 0]) {
    const id = `${family}-${key}`;
    if (manifest.geometries[id]) return id;
    const imported = importStep(source);
    imported.size.forEach((v, i) => { if (Math.abs(v - expectedSize[i]) > .02) throw Error(`Unexpected ${id} dimension ${i}: ${v}`); });
    const meshes = structuredClone(imported.meshes);
    const displayName = key.replace(/-reviewed$/, '').toUpperCase();
    meshes.forEach((mesh, i) => {
      mesh.name = componentNames[i] || `${displayName} · ${i + 1}`;
      // The EPDM diaphragm is a separate real mesh in the STEP assembly.
      if (family === 'check-valves' && imported.meshes[i].name === '445-02-00051') mesh.fittingFinish = 'black';
    });
    const data = {
      name: displayName, success: true,
      root: { name: displayName, meshes: meshes.map((_, i) => i), children: [] },
      meshes, appearance: { fitting: true, standaloneFitting: true },
      rotationEuler,
      dimensions: { min: imported.min, max: imported.max, size: imported.size, axes: [[1, 0, 0], [0, 1, 0], [0, 0, 1]] },
    };
    const model3dUrl = `/models/products/fittings/${family}/cad/${id}.fcad.gz`;
    const packed = packCompactCad(data);
    const file = path.join(root, 'public', model3dUrl);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, packed.gzip);
    manifest.geometries[id] = { viewerId: id, model3dUrl, family, geometryKey: key, sourceFile: imported.sourceFile, sourceSha256: imported.sourceSha256, sizeMm: imported.size, rotationEuler: data.rotationEuler };
    report.geometries.push({ ...manifest.geometries[id], bytes: packed.gzip.length, meshCount: meshes.length });
    return id;
  }
  // Exact external-source revisions; retain earlier geometry files for other locales.
  // Unchanged female geometry (confirmed by decoded mesh comparison) stays shared.
  const femaleRevisions = [
    ['us-m6-05', ['us-m6-05-ac-b', 'us-m6-05-pp-n'], '01-接头/01-硬管接头/二通接头/443-02-00061_001_cn.stp', [9.9, 21, 9.5]],
    ['uy-u28-10', ['uy-u28-10-pp-n'], '01-接头/07-内螺纹接头/UY系列/443-02-00330-C.stp', [10.15, 22.25381, 25.54178]],
    ['ut-u28-15', ['ut-u28-15-pp-n', 'ut-u28-15-ps-b'], '01-接头/01-硬管接头/二通接头/443-02-00260_001_cn.stp', [10, 27.4, 18.45]],
    ['ut-u28-20', ['ut-u28-20-pp-n', 'ut-u28-20-ps-b'], '01-接头/07-内螺纹接头/UT系列/443-02-00096-c.stp', [10, 27.4, 18.45]],
    ['pmu-m12-u28-20', ['pmu-m12-u28-20-pp-n'], '01-接头/07-内螺纹接头/PMU系列/443-02-00104-C.stp', [14, 21, 14]],
  ];
  const pairedFemaleSources = {
    'us-m6-05': '01-接头/01-硬管接头/二通接头/443-02-00109_001_cn.stp',
    'ut-u28-15': '01-接头/01-硬管接头/二通接头/443-02-00210_001_cn.stp',
    'ut-u28-20': '01-接头/07-内螺纹接头/UT系列/443-02-00261-c.stp',
  };
  for (const [key, slugs, file, size] of femaleRevisions) {
    if (pairedFemaleSources[key]) {
      const geometryOnly = data => JSON.stringify(data.meshes.map(m => ({ attributes: m.attributes, index: m.index })));
      if (geometryOnly(importStep(path.join(sourceRoot, file))) !== geometryOnly(importStep(path.join(sourceRoot, pairedFemaleSources[key])))) throw Error('Female variants have different geometry: ' + key);
    }
    const viewerId = buildGeometry(femaleType, key + '-reviewed', path.join(sourceRoot, file), size, [], [0, 0, 0]);
    for (const slug of slugs) {
      manifest.products[femaleType][slug].viewerId = viewerId;
      report.products.find(p => p.slug === slug).viewerId = viewerId;
    }
  }
  const pmbFolder = '01-接头/02-倒刺接头';
  const pmbType = 'bulkhead-barbed-fittings';
  manifest.products[pmbType] = {};
  for (const [model, productCode, part, length] of pmb) {
    const slug = model.toLowerCase(), key = model.split('-').slice(0, -2).join('-').toLowerCase();
    const geometryPart = { '16D': '443-02-00323', '24D': '443-02-00039', '32D': '443-02-00040' }[model.split('-')[2]];
    const source = path.join(sourceRoot, pmbFolder, geometryPart + '-C.stp');
    const exact = path.join(sourceRoot, pmbFolder, part + '-C.stp');
    if (fs.existsSync(exact) && exact !== source) {
      const normalized = data => JSON.stringify(data.meshes.map(m => ({ attributes: m.attributes, index: m.index })));
      if (normalized(importStep(exact)) !== normalized(importStep(source))) throw Error('Material variants have different geometry: ' + model);
    }
    const viewerId = buildGeometry(pmbType, key, source, [7.8, 9.0066642, length]);
    const drawing = copyPdf(path.join(sourceRoot, pmbFolder, part + '-C.pdf'), `/downloads/products/fittings/${pmbType}/${slug}.pdf`);
    manifest.products[pmbType][slug] = { model, productCode, viewerId, finish: 'natural', sourcePart: part, ...drawing };
    report.products.push({ family: pmbType, slug, ...manifest.products[pmbType][slug] });
  }
  for (const [family, model, productCode, part, length, pdf] of flows) {
    const slug = model.toLowerCase(), key = slug.split('-').slice(0, -2).join('-');
    const source = path.join(sourceRoot, '03-过滤器、单向阀', part + '_asm.stp');
    const names = family === 'filters' ? ['进液壳体（PP）', '滤芯（HDPE）', '出液壳体（PP）'] : ['进液壳体（PP）', '出液壳体（PP）', '圆形膜片（EPDM）'];
    const viewerId = buildGeometry(family, key, source, [19.7, 19.7, length], names);
    const drawing = copyPdf(path.join(sourceRoot, '03-过滤器、单向阀', pdf), `/downloads/products/fittings/${family}/${slug}.pdf`);
    manifest.products[family] ||= {};
    manifest.products[family][slug] = { model, productCode, viewerId, finish: 'natural', sourcePart: part, ...drawing };
    report.products.push({ family, slug, ...manifest.products[family][slug] });
  }
  fs.writeFileSync(path.join(root, 'data/products/detail/remaining-fitting-cad-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  fs.mkdirSync(reportDir, { recursive: true });
  fs.writeFileSync(path.join(reportDir, 'import-report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ products: report.products.length, newGeometries: report.geometries.length, modelBytes: report.geometries.reduce((n, g) => n + g.bytes, 0) }));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
