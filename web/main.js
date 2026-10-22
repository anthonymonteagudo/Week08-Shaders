import * as THREE from './vendor/three.module.js';
const $=id=>document.getElementById(id),q=new URLSearchParams(location.search);
if(q.has('embed'))document.body.classList.add('embed');
const lessons=await(await fetch('lessons/manifest.json',{cache:'no-store'})).json();
const [unrealLessons,slideMap]=await Promise.all(['Unreal/lessons.json','docs/lesson-slide-map.json'].map(async path=>(await fetch(path)).json()));
for(const l of lessons)$('lesson').add(new Option(l.id.slice(0,2)+' · '+l.title,l.id));
const renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.NoToneMapping;$('canvas').append(renderer.domElement);
const scene=new THREE.Scene();scene.background=new THREE.Color('#112a36');const camera=new THREE.PerspectiveCamera(35,1,.1,100);camera.position.set(0,0,5.5);
const brush=await new THREE.TextureLoader().loadAsync('web/assets/brush-mask.png');brush.colorSpace=THREE.NoColorSpace;brush.wrapS=brush.wrapT=THREE.RepeatWrapping;brush.anisotropy=renderer.capabilities.getMaxAnisotropy();
const baseTexture=await new THREE.TextureLoader().loadAsync('web/assets/color-grid.png');baseTexture.colorSpace=THREE.SRGBColorSpace;baseTexture.wrapS=baseTexture.wrapT=THREE.RepeatWrapping;baseTexture.anisotropy=renderer.capabilities.getMaxAnisotropy();
const defaults={Tiling:2,Speed:.12,Threshold:.45,RimPower:3,EdgeStrength:.8,TextureInfluence:.18};
const U={BaseTexture:{value:baseTexture},BrushTexture:{value:brush},Tint:{value:new THREE.Vector3(.12,.65,.48)},ShadowColor:{value:new THREE.Vector3(.035,.015,.12)},MidColor:{value:new THREE.Vector3(.70,.16,.18)},EdgeColor:{value:new THREE.Vector3(.04,.008,.12)},L:{value:new THREE.Vector3(-.45,.6,.7).normalize()},Seconds:{value:0}};
for(const[k,v]of Object.entries(defaults))U[k]={value:v};
const ranges={Tiling:[.5,6,.1],Speed:[-.5,.5,.01],Threshold:[0,1,.01],RimPower:[1,8,.1],EdgeStrength:[0,1,.05],TextureInfluence:[0,.4,.01]};
for(const[k,v]of Object.entries(defaults)){const label=document.createElement('label');label.dataset.control=k;label.innerHTML=k+' <output id="'+k+'Value">'+v+'</output><input aria-label="'+k+'" id="'+k+'" type="range" min="'+ranges[k][0]+'" max="'+ranges[k][1]+'" step="'+ranges[k][2]+'" value="'+v+'">';$('sliders').append(label);$(k).oninput=()=>{U[k].value=+$(k).value;$(k+'Value').textContent=$(k).value;};}
const colorDefaults=[['Tint','#7ce7b3'],['ShadowColor','#342263'],['MidColor','#da6f76'],['EdgeColor','#381563']];
const baselineButton=document.createElement('button');baselineButton.id='baseline';baselineButton.textContent='Show untinted source';$('reset').after(baselineButton);baselineButton.onclick=()=>{$('Tint').value='#ffffff';$('Tint').oninput();};
for(const [name,hex] of colorDefaults){const label=document.createElement('label');label.dataset.control=name;label.innerHTML=name+'<input type="color" aria-label="'+name+'" id="'+name+'" value="'+hex+'">';$('sliders').append(label);$(name).oninput=()=>{const c=new THREE.Color($(name).value);U[name].value.set(c.r,c.g,c.b);};$(name).oninput();}
let mesh=new THREE.Mesh(new THREE.PlaneGeometry(3,2),new THREE.MeshBasicMaterial()),current,paused=false,elapsed=0,last=performance.now(),shaderError='';scene.add(mesh);
const vertex=`varying vec2 vUV;varying vec3 vN,vP;void main(){vUV=uv;vN=mat3(modelMatrix)*normal;vP=(modelMatrix*vec4(position,1.0)).xyz;gl_Position=projectionMatrix*viewMatrix*vec4(vP,1.0);}`;
const wrap=code=>`uniform sampler2D BaseTexture,BrushTexture;uniform vec3 Tint,ShadowColor,MidColor,EdgeColor,L;uniform float Seconds,Tiling,Speed,Threshold,RimPower,EdgeStrength,TextureInfluence;varying vec2 vUV;varying vec3 vN,vP;void main(){vec2 UV=vUV;vec3 N=normalize(vN),V=normalize(cameraPosition-vP);${code}\ngl_FragColor=vec4(color,1.0);\n#include <colorspace_fragment>\n}`;
renderer.debug.onShaderError=(gl,p,v,f)=>{shaderError=gl.getShaderInfoLog(f)||gl.getProgramInfoLog(p)||'Shader error';};
function apply(){shaderError='';const old=mesh.material,next=new THREE.ShaderMaterial({uniforms:U,vertexShader:vertex,fragmentShader:wrap($('editor').value),side:THREE.DoubleSide});mesh.material=next;renderer.compile(scene,camera);renderer.render(scene,camera);if(shaderError){mesh.material=old;next.dispose();renderer.render(scene,camera);$('status').textContent='Previous working shader kept.\n'+shaderError;return;}old.dispose();$('status').textContent='GLSL compiled · HLSL is a reference for Unreal';}
let choiceSerial=0;
async function choose(id){const ticket=++choiceSerial;current=lessons.find(l=>l.id===id)||lessons[0];$('lesson').value=current.id;const base='lessons/'+current.id+'/';const [glsl,hlsl]=await Promise.all(['fragment.glsl','unreal-custom.hlsl'].map(async f=>(await fetch(base+f,{cache:'no-store'})).text()));if(ticket!==choiceSerial)return;$('editor').value=glsl;$('hlsl-code').textContent=hlsl;$('nodes').textContent=current.nodes;$('task').textContent=current.task;$('inputs').replaceChildren(...current.inputs.map(i=>{const li=document.createElement('li');li.textContent=i;return li;}));showLessonLinks(current.id,base);mesh.geometry.dispose();mesh.geometry=current.shape==='sphere'?new THREE.SphereGeometry(1,96,64):new THREE.PlaneGeometry(3,2);for(const e of document.querySelectorAll('[data-control]'))e.hidden=!glsl.includes(e.dataset.control);elapsed=0;apply();if(q.has('tint')&&current.id==='01_color'){U.Tint.value.fromArray(q.get('tint').split(',').map(Number));}if(q.has('still')){paused=true;U.Seconds.value=+q.get('still');}if(q.has('capture'))document.body.classList.add('capture');}
$('lesson').onchange=()=>{baselineButton.hidden=$('lesson').value!=='01_color';choose($('lesson').value);};$('reload').onclick=()=>choose(current.id);$('apply').onclick=apply;$('pause').onclick=()=>{paused=!paused;$('pause').textContent=paused?'Resume motion':'Pause motion';};$('reset').onclick=()=>{for(const[k,v]of Object.entries(defaults)){U[k].value=v;$(k).value=v;$(k+'Value').textContent=v;}for(const[name,hex]of colorDefaults){$(name).value=hex;$(name).oninput();}elapsed=0;};
for(const b of document.querySelectorAll('[data-view]'))b.onclick=()=>{for(const id of ['graph','glsl','hlsl'])$(id).hidden=id!==b.dataset.view;for(const x of document.querySelectorAll('[data-view]'))x.setAttribute('aria-pressed',String(x===b));};
new ResizeObserver(()=>{const h=$('canvas');renderer.setSize(h.clientWidth,h.clientHeight,false);camera.aspect=h.clientWidth/h.clientHeight;camera.updateProjectionMatrix();}).observe($('canvas'));
await choose(q.get('lesson')||lessons[0].id);
baselineButton.hidden=current.id!=='01_color';
function frame(now){if(!paused)elapsed+=Math.min((now-last)/1000,.05);last=now;U.Seconds.value=q.has('still')?+q.get('still'):elapsed;renderer.render(scene,camera);requestAnimationFrame(frame);}requestAnimationFrame(frame);

function showLessonLinks(id,base){
  const files=$('lesson-files');files.replaceChildren();
  for(const [file,label] of [['fragment.glsl','GLSL file'],['unreal-custom.hlsl','HLSL file']]){const a=document.createElement('a');a.href=base+file;a.textContent=label;if(files.childNodes.length)files.append(' · ');files.append(a);}
  const host=$('lesson-links');host.replaceChildren();
  for(const entry of unrealLessons.filter(e=>e.lesson===id)){const p=document.createElement('p'),c=document.createElement('code');c.textContent=entry.instance;p.append(entry.implementation+': ',c);host.append(p);}
  const p=document.createElement('p');p.append('Lecture: ');
  for(const entry of slideMap.find(e=>e.lesson===id)?.slides||[]){const a=document.createElement('a');a.href='docs/slides/index.html#'+entry.number;a.textContent=entry.number+' · '+entry.title;p.append(a,' ');}
  host.append(p);
}
