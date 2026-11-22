import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';
import { createHash } from 'node:crypto';

const at=(file)=>new URL('../'+file,import.meta.url);
const read=(file)=>readFileSync(at(file),'utf8');
const web=read('web/index.html'), psp=read('psp/game.js');
const webDeck=JSON.parse(web.match(/const DECK = (\[\{[^\n]*\}\]);/)[1]);
const pspDeck=JSON.parse(psp.match(/^const DECK=(\[\{[^\n]*\}\]);/)[1]);
const engineStart='function createGreatWork(';
const sharedSource=(source,end)=>source.slice(source.indexOf(engineStart),source.indexOf(end,source.indexOf(engineStart))).trim();
const webEngine=sharedSource(web,"document.addEventListener('DOMContentLoaded',()=>{\n  const root=document.querySelector('#game');");
const pspEngine=sharedSource(psp,'const game=createGreatWork(DECK);');
const comparison=source=>source.replace(/\n+(?=function groupGreatWorkMoves)/,'\n');
assert.ok(comparison(webEngine)===comparison(pspEngine),'PSP must carry the same game engine and payment grouping as web');
assert.deepEqual(webDeck,JSON.parse(read('shared/deck.current.json')));
assert.equal(new Set(webDeck.map(card=>card.id)).size,90);
const sharedFields=['id','name','element','up','down','mythic','master','major','mystery','mark'];
for(const card of webDeck){
  const port=pspDeck.find(p=>p.id===card.id);
  assert.ok(port,card.id);
  for(const key of sharedFields)assert.equal(port[key]||null,card[key]||null,card.id+' '+key);
  assert.ok(existsSync(at('web/'+card.front)),card.front);
}
assert.ok(existsSync(at('web/assets/fronts-92-marks/shared-back-upright.webp')));

function game(source,deck){
  const context=vm.createContext({deck,seed:123});
  return vm.runInContext(source+`
    createGreatWork(deck,()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;})
  `,context);
}
const rules=game(webEngine,webDeck);
const names=[{name:'Player 1',ai:false},{name:'Player 2',ai:false}];
const snapshot=value=>JSON.parse(JSON.stringify(value));
const initial=rules.round(names);
assert.deepEqual(snapshot(initial.players.map(p=>p.marks.map(m=>rules.sign(m.id)))),[['+','+','−','−'],['+','+','−','−']]);
assert.equal(initial.shelf.length,3);
rules.ready(initial);
initial.players[0].work.Air={id:'air-01',reversed:true,locked:false};
let moves=rules.legal(initial);
rules.act(initial,moves.find(a=>a.kind==='Bless'&&a.e==='Air'));
assert.equal(initial.players[0].work.Air.reversed,false);
assert.equal(rules.locked(initial.players[0].work.Air),true);
initial.players[1].work.Fire={id:'fire-01',reversed:true,locked:false};
moves=rules.legal(initial);
rules.act(initial,moves.find(a=>a.kind==='Hex'&&a.e==='Fire'));
assert.equal(initial.players[1].work.Fire.reversed,false);
assert.equal(rules.locked(initial.players[1].work.Fire),false);

const blocked=rules.round(names);
rules.ready(blocked);
blocked.players[1].work.Air={id:'air-01',reversed:false,locked:false};
blocked.players[1].wards=[{id:'earth-01'}];
rules.act(blocked,rules.legal(blocked).find(a=>a.kind==='Hex'));
assert.equal(blocked.phase,'ward');
rules.resolveHex(blocked,0);
assert.equal(blocked.players[1].work.Air.reversed,false);
assert.equal(blocked.players[1].wards.length,0);

const endings=rules.round(names);
rules.ready(endings);
for(const [element,id] of Object.entries({Air:'air-01',Earth:'earth-01',Water:'water-01',Fire:'fire-01'})){
  endings.players[1].work[element]={id,reversed:false,locked:false};
}
rules.endActions(endings);
assert.equal(endings.phase,'roundOver');
assert.equal(endings.winner,1);

const four=rules.round([...names,{name:'Player 3',ai:false},{name:'Player 4',ai:false}]);
assert.ok(four.players.every(p=>p.marks.length===4));
assert.equal(four.players.flatMap(p=>p.marks).filter(m=>m.id.startsWith('spare-')).length,2);
const playback=game(pspEngine,pspDeck);
const webAI=game(webEngine,webDeck);
const seats=names.map(player=>({...player,ai:true}));
const w=webAI.round(seats), p=playback.round(seats);
for(let tick=0;tick<600&&w.phase!=='roundOver';tick++){
  webAI.aiStep(w);playback.aiStep(p);
  assert.deepEqual(snapshot(w),snapshot(p));
}
assert.equal(w.phase,'roundOver','Seeded AI game should finish.');
const sha=createHash('sha256').update(web).digest('hex');
console.log(`Verified 90 shared cards, common engine, Bless/Hex/Ward, turn win, and a complete AI game. Web SHA-256 ${sha}.`);
