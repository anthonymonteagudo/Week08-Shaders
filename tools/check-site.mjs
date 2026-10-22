import fs from 'node:fs/promises';
import path from 'node:path';

// Keep one route through the course and catch stale guide links before publishing.
const root=process.cwd(), guides=['activities.html','class-guide.html','dig-deeper.html','functions.html'];
const actual=(await fs.readdir('docs')).filter(f=>f.endsWith('.html')).sort();
if(JSON.stringify(actual)!==JSON.stringify(guides))throw Error('Student guide set changed; consolidate existing pages first.');
async function walk(dir){const out=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){if(e.name==='.git')continue;const p=path.join(dir,e.name);out.push(...(e.isDirectory()?await walk(p):[p]));}return out;}
const files=await walk(root), html=files.filter(p=>p.endsWith('.html'));
let checked=0;
for(const file of html){
  const source=await fs.readFile(file,'utf8');
  for(const m of source.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)){
    const url=m[1];if(/^(?:[a-z]+:|\/\/)/i.test(url))continue;
    const [raw,anchor]=url.split('#'),rel=decodeURIComponent(raw.split('?')[0]);
    let target=rel?path.resolve(path.dirname(file),rel):file;
    if(!(target===root||target.startsWith(root+path.sep)))throw Error(`Link escapes student repo: ${url}`);
    const stat=await fs.stat(target).catch(()=>null);if(!stat)throw Error(`${path.relative(root,file)}: missing ${url}`);
    if(stat.isDirectory())target=path.join(target,'index.html');
    const bytes=await fs.readFile(target);
    if(anchor&&target.endsWith('.html')&&!/\/slides\/index\.html$/.test(target.replaceAll('\\','/'))){
      const ids=[...bytes.toString().matchAll(/\bid=["']([^"']+)["']/g)].map(x=>x[1]);
      if(!ids.includes(decodeURIComponent(anchor)))throw Error(`${path.relative(root,file)}: missing anchor ${url}`);
    }
    checked++;
  }
}
const readmes=files.filter(p=>path.basename(p)==='README.md');
if(readmes.length!==1)throw Error('Keep setup instructions in the root README.');
console.log(`Checked ${checked} local links and the four-page guide structure.`);
