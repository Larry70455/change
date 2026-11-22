import { readFileSync, writeFileSync } from 'node:fs';

const web=readFileSync(new URL('../web/index.html',import.meta.url),'utf8');
const pspURL=new URL('../psp/game.js',import.meta.url);
const psp=readFileSync(pspURL,'utf8');
const engineStart='function createGreatWork(';
const webUI="document.addEventListener('DOMContentLoaded',()=>{\n  const root=document.querySelector('#game');";
const pspUI='const game=createGreatWork(DECK);';
const start=web.indexOf(engineStart), end=web.indexOf(webUI,start);
const pspEngine=psp.indexOf(engineStart);
const pspStart=psp.indexOf(pspUI);
const deckMatch=web.match(/const DECK = (\[\{[^\n]*\}\]);/);
const pspDeckMatch=psp.match(/^const DECK=(\[\{[^\n]*\}\]);/);
if(start<0||end<0||pspStart<0||pspEngine<0||!deckMatch||!pspDeckMatch){
  throw Error('Deck or engine boundaries changed. Check before syncing.');
}
const deck=JSON.parse(deckMatch[1]);
if(deck.length!==90||new Set(deck.map(c=>c.id)).size!==90){
  throw Error('This PSP renderer expects exactly 90 unique cards.');
}
const oldTextures=new Map(JSON.parse(pspDeckMatch[1]).map(c=>[c.id,c.tex]));
const sameCards=deck.every(card=>oldTextures.has(card.id));
const fields=new Set(['id','name','element','up','down','mythic','master','major','mystery','mark']);
const pspDeck=deck.map((card,index)=>({
  ...Object.fromEntries(Object.entries(card).filter(([key,value])=>fields.has(key)&&value!==false)),
  tex:sameCards?oldTextures.get(card.id):index
}));
const updated='const DECK='+JSON.stringify(pspDeck)+';\n'+web.slice(start,end).trimEnd()+'\n\n'+psp.slice(pspStart);
const options=new Set(process.argv.slice(2));
if(options.has('--write')){
  writeFileSync(pspURL,updated);
  writeFileSync(new URL('deck.current.json',import.meta.url),JSON.stringify(deck,null,2)+'\n');
  console.log('Updated the PSP deck and shared game engine.');
  if(!sameCards)console.log('Texture IDs changed. Rebuild the PSP package with --artwork.');
}else{
  const comparison=source=>source.trim().replace(/\n+(?=function groupGreatWorkMoves)/,'\n');
  const inSync=comparison(web.slice(start,end))===comparison(psp.slice(pspEngine,pspStart))&&
    JSON.stringify(pspDeck)===JSON.stringify(JSON.parse(pspDeckMatch[1]));
  console.log(inSync?'PSP source is already in sync.':'Preview only. Pass --write to sync web rules and deck into PSP.');
}
