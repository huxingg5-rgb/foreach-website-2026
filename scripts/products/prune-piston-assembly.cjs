// Local build tool: full assemblies stay outside public/. Only compacted,
// visibility-filtered display surfaces are written to the supplied output.
// Run with: node --max-old-space-size=8192 ... input.json.gz outputDir depsDir
const fs = require('node:fs'), path = require('node:path'), zlib = require('node:zlib');
const { pathToFileURL } = require('node:url');
const { classify } = require('./piston-assembly-roles.cjs');
async function main() {
  const [input, out, deps] = process.argv.slice(2);
  if (!input || !out || !deps) throw Error('Pass input, output and three/three-mesh-bvh node_modules');
  const THREE = await import(pathToFileURL(path.join(deps, 'three/build/three.module.js')));
  const { MeshBVH, SAH } = await import(pathToFileURL(path.join(deps, 'three-mesh-bvh/src/index.js')));
  const model = JSON.parse(zlib.gunzipSync(fs.readFileSync(input))), roles = classify(model);
  const id = path.basename(input, '.json.gz'), started = Date.now();
  const directions = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
  for (let i = 0; i < 96; i++) { const y = 1 - 2 * (i + .5) / 96, r = Math.sqrt(1-y*y), a = i * Math.PI * (3-Math.sqrt(5)); directions.push([r*Math.cos(a), y, r*Math.sin(a)]); }
  function makeBVH(opaqueOnly) {
    const selected = model.meshes.filter((_,i) => !opaqueOnly || roles[i].role !== 4);
    const p = new Float32Array(selected.reduce((n,m) => n + m.attributes.position.array.length,0));
    const ix = new Uint32Array(selected.reduce((n,m) => n + m.index.array.length,0));
    let vo = 0, io = 0;
    for (const m of selected) { p.set(m.attributes.position.array,vo*3); for(const v of m.index.array) ix[io++] = v+vo; vo += m.attributes.position.array.length/3; }
    const g = new THREE.BufferGeometry(); g.setAttribute('position',new THREE.BufferAttribute(p,3)); g.setIndex(new THREE.BufferAttribute(ix,1));
    return new MeshBVH(g,{strategy:SAH,targetLeafSize:8});
  }
  const full = makeBVH(false), opaque = makeBVH(true);
  const ray = new THREE.Ray(), a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), normal = new THREE.Vector3();
  let rayCount = 0;
  const masks = model.meshes.map(m => ({pmma:new Uint8Array(m.brep_faces.length),peek:new Uint8Array(m.brep_faces.length)}));
  function clear(point, direction, bvh) {
    ray.direction.set(...direction); ray.origin.set(...point).addScaledVector(ray.direction,.0002); rayCount++;
    return !bvh.raycastFirst(ray,THREE.DoubleSide,0,Infinity);
  }
  for(const [mi,m] of model.meshes.entries()) {
    const p = m.attributes.position.array, ix = m.index.array;
    for(const [fi,face] of m.brep_faces.entries()) {
      const mask=masks[mi], count=face.last-face.first+1;
      // Stratified triangle centers, then near-corner samples for tiny slivers.
      // Retain a whole CAD face as soon as one sample is visible from outside.
      const samples = Math.min(count,192);
      for(let s=0;s<samples && (!mask.pmma[fi] || !mask.peek[fi]);s++) {
        const t=face.first+Math.min(count-1,Math.floor((s+.5)*count/samples));
        a.fromArray(p,ix[t*3]*3); b.fromArray(p,ix[t*3+1]*3); c.fromArray(p,ix[t*3+2]*3);
        normal.subVectors(b,a).cross(new THREE.Vector3().subVectors(c,a)).normalize();
        const ns=normal.toArray(), ds=[ns,ns.map(v=>-v),...directions];
        const points=[[ (a.x+b.x+c.x)/3,(a.y+b.y+c.y)/3,(a.z+b.z+c.z)/3 ]];
        if(count < 20 || s < 6) for(const v of [a,b,c])points.push([.96*v.x+.04*points[0][0],.96*v.y+.04*points[0][1],.96*v.z+.04*points[0][2]]);
        for(const point of points) {
          for(const d of ds) {
            // A blocked opaque-only ray also blocks the superset full BVH.
            const open = mask.pmma[fi] || clear(point,d,opaque);
            if(open) {
              mask.pmma[fi]=1;
              if(!mask.peek[fi] && clear(point,d,full))mask.peek[fi]=1;
            }
            if(mask.pmma[fi] && mask.peek[fi])break;
          }
          if(mask.pmma[fi] && mask.peek[fi])break;
        }
      }
      if(mask.peek[fi])mask.pmma[fi]=1;
    }
    if(mi % 15 === 0)console.log(id,'mesh',mi+'/'+model.meshes.length,'rays',rayCount);
  }
  fs.mkdirSync(out,{recursive:true});
  const report={id,sourceFile:model.sourceFile,method:'whole-BREP-face external ray visibility; 102 sphere/axis directions plus triangle normals; 192 stratified triangle samples and near-corner samples; PMMA head excluded from occluders',rays:rayCount,sourceMeshes:model.meshes.length,sourceTriangles:model.meshes.reduce((s,m)=>s+m.index.array.length/3,0),variants:{}};
  for(const variant of ['pmma','peek']) {
    const meshes=[],removed=[];let keptFaces=0,removedFaces=0;
    for(const [mi,m] of model.meshes.entries()) {
      const p=m.attributes.position.array,n=m.attributes.normal?.array,ix=m.index.array,positions=[],normals=[],indices=[],faces=[],mapping=new Map();
      for(const [fi,f] of m.brep_faces.entries()) {
        if(!masks[mi][variant][fi]){removedFaces++;continue;} keptFaces++;
        const first=indices.length/3;
        for(let j=f.first*3;j<(f.last+1)*3;j++) {
          const old=ix[j];let v=mapping.get(old);
          if(v===undefined){v=positions.length/3;mapping.set(old,v);for(let k=0;k<3;k++){positions.push(+p[old*3+k].toFixed(5));if(n)normals.push(+n[old*3+k].toFixed(5));}}
          indices.push(v);
        }
        faces.push({first,last:indices.length/3-1,sourceFace:fi});
      }
      if(!indices.length){removed.push(mi);continue;}
      meshes.push({name:'Part '+(meshes.length+1),sourceMeshIndex:mi,appearanceRole:roles[mi].role,attributes:{position:{array:positions},...(n?{normal:{array:normals}}:{})},index:{array:indices},brep_faces:faces});
    }
    const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
    for(const m of meshes)m.attributes.position.array.forEach((v,k)=>{min[k%3]=Math.min(min[k%3],v);max[k%3]=Math.max(max[k%3],v);});
    const result={success:true,name:model.name,root:{name:model.name,meshes:meshes.map((_,i)=>i),children:[]},meshes,exteriorOnly:true,exteriorOptimized:{method:'assembly-visibility',headMaterial:variant},appearance:{piston:true,fullAssembly:true},rotationEuler:[0,0,0],dimensions:{min,max,size:max.map((v,k)=>v-min[k]),axes:[[1,0,0],[0,1,0],[0,0,1]]}};
    const packed=zlib.gzipSync(JSON.stringify(result),{level:9});fs.writeFileSync(path.join(out,id+(variant==='peek'?'-peek':'')+'.json.gz'),packed);
    report.variants[variant]={meshes:meshes.length,removedMeshes:removed,keptFaces,removedFaces,triangles:meshes.reduce((s,m)=>s+m.index.array.length/3,0),bytes:packed.length,sizeMm:result.dimensions.size};
  }
  report.elapsedSeconds=(Date.now()-started)/1000;fs.writeFileSync(path.join(out,id+'-pruning-report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));
}
main().catch(e=>{console.error(e);process.exitCode=1;});
