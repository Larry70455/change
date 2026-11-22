import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const web=fileURLToPath(new URL('../web/',import.meta.url));
const html=readFileSync(join(web,'index.html'),'utf8');
const back='assets/fronts-92-marks/shared-back-upright.webp';
const assets={};
function collect(folder){
  for(const entry of readdirSync(folder,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))){
    const path=join(folder,entry.name);
    if(entry.isDirectory())collect(path);
    else if(entry.name.endsWith('.webp')){
      const key=relative(web,path).replaceAll('\\','/');
      assets[key]='data:image/webp;base64,'+readFileSync(path).toString('base64');
    }
  }
}
collect(join(web,'assets'));
const current=Object.keys(assets).filter(key=>key.startsWith('assets/fronts-92-marks/'));
if(current.length!==91||!assets[back]||!html.includes('window.OFFLINE_ASSETS={};')){
  throw Error('Expected the live HTML and 90 current faces plus the back.');
}
const result=html.replace('window.OFFLINE_ASSETS={};',
  'window.OFFLINE_ASSETS='+JSON.stringify(assets)+';')
  .replace('src="'+back+'"','src="'+assets[back]+'"');
const out=process.argv[2]?resolve(process.argv[2]):fileURLToPath(new URL('../offline/Grimoire_The_Great_Work.html',import.meta.url));
writeFileSync(out,result);
console.log(`Embedded ${Object.keys(assets).length} images in ${out}.`);
