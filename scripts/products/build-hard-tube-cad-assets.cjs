/* Usage: node scripts/products/build-hard-tube-cad-assets.cjs <STEP directory> <report directory> [workbook path] */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const Module = require('node:module');
const XLSX = require('xlsx');
const {packCompactCad} = require('./compact-cad/pack.cjs');
const root = path.resolve(__dirname, '../..');
const [source, reportDirectory, workbookArgument] = process.argv.slice(2);
if (!source || !reportDirectory) throw Error('STEP directory and report directory are required');
const defaultWorkbookPath = path.join(root, 'data-source/product-center/fittings/FRGD-140D-2606-0002_001_cn_连接件标品在售清单.xlsx');
const workbookPath = workbookArgument ? path.resolve(workbookArgument) : defaultWorkbookPath;
if (!fs.existsSync(workbookPath)) throw Error(`Workbook not found: ${workbookPath}`);
const workbook = XLSX.readFile(workbookPath);
const rows = XLSX.utils.sheet_to_json(workbook.Sheets['01_硬管接头'], {header:1, defval:''})
  .map((r, i) => ({row:i+1, part:String(r[2]).trim(), model:String(r[3]).match(/(?:HNF6|HNF|HN6|HN|CL)-(?:U28|M6|0X|0)-\d+-(?:PK|PV|PS|AC|ET|PP)-[A-Z]/)?.[0], code:String(r[4])})).filter(r => r.model && r.part);
const details = require('../../data/products/generated/fittings/hard-tube-fittings/detail/index.json');
const flat = require('../../data/products/detail/flat-bottom-fitting-cad-manifest.json');
// Reuse the site's catalog compatibility rules, including multi-size HN*-32.
const configPath = path.join(root, 'data/products/configurator/hard-tube-accessories.ts');
const compiled = require('./solenoid-viewer/node_modules/esbuild').buildSync({entryPoints:[configPath], bundle:true, platform:'node', format:'cjs', write:false}).outputFiles[0].text;
const configModule = new Module(configPath, module);
configModule.filename = configPath; configModule.paths = module.paths; configModule._compile(compiled, configPath);
const {HARD_TUBE_ACCESSORY_CONFIGS} = configModule.exports;
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
const files = collectStepFiles(source);
const fileFor = part => files.find(file => normalizeStepPart(file.name) === part);
const keyFor = model => model.split('-').slice(0,3).join('-').toLowerCase();
const finishFor = model => /-B$/.test(model) ? 'black' : /-Y$/.test(model) ? 'yellow' : /-PK-/.test(model) ? 'peek' : 'natural';
const bodySources = new Map();
for (const row of rows.filter(r => /^HN/.test(r.model) && fileFor(r.part))) {
  const key = keyFor(row.model); if (!bodySources.has(key)) bodySources.set(key, []); bodySources.get(key).push(row);
}
function washerMesh(outerDiameter, innerDiameter, thickness) {
  const position = [], normal = [], indices = [], n = 128;
  const R = outerDiameter/2, r = innerDiameter/2, h = thickness/2;
  const point = (radius, y, a) => [radius*Math.cos(a),y,radius*Math.sin(a)];
  function quad(points, normals) {
    const base = position.length/3;
    points.forEach((p,i) => {position.push(...p); normal.push(...normals[i]);});
    indices.push(base,base+2,base+1,base,base+3,base+2);
  }
  for(let i=0;i<n;i++) {
    const a=i*2*Math.PI/n, b=(i+1)*2*Math.PI/n;
    quad([point(R,h,a),point(R,h,b),point(r,h,b),point(r,h,a)],Array(4).fill([0,1,0]));
    quad([point(r,-h,a),point(r,-h,b),point(R,-h,b),point(R,-h,a)],Array(4).fill([0,-1,0]));
    quad([point(R,-h,a),point(R,-h,b),point(R,h,b),point(R,h,a)],[[Math.cos(a),0,Math.sin(a)],[Math.cos(b),0,Math.sin(b)],[Math.cos(b),0,Math.sin(b)],[Math.cos(a),0,Math.sin(a)]]);
    quad([point(r,h,a),point(r,h,b),point(r,-h,b),point(r,-h,a)],[[-Math.cos(a),0,-Math.sin(a)],[-Math.cos(b),0,-Math.sin(b)],[-Math.cos(b),0,-Math.sin(b)],[-Math.cos(a),0,-Math.sin(a)]]);
  }
  return {name:'Washer',attributes:{position:{array:position},normal:{array:normal}},index:{array:indices}};
}
async function main() {
  const occt = await require(path.join(root,'public/vendor/occt/occt-import-js.js'))();
  const geometries = {...flat.geometries}, products = structuredClone(flat.products), accessories = {}, prepared = [], unavailable = [];
  function prepare(id, meshes, category, rotationEuler, provenance) {
    const min = [Infinity,Infinity,Infinity], max = [-Infinity,-Infinity,-Infinity];
    meshes.forEach((mesh,i) => {
      mesh.name = `${id.toUpperCase()} ${i+1}`;
      for(const attribute of ['position','normal']) if(mesh.attributes[attribute]) mesh.attributes[attribute].array = mesh.attributes[attribute].array.map(v => Number(v.toFixed(5)));
      mesh.attributes.position.array.forEach((v,i) => {min[i%3]=Math.min(min[i%3],v);max[i%3]=Math.max(max[i%3],v);});
    });
    const size = max.map((v,i)=>v-min[i]);
    if (!rotationEuler) {
      const axis = category === 'ferrule' ? size.indexOf(Math.max(...size)) : Math.abs(size[0]-size[2])<.02 ? 1 : Math.abs(size[0]-size[1])<.02 ? 2 : 0;
      rotationEuler = axis===2 ? [-Math.PI/2,0,0] : axis===0 ? [0,0,Math.PI/2] : [0,0,0];
    }
    const data = {name:id.replace(/^(ferrule|accessory)-/,'').toUpperCase(),success:true,root:{name:id,meshes:meshes.map((_,i)=>i),children:[]},meshes,appearance:{fitting:true},rotationEuler,dimensions:{min,max,size,axes:[[1,0,0],[0,1,0],[0,0,1]]}};
    const packed = packCompactCad(data), model3dUrl = `/models/products/fittings/${category}/cad/${id}.fcad.gz`;
    geometries[id] = {model3dUrl,...provenance};
    prepared.push({id,model3dUrl,data:packed.gzip,sizeMm:size,rotationEuler,...packed.stats,...provenance});
    return id;
  }
  function fromStep(id, row, category) {
    const sourceFile = fileFor(row.part);
    if (!sourceFile) throw Error(`No STEP for part ${row.part}`);
    const input = fs.readFileSync(sourceFile.path);
    if(!input.subarray(0,128).includes(Buffer.from('ISO-10303-21'))) throw Error(`Invalid STEP ${row.part}`);
    const result = occt.ReadStepFile(input,{linearUnit:'millimeter',linearDeflectionType:'absolute_value',linearDeflection:.01,angularDeflection:.15});
    if(!result.success || !result.meshes.length) throw Error(`STEP import failed ${row.part}`);
    // All CL-0X source cylinders use Z as their axis, including equal-sided boxes.
    const provenance={sourcePart:row.part,sourceFile:sourceFile.relativePath,sourceSha256:crypto.createHash('sha256').update(input).digest('hex')};
    if(category==='accessories') {
      const radii=[...input.toString('utf8').matchAll(/CYLINDRICAL_SURFACE\([^;]*?,\s*([\d.E+-]+)\s*\);/gi)].map(match=>Number(match[1]));
      const innerDiameter=2*Math.min(...radii),nominalTube=Number(row.model.split('-')[2])/10;
      if(!Number.isFinite(innerDiameter)||Math.abs(innerDiameter-nominalTube)>.001)throw Error(`Unverified ferrule bore ${row.part}`);
      provenance.innerDiameter=innerDiameter;
    }
    return prepare(id,result.meshes,category,category==='accessories'?[-Math.PI/2,0,0]:null,provenance);
  }
  for(const [key, sources] of bodySources) fromStep(`ferrule-${key}`,sources[0],'ferrule');
  for(const detail of details.filter(d => ['standard-ferrule-fitting','compact-ferrule-fitting'].includes(d.seriesId))) {
    const row = rows.find(r => r.model===detail.model && r.code===detail.productCode);
    const viewerId = row && `ferrule-${keyFor(row.model)}`;
    if(!viewerId || !geometries[viewerId]) {unavailable.push({model:detail.model,part:row?.part||null,reason:'No exact model/code or matching STEP geometry'});continue;}
    products[detail.slug] = {viewerId,model:detail.model,part:row.part,workbookRow:row.row,finish:finishFor(detail.model)};
  }
  for(const [slug, product] of Object.entries(products)) {
    const config = HARD_TUBE_ACCESSORY_CONFIGS.find(c=>c.slug===slug && c.model===product.model);
    if(!config?.accessories.length) throw Error(`No catalog accessories for ${slug}`);
    product.accessoryCodes = [];
    for(const accessory of config.accessories) {
      const code = accessory.productCode;
      if(!accessories[code]) {
        let geometryId;
        if(accessory.kind==='垫片') {
          const {outerDiameter,innerDiameter,thickness} = accessory;
          if(!(outerDiameter>innerDiameter && innerDiameter>0 && thickness>0)) throw Error(`Invalid washer ${code}`);
          geometryId = `accessory-ws-${outerDiameter*10}-${innerDiameter*10}-${thickness*10}`;
          if(!geometries[geometryId]) prepare(geometryId,[washerMesh(outerDiameter,innerDiameter,thickness)],'accessories',[0,0,0],{source:'catalog-dimensions',outerDiameter,innerDiameter,thickness});
        } else {
          const key = keyFor(accessory.model);
          geometryId = `accessory-${key}`;
          if(!geometries[geometryId]) {
            const row = rows.find(r=>keyFor(r.model)===key && fileFor(r.part));
            if(!row) throw Error(`No STEP for matching ferrule ${accessory.model}`);
            fromStep(geometryId,row,'accessories');
          }
        }
        accessories[code] = {model:accessory.model,geometryId,kind:accessory.kind==='垫片'?'washer':'ferrule',finish:accessory.material==='SUS'?'steel':finishFor(accessory.model)};
      }
      product.accessoryCodes.push(code);
    }
    const nominalTube = Number(product.model.split('-')[2])/10;
    product.defaultAccessoryCode = config.accessories.find(a=>a.tubeOuterDiameters.includes(nominalTube))?.productCode || product.accessoryCodes[0];
  }
  for(const item of prepared){const file=path.join(root,'public',item.model3dUrl);fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,item.data);}
  fs.writeFileSync(path.join(root,'data/products/detail/hard-tube-fitting-cad-manifest.json'),JSON.stringify({geometries,products,accessories},null,2)+'\n');
  fs.mkdirSync(reportDirectory,{recursive:true});
  fs.writeFileSync(path.join(reportDirectory,'hard-tube-cad-import.json'),JSON.stringify({workbook:workbookPath,sourceDirectory:source,products,geometries:prepared.map(({data,...r})=>r),unavailable},null,2)+'\n');
  console.log(JSON.stringify({ferruleProducts:Object.keys(products).length-Object.keys(flat.products).length,flatBottomProducts:Object.keys(flat.products).length,accessories:Object.keys(accessories).length,geometries:prepared.map(({id,sizeMm,rotationEuler})=>({id,sizeMm,rotationEuler})),unavailable:unavailable.length},null,2));
}
main().catch(error=>{console.error(error);process.exitCode=1;});
