// Import only the supplied DRPL-0109 external-release model and original drawing.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '../..');
const source = process.argv[2];
if (!source) throw new Error('Pass the dual-head DRPL source directory');
async function main() {
  const output = path.join(root, 'public/models/products/pumps/valveless-pumps');
  const sourceModel = 'DRPL_1x9_外发.stp', sourceDrawing = 'DRPL_1x9.pdf';
  const input = fs.readFileSync(path.join(source, '外发3D（删除关键零部件，可外发）', sourceModel));
  const pdf = fs.readFileSync(path.join(source, '2D', sourceDrawing));
  if (!input.subarray(0,128).includes(Buffer.from('ISO-10303-21'))) throw new Error('Invalid STEP');
  if (!pdf.subarray(0,8).includes(Buffer.from('%PDF-'))) throw new Error('Invalid PDF');
  const occt = await require(path.join(root, 'public/vendor/occt/occt-import-js.js'))();
  const result = occt.ReadStepFile(input, {linearUnit:'millimeter',linearDeflectionType:'absolute_value',linearDeflection:.03,angularDeflection:.15});
  if (!result.success || !result.meshes.length) throw new Error('STEP import failed');
  const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
  // Reviewed component identities in the supplied 178-mesh external assembly.
  const roles={0:'motor',79:'head',136:'head',93:'black',94:'black',137:'black',138:'black'};
  for (const [index,mesh] of result.meshes.entries()) {
    mesh.attributes.position.array.forEach((v,i)=>{min[i%3]=Math.min(min[i%3],v);max[i%3]=Math.max(max[i%3],v);});
    mesh.attributes.position.array=mesh.attributes.position.array.map(v=>Number(v.toFixed(5)));
    if(mesh.attributes.normal)mesh.attributes.normal.array=mesh.attributes.normal.array.map(v=>Number(v.toFixed(5)));
    mesh.appearanceRole=roles[index]||'metal';
  }
  const size=max.map((v,i)=>v-min[i]);
  const model={name:'DRPL-0109',...result,exteriorOnly:true,appearance:{rpl:true},rotationX:0,
    dimensions:{min,max,size,axes:[[1,0,0],[0,1,0],[0,0,1]]}};
  fs.mkdirSync(output,{recursive:true});
  fs.writeFileSync(path.join(output,'drpl-0109.json'),JSON.stringify(model));
  fs.writeFileSync(path.join(output,'drpl-0109-drawing.pdf'),pdf);
  const record={slug:'drpl-0109',sourceModel,sha256:crypto.createHash('sha256').update(input).digest('hex'),
    sourceDrawing,drawingSha256:crypto.createHash('sha256').update(pdf).digest('hex'),meshes:result.meshes.length,sizeMm:size};
  fs.writeFileSync(path.join(output,'drpl-sources.json'),JSON.stringify([record],null,2)+'\n');
  console.log(record);
}
main().catch(error=>{console.error(error);process.exitCode=1;});
