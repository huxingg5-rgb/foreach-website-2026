// Import only the supplied external-release models and original 2D drawings.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '../..');
const source = process.argv[2];
if (!source) throw new Error('Pass the single-head RPL source directory');
const output = path.join(root, 'public/models/products/pumps/valveless-pumps');
const models = [['P4', 'rpl-p4', 'RPL-P4'], ['P635', 'rpl-p635', 'RPL-P6.35'], ['P15', 'rpl-p15', 'RPL-P15']];
async function main() {
  const occt = await require(path.join(root, 'public/vendor/occt/occt-import-js.js'))();
  fs.mkdirSync(output, {recursive: true});
  const manifest = [];
  for (const [code, slug, name] of models) {
    const input = fs.readFileSync(path.join(source, '外发3D（删除关键零部件，可外发）', `RPL_${code}_外发.stp`));
    if (!input.subarray(0, 128).includes(Buffer.from('ISO-10303-21'))) throw new Error(`${slug}: invalid STEP`);
    const result = occt.ReadStepFile(input, {linearUnit: 'millimeter', linearDeflectionType: 'absolute_value', linearDeflection: 0.03, angularDeflection: 0.15});
    if (!result.success || !result.meshes.length) throw new Error(`${slug}: import failed`);
    const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
    for (const mesh of result.meshes) {
      const positions = mesh.attributes.position.array;
      positions.forEach((v, i) => {min[i % 3] = Math.min(min[i % 3], v); max[i % 3] = Math.max(max[i % 3], v);});
      // Keep precision well below the display tessellation tolerance.
      mesh.attributes.position.array = positions.map(v => Number(v.toFixed(5)));
      if (mesh.attributes.normal) mesh.attributes.normal.array = mesh.attributes.normal.array.map(v => Number(v.toFixed(5)));
    }
    const size = max.map((v, i) => v - min[i]);
    // Visual roles match the existing product images; they are not material specifications.
    const roles = slug === 'rpl-p4' ? {15:'motor',48:'head',61:'black',62:'black'}
      : slug === 'rpl-p635' ? {15:'motor',45:'head',59:'black',60:'black',61:'black',62:'black'}
      : {0:'assembly',2:'motor'};
    result.meshes.forEach((mesh, i) => {mesh.appearanceRole = roles[i] || 'metal';});
    const model = {name, ...result, exteriorOnly: true, appearance: {rpl: true}, rotationX: Math.PI / 2,
      dimensions: {min, max, size, axes: [[1,0,0],[0,1,0],[0,0,1]]}};
    fs.writeFileSync(path.join(output, `${slug}.json`), JSON.stringify(model));
    const pdf = fs.readFileSync(path.join(source, '2D', `RPL_${code}.pdf`));
    if (!pdf.subarray(0, 8).includes(Buffer.from('%PDF-'))) throw new Error(`${slug}: invalid PDF`);
    fs.writeFileSync(path.join(output, `${slug}-drawing.pdf`), pdf);
    const record = {slug, sourceModel: `RPL_${code}_外发.stp`, sha256: crypto.createHash('sha256').update(input).digest('hex'),
      sourceDrawing: `RPL_${code}.pdf`, drawingSha256: crypto.createHash('sha256').update(pdf).digest('hex'), meshes: result.meshes.length, sizeMm: size};
    manifest.push(record); console.log(record);
  }
  fs.writeFileSync(path.join(output, 'sources.json'), JSON.stringify(manifest, null, 2) + '\n');
}
main().catch(error => {console.error(error); process.exitCode = 1;});
