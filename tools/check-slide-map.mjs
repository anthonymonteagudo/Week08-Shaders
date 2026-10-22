import fs from 'node:fs/promises';
import crypto from 'node:crypto';
const map=JSON.parse(await fs.readFile('docs/lesson-slide-map.json','utf8'));
const slides=JSON.parse(await fs.readFile('docs/slides/slides.json','utf8'));
for(const entry of map){
  for(const [file,key] of [['fragment.glsl','glslSha256'],['unreal-custom.hlsl','hlslSha256']]){
    const bytes=await fs.readFile(`lessons/${entry.lesson}/${file}`);
    if(crypto.createHash('sha256').update(bytes).digest('hex')!==entry[key])throw new Error(`Lecture source map needs updating: ${entry.lesson}/${file}`);
  }
  for(const ref of entry.slides){
    const slide=slides[ref.number-1];
    if(slide?.id!==ref.id||slide.lesson!==entry.lesson)throw new Error(`Slide reference drift: ${entry.lesson}, slide ${ref.number}`);
  }
}
console.log(`Checked ${map.length} source pairs and their lecture references.`);
