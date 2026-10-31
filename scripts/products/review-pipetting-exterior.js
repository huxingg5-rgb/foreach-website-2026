import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {smtp2Materials} from './solenoid-viewer/appearance-smtp2.js';
const ids=['smtp2-500','smtp2-510','smtp2-520','smtp4-100ul','smtp4-250ul','smtp4-500ul'],size=1024,dirs=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
for(const x of [-1,1])for(const y of [-1,1])for(const z of [-1,1])dirs.push([x,y,z]);
for(let i=0;i<48;i++){const y=1-2*(i+.417)/48,r=Math.sqrt(1-y*y),a=i*2.399963+.317;dirs.push([r*Math.cos(a),y,r*Math.sin(a)]);}
const renderer=new THREE.WebGLRenderer({antialias:false,alpha:true});renderer.setSize(size,size);renderer.setClearColor(0xffffff,0);renderer.toneMapping=THREE.ACESFilmicToneMapping;
const scene=new THREE.Scene(),pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment();scene.environment=pmrem.fromScene(room,.04).texture;room.dispose();pmrem.dispose();
scene.add(new THREE.HemisphereLight(0xffffff,0xb7b9bd,2));for(const [position,intensity]of [[[100,150,200],1.8],[[-120,40,-80],1],[[40,-150,70],.8]]){const l=new THREE.DirectionalLight(0xffffff,intensity);l.position.set(...position);scene.add(l);}
const target=new THREE.WebGLRenderTarget(size,size,{samples:4});target.texture.colorSpace=THREE.SRGBColorSpace;
const read=async folder=>{const r=await fetch(folder);return JSON.parse(await new Response(r.body.pipeThrough(new DecompressionStream('gzip'))).text());};
function build(data){const group=new THREE.Group(),edges=[];for(const m of data.meshes){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(m.attributes.position.array,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(m.attributes.normal.array,3));g.setIndex(m.index.array);const mesh=new THREE.Mesh(g,smtp2Materials(m,g)),line=new THREE.LineSegments(new THREE.EdgesGeometry(g,26),new THREE.LineBasicMaterial({color:0x64655f,transparent:true,opacity:.28}));mesh.add(line);edges.push(line);group.add(mesh);}return {group,edges};}
const next=()=>new Promise(resolve=>{const c=new MessageChannel();c.port1.onmessage=()=>{c.port1.close();c.port2.close();resolve();};c.port2.postMessage(null);});
function show(id,bytes){const canvas=document.querySelector('#'+id);canvas.width=canvas.height=size;const image=new Uint8ClampedArray(bytes.length);for(let y=0;y<size;y++)image.set(bytes.subarray((size-y-1)*size*4,(size-y)*size*4),y*size*4);canvas.getContext('2d').putImageData(new ImageData(image,size,size),0,0);}
document.querySelector('#run').onclick=async()=>{document.querySelector('#run').disabled=true;const reports=[];let worst=-1;try{for(const id of ids){
 const [raw,candidate]=await Promise.all([read('/reference/'+id+'.json.gz'),read('/candidate/'+id+'.json.gz')]),before=build(raw),after=build(candidate);scene.add(before.group,after.group);
 const center=new THREE.Vector3().fromArray(raw.dimensions.min).add(new THREE.Vector3().fromArray(raw.dimensions.max)).multiplyScalar(.5),radius=new THREE.Vector3().fromArray(raw.dimensions.size).length()*.53;
 before.group.position.copy(center).negate();after.group.position.copy(center).negate();const camera=new THREE.OrthographicCamera(-radius,radius,radius,-radius,.01,radius*20),a=new Uint8Array(size*size*4),b=new Uint8Array(size*size*4),report={id,views:dirs.length,resolution:size,threshold:8,modes:[]};
 for(const mode of ['solid','edges']){for(const obj of [before,after])for(const edge of obj.edges)edge.visible=mode==='edges';const result={mode,maxChanged:0,maxSilhouette:0,maxChannel:0,views:[]};
  for(const [vi,d]of dirs.entries()){
   camera.position.set(...d).normalize().multiplyScalar(radius*5);camera.up.set(0,1,0);if(Math.abs(d[1])===1&&d[0]===0&&d[2]===0)camera.up.set(0,0,-1);camera.lookAt(0,0,0);camera.updateMatrixWorld();
   before.group.visible=true;after.group.visible=false;renderer.setRenderTarget(target);renderer.render(scene,camera);renderer.readRenderTargetPixels(target,0,0,size,size,a);
   before.group.visible=false;after.group.visible=true;renderer.render(scene,camera);renderer.readRenderTargetPixels(target,0,0,size,size,b);
   let changed=0,silhouette=0,maxChannel=0;for(let j=0;j<a.length;j+=4){let delta=0;for(let k=0;k<4;k++)delta=Math.max(delta,Math.abs(a[j+k]-b[j+k]));if(delta>8)changed++;if(Math.abs(a[j+3]-b[j+3])>8)silhouette++;maxChannel=Math.max(maxChannel,delta);}
   result.views.push({vi,changed,silhouette,maxChannel});result.maxChanged=Math.max(result.maxChanged,changed);result.maxSilhouette=Math.max(result.maxSilhouette,silhouette);result.maxChannel=Math.max(result.maxChannel,maxChannel);
   if(changed>worst){worst=changed;show('before',a);show('after',b);document.querySelector('#worst').textContent=id+' / '+mode+' / view '+vi+' / '+changed+' px';}
   document.querySelector('#status').textContent=id+' '+mode+' '+(vi+1)+' / '+dirs.length;if(vi%2===0)await next();
  }report.modes.push(result);
 }
 reports.push(report);document.querySelector('#report').textContent=JSON.stringify(reports,null,2);scene.remove(before.group,after.group);for(const obj of [before,after])obj.group.traverse(o=>{o.geometry?.dispose();if(o.material)for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose();});renderer.renderLists.dispose();
}document.querySelector('#status').textContent='全部 6 个型号实体与边线比较完成';await fetch('/comparison',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(reports)});}catch(e){document.querySelector('#status').textContent=String(e);console.error(e);}finally{document.querySelector('#run').disabled=false;}};
