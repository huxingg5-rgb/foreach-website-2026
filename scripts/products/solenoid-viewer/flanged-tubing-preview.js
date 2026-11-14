import * as THREE from 'three';
import { decodeCompactCad } from './compact-cad.js';
import { orientFittingBody } from './fitting-companion.js';
import { assemblyMaterialAppearance } from '../../../data/products/configurator/tubing-assembly-appearance';

// Render the selected catalog part's CAD; vector drawings use a separate renderer.
const DISPLAY_SCALE = .6;
const cadCache = new Map();
async function sourceCad(url) {
  if (!cadCache.has(url)) {
    const request = (async () => {
      const response = await fetch(url);
      if (!response.ok) throw new Error('CAD image source unavailable');
      const bytes = new Uint8Array(await response.arrayBuffer());
      const raw = bytes[0] === 31 && bytes[1] === 139
        ? new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer()) : bytes;
      return decodeCompactCad(raw);
    })();
    cadCache.set(url, request);
    void request.catch(() => cadCache.delete(url));
  }
  return cadCache.get(url);
}

function freeObject(group) {
  group.traverse(item => {
    item.geometry?.dispose();
    const materials = Array.isArray(item.material) ? item.material : [item.material];
    materials.forEach(material => material?.dispose());
  });
}

function ring(outer, inner, thickness, color, metalness = 0) {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outer, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, inner, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: false, curveSegments: 48 });
  geometry.translate(0, 0, -thickness / 2);
  geometry.rotateY(Math.PI / 2);
  return new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color, roughness: metalness ? .25 : .36, metalness, side: THREE.DoubleSide }));
}

export function createAssemblyCadPart(data, end, side, accessory = false) {
  const group = new THREE.Group();
  const original = new THREE.Group();
  for (const source of data.meshes) {
    // A retaining-ring kit has two actual parts, not one selected finish:
    // its SUS sleeve and natural PEEK seal retain their source materials.
    const appearance = assemblyMaterialAppearance(source.appearance?.material || end.material, source.appearance?.color || end.color);
    const material = { color: appearance.color, metalness: appearance.metalness, roughness: appearance.roughness, side: THREE.DoubleSide };
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(source.attributes.position.array, 3));
    if (source.attributes.normal) geometry.setAttribute('normal', new THREE.Float32BufferAttribute(source.attributes.normal.array, 3));
    geometry.setIndex(source.index.array);
    if (!source.attributes.normal) geometry.computeVertexNormals();
    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial(material));
    mesh.name = source.name || "";
    original.add(mesh);
  }
  if (data.rotationEuler) original.rotation.set(...data.rotationEuler);
  const center = new THREE.Box3().setFromObject(original).getCenter(new THREE.Vector3());
  original.position.x -= center.x; original.position.z -= center.z;
  group.add(original);
  // Reuse the detail viewer's verified grip/thread pose, including the HN6
  // export's opposite source direction. A faces left; B faces right.
  if (accessory) group.rotation.z = side === 'a' ? Math.PI / 2 : -Math.PI / 2;
  else {
    const viewerId = (end.cadUrl || '').split('/').pop().replace(/\.fcad\.gz$/, '');
    orientFittingBody(viewerId, group);
    if (side === 'a') group.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI));
  }
  group.scale.setScalar(DISPLAY_SCALE);
  const box = new THREE.Box3().setFromObject(group);
  group.position.x = accessory ? (side === 'a' ? 6.5 : 89.5) - (box.min.x + box.max.x) / 2 : side === 'a' ? 10 - box.min.x : 86 - box.max.x;
  return group;
}

/** Tube wall, bore and formed flanges share one selected tube finish. */
export function createAssemblyTubeSurfaces(config) {
  const group = new THREE.Group(), radius = config.outer / 2 * DISPLAY_SCALE, innerRadius = config.inner / 2 * DISPLAY_SCALE;
  const appearance = assemblyMaterialAppearance(config.tubeMaterial, config.tubeColor);
  const tube = ring(radius, innerRadius, 88, appearance.color);
  tube.material.metalness = appearance.metalness; tube.material.roughness = appearance.roughness;
  tube.material.transparent = appearance.transparent; tube.material.opacity = appearance.opacity;
  tube.name = 'assembly-tube-body'; tube.position.x = 48; group.add(tube);
  const boreMaterial = tube.material.clone(); boreMaterial.side = THREE.BackSide;
  const inner = new THREE.Mesh(new THREE.CylinderGeometry(innerRadius, innerRadius, 88, 48, 1, true), boreMaterial);
  inner.name = 'assembly-tube-bore'; inner.rotation.z = Math.PI / 2; inner.position.x = 48; group.add(inner);
  for (const [side, end] of config.mode === 'double' ? [['a',config.a],['b',config.b]] : [['a',config.a]]) {
    if (end.enabled === false || (end.connection && end.connection !== '翻边')) continue;
    const flange = ring(radius + .8 * DISPLAY_SCALE, innerRadius, .45 * DISPLAY_SCALE, appearance.color);
    flange.material.dispose(); flange.material = tube.material.clone();
    flange.name = `${side}-tube-flange`; flange.position.x = side === 'a' ? 4 : 92; group.add(flange);
  }
  return group;
}

export function createFlangedAssemblyRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(1);
  renderer.setSize(2040, 425, false);
  renderer.setClearColor(0xffffff, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xffffff, 0x788995, 2.1));
  const key = new THREE.DirectionalLight(0xffffff, 2.9); key.position.set(-25, 40, 60); scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 1.1); fill.position.set(35, -15, 30); scene.add(fill);
  const camera = new THREE.OrthographicCamera(-48, 48, 10, -10, .1, 300);
  camera.position.set(48, 0, 100); camera.lookAt(48, 0, 0);
  let assembly = null, sequence = 0, disposed = false;

  async function render(config) {
    const request = ++sequence;
    const ends = (config.mode === 'double' ? [['a', config.a], ['b', config.b]] : [['a', config.a]]).filter(([, end]) => end.enabled !== false);
    const sources = await Promise.all(ends.map(async ([, end]) => ({
      body: end.cadUrl ? await sourceCad(end.cadUrl).catch(() => null) : null,
      accessory: end.accessoryCadUrl ? await sourceCad(end.accessoryCadUrl).catch(() => null) : null,
    })));
    if (disposed || sequence !== request) return;
    const group = new THREE.Group();
    const radius = config.outer / 2 * DISPLAY_SCALE;
    // Parametric tube and optional accessories show their role and location;
    // their display lengths/flange profiles are not manufacturing dimensions.
    // Scale every cross-section and accessory together, including bores, so
    // washers, stops and labels stay in proportion to the smaller fittings.
    // A single uninterrupted tube spans both ends; there is no middle break.
    group.add(createAssemblyTubeSurfaces(config));
    for (let index = 0; index < ends.length; index++) {
      const [side, end] = ends[index], a = side === 'a';
      if (sources[index].body) group.add(createAssemblyCadPart(sources[index].body, end, side));
      if (end.connection === '翻边' || !end.connection) {
        if (!end.fittingModel) {
          const washer = ring(Math.max(radius + .7 * DISPLAY_SCALE, 2.3 * DISPLAY_SCALE), radius + .15 * DISPLAY_SCALE, (end.washer === 'SUS' ? .8 : .9) * DISPLAY_SCALE, end.washer === 'SUS' ? 0xb7c3cc : 0xb9a174, end.washer === 'SUS' ? .68 : 0);
          washer.position.x = a ? 6.5 : 89.5; group.add(washer);
        }
      }
      if (sources[index].accessory) group.add(createAssemblyCadPart(sources[index].accessory, { ...end, material: end.washer, color: end.accessoryColor || '本色' }, side, true));
      if (end.stop !== '无') {
        const stop = end.stop === 'O 型圈'
          ? new THREE.Mesh(new THREE.TorusGeometry(radius + .48 * DISPLAY_SCALE, .5 * DISPLAY_SCALE, 16, 64), new THREE.MeshStandardMaterial({ color: 0x292f36, roughness: .5 }))
          : ring(radius + .4 * DISPLAY_SCALE, radius + .06 * DISPLAY_SCALE, 2.8 * DISPLAY_SCALE, 0xd2dbe0);
        if (end.stop === 'O 型圈') stop.rotation.y = Math.PI / 2;
        stop.position.x = a ? 31 : 65; group.add(stop);
      }
    }
    for (const [enabled, x] of [[config.labelA, 35], [config.labelB, 61]]) {
      if (!enabled) continue;
      const label = ring(radius + .18 * DISPLAY_SCALE, radius + .04 * DISPLAY_SCALE, 5 * DISPLAY_SCALE, 0xf8f8f3);
      label.position.x = x; group.add(label);
    }
    if (assembly) { scene.remove(assembly); freeObject(assembly); }
    assembly = group; scene.add(group); renderer.render(scene, camera);
  }
  return {
    render,
    dispose() { disposed = true; ++sequence; if (assembly) freeObject(assembly); renderer.dispose(); },
  };
}
