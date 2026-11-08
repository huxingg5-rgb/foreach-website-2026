import * as THREE from 'three';
import manifest from '../../../data/products/detail/quick-connect-fitting-cad-manifest.json';
import pilot from '../../../data/products/detail/quick-connect-pilot-preview.json';
import {decodeCompactCad} from './compact-cad.js';
import {createDimensions} from './dimensions.js';
import {quickConnectMaterials,quickConnectDisplayEdges} from './appearance-quick-connect.js';
import {createQuickConnectAssemblyView} from './quick-connect-assembly-view.js';
import {getQuickConnectAssemblyReference} from './quick-connect-assembly.js';

const copy={
 zh:{male:'公端',female:'母端',drawing:'选择公母端图纸',unavailable:'暂无对应 3D'},
 en:{male:'Male',female:'Female',drawing:'Select mating-end drawing',unavailable:'3D unavailable'},
 es:{male:'Macho',female:'Hembra',drawing:'Seleccionar plano del acoplamiento',unavailable:'Modelo 3D no disponible'},
 fr:{male:'Mâle',female:'Femelle',drawing:'Choisir le plan du raccord',unavailable:'Modèle 3D indisponible'},
 ko:{male:'수형',female:'암형',drawing:'연결부 도면 선택',unavailable:'3D 모델 없음'},
 ru:{male:'Штекер',female:'Гнездо',drawing:'Выбор чертежа соединителя',unavailable:'3D-модель недоступна'},
};
export const getQuickConnectCopy=language=>copy[language]||copy.en;
export const isQuickConnectPilot=product=>product?.model===pilot.baseModel;
export function getQuickConnectGeometryUrl(product,base){
 return (isQuickConnectPilot(base)&&pilot.geometries[product.viewerId]?.model3dUrl)||manifest.geometries[product.viewerId].model3dUrl;
}
const cache=new Map();
export function getQuickConnectProduct(params){
 const product=manifest.products[params.get('product')];
 return product?.viewerId===params.get('model')?product:Object.values(manifest.products).find(p=>p.viewerId===params.get('model'));
}
export async function loadQuickConnectMate(params,requested){
 const base=getQuickConnectProduct(params);if(!base)return null;
 const slug=requested??params.get('mate')??base.defaultMateSlug;
 if(!slug||slug==='none')return null;
 const product=manifest.products[slug];
 if(!product||product.series!==base.series||product.gender===base.gender)return {unavailable:true,model:slug.toUpperCase()};
 if(!cache.has(product.viewerId))cache.set(product.viewerId,(async()=>{
  const response=await fetch(getQuickConnectGeometryUrl(product,base));
  if(!response.ok)throw Error('Mating model unavailable');
  const bytes=new Uint8Array(await response.arrayBuffer());
  const raw=bytes[0]===0x1f&&bytes[1]===0x8b?new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer()):bytes;
  return decodeCompactCad(raw);
 })().catch(error=>{cache.delete(product.viewerId);throw error;}));
 return {product,data:await cache.get(product.viewerId)};
}

/** Male is always on the left, female on the right, on the exact CAD axis. */
export function orientQuickConnectProduct(data,solid,product,preview=false){
 const reference=getQuickConnectAssemblyReference(product);
 const axis=new THREE.Vector3();axis.setComponent(reference?.axis??data.mating.axis,reference?.sign??data.mating.sign);
 solid.quaternion.setFromUnitVectors(axis,new THREE.Vector3(product.gender==='P'?1:-1,0,0));
 // Use the actual release hardware to put every female button above the axis.
 if(reference?.releaseDirection){
  const up=new THREE.Vector3(...reference.releaseDirection).applyQuaternion(solid.quaternion);
  solid.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),-Math.atan2(up.z,up.y)));
 }else if(preview&&product.gender==='S')solid.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),Math.PI/2));
 const mouth=new THREE.Vector3(...(reference?.mouthCenter||data.mating.center)).applyQuaternion(solid.quaternion);
 solid.position.copy(mouth).multiplyScalar(-1);
 solid.position.x+=product.gender==='P'?-1.5:1.5;
 solid.userData.quickConnectModel=product.model;
 solid.userData.quickConnectGender=product.gender;
}

export function createQuickConnectPair({base,baseData,baseSolid,selected,group,materials,edges,parts,stage,camera,language,review=false,onViewChange}){
 const preview=isQuickConnectPilot(base);
 let mate=null,dimension=null,label=null,visible=true;
 const labelHost=review?stage.parentElement:stage;
 const baseLabel=document.createElement('div');baseLabel.className='fitting-part-label';labelHost.append(baseLabel);
 const labelFor=(element,product)=>{
  const text=getQuickConnectCopy(language),role=product.gender==='P'?text.male:text.female;
  element.textContent=`${role} · ${product.model} · ${product.housingMaterial}/${product.sealMaterial}`;
  element.dataset.quickConnectRole=product.gender;element.dataset.model=product.model;element.dataset.housingMaterial=product.housingMaterial;
 };
 labelFor(baseLabel,base);
 const extraMaterials=[],extraEdges=[],extraParts=[];
 const assemblyView=review?createQuickConnectAssemblyView({base,baseData,baseSolid,group,stage,camera,language,onViewChange}):null;
 const remove=(list,values)=>{for(const value of values){const i=list.indexOf(value);if(i>=0)list.splice(i,1);}values.length=0;};
 function clear(){
  dimension?.dispose();dimension=null;label?.remove();label=null;
  if(mate){mate.traverse(o=>{o.geometry?.dispose();if(o.material)for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose();});group.remove(mate);mate=null;}
  remove(materials,extraMaterials);remove(edges,extraEdges);remove(parts,extraParts);
 }
 function setSelection(selection){
  clear();
  if(!selection||selection.unavailable){
   assemblyView?.setMate(null,{singleOnly:!selection});
   if(selection?.unavailable){label=document.createElement('div');label.className='fitting-part-label';label.textContent=selection.model+' · '+getQuickConnectCopy(language).unavailable;labelHost.append(label);}
   stage.dataset.quickConnectMate='';delete stage.dataset.quickConnectGapMm;return;
  }
  const {product,data}=selection;mate=new THREE.Group();orientQuickConnectProduct(data,mate,product,preview);group.add(mate);
  for(const [i,src] of data.meshes.entries()){
   const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(src.attributes.position.array,3));
   if(src.attributes.normal)g.setAttribute('normal',new THREE.Float32BufferAttribute(src.attributes.normal.array,3));
   g.setIndex(src.index.array);if(!src.attributes.normal)g.computeVertexNormals();
   const mats=quickConnectMaterials(src,g,product,data,preview);materials.push(...mats);extraMaterials.push(...mats);
   const mesh=new THREE.Mesh(g,mats);mesh.userData.partName=`${product.model} · ${i+1}`;mate.add(mesh);parts.push(mesh);extraParts.push(mesh);
   const edge=new THREE.LineSegments(quickConnectDisplayEdges(src,g,preview),new THREE.LineBasicMaterial({color:0x64655f,transparent:true,opacity:preview?.42:.28}));mesh.add(edge);edges.push(edge);extraEdges.push(edge);
  }
  if(assemblyView)assemblyView.setMate({product,data,solid:mate});
  else{dimension=createDimensions(stage,camera,{side:'top',axes:[data.mating.axis],offset:24});dimension.set(data,mate);dimension.setVisible(visible);}
  label=document.createElement('div');label.className='fitting-part-label';labelFor(label,product);labelHost.append(label);
  stage.dataset.quickConnectMate=product.model;
  if(assemblyView)delete stage.dataset.quickConnectGapMm;else stage.dataset.quickConnectGapMm='3';
 }
 function position(element){
  if(!element)return;
  const gender=element.dataset.quickConnectRole||(base.gender==='P'?'S':'P');
  const view=assemblyView?.getMode();
  element.hidden=Boolean(view&&view!=='assembly'&&gender!==(view==='male'?'P':'S'));
  element.style.left=review?`${stage.offsetLeft+stage.clientWidth*(view&&view!=='assembly'?.5:gender==='P'?.25:.75)}px`:gender==='P'?'25%':'75%';element.style.top=`${labelHost.clientHeight-35}px`;
  element.style.width=review?`${stage.clientWidth*.46}px`:'46%';element.style.whiteSpace='normal';element.style.textAlign='center';
 }

 if(review)stage.dataset.quickConnectReview='true';
 stage.dataset.quickConnectBase=base.model;
 setSelection(selected);
 return {setSelection,getBounds:()=>assemblyView?.getBounds(),update(){dimension?.update();assemblyView?.update();position(baseLabel,baseSolid);position(label,mate);},setDimensionsVisible(next){visible=next;dimension?.setVisible(next);assemblyView?.setDimensionsVisible(next);},dispose(){clear();assemblyView?.dispose();baseLabel.remove();delete stage.dataset.quickConnectReview;}};
}
