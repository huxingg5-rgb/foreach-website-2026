// Preserve the existing photographs; normalize new card/detail canvases only.
const sharp=require('sharp'),path=require('node:path');
const dir=path.resolve('public/images/products/valves/solenoid-valves');
const inputs={
 '3-way-base':'foreach-sv10-3-way-base-main.webp',
 '3-way-barbed':'foreach-sv10-3-way-barbed-ports.webp',
 // User-supplied valve-seat photographs are already normalized square masters.
 '3-way-threaded':'foreach-sv10-3-way-threaded-main.webp',
 '2-way-base':'foreach-sv10-2-way-base-seals.webp',
 '2-way-barbed':'foreach-sv10-2-way-barbed-ports.webp',
 '2-way-threaded':'foreach-sv10-2-way-threaded-main.webp',
};
// Card covers must use the original photos, never padded detail masters.
const cardSources = {
 '3-way-barbed': path.join(__dirname, 'image-sources/solenoid-valves/3-way-barbed.webp'),
 '3-way-base': path.join(__dirname, 'image-sources/solenoid-valves/3-way-base.webp'),
 '2-way-threaded': path.join(__dirname, 'image-sources/solenoid-valves/2-way-threaded.webp'),
 '3-way-threaded': path.join(__dirname, 'image-sources/solenoid-valves/3-way-threaded.webp'),
};
const selectedSlugs = process.argv.slice(2);
const galleryAssets = {
 '3-way-base-ports-closeup': {
  source: path.join(__dirname, 'image-sources/solenoid-valves/3-way-base-ports-closeup.jpg'),
  output: 'foreach-sv10-p-3-base-ports-closeup.webp',
 },
 '3-way-barbed-ports-closeup': {
  source: path.join(__dirname, 'image-sources/solenoid-valves/3-way-barbed-ports-closeup.jpg'),
  output: 'foreach-sv10-b16-3-barbed-ports-closeup.webp',
 },
 '2-way-no-base-ports': {
  source: path.join(__dirname, 'image-sources/solenoid-valves/2-way-no-base-ports.png'),
  output: 'foreach-sv10-p-2-normally-open-base-ports.webp',
 },
};
for (const slug of selectedSlugs) {
 if (!Object.hasOwn(inputs, slug) && !Object.hasOwn(galleryAssets, slug)) throw new Error(`Unknown solenoid image configuration: ${slug}`);
}
(async()=>{
 for (const [slug, asset] of Object.entries(galleryAssets)) {
  if (selectedSlugs.length && !selectedSlugs.includes(slug)) continue;
  await sharp(asset.source).resize(1500,1500,{fit:'contain',background:'#fff'}).webp({quality:95}).toFile(path.join(dir,asset.output));
 }
 for(const [slug,file] of Object.entries(inputs)){
 if (selectedSlugs.length && !selectedSlugs.includes(slug)) continue;
 for(const [kind,width] of [['main',1500],['card',2000]]){
  // The 3-way barbed detail photo is maintained independently of its card source.
  if (slug === '3-way-barbed' && kind === 'main') continue;
  if (file === `foreach-sv10-${slug}-${kind}.webp`) continue;
  const source = kind === 'card' && cardSources[slug] ? cardSources[slug] : path.join(dir,file);
  await sharp(source).resize(width,1500,{fit:'contain',background:'#fff'}).webp({quality:cardSources[slug] ? 95 : 90}).toFile(path.join(dir,`foreach-sv10-${slug}-${kind}.webp`));
 }
}console.log('Selected WebP assets ready: details 1500x1500; cards 2000x1500; existing square masters preserved');})().catch(e=>{console.error(e);process.exitCode=1;});
