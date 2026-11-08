/* eslint-disable @typescript-eslint/no-require-imports -- This CLI uses the repository's CommonJS OCCT/FCAD pipeline. */
/* Import the reviewed exact-model STEP/PDF pairs. Source files are never changed.
 * node scripts/products/build-quick-connect-cad-assets.cjs <readable source directory> <report directory>
 */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {packCompactCad} = require('./compact-cad/pack.cjs');
const root = path.resolve(__dirname, '../..');
const mapping = require('../../data/products/detail/quick-connect-cad-source-map.json');
const [source, reportDirectory] = process.argv.slice(2);
if (require.main === module && (!source || !reportDirectory)) throw Error('Source and report directory are required');
const files = source ? fs.readdirSync(source) : [];
const sha = input => crypto.createHash('sha256').update(input).digest('hex');
const sourceFile = name => path.join(source, files.find(file => file.toLowerCase() === name.toLowerCase()) || name);

// A STEP cylinder's placement supplies a precise mating centerline. Do not
// align asymmetrical push buttons or elbows by their bounding-box centers.
function matingReference(text, row, min, max) {
  const entities = new Map([...text.matchAll(/#(\d+)\s*=\s*([\s\S]*?);/g)].map(m => [m[1], m[2].replace(/\s+/g, '')]));
  const point = id => entities.get(id)?.match(/\(([^()]+)\)\)$/)?.[1].split(',').map(Number);
  const cylinders = [];
  for (const entity of entities.values()) {
    const cylinder = entity.match(/^CYLINDRICAL_SURFACE\('[^']*',#(\d+),([\d.E+\-]+)\)$/);
    if (!cylinder) continue;
    const placement = entities.get(cylinder[1])?.match(/^AXIS2_PLACEMENT_3D\('[^']*',#(\d+),#(\d+),#\d+\)$/);
    if (!placement) continue;
    const origin = point(placement[1]), direction = point(placement[2]);
    if (!origin || !direction) continue;
    const axis = direction.map(Math.abs).indexOf(Math.max(...direction.map(Math.abs)));
    if (Math.abs(direction[axis]) < .999) continue;
    cylinders.push({axis, origin, radius: Number(cylinder[2])});
  }
  const radii = row.gender === 'P' ? {Q20:3.9, Q40:5.45, Q60:9.15} : {Q20:4, Q40:5.6, Q60:12.75};
  let selected = cylinders.filter(c => Math.abs(c.radius - radii[row.series]) < .045);
  const method = selected.length ? 'mating-cylinder' : 'concentric-cylinder-envelope';
  if (!selected.length) selected = cylinders;
  const groups = new Map();
  for (const c of selected) {
    const key = [c.axis, ...c.origin.filter((_,i) => i !== c.axis).map(v => Math.round(v * 100) / 100)].join(':');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(c);
  }
  const group = [...groups.values()].sort((a,b) => Math.max(...b.map(c=>c.radius))-Math.max(...a.map(c=>c.radius)) || b.reduce((s,c)=>s+c.radius,0)-a.reduce((s,c)=>s+c.radius,0))[0];
  if (!group) throw Error(`No verified mating centerline: ${row.model}`);
  const axis = group[0].axis, center = group[0].origin.slice();
  const axial = group.reduce((s,c) => s + c.origin[axis],0) / group.length;
  const middle = (min[axis] + max[axis]) / 2;
  const sign = axial < middle ? -1 : 1;
  center[axis] = sign < 0 ? min[axis] : max[axis];
  return {axis, sign, center, method, radius: radii[row.series], referenceAxial:axial, axialMidpoint:middle};
}

async function main() {
  fs.mkdirSync(reportDirectory, {recursive:true});
  const occt = await require(path.join(root,'public/vendor/occt/occt-import-js.js'))();
  const products = {}, geometries = {}, prepared = [], signatures = new Map();
  for (const [i,row] of mapping.records.entries()) {
    const pdfInput = fs.readFileSync(sourceFile(row.pdf));
    if (!pdfInput.subarray(0,5).equals(Buffer.from('%PDF-'))) throw Error(`Invalid PDF: ${row.pdf}`);
    const stepName = row.pdf.replace(/\.pdf$/i,'.stp');
    const input = fs.readFileSync(sourceFile(stepName));
    if (!input.subarray(0,128).includes(Buffer.from('ISO-10303-21'))) throw Error(`Invalid STEP: ${stepName}`);
    const result = occt.ReadStepFile(input, {linearUnit:'millimeter', linearDeflectionType:'absolute_value', linearDeflection:.03, angularDeflection:.15});
    if (!result.success || !result.meshes?.length) throw Error(`STEP import failed: ${row.model}`);
    const min=[Infinity,Infinity,Infinity], max=[-Infinity,-Infinity,-Infinity];
    for (const [j,mesh] of result.meshes.entries()) {
      mesh.name = `Part ${j+1}`;
      for (const key of ['position','normal']) if (mesh.attributes[key]) mesh.attributes[key].array = mesh.attributes[key].array.map(v=>Number(v.toFixed(5)));
      mesh.attributes.position.array.forEach((v,k)=>{min[k%3]=Math.min(min[k%3],v);max[k%3]=Math.max(max[k%3],v);});
    }
    const size=max.map((v,k)=>v-min[k]);
    if (size.some(v=>!Number.isFinite(v)||v<=0)) throw Error(`Invalid dimensions: ${row.model}`);
    const mating = matingReference(input.toString('utf8'),row,min,max);
    const signature = sha(JSON.stringify({meshes:result.meshes,mating}));
    const part = row.pdf.replace(/-c\.pdf$/i,'').toLowerCase();
    const viewerId = signatures.get(signature) || `quick-connect-${part}`;
    const model3dUrl = `/models/products/fittings/quick-connect/cad/${viewerId}.fcad.gz`;
    if (!signatures.has(signature)) {
      const data = {name:row.model, success:true, root:{name:row.model,meshes:result.meshes.map((_,j)=>j),children:[]}, meshes:result.meshes, appearance:{quickConnect:true}, rotationEuler:[0,0,0], mating, dimensions:{min,max,size,axes:[[1,0,0],[0,1,0],[0,0,1]]}};
      const packed = packCompactCad(data);
      const target=path.join(root,'public',model3dUrl);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,packed.gzip);
      geometries[viewerId]={model3dUrl,sizeMm:size,mating,sourcePart:part,sourceSha256:sha(input)};
      signatures.set(signature,viewerId);
      prepared.push({viewerId,model:row.model,sourceStep:stepName,bytes:packed.gzip.length,...packed.stats,sizeMm:size,mating});
    }
    const drawingPdfUrl = `/downloads/products/fittings/quick-connect-fittings/${row.model.toLowerCase()}.pdf`;
    const target=path.join(root,'public',drawingPdfUrl);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,pdfInput);
    products[row.model.toLowerCase()]={model:row.model,productCode:row.productCode,series:row.series,gender:row.gender,housingMaterial:row.housingMaterial,sealMaterial:row.sealMaterial,shape:row.shape,panel:row.panel,valve:row.valve,viewerId,drawingPdfUrl,sourcePart:part,sourcePdfSha256:sha(pdfInput),verification:row.verification,...(row.sourceTitleProductCode?{sourceTitleProductCode:row.sourceTitleProductCode}:{})};
    if ((i+1)%10===0) console.log(`Imported ${i+1}/${mapping.records.length}`);
  }
  for (const product of Object.values(products)) {
    const score = p => (p.housingMaterial===product.housingMaterial?64:0)+(p.sealMaterial===product.sealMaterial?32:0)+(p.model.split('-')[0]===product.model.split('-')[0]?16:0)+(p.valve===product.valve?8:0)+(p.panel===product.panel?4:0)+(p.shape===product.shape?2:0);
    product.defaultMateSlug = Object.entries(products).filter(([,p])=>p.series===product.series&&p.gender!==product.gender).sort((a,b)=>score(b[1])-score(a[1])||a[0].localeCompare(b[0]))[0]?.[0];
  }
  const manifest={schemaVersion:2,products,geometries,sourceStatus:{records:files.filter(f=>/\.stp$/i.test(f)).length,verifiedProducts:Object.keys(products).length,webReadableRecords:Object.keys(geometries).length,unavailable:mapping.unavailable,sourceWarnings:mapping.sourceWarnings||[]}};
  fs.writeFileSync(path.join(root,'data/products/detail/quick-connect-fitting-cad-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
  fs.writeFileSync(path.join(reportDirectory,'quick-connect-cad-import.json'),JSON.stringify({products:prepared,unavailable:mapping.unavailable,totalBytes:prepared.reduce((s,r)=>s+r.bytes,0)},null,2)+'\n');
  console.log(JSON.stringify({products:Object.keys(products).length,geometries:Object.keys(geometries).length,totalBytes:prepared.reduce((s,r)=>s+r.bytes,0),unavailable:mapping.unavailable}));
}
module.exports={matingReference};
if(require.main===module)main().catch(error=>{console.error(error);process.exitCode=1;});
