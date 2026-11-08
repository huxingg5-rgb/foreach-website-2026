import manifest from '../../../data/products/detail/quick-connect-fitting-cad-manifest.json';
import regions from '../../../data/products/detail/quick-connect-material-regions.json';

// CAD face numbers are meaningful only for the exact source and mesh topology.
// Original and display tessellations share these BREP face numbers.
export function getQuickConnectMaterialRoles(src,product,data){
 const entry=regions.geometries[product.viewerId];
 if(!entry||entry.sourceSha256!==manifest.geometries[product.viewerId]?.sourceSha256)return null;
 const mesh=entry.meshes[data.meshes.indexOf(src)];
 if(!mesh||mesh.faceCount!==src.brep_faces?.length)return null;
 const roles=new Array(mesh.faceCount).fill(mesh.complete?0:undefined);
 for(const [faces,role]of [[mesh.bodyFaces??[],0],[mesh.sealFaces??[],1],[mesh.steelFaces??[],2]]){
  for(const face of faces){
   if(!Number.isInteger(face)||face<0||face>=roles.length)return null;
   roles[face]=role;
  }
 }
 return roles;
}
