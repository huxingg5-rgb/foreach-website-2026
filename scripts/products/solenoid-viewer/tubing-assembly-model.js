import * as THREE from 'three';
import {createAssemblyCadPart, createAssemblyTubeSurfaces} from './flanged-tubing-preview.js';

// The existing front preview scales every cross-section by 0.6. Undo that
// uniform scale for the interactive model so CAD and tube diameters use mm.
export const PREVIEW_TO_MM = 1 / .6;
export const DISPLAY_TUBE_LENGTH_MM = 88 * PREVIEW_TO_MM;
const setRole = (group, role, label, detail={}) => {
  group.name=label;group.userData={...group.userData,role,label,...detail};return group;
};
function annulus(outer,inner,length,color) {
  const shape=new THREE.Shape();shape.absarc(0,0,outer,0,Math.PI*2,false);
  const hole=new THREE.Path();hole.absarc(0,0,inner,0,Math.PI*2,true);shape.holes.push(hole);
  const geometry=new THREE.ExtrudeGeometry(shape,{depth:length,bevelEnabled:false,curveSegments:48});
  geometry.translate(0,0,-length/2);geometry.rotateY(Math.PI/2);
  return new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({color,roughness:.4,side:THREE.DoubleSide}));
}
export function disposeTubingAssembly(root) {
  root.traverse(object=>{object.geometry?.dispose();for(const material of Array.isArray(object.material)?object.material:[object.material])material?.dispose();});
}
/** Load only the selected exact files. A missing HSF leaves an actual gap. */
export async function createTubingAssemblyModel(config, loadGeometry) {
  const root=new THREE.Group();root.name='FOREACH 管组件';root.scale.setScalar(PREVIEW_TO_MM);
  root.userData={units:'millimeter',tubeModel:config.tubeModel,tubeOuterDiameter:config.outer,tubeInnerDiameter:config.inner,
    specifiedLength:config.length,specifiedTolerance:config.tolerance,displayTubeLength:DISPLAY_TUBE_LENGTH_MM,
    tubeLengthIsDiagrammatic:true,connectionA:config.a.connection,connectionB:config.mode==='double'?config.b.connection:'自由端'};
  const missing=[];
  const tube=setRole(createAssemblyTubeSurfaces({...config,b:config.b||{enabled:false}}),'tube',`${config.tubeMaterial} 管 · OD ${config.outer} × ID ${config.inner} mm`,{geometryKind:'parametric-tube',lengthIsDiagrammatic:true});
  tube.userData.flangeProfileIsDiagrammatic=tube.children.some(part=>part.name.endsWith('-tube-flange'));
  root.add(tube);
  try {
    for(const [side,end] of config.mode==='double'?[['a',config.a],['b',config.b]]:[['a',config.a]]) {
      const prefix=side.toUpperCase(), requests=[['body',end.cadUrl,end.fittingModel],['accessory',end.accessoryCadUrl,end.accessoryModel]];
      for(const [kind,url,model] of requests) {
        if(!url){missing.push({side,kind,model,label:`${prefix} 端 · ${model}（3D 待补充）`});continue;}
        const data=await loadGeometry(url);
        const finish=kind==='accessory'?{...end,material:end.accessoryMaterial||end.washer,color:end.accessoryColor||'本色'}:end;
        root.add(setRole(createAssemblyCadPart(data,finish,side,kind==='accessory'),`${side}-${kind}`,`${prefix} 端 · ${model}`,{model,source:url,geometryKind:'exact-cad',side,kind,material:finish.material,color:finish.color}));
      }
      if(end.stop!=='无') {
        const radius=config.outer/2*.6;
        const stop=end.stop==='O 型圈'
          ?new THREE.Mesh(new THREE.TorusGeometry(radius+.48*.6,.5*.6,16,64),new THREE.MeshStandardMaterial({color:0x292f36,roughness:.5}))
          :annulus(radius+.4*.6,radius+.06*.6,2.8*.6,0xd2dbe0);
        if(end.stop==='O 型圈')stop.rotation.y=Math.PI/2;
        stop.position.x=side==='a'?31:65;
        root.add(setRole(stop,`${side}-stop`,`${prefix} 侧 · ${end.stop}`,{side,geometryKind:'installation-reference',dimensionsNotSpecified:true}));
      }
    }
    for(const [side,enabled,x,text] of [['a',config.labelA,35,config.textA],['b',config.labelB,61,config.textB]])if(enabled) {
      const tag=annulus(config.outer/2*.6+.18*.6,config.outer/2*.6+.04*.6,5*.6,0xf8f8f3);tag.position.x=x;
      root.add(setRole(tag,`${side}-tag`,`${side.toUpperCase()} 侧管标：${text}`,{side,text,geometryKind:'installation-reference',dimensionsNotSpecified:true}));
    }
    root.updateMatrixWorld(true);return {root,missing};
  } catch(error){disposeTubingAssembly(root);throw error;}
}
/** GLB defines metres. Keep exact part dimensions, with shortened tube length
 * and the requested L stored explicitly in the exported root metadata. */
export function prepareTubingAssemblyExport(root) {
  const copy=root.clone(true);
  copy.traverse(object=>{object.visible=true;for(const child of [...object.children])if(child.isLineSegments)object.remove(child);});
  copy.scale.multiplyScalar(.001);copy.userData={...copy.userData,units:'meter',dimensionalMetadataUnits:'millimeter'};
  copy.updateMatrixWorld(true);return copy;
}
