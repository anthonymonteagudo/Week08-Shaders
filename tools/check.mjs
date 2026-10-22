import fs from 'node:fs/promises';
const lessons=JSON.parse(await fs.readFile('lessons/manifest.json'));
for(const l of lessons)for(const f of ['fragment.glsl','unreal-custom.hlsl'])await fs.access(`lessons/${l.id}/${f}`);
for(const f of ['web/vendor/three.module.js','web/vendor/three.core.js','web/assets/brush-mask.png','web/assets/color-grid.png','index.html','Unreal/lessons.json'])await fs.access(f);
console.log(`Checked ${lessons.length} shader pairs and runtime assets.`);
