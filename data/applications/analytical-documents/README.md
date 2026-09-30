# English analytical application documents

This collection replaces only the English analytical-instruments entry and adds its piston-pump guides. Chinese and other locale application content continue to use their existing routes and data. Other application industries are not part of this collection.

## One source of truth per responsibility

- `registry.ts`: small navigation, URL, title, description and search manifest. Safe for client imports; never put article bodies here.
- `en/*.ts`: full structured document content, numerical examples, source references and relevant links.
- `types.ts`: supported content blocks and document contracts.
- `services/applications/analytical-documents.ts`: server-side body loaders, metadata and structured data generated from the same registry.
- `components/applications/analytical-documents/`: shared server-rendered document template, scoped styling, and small client enhancements for the outline and citations.
- `app/[locale]/applications/analytical-instruments/[slug]/page.tsx`: enumerates only registered English documents; unsupported locale/slug combinations are not generated.

The hub links directly to every guide. Each guide has a distinct URL at the same route depth; task URLs do not need to be nested under the piston overview. Hashes identify sections within a document, not separate articles.

## Adding a guide within an approved scope

1. Add unique metadata to the registry and a typed body to `en/`.
2. Add its explicit server loader. Do not import all bodies into the header, search bundle or a client component.
3. Give each section and reference a stable unique ID. Cite references by ID rather than writing display numbers by hand.
4. Keep tables rectangular, with descriptive captions and column headings. Use normal paragraphs for reasoning; reserve tables for genuine comparisons.
5. Separate component specifications, measured system results, third-party method requirements and calculated design examples. State the liquid, working volume, test conditions and configuration that make numerical claims meaningful.
6. Link only to existing products, guides and source documents. Never invent translations or apply competitor performance numbers to FOREACH products.

Core body content, tables, navigation and reference entries are rendered in initial HTML. References use a native `details` disclosure; expansion must not fetch their content. Client behavior is enhancement only. Links use real `href` values, and document-to-document prefetching is disabled to avoid fetching every long guide at once.

Reuse the existing `SiteBreadcrumb` without local visual overrides. The global layout owns the selection-list (`List`) and back-to-top (`Top`) controls; do not recreate, restyle or duplicate them in an application document. Keep document typography selectors outside shared-component boundaries.

The approved Chinese H5 prototype remains the visual source for the document area: three-column layout, title before document type, numbered sections, grouped product/task navigation, table rules, highlighted flow nodes and compact references. Translate and integrate that presentation; do not redesign it or shorten its engineering content to fit a new visual concept.

## Validation

```text
node node_modules/tsx/dist/cli.mjs scripts/seo/check-analytical-applications.ts
node node_modules/typescript/bin/tsc --noEmit --pretty false
node --import tsx scripts/search/generate-global-search-overlay-index.ts --locales=en
```

After the existing Cloudflare static-build, URL-normalization and sitemap-generation pipeline:

```text
node node_modules/tsx/dist/cli.mjs scripts/seo/check-analytical-applications.ts --out out
```

Also review desktop and mobile rendering, long tables, native reference expansion, direct citation hashes, outline navigation and the initial header contrast. Compare changes with the task's pre-edit snapshot to ensure other languages and industries remain unchanged. Passing local checks does not deploy the site or demonstrate Google indexing/Core Web Vitals.
