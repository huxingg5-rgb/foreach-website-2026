// Local-only whole-BREP-face visibility pass. A separate raster audit restores
// visible slivers before publishing; source meshes are never decimated.
const fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib');
const {pathToFileURL}=require('node:url');
async function main(){
 const [stage,id,deps]=process.argv.slice(2);
 if(!stage||!id||!deps)throw Error('Pass stage, model ID and BVH dependency directory');
 const THREE=await import(pathToFileURL(path.join(deps,'three/build/three.module.js')));
 const {MeshBVH,SAH}=await import(pathToFileURL(path.join(deps,'three-mesh-bvh/src/index.js')));
 const raw=JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(stage,'raw',id+'.json.gz'))));
 const p=new Float32Array(raw.meshes.reduce((n,m)=>n+m.attributes.position.array.length,0));
 const ix=new Uint32Array(raw.meshes.reduce((n,m)=>n+m.index.array.length,0));let vo=0,io=0;
 for(const m of raw.meshes){p.set(m.attributes.position.array,vo*3);for(const v of m.index.array)ix[io++]=v+vo;vo+=m.attributes.position.array.length/3;}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(p,3));g.setIndex(new THREE.BufferAttribute(ix,1));
 const bvh=new MeshBVH(g,{strategy:SAH,targetLeafSize:8}),ray=new THREE.Ray();
 const directions=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
 for(let i=0;i<96;i++){const y=1-2*(i+.5)/96,r=Math.sqrt(1-y*y),a=i*Math.PI*(3-Math.sqrt(5));directions.push([r*Math.cos(a),y,r*Math.sin(a)]);}
 const a=new THREE.Vector3(),b=new THREE.Vector3(),c=new THREE.Vector3(),normal=new THREE.Vector3(),edge=new THREE.Vector3(),keep=[];let rays=0;
 function clear(point,d){ray.direction.set(...d);ray.origin.set(...point).addScaledVector(ray.direction,.0002);rays++;return !bvh.raycastFirst(ray,THREE.DoubleSide,0,Infinity);}
 for(const [mi,m] of raw.meshes.entries()){
  const p=m.attributes.position.array,ix=m.index.array;
  for(const [fi,f] of m.brep_faces.entries()){
   const count=f.last-f.first+1,samples=Math.min(count,192);let visible=false;
   for(let s=0;s<samples&&!visible;s++){
    const t=f.first+Math.min(count-1,Math.floor((s+.5)*count/samples));
    a.fromArray(p,ix[t*3]*3);b.fromArray(p,ix[t*3+1]*3);c.fromArray(p,ix[t*3+2]*3);
    normal.subVectors(b,a).cross(edge.subVectors(c,a)).normalize();const ns=normal.toArray();
    const center=[(a.x+b.x+c.x)/3,(a.y+b.y+c.y)/3,(a.z+b.z+c.z)/3],points=[center];
    if(count<20||s<6)for(const v of [a,b,c])points.push([.96*v.x+.04*center[0],.96*v.y+.04*center[1],.96*v.z+.04*center[2]]);
    for(const point of points){for(const d of [ns,ns.map(v=>-v),...directions])if(clear(point,d)){visible=true;break;}if(visible)break;}
   }
   if(visible)keep.push([mi,fi]);
  }
  if(mi%16===0)console.log(id,mi+'/'+raw.meshes.length,'rays',rays);
 }
 fs.writeFileSync(path.join(stage,id+'-ray-audit.json'),JSON.stringify({id,directions:directions.length,maxSamplesPerFace:192,rays,keep},null,2));
 console.log(id,'retained',keep.length,'of',raw.meshes.reduce((n,m)=>n+m.brep_faces.length,0));
}
main().catch(e=>{console.error(e);process.exitCode=1;});
