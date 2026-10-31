const planets=[
['Mercury','The swiftest world','TERRESTRIAL PLANET','#9c948d','mercury','The smallest planet hugs the Sun in a swift, 88-day orbit. Its ancient, cratered surface records billions of years of impacts, while its almost airless skies leave it exposed to extreme temperature swings.','4,879','57.9','88 days','0.38','Despite being closest to the Sun, Mercury is not the hottest planet. Its nights can fall to about −180°C.'],
['Venus','Beauty with a fierce heart','TERRESTRIAL PLANET','#d7b281','venus','Wrapped in thick clouds of sulfuric acid, Venus hides a rocky, volcanic landscape. Its dense carbon dioxide atmosphere traps heat in an intense greenhouse effect, making it the hottest planet in our solar system.','12,104','108.2','225 days','0.90','Venus spins so slowly that one rotation takes longer than its entire journey around the Sun.'],
['Earth','Our pale blue home','TERRESTRIAL PLANET','#74a8cf','earth_daymap','A world of liquid oceans, shifting continents, and a life-sustaining atmosphere. Earth is the only planet known to harbor life — a remarkable oasis in the vastness of space, and the place we all call home.','12,742','149.6','365.25 days','1.00','About 71% of Earth’s surface is covered by water. Its oceans help regulate the climate and support an extraordinary diversity of life.'],
['Mars','The red planet','TERRESTRIAL PLANET','#c87854','mars','Rust-colored dust gives Mars its unmistakable glow. This cold desert world holds giant volcanoes, deep canyons, and evidence of rivers that flowed long ago. Today, robots explore its surface in search of clues to its watery past.','6,779','227.9','687 days','0.38','Olympus Mons is the largest known volcano in the solar system, towering roughly 22 kilometers above its surrounding plains.'],
['Jupiter','King of the planets','GAS GIANT','#c6ab8b','jupiter','More massive than all the other planets combined, Jupiter is a world of swirling clouds and powerful storms. Beneath its banded atmosphere lies a vast interior of hydrogen and helium, compressed by immense pressure.','139,820','778.6','11.86 years','2.53','The Great Red Spot is a colossal storm that has been observed for centuries. Its winds race around an eye wider than Earth.'],
['Saturn','The ringed wonder','GAS GIANT','#d9c28d','saturn','Saturn’s brilliant rings are made of countless fragments of ice and rock. This pale golden giant is mostly hydrogen and helium, with fast winds sweeping its upper atmosphere into delicate bands.','116,460','1,433.5','29.45 years','1.07','Saturn’s average density is lower than water. Its magnificent rings spread far outward but are remarkably thin.'],
['Uranus','A world turned sideways','ICE GIANT','#91cdd4','uranus','Cool blue-green Uranus rolls around the Sun on its side. Methane in its atmosphere absorbs red light, giving the planet its soft cyan hue. Beneath the clouds, a dense fluid interior surrounds a rocky core.','50,724','2,872.5','84 years','0.89','With an axial tilt of about 98 degrees, Uranus experiences extreme seasons that last more than twenty Earth years.'],
['Neptune','Beyond the blue','ICE GIANT','#557dc5','neptune','Dark, cold, and swept by supersonic winds, Neptune guards the outer reaches of the planetary realm. Its methane-rich atmosphere hosts shifting clouds and enormous storms, far from the warmth of the Sun.','49,244','4,495.1','164.8 years','1.14','Neptune’s winds can exceed 2,000 kilometers per hour — the fastest measured on any planet in our solar system.']];
const $=id=>document.getElementById(id);let selected=2,paused=matchMedia('(prefers-reduced-motion: reduce)').matches,angle=0;const textures=[],planetImages=[];let texture=null;const canvas=$('planet'),ctx=canvas.getContext('2d');
planets.forEach((p,i)=>{const b=document.createElement('button');b.innerHTML=`<span class="dot" style="--color:${p[3]}"></span>${p[0]}`;b.onclick=()=>select(i);$('navigation').append(b);const c=document.createElement('button');c.className='card';c.style.setProperty('--color',p[3]);c.style.setProperty('--texture',`url(assets/${p[4]}.jpg)`);c.innerHTML=`<div class="mini"></div><span>${p[0]}</span><small>0${i+1} / ${i<4?'ROCKY':'GIANT'}</small>`;c.onclick=()=>{select(i);$('navigation').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});};$('cards').append(c);const img=new Image();planetImages[i]=img;img.onload=()=>{const t=document.createElement('canvas');t.width=2048;t.height=1024;const x=t.getContext('2d',{willReadFrequently:true});x.drawImage(img,0,0,2048,1024);textures[i]=x.getImageData(0,0,2048,1024);if(i===selected)texture=textures[i];};img.src=`assets/${p[4]}.jpg`;});
function select(i){selected=(i+8)%8;const p=planets[selected];texture=textures[selected];$('name').textContent=p[0];$('kind').textContent=p[2];$('number').textContent=`0${selected+1} / 08`;$('ordinal').textContent=`0${selected+1}`;$('tagline').textContent=p[1];$('description').textContent=p[5];$('insight').textContent=p[10];$('planet').setAttribute('aria-label',`${p[0]}, rotating textured planet illustration`);$('stats').innerHTML=[['DIAMETER',p[6],'km'],['DISTANCE FROM SUN',p[7],'million km'],['ORBITAL PERIOD',p[8],''],['SURFACE GRAVITY',p[9],'× Earth']].map(s=>`<div class="stat"><label>${s[0]}</label><strong>${s[1]}</strong><small>${s[2]}</small></div>`).join('');[...$('navigation').children].forEach((b,j)=>{b.classList.toggle('active',j===selected);b.setAttribute('aria-current',j===selected?'true':'false');});[...$('cards').children].forEach((b,j)=>b.classList.toggle('active',j===selected));history.replaceState(null,'','#'+p[0].toLowerCase());}
$('prev').onclick=()=>select(selected-1);$('next').onclick=()=>select(selected+1);const initial=planets.findIndex(p=>p[0].toLowerCase()===location.hash.slice(1));select(initial>=0?initial:2);
function updateMotion(){$('rotation').textContent=paused?'▶':'Ⅱ';$('rotation').setAttribute('aria-label',paused?'Resume planet rotation':'Pause planet rotation');$('rotation').setAttribute('aria-pressed',String(paused));$('motion-label').textContent=paused?'ROTATION PAUSED':'LIVE ROTATION';}updateMotion();$('rotation').onclick=()=>{paused=!paused;updateMotion();};
// Precompute sphere geometry; reuse pixel buffers so rotation stays smooth.
const size=innerWidth<650?440:640,off=document.createElement('canvas');
off.width=off.height=size;const ox=off.getContext('2d'),frame=ox.createImageData(size,size),map=[];
const radius=size*.465;
for(let y=0;y<size;y++)for(let x=0;x<size;x++){
 const nx=(x+.5-size/2)/radius,ny=(y+.5-size/2)/radius,r=nx*nx+ny*ny;
 if(r<=1){const z=Math.sqrt(1-r),light=-nx*.72-ny*.23+z*.655;
 map.push([4*(y*size+x),Math.atan2(nx,z)/(2*Math.PI),Math.asin(ny)/Math.PI+.5,light,z,Math.pow(Math.max(0,-nx*.397-ny*.127+z*.909),65),Math.min(1,(1-r)*radius*1.3)]);}
}
const layers={};
for(const [key,url]of Object.entries({clouds:'earth-clouds',night:'earth-night'})){
 const img=new Image();img.onload=()=>{const t=document.createElement('canvas');t.width=2048;t.height=1024;const c=t.getContext('2d',{willReadFrequently:true});c.drawImage(img,0,0,2048,1024);layers[key]=c.getImageData(0,0,2048,1024).data;};img.src=`assets/${url}.jpg`;
}
canvas.width=canvas.height=1000;ctx.setTransform(1000/700,0,0,1000/700,0,0);
const atmosphereColors={1:[240,184,102],2:[65,149,255],3:[210,112,65],4:[155,150,143],5:[205,181,131],6:[112,230,232],7:[65,117,239]};
function rings(front,r){
 ctx.save();ctx.translate(350,350);ctx.rotate(-.38);ctx.scale(1,.36);
 for(let n=1.24;n<2.06;n+=.004){
  if(n>1.72&&n<1.78)continue; // Cassini division
  const band=n<1.48?.19:n<1.72?.77:.44;
  const detail=.68+.22*Math.sin(n*390)+.1*Math.sin(n*977);
  const v=170+Math.sin(n*53)*22;
  ctx.strokeStyle=`rgba(${v+38},${v+22},${v-7},${band*detail})`;ctx.lineWidth=r*.005;
  ctx.beginPath();ctx.arc(0,0,r*n,front?0:Math.PI,front?Math.PI:Math.PI*2);ctx.stroke();
 }
 ctx.restore();
}
function draw(){
 ctx.clearRect(0,0,700,700);const earth=selected===2,saturn=selected===5,R=saturn?156:278;
 const tint=atmosphereColors[selected];
 if(tint){const a=ctx.createRadialGradient(350,350,R*.995,350,350,R*1.025);a.addColorStop(0,`rgba(${tint},0)`);a.addColorStop(.35,`rgba(${tint},${earth?.17:.065})`);a.addColorStop(1,`rgba(${tint},0)`);ctx.fillStyle=a;ctx.fillRect(350-R*1.07,350-R*1.07,R*2.14,R*2.14);}
 if(saturn)rings(false,R);
 if(texture){
  const td=texture.data,fd=frame.data,clouds=layers.clouds,night=layers.night,spin=(angle+.5)%1;
  for(let j=0;j<map.length;j++){
   const [idx,u,v,light,z,spec,alpha]=map[j],tx=((Math.floor((u+spin)*2048)%2048)+2048)%2048,ty=Math.min(1023,Math.floor(v*1024)),ti=4*(ty*2048+tx);
   const lit=.012+.988*Math.pow(Math.max(0,light),.75);
   let red=td[ti]*lit,green=td[ti+1]*lit,blue=td[ti+2]*lit;
   if(earth){
    const nightWeight=Math.max(0,Math.min(1,-light*5));
    if(night){red+=night[ti]*nightWeight*.85;green+=night[ti+1]*nightWeight*.8;blue+=night[ti+2]*nightWeight*.65;}
    if(td[ti+2]>td[ti]*1.22){red+=spec*125;green+=spec*145;blue+=spec*160;}
    if(clouds){const cu=((Math.floor((u+spin+angle*.13)*2048)%2048)+2048)%2048,ci=4*(ty*2048+cu),c=Math.max(0,(clouds[ci]-38)/217)*.85;
     red=red*(1-c)+244*lit*c;green=green*(1-c)+248*lit*c;blue=blue*(1-c)+255*lit*c;}
   }
   if(tint){const scatter=Math.pow(1-z,3)*Math.max(0,light+.2)*(earth?.58:.2);red+=tint[0]*scatter;green+=tint[1]*scatter;blue+=tint[2]*scatter;}
   fd[idx]=red;fd[idx+1]=green;fd[idx+2]=blue;fd[idx+3]=255*alpha;
  }
  ox.putImageData(frame,0,0);ctx.drawImage(off,350-R/.93,350-R/.93,R*2/.93,R*2/.93);
 }else{
  const g=ctx.createRadialGradient(270,260,0,350,350,R);g.addColorStop(0,planets[selected][3]);g.addColorStop(1,'#03050b');ctx.fillStyle=g;ctx.beginPath();ctx.arc(350,350,R,0,Math.PI*2);ctx.fill();
 }
 if(saturn)rings(true,R);
}
let last=0;function animate(t){if(t-last>40){const elapsed=Math.min((t-last)/1000,.1);if(!paused)angle+=elapsed*.0045;if(!document.querySelector('.explorer').hidden)draw();last=t;}requestAnimationFrame(animate);}requestAnimationFrame(animate);
function stars(){
 const c=$('stars'),d=Math.min(devicePixelRatio||1,2);c.width=innerWidth*d;c.height=innerHeight*d;const x=c.getContext('2d');x.scale(d,d);let seed=42;
 const rand=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
 for(let i=0;i<Math.min(1700,innerWidth*innerHeight/950);i++){
  const px=rand()*innerWidth,py=rand()*innerHeight,bright=rand(),r=bright>.992?1.5:rand()*.65+.15;
  const color=rand()>.7?'255,221,185':'197,218,255';x.fillStyle=`rgba(${color},${.14+bright*.62})`;x.beginPath();x.arc(px,py,r,0,Math.PI*2);x.fill();
  if(bright>.992){const glow=x.createRadialGradient(px,py,0,px,py,8);glow.addColorStop(0,`rgba(${color},.26)`);glow.addColorStop(1,`rgba(${color},0)`);x.fillStyle=glow;x.fillRect(px-8,py-8,16,16);}
 }
}stars();addEventListener('resize',stars);

let audio,master,started=false,sounding=false;async function toggleSound(){try{if(!started){audio=new(window.AudioContext||window.webkitAudioContext)();master=audio.createGain();master.gain.value=0;master.connect(audio.destination);const delay=audio.createDelay(4);delay.delayTime.value=1.7;const feedback=audio.createGain();feedback.gain.value=.33;delay.connect(feedback);feedback.connect(delay);delay.connect(master);[65.406,98,130.813,155.563,196,261.626].forEach((f,i)=>{const o=audio.createOscillator(),g=audio.createGain(),lfo=audio.createOscillator(),lg=audio.createGain();o.type='sine';o.frequency.value=f;o.detune.value=i%2?5:-5;g.gain.value=.022;lfo.frequency.value=.025+i*.007;lg.gain.value=.01;lfo.connect(lg);lg.connect(g.gain);o.connect(g);g.connect(master);g.connect(delay);o.start();lfo.start();});function chime(){if(sounding){const o=audio.createOscillator(),g=audio.createGain();o.frequency.value=[261.626,311.127,392,523.251,587.33][Math.floor(Math.random()*5)];g.gain.setValueAtTime(0,audio.currentTime);g.gain.linearRampToValueAtTime(.026,audio.currentTime+1);g.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+7);o.connect(g);g.connect(delay);o.start();o.stop(audio.currentTime+8);}setTimeout(chime,3800);}chime();started=true;}await audio.resume();sounding=!sounding;master.gain.cancelScheduledValues(audio.currentTime);master.gain.setTargetAtTime(sounding?Number($('volume').value)/100:0,audio.currentTime,.6);$('sound').setAttribute('aria-pressed',String(sounding));$('sound').querySelector('i').textContent=sounding?'ON':'OFF';}catch(e){$('sound').querySelector('i').textContent='UNAVAILABLE';}}$('sound').onclick=toggleSound;

// The orbital view and map share the same planet selection as the atlas.
const originalSelect=select;
select=function(i){originalSelect(i);setView(false);document.querySelectorAll('[data-destination]').forEach(b=>b.setAttribute('aria-current',String(Number(b.dataset.destination)===selected)));};
function setView(far){$('system-view').hidden=!far;document.querySelector('.explorer').hidden=far;document.querySelector('.intro').hidden=far;$('close-view').setAttribute('aria-pressed',String(!far));$('far-view').setAttribute('aria-pressed',String(far));if(far)resizeSystem();}
$('close-view').onclick=()=>setView(false);$('far-view').onclick=()=>setView(true);
$('map-toggle').onclick=()=>{const open=$('navigation-map').hidden;$('navigation-map').hidden=!open;$('map-toggle').setAttribute('aria-expanded',String(open));};
planets.forEach((p,i)=>{for(const target of ['map-planets','system-destinations']){const b=document.createElement('button');b.dataset.destination=i;b.style.setProperty('--color',p[3]);b.innerHTML=`<span class="dot"></span><span>${p[0]}<small>${p[7]} million km</small></span>`;b.setAttribute('aria-current',String(i===selected));b.onclick=()=>{select(i);$('navigation-map').hidden=true;$('map-toggle').setAttribute('aria-expanded','false');};$(target).append(b);}});
const system=$('system'),space=system.getContext('2d');let sw=1000,sh=520,orbitTime=0,lastOrbit=0,orbitPaused=matchMedia('(prefers-reduced-motion: reduce)').matches,hitPoints=[];
function resizeSystem(){sw=system.parentElement.clientWidth||1000;sh=Math.min(570,Math.max(360,sw*.5));const d=Math.min(devicePixelRatio||1,2);system.width=sw*d;system.height=sh*d;system.style.height=sh+'px';space.setTransform(d,0,0,d,0,0);}
addEventListener('resize',resizeSystem);
function orbitMotion(){$('system-motion').textContent=orbitPaused?'Resume orbits':'Pause orbits';$('system-motion').setAttribute('aria-pressed',String(orbitPaused));}orbitMotion();$('system-motion').onclick=()=>{orbitPaused=!orbitPaused;orbitMotion();};
function renderSystem(t){const dt=lastOrbit?Math.min((t-lastOrbit)/1000,.1):0;lastOrbit=t;if(!orbitPaused)orbitTime+=dt;if(!$('system-view').hidden){space.clearRect(0,0,sw,sh);const cx=sw/2,cy=sh/2,outer=Math.min(sw*.43,sh*.85),tilt=.47;const glow=space.createRadialGradient(cx,cy,0,cx,cy,outer);glow.addColorStop(0,'#efa95618');glow.addColorStop(.4,'#8075cf0b');glow.addColorStop(1,'#100a2000');space.fillStyle=glow;space.fillRect(0,0,sw,sh);hitPoints=[];
for(let i=7;i>=0;i--){const r=outer*(.15+i*.117);space.beginPath();space.ellipse(cx,cy,r,r*tilt,-.15,0,Math.PI*2);space.strokeStyle='#adb9e323';space.lineWidth=1;space.stroke();}
const sun=space.createRadialGradient(cx-4,cy-4,0,cx,cy,35);sun.addColorStop(0,'#fffbe2');sun.addColorStop(.25,'#ffd27c');sun.addColorStop(.5,'#ffae4299');sun.addColorStop(1,'#ff9b0000');space.fillStyle=sun;space.fillRect(cx-35,cy-35,70,70);space.fillStyle='#ccb18c';space.font='10px sans-serif';space.fillText('SUN',cx-10,cy+37);
planets.forEach((p,i)=>{const r=outer*(.15+i*.117),a=i*2.25+.3+orbitTime*(.18/(1+i*.6)),ex=Math.cos(a)*r,ey=Math.sin(a)*r*tilt,x=cx+ex*Math.cos(-.15)-ey*Math.sin(-.15),y=cy+ex*Math.sin(-.15)+ey*Math.cos(-.15),radius=[4,6,7,5,15,13,10,10][i]*(sw<600?.75:1);hitPoints.push({x,y,i});if(i===5){space.beginPath();space.ellipse(x,y,radius*1.9,radius*.5,-.3,0,Math.PI*2);space.strokeStyle='#cfbd9890';space.lineWidth=4;space.stroke();}space.save();space.beginPath();space.arc(x,y,radius,0,Math.PI*2);space.clip();space.fillStyle=p[3];space.fillRect(x-radius,y-radius,radius*2,radius*2);const img=planetImages[i];if(img.complete&&img.naturalWidth)space.drawImage(img,img.naturalWidth*.2,0,img.naturalWidth*.5,img.naturalHeight,x-radius,y-radius,radius*2,radius*2);const shade=space.createLinearGradient(x-radius,y-radius,x+radius,y+radius*.3);shade.addColorStop(0,'#ffffff12');shade.addColorStop(.4,'#00000000');shade.addColorStop(1,'#000000ec');space.fillStyle=shade;space.fillRect(x-radius,y-radius,radius*2,radius*2);space.restore();if(i===selected){space.beginPath();space.arc(x,y,radius+5,0,Math.PI*2);space.strokeStyle='#c9b7ff';space.lineWidth=1;space.stroke();}space.font='10px sans-serif';space.textAlign='center';space.fillStyle='#bbc0d2';space.fillText(p[0],x,y+radius+18);});space.textAlign='start';}requestAnimationFrame(renderSystem);}resizeSystem();requestAnimationFrame(renderSystem);
system.onclick=e=>{const rect=system.getBoundingClientRect(),x=e.clientX-rect.left,y=e.clientY-rect.top;const hit=hitPoints.map(p=>({...p,d:Math.hypot(p.x-x,p.y-y)})).sort((a,b)=>a.d-b.d)[0];if(hit&&hit.d<28)select(hit.i);};
$('volume').oninput=()=>{if(master&&sounding)master.gain.setTargetAtTime(Number($('volume').value)/100,audio.currentTime,.1);};
