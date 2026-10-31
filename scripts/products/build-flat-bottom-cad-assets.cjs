// Import only flat-bottom fittings identified by the formal model/part list.
// Usage: node scripts/products/build-flat-bottom-cad-assets.cjs sourceDirectory reportDirectory [workbookPath]
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const XLSX = require('xlsx');
const {packCompactCad} = require('./compact-cad/pack.cjs');
const root = path.resolve(__dirname, '../..');
const [source, reportDirectory, workbookArgument] = process.argv.slice(2);
if (!source || !reportDirectory) throw Error('Pass sourceDirectory and reportDirectory');
const defaultWorkbookPath = path.join(root, 'data-source/product-center/fittings/FRGD-140D-2606-0002_001_cn_连接件标品在售清单.xlsx');
const workbookPath = workbookArgument ? path.resolve(workbookArgument) : defaultWorkbookPath;
if (!fs.existsSync(workbookPath)) throw Error(`Workbook not found: ${workbookPath}`);
const workbook = XLSX.readFile(workbookPath);
const rows = XLSX.utils.sheet_to_json(workbook.Sheets['01_硬管接头'], {header:1, defval:''})
  .map((row, index) => ({row:index + 1, type:String(row[0]), part:String(row[2]).trim(), model:String(row[3]).match(/(?:HFL6|HFL|HF6|HF)-(?:U28|U40|M6)-\d+-(?:PK|PV|PS)-[A-Z]/)?.[0], code:String(row[4])}))
  .filter(row => row.type.includes('平底') && row.model && row.part);
const details = require('../../data/products/generated/fittings/hard-tube-fittings/detail/index.json');
const normalizeStepPart = name => name.replace(/\.stp$/i, '').replace(/-c(?:_\d+_cn)?$/i, '').replace(/_\d+_cn$/i, '');
function collectStepFiles(directory, relativeDirectory = '') {
  const files = [];
  for (const entry of fs.readdirSync(directory, {withFileTypes:true})) {
    const fullPath = path.join(directory, entry.name);
    const relativePath = path.join(relativeDirectory, entry.name);
    if (entry.isDirectory()) files.push(...collectStepFiles(fullPath, relativePath));
    else if (/\.stp$/i.test(entry.name)) files.push({name:entry.name, path:fullPath, relativePath});
  }
  return files;
}
const sourceFiles = collectStepFiles(source);
const normalizeModelBase = model => model.split('-').slice(0, 3).join('-').toLowerCase();
const sourceFor = row => sourceFiles.find(file => normalizeStepPart(file.name) === row.part)
  || sourceFiles.find(file => normalizeModelBase(normalizeStepPart(file.name)) === normalizeModelBase(row.model));
const geometryKey = model => model.split('-').slice(0,3).join('-').toLowerCase();
const byGeometry = new Map();
for (const row of rows) {
  const file = sourceFor(row);
  if (!file) continue;
  const key = geometryKey(row.model);
  if (!byGeometry.has(key)) byGeometry.set(key, []);
  byGeometry.get(key).push({...row, file});
}
if (!byGeometry.size) throw Error(`No exact flat-bottom STEP files found in ${source}; refusing to overwrite the existing manifest.`);
async function main() {
  const occt = await require(path.join(root, 'public/vendor/occt/occt-import-js.js'))();
  const output = path.join(root, 'public/models/products/fittings/flat-bottom/cad');
  const products = {}, geometries = {}, unavailable = [];
  const prepared = [];
  for (const [key, sources] of byGeometry) {
    const representative = sources[0];
    const input = fs.readFileSync(representative.file.path);
    if (!input.subarray(0,128).includes(Buffer.from('ISO-10303-21'))) throw Error(`Invalid STEP: ${representative.file}`);
    const result = occt.ReadStepFile(input, {linearUnit:'millimeter', linearDeflectionType:'absolute_value', linearDeflection:.01, angularDeflection:.15});
    if (!result.success || !result.meshes.length) throw Error(`STEP import failed: ${representative.file}`);
    const min = [Infinity,Infinity,Infinity], max = [-Infinity,-Infinity,-Infinity];
    result.meshes.forEach((mesh, index) => {
      mesh.name = `${key.toUpperCase()} ${index + 1}`;
      for (const attribute of ['position','normal']) if (mesh.attributes[attribute]) {
        mesh.attributes[attribute].array = mesh.attributes[attribute].array.map(value => Number(value.toFixed(5)));
      }
      mesh.attributes.position.array.forEach((value,i) => {min[i%3]=Math.min(min[i%3],value);max[i%3]=Math.max(max[i%3],value);});
    });
    const id = `flat-bottom-${key}`, size = max.map((v,i) => v-min[i]);
    const data = {...result, name:key.toUpperCase(), root:{name:key.toUpperCase(), meshes:result.meshes.map((_,i)=>i), children:[]}, appearance:{flatBottom:true}, rotationEuler:key==='hfl6-u40-16'?[-Math.PI/2,0,0]:[0,0,0], dimensions:{min,max,size,axes:[[1,0,0],[0,1,0],[0,0,1]]}};
    const packed = packCompactCad(data);
    const url = `/models/products/fittings/flat-bottom/cad/${id}.fcad.gz`;
    geometries[id] = {model3dUrl:url, sourcePart:representative.part};
    prepared.push({id, data:packed.gzip, sizeMm:size, ...packed.stats, sources:sources.map(row => ({...row, file:row.file.relativePath, sha256:crypto.createHash('sha256').update(fs.readFileSync(row.file.path)).digest('hex')}))});
  }
  if (!prepared.length) throw Error('No flat-bottom geometry was prepared; refusing to overwrite the existing manifest.');
  for (const detail of details.filter(detail => ['standard-flat-bottom-fitting','compact-flat-bottom-fitting'].includes(detail.seriesId))) {
    const row = rows.find(row => row.model === detail.model && row.code === detail.productCode);
    const id = row && `flat-bottom-${geometryKey(row.model)}`;
    if (!id || !geometries[id]) {unavailable.push({model:detail.model, part:row?.part || null, reason:row?'No STEP for this geometry in supplied directory':'No exact model/code match in workbook'});continue;}
    const [, , , material, color] = row.model.split('-');
    products[detail.slug] = {viewerId:id, model:detail.model, part:row.part, workbookRow:row.row, finish:color==='B'?'black':material==='PK'?'peek':'natural'};
  }
  // All parsing succeeds before publishing prepared assets. Raw STEP stays outside public/.
  fs.mkdirSync(output,{recursive:true});
  for (const item of prepared) fs.writeFileSync(path.join(output,`${item.id}.fcad.gz`),item.data);
  fs.writeFileSync(path.join(root,'data/products/detail/flat-bottom-fitting-cad-manifest.json'),JSON.stringify({geometries,products},null,2)+'\n');
  fs.mkdirSync(reportDirectory,{recursive:true});
  const report={workbook:workbookPath,sourceDirectory:source,products,geometries:prepared.map(({data,...item})=>item),unavailable};
  fs.writeFileSync(path.join(reportDirectory,'flat-bottom-cad-import.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify({models:Object.keys(products).length,geometries:prepared.map(({id,sizeMm,bytes})=>({id,sizeMm,bytes})),unavailable:unavailable.length}));
}
main().catch(error=>{console.error(error);process.exitCode=1;});
