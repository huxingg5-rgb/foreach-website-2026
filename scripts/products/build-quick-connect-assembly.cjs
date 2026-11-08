/* eslint-disable @typescript-eslint/no-require-imports -- Read verified FCAD source geometry. */
const fs = require('node:fs'), path = require('node:path'), zlib = require('node:zlib'), Module = require('node:module');
const esbuild = require('./solenoid-viewer/node_modules/esbuild');
const root = path.resolve(__dirname, '../..');
const manifest = require('../../data/products/detail/quick-connect-fitting-cad-manifest.json');
const decoder = new Module(__filename, module);
decoder._compile(esbuild.buildSync({entryPoints:[path.join(__dirname,'solenoid-viewer/compact-cad.js')],bundle:true,platform:'node',format:'cjs',write:false}).outputFiles[0].text,__filename);
const {decodeCompactCad} = decoder.exports;
function read(product) {
  return decodeCompactCad(zlib.gunzipSync(fs.readFileSync(path.join(root,'public',manifest.geometries[product.viewerId].model3dUrl))));
}
function faces(data) {
  return data.meshes.flatMap((mesh,mi) => mesh.brep_faces.map((face,fi) => {
    const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity],p=mesh.attributes.position.array,indices=mesh.index.array;
    for(let j=face.first*3;j<(face.last+1)*3;j++)for(let k=0;k<3;k++){
      const value=p[indices[j]*3+k];min[k]=Math.min(min[k],value);max[k]=Math.max(max[k],value);
    }
    return {mesh:mi,face:fi,min,max};
  }));
}
const base = manifest.products['q2001-pmv-sacn'], data=read(base), axis=data.mating.axis, radial=[0,1,2].filter(k=>k!==axis);
const groove=faces(data).filter(face => Math.abs(face.max[axis]-face.min[axis]-1.3)<.0001 &&
  Math.abs(Math.max(...radial.flatMap(k=>[Math.abs(face.min[k]-data.mating.center[k]),Math.abs(face.max[k]-data.mating.center[k])]))-2.8)<.0001);
if(groove.length!==2)throw Error('The exact male retention groove must be reviewed');
const center=data.mating.center.slice();center[axis]=(groove[0].min[axis]+groove[0].max[axis])/2;
const references={baseModel:base.model,male:{viewerId:base.viewerId,center,grooveWidthMm:1.3,faceReferences:groove.map(f=>[f.mesh,f.face]),sourceSha256:manifest.geometries[base.viewerId].sourceSha256},female:{}};
for(const product of Object.values(manifest.products).filter(p=>p.series===base.series&&p.gender==='S')){
  const model=read(product),a=model.mating.axis,perp=[0,1,2].filter(k=>k!==a);
  // The broad transverse faces of the 0.9 mm release plate bound the latch.
  // Both faces must match uniquely; do not infer insertion from total lengths.
  const planes=faces(model).filter(face=>{
    const spans=perp.map(k=>face.max[k]-face.min[k]).sort((a,b)=>a-b);
    const offset=((face.min[a]+face.max[a])/2-model.mating.center[a])*-model.mating.sign;
    return face.max[a]-face.min[a]<.0001&&Math.abs(spans[0]-11)<.01&&spans[1]>16&&spans[1]<18.5&&offset>=0&&offset<6;
  });
  const pairs=planes.flatMap(first=>planes.filter(last=>first.min[a]<last.min[a]&&Math.abs(last.min[a]-first.min[a]-.9)<.005).map(last=>[first,last]));
  if(pairs.length!==1)throw Error('No unique verified latch: '+product.model);
  const [first,last]=pairs[0],c=model.mating.center.slice();c[a]=(first.min[a]+last.min[a])/2;
  references.female[product.model.toLowerCase()]={viewerId:product.viewerId,center:c,thicknessMm:last.min[a]-first.min[a],faceReferences:pairs[0].map(f=>[f.mesh,f.face]),sourceSha256:manifest.geometries[product.viewerId].sourceSha256};
}
fs.writeFileSync(path.join(root,'data/products/detail/quick-connect-pilot-assembly.json'),JSON.stringify(references,null,2)+'\n');
console.log(`Verified ${base.model} retention groove and ${Object.keys(references.female).length} exact mating latches.`);
