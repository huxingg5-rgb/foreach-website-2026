# Valveless pump exterior model optimization

Scope: RPL-P4, RPL-P6.35, RPL-P15 and DRPL-0109. DRPL-0119 has a separate source model and must not reuse DRPL-0109.

The STEP import scripts produce the full tessellation of the supplied external-release STEP files. Keep that output in a separate `before` directory before pruning. Never edit the supplied STEP or drawing PDF.

## Workflow

1. Run `prune-valveless-hidden-faces.cjs --before <original-json-dir> --after <candidate-dir> --deps <isolated-node_modules-dir>`. Dependencies are `three` and `three-mesh-bvh`; no production dependency is required. The script samples occlusion and removes whole BREP faces, preserving empty mesh/face slots.
2. Run `audit-valveless-meshes.cjs --before <original-json-dir> --after <candidate-dir>`. Retained geometry, normals, winding, material roles, slots, root references, transforms and overall bounds must match exactly.
3. Bundle `review-valveless-meshes.js` with the same esbuild/Three.js dependencies as the viewer. Serve it from an isolated localhost page with `/before/<id>.json` and `/candidate/<id>.json`. Both solid and edge modes are compared with identical original bounds, camera and lighting. Use different viewpoints from the pruning rays, e.g. `?views=128&size=1024`.
4. Inspect all differences. Export the report and run `restore-valveless-reviewed-faces.cjs --before <original-json-dir> --after <candidate-dir> --report <review-json>`. `restoreFaces` contains original `[meshIndex, faceIndex]` pairs. Conservatively restore adjoining faces when needed. Repeat visual and geometry audits after restoration.
5. Run `preserve-valveless-edges.cjs --before <original-json-dir> --after <candidate-dir>` after the final face restoration. Its compact edge references and missing line segments reconstruct the original Float32 display lines in their original order; this prevents artificial contact seams. Recheck the reconstructed lines against the originals and rerun both visual modes. Regenerate this data if any faces are restored later.
6. Only copy reviewed candidates into `public/models/products/pumps/valveless-pumps/`. Rebuild `solenoid-viewer/build.cjs` after viewer changes and check the real product pages.

## Invariants

- Retained faces are not simplified or retessellated. Their exact original positions and normals are retained.
- P15 uses original BREP face numbers for its reviewed finishes. Do not renumber/delete empty face slots.
- Empty meshes are skipped by the viewer while original mesh indices remain stable.
- `exteriorOptimized` models remain assembled: parts hiding, sectioning, transparency and wireframe are unavailable. Orbit, solid/edge modes, dimensions and original PDFs remain usable.
- Sampled visibility and image comparisons are regression checks, not a mathematical guarantee for every possible view. Restore uncertain surfaces instead of maximizing the reduction percentage.
- Reimporting a STEP regenerates the unpruned model; rerun this workflow before replacing a reviewed optimized asset.
