# IVD localized content

The five dictionaries (`en`, `es`, `fr`, `ko`, `ru`) cover the 59 existing IVD documents. Chinese routes and source documents retain their existing content.

Dictionary keys are the stable decimal indexes in `source-strings.json`. Do not reorder or regenerate that array in place: append new source strings and add the corresponding entries to every dictionary. The loader rejects untranslated Chinese or missing entries so a source edit cannot silently leak into a foreign-language page.

`services/applications/ivd-localized.ts` preserves document and section IDs, table structure, reference IDs and local route identities. It adds locale-specific page metadata, navigation, product mentions and contextual technical reading. `reading.ts` uses published local article slugs; `product-links.ts` uses the local product-route data.

## Editorial corrections applied to the five translations

- Molecular-diagnostics recovery text identifies extracted nucleic acid or nucleic acid eluate, avoiding confusion with amplified products.
- Source index 1511 explicitly separates pre-amplification work from post-amplification areas, and separates eluate reception from higher-contamination sample paths.
- Source index 1387 makes reagent routing method-dependent and requires compatibility, displacement and residual checks when a flow path is shared. It does not require every instrument to use an independent path for each reagent.
- Capacity, step resolution, accuracy, actual delivery and assay results remain distinct. Valve-port counts are not treated as independent metering-channel counts.
- Alarm/recovery paragraphs at indexes 950, 955, 962, 966, 1348 and 1351 distinguish measured, estimated and unknown liquid volumes. Command completion does not establish actual liquid delivery.
- Low remaining sample volume is identified as liquid remaining in the source container, rather than a small commanded dose or a small-capacity container.

Run `npx tsx scripts/applications/check-ivd-locales.ts` after content edits. The check covers translation completeness, document structure, references, internal language consistency, local article destinations and metadata. It does not replace rendered-page review or installed-instrument validation.
