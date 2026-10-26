import {decodeCompactCad} from './compact-cad.js';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {photoMaterials} from './appearance.js';
import {rplMaterials} from './appearance-rpl.js';
import {diaphragmMaterials} from './appearance-diaphragm.js';
import {pistonMaterials} from './appearance-piston.js';
import {createDisplayEdges} from './edges-rpl.js';
import {createDimensions} from './dimensions.js';
import {applyModelPose,modelWithDisplayDimensions} from './model-pose.js';

const language=new URLSearchParams(location.search).get('lang')||'en';
const translations={
zh:['复位','自动旋转','适应窗口','操作帮助','全屏','模型结构','外形尺寸（不含电线）','观察视角','显示样式','等轴测|正视图|后视图|右视图|左视图|俯视图|仰视图','带边线|实体|线框','拖动旋转；滚轮或双指缩放。尺寸按模型测量，不含电线。','加载失败，点击重试','加载中…'],
en:['Reset','Auto rotate','Fit','Help','Fullscreen','Parts','Dimensions (excluding wires)','View','Display','Isometric|Front|Back|Right|Left|Top|Bottom','Edges|Solid|Wireframe','Drag to rotate; scroll or pinch to zoom. Model dimensions exclude wires.','Unable to load. Retry','Loading…'],
es:['Restablecer','Giro automático','Ajustar','Ayuda','Pantalla completa','Piezas','Cotas sin cables','Vista','Estilo','Isométrica|Frontal|Posterior|Derecha|Izquierda|Superior|Inferior','Aristas|Sólido|Alambre','Arrastre para girar; rueda o pellizco para ampliar. Cotas del modelo sin cables.','No se pudo cargar. Reintentar','Cargando…'],
fr:['Réinitialiser','Rotation automatique','Ajuster','Aide','Plein écran','Pièces','Dimensions hors câbles','Vue','Affichage','Isométrique|Face|Arrière|Droite|Gauche|Dessus|Dessous','Arêtes|Solide|Filaire','Glissez pour tourner ; molette ou pincement pour zoomer. Dimensions du modèle hors câbles.','Chargement impossible. Réessayer','Chargement…'],
ko:['초기화','자동 회전','화면 맞춤','도움말','전체 화면','부품','외형 치수 (전선 제외)','시점','표시','등각|정면|후면|우측|좌측|상단|하단','모서리|솔리드|와이어프레임','드래그하여 회전하고 휠 또는 두 손가락으로 확대합니다. 모델 치수는 전선을 제외합니다.','불러오기 실패. 다시 시도','불러오는 중…'],
ru:['Сброс','Автовращение','Вписать','Справка','Полный экран','Детали','Габариты без проводов','Вид','Отображение','Изометрия|Спереди|Сзади|Справа|Слева|Сверху|Снизу','Рёбра|Сплошной|Каркас','Перетаскивайте для вращения; колесо или щипок для масштаба. Размеры модели без проводов.','Не удалось загрузить. Повторить','Загрузка…']
};
const tr=translations[language]||translations.en,ui={retry:tr[12]};
const rplIds=['rpl-p4','rpl-p635','rpl-p15','drpl-0109'];
const diaphragmIds=['dpl30-db','dpl30-bb','dpl60-db','dpl60-bb','dpl30h-ds','dpl30h-bs','dpgl800-bs'];
const pistonIds=[...[50,100,250,500,1000,2500,5000,10000,20000].map(v=>'ea-'+v),...[50,100,250,500,1000].map(v=>'sm-'+v),...[50,100,250,500].map(v=>'tm-'+v)];
const isPiston=pistonIds.includes(new URLSearchParams(location.search).get('model'));
const isRpl=rplIds.includes(new URLSearchParams(location.search).get('model'));
// All embedded CAD families use the parent's shared PDF-style loader.
const usesParentLoader=parent!==window&&new URLSearchParams(location.search).get('loader')==='parent';
const isDiaphragm=diaphragmIds.includes(new URLSearchParams(location.search).get('model'));
const isPump=isRpl||isDiaphragm||isPiston;
if(isPump){
 const pumpInstructions={
  zh:['模型外形尺寸','拖动旋转；滚轮或双指缩放。尺寸按当前模型测量，安装尺寸请查看原始二维图纸。'],
  en:['Model envelope dimensions','Drag to rotate; scroll or pinch to zoom. Dimensions are measured from this model. Refer to the original drawing for mounting dimensions.'],
  es:['Dimensiones del modelo','Arrastre para girar; rueda o pellizco para ampliar. Las dimensiones se miden en este modelo. Consulte el plano original para las dimensiones de montaje.'],
  fr:['Dimensions du modèle','Glissez pour tourner ; molette ou pincement pour zoomer. Les dimensions sont mesurées sur ce modèle. Consultez le plan original pour les dimensions de montage.'],
  ko:['모델 외형 치수','드래그하여 회전하고 휠 또는 두 손가락으로 확대합니다. 치수는 이 모델 기준입니다. 설치 치수는 원본 2D 도면을 확인하세요.'],
  ru:['Габариты модели','Перетаскивайте для вращения; колесо или щипок для масштаба. Размеры измерены по этой модели. Монтажные размеры смотрите на исходном чертеже.'],
 };
 [tr[6],tr[11]]=pumpInstructions[language]||pumpInstructions.en;
 document.title=isDiaphragm||isPiston?'FOREACH '+new URLSearchParams(location.search).get('model').toUpperCase()+' · 3D':new URLSearchParams(location.search).get('model').startsWith('drpl-')?'FOREACH DRPL · 3D':'FOREACH RPL · 3D';
}
document.documentElement.lang=language;
['home','play','fit','help','full','tree','dimensions','views','display'].forEach((id,i)=>{const e=document.getElementById(id);e.title=tr[i];e.setAttribute('aria-label',tr[i]);});
['views','display'].forEach((id,i)=>tr[9+i].split('|').forEach((label,j)=>document.getElementById(id).options[j].textContent=label));
document.querySelector('#help-panel h2').textContent=tr[3];
document.querySelector('#tree-panel h2').textContent=tr[5];
document.querySelectorAll('#help-panel p').forEach(e=>e.remove());
const instruction=document.createElement('p');instruction.textContent=tr[11];document.getElementById('help-panel').append(instruction);
document.getElementById('help-close').setAttribute('aria-label',tr[3]);
const loadingLabels={zh:'3D 模型加载中',en:'Loading 3D model',es:'Cargando modelo 3D',fr:'Chargement du modèle 3D',ko:'3D 모델 로딩 중',ru:'Загрузка 3D-модели'};
document.getElementById('loading-label').textContent=loadingLabels[language]||loadingLabels.en;
if(usesParentLoader && parent!==window)document.getElementById('loading').hidden=true;

async function start() {
const params=new URLSearchParams(location.search), id=params.get('model');
const allowed=['base-2nc','base-2no','base-3','threaded-2nc','threaded-2no','threaded-3','barbed-3',...rplIds,...diaphragmIds,...pistonIds];
if(!allowed.includes(id))throw new Error('Unknown model');
const response=await fetch(isPiston?'/models/products/pumps/piston-pumps/cad/'+id+(params.get('head')==='peek'?'-peek':'')+'.fcad.gz':isDiaphragm?'/models/products/pumps/diaphragm-pumps/cad/'+id+'.fcad.gz':isRpl?'/models/products/pumps/valveless-pumps/'+id+'.fcad.gz':'./'+id+'.fcad.gz', usesParentLoader && params.has('retry') ? {cache:'reload'} : undefined);
if(!response.ok)throw new Error('Model unavailable');
// Files carry gzip themselves; also accept hosts that already decoded the body.
const bytes=new Uint8Array(await response.arrayBuffer());
const raw=bytes[0]===0x1f&&bytes[1]===0x8b?new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer()):bytes;
const models=[decodeCompactCad(raw)];

const $=id=>document.getElementById(id);
const icons={home:'<path d="m3 11 9-8 9 8M6 9v12h5v-7h3v7h4V9"/>',play:'<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z"/>',fit:'<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6M7 10h6M10 7v6"/>',view:'<rect x="3" y="4" width="18" height="13" rx="1"/><path d="M8 21h8m-4-4v4"/>',cube:'<path d="m12 2 9 5v10l-9 5-9-5V7zm0 10 9-5m-9 5L3 7m9 5v10"/>',section:'<path d="M4 5h16v14H4zM8 2v20M12 6l-3 3m7-3-7 7m10-6L9 17m10-6-8 8m8-4-4 4"/>',full:'<path d="M3 9V3h6m6 0h6v6m0 6v6h-6M9 21H3v-6"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9 8a3 3 0 0 1 6 0c0 3-3 2-3 5m0 3v1"/>',tree:'<path d="M4 3v16h5M4 8h5M10 5h10v6H10zm0 11h10v6H10z"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>'};
for(const el of document.querySelectorAll('[data-icon]'))el.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true">'+icons[el.dataset.icon]+'</svg>';
const stage=$('stage'),scene=new THREE.Scene();scene.background=new THREE.Color(0xffffff);
const camera=new THREE.OrthographicCamera(-50,50,50,-50,0.01,10000);
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,preserveDrawingBuffer:false});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.localClippingEnabled=true;renderer.setClearColor(0xffffff);stage.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-label',tr[7]+' 3D');
if(isPump){const studio=new RoomEnvironment(),pmrem=new THREE.PMREMGenerator(renderer);scene.environment=pmrem.fromScene(studio,.04).texture;studio.dispose();pmrem.dispose();renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1;}
scene.add(new THREE.HemisphereLight(0xffffff,0xb7b9bd,2.0));
for(const [pos,intensity] of [[[100,150,200],1.8],[[-120,40,-80],1.0],[[40,-150,70],.8]]){const l=new THREE.DirectionalLight(0xffffff,intensity);l.position.set(...pos);scene.add(l);}
// A soft, off-axis camera fill keeps downward-facing surfaces readable while rotating.
const viewFill=new THREE.DirectionalLight(0xffffff,1.6);
viewFill.position.set(-1,1,2);viewFill.target.position.set(0,0,-1);
camera.add(viewFill,viewFill.target);scene.add(camera);
const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.dampingFactor=.09;controls.autoRotateSpeed=1.6;controls.minZoom=.15;controls.maxZoom=12;
const dimensions=createDimensions(stage,camera);
$('dimensions').onclick=()=>{const on=dimensions.toggle();$('dimensions').classList.toggle('active',on);$('dimensions').setAttribute('aria-pressed',String(on));};
const group=new THREE.Group();scene.add(group);let materials=[],edges=[],parts=[],modelIndex=0,radius=50,display='edges',clipOn=false,clippingAxis='x',bounds;
const plane=new THREE.Plane(new THREE.Vector3(-1,0,0),0);
function resize(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h);const aspect=w/h;camera.left=-radius*aspect;camera.right=radius*aspect;camera.top=radius;camera.bottom=-radius;camera.updateProjectionMatrix();}
new ResizeObserver(resize).observe(stage);
function pose(v){camera.up.set(0,1,0);if(v==='top')camera.up.set(0,0,-1);const dirs={iso:[1,.65,1],front:[0,0,1],back:[0,0,-1],right:[1,0,0],left:[-1,0,0],top:[0,1,0],bottom:[0,-1,0]};camera.position.copy(new THREE.Vector3(...(dirs[v]||dirs.iso)).normalize().multiplyScalar(radius*5));controls.target.set(0,0,0);camera.zoom=1;camera.updateProjectionMatrix();controls.update();
 if(v==='top'||v==='bottom'){
  camera.updateMatrixWorld();const b=new THREE.Box3().setFromObject(group,isDiaphragm);
  const corners=Array.from({length:8},(_,i)=>new THREE.Vector3(i&1?b.max.x:b.min.x,i&2?b.max.y:b.min.y,i&4?b.max.z:b.min.z).project(camera));
  const span=axis=>Math.max(...corners.map(p=>p[axis]))-Math.min(...corners.map(p=>p[axis]));
  // Leave room for the dimension extensions around the projected end face.
  camera.zoom=THREE.MathUtils.clamp(Math.min(1.25/span('x'),1.25/span('y')),controls.minZoom,controls.maxZoom);camera.updateProjectionMatrix();
 }
 $('views').value=v;}
function fit(){const b=new THREE.Box3().setFromObject(group,isDiaphragm);if(b.isEmpty())return;const s=b.getSize(new THREE.Vector3());const aspect=stage.clientWidth/stage.clientHeight;radius=Math.max(s.length()*(isPiston?.62:isDiaphragm?.58:isPump?.49:.62),s.length()*.55/Math.max(.5,aspect));resize();pose('iso');}
function disposal(){group.traverse(o=>{o.geometry?.dispose();if(o.material){for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose();}});group.clear();materials=[];edges=[];parts=[];}
function load(index){disposal();group.position.set(0,0,0);controls.autoRotate=false;$('play').classList.remove('active');$('play').setAttribute('aria-pressed','false');modelIndex=index;const data=modelWithDisplayDimensions(models[index]);const solid=new THREE.Group();applyModelPose(data,solid);group.add(solid);
 const exteriorOptimized=Boolean(data.exteriorOptimized);
 // Exterior meshes omit hidden contact surfaces and must remain assembled.
 $('tree').hidden=exteriorOptimized;if(exteriorOptimized){$('tree-panel').hidden=true;$('tree').classList.remove('active');}
 const wireOption=document.querySelector('#display option[value="wire"]');wireOption.disabled=exteriorOptimized;wireOption.hidden=exteriorOptimized;
 if(exteriorOptimized&&display==='wire'){display='edges';$('display').value='edges';}
 $('section').hidden=Boolean(data.exteriorOnly);document.querySelector('#display option[value="transparent"]').disabled=Boolean(data.exteriorOnly);if(data.exteriorOnly){clipOn=false;$('section-panel').hidden=true;if(display==='transparent'){display='edges';$('display').value='edges';}}
 const isPlate=data.name.startsWith('SV10-P-')||Boolean(data.appearance?.barbed);let topZ=-Infinity;for(const s of data.meshes)for(let j=2;j<s.attributes.position.array.length;j+=3)topZ=Math.max(topZ,s.attributes.position.array[j]);const baseZ=data.appearance?.baseZ??(isPlate?0:topZ-30.9);
 data.meshes.forEach((src,i)=>{const edgePatch=data.exteriorOptimized?.edgeReconstruction?.[i];if(!src.index.array.length&&!edgePatch)return;const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(src.attributes.position.array,3));if(src.attributes.normal)g.setAttribute('normal',new THREE.Float32BufferAttribute(src.attributes.normal.array,3));g.setIndex(src.index.array);if(!src.attributes.normal)g.computeVertexNormals();
 const m=!src.index.array.length?[]:data.appearance?.piston?pistonMaterials(src,g,data.name,i,new URLSearchParams(location.search).get('head')==='peek'?'peek':'pmma'):data.appearance?.diaphragm?diaphragmMaterials(src,g,data.name,i):data.appearance?.rpl?rplMaterials(src,g):photoMaterials(src,g,baseZ,isPlate);materials.push(...m);const mesh=src.index.array.length?new THREE.Mesh(g,m):new THREE.Group();solid.add(mesh);parts[i]=mesh;
 const edge=new THREE.LineSegments(createDisplayEdges(g,edgePatch),new THREE.LineBasicMaterial({color:0x64655f,transparent:true,opacity:.28}));mesh.add(edge);edges.push(edge);if(!src.index.array.length)g.dispose();
 });
 const box=new THREE.Box3().setFromObject(group,isDiaphragm);group.position.sub(box.getCenter(new THREE.Vector3()));bounds=new THREE.Box3().setFromObject(group,isDiaphragm);dimensions.set(data,solid);$('models').value=String(index);$('drawing').alt=data.name+' 原始二维图纸';
 $('tree-content').replaceChildren();const head=document.createElement('div');head.className='tree-root';head.textContent=data.root.children?.[0]?.name||data.name;$('tree-content').append(head);
 if(!exteriorOptimized)data.meshes.forEach((p,i)=>{if(!parts[i])return;const label=document.createElement('label');label.className='part';const cb=document.createElement('input');cb.type='checkbox';cb.checked=true;cb.setAttribute('aria-label',tr[5]+' '+(i+1));cb.onchange=()=>{parts[i].visible=cb.checked;};const span=document.createElement('span');span.textContent=p.name||tr[5]+' '+(i+1);label.append(cb,span);$('tree-content').append(label);});
 $('status').textContent=data.name;$('section-range').value=50;updateClip();applyDisplay();fit();}
function applyDisplay(){materials.forEach(m=>{m.wireframe=display==='wire';m.transparent=display==='transparent';m.opacity=display==='transparent'?.28:1;m.depthWrite=display!=='transparent';m.needsUpdate=true;});edges.forEach(e=>e.visible=display==='edges'||display==='transparent');}
function updateClip(){plane.normal.set(clippingAxis==='x'?-1:0,clippingAxis==='y'?-1:0,clippingAxis==='z'?-1:0);if(bounds)plane.constant=THREE.MathUtils.lerp(bounds.min[clippingAxis],bounds.max[clippingAxis],Number($('section-range').value)/100);materials.forEach(m=>{m.clippingPlanes=clipOn?[plane]:[];m.needsUpdate=true;});edges.forEach(e=>{e.material.clippingPlanes=clipOn?[plane]:[];e.material.needsUpdate=true;});}
models.forEach((m,i)=>{const o=document.createElement('option');o.value=i;o.textContent=m.name;$('models').append(o);});
$('models').onchange=e=>load(Number(e.target.value));$('home').onclick=()=>{controls.autoRotate=false;$('play').classList.remove('active');clipOn=false;$('section').classList.remove('active');$('section-panel').hidden=true;parts.forEach(p=>p.visible=true);document.querySelectorAll('.part input').forEach(c=>c.checked=true);updateClip();fit();};
$('fit').onclick=fit;$('views').onchange=e=>pose(e.target.value);$('play').onclick=()=>{controls.autoRotate=!controls.autoRotate;$('play').classList.toggle('active',controls.autoRotate);$('play').setAttribute('aria-pressed',String(controls.autoRotate));};
$('display').onchange=e=>{display=e.target.value;applyDisplay();};
function toggle(panel,button){$(panel).hidden=!$(panel).hidden;$(button).classList.toggle('active',!$(panel).hidden);}
$('tree').onclick=()=>toggle('tree-panel','tree');$('help').onclick=()=>toggle('help-panel','help');$('help-close').onclick=()=>toggle('help-panel','help');
$('section').onclick=()=>{clipOn=!clipOn;$('section-panel').hidden=!clipOn;$('section').classList.toggle('active',clipOn);updateClip();};$('section-range').oninput=updateClip;$('section-axis').onchange=e=>{clippingAxis=e.target.value;updateClip();};
$('full').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await $('viewer').requestFullscreen();}catch{$('viewer').classList.toggle('expanded');resize();}};
function mode(is3d){$('stage').hidden=!is3d;$('drawing-wrap').hidden=is3d;$('tools').hidden=!is3d;$('side-tools').hidden=!is3d;$('tab3d').classList.toggle('selected',is3d);$('tab2d').classList.toggle('selected',!is3d);$('tab3d').setAttribute('aria-selected',String(is3d));$('tab2d').setAttribute('aria-selected',String(!is3d));if(!is3d){$('tree-panel').hidden=true;$('tree').classList.remove('active');$('section-panel').hidden=true;$('help-panel').hidden=true;}else if(clipOn)$('section-panel').hidden=false;resize();}
$('tab3d').onclick=()=>mode(true);$('tab2d').onclick=()=>mode(false);
window.addEventListener('keydown',e=>{if(e.target.matches('select,input'))return;if(e.key==='Home')$('home').click();if(e.key==='Escape'){['tree-panel','help-panel'].forEach(id=>$(id).hidden=true);['tree','help'].forEach(id=>$(id).classList.remove('active'));}});
load(0);
let active=true, visible=true;
let announcedRender=false;
function frame(){controls.update();renderer.render(scene,camera);dimensions.update();if(!announcedRender){announcedRender=true;document.getElementById('loading').hidden=true;document.getElementById('loading').setAttribute('aria-busy','false');if(usesParentLoader)parent.postMessage({type:'cad-rendered'},location.origin);}}
function activity(){renderer.setAnimationLoop(active && visible && !document.hidden ? frame : null);if(active)resize();}
window.addEventListener('message',e=>{if(e.origin===location.origin && e.source===parent && e.data?.type==='solenoid-active'){active=Boolean(e.data.active);activity();if(usesParentLoader&&announcedRender)parent.postMessage({type:'cad-rendered'},location.origin);}});
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;activity();}).observe(stage);
document.addEventListener('visibilitychange',activity);
renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();renderer.setAnimationLoop(null);fail();});
parent.postMessage({type:'solenoid-ready'},location.origin);
activity();
}
function fail(){if(usesParentLoader)parent.postMessage({type:'cad-error'},location.origin);const el=document.getElementById('loading');el.hidden=false;el.setAttribute('aria-busy','false');el.replaceChildren();const button=document.createElement('button');button.textContent=ui.retry;button.onclick=()=>location.reload();el.append(button);}
start().catch(fail);
