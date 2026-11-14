import fs from 'node:fs';
import zlib from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as THREE from './solenoid-viewer/node_modules/three/build/three.module.js';
import { decodeCompactCad } from './solenoid-viewer/compact-cad.js';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'data/products/detail/hard-tube-fitting-cad-manifest.json')));
const supplemental = JSON.parse(fs.readFileSync(path.join(root, 'data/products/configurator/tubing-assembly-cad-imports.json')));
const drawings = JSON.parse(fs.readFileSync(path.join(root, 'data/products/detail/fitting-drawing-manifest.json'))).products['hard-tube-fittings'];
const pdfParts = JSON.parse(fs.readFileSync(path.join(root, 'data/products/configurator/tubing-assembly-vector-parts.json')));
const out = {};
// Only exact, allowlisted geometry is projected. No provisional thread substitutes.
const geometryIds = new Set([...Object.values(manifest.products).filter(p => {
  const key = p.model.split('-').slice(0,3).join('-');
  const drawing = drawings[p.model.toLowerCase()] || Object.values(drawings).find(d=>d.geometryKey===key);
  return !p.provisionalGeometry && !pdfParts[drawing?.url];
}).map(p => p.viewerId), ...Object.values(manifest.accessories).map(p => p.geometryId)]);
const urls = new Set([...geometryIds].map(id => manifest.geometries[id]?.model3dUrl));
urls.add(manifest.geometries[manifest.products['hfl6-u40-16-pk-n'].viewerId].model3dUrl);
for (const kit of JSON.parse(fs.readFileSync(path.join(root, 'data/products/configurator/tubing-assembly-ring-kits.json')))) urls.add(kit.cadUrl);
for (const [key, geometry] of Object.entries(supplemental)) {
  const drawing = Object.values(drawings).find(d => d.geometryKey === key);
  if (key.startsWith('HSF6-') || !pdfParts[drawing?.url]) urls.add(geometry.model3dUrl);
}
for (const url of urls) {
  if (!url) continue;
  const file = path.join(root, 'public', url), raw = fs.readFileSync(file);
  const data = decodeCompactCad(new Uint8Array(raw[0] === 31 ? zlib.gunzipSync(raw) : raw));
  const rotation = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(...(data.rotationEuler || [0, 0, 0])));
  const pairs = []; let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const mesh of data.meshes) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(mesh.attributes.position.array, 3));
    geometry.setIndex(mesh.index.array); geometry.applyMatrix4(rotation);
    const edges = new THREE.EdgesGeometry(geometry, 28).attributes.position;
    for (let i = 0; i < edges.count; i += 2) {
      const a = new THREE.Vector3().fromBufferAttribute(edges, i), b = new THREE.Vector3().fromBufferAttribute(edges, i + 1);
      const points = [[a.y, -a.x], [b.y, -b.x]];
      for (const [x,y] of points) { minX = Math.min(minX,x); maxX = Math.max(maxX,x); minY = Math.min(minY,y); maxY = Math.max(maxY,y); }
      pairs.push(points);
    }
    // Crease edges alone omit the side silhouettes of smooth cylindrical CAD
    // faces. Join coincident STEP face vertices, then retain front/back edges
    // for this orthographic view (Y along the tube, -X across it, Z depth).
    const positions=geometry.attributes.position, indices=geometry.index.array;
    const adjacency=new Map();
    const vertexKey=v=>[v.x,v.y,v.z].map(n=>Math.round(n*10000)).join(',');
    for(let i=0;i<indices.length;i+=3) {
      const points=[0,1,2].map(j=>new THREE.Vector3().fromBufferAttribute(positions,indices[i+j]));
      const normal=new THREE.Vector3().subVectors(points[1],points[0]).cross(new THREE.Vector3().subVectors(points[2],points[0])).normalize();
      if(!normal.lengthSq()) continue;
      for(let j=0;j<3;j++) {
        const a=points[j],b=points[(j+1)%3],key=[vertexKey(a),vertexKey(b)].sort().join('|');
        const edge=adjacency.get(key)||{a,b,front:false,back:false,tangent:false,count:0};
        edge.front ||= normal.z>1e-7; edge.back ||= normal.z< -1e-7;
        edge.tangent ||= Math.abs(normal.z)<=1e-7; edge.count++;
        adjacency.set(key,edge);
      }
    }
    for(const edge of adjacency.values()) if((edge.front&&edge.back)||edge.tangent||edge.count===1) {
      const points=[[edge.a.y,-edge.a.x],[edge.b.y,-edge.b.x]];
      for(const [x,y] of points) { minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y); }
      pairs.push(points);
    }
    geometry.dispose();
  }
  const round = n => Number(n.toFixed(4));
  const unique = new Map();
  for(const [a,b] of pairs) {
    if(Math.hypot(a[0]-b[0],a[1]-b[1])<.001) continue;
    const pa=[round(a[0]-minX),round(a[1]-minY)],pb=[round(b[0]-minX),round(b[1]-minY)];
    const key=[pa.join(','),pb.join(',')].sort().join('|');
    unique.set(key,[['M',...pa],['L',...pb]]);
  }
  out[url] = { width: maxX-minX, height:maxY-minY, axisY:(maxY-minY)/2, source:url, sourceKind:'exact-cad-projection', paths:[...unique.values()] };
}
fs.writeFileSync(path.join(root,'data/products/configurator/tubing-assembly-cad-vectors.json'),JSON.stringify(out));
console.log(`Projected ${Object.keys(out).length} approved CAD parts to native vector paths.`);
