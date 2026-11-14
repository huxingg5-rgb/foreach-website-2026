import {getLuerCadText} from "./luer-copy.js";
const t = getLuerCadText(new URLSearchParams(location.search).get("lang") || "zh");
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {decodeCompactCad} from './compact-cad.js';
import {createDimensions} from './dimensions.js';
import toolbarIcons from 'shared-cad-icons';
import {luerCadManifest, resolveLuerCadModels, luerPlacement, luerMeshColor, LUER_COLORS} from './luer-assembly.js';
import {getLuerRole} from '../../../data/products/configurator/luer-combination.ts';

const $ = id => document.getElementById(id);
const viewer = $('viewer'), stage = $('stage');
const preview = new URLSearchParams(location.search).get('preview') === '1';
document.documentElement.classList.toggle('external-resource-tabs', new URLSearchParams(location.search).get('resources') === 'external');
viewer.classList.toggle('luer-preview', preview);
let renderer, scene, camera, controls, dimensionOverlay, assembly;
let products = [], loadedParts = new Map(), requestKey = '', generation = 0;
let mode = 'assembly', tab = '3d', drawingModel = '', panelThickness = 2;
let active = true, pending = false, section = false, dimensionVisible = !preview;
let sectionAxis = 'x';
let bounds = new THREE.Box3(), frameHandle = 0, currentGeometryKey = '';
const geometryCache = new Map();
const clipPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0);
const roleNames = {LPS: t('公端'), LPR: t('旋转锁圈公端'), LP: t('一体式公端'), LSL: t('固定式芯子'), LRL: t('旋转式芯子'),
  LS: t('普通母端'), PMLS: t('穿板母端'), LCR: t('色环'), LPT: t('锁圈'), LNS: t('螺母'), LPBL: t('堵头')};
const roles = product => getLuerRole(product.family);
const post = (type, extra = {}) => {
  if (window.parent !== window) window.parent.postMessage({type, key: requestKey, ...extra}, location.origin);
};
const node = (tag, text, className) => {
  const el = document.createElement(tag); if (text) el.textContent = text; if (className) el.className = className; return el;
};

function fail(error) {
  console.error('Luer CAD:', error);
  pending = false; viewer.dataset.status = 'error'; $('busy').hidden = false;
  $('busy-label').textContent = t('鲁尔模型加载失败，请重试。'); $('retry').hidden = false;
  post('luer-error');
}

async function loadGeometry(id) {
  if (!geometryCache.has(id)) geometryCache.set(id, (async () => {
    const entry = luerCadManifest.geometries[id];
    if (!entry) throw Error('Unknown geometry');
    const response = await fetch(`${entry.url}?v=${entry.sha256.slice(0, 12)}`);
    if (!response.ok) throw Error(`CAD request ${response.status}`);
    const bytes = new Uint8Array(await response.arrayBuffer());
    const raw = bytes[0] === 0x1f && bytes[1] === 0x8b
      ? new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer()) : bytes;
    const data = decodeCompactCad(raw);
    if (data.meshes.length !== entry.meshes) throw Error('Incorrect geometry mesh count');
    return data;
  })().catch(error => {geometryCache.delete(id); throw error;}));
  return geometryCache.get(id);
}

function makePart(product, data) {
  const group = new THREE.Group();
  for (const raw of data.meshes) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(raw.attributes.position.array, 3));
    if (raw.attributes.normal) geometry.setAttribute('normal', new THREE.Float32BufferAttribute(raw.attributes.normal.array, 3));
    geometry.setIndex(raw.index.array); if (!raw.attributes.normal) geometry.computeVertexNormals();
    const material = new THREE.MeshStandardMaterial({color: luerMeshColor(product, raw.name), roughness: .36,
      metalness: 0, envMapIntensity: .55, side: THREE.DoubleSide, clippingPlanes: section ? [clipPlane] : [],
      polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1});
    const mesh = new THREE.Mesh(geometry, material); mesh.name = raw.name;
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 32), new THREE.LineBasicMaterial({
      color: '#48515c', transparent: true, opacity: .22, clippingPlanes: section ? [clipPlane] : [],
    }));
    edge.visible = $('display').value === 'edges'; edge.name = 'edges'; mesh.add(edge); group.add(mesh);
  }
  group.userData.geometryId = product.geometryId;
  return group;
}

function disposePart(group) {
  group.traverse(object => {object.geometry?.dispose(); object.material?.dispose();});
  assembly.remove(group);
}

function updateAppearance(group, product) {
  group.userData.model = product.model;
  group.userData.family = product.family;
  for (const mesh of group.children) mesh.material.color.set(luerMeshColor(product, mesh.name));
}

function placeParts() {
  const hasRing = products.some(product => product.family === 'LCR');
  const core = products.find(product => ['LSL', 'LRL'].includes(product.family));
  for (const product of products) {
    const group = loadedParts.get(roles(product));
    const placement = luerPlacement(product, {single: products.length === 1, hasRing, panelThickness, coreFamily: core?.family, coreTube: core?.tube});
    group.rotation.set(...placement.rotation, placement.order || 'XYZ'); group.position.set(...placement.position);
    group.visible = mode === 'assembly' || mode === roles(product);
  }
  assembly.updateMatrixWorld(true);
  bounds.makeEmpty();
  for (const group of loadedParts.values()) if (group.visible) bounds.union(new THREE.Box3().setFromObject(group, true));
  dimensionOverlay.set({dimensions: {min: bounds.min.toArray(), max: bounds.max.toArray(),
    size: bounds.getSize(new THREE.Vector3()).toArray(), axes: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]}}, assembly);
  dimensionOverlay.setVisible(dimensionVisible && tab === '3d');
  viewer.dataset.viewMode = mode;
  viewer.dataset.panelThickness = String(panelThickness);
  viewer.dataset.transforms = JSON.stringify([...loadedParts].map(([role, g]) => ({role, model: g.userData.model,
    geometry: g.userData.geometryId, object: g.uuid, position: g.position.toArray(), rotation: g.rotation.toArray().slice(0, 3)})));
  updateClip();
}

function fit(resetDirection = false) {
  if (!camera || bounds.isEmpty()) return;
  const center = bounds.getCenter(new THREE.Vector3()), size = bounds.getSize(new THREE.Vector3());
  const direction = resetDirection ? ({iso: new THREE.Vector3(10, 8, 38), front: new THREE.Vector3(0, 0, 1),
    back: new THREE.Vector3(0, 0, -1), right: new THREE.Vector3(1, 0, .0001), left: new THREE.Vector3(-1, 0, .0001),
    top: new THREE.Vector3(0, 1, .0001), bottom: new THREE.Vector3(0, -1, .0001)})[$('views').value]
    : camera.position.clone().sub(controls.target);
  if (direction.lengthSq() < .001) direction.set(10, 8, 38);
  controls.target.copy(center); camera.position.copy(center).add(direction.normalize().multiplyScalar(Math.max(100, size.length() * 3)));
  camera.lookAt(center); camera.updateMatrixWorld();
  // Fit the projected corners, including end views, rather than a fixed scale.
  const projected = new THREE.Box3();
  for (let i = 0; i < 8; i++) projected.expandByPoint(new THREE.Vector3(
    i & 1 ? bounds.max.x : bounds.min.x, i & 2 ? bounds.max.y : bounds.min.y,
    i & 4 ? bounds.max.z : bounds.min.z).applyMatrix4(camera.matrixWorldInverse));
  const span = projected.getSize(new THREE.Vector3()), aspect = Math.max(.2, stage.clientWidth / Math.max(1, stage.clientHeight));
  const h = Math.max(span.y, span.x / aspect, 2) * 1.42;
  camera.top = h / 2; camera.bottom = -h / 2; camera.left = -h * aspect / 2; camera.right = h * aspect / 2;
  camera.zoom = 1; camera.updateProjectionMatrix(); controls.update(); render();
}

function render() {
  if (!renderer || !active || tab !== '3d' || document.hidden) return;
  renderer.render(scene, camera); dimensionOverlay.update();
}
function animate() {
  frameHandle = 0;
  if (!active || tab !== '3d' || document.hidden || !controls?.autoRotate) return;
  controls.update(); render(); frameHandle = requestAnimationFrame(animate);
}
function resume() {
  cancelAnimationFrame(frameHandle); frameHandle = 0;
  render(); if (active && tab === '3d' && controls?.autoRotate && !document.hidden) frameHandle = requestAnimationFrame(animate);
}

function updateSidebar() {
  const choices = $('choices'), mobile = $('mobile-choice'); choices.replaceChildren(); mobile.replaceChildren();
  const coreAssembly = products.length === 2 && products.some(p => roles(p) === 'core') && products.some(p => roles(p) === 'collar');
  const options = products.length > 1
    ? [{value: 'assembly', label: coreAssembly ? t('公端组合') : t('对接组合')}, ...products.map(p => ({value: roles(p), label: t(`${roleNames[p.family]}单件`)}))]
    : [{value: 'assembly', label: ['LPS', 'LPR'].includes(products[0].family) ? t('公端总成') : t(`${roleNames[products[0].family]}单件`)}];
  const value = mode;
  for (const option of options) {
    const button = node('button'); button.append(node('strong', option.label)); button.type = 'button'; button.setAttribute('role', 'radio');
    button.setAttribute('aria-checked', String(option.value === value));
    button.addEventListener('click', () => choose(option.value)); choices.append(button);
    const selectOption = node('option', option.label); selectOption.value = option.value; mobile.append(selectOption);
  }
  mobile.value = value;
  const selected = mode === 'assembly' ? products : products.filter(p => roles(p) === mode);
  $('detail-heading').textContent = t(`${options.find(option => option.value === mode)?.label || '对接组合'} · 外形尺寸`);
  const info = $('selected-models'); info.replaceChildren();
  for (const product of selected) {
    const line = node('strong', `${roleNames[product.family]} · ${product.model}`);
    line.title = `${product.material} · ${t(product.color)}${product.tube ? ' · ' + t('软管内径') + ' ' + product.tube + ' mm' : ''}`;
    info.append(line);
  }
  const measurements = $('measurements'); measurements.replaceChildren();
  if (tab === '3d' && !bounds.isEmpty()) {
    const size = bounds.getSize(new THREE.Vector3());
    for (const [label, n] of [[t('长 L'), size.x], [t('宽 W'), size.z], [t('高 H'), size.y]]) {
      const row = node('div'); row.append(node('dt', label), node('dd', `${n.toFixed(2)} mm`)); measurements.append(row);
    }
  }
  $('panel-setting').hidden = tab !== '3d' || mode !== 'assembly' || !products.some(p => p.family === 'PMLS') || !products.some(p => p.family === 'LNS');
  const legend = $('legend'); legend.replaceChildren();
  for (const product of selected) {
    const label = node('span', `${roleNames[product.family]} · ${product.model}`);
    label.title = `${product.material} · ${t(product.color)}${product.tube ? ' · ' + t('软管内径') + ' ' + product.tube + ' mm' : ''}`;
    label.dataset.luerPart = product.model; label.dataset.geometry = product.geometryId;
    const swatch = node('i'); swatch.style.background = LUER_COLORS[product.colorCode]; label.prepend(swatch); legend.append(label);
  }
  refreshTree();
}

function choose(value) {
  if (pending) return;
  mode = value; placeParts(); fit(true);
  updateSidebar(); render();
}
function showDrawing() {
  const product = products.find(p => p.model === drawingModel) || products[0];
  if (!product) return;
  drawingModel = product.model;
  const select = $('luer-drawing-model'); select.replaceChildren();
  for (const part of products) {
    const option = node('option', `${roleNames[part.family]} · ${part.model}`); option.value = part.model; select.append(option);
  }
  select.value = drawingModel;
  const url = `${product.drawingUrl}?v=${product.drawingSha256.slice(0, 12)}`;
  if ($('drawing-frame').dataset.model !== product.model) {
    $('drawing-frame').src = `${url}#toolbar=0&navpanes=0&scrollbar=1`; $('drawing-frame').dataset.model = product.model;
  }
  $('drawing-frame').title = `${product.model} 2D PDF`;
}
function switchTab(next) {
  tab = next; viewer.dataset.tab = next;
  for (const name of ['2d', '3d']) {
    $(`tab${name}`).classList.toggle('selected', name === next);
    $(`tab${name}`).setAttribute('aria-selected', String(name === next));
  }
  stage.hidden = $('legend').hidden = $('luer-selector').hidden = $('tools').hidden = $('side-tools').hidden = next === '2d';
  $('drawing-wrap').hidden = next === '3d';
  if (next === '2d') {
    showDrawing();
    for (const [panel, button] of [['tree-panel', 'tree'], ['help-panel', 'help']]) {$(panel).hidden = true; setActive(button, false);}
    $('section-panel').hidden = true;
  } else $('section-panel').hidden = !section;
  dimensionOverlay?.setVisible(dimensionVisible && next === '3d'); updateSidebar(); resume();
}

function setActive(id, value) {
  $(id).classList.toggle('active', value); $(id).setAttribute('aria-pressed', String(value));
}
function togglePanel(panel, button) {
  $(panel).hidden = !$(panel).hidden; setActive(button, !$(panel).hidden);
}
function refreshTree() {
  const tree = $('tree-content'); tree.replaceChildren();
  for (const product of products) {
    const group = loadedParts.get(roles(product)); if (!group.visible) continue;
    tree.append(node('div', product.model, 'tree-root'));
    group.children.forEach(mesh => {
      const label = node('label', '', 'part'), input = node('input'); input.type = 'checkbox'; input.checked = mesh.visible;
      const name = ['LPS', 'LPR'].includes(product.family) ? mesh.name === '443-02-00171' ? t('锁圈') : t('芯子') : roleNames[product.family];
      input.setAttribute('aria-label', `${product.model} · ${name}`);
      input.addEventListener('change', () => {mesh.visible = input.checked; render();});
      label.append(input, node('span', name)); tree.append(label);
    });
  }
}
function updateClip() {
  if (!assembly) return;
  clipPlane.normal.set(sectionAxis === 'x' ? -1 : 0, sectionAxis === 'y' ? -1 : 0, sectionAxis === 'z' ? -1 : 0);
  if (!bounds.isEmpty()) clipPlane.constant = THREE.MathUtils.lerp(bounds.min[sectionAxis], bounds.max[sectionAxis], Number($('section-range').value) / 100);
  assembly.traverse(object => {if (object.material) {object.material.clippingPlanes = section ? [clipPlane] : []; object.material.needsUpdate = true;}});
  viewer.dataset.section = String(section); viewer.dataset.sectionAxis = sectionAxis;
  render();
}
function applyDisplay() {
  const display = $('display').value;
  assembly.traverse(object => {
    if (object.isMesh) {
      object.material.wireframe = display === 'wire'; object.material.transparent = display === 'transparent';
      object.material.opacity = display === 'transparent' ? .28 : 1; object.material.depthWrite = display !== 'transparent';
      object.material.needsUpdate = true;
    } else if (object.name === 'edges') object.visible = display === 'edges' || display === 'transparent';
  });
  viewer.dataset.display = display; render();
}

async function selectModels(models) {
  const next = resolveLuerCadModels(models);
  if (!next) {++generation; requestKey = Array.isArray(models) ? models.join('|') : ''; fail(Error('Invalid Luer selection')); return;}
  const key = models.join('|');
  if (key === requestKey && pending) return;
  // The server-rendered iframe can finish before React hydrates its listener.
  // A repeated selection is also a status handshake, so acknowledge readiness.
  if (key === requestKey && viewer.dataset.status === 'ready') {post('luer-rendered'); return;}
  const token = ++generation; requestKey = key; pending = true;
  viewer.dataset.status = 'loading'; $('busy').hidden = false; $('retry').hidden = true;
  $('busy-label').textContent = models.length > 1 ? t('正在加载鲁尔组合模型…') : t('正在加载鲁尔模型…');
  try {
    const data = await Promise.all(next.map(product => loadGeometry(product.geometryId)));
    if (token !== generation) return;
    const nextRoles = new Set(next.map(roles));
    for (const [role, group] of loadedParts) if (!nextRoles.has(role)) {disposePart(group); loadedParts.delete(role);}
    for (const [i, product] of next.entries()) {
      const role = roles(product); let group = loadedParts.get(role);
      if (group?.userData.geometryId !== product.geometryId) {
        if (group) disposePart(group);
        group = makePart(product, data[i]); loadedParts.set(role, group); assembly.add(group);
      }
      updateAppearance(group, product);
    }
    products = next; if (next.length === 1 || (mode !== 'assembly' && !nextRoles.has(mode))) mode = 'assembly';
    if (!next.some(p => p.model === drawingModel)) drawingModel = next[0].model;
    placeParts(); updateSidebar(); applyDisplay(); if (tab === '2d') showDrawing();
    const nextGeometryKey = next.map(p => p.geometryId).join('|');
    if (currentGeometryKey !== nextGeometryKey) fit(!currentGeometryKey);
    currentGeometryKey = nextGeometryKey;
    pending = false; $('busy').hidden = true; viewer.dataset.status = 'ready'; viewer.dataset.models = key;
    viewer.dataset.meshCount = String([...loadedParts.values()].reduce((sum, group) => sum + group.children.length, 0));
    render(); post('luer-rendered');
  } catch (error) {if (token === generation) fail(error);}
}

function init() {
  for (const element of document.querySelectorAll('[data-icon]')) {
    element.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${toolbarIcons[element.dataset.icon]}</svg>`;
  }
  renderer = new THREE.WebGLRenderer({antialias: true, alpha: false});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); renderer.setClearColor('#ffffff');
  renderer.localClippingEnabled = true; renderer.toneMapping = THREE.NeutralToneMapping; renderer.toneMappingExposure = 1;
  stage.append(renderer.domElement);
  scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer), room = new RoomEnvironment();
  scene.environment = pmrem.fromScene(room, .04).texture; room.dispose(); pmrem.dispose();
  scene.add(new THREE.HemisphereLight('#ffffff', '#9aa5b1', .8));
  const light = new THREE.DirectionalLight('#ffffff', 1.6); light.position.set(-12, 25, 30); scene.add(light);
  camera = new THREE.OrthographicCamera(-30, 30, 20, -20, .01, 5000); camera.position.set(10, 8, 100);
  controls = new OrbitControls(camera, renderer.domElement); controls.enableDamping = false;
  controls.minZoom = .25; controls.maxZoom = 12; controls.autoRotateSpeed = 1.2; controls.addEventListener('change', render);
  assembly = new THREE.Group(); scene.add(assembly);
  dimensionOverlay = createDimensions(stage, camera, {axes: [0, 2, 1], axisLabels: {0: t('长 L'), 2: t('宽 W'), 1: t('高 H')},
    offset: 28, minSpan: 12, side: 'bottom', verticalSide: 'right', clampLabels: true});
  const resize = new ResizeObserver(() => {
    const w = stage.clientWidth, h = stage.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false); const half = camera.top; camera.left = -half * w / h; camera.right = half * w / h;
    camera.updateProjectionMatrix(); fit();
  }); resize.observe(stage);
  renderer.domElement.addEventListener('webglcontextlost', event => {event.preventDefault(); fail(Error('WebGL context lost'));});
  $('tab2d').addEventListener('click', () => switchTab('2d')); $('tab3d').addEventListener('click', () => switchTab('3d'));
  $('luer-drawing-model').addEventListener('change', event => {drawingModel = event.target.value; showDrawing();});
  $('mobile-choice').addEventListener('change', event => choose(event.target.value));
  $('panel-thickness').addEventListener('change', event => {
    const value = event.target.valueAsNumber;
    if (!Number.isFinite(value) || value < 0 || value > 3.5) {event.target.value = String(panelThickness); return;}
    panelThickness = value; placeParts(); updateSidebar(); render();
  });
  $('home').addEventListener('click', () => {
    $('views').value = 'iso'; controls.autoRotate = false; setActive('play', false);
    section = false; setActive('section', false); $('section-panel').hidden = true;
    for (const group of loadedParts.values()) for (const mesh of group.children) mesh.visible = true;
    refreshTree(); updateClip(); fit(true); resume();
  });
  $('fit').addEventListener('click', () => fit()); $('views').addEventListener('change', () => fit(true));
  $('play').addEventListener('click', () => {controls.autoRotate = !controls.autoRotate; setActive('play', controls.autoRotate); resume();});
  $('dimensions').addEventListener('click', () => {dimensionVisible = !dimensionVisible; dimensionOverlay.setVisible(dimensionVisible); setActive('dimensions', dimensionVisible); render();});
  $('section').addEventListener('click', () => {
    section = !section; setActive('section', section); $('section-panel').hidden = !section; updateClip();
  });
  $('section-axis').addEventListener('change', event => {sectionAxis = event.target.value; updateClip();});
  $('section-range').addEventListener('input', updateClip);
  $('display').addEventListener('change', applyDisplay);
  $('tree').addEventListener('click', () => togglePanel('tree-panel', 'tree'));
  $('help').addEventListener('click', () => togglePanel('help-panel', 'help')); $('help-close').addEventListener('click', () => togglePanel('help-panel', 'help'));
  $('full').addEventListener('click', async () => {
    try {if (document.fullscreenElement) await document.exitFullscreen(); else await viewer.requestFullscreen();} catch {viewer.classList.toggle('expanded'); fit();}
  });
  window.addEventListener('keydown', event => {
    if (event.defaultPrevented || event.target.matches('select,input')) return;
    if (event.key === 'Home') $('home').click();
    if (event.key === 'Escape') for (const [panel, button] of [['tree-panel', 'tree'], ['help-panel', 'help']]) {$(panel).hidden = true; setActive(button, false);}
  });
  $('retry').addEventListener('click', () => location.reload());
  document.addEventListener('visibilitychange', resume);
  window.addEventListener('message', event => {
    if (event.origin !== location.origin || event.source !== window.parent || event.data?.type !== 'luer-selection') return;
    active = Boolean(event.data.active); selectModels(event.data.models); resume();
  });
  const initial = new URLSearchParams(location.search).get('models')?.split('|') || ['LPS-16-PP-O', 'PMLS-U28-16D-PP-N', 'LCR-PA-O', 'LNS-U28-PP-N'];
  selectModels(initial); post('luer-ready');
}
try {init();} catch (error) {fail(error);}
