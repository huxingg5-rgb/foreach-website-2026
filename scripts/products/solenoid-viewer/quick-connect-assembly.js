import * as THREE from 'three';
import references from '../../../data/products/detail/quick-connect-assembly-references.json';
import manifest from '../../../data/products/detail/quick-connect-fitting-cad-manifest.json';

export function getQuickConnectAssemblyReference(product){
 const reference=references.geometries[product?.viewerId],geometry=manifest.geometries[product?.viewerId];
 const published=manifest.products[product?.model?.toLowerCase()];
 return reference&&geometry&&published?.viewerId===product.viewerId&&reference.sourceSha256===geometry.sourceSha256&&reference.gender===product.gender&&reference.series===product.series?reference:null;
}

/** Align the release plate within the male retention groove, not the tips. */
export function alignQuickConnectAssembly(base,baseData,baseSolid,product,data,solid){
 if(base.series!==product.series||base.gender===product.gender)return null;
 const baseReference=getQuickConnectAssemblyReference(base),mateReference=getQuickConnectAssemblyReference(product);
 if(!baseReference||!mateReference)return null;
 const point=(reference,object)=>new THREE.Vector3(...reference.center).applyQuaternion(object.quaternion).add(object.position);
 // Keep the selected product fixed, including when it is the female end.
 solid.position.add(point(baseReference,baseSolid).sub(point(mateReference,solid)));solid.updateMatrix();
 const mouth=(model,reference,object)=>new THREE.Vector3(...(reference.mouthCenter||model.mating.center)).applyQuaternion(object.quaternion).add(object.position);
 const baseMouth=mouth(baseData,baseReference,baseSolid),mateMouth=mouth(data,mateReference,solid);
 const male=base.gender==='P'?baseReference:mateReference,female=base.gender==='S'?baseReference:mateReference;
 return {overlapMm:(baseMouth.x-mateMouth.x)*(base.gender==='P'?1:-1),clearanceMm:(male.grooveWidthMm-female.thicknessMm)/2};
}

/** Exact source bounding boxes in the common assembly frame (X=L, Z=W, Y=H). */
export function quickConnectEnvelope(data,solid){
 solid.updateMatrix();const box=new THREE.Box3();
 for(let i=0;i<8;i++){
  const p=new THREE.Vector3();data.dimensions.axes.forEach((axis,k)=>p.addScaledVector(new THREE.Vector3(...axis),i&(1<<k)?data.dimensions.max[k]:data.dimensions.min[k]));
  box.expandByPoint(p.applyMatrix4(solid.matrix));
 }
 return box;
}
export function quickConnectDimensionData(box){
 return {dimensions:{min:box.min.toArray(),max:box.max.toArray(),size:box.getSize(new THREE.Vector3()).toArray(),axes:[[1,0,0],[0,1,0],[0,0,1]]}};
}
