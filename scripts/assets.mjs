import fs from 'node:fs/promises';import sharp from 'sharp';
const manifest={};
for(const p of ['home','eventtechnik','dekoration']){
 const {images}=JSON.parse(await fs.readFile(`reference/${p}.json`,'utf8'));
 for(let i=0;i<images.length;i++){
 const source=images[i].srcset.match(/https:[^ ]+/)[0];const tail=source.match(/\/image\/[0-9].+$/)[0];const id=i===0?'logo':`${p}-${i}`;
 const url='https://storage.e.jimdo.com/cdn-cgi/image/quality=90,fit=scale-down,width=1600'+tail;
 if(manifest[id])continue;
 const r=await fetch(url);if(!r.ok)throw Error(r.status+' '+url);
 const bytes=Buffer.from(await r.arrayBuffer());
 const meta=await sharp(bytes).metadata();
 for(const width of [480,960,1600])await sharp(bytes).resize({width,withoutEnlargement:true}).webp({quality:84}).toFile(`assets/${id}-${width}.webp`);
 manifest[id]={source:url,width:meta.width,height:meta.height};
 console.log(id,meta.width,meta.height);
 }
}
await fs.writeFile('reference/assets.json',JSON.stringify(manifest,null,2));
