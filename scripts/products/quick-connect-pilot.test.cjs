/* eslint-disable @typescript-eslint/no-require-imports -- Test the existing OCCT/FCAD pipeline. */
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path'), zlib = require('node:zlib'), Module = require('node:module');
const esbuild = require('./solenoid-viewer/node_modules/esbuild');
const THREE = require('./solenoid-viewer/node_modules/three');
const root = path.resolve(__dirname, '../..');
function load(entry) {
  const filename = path.join(root, entry);
  const result = esbuild.buildSync({entryPoints: [filename], bundle: true, platform: 'node', format: 'cjs', write: false, logLevel: 'silent'});
  const m = new Module(filename, module); m._compile(result.outputFiles[0].text, filename); return m.exports;
}
const manifest = require('../../data/products/detail/quick-connect-fitting-cad-manifest.json');
const pilot = require('../../data/products/detail/quick-connect-pilot-preview.json');
const {getQuickConnectGeometryUrl, isQuickConnectPilot, orientQuickConnectProduct} = load('scripts/products/solenoid-viewer/quick-connect-pair.js');
const {decodeCompactCad} = load('scripts/products/solenoid-viewer/compact-cad.js');
const {alignQuickConnectAssembly,quickConnectEnvelope} = load('scripts/products/solenoid-viewer/quick-connect-assembly.js');
const assemblyReferences = require('../../data/products/detail/quick-connect-pilot-assembly.json');
const read = url => decodeCompactCad(zlib.gunzipSync(fs.readFileSync(path.join(root, 'public', url))));

test('Only the requested base product uses the reviewed preview resources', () => {
  const base = manifest.products['q2001-pmv-sacn'];
  assert.equal(Object.keys(pilot.geometries).length, 3);
  for (const product of Object.values(manifest.products)) {
    assert.equal(isQuickConnectPilot(product), product === base);
    const expected = manifest.geometries[product.viewerId].model3dUrl;
    if (product !== base) assert.equal(getQuickConnectGeometryUrl(product, product), expected);
    assert.equal(getQuickConnectGeometryUrl(product, base), pilot.geometries[product.viewerId]?.model3dUrl || expected);
  }
});

test('Compressed display meshes preserve dimensions, mating axes, source faces and valid geometry', () => {
  for (const [id, entry] of Object.entries(pilot.geometries)) {
    const originalUrl = manifest.geometries[id].model3dUrl;
    const source = read(originalUrl), display = read(entry.model3dUrl);
    assert.deepEqual(display.dimensions, source.dimensions, id);
    assert.deepEqual(display.mating, source.mating, id);
    const product = Object.values(manifest.products).find(p => p.viewerId === id), solid = new THREE.Group();
    orientQuickConnectProduct(display, solid, product, true);
    const mouth = new THREE.Vector3(...display.mating.center).applyQuaternion(solid.quaternion).add(solid.position);
    assert.ok(mouth.distanceTo(new THREE.Vector3(product.gender === 'P' ? -1.5 : 1.5, 0, 0)) < 1e-10);
    assert.equal(display.meshes.length, source.meshes.length);
    assert.ok(fs.statSync(path.join(root, 'public', entry.model3dUrl)).size < fs.statSync(path.join(root, 'public', originalUrl)).size * .2);
    const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
    for (const [i, mesh] of display.meshes.entries()) {
      const p = mesh.attributes.position.array, n = mesh.attributes.normal.array, indices = mesh.index.array;
      assert.equal(mesh.brep_faces.length, source.meshes[i].brep_faces.length);
      assert.equal(p.length, n.length); assert.equal(indices.length % 3, 0);
      assert.ok(p.every(Number.isFinite)); assert.ok(n.every(Number.isFinite));
      assert.ok(indices.every(j => Number.isInteger(j) && j >= 0 && j < p.length / 3));
      const sourceGeometry = new THREE.BufferGeometry();
      sourceGeometry.setAttribute('position', new THREE.Float32BufferAttribute(source.meshes[i].attributes.position.array, 3));
      sourceGeometry.setIndex(source.meshes[i].index.array);
      const sourceEdges = new THREE.EdgesGeometry(sourceGeometry, 26);
      assert.deepEqual(mesh.reviewedDisplayEdges, Array.from(sourceEdges.attributes.position.array).map(value => Number(value.toFixed(4)) || 0));
      sourceGeometry.dispose(); sourceEdges.dispose();
      p.forEach((v, j) => {min[j % 3] = Math.min(min[j % 3], v); max[j % 3] = Math.max(max[j % 3], v);});
      let end = 0;
      for (const face of mesh.brep_faces) {
        assert.equal(face.first, end); assert.ok([0, 1, 2].includes(face.materialRole)); end = face.last + 1;
      }
      assert.equal(end * 3, indices.length);
    }
    for (let k = 0; k < 3; k++) {
      assert.ok(Math.abs(min[k] - source.dimensions.min[k]) <= .05);
      assert.ok(Math.abs(max[k] - source.dimensions.max[k]) <= .05);
    }
  }
});

test('Reviewed material regions separate metal hardware from the plastic housing and sealing ring', () => {
  const model = slug => read(pilot.geometries[manifest.products[slug].viewerId].model3dUrl);
  const male = model('q2001-pmv-sacn');
  assert.equal(male.meshes[0].brep_faces[7].materialRole, 0); // Plastic mounting flange.
  for (const i of [140, 141, 145, 154, 156]) assert.equal(male.meshes[0].brep_faces[i].materialRole, 2); // Nut ends and bevels.
  assert.ok(male.meshes[1].brep_faces.every(face => face.materialRole === 1));
  const pp = model('q2001-snv-sppe');
  for (const i of [23, 24, 28, 43, 47]) assert.equal(pp.meshes[0].brep_faces[i].materialRole, 0); // Molded guard stays PP.
  for (const i of [51, 59, 62, 70, 120]) assert.equal(pp.meshes[0].brep_faces[i].materialRole, 2); // Lock plate, button, pin.
  const pom = model('q2001-smv-sacn');
  for (const i of [80, 81, 162, 173, 181, 231, 392]) assert.equal(pom.meshes[0].brep_faces[i].materialRole, 2);
});

test('Every available mating end aligns its verified release plate with the pilot retention groove', () => {
  const base=manifest.products['q2001-pmv-sacn'],baseData=read(getQuickConnectGeometryUrl(base,base));
  assert.equal(Object.keys(assemblyReferences.female).length,43);
  for(const [slug,reference]of Object.entries(assemblyReferences.female)){
    const product=manifest.products[slug],data=read(getQuickConnectGeometryUrl(product,base)),male=new THREE.Group(),female=new THREE.Group();
    assert.equal(reference.sourceSha256,manifest.geometries[product.viewerId].sourceSha256);
    orientQuickConnectProduct(baseData,male,base,true);orientQuickConnectProduct(data,female,product,true);
    const alignment=alignQuickConnectAssembly(base,baseData,male,product,data,female);assert.ok(alignment,slug);
    const point=(datum,solid)=>new THREE.Vector3(...datum.center).applyQuaternion(solid.quaternion).add(solid.position);
    assert.ok(point(assemblyReferences.male,male).distanceTo(point(reference,female))<1e-9,slug);
    assert.ok(Math.abs(alignment.clearanceMm-.2)<1e-8,slug);
    assert.ok(alignment.overlapMm>0&&alignment.overlapMm<baseData.dimensions.size[baseData.mating.axis],slug);
    const box=quickConnectEnvelope(baseData,male).union(quickConnectEnvelope(data,female));
    const expected=baseData.dimensions.size[baseData.mating.axis]+data.dimensions.size[data.mating.axis]-alignment.overlapMm;
    assert.ok(Math.abs(box.getSize(new THREE.Vector3()).x-expected)<1e-8,slug);
  }
});

test('Default assembled and individual envelopes provide distinct length, width and height', () => {
  const base=manifest.products['q2001-pmv-sacn'],product=manifest.products[base.defaultMateSlug];
  const baseData=read(getQuickConnectGeometryUrl(base,base)),data=read(getQuickConnectGeometryUrl(product,base));
  const male=new THREE.Group(),female=new THREE.Group();
  orientQuickConnectProduct(baseData,male,base,true);orientQuickConnectProduct(data,female,product,true);
  const alignment=alignQuickConnectAssembly(base,baseData,male,product,data,female);assert.ok(Math.abs(alignment.overlapMm-13.63)<1e-9);
  const box=quickConnectEnvelope(baseData,male).union(quickConnectEnvelope(data,female)),size=box.getSize(new THREE.Vector3());
  assert.equal(size.x.toFixed(2),'56.80');assert.equal(size.y.toFixed(2),'20.53');assert.equal(size.z.toFixed(2),'17.86');
  assert.equal(quickConnectEnvelope(baseData,male).getSize(new THREE.Vector3()).x.toFixed(2),'34.73');
  assert.equal(quickConnectEnvelope(data,female).getSize(new THREE.Vector3()).x.toFixed(2),'35.70');
  assert.equal(alignQuickConnectAssembly({...base,model:'UNKNOWN'},baseData,male,product,data,female),null);
});

test('Default Q2001 female release button starts upward in the isometric view', () => {
  const base=manifest.products['q2001-pmv-sacn'],product=manifest.products[base.defaultMateSlug];
  const data=read(getQuickConnectGeometryUrl(product,base)),female=new THREE.Group();
  orientQuickConnectProduct(data,female,product,true);
  const buttonDirection=new THREE.Vector3(1,0,0).applyQuaternion(female.quaternion).normalize();
  assert.ok(buttonDirection.distanceTo(new THREE.Vector3(0,1,0))<1e-10);
});
