// Requires Sharp. Overwrites only the element and triangle cells in a copy of the atlas.
import {mkdirSync,readFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';

const json=path=>JSON.parse(readFileSync(new URL(path,import.meta.url),'utf8'));
const elements=json('../../shared/element-glyphs.json');
const geometry=json('../../shared/tier-triangles.json');
const base=fileURLToPath(new URL('./icon-atlas.png',import.meta.url));
const output=resolve(process.argv[2]||'build/icon-atlas.png');
if(output===base)throw Error('Use an output path different from the reference atlas.');
const {data:atlas,info}=await sharp(base).ensureAlpha().raw().toBuffer({resolveWithObject:true});
if(info.width!==128||info.height!==128)throw Error('Expected a 128×128 icon atlas.');

const elementSVG=(paths,rotation)=>`<g transform="translate(9 9) rotate(${rotation}) scale(.85)"
  fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round">${paths.map(p=>
    `<path d="${p.d}" stroke-width="${p.width*1.4}"/>`).join('')}</g>`;
const tierSVG=(centers,rotation)=>`<g transform="translate(9 9) rotate(${rotation}) scale(.75) translate(-12 -12)"
  fill="white">${centers.map(([x,y])=>
    `<path d="M0 0l${geometry.halfBase} ${geometry.height}h-${2*geometry.halfBase}Z" transform="translate(${x} ${y})"/>`
  ).join('')}</g>`;

async function paint(index,shape){
  const svg=Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">${shape}</svg>`);
  const pix=await sharp(svg).ensureAlpha().raw().toBuffer();
  for(let offset=0;offset<pix.length;offset+=4){
    if(pix[offset+3]<9)pix.fill(0,offset,offset+4);
  }
  const x=index%7*18,y=Math.floor(index/7)*18;
  for(let row=0;row<18;row++){
    pix.copy(atlas,4*((y+row)*128+x),row*72,(row+1)*72);
  }
}
for(const [i,element] of ['Air','Water','Earth','Fire'].entries()){
  await paint(i,elementSVG(elements[element],180));
  await paint(35+i,elementSVG(elements[element],0));
}
for(const [i,tier] of ['Modest','Major','Master'].entries()){
  await paint(30+i,tierSVG(geometry.centers[tier],0));
  await paint(39+i,tierSVG(geometry.centers[tier],180));
}
mkdirSync(dirname(output),{recursive:true});
await sharp(atlas,{raw:{width:128,height:128,channels:4}}).png().toFile(output);
console.log(output);
