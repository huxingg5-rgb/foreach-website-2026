import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {rplMaterials} from './solenoid-viewer/appearance-rpl.js';
import {diaphragmMaterials} from './solenoid-viewer/appearance-diaphragm.js';
import {createDisplayEdges} from './solenoid-viewer/edges-rpl.js';
import {applyModelPose} from './solenoid-viewer/model-pose.js';

// An isolated, read-only audit page. Bundle with esbuild, then serve the bundle
// beside /before/<model>.json and /candidate/<model>.json. It never writes models.
const params=new URLSearchParams(location.search);
const fullCoverage=params.get('coverage')==='full';
const allModels=['rpl-p4','rpl-p635','rpl-p15','drpl-0109','dpl30-db','dpl30-bb','dpl60-db','dpl60-bb','dpl30h-ds','dpl30h-bs','dpgl800-bs'];
const modelIds=params.has('model')?params.get('model').split(',').filter(id=>allModels.includes(id)):allModels;
const size=Math.max(256,Math.min(2048,Number(params.get('size'))||1024));
const viewCount=Math.max(32,Math.min(256,Number(params.get('views'))||48));
const threshold=Math.max(0,Math.min(64,Number(params.get('threshold'))||8));
// Standard rotated-grid 4x MSAA positions, expressed relative to pixel center.
// WebGL does not expose implementation sample positions; retain the center pass
// too, and report these explicit offsets instead of claiming driver equivalence.
const idSamples=[{name:'center',offset:[0,0]},
  {name:'subpixel-1',offset:[-.125,-.375]},{name:'subpixel-2',offset:[.375,-.125]},
  {name:'subpixel-3',offset:[-.375,.125]},{name:'subpixel-4',offset:[.125,.375]}];
const results=[];
const storedViews=[];
const report={
  audit:'Whole-assembly before/after hidden-face removal',
  startedAt:new Date().toISOString(),status:'running',size,viewCount,threshold,fullCoverage,
  comparison:'Same original bounds, camera, original normals, material groups, studio environment, lights and render target. Solid and 26-degree edge modes.',
  limitations:'Finite sampled views are a visual regression check, not a mathematical proof of invisibility from every possible viewpoint. Silhouette uses alpha coverage; surface color uses pixels fully covered in both renders.',
  faceAttribution:'Original BREP face IDs are rendered without lighting, tone mapping, color conversion or antialiasing. Pixel-center and four rotated-grid subpixel passes inspect changed pixels plus a one-pixel neighborhood. Hardware MSAA sample locations are not exposed by WebGL; explicit offsets are recorded. Suggested restoration is conservative, not an automatic edit.',
  idSamples,
  models:results,
};

document.title='Pump mesh reduction visual audit';
document.body.innerHTML=`<style>
body{margin:24px;font:15px/1.5 system-ui,sans-serif;color:#18242d;background:#f4f6f7}h1{font-size:23px;margin-bottom:8px}p{margin:8px 0}progress{width:100%;height:20px}#status{font-weight:600}select{font:inherit;padding:7px;min-width:340px}.views{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin:14px 0}figure{margin:0}figcaption{font-weight:600;margin-bottom:6px}canvas{display:block;width:100%;height:auto;border:1px solid #ced5da;background:white}textarea{width:100%;height:340px;box-sizing:border-box;font:12px/1.4 monospace;padding:12px}#view-label{white-space:pre-wrap}.note{color:#586772}@media(max-width:800px){.views{grid-template-columns:1fr}}
</style><h1>泵模型减面前后审核</h1>
<p id="status">准备模型…</p><progress id="progress" value="0" max="${modelIds.length*viewCount*2}"></progress>
<p class="note">保留原模型的坐标、法线和材质；固定相机对比实体与边线。红色差异图显示像素变化，浅灰为原模型轮廓。</p>
<label>审核画面 <select id="result" disabled><option>正在生成…</option></select></label><p id="view-label"></p>
<div class="views"><figure><figcaption>减面前</figcaption><canvas id="before"></canvas></figure><figure><figcaption>减面后</figcaption><canvas id="after"></canvas></figure><figure><figcaption>差异（红色，增强显示）</figcaption><canvas id="diff"></canvas></figure></div>
<p class="note">下面为可复制的完整审核数据。</p><textarea id="report" readonly aria-label="审核报告"></textarea>`;
const statusEl=document.getElementById('status');
const progressEl=document.getElementById('progress');
const selectEl=document.getElementById('result');
const reportEl=document.getElementById('report');
for(const id of ['before','after','diff']){const canvas=document.getElementById(id);canvas.width=size;canvas.height=size;}
// Per-pixel coordinates and repeated subpixel traces are needed for attribution
// while rendering, but can make the UI report tens of MB and stall inspection.
// Keep per-view metrics, model restoration IDs, evidence and sampling settings.
function publish(){reportEl.value=JSON.stringify(report,(key,value)=>key==='changedPixelIndices'||key==='samplePasses'?undefined:value,2);}
// MessageChannel yields to input without depending on animation frames, which
// are suspended when this read-only audit is running in a background tab.
function yieldFrame(){return new Promise(resolve=>{const channel=new MessageChannel();channel.port1.onmessage=()=>{channel.port1.close();channel.port2.close();resolve();};channel.port2.postMessage(null);});}
function directions(){
  const fixed=[
    ['right',[1,0,0]],['left',[-1,0,0]],['top',[0,1,0]],['bottom',[0,-1,0]],['front',[0,0,1]],['back',[0,0,-1]],
  ];
  for(const x of [-1,1])for(const y of [-1,1])for(const z of [-1,1])fixed.push([`corner-${x}-${y}-${z}`,[x,y,z]]);
  const n=viewCount-fixed.length;
  for(let i=0;i<n;i++){
    const y=1-2*(i+.5)/n,r=Math.sqrt(1-y*y),a=i*Math.PI*(3-Math.sqrt(5));
    fixed.push([`orbit-${i+1}`,[r*Math.cos(a),y,r*Math.sin(a)]]);
  }
  return fixed.map(([name,direction])=>({name,direction:new THREE.Vector3(...direction).normalize()}));
}
const viewpoints=directions();

function meshStats(data){
  return {meshSlots:data.meshes.length,nonemptyMeshes:data.meshes.filter(m=>m.index.array.length>0).length,
    triangles:data.meshes.reduce((sum,m)=>sum+m.index.array.length/3,0),
    faceSlots:data.meshes.reduce((sum,m)=>sum+(m.brep_faces?.length||0),0),
    nonemptyFaces:data.meshes.reduce((sum,m)=>sum+(m.brep_faces||[]).filter(f=>f.first<=f.last).length,0)};
}

function createModel(data){
  const group=new THREE.Group(),solid=new THREE.Group(),edges=[];
  applyModelPose(data,solid);group.add(solid);
  for(const [meshIndex,src] of data.meshes.entries()){
    const edgePatch=data.exteriorOptimized?.edgeReconstruction?.[meshIndex];
    if(!src.index.array.length&&!edgePatch)continue;
    const geometry=new THREE.BufferGeometry();
    geometry.setAttribute('position',new THREE.Float32BufferAttribute(src.attributes.position.array,3));
    if(!src.attributes.normal)throw new Error('Audit requires the supplied original normals; refusing to recompute them.');
    geometry.setAttribute('normal',new THREE.Float32BufferAttribute(src.attributes.normal.array,3));
    geometry.setIndex(src.index.array);
    const materials=src.index.array.length?(data.appearance?.diaphragm?diaphragmMaterials(src,geometry,data.name,meshIndex):rplMaterials(src,geometry)):[];
    // Preserved BREP slots can have zero triangles. The viewer renders only their
    // surviving groups; empty groups have no draw call and no visible surface.
    geometry.groups=geometry.groups.filter(g=>g.count>0);
    const mesh=src.index.array.length?new THREE.Mesh(geometry,materials):new THREE.Group();solid.add(mesh);
    const edge=new THREE.LineSegments(createDisplayEdges(geometry,edgePatch),new THREE.LineBasicMaterial({color:0x64655f,transparent:true,opacity:.28}));
    mesh.add(edge);edges.push(edge);if(!src.index.array.length)geometry.dispose();
  }
  return {group,edges,dispose(){group.traverse(o=>{o.geometry?.dispose();if(o.material)for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose();});}};
}

function createFaceIdModel(beforeData,afterData){
  const group=new THREE.Group(),solid=new THREE.Group(),lookup=[null];
  const removedByMesh=[];
  applyModelPose(beforeData,solid);group.add(solid);
  const material=new THREE.RawShaderMaterial({
    side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1,
    toneMapped:false,blending:THREE.NoBlending,depthTest:true,depthWrite:true,
    vertexShader:'precision highp float; attribute vec3 position; attribute vec3 faceId; uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; varying vec3 vFaceId; void main(){vFaceId=faceId;vec4 mvPosition=modelViewMatrix*vec4(position,1.0);gl_Position=projectionMatrix*mvPosition;}',
    fragmentShader:'precision highp float; varying vec3 vFaceId; void main(){gl_FragColor=vec4(vFaceId,1.0);}',
  });
  for(const [meshIndex,src] of beforeData.meshes.entries()){
    removedByMesh[meshIndex]=0;
    if(!src.index.array.length)continue;
    const candidate=afterData.meshes[meshIndex];
    if(!candidate||candidate.brep_faces?.length!==src.brep_faces?.length)throw new Error(`BREP slots are not preserved for mesh ${meshIndex}; face attribution would be invalid.`);
    const p=src.attributes.position.array,index=src.index.array;
    const positions=new Float32Array(index.length*3),ids=new Uint8Array(index.length*3);
    for(let i=0;i<index.length;i++){const vertex=index[i]*3;positions[i*3]=p[vertex];positions[i*3+1]=p[vertex+1];positions[i*3+2]=p[vertex+2];}
    for(const [faceIndex,face] of src.brep_faces.entries()){
      if(face.first>face.last)continue;
      const candidateFace=candidate.brep_faces[faceIndex],removed=candidateFace.first>candidateFace.last;
      if(removed)removedByMesh[meshIndex]++;
      const id=lookup.length;if(id>=0xffffff)throw new Error('24-bit face ID capacity exceeded.');
      lookup.push({meshIndex,faceIndex,removed});
      const r=id&255,g=(id>>>8)&255,b=(id>>>16)&255;
      for(let vertex=face.first*3;vertex<(face.last+1)*3;vertex++){ids[vertex*3]=r;ids[vertex*3+1]=g;ids[vertex*3+2]=b;}
    }
    const geometry=new THREE.BufferGeometry();
    geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
    geometry.setAttribute('faceId',new THREE.BufferAttribute(ids,3,true));
    // Match the original material-group draw ordering as well as depth bias.
    // Otherwise coplanar assembly contact faces can return a different ID just
    // because a single-material picking mesh was sorted differently.
    const sourceMaterials=beforeData.appearance?.diaphragm?diaphragmMaterials(src,geometry,beforeData.name,meshIndex):rplMaterials(src,geometry),idMaterials=sourceMaterials.map(()=>material.clone());
    sourceMaterials.forEach(m=>m.dispose());geometry.groups=geometry.groups.filter(g=>g.count>0);
    solid.add(new THREE.Mesh(geometry,idMaterials));
  }
  return {group,lookup,removedByMesh,dispose(){solid.children.forEach(mesh=>{mesh.geometry.dispose();mesh.material.forEach(m=>m.dispose());});material.dispose();}};
}

function faceAttribution(changedPixels,idPixels,picking,mode,viewName,sampleName,evidence){
  const directFaces=new Set(),nearbyFaces=new Set(),removedFaces=new Set(),meshes=new Set();
  let changedPixelsWithoutNearbyFace=0,invalidIdPixels=0;
  const decode=pixel=>{
    const offset=pixel*4;
    if(idPixels[offset+3]===0)return 0;
    const id=idPixels[offset]|(idPixels[offset+1]<<8)|(idPixels[offset+2]<<16);
    if(!picking.lookup[id]){invalidIdPixels++;return 0;}
    return id;
  };
  for(const pixel of changedPixels){
    const x=pixel%size,y=Math.floor(pixel/size),direct=decode(pixel),neighborIds=new Set();
    if(direct)directFaces.add(direct);
    for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){
      const nx=x+dx,ny=y+dy;if(nx<0||nx>=size||ny<0||ny>=size)continue;
      const id=decode(ny*size+nx);if(id)neighborIds.add(id);
    }
    if(!neighborIds.size)changedPixelsWithoutNearbyFace++;
    for(const id of neighborIds){
      nearbyFaces.add(id);
      const face=picking.lookup[id];meshes.add(face.meshIndex);
      const key=`${face.meshIndex}:${face.faceIndex}`;
      let record=evidence.get(key);
      if(!record){record={meshIndex:face.meshIndex,faceIndex:face.faceIndex,removed:face.removed,directChangedPixelHits:0,nearbyChangedPixelHits:0,views:new Set(),modes:new Set(),samples:new Set()};evidence.set(key,record);}
      record.nearbyChangedPixelHits++;if(id===direct)record.directChangedPixelHits++;
      record.views.add(viewName);record.modes.add(mode);record.samples.add(sampleName);
      if(face.removed)removedFaces.add(id);
    }
  }
  const pairs=set=>Array.from(set,id=>{const face=picking.lookup[id];return [face.meshIndex,face.faceIndex];}).sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
  return {restoreFaces:pairs(removedFaces),affectedMeshes:Array.from(meshes).sort((a,b)=>a-b),
    directOriginalFaces:pairs(directFaces),nearbyOriginalFaces:pairs(nearbyFaces),
    changedPixelsWithoutNearbyFace,invalidIdPixels};
}

function publishAttribution(modelReport,evidence,picking,beforeData){
  const records=Array.from(evidence.values()).sort((a,b)=>a.meshIndex-b.meshIndex||a.faceIndex-b.faceIndex);
  modelReport.restoreFaces=records.filter(record=>record.removed).map(record=>[record.meshIndex,record.faceIndex]);
  modelReport.affectedMeshes=Array.from(new Set(records.map(record=>record.meshIndex))).sort((a,b)=>a-b);
  modelReport.faceEvidence=records.map(record=>({...record,views:Array.from(record.views),modes:Array.from(record.modes),samples:Array.from(record.samples)}));
  modelReport.affectedMeshEvidence=modelReport.affectedMeshes.map(meshIndex=>({meshIndex,name:beforeData.meshes[meshIndex].name||'',removedFaceCount:picking.removedByMesh[meshIndex],
    note:'Any deleted neighboring face in this mesh can expose a new EdgesGeometry boundary. Restore the whole affected mesh conservatively if per-face restoration does not eliminate the difference.'}));
}

// Independently keep any deleted face visible anywhere in the original ID
// render, even if its color happens to match the newly exposed surface.
function recordFullCoverage(pixels,picking,mode,viewName,evidence){
 const seen=new Set();
 for(let i=0;i<pixels.length;i+=4){if(!pixels[i+3])continue;const id=pixels[i]|(pixels[i+1]<<8)|(pixels[i+2]<<16);if(picking.lookup[id]?.removed)seen.add(id);}
 for(const id of seen){const face=picking.lookup[id],key=`${face.meshIndex}:${face.faceIndex}`;
  let record=evidence.get(key);
  if(!record){record={meshIndex:face.meshIndex,faceIndex:face.faceIndex,removed:true,directChangedPixelHits:0,nearbyChangedPixelHits:0,views:new Set(),modes:new Set(),samples:new Set()};evidence.set(key,record);}
  record.views.add(viewName);record.modes.add(mode);record.samples.add('full-frame-center');
 }
}

function pixelMetrics(before,after){
  let changed=0,silhouette=0,surface=0,anyDifference=0,maxDelta=0,maxAlphaDelta=0,sumAbsoluteRgb=0;
  const changedPixelIndices=[];
  let referenceCovered=0,beforeCovered=0,afterCovered=0;
  let minX=size,minY=size,maxX=-1,maxY=-1;
  for(let i=0;i<before.length;i+=4){
    const a=before[i+3],b=after[i+3],alphaDelta=Math.abs(a-b);
    const dr=Math.abs(before[i]-after[i]),dg=Math.abs(before[i+1]-after[i+1]),db=Math.abs(before[i+2]-after[i+2]);
    const rgbDelta=Math.max(dr,dg,db),delta=Math.max(rgbDelta,alphaDelta);
    maxDelta=Math.max(maxDelta,delta);maxAlphaDelta=Math.max(maxAlphaDelta,alphaDelta);sumAbsoluteRgb+=dr+dg+db;
    if(a>threshold)beforeCovered++;if(b>threshold)afterCovered++;if(a>threshold||b>threshold)referenceCovered++;
    if(delta>0)anyDifference++;
    if(delta>threshold){changed++;const pixel=i/4,x=pixel%size,y=size-1-Math.floor(pixel/size);changedPixelIndices.push(pixel);minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);}
    if(alphaDelta>threshold)silhouette++;
    if(a>=255-threshold&&b>=255-threshold&&rgbDelta>threshold)surface++;
  }
  const metrics={changedPixels:changed,silhouetteChangedPixels:silhouette,surfaceColorChangedPixels:surface,
    exactDifferencePixels:anyDifference,maxChannelDelta:maxDelta,maxAlphaDelta,
    meanAbsoluteRgbDelta:sumAbsoluteRgb/(size*size*3),beforeCoveredPixels:beforeCovered,afterCoveredPixels:afterCovered,
    changedFractionOfCoveredPixels:referenceCovered?changed/referenceCovered:0,
    changedBounds:changed?{x:minX,y:minY,width:maxX-minX+1,height:maxY-minY+1}:null};
  Object.defineProperty(metrics,'changedPixelIndices',{value:changedPixelIndices});return metrics;
}

function canvasPixels(bytes){
  const flipped=new Uint8ClampedArray(bytes.length);
  for(let y=0;y<size;y++){
    const src=(size-1-y)*size*4,dst=y*size*4;
    flipped.set(bytes.subarray(src,src+size*4),dst);
    // Present the transparent audit target against the same white background.
    for(let x=dst;x<dst+size*4;x+=4){const a=flipped[x+3]/255;for(let c=0;c<3;c++)flipped[x+c]=Math.round(flipped[x+c]*a+255*(1-a));flipped[x+3]=255;}
  }
  return new ImageData(flipped,size,size);
}
function differencePixels(before,after){
  const output=new Uint8ClampedArray(before.length);
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
    const i=((size-1-y)*size+x)*4,j=(y*size+x)*4;
    let delta=0;for(let c=0;c<4;c++)delta=Math.max(delta,Math.abs(before[i+c]-after[i+c]));
    const background=before[i+3]||after[i+3]?225:255;
    if(delta>threshold){const strength=Math.min(1,.35+delta/64);output[j]=235;output[j+1]=Math.round(220*(1-strength));output[j+2]=Math.round(220*(1-strength));}
    else output[j]=output[j+1]=output[j+2]=background;
    output[j+3]=255;
  }
  return new ImageData(output,size,size);
}
function showView(index){
  const item=storedViews[index];if(!item)return;
  document.getElementById('before').getContext('2d').putImageData(canvasPixels(item.before),0,0);
  document.getElementById('after').getContext('2d').putImageData(canvasPixels(item.after),0,0);
  document.getElementById('diff').getContext('2d').putImageData(differencePixels(item.before,item.after),0,0);
  document.getElementById('view-label').textContent=`${item.model} / ${item.mode} / ${item.name}\n变化 ${item.metrics.changedPixels} px；轮廓变化 ${item.metrics.silhouetteChangedPixels} px；表面颜色变化 ${item.metrics.surfaceColorChangedPixels} px；最大通道差 ${item.metrics.maxChannelDelta}/255`;
}
selectEl.onchange=()=>showView(Number(selectEl.value));
function addView(item){
  const index=storedViews.push(item)-1;
  if(index===0)selectEl.replaceChildren();
  const option=document.createElement('option');option.value=String(index);option.textContent=`${item.model} · ${item.mode} · ${item.name} · ${item.metrics.changedPixels} px`;
  selectEl.append(option);selectEl.disabled=false;selectEl.value=String(index);showView(index);
}

async function main(){
  if(!modelIds.length)throw new Error('No valid model requested.');
  const renderer=new THREE.WebGLRenderer({antialias:false,alpha:true,preserveDrawingBuffer:false});
  renderer.setSize(size,size);renderer.setPixelRatio(1);renderer.setClearColor(0xffffff,0);
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1;renderer.outputColorSpace=THREE.SRGBColorSpace;
  const target=new THREE.WebGLRenderTarget(size,size,{format:THREE.RGBAFormat,type:THREE.UnsignedByteType,depthBuffer:true,stencilBuffer:false,samples:Math.min(4,renderer.capabilities.maxSamples||0)});
  target.texture.colorSpace=THREE.SRGBColorSpace;
  const idTarget=new THREE.WebGLRenderTarget(size,size,{format:THREE.RGBAFormat,type:THREE.UnsignedByteType,depthBuffer:true,stencilBuffer:false,samples:0,minFilter:THREE.NearestFilter,magFilter:THREE.NearestFilter});
  idTarget.texture.colorSpace=THREE.NoColorSpace;
  report.rendering={threeRevision:THREE.REVISION,webglVersion:renderer.getContext().getParameter(renderer.getContext().VERSION),samples:target.samples,colorSpace:'sRGB',toneMapping:'ACESFilmic',exposure:1,transparentBackgroundForCoverage:true};
  const scene=new THREE.Scene();
  const studio=new RoomEnvironment(),pmrem=new THREE.PMREMGenerator(renderer),environment=pmrem.fromScene(studio,.04);
  scene.environment=environment.texture;studio.dispose();pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xffffff,0xb7b9bd,2));
  for(const [position,intensity] of [[[100,150,200],1.8],[[-120,40,-80],1],[ [40,-150,70],.8]]){const light=new THREE.DirectionalLight(0xffffff,intensity);light.position.set(...position);scene.add(light);}
  const camera=new THREE.OrthographicCamera(-1,1,1,-1,.01,10000);
  const fill=new THREE.DirectionalLight(0xffffff,1.6);fill.position.set(-1,1,2);fill.target.position.set(0,0,-1);camera.add(fill,fill.target);scene.add(camera);
  const beforePixels=new Uint8Array(size*size*4),afterPixels=new Uint8Array(size*size*4),idPixels=new Uint8Array(size*size*4);
  let progress=0;
  const render=model=>{
    model.group.visible=true;renderer.setRenderTarget(target);renderer.clear();renderer.render(scene,camera);renderer.readRenderTargetPixels(target,0,0,size,size,model===currentBefore?beforePixels:afterPixels);model.group.visible=false;
  };
  let currentBefore;
  try{
    for(const id of modelIds){
      statusEl.textContent=`读取 ${id} 减面前后模型…`;await yieldFrame();
      const [beforeData,afterData]=await Promise.all(['before','candidate'].map(async folder=>{const response=await fetch(`/${folder}/${id}.json`);if(!response.ok)throw new Error(`${folder}/${id}.json: HTTP ${response.status}`);return response.json();}));
      const before=createModel(beforeData),after=createModel(afterData);currentBefore=before;
      const picking=createFaceIdModel(beforeData,afterData),idScene=new THREE.Scene(),faceEvidence=new Map();idScene.add(picking.group);
      scene.add(before.group,after.group);
      const bounds=new THREE.Box3().setFromObject(before.group,Boolean(beforeData.appearance?.diaphragm)),center=bounds.getCenter(new THREE.Vector3()),extent=bounds.getSize(new THREE.Vector3());
      before.group.position.sub(center);after.group.position.sub(center);
      picking.group.position.sub(center);
      before.group.visible=false;after.group.visible=false;
      const radius=extent.length()*.55;
      camera.left=camera.bottom=-radius;camera.right=camera.top=radius;camera.far=Math.max(10000,radius*20);camera.updateProjectionMatrix();
      const modelReport={id,before:meshStats(beforeData),after:meshStats(afterData),sharedOriginalBounds:{min:bounds.min.toArray(),max:bounds.max.toArray()},restoreFaces:[],affectedMeshes:[],modes:[]};
      results.push(modelReport);publish();
      for(const mode of ['solid','edges']){
        for(const model of [before,after])for(const edge of model.edges)edge.visible=mode==='edges';
        const modeReport={mode,views:[],maxChangedPixels:0,maxSilhouetteChangedPixels:0,maxSurfaceColorChangedPixels:0,maxChannelDelta:0,worstView:null};
        modelReport.modes.push(modeReport);
        let worst;
        for(const [i,view] of viewpoints.entries()){
          statusEl.textContent=`审核 ${id} · ${mode==='solid'?'实体':'带边线'} · ${i+1}/${viewpoints.length}`;
          camera.position.copy(view.direction).multiplyScalar(radius*5);
          camera.up.set(0,1,0);if(Math.abs(view.direction.y)>.999)camera.up.set(0,0,view.direction.y>0?-1:1);
          camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
          render(before);render(after);
          const metrics=pixelMetrics(beforePixels,afterPixels),entry={name:view.name,direction:view.direction.toArray(),...metrics};modeReport.views.push(entry);
          if(metrics.changedPixels||(fullCoverage&&mode==='solid')){
            const originalProjection=camera.projectionMatrix.clone(),samplePasses=[],restores=new Map(),affectedMeshes=new Set();
            try{
              renderer.setClearColor(0x000000,0);renderer.setRenderTarget(idTarget);
              for(const sample of metrics.changedPixels?idSamples:idSamples.slice(0,1)){
                camera.projectionMatrix.copy(originalProjection);
                // Shift geometry oppositely: the pixel center now evaluates the
                // original view at the desired subpixel sample location.
                camera.projectionMatrix.elements[12]-=2*sample.offset[0]/size;
                camera.projectionMatrix.elements[13]-=2*sample.offset[1]/size;
                camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
                renderer.clear();renderer.render(idScene,camera);renderer.readRenderTargetPixels(idTarget,0,0,size,size,idPixels);
                if(fullCoverage&&mode==='solid'&&sample.name==='center')recordFullCoverage(idPixels,picking,mode,view.name,faceEvidence);
                const attribution=faceAttribution(metrics.changedPixelIndices,idPixels,picking,mode,view.name,sample.name,faceEvidence);
                samplePasses.push({sample:sample.name,offset:sample.offset,...attribution});
                for(const pair of attribution.restoreFaces)restores.set(pair.join(':'),pair);
                for(const mesh of attribution.affectedMeshes)affectedMeshes.add(mesh);
              }
            }finally{
              camera.projectionMatrix.copy(originalProjection);camera.projectionMatrixInverse.copy(originalProjection).invert();renderer.setClearColor(0xffffff,0);
            }
            entry.faceAttribution={restoreFaces:Array.from(restores.values()).sort((a,b)=>a[0]-b[0]||a[1]-b[1]),affectedMeshes:Array.from(affectedMeshes).sort((a,b)=>a-b),samplePasses};
          }
          modeReport.maxChangedPixels=Math.max(modeReport.maxChangedPixels,metrics.changedPixels);
          modeReport.maxSilhouetteChangedPixels=Math.max(modeReport.maxSilhouetteChangedPixels,metrics.silhouetteChangedPixels);
          modeReport.maxSurfaceColorChangedPixels=Math.max(modeReport.maxSurfaceColorChangedPixels,metrics.surfaceColorChangedPixels);
          modeReport.maxChannelDelta=Math.max(modeReport.maxChannelDelta,metrics.maxChannelDelta);
          if(!worst||metrics.changedPixels>worst.metrics.changedPixels||(metrics.changedPixels===worst.metrics.changedPixels&&metrics.exactDifferencePixels>worst.metrics.exactDifferencePixels)){
            worst={model:id,mode,name:view.name,metrics,before:beforePixels.slice(),after:afterPixels.slice()};modeReport.worstView=view.name;
          }
          progressEl.value=++progress;
          if(i%2===0)await yieldFrame();
        }
        publishAttribution(modelReport,faceEvidence,picking,beforeData);addView(worst);publish();await yieldFrame();
      }
      scene.remove(before.group,after.group);before.dispose();after.dispose();picking.dispose();renderer.renderLists.dispose();
    }
    report.status=results.every(m=>m.modes.every(mode=>mode.maxChangedPixels===0)&&(!fullCoverage||!m.restoreFaces.length))?'pass-no-pixel-changes-above-threshold':'review-required';
    report.completedAt=new Date().toISOString();
    const largest=storedViews.reduce((best,item,index)=>item.metrics.changedPixels>storedViews[best].metrics.changedPixels?index:best,0);selectEl.value=String(largest);showView(largest);
    statusEl.textContent=report.status==='pass-no-pixel-changes-above-threshold'?`审核完成：${results.length} 个模型 × ${viewpoints.length} 个视角 × 2 种样式，未发现超过 ${threshold}/255 阈值的像素变化。`:'审核完成：发现需要保留的可见面或像素差异，请检查报告及红色标记。';
  }finally{renderer.setRenderTarget(null);target.dispose();idTarget.dispose();environment.dispose();renderer.dispose();publish();}
}
main().catch(error=>{report.status='error';report.error=String(error.stack||error);statusEl.textContent=`审核失败：${error.message}`;publish();console.error(error);});
