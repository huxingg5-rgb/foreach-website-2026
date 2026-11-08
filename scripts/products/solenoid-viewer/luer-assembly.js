import manifest from '../../../data/products/detail/luer-cad-manifest.json';
import {isLuerCombination} from '../../../data/products/configurator/luer-combination.ts';

// Rigid transforms only, in millimetres. Original STEP vertices are untouched.
// Source male cone: r = 2.214 - 0.03*y; female cone: r = 2.3 - 0.03*z.
// Align those surfaces, not the tips or bounding boxes.
export const LUER_REFERENCE = Object.freeze({
  maleConeIntercept: 2.214, separateCoreConeIntercept: 2.249, femaleConeIntercept: 2.3, coneRadiusSlope: .03,
  femaleShoulder: 13.9, ringPocketFloor: .8, ringPocketDepth: 1.7,
  ringAcrossFlats: 8.1, femaleAcrossFlats: 7.9, nutThickness: 2.5,
  panelThicknessMax: 3.5, threadLength: 7,
});
export const FEMALE_OFFSET = (LUER_REFERENCE.maleConeIntercept - LUER_REFERENCE.femaleConeIntercept) / LUER_REFERENCE.coneRadiusSlope;
// The separate LSL/LRL source files have a 0.035 mm larger cone radius than
// the cores embedded in the supplied LPS/LPR assemblies. Keep both originals;
// seat the female on the selected source cone rather than stretching a mesh.
export function luerFemaleOffset(coreFamily = '') {
  const intercept = ['LSL', 'LRL'].includes(coreFamily) ? LUER_REFERENCE.separateCoreConeIntercept : LUER_REFERENCE.maleConeIntercept;
  return (intercept - LUER_REFERENCE.femaleConeIntercept) / LUER_REFERENCE.coneRadiusSlope;
}
export const LUER_COLORS = Object.freeze({N: '#deded5', W: '#f2f2ed', B: '#343537',
  R: '#da3935', G: '#18b67f', U: '#3047b7', O: '#f47732', Y: '#f4c443'});

export function resolveLuerCadModels(models) {
  if (!Array.isArray(models) || models.some(model => typeof model !== 'string') || models.length < 1 || models.length > 5) return null;
  if (new Set(models).size !== models.length) return null;
  const products = models.map(model => manifest.products[model]);
  if (products.some(product => !product)) return null;
  return isLuerCombination(products) ? products : null;
}

export function luerPlacement(product, {single = false, hasRing = false, panelThickness = 2, coreFamily = '', coreTube = ''} = {}) {
  if (single) return {rotation: product.singleRotation, position: [0, 0, 0]};
  if (!Number.isFinite(panelThickness) || panelThickness < 0 || panelThickness > LUER_REFERENCE.panelThicknessMax) throw Error('Invalid panel thickness');
  const femaleOffset = luerFemaleOffset(coreFamily);
  const shoulder = LUER_REFERENCE.femaleShoulder + femaleOffset;
  switch (product.family) {
    case 'LPS': case 'LPR': case 'LSL': case 'LRL': return {rotation: [0, 0, -Math.PI / 2], position: [0, 0, 0]};
    // Original STEP tips are at y=9.85 (LP) and y=10.4 (LPBL).
    // Align their 6% cone with the reviewed two-piece tip at y=8.3.
    case 'LP': return {rotation: [0, 0, -Math.PI / 2], position: [-1.55, 0, 0]};
    case 'LPBL': return {rotation: [0, 0, -Math.PI / 2], position: [-2.1, 0, 0]};
    // Exact source assembly placement: collar translates -13.9 along its axis.
    // LPS-16 STEP also rotates the collar -158 degrees around that axis.
    case 'LPT': return {rotation: [0, coreFamily === 'LSL' && coreTube === '1.6' ? -158 * Math.PI / 180 : 0, -Math.PI / 2], order: 'ZYX', position: [-13.9, 0, 0]};
    case 'LS': case 'PMLS': return {rotation: [0, Math.PI / 2, 0], position: [femaleOffset, 0, 0]};
    // Pocket opens toward the male end. The 8.1 mm pocket seats over the
    // 7.9 mm female hex, with its floor at the rear shoulder of PMLS.
    case 'LCR': return {rotation: [0, Math.PI, 0], position: [shoulder + LUER_REFERENCE.ringPocketFloor, 0, 0]};
    case 'LNS': return {rotation: [0, 0, -Math.PI / 2], position: [shoulder + (hasRing ? LUER_REFERENCE.ringPocketFloor : 0) + panelThickness + LUER_REFERENCE.nutThickness / 2, 0, 0]};
    default: throw Error('Unsupported Luer part');
  }
}

export function luerMeshColor(product, meshName) {
  // Complete two-piece male products contain both core and locking collar.
  // Color applies to the collar; the core retains its material's natural finish.
  return ['LPS', 'LPR'].includes(product.family) && meshName !== '443-02-00171'
    ? LUER_COLORS[product.material === 'PA' ? 'W' : 'N'] : LUER_COLORS[product.colorCode];
}

export {manifest as luerCadManifest};
