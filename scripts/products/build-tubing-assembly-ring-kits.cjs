// Import the exact CL-1S assemblies/components; never scale a different bore.
// Usage: node scripts/products/build-tubing-assembly-ring-kits.cjs <hard-tube STEP root> <report directory>
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { packCompactCad } = require('./compact-cad/pack.cjs');
const root = path.resolve(__dirname, '../..');
const [sourceRoot, reportDirectory] = process.argv.slice(2);
if (!sourceRoot || !reportDirectory) throw Error('STEP root and report directory are required');
// A02 p.23 and formal CL-1S sheets 515-00-03399 through 03403:
// SUS304 sleeve + natural PEEK seal. The 20/30 assemblies are composed from
// their own component STEP files. The seal shoulder is at Z=+0.05 mm, as in
// the supplied 16/25/32 assembly exports (seal front face Z=+1.55 mm).
const definitions = [
  [16, '809801', '515-00-03399', '441-09-00099', '441-09-00104'],
  [20, '809802', null, '441-09-00100', '441-09-00105'],
  [25, '809803', '515-00-03401', '441-09-00101', '441-09-00106'],
  [30, '809804', null, '441-09-00102', '441-09-00107'],
  [32, '809805', '515-00-03403', '441-09-00103', '441-09-00108'],
  [16, '809653', '515-00-02866', '441-00-01523', '441-00-01524', '1X'],
];
async function main() {
  const occt = await require(path.join(root, 'public/vendor/occt/occt-import-js.js'))();
  const kits = [], reports = [];
  for (const [size, productCode, assembly, sleeve, seal, variant='1S'] of definitions) {
    const files = assembly ? [`${assembly}-C.stp`] : [`${sleeve}-c.stp`, `${seal}-c.stp`];
    const sources = [], meshes = [];
    for (const [index, filename] of files.entries()) {
      const file = path.join(sourceRoot, '卡环套件', filename), bytes = fs.readFileSync(file);
      const sourcePart = bytes.toString('utf8').match(/FILE_NAME\('([^']+)'/)?.[1];
      if (sourcePart !== (assembly ? `${assembly}_ASM` : `${index === 0 ? sleeve : seal}-C`)) throw Error(`${filename}: source identity mismatch`);
      const result = occt.ReadStepFile(bytes, {linearUnit:'millimeter', linearDeflectionType:'absolute_value', linearDeflection:.01, angularDeflection:.15});
      if (!result.success || result.meshes.length !== (assembly ? 2 : 1)) throw Error(`${filename}: invalid kit meshes`);
      for (const mesh of result.meshes) {
        const part = assembly ? mesh.name : index === 0 ? sleeve : seal;
        if (![sleeve, seal].includes(part)) throw Error(`${filename}: unexpected component ${part}`);
        mesh.appearance = { material: part === sleeve ? 'SUS' : 'PEEK', color:'本色' };
        mesh.name = part;
        const positions = mesh.attributes.position.array;
        if (!assembly && part === seal) for (let i = 2; i < positions.length; i += 3) positions[i] += 1.55;
        for (const attr of ['position','normal']) if (mesh.attributes[attr]) mesh.attributes[attr].array = mesh.attributes[attr].array.map(v => Number(v.toFixed(5)));
        meshes.push(mesh);
      }
      sources.push({file:`卡环套件\\${filename}`, sourcePart, sha256:crypto.createHash('sha256').update(bytes).digest('hex')});
    }
    const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
    let bore=Infinity;
    for (const mesh of meshes) {
      const p=mesh.attributes.position.array;
      for(let i=0;i<p.length;i+=3) {
        for(let axis=0;axis<3;axis++){min[axis]=Math.min(min[axis],p[i+axis]);max[axis]=Math.max(max[axis],p[i+axis]);}
        bore=Math.min(bore,2*Math.hypot(p[i+(variant==='1X'?1:0)],p[i+(variant==='1X'?2:1)]));
      }
    }
    const axis=variant==='1X'?0:2, length=variant==='1X'?2:4.1;
    if(Math.abs(bore-size/10)>.002 || Math.abs(max[axis]-min[axis]-length)>.01) throw Error(`CL-${variant}-${size}: unexpected bore or assembly height`);
    const model=`CL-${variant}-${size}`, cadUrl=`/models/products/tubing-assemblies/cad/assembly-${model.toLowerCase()}.fcad.gz`;
    const data={name:model,success:true,root:{name:model,meshes:[0,1],children:[]},meshes,
      // +Z seal face -> +Y -> outward at A (-X) / B (+X).
      rotationEuler:variant==='1X'?[0,0,-Math.PI/2]:[-Math.PI/2,0,0],dimensions:{min,max,size:max.map((v,i)=>v-min[i])}};
    const packed=packCompactCad(data);
    fs.writeFileSync(path.join(root,'public',cadUrl),packed.gzip);
    kits.push({model,productCode,kind:'卡环组件',material:'SUS + PEEK',materialLabel:'SUS 压套 + PEEK 密封垫圈',color:'本色',tubeOuterDiameters:[size/10],cadUrl,sources});
    reports.push({model,bore,min,max,sources,...packed.stats});
    console.log(`${model}: exact ${bore.toFixed(3)} mm bore, 2 source components / 2 materials`);
  }
  fs.writeFileSync(path.join(root,'data/products/configurator/tubing-assembly-ring-kits.json'),JSON.stringify(kits,null,2)+'\n');
  fs.mkdirSync(reportDirectory,{recursive:true});
  fs.writeFileSync(path.join(reportDirectory,'ring-kit-import-report.json'),JSON.stringify(reports,null,2)+'\n');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
