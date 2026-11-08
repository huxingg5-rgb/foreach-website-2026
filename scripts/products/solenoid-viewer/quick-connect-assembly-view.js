import * as THREE from 'three';
import {createDimensions} from './dimensions.js';
import {alignQuickConnectAssembly,quickConnectEnvelope,quickConnectDimensionData} from './quick-connect-assembly.js';

const translations={
 zh:{views:'查看方式',assembly:'对接组合',male:'公端单件',female:'母端单件',dimensions:'外形尺寸',length:'长 L',width:'宽 W',height:'高 H',maleLabel:'公端',femaleLabel:'母端',reference:'尺寸为 3D 模型外包络参考值，工程安装以二维图纸为准。',unavailable:'暂无对应的组合 3D，当前显示单件。'},
 en:{views:'View',assembly:'Connected pair',male:'Male only',female:'Female only',dimensions:'Overall dimensions',length:'Length L',width:'Width W',height:'Height H',maleLabel:'Male',femaleLabel:'Female',reference:'Reference 3D envelope. Use the 2D drawing for installation dimensions.',unavailable:'Connected view unavailable. Showing one end.'},
 es:{views:'Vista',assembly:'Par conectado',male:'Solo macho',female:'Solo hembra',dimensions:'Dimensiones exteriores',length:'Largo L',width:'Ancho W',height:'Alto H',maleLabel:'Macho',femaleLabel:'Hembra',reference:'Envolvente 3D de referencia. Consulte el plano 2D para la instalación.',unavailable:'Vista conectada no disponible. Se muestra un extremo.'},
 fr:{views:'Affichage',assembly:'Paire raccordée',male:'Mâle seul',female:'Femelle seule',dimensions:'Dimensions hors tout',length:'Longueur L',width:'Largeur W',height:'Hauteur H',maleLabel:'Mâle',femaleLabel:'Femelle',reference:'Encombrement 3D indicatif. Utilisez le plan 2D pour le montage.',unavailable:'Vue raccordée indisponible. Un seul raccord est affiché.'},
 ko:{views:'보기 방식',assembly:'연결 조합',male:'수형 단품',female:'암형 단품',dimensions:'외형 치수',length:'길이 L',width:'너비 W',height:'높이 H',maleLabel:'수형',femaleLabel:'암형',reference:'3D 외형 참고 치수입니다. 설치 치수는 2D 도면을 확인하세요.',unavailable:'연결 조합을 표시할 수 없어 단품을 표시합니다.'},
 ru:{views:'Режим просмотра',assembly:'Соединённая пара',male:'Только штекер',female:'Только гнездо',dimensions:'Габаритные размеры',length:'Длина L',width:'Ширина W',height:'Высота H',maleLabel:'Штекер',femaleLabel:'Гнездо',reference:'Справочные габариты 3D. Монтажные размеры указаны на чертеже 2D.',unavailable:'Соединённая пара недоступна. Показана одна часть.'},
};

/** Resolve model roles independently of which end owns the product page. */
export function getQuickConnectViewState(base,mate,mode,canAssemble){
 const entries=[base,mate].filter(Boolean),male=entries.find(entry=>entry.product.gender==='P'),female=entries.find(entry=>entry.product.gender==='S');
 const fallback=base.product.gender==='P'?'male':'female';
 const activeMode=mode==='assembly'?canAssemble&&male&&female?'assembly':fallback:mode==='male'?male?'male':fallback:female?'female':fallback;
 return {male,female,activeMode,visible:activeMode==='assembly'?[male,female]:[activeMode==='male'?male:female]};
}

/** Shared connected-pair and single-end views for all quick-connect products. */
export function createQuickConnectAssemblyView({base,baseData,baseSolid,group,stage,camera,language,onViewChange}){
 const text=translations[language]||translations.en,host=stage.parentElement;
 const panel=document.createElement('aside');panel.className='fitting-selector quick-connect-selector';panel.setAttribute('aria-label',text.views);
 const title=document.createElement('h2');title.textContent=text.views;
 const choices=document.createElement('div');choices.className='fitting-choices';choices.setAttribute('role','radiogroup');choices.setAttribute('aria-label',text.views);
 const mobile=document.createElement('select');mobile.className='fitting-mobile-select';mobile.setAttribute('aria-label',text.views);
 const buttons=new Map();
 for(const id of ['assembly','male','female']){
  const button=document.createElement('button');button.type='button';button.setAttribute('role','radio');button.dataset.quickConnectView=id;
  const label=document.createElement('strong');label.textContent=text[id];button.append(label);button.onclick=()=>selectMode(id);choices.append(button);buttons.set(id,button);
  const option=document.createElement('option');option.value=id;option.textContent=text[id];mobile.append(option);
 }
 mobile.onchange=()=>selectMode(mobile.value);
 const detail=document.createElement('div');detail.className='fitting-selected-detail';
 const heading=document.createElement('h3'),models=document.createElement('div');models.className='quick-connect-selected-models';
 const metrics=document.createElement('dl'),values=new Map();
 for(const [axis,label]of [[0,text.length],[2,text.width],[1,text.height]]){
  const row=document.createElement('div'),key=document.createElement('dt'),value=document.createElement('dd');key.textContent=label;row.append(key,value);metrics.append(row);values.set(axis,value);
 }
 const reference=document.createElement('p');reference.className='quick-connect-dimension-reference';reference.textContent=text.reference;
 const status=document.createElement('p');status.className='quick-connect-assembly-status';status.setAttribute('role','status');status.hidden=true;
 detail.append(heading,models,metrics,reference,status);panel.append(title,choices,mobile,detail);host.append(panel);host.classList.add('has-quick-connect-selector');
 const dimensions=createDimensions(stage,camera,{axes:[0,2,1],axisLabels:{0:text.length,2:text.width,1:text.height},offset:28,minSpan:12,side:'bottom',verticalSide:'right',clampLabels:true});
 const baseEntry={product:base,data:baseData,solid:baseSolid};
 let mode='assembly',activeMode=base.gender==='P'?'male':'female',mate=null,alignment=null,singleSelection=false,box=quickConnectEnvelope(baseData,baseSolid);
 function refresh(){
  const state=getQuickConnectViewState(baseEntry,mate,mode,Boolean(alignment));activeMode=state.activeMode;
  baseSolid.visible=state.visible.includes(baseEntry);if(mate)mate.solid.visible=state.visible.includes(mate);
  box=new THREE.Box3();for(const entry of state.visible)box.union(quickConnectEnvelope(entry.data,entry.solid));
  for(const[id,button]of buttons){button.disabled=id==='assembly'?!alignment:!state[id];button.setAttribute('aria-checked',String(id===activeMode));}
  for(const option of mobile.options)option.disabled=buttons.get(option.value).disabled;mobile.value=activeMode;
  heading.textContent=`${text[activeMode]} · ${text.dimensions}`;
  models.replaceChildren();
  const addModel=(role,product)=>{const line=document.createElement('strong');line.textContent=`${role} · ${product.model}`;models.append(line);};
  for(const entry of state.visible)addModel(entry.product.gender==='P'?text.maleLabel:text.femaleLabel,entry.product);
  const size=box.getSize(new THREE.Vector3());for(const[axis,value]of values)value.textContent=size.getComponent(axis).toFixed(2)+' mm';
  dimensions.set(quickConnectDimensionData(box),group);stage.dataset.quickConnectViewMode=activeMode;
 }
 function selectMode(next){mode=next;refresh();onViewChange?.();}
 refresh();
 return {
  setMate(next,{singleOnly=false}={}){
   // Returning from an explicit single selection restores the connected view.
   if(singleOnly||singleSelection)mode='assembly';singleSelection=singleOnly;
   mate=next;alignment=mate?alignQuickConnectAssembly(base,baseData,baseSolid,mate.product,mate.data,mate.solid):null;
   status.hidden=Boolean(alignment)||singleOnly;status.textContent=status.hidden?'':text.unavailable;
   stage.dataset.quickConnectOverlapMm=alignment?alignment.overlapMm.toFixed(5):'';refresh();
  },
  getMode:()=>activeMode,
  getBounds(){group.updateWorldMatrix(true,false);return box.clone().applyMatrix4(group.matrixWorld);},
  update:()=>dimensions.update(),setDimensionsVisible:visible=>dimensions.setVisible(visible),
  dispose(){dimensions.dispose();panel.remove();host.classList.remove('has-quick-connect-selector');delete stage.dataset.quickConnectViewMode;delete stage.dataset.quickConnectOverlapMm;},
 };
}
