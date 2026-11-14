import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { pathToFileURL } from 'node:url';
import { Box3, Vector3, type Mesh, type MeshStandardMaterial, type Object3D } from 'three';
import { decodeCompactCad } from './solenoid-viewer/compact-cad.js';
import hsfCad from '../../data/products/configurator/tubing-assembly-hsf-cad.json';
import { assemblyMaterialAppearance } from '../../data/products/configurator/tubing-assembly-appearance';
import { assemblyFittingAccessories, getAssemblyFitting } from '../../data/products/configurator/tubing-assembly-catalog';
import { assemblyPreviewAsset } from '../../data/products/configurator/tubing-assembly-preview';
import { defaultFlangedTubingChoice, selectAssemblyFitting } from '../../data/products/configurator/flanged-tubing';
import { getAssemblyFittingVector } from '../../data/products/configurator/tubing-assembly-vectors';

async function review() {
  const { createAssemblyCadPart } = await import(pathToFileURL(`${process.cwd()}/public/models/products/tubing-assemblies/flanged-assembly-renderer.mjs`).href);
  for (const [model, source] of Object.entries(hsfCad)) {
    const fitting = getAssemblyFitting(model)!;
    const outer = fitting.outerDiameters[0], length = outer === 1.6 ? 20.5 : 18.1;
    const end = selectAssemblyFitting({ ...defaultFlangedTubingChoice().a, connection: '卡环' }, model, outer);
    assert.equal(assemblyPreviewAsset(end, outer)?.kind, 'exact-cad');
    assert.equal(assemblyPreviewAsset(end, outer)?.url, source.model3dUrl);
    assert.equal(assemblyPreviewAsset(end, outer === 1.6 ? 3.2 : 1.6), null);
    assert.equal(fitting.sourcePart, source.sourcePart);
    assert.equal(assemblyFittingAccessories(fitting, '卡环', outer)[0].model, `CL-1S-${outer * 10}`);
    assert.equal(getAssemblyFittingVector(model)!.source, fitting.drawingUrl, 'formal PDF vectors stay independent from preview meshes');
    const data = decodeCompactCad(gunzipSync(readFileSync(`public${source.model3dUrl}`)));
    assert.ok(data.meshes[0].index.array.length > 50000, 'the actual threaded/ribbed body must be present');
    for (const side of ['a', 'b']) {
      const group = createAssemblyCadPart(data, { ...end, cadUrl: source.model3dUrl }, side), box = new Box3().setFromObject(group);
      assert.ok(Math.abs((box.max.x - box.min.x) / .6 - length) < .001);
      assert.ok(Math.abs((box.max.y - box.min.y) / .6 - 8.2) < .001, 'native CAD is never stretched to match a conflicting PDF diameter');
      assert.ok(Math.abs(box.min.y + box.max.y) < .001 && Math.abs(box.min.z + box.max.z) < .001);
      const vertices: Vector3[] = [];
      group.traverse((o: Object3D) => {
        const mesh = o as Mesh; if (!mesh.isMesh) return;
        const material = mesh.material as MeshStandardMaterial, expected = assemblyMaterialAppearance('PEEK', '本色');
        assert.equal(material.color.getHex(), expected.color);
        assert.equal(material.roughness, expected.roughness); assert.equal(material.metalness, expected.metalness);
        assert.equal(material.map, null, 'HSF must use the shared live material rather than a baked-lit image');
        const p = mesh.geometry.attributes.position;
        for (let i = 0; i < p.count; i++) vertices.push(new Vector3().fromBufferAttribute(p, i).applyMatrix4(mesh.matrixWorld));
      });
      const radius = Math.max(...vertices.map(v => Math.hypot(v.y, v.z)));
      const grip = vertices.filter(v => Math.hypot(v.y, v.z) > radius * .98);
      const gripX = grip.reduce((sum, v) => sum + v.x, 0) / grip.length;
      const fraction = (gripX - box.min.x) / (box.max.x - box.min.x);
      assert.ok(side === 'a' ? fraction > .55 : fraction < .45, `${model}/${side}: threaded end must face outward`);
      group.traverse((o: Object3D) => { const m = o as Mesh; m.geometry?.dispose(); if (m.material) for (const material of Array.isArray(m.material) ? m.material : [m.material]) material.dispose(); });
    }
  }
  assert.match(hsfCad['HSF-U28-32-PEEK-N'].reviewNote, /8.2.*8.5/);
  console.log('PASS: both exact HSF meshes, original dimensions, bore alignment, outward threads, shared live PEEK materials, and independent formal PDF vectors.');
}
void review();
