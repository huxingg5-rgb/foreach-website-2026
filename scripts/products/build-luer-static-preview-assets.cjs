// Bake missing Luer artwork from the approved CAD once; listing/selection users
// only download WebP images. Run with the local site serving the public assets.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {chromium} = require('D:/Python313/Lib/site-packages/playwright/driver/package');
const sharp = require('sharp');
const root = path.resolve(__dirname, '../..');
const manifest = require('../../data/products/detail/luer-cad-manifest.json');
const missing = require('../../data/products/configurator/luer-preview-assets.json').missing;
const baseUrl = process.argv[2] || 'http://localhost:3000';
const assetBase = '/images/products/fittings/luer-fittings/assembly-static';
const temporary = 'E:/0_TemporaryAiKnowledgeBase/Output/Downloads/luer-static-preview-20261108';

async function main() {
  fs.mkdirSync(temporary, {recursive:true});
  const bundle = await require('esbuild').build({stdin:{contents:`
    import * as THREE from 'three';
    import {decodeCompactCad} from './compact-cad.js';
    import {luerPlacement,luerMeshColor} from './luer-assembly.js';
    window.bakeLuer = async (product,geometry) => {
      const response=await fetch(geometry.url);
      if(!response.ok) throw Error('CAD request '+response.status);
      const bytes=new Uint8Array(await response.arrayBuffer());
      const raw=bytes[0]===31&&bytes[1]===139
        ? new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer()) : bytes;
      const data=decodeCompactCad(raw),scene=new THREE.Scene(),group=new THREE.Group();
      const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});
      renderer.setSize(1500,1500);renderer.setPixelRatio(1);renderer.setClearColor(0xffffff,0);
      renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
      document.body.replaceChildren(renderer.domElement);
      for(const mesh of data.meshes){
        const shape=new THREE.BufferGeometry();
        shape.setAttribute('position',new THREE.Float32BufferAttribute(mesh.attributes.position.array,3));
        if(mesh.attributes.normal)shape.setAttribute('normal',new THREE.Float32BufferAttribute(mesh.attributes.normal.array,3));
        shape.setIndex(mesh.index.array);if(!mesh.attributes.normal)shape.computeVertexNormals();
        const material=new THREE.MeshStandardMaterial({color:luerMeshColor(product,mesh.name),roughness:.36,metalness:0,side:THREE.DoubleSide});
        group.add(new THREE.Mesh(shape,material));
      }
      const pose=luerPlacement(product);group.rotation.set(...pose.rotation,pose.order||'XYZ');group.position.set(...pose.position);scene.add(group);
      scene.add(new THREE.HemisphereLight(0xffffff,0x89909b,2.2));
      const key=new THREE.DirectionalLight(0xffffff,2);key.position.set(-20,35,50);scene.add(key);
      const fill=new THREE.DirectionalLight(0xffffff,.7);fill.position.set(25,-15,20);scene.add(fill);
      const bounds=new THREE.Box3().setFromObject(group,true),center=bounds.getCenter(new THREE.Vector3()),size=bounds.getSize(new THREE.Vector3());
      const span=Math.max(size.x,size.y)*1.12,camera=new THREE.OrthographicCamera(-span/2,span/2,span/2,-span/2,.1,300);
      camera.position.copy(center).add(new THREE.Vector3(0,0,100));camera.lookAt(center);camera.updateProjectionMatrix();
      renderer.render(scene,camera);
      const png=renderer.domElement.toDataURL('image/png');
      group.traverse(item=>{item.geometry?.dispose();item.material?.dispose()});renderer.dispose();
      return {png,bounds:{min:bounds.min.toArray(),max:bounds.max.toArray()}};
    };`,resolveDir:path.join(__dirname,'solenoid-viewer')},bundle:true,format:'iife',write:false});
  const browser = await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  const products = {};
  try {
    const page = await browser.newPage();
    await page.route('**/__luer_static_bake__',route=>route.fulfill({contentType:'text/html',body:'<!doctype html><style>html,body{margin:0;background:transparent}</style>'}));
    await page.goto(baseUrl+'/__luer_static_bake__');
    await page.addScriptTag({content:bundle.outputFiles[0].text});
    fs.mkdirSync(path.join(root,'public',assetBase),{recursive:true});
    for (const model of missing) {
      const product=manifest.products[model],geometry=manifest.geometries[product.geometryId];
      const baked=await page.evaluate(async ({product,geometry})=>window.bakeLuer(product,geometry),{product,geometry});
      const png=Buffer.from(baked.png.split(',')[1],'base64');
      fs.writeFileSync(path.join(temporary,model+'.png'),png);
      const url=assetBase+'/'+model.toLowerCase()+'-side.webp',file=path.join(root,'public',url);
      await sharp(png).webp({lossless:true}).toFile(file);
      const metadata=await sharp(file).metadata();
      if(metadata.format!=='webp'||metadata.width!==1500||metadata.height!==1500||!metadata.hasAlpha)throw Error('Invalid static sprite: '+model);
      products[model]={url,view:'assembly-side',bounds:baked.bounds,geometryId:product.geometryId,sourceSha256:geometry.sha256,
        imageSha256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')};
      console.log(JSON.stringify({model,bytes:fs.statSync(file).size,bounds:baked.bounds}));
    }
  } finally { await browser.close(); }
  fs.writeFileSync(path.join(root,'data/products/configurator/luer-static-preview-assets.json'),JSON.stringify({products},null,2)+'\n');
}
main().catch(error=>{console.error(error);process.exitCode=1});
