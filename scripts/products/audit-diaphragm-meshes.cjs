// Independent integrity audit for the seven external-release diaphragm models.
// Reuse the strict whole-BREP-face audit; do not duplicate its geometry rules.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const zlib = require('node:zlib');
const {auditModel} = require('./audit-valveless-meshes.cjs');

const SOURCES = {
  'dpl30-db': 'DPL30-BDC-外发版本模型.stp',
  'dpl30-bb': 'DPL30-BLDC-外发版本模型.stp',
  'dpl60-db': 'DPL60-BDC-外发版本模型.stp',
  'dpl60-bb': 'DPL60-BLDC-外发版本模型.stp',
  'dpl30h-ds': 'DPL30H-BDC-外发版本模型.stp',
  'dpl30h-bs': 'DPL30H-BLDC-外发版本模型.stp',
  'dpgl800-bs': '86泵-接口朝向下-外发版本模型.stp',
};
const fileStats = (bytes, data) => ({bytes: bytes.length,
  gzipBytes: zlib.gzipSync(bytes, {level: 9}).length,
  sha256: crypto.createHash('sha256').update(bytes).digest('hex'),
  emptyMeshes: data.meshes.filter(mesh => mesh.index.array.length === 0).length});

function reportBaselineDegenerates(result) {
  result.warnings = [];
  const originalCount = result.before.degenerateTriangles, retainedCount = result.after.degenerateTriangles;
  // The imported, five-decimal before snapshots already contain tiny/degenerate
  // triangles. Do not change that baseline during pruning.
  // The shared audit still proves each retained triangle's ordered attributes
  // are identical, so count alone cannot hide newly introduced degeneracy.
  if (originalCount > 0 && retainedCount <= originalCount) {
    result.errors = result.errors.filter(error => !/^(before|after): \d+ degenerate triangles$/.test(error));
    result.warnings.push(`Baseline has ${originalCount} degenerate triangles; ${retainedCount} remain. Allowed only as unchanged original triangles under exact retained-coordinate/normal/winding validation.`);
  }
  return result;
}

function run(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 2) {
    if (!['--before', '--after', '--source-stats'].includes(argv[index]) || !argv[index + 1] || argv[index + 1].startsWith('--')) throw new Error('Usage: node scripts/products/audit-diaphragm-meshes.cjs --before DIR --after DIR [--source-stats existing-assets-audit.json]');
    args[argv[index].slice(2)] = path.resolve(argv[index + 1]);
  }
  if (!args.before || !args.after) throw new Error('Both --before and --after directories are required');
  const sourceStats = args['source-stats'] ? JSON.parse(fs.readFileSync(args['source-stats'], 'utf8').replace(/^\uFEFF/, '')) : null;
  if (sourceStats && !Array.isArray(sourceStats.steps)) throw new Error('Source statistics must contain a steps array');
  const results = Object.entries(SOURCES).map(([id, sourceFile]) => {
    try {
      const beforeBytes = fs.readFileSync(path.join(args.before, `${id}.json`));
      const afterBytes = fs.readFileSync(path.join(args.after, `${id}.json`));
      const before = JSON.parse(beforeBytes), after = JSON.parse(afterBytes);
      const result = reportBaselineDegenerates(auditModel(before, after));
      result.before = {...result.before, ...fileStats(beforeBytes, before)};
      result.after = {...result.after, ...fileStats(afterBytes, after)};
      // Reference source bounds were independently tessellated at 0.03 mm.
      // Allow 0.05 mm for tessellation/rounding, but require before/after bounds
      // themselves to remain EXACTLY identical through the shared audit.
      let sourceComparison = null;
      if (sourceStats) {
        const reference = sourceStats.steps.find(step => step.file === sourceFile);
        if (!reference) result.errors.push(`Missing independently inspected source: ${sourceFile}`);
        else {
          const maxBoundDeltaMm = Math.max(...['min', 'max'].flatMap(side => reference.bounds[side].map((value, axis) => Math.abs(value - result.before.bounds[side][axis]))));
          sourceComparison = {sourceFile,sha256:reference.sha256,referenceSizeMm:reference.sizeMm,
            sourceMeshes:reference.meshCount,beforeMeshes:before.meshes.length,maxBoundDeltaMm,toleranceMm:0.05};
          if (reference.meshCount !== before.meshes.length) result.errors.push('Source and before mesh slot counts differ');
          if (!Number.isFinite(maxBoundDeltaMm) || maxBoundDeltaMm > 0.05) result.errors.push(`Source and before bounds differ by ${maxBoundDeltaMm} mm`);
        }
      }
      result.passed = result.errors.length === 0;
      return {id, sourceFile, sourceComparison, ...result};
    } catch (error) {
      return {id, sourceFile, passed: false, errors: [error.message]};
    }
  });
  const report = {passed: results.every(result => result.passed),
    scope: 'Whole-face removal integrity: exact retained positions/normals/winding, original mesh/face slots and material metadata, hierarchy, transforms, dimensions and bounds. Visibility requires a separate review; optional source stats check the independently imported STEP envelope.',
    ...args, results};
  console.log(JSON.stringify(report, null, 2));
  if (!report.passed) process.exitCode = 1;
  return report;
}

module.exports = {SOURCES, run, reportBaselineDegenerates};
if (require.main === module) {
  try { run(process.argv.slice(2)); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
