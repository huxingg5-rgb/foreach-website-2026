/* Import the FIT delivery without changing originals. 2D geometry is shared
 * across material/colour variants; thread, bore, shape and length stay distinct.
 * node scripts/products/import-shared-fitting-drawings.cjs <xlsx> <source> <report-dir> [--write]
 */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const XLSX = require('xlsx');
const root = path.resolve(__dirname, '../..');
const canonicalModel = value => String(value || '').normalize('NFKC').toUpperCase()
  .match(/[A-Z0-9]+(?:-[A-Z0-9/]+)+/g)?.at(-1) || '';
const slugify = value => String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
function geometryKey(model) {
  const value = canonicalModel(model);
  // S/L is the body length. P/S, M/N and V/X must remain distinct.
  if (/^Q(?:20|40|60)/.test(value)) return value.replace(/-([SL])(?:AC|PP)[A-Z]$/, '-$1');
  return value.replace(/-(?:PP|PA|PV|PK|PEEK|PS|ET|AC|SS|PT|PU|EP)-[A-Z]$/, '');
}
const sha = buffer => crypto.createHash('sha256').update(buffer).digest('hex');
const read = name => JSON.parse(fs.readFileSync(path.join(root, name), 'utf8'));
function walk(directory) {
  return fs.readdirSync(directory, {withFileTypes:true}).flatMap(entry => entry.isDirectory()
    ? walk(path.join(directory, entry.name)) : /\.pdf$/i.test(entry.name) ? [path.join(directory, entry.name)] : []);
}
function main(args) {
  const [workbookPath, sourceRoot, reportDirectory] = args;
  if (!reportDirectory) throw Error('Workbook, source directory and report directory are required');
  const write = args.includes('--write');
  const workbook = XLSX.readFile(workbookPath);
  const sheetFamilies = [
    ['01_', 'hard-tube-fittings'], ['02_', 'barbed-fittings'], ['03_', 'luer-fittings'],
    ['04_', 'quick-connect-fittings'], ['05_', 'thread-to-barbed-fittings'],
    ['07_', 'female-thread-adapters'], ['08_', 'bulkhead-barbed-fittings'],
  ];
  const files = walk(sourceRoot).sort();
  const byPart = new Map(), byName = new Map();
  const sources = {};
  for (const file of files) {
    const relative = path.relative(sourceRoot, file);
    const folder = relative.split(path.sep)[0].match(/^\d+/)?.[0];
    if (!folder) throw Error(`Unexpected source folder: ${relative}`);
    const url = `/downloads/products/fittings/2d-drawings/${folder}/${path.basename(file).toLowerCase()}`;
    const buffer = fs.readFileSync(file);
    if (buffer.subarray(0,5).toString() !== '%PDF-') throw Error(`Invalid PDF: ${file}`);
    const source = {url, folder, file:relative.replaceAll('\\', '/'), sha256:sha(buffer), bytes:buffer.length};
    sources[url] = source;
    const part = path.basename(file).match(/\d{3}-\d{2}-\d{5}/)?.[0];
    if (part) { const list = byPart.get(part) || []; list.push(source); byPart.set(part,list); }
    byName.set(`${folder}/${path.basename(file).toLowerCase()}`, source);
    if (write) {
      const target = path.join(root, 'public', url);
      fs.mkdirSync(path.dirname(target), {recursive:true});
      if (!fs.existsSync(target) || sha(fs.readFileSync(target)) !== source.sha256) fs.writeFileSync(target, buffer);
    }
  }
  const reviewedQuick = read('data/products/detail/quick-connect-cad-source-map.json');
  const reviewedByModel = new Map(reviewedQuick.records.map(row => [row.model, row]));
  const warnedQuick = new Set((reviewedQuick.sourceWarnings || []).map(row => row.model));
  const rows = [];
  for (const [prefix, family] of sheetFamilies) {
    const folder = {'01_':'01','02_':'02','03_':'03','04_':'04','05_':'05','07_':'06'}[prefix];
    const inFolder = list => list?.filter(source => !folder || source.folder === folder);
    const sheet = workbook.SheetNames.find(name => name.startsWith(prefix));
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {header:1,defval:''});
    for (const [index, row] of data.entries()) {
      const model = canonicalModel(row[3]), part = String(row[2]).trim(), code = String(row[4]).trim();
      if (index < 2 || !model || !/^\d{6}$/.test(code) || !part) continue;
      const reviewed = family === 'quick-connect-fittings' ? reviewedByModel.get(model) : undefined;
      // Several BL/BBL elbows were delivered under 05 rather than 02.
      // Prefer the expected folder when duplicate part numbers exist; otherwise
      // accept the unique exact workbook part across the entire delivery.
      const local = inFolder(byPart.get(part)) || [];
      const exact = local.length ? local : byPart.get(part) || [];
      const alias = !exact.length && /^443-/.test(part) ? byPart.get(part.replace(/^443-/, '433-')) || [] : [];
      const candidates = reviewed ? [byName.get(`04/${reviewed.pdf.toLowerCase()}`)].filter(Boolean) : (exact.length ? exact : alias);
      if (new Set(candidates.map(item=>item.sha256)).size > 1) throw Error(`Ambiguous source part: ${part}`);
      rows.push({family, model, slug:slugify(model), code, part, sheet, row:index+1,
        key:geometryKey(model), source:candidates[0],
        priority:reviewed ? (warnedQuick.has(model)?4:0) : exact.length ? 1 : 2,
        match:reviewed?'reviewed-model':exact.length?'workbook-part':alias.length?'workbook-part-433-alias':null});
    }
  }
  const groups = new Map();
  for (const row of rows.filter(row=>row.source)) {
    const key = `${row.family}:${row.key}`;
    if (!groups.has(key) || groups.get(key).priority > row.priority) groups.set(key,row);
  }
  const products = {}, missing = [], coverage = {};
  for (const [,family] of sheetFamilies) {
    products[family] = {};
    const details = read(`data/products/generated/fittings/${family}/detail/index.json`);
    for (const detail of details) {
      const key = geometryKey(detail.model);
      const selected = groups.get(`${family}:${key}`);
      if (selected) products[family][detail.slug] = {geometryKey:key, url:selected.source.url};
      else {
        const existingUrl = detail.drawing2dUrl || detail.drawingPdfUrl || detail.drawingUrl || '';
        const existingAvailable = !!existingUrl && fs.existsSync(path.join(root,'public',existingUrl.split('#')[0]));
        missing.push({family, slug:detail.slug, model:detail.model, existingUrl, existingAvailable});
      }
    }
    // Include catalogue variants independently of whether a detail route exists yet.
    for (const row of rows.filter(row=>row.family===family)) {
      const selected = groups.get(`${family}:${row.key}`);
      if (selected) products[family][row.slug] = {geometryKey:row.key, url:selected.source.url};
    }
    coverage[family] = {detailModels:details.length,
      matchedDetails:details.filter(detail=>products[family][detail.slug]).length,
      catalogueModels:Object.keys(products[family]).length,
      sharedDrawings:new Set(Object.values(products[family]).map(product=>product.url)).size};
  }
  const manifest = {schemaVersion:1, products};
  if (write) fs.writeFileSync(path.join(root,'data/products/detail/fitting-drawing-manifest.json'), JSON.stringify(manifest,null,2)+'\n');
  const used = new Set(Object.values(products).flatMap(family=>Object.values(family).map(product=>product.url)));
  const report = {sourcePdfCount:files.length, coverage, missing, sharedDrawingCount:used.size,
    sources:Object.values(sources), matches:rows.filter(row=>row.source).map(row=>({...row,source:row.source.file})),
    unavailableDetails:missing.filter(item=>!item.existingAvailable),
    unusedForCurrentGeometry:Object.values(sources).filter(source=>!used.has(source.url)),
    sourceWarnings:reviewedQuick.sourceWarnings || []};
  fs.mkdirSync(reportDirectory,{recursive:true});
  fs.writeFileSync(path.join(reportDirectory,'fitting-2d-import.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify({write, sourcePdfCount:files.length, coverage, sharedDrawings:used.size, missing:missing.length},null,2));
}
module.exports = {geometryKey};
if (require.main === module) main(process.argv.slice(2));
