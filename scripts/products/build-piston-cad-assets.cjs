// Import full assemblies into LOCAL staging for pruning and visibility review.
// Never place the full internal geometry directly in public/.
// Usage: node build-piston-cad-assets.cjs sourceRoot stagingDirectory
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const zlib = require('node:zlib');
const root = path.resolve(__dirname, '../..');
const source = process.argv[2];
if (!source) throw new Error('Pass the piston-pump source root');
const output = process.argv[3];
if (!output || path.resolve(output).toLowerCase().startsWith(path.join(root, 'public').toLowerCase())) throw new Error('Pass a staging directory outside public/');
async function main() {
  const occt = await require(path.join(root, 'public/vendor/occt/occt-import-js.js'))();
  fs.mkdirSync(output, { recursive: true });
  const manifest = [];
  for (const folder of ['01常规柱塞泵', '02微型柱塞泵', '03超微型柱塞泵']) {
    const directory = path.join(source, folder, '03_3D模型，零部件都在，内部渲染模型');
    for (const file of fs.readdirSync(directory).filter(file => /\.stp$/i.test(file)).sort()) {
      const match = /^(EA|SM|TM)-(\d+)(UL|ML)\.stp$/i.exec(file);
      if (!match) throw new Error(`Unexpected model: ${file}`);
      const capacity = Number(match[2]) * (match[3].toUpperCase() === 'ML' ? 1000 : 1);
      const id = `${match[1].toLowerCase()}-${capacity}`;
      const input = fs.readFileSync(path.join(directory, file));
      if (!input.subarray(0, 128).includes(Buffer.from('ISO-10303-21'))) throw new Error(`${file}: invalid STEP`);
      const result = occt.ReadStepFile(input, { linearUnit: 'millimeter', linearDeflectionType: 'absolute_value', linearDeflection: .03, angularDeflection: .15 });
      if (!result.success || !result.meshes.length) throw new Error(`${file}: import failed`);
      const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
      for (const mesh of result.meshes) {
        const p = mesh.attributes.position.array;
        p.forEach((v, i) => { min[i % 3] = Math.min(min[i % 3], v); max[i % 3] = Math.max(max[i % 3], v); });
        mesh.attributes.position.array = p.map(v => Number(v.toFixed(5)));
        if (mesh.attributes.normal) mesh.attributes.normal.array = mesh.attributes.normal.array.map(v => Number(v.toFixed(5)));
      }
      const size = max.map((v, i) => v - min[i]);
      const model = { ...result, name: file.replace(/\.stp$/i, ''), sourceFile: path.join(directory,file), appearance: { piston: true, fullAssembly: true }, rotationEuler: [0, 0, 0], dimensions: { min, max, size, axes: [[1,0,0],[0,1,0],[0,0,1]] } };
      const packed = zlib.gzipSync(JSON.stringify(model), { level: 9 });
      fs.writeFileSync(path.join(output, `${id}.json.gz`), packed);
      const record = { id, sourceFile: `${folder}/03_3D模型，零部件都在，内部渲染模型/${file}`, sha256: crypto.createHash('sha256').update(input).digest('hex'), meshes: result.meshes.length, sizeMm: size, bytes: packed.length };
      manifest.push(record); console.log(JSON.stringify(record));
    }
  }
  fs.writeFileSync(path.join(output, 'sources.json'), JSON.stringify(manifest, null, 2) + '\n');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
