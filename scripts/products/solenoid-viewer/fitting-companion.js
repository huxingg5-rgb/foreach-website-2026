import * as THREE from 'three';
import manifest from '../../../data/products/detail/hard-tube-fitting-cad-manifest.json';
import {decodeCompactCad} from './compact-cad.js';
import {applyModelPose} from './model-pose.js';
import {fittingMaterials,updateFittingMaterial} from './appearance-fitting.js';
import {createDisplayEdges} from './edges-rpl.js';
import {createDimensions} from './dimensions.js';
import {createFittingBoreDimension} from './fitting-bore-dimension.js';

const geometryCache=new Map();

export function getFittingCatalog(params) {
  const id=params.get('model'), slug=params.get('product');
  const product=slug && Object.hasOwn(manifest.products,slug)
    ? manifest.products[slug] : Object.values(manifest.products).find(p=>p.viewerId===id);
  return product?.viewerId===id?{...product,options:product.accessoryCodes.map(code=>({code,...manifest.accessories[code]}))}:null;
}

export async function loadFittingCompanion(params,choice=params.get('accessory')) {
  const product=getFittingCatalog(params);
  if(!product || choice==='none') return null;
  const code=product.accessoryCodes.includes(choice)?choice:product.defaultAccessoryCode;
  const accessory=manifest.accessories[code];
  if(!geometryCache.has(accessory.geometryId)){
    const request=(async()=>{
      const response=await fetch(manifest.geometries[accessory.geometryId].model3dUrl,params.has('retry')?{cache:'reload'}:undefined);
      if(!response.ok) throw Error('Accessory model unavailable');
      const bytes=new Uint8Array(await response.arrayBuffer());
      const raw=bytes[0]===0x1f&&bytes[1]===0x8b?new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer()):bytes;
      return decodeCompactCad(raw);
    })().catch(error=>{geometryCache.delete(accessory.geometryId);throw error;});
    geometryCache.set(accessory.geometryId,request);
  }
  return {code,data:await geometryCache.get(accessory.geometryId),...accessory,geometry:manifest.geometries[accessory.geometryId],productModel:product.model};
}

export function orientFittingBody(id,solid) {
  // HN6 exports already have the grip above the thread after their CAD pose.
  // HN and both flat-bottom exports need the opposite display orientation.
  if(!id.startsWith('ferrule-hn6-')) solid.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),Math.PI));
  // Grip at the left, threaded opening at the right (+X).
  solid.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),Math.PI/2));
}

export function orientFittingCompanion(object) {
  // The upright ferrule's tip points down; turn it toward the fitting (-X).
  object.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),-Math.PI/2));
}

export function positionFittingCompanion(main,object) {
  // Measure in the shared group's coordinates, keeping its current centering.
  main.updateWorldMatrix(true,true);object.updateWorldMatrix(true,true);
  const bodyBox=new THREE.Box3().setFromObject(main), accessoryBox=new THREE.Box3().setFromObject(object);
  if(main.parent)bodyBox.applyMatrix4(new THREE.Matrix4().copy(main.parent.matrixWorld).invert());
  const center=bodyBox.getCenter(new THREE.Vector3()), accessoryCenter=accessoryBox.getCenter(new THREE.Vector3());
  // One fixed display gap for every compatible ferrule/washer, in CAD millimetres.
  const gap=4;
  object.position.set(bodyBox.max.x+gap-accessoryBox.min.x,center.y-accessoryCenter.y,center.z-accessoryCenter.z);
  object.userData.gapMillimeters=gap;
}

export function addFittingCompanion(asset,main,group,materials,edges,parts,stage,camera) {
  if(!asset) return null;
  const object=new THREE.Group(),ownMaterials=[],ownEdges=[];applyModelPose(asset.data,object);orientFittingCompanion(object);
  for(const src of asset.data.meshes) {
    const geometry=new THREE.BufferGeometry();
    geometry.setAttribute('position',new THREE.Float32BufferAttribute(src.attributes.position.array,3));
    if(src.attributes.normal) geometry.setAttribute('normal',new THREE.Float32BufferAttribute(src.attributes.normal.array,3));
    geometry.setIndex(src.index.array);if(!src.attributes.normal)geometry.computeVertexNormals();
    const finish=fittingMaterials(src,geometry,asset.finish);materials.push(...finish);ownMaterials.push(...finish);
    const mesh=new THREE.Mesh(geometry,finish);object.add(mesh);
    const edge=new THREE.LineSegments(createDisplayEdges(geometry),new THREE.LineBasicMaterial({color:0x64655f,transparent:true,opacity:.28}));mesh.add(edge);edges.push(edge);ownEdges.push(edge);
  }
  positionFittingCompanion(main,object);
  object.userData.partName=asset.model;group.add(object);parts.push(object);
  const outerNames={zh:'外径',en:'OD',es:'DE',fr:'DE',ko:'외경',ru:'Наруж. Ø'};
  const lang=new URLSearchParams(location.search).get('lang');
  const diameterLabel=`${outerNames[lang]||outerNames.en}${lang==='ru'?'':' Ø'}`;
  const dimensions=createDimensions(stage,camera,{axes:[0,asset.kind==='washer'?1:2],side:'top',verticalSide:'right',offset:24,minSpan:2,diameterAxis:0,diameterLabel});
  dimensions.set(asset.data,object);
  const boreDimension=createFittingBoreDimension(stage,camera,asset,object);
  const labels=[[main,asset.productModel]].map(([target,text])=>{
    const element=document.createElement('span');element.className='fitting-part-label';element.textContent=text;stage.append(element);
    return {target,element};
  });
  let dimensionsVisible=true;
  return {geometryId:asset.geometryId,setFinish(next){ownMaterials.forEach(material=>updateFittingMaterial(material,next.finish));object.userData.partName=next.model;object.visible=true;},setDimensionsVisible(visible){dimensionsVisible=visible;},update(){
    dimensions.setVisible(dimensionsVisible&&object.visible);dimensions.update();
    boreDimension?.setVisible(dimensionsVisible&&object.visible);boreDimension?.update();
    const w=stage.clientWidth,h=stage.clientHeight;
    for(const {target,element} of labels){
      element.hidden=!target.visible;
      const box=new THREE.Box3().setFromObject(target), points=Array.from({length:8},(_,i)=>new THREE.Vector3(i&1?box.max.x:box.min.x,i&2?box.max.y:box.min.y,i&4?box.max.z:box.min.z).project(camera));
      const x=points.reduce((sum,p)=>sum+p.x,0)/8, bottom=Math.min(...points.map(p=>p.y));
      element.style.left=THREE.MathUtils.clamp((x+1)*w/2,85,w-85)+'px';
      element.style.top=Math.min(h-26,(1-bottom)*h/2+70)+'px';
    }
  },dispose(){
    dimensions.dispose();boreDimension?.dispose();labels.forEach(({element})=>element.remove());group.remove(object);
    for(const [registry,items] of [[materials,ownMaterials],[edges,ownEdges],[parts,[object]]])for(const item of items){const index=registry.indexOf(item);if(index>=0)registry.splice(index,1);}
    object.traverse(part=>{part.geometry?.dispose();if(part.material)for(const material of Array.isArray(part.material)?part.material:[part.material])material.dispose();});
  }};
}
