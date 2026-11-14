import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {GLTFExporter} from 'three/addons/exporters/GLTFExporter.js';
import {decodeCompactCad} from './compact-cad.js';
import {createDimensions} from './dimensions.js';
import icons from 'shared-cad-icons';
import {tubingAssembly3dConfig} from '../../../data/products/configurator/tubing-assembly-3d.ts';
import {createTubingAssemblyModel,disposeTubingAssembly,prepareTubingAssemblyExport} from './tubing-assembly-model.js';

const $=id=>document.getElementById(id),viewer=$('viewer'),stage=$('stage');
const cache=new Map(),clipPlane=new THREE.Plane(new THREE.Vector3(0,0,-1),0);
let renderer,scene,camera,controls,root,overlay,config,key='',missing=[],mode='assembly',bounds=new THREE.Box3();
let generation=0,active=true,section=false,sectionAxis='x',dimensions=true,frame=0,pending=false;
const post=(type,extra={})=>parent!==window&&parent.postMessage({type,key,...extra},location.origin);
const node=(tag,text,className)=>{const e=document.createElement(tag);if(text)e.textContent=text;if(className)e.className=className;return e;};
const pressed=(id,value)=>{$(id).classList.toggle('active',value);$(id).setAttribute('aria-pressed',String(value));};
const lengthLabel=()=>`L = ${config.length||'待填写'} mm${config.tolerance?` ±${config.tolerance} mm`:''}`;
async function load(url){
  if(!cache.has(url))cache.set(url,(async()=>{
    const response=await fetch(`${url}?v=tubing-3d-1`);if(!response.ok)throw Error(`CAD load ${response.status}`);
    const bytes=new Uint8Array(await response.arrayBuffer());
    const raw=bytes[0]===31?new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer()):bytes;
    return decodeCompactCad(raw);
  })().catch(error=>{cache.delete(url);throw error;}));return cache.get(url);
}
function render(){if(renderer&&active&&!document.hidden){renderer.render(scene,camera);overlay?.update();}}
function resume(){cancelAnimationFrame(frame);frame=0;render();if(active&&controls.autoRotate&&!document.hidden)frame=requestAnimationFrame(animate);}
function animate(){frame=0;if(!active||document.hidden||!controls.autoRotate)return;controls.update();render();frame=requestAnimationFrame(animate);}
function fit(reset=false){
  if(!root||bounds.isEmpty())return;
  const center=bounds.getCenter(new THREE.Vector3()),size=bounds.getSize(new THREE.Vector3());
  const directions={iso:new THREE.Vector3(15,11,34),front:new THREE.Vector3(0,0,1),back:new THREE.Vector3(0,0,-1),right:new THREE.Vector3(1,0,.0001),left:new THREE.Vector3(-1,0,.0001),top:new THREE.Vector3(0,1,.0001),bottom:new THREE.Vector3(0,-1,.0001)};
  const direction=reset?directions[$('views').value]||directions.iso:camera.position.clone().sub(controls.target);
  controls.target.copy(center);camera.position.copy(center).add(direction.normalize().multiplyScalar(Math.max(150,size.length()*3)));camera.lookAt(center);camera.updateMatrixWorld();
  const projected=new THREE.Box3();for(let i=0;i<8;i++)projected.expandByPoint(new THREE.Vector3(i&1?bounds.max.x:bounds.min.x,i&2?bounds.max.y:bounds.min.y,i&4?bounds.max.z:bounds.min.z).applyMatrix4(camera.matrixWorldInverse));
  const span=projected.getSize(new THREE.Vector3()),aspect=Math.max(.2,stage.clientWidth/Math.max(1,stage.clientHeight));
  const h=Math.max(span.y,span.x/aspect,3)*1.5;
  camera.top=h/2;camera.bottom=-h/2;camera.left=-h*aspect/2;camera.right=h*aspect/2;camera.zoom=1;camera.updateProjectionMatrix();controls.update();render();
}
function partBounds(object){return new THREE.Box3().setFromObject(object,true);}
function setDimensions(){
  overlay?.dispose();if(!root)return;
  const body=root.children.find(c=>c.userData.role===`${mode}-body`&&c.visible);
  if((mode==='a'||mode==='b')&&!body)return;
  const box=body?partBounds(body):bounds;
  if(box.isEmpty())return;
  overlay=createDimensions(stage,camera,{axes:body?[0,1,2]:[0],axisLabels:body?{0:'L',1:'W',2:'H'}:{0:'L'},offset:30,minSpan:10,clampLabels:true});
  overlay.set({dimensions:{min:box.min.toArray(),max:box.max.toArray(),size:box.getSize(new THREE.Vector3()).toArray(),axes:[[1,0,0],[0,1,0],[0,0,1]]}},scene);
  if(!body)stage.querySelector('.dimension-label').textContent=lengthLabel();
  overlay.setVisible(dimensions);
}
function tree(){
  const list=$('tree-content');list.replaceChildren();if(!root)return;
  for(const part of root.children){const row=node('label','','part'),input=node('input');input.type='checkbox';input.checked=part.visible;input.setAttribute('aria-label',part.name);
    input.addEventListener('change',()=>{part.visible=input.checked;updateBounds();setDimensions();render();});row.append(input,node('span',part.name));list.append(row);}
}
function updateBounds(){bounds.makeEmpty();for(const part of root.children)if(part.visible)bounds.union(partBounds(part));}
function updateSidebar(){
  const labels={assembly:'整套管组件',a:'A 端接头与配件',tube:'管材',b:'B 端接头与配件'};
  $('detail-heading').textContent=labels[mode];
  const selected=$('selected-models');selected.replaceChildren();
  const parts=root.children.filter(c=>c.visible&&c.userData.geometryKind==='exact-cad');
  for(const part of parts)selected.append(node('strong',part.name));
  const table=$('measurements');table.replaceChildren();
  const add=(label,value)=>{const row=node('div');row.append(node('dt',label),node('dd',value));table.append(row);};
  const body=root.children.find(c=>c.userData.role===`${mode}-body`&&c.visible);
  if(body){const size=partBounds(body).getSize(new THREE.Vector3());for(const [label,v]of [['长 L',size.x],['宽 W',size.z],['高 H',size.y]])add(label,`${Number(v.toFixed(3))} mm`);}
  else if(mode==='a'||mode==='b')add('接头模型',root.children.some(c=>c.userData.role===`${mode}-body`)?'已隐藏':'待补充');
  else {add('管外径 OD',`${config.outer} mm`);add('管内径 ID',`${config.inner} mm`);add('成品长度 L',config.length?`${config.length} ±${config.tolerance} mm`:'待填写');}
  const meta=$('model-meta');meta.replaceChildren();meta.append(node('p',`${config.tubeMaterial} · ${config.tubeColor}`));
  meta.append(node('p','管子直线展示，长度按 L 标注；接头、配套件及管径保持实际尺寸比例。'));
  if(root.children.some(c=>c.userData.dimensionsNotSpecified))meta.append(node('p','限位件与管标未指定尺寸，外形和安装位置为示意。'));
  if(root.children.some(c=>c.userData.flangeProfileIsDiagrammatic))meta.append(node('p','管端翻边成型轮廓为示意，管身内外径按所选规格生成。'));
  const legend=$('legend');legend.replaceChildren();legend.append(node('strong',lengthLabel()),node('div',`${config.tubeMaterial} · OD ${config.outer} × ID ${config.inner} mm（${config.tubeColor}）`));
  for(const part of missing){const p=node('p',part.label);p.dataset.missing='true';legend.append(p);}
  const unavailable=missing.filter(p=>p.side===mode&&p.kind==='body');$('missing-view').hidden=!unavailable.length;$('missing-view').textContent=unavailable.map(p=>p.label).join('；');
  tree();
}
function choose(next){
  if(!root)return;mode=next;
  for(const part of root.children)part.visible=next==='assembly'||(next==='tube'?part.userData.role==='tube':part.userData.side===next);
  for(const button of $('choices').querySelectorAll('button'))button.setAttribute('aria-checked',String(button.dataset.mode===mode));
  $('mobile-choice').value=mode;updateBounds();setDimensions();updateSidebar();fit(true);updateClip();
  viewer.dataset.viewMode=mode;
}
function selectors(){
  const choices=$('choices'),select=$('mobile-choice');choices.replaceChildren();select.replaceChildren();
  for(const [value,label]of [['assembly','整套管组件'],['a','A 端接头与配件'],['tube','管材'],...(config.mode==='double'?[['b','B 端接头与配件']]:[])]){
    const button=node('button');button.type='button';button.dataset.mode=value;button.setAttribute('role','radio');button.setAttribute('aria-checked',String(mode===value));button.append(node('strong',label));button.addEventListener('click',()=>choose(value));choices.append(button);
    const option=node('option',label);option.value=value;select.append(option);
  }select.value=mode;
}
function updateClip(){
  clipPlane.normal.set(sectionAxis==='x'?-1:0,sectionAxis==='y'?-1:0,sectionAxis==='z'?-1:0);
  if(!bounds.isEmpty())clipPlane.constant=THREE.MathUtils.lerp(bounds.min[sectionAxis],bounds.max[sectionAxis],Number($('section-range').value)/100);
  root?.traverse(object=>{if(object.material)for(const material of Array.isArray(object.material)?object.material:[object.material]){material.clippingPlanes=section?[clipPlane]:[];material.needsUpdate=true;}});render();
}
function display(){
  const style=$('display').value;
  root?.traverse(object=>{
    if(object.isMesh){
      const material=object.material;object.userData.nativeAppearance??={transparent:material.transparent,opacity:material.opacity,depthWrite:material.depthWrite};
      material.wireframe=style==='wire';material.transparent=style==='transparent'||object.userData.nativeAppearance.transparent;
      material.opacity=style==='transparent'?.28:object.userData.nativeAppearance.opacity;material.depthWrite=style==='transparent'?false:object.userData.nativeAppearance.depthWrite;material.needsUpdate=true;
      let edge=object.children.find(c=>c.name==='viewer-edges');
      if(!edge){edge=new THREE.LineSegments(new THREE.EdgesGeometry(object.geometry,32),new THREE.LineBasicMaterial({color:'#48515c',transparent:true,opacity:.2}));edge.name='viewer-edges';object.add(edge);}
      edge.visible=style==='edges'||style==='transparent';edge.material.clippingPlanes=section?[clipPlane]:[];
    }
  });viewer.dataset.display=style;render();
}
async function select(payload){
  const nextKey=payload.key;
  if(nextKey===key&&root&&!pending){post('tubing-3d-rendered',{missing,canExport:missing.length===0&&Number(config.length)>0});return;}
  const token=++generation;key=nextKey;pending=true;$('busy').hidden=false;$('retry').hidden=true;viewer.dataset.status='loading';
  try {
    const next=tubingAssembly3dConfig(payload.choice),model=await createTubingAssemblyModel(next,load);
    if(token!==generation){disposeTubingAssembly(model.root);return;}
    if(root){scene.remove(root);disposeTubingAssembly(root);}root=model.root;missing=model.missing;config=next;scene.add(root);
    mode='assembly';selectors();choose(mode);display();pending=false;$('busy').hidden=true;viewer.dataset.status='ready';
    viewer.dataset.units='millimeter';viewer.dataset.tubeOuter=String(config.outer);viewer.dataset.tubeInner=String(config.inner);
    post('tubing-3d-rendered',{missing,canExport:missing.length===0&&Number(config.length)>0});
  }catch(error){if(token===generation){pending=false;console.error(error);viewer.dataset.status='error';$('busy-label').textContent='管组件 3D 加载失败，请重试';$('retry').hidden=false;post('tubing-3d-error');}}
}
async function download(){
  if(!root||pending||missing.length||!(Number(config.length)>0)){post('tubing-3d-export-error');return;}
  try {
    const output=prepareTubingAssemblyExport(root);output.traverse(object=>{if(object.isMesh){object.material=object.material.clone();const original=object.userData.nativeAppearance;if(original)Object.assign(object.material,original);object.material.wireframe=false;object.material.clippingPlanes=[];}});
    const bytes=await new GLTFExporter().parseAsync(output,{binary:true,onlyVisible:false});
    output.traverse(object=>{if(object.isMesh)object.material.dispose();});
    parent.postMessage({type:'tubing-3d-exported',key,bytes},location.origin,[bytes]);
  }catch(error){console.error(error);post('tubing-3d-export-error');}
}
function init(){
  $('dimensions').setAttribute('aria-label','外形尺寸');$('dimensions').title='外形尺寸';
  for(const element of document.querySelectorAll('[data-icon]'))element.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true">${icons[element.dataset.icon]}</svg>`;
  renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));renderer.setClearColor('#fff');renderer.localClippingEnabled=true;renderer.toneMapping=THREE.NeutralToneMapping;
  stage.append(renderer.domElement);scene=new THREE.Scene();const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment();scene.environment=pmrem.fromScene(room,.04).texture;room.dispose();pmrem.dispose();
  scene.add(new THREE.HemisphereLight('#fff','#9aa5b1',.8));const light=new THREE.DirectionalLight('#fff',1.6);light.position.set(-12,25,30);scene.add(light);
  camera=new THREE.OrthographicCamera(-50,50,30,-30,.01,5000);camera.position.set(15,11,100);controls=new OrbitControls(camera,renderer.domElement);controls.minZoom=.25;controls.maxZoom=16;controls.enableDamping=false;controls.autoRotateSpeed=1.2;controls.addEventListener('change',render);
  new ResizeObserver(()=>{if(!stage.clientWidth||!stage.clientHeight)return;renderer.setSize(stage.clientWidth,stage.clientHeight,false);fit();}).observe(stage);
  const panel=(id,button)=>{$(id).hidden=!$(id).hidden;pressed(button,!$(id).hidden);};
  $('mobile-choice').addEventListener('change',event=>choose(event.target.value));$('views').addEventListener('change',()=>fit(true));$('fit').addEventListener('click',()=>fit());
  $('home').addEventListener('click',()=>{$('views').value='iso';controls.autoRotate=false;pressed('play',false);section=false;pressed('section',false);$('section-panel').hidden=true;choose('assembly');resume();});
  $('play').addEventListener('click',()=>{controls.autoRotate=!controls.autoRotate;pressed('play',controls.autoRotate);resume();});
  $('dimensions').addEventListener('click',()=>{dimensions=!dimensions;overlay?.setVisible(dimensions);pressed('dimensions',dimensions);render();});pressed('dimensions',dimensions);
  $('section').addEventListener('click',()=>{section=!section;pressed('section',section);$('section-panel').hidden=!section;updateClip();});
  $('section-axis').addEventListener('change',event=>{sectionAxis=event.target.value;updateClip();});$('section-range').addEventListener('input',updateClip);$('display').addEventListener('change',display);
  $('tree').addEventListener('click',()=>panel('tree-panel','tree'));$('help').addEventListener('click',()=>panel('help-panel','help'));$('help-close').addEventListener('click',()=>panel('help-panel','help'));
  $('full').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await viewer.requestFullscreen();}catch{viewer.classList.toggle('expanded');fit();}});
  $('retry').addEventListener('click',()=>location.reload());document.addEventListener('visibilitychange',resume);
  document.addEventListener('keydown',event=>{if(event.key==='Home'&&!/INPUT|SELECT|TEXTAREA/.test(event.target.tagName)){event.preventDefault();$('home').click();}});
  renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();post('tubing-3d-error');});
  window.addEventListener('message',event=>{if(event.origin!==location.origin||event.source!==parent)return;
    if(event.data?.type==='tubing-3d-selection'){active=Boolean(event.data.active);void select(event.data);resume();}
    if(event.data?.type==='tubing-3d-export'&&event.data.key===key)void download();
  });post('tubing-3d-ready');
}
try{init();}catch(error){console.error(error);post('tubing-3d-error');}
