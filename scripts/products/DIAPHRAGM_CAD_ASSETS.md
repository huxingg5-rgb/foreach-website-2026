# Diaphragm pump website CAD assets

The seven public model pages reuse `ProductCadViewer` and the existing solenoid
viewer. `diaphragm-pump-cad-assets.ts` deliberately maps exact public model slugs;
neutral family pages and all 2D drawing paths retain their original behavior.

## Source mapping

| Page | External-release STEP |
| --- | --- |
| DPL30-DB | DPL30-BDC-外发版本模型.stp |
| DPL30-BB | DPL30-BLDC-外发版本模型.stp |
| DPL60-DB | DPL60-BDC-外发版本模型.stp |
| DPL60-BB | DPL60-BLDC-外发版本模型.stp |
| DPL30H-DS | DPL30H-BDC-外发版本模型.stp |
| DPL30H-BS | DPL30H-BLDC-外发版本模型.stp |
| DPGL800-BS | 86泵-接口朝向下-外发版本模型.stp |

The BDC-6 and motor-facing 86 pump variants are not mapped to these pages.
Do not infer that those configurations are interchangeable. The old DPL30
brushed GLB was identical to DPL60's; the supplied DPL30 STEP corrects that
identity. The supplied DPL30 brushless STEP also restores a rear component
missing from its old GLB.

## Rebuild and review

1. `node scripts/products/build-diaphragm-cad-assets.cjs SOURCE BEFORE`
   imports only the named external-release STEP files. It never writes PDFs.
   Tessellation is 0.03 mm / 0.15 rad; coordinates and normals are rounded to
   five decimals. Keep `BEFORE` separate from production and candidates.
2. For each model, run `prune-valveless-hidden-faces.cjs --before BEFORE
   --after CANDIDATE --deps ISOLATED_NODE_MODULES --model SLUG`. This removes
   whole occluded BREP faces, retaining original face/mesh slots, normals,
   material metadata, hierarchy and dimension extrema.
3. Run `preserve-valveless-edges.cjs --before BEFORE --after CANDIDATE --model
   SLUG` for each model. Display edges must retain the original coordinates and
   order; naïve reconstruction introduces false seams at removed-face borders.
4. Bundle `review-valveless-meshes.js` with the **same Three.js installation as
   the viewer**. Explicit aliases are needed for both `three` (its module file)
   and `three/addons` (`examples/jsm`), because the root and viewer installations
   may differ. Serve it locally beside `/before/SLUG.json` and
   `/candidate/SLUG.json`. Use `?model=SLUG,...&views=128&size=1024&coverage=full`.
   The audit compares solid and edge renderings, checks the silhouette, and
   renders original face IDs. Full coverage requests restoration of any deleted
   face seen in the original ID image, even if the surface color matches.
5. Save the completed report; run `restore-valveless-reviewed-faces.cjs
   --before BEFORE --after CANDIDATE --report REPORT`. Regenerate edge patches
   after restoration, then repeat the visual review. Do not ship an unreviewed
   first pruning pass. Finite views are a regression check, not a mathematical
   proof for every possible zoom and viewpoint.
6. Run `audit-diaphragm-meshes.cjs --before BEFORE --after CANDIDATE
   --source-stats SOURCE_STATS`. Exact retained geometry, face metadata,
   transforms and bounds must pass. Tiny degenerate triangles already present
   in the baseline are reported separately and cannot increase or change.
7. After acceptance, run `pack-diaphragm-cad-assets.cjs CANDIDATE
   BEFORE/sources.json`, then `node scripts/products/solenoid-viewer/build.cjs`.
   Packaging checks all seven identities and triangle counts, gzip round trips
   and the static asset size limit before writing production files.

The viewer handles both raw gzip bytes and responses already decoded by a
hosting `Content-Encoding` header. Gzip reduces transfer size without changing
geometry. `sources.json` records source and deployed asset hashes.

## Display and acceptance

- Appearance follows the existing product photographs: dark pump heads and
  molded ports, silver brushed-motor cans with black rear caps, black brushless
  motors, silver fasteners and the DPGL800 motor mounting ring. Silver labels
  on photographs do not imply a silver brushless motor shell. STEP red/green/blue
  face colors remain engineering identifiers, never display colors.
- `solenoid-viewer/appearance-diaphragm-roles.js` maps original BREP face slots
  to reviewed component finishes, including mixed-component single meshes.
  The original imported JSON hashes document its exact source topology; face
  counts are checked at runtime. A replacement STEP requires a new appearance
  review. The viewer and visual audit share this mapping. It changes no vertex,
  normal, index, edge or PDF data. Finishes are visual, not material-grade claims.
- The supplied DPGL800 exterior model omits the separate metal quick-connect
  fittings visible in some photos. Do not color the whole molded port block
  silver or add unprovided geometry to imitate that configuration.
- Optimized models remain assembled: part hiding, section and wireframe modes
  are unavailable, since hidden contact faces have intentionally been removed.
- Keep rotation, fit, orthographic views, dimensions, solid/edges and fullscreen.
  Dimensions describe the source model envelope; mounting dimensions remain in
  the untouched 2D drawings.
- `solenoid-viewer/model-pose.js` normalizes the seven diaphragm assemblies to
  motor-up, pump-head-down display axes. The DPL30/60 source head twist is also
  removed; the DPGL800 heads spread horizontally. Front/side/reset views share
  the same rigid transform in both the viewer and visual audit. Display bounds
  are projected from original vertices along these axes, avoiding the inflated
  box obtained by rotating a source AABB. Geometry, finishes and 2D are unchanged.
- Verify all seven detail pages, a localized page and the original RPL/solenoid
  branches; verify 2D hashes and existing PDF links are unchanged.
- Preserve the original STEP/GLB/PDF files. Only the website-facing optimized
  gzip assets and shared viewer are replaced. Local acceptance is not a release.

## Accepted local snapshot — 2026-10-23

- Seven models: 3,241,124 → 1,852,258 triangles (42.85% fewer); 4,592 complete
  BREP faces removed. Five DPGL800 mesh slots become empty; slots remain stable.
- Each model was checked at 128 views in solid and edge modes at 1024×1024.
  Final accepted views have zero silhouette changes, zero color changes above
  8/255, and no deleted original face visible in the full-coverage ID pass.
- Independent geometry validation: 7/7 passed. Reconstructed display edges:
  all 64 mesh slots match original Float32 coordinates exactly.
- Nine existing diaphragm-pump 2D PDF files retain their original SHA256 hashes.
- Seven gzip resources decode to the audited JSON hashes. Same-source gzip
  transfer size totals 42.25 → 26.76 MB; this includes preserved display edges.

## Photo-based finish follow-up — 2026-10-23

- Replaced neutral shading with per-component finishes for all seven models.
  Mixed meshes use fixed original face slots. Brushed motor cans, screw heads,
  exposed shaft ends and bearings are metallic; black end caps and molded
  housings remain separate. No geometry was invented for photo-only fittings.
- Color contrast revealed tiny contact-face differences hidden by the neutral
  shading. Conservatively restored 141 original BREP faces and regenerated
  their original display edges. Final total: 1,902,241 triangles (41.31% below
  the source), 27,394,604 gzip bytes. This supersedes the initial neutral snapshot.
- Repeated 128-view comparisons for each model in solid and edge modes at
  1024×1024: zero changed pixels above 8/255 and zero silhouette changes.
  Independent retained-geometry and original-edge checks pass for all models.
- Product-photo color review passed for all seven models, including the small
  bearing and rear shaft finishes. Nine original PDF hashes remain unchanged.

## Upright display follow-up — 2026-10-23

- All seven default poses now place the motor above the pump head. Front and
  side views are aligned to the product; reset restores the upright isometric
  view. Added fit margin keeps upper and lower dimension labels inside the view.
- Independent matrix and envelope checks pass for all seven assemblies;
  transformed bounds match before and after mesh reduction. The eleven existing
  solenoid and RPL/DRPL poses retain their previous transform exactly.
- Each diaphragm model passed default, front, right and reset visual checks.
  The seven production geometry assets and nine original 2D PDFs are unchanged.
