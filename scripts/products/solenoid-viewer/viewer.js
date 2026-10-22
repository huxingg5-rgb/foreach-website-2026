import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {photoMaterials} from './appearance.js';
import {createDimensions} from './dimensions.js';

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
document.documentElement.lang=language;
['home','play','fit','help','full','tree','dimensions','views','display'].forEach((id,i)=>{const e=document.getElementById(id);e.title=tr[i];e.setAttribute('aria-label',tr[i]);});
['views','display'].forEach((id,i)=>tr[9+i].split('|').forEach((label,j)=>document.getElementById(id).options[j].textContent=label));
document.querySelector('#help-panel h2').textContent=tr[3];
document.querySelector('#tree-panel h2').textContent=tr[5];
document.querySelectorAll('#help-panel p').forEach(e=>e.remove());
const instruction=document.createElement('p');instruction.textContent=tr[11];document.getElementById('help-panel').append(instruction);
document.getElementById('help-close').setAttribute('aria-label',tr[3]);
document.getElementById('loading').textContent=tr[13];

async function start() {
const params=new URLSearchParams(location.search), id=params.get('model');
const allowed=['base-2nc','base-2no','base-3','threaded-2nc','threaded-2no','threaded-3','barbed-3'];
if(!allowed.includes(id))throw new Error('Unknown model');
const response=await fetch('./'+id+'.json');
if(!response.ok)throw new Error('Model unavailable');
const models=[await response.json()];

const $=id=>document.getElementById(id);
const icons={home:'<path d="m3 11 9-8 9 8M6 9v12h5v-7h3v7h4V9"/>',play:'<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z"/>',fit:'<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6M7 10h6M10 7v6"/>',view:'<rect x="3" y="4" width="18" height="13" rx="1"/><path d="M8 21h8m-4-4v4"/>',cube:'<path d="m12 2 9 5v10l-9 5-9-5V7zm0 10 9-5m-9 5L3 7m9 5v10"/>',section:'<path d="M4 5h16v14H4zM8 2v20M12 6l-3 3m7-3-7 7m10-6L9 17m10-6-8 8m8-4-4 4"/>',full:'<path d="M3 9V3h6m6 0h6v6m0 6v6h-6M9 21H3v-6"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9 8a3 3 0 0 1 6 0c0 3-3 2-3 5m0 3v1"/>',tree:'<path d="M4 3v16h5M4 8h5M10 5h10v6H10zm0 11h10v6H10z"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>'};
for(const el of document.querySelectorAll('[data-icon]'))el.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true">'+icons[el.dataset.icon]+'</svg>';
const stage=$('stage'),scene=new THREE.Scene();scene.background=new THREE.Color(0xffffff);
const camera=new THREE.OrthographicCamera(-50,50,50,-50,0.01,10000);
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,preserveDrawingBuffer:false});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.localClippingEnabled=true;renderer.setClearColor(0xffffff);stage.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-label',tr[7]+' 3D');
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
  camera.updateMatrixWorld();const b=new THREE.Box3().setFromObject(group);
  const corners=Array.from({length:8},(_,i)=>new THREE.Vector3(i&1?b.max.x:b.min.x,i&2?b.max.y:b.min.y,i&4?b.max.z:b.min.z).project(camera));
  const span=axis=>Math.max(...corners.map(p=>p[axis]))-Math.min(...corners.map(p=>p[axis]));
  // Leave room for the dimension extensions around the projected end face.
  camera.zoom=THREE.MathUtils.clamp(Math.min(1.25/span('x'),1.25/span('y')),controls.minZoom,controls.maxZoom);camera.updateProjectionMatrix();
 }
 $('views').value=v;}
function fit(){const b=new THREE.Box3().setFromObject(group);if(b.isEmpty())return;const s=b.getSize(new THREE.Vector3());const aspect=stage.clientWidth/stage.clientHeight;radius=Math.max(s.length()*.62,s.length()*.55/Math.max(.5,aspect));resize();pose('iso');}
function disposal(){group.traverse(o=>{o.geometry?.dispose();if(o.material){for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose();}});group.clear();materials=[];edges=[];parts=[];}
function load(index){disposal();group.position.set(0,0,0);controls.autoRotate=false;$('play').classList.remove('active');$('play').setAttribute('aria-pressed','false');modelIndex=index;const data=models[index];const solid=new THREE.Group();solid.rotation.x=Math.PI/2;group.add(solid);
 $('section').hidden=Boolean(data.exteriorOnly);document.querySelector('#display option[value="transparent"]').disabled=Boolean(data.exteriorOnly);if(data.exteriorOnly){clipOn=false;$('section-panel').hidden=true;if(display==='transparent'){display='edges';$('display').value='edges';}}
 const isPlate=data.name.startsWith('SV10-P-')||Boolean(data.appearance?.barbed);let topZ=-Infinity;for(const s of data.meshes)for(let j=2;j<s.attributes.position.array.length;j+=3)topZ=Math.max(topZ,s.attributes.position.array[j]);const baseZ=data.appearance?.baseZ??(isPlate?0:topZ-30.9);
 data.meshes.forEach((src,i)=>{const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(src.attributes.position.array,3));if(src.attributes.normal)g.setAttribute('normal',new THREE.Float32BufferAttribute(src.attributes.normal.array,3));g.setIndex(src.index.array);if(!src.attributes.normal)g.computeVertexNormals();
 const m=photoMaterials(src,g,baseZ,isPlate);materials.push(...m);const mesh=new THREE.Mesh(g,m);solid.add(mesh);parts.push(mesh);
 const edge=new THREE.LineSegments(new THREE.EdgesGeometry(g,26),new THREE.LineBasicMaterial({color:0x64655f,transparent:true,opacity:.28}));mesh.add(edge);edges.push(edge);
 });
 const box=new THREE.Box3().setFromObject(group);group.position.sub(box.getCenter(new THREE.Vector3()));bounds=new THREE.Box3().setFromObject(group);dimensions.set(data,solid);$('models').value=String(index);$('drawing').alt=data.name+' 原始二维图纸';
 $('tree-content').replaceChildren();const head=document.createElement('div');head.className='tree-root';head.textContent=data.root.children?.[0]?.name||data.name;$('tree-content').append(head);
 data.meshes.forEach((p,i)=>{const label=document.createElement('label');label.className='part';const cb=document.createElement('input');cb.type='checkbox';cb.checked=true;cb.setAttribute('aria-label',tr[5]+' '+(i+1));cb.onchange=()=>{parts[i].visible=cb.checked;};const span=document.createElement('span');span.textContent=p.name||tr[5]+' '+(i+1);label.append(cb,span);$('tree-content').append(label);});
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
document.getElementById('loading').hidden=true;
let active=true, visible=true;
function frame(){controls.update();renderer.render(scene,camera);dimensions.update();}
function activity(){renderer.setAnimationLoop(active && visible && !document.hidden ? frame : null);if(active)resize();}
window.addEventListener('message',e=>{if(e.origin===location.origin && e.source===parent && e.data?.type==='solenoid-active'){active=Boolean(e.data.active);activity();}});
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;activity();}).observe(stage);
document.addEventListener('visibilitychange',activity);
renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();renderer.setAnimationLoop(null);fail();});
parent.postMessage({type:'solenoid-ready'},location.origin);
activity();
}
function fail(){const el=document.getElementById('loading');el.hidden=false;el.replaceChildren();const button=document.createElement('button');button.textContent=ui.retry;button.onclick=()=>location.reload();el.append(button);}
start().catch(fail);
