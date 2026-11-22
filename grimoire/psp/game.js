const DECK=[{"id":"major-potential","name":"Potential","element":"Air","major":true,"up":"A new opportunity is opening. Take the first step.","down":"You are overlooking important risks. Prepare before committing.","tex":0},{"id":"major-sacral","name":"Sacral","element":"Water","major":true,"up":"Desire and feeling are flowing freely. Enjoy healthy connection.","down":"Pleasure is becoming avoidance. Address the need beneath the craving.","tex":1},{"id":"major-root","name":"Root","element":"Earth","major":true,"up":"Your foundations are dependable. Build on them.","down":"Your basic needs lack support. Stabilize them before expanding.","tex":2},{"id":"major-solar-plexus","name":"Solar Plexus","element":"Fire","major":true,"up":"You can make this decision yourself. Exercise your authority.","down":"Someone else’s approval is controlling your choice. Reclaim the decision.","tex":3},{"id":"major-mercury","name":"Quicksilver Mercury","element":"Air","major":true,"up":"Information is moving clearly. Speak, negotiate, or make the connection.","down":"Messages are being misunderstood. Clarify before making agreements.","tex":4},{"id":"major-moon-silver","name":"Silver Moon","element":"Water","major":true,"up":"Something remains hidden. Observe before drawing conclusions.","down":"Uncertainty is clearing. Accept the facts now becoming visible.","tex":5},{"id":"major-correspondence","name":"Correspondence","element":"Earth","major":true,"up":"The same pattern is repeating. Apply what you learned before.","down":"These situations only look alike. Treat their differences seriously.","tex":6},{"id":"major-sun-gold","name":"Golden Sun","element":"Fire","major":true,"up":"Your strengths are ready to be seen. Step forward.","down":"Confidence has become overconfidence. Admit a limitation.","tex":7},{"id":"major-throat","name":"Throat","element":"Air","major":true,"up":"Your truth needs to be spoken. Say it directly.","down":"Speaking is crowding out understanding. Stop and listen.","tex":8},{"id":"major-venus-copper","name":"Copper Venus","element":"Water","major":true,"up":"Attraction is mutual and nourishing. Allow the relationship to grow.","down":"Attraction is masking incompatibility. Judge the relationship by its effects.","tex":9},{"id":"major-saturn-lead","name":"Lead Saturn","element":"Earth","major":true,"up":"Structure and discipline will help you succeed. Accept necessary limits.","down":"Excessive restriction is holding you back. Challenge an unnecessary limit.","tex":10},{"id":"major-jupiter-tin","name":"Tin Jupiter","element":"Fire","major":true,"up":"You have room to grow. Accept a worthwhile opportunity.","down":"You have expanded beyond your capacity. Reduce your commitments.","tex":11},{"id":"major-polarity","name":"Polarity","element":"Air","major":true,"up":"Both sides contain something useful. Find a workable combination.","down":"The positions cannot coexist as they stand. Choose a clear boundary.","tex":12},{"id":"major-heart","name":"Heart","element":"Water","major":true,"up":"Love is being offered and received. Let yourself participate.","down":"Care is one-sided. Stop giving beyond what you can sustain.","tex":13},{"id":"major-putrefaction","name":"Putrefaction","element":"Earth","major":true,"up":"Something has ended. Let it break down and release its hold.","down":"You are keeping something dead in place. Stop trying to preserve it.","tex":14},{"id":"major-mars-iron","name":"Iron Mars","element":"Fire","major":true,"up":"A firm response is necessary. Defend your position.","down":"Force is making things worse. De-escalate or withdraw.","tex":15},{"id":"major-third-eye","name":"Third Eye","element":"Air","major":true,"up":"A deeper pattern is becoming clear. Investigate the insight.","down":"You are reading intention into uncertainty. Return to observable facts.","tex":16},{"id":"major-rhythm","name":"Rhythm","element":"Water","major":true,"up":"Your timing fits the situation. Move with its natural pace.","down":"Your timing is working against you. Slow down or change course.","tex":17},{"id":"major-refinement","name":"Refinement","element":"Earth","major":true,"up":"The approach works. Improve it through focused practice.","down":"The approach itself is wrong. Replace it rather than polishing it.","tex":18},{"id":"major-destruction","name":"Destruction","element":"Fire","major":true,"up":"This arrangement cannot continue. End it deliberately.","down":"You are about to destroy something repairable. Stop and reassess.","tex":19},{"id":"major-crown","name":"Crown","element":"Air","major":true,"up":"A larger purpose is guiding you. Let it shape your conduct.","down":"Spiritual searching is replacing action. Tend to daily duties.","tex":20},{"id":"major-purification","name":"Purification","element":"Water","major":true,"up":"Your priorities are clear. Release what distracts from them.","down":"Unresolved motives are clouding your choices. Name what you actually want.","tex":21},{"id":"major-wholeness","name":"Wholeness","element":"Earth","major":true,"up":"Your needs and values support each other. Act with confidence.","down":"One part of your life is consuming the others. Restore balance.","tex":22},{"id":"major-creation","name":"Creation","element":"Fire","major":true,"up":"The idea is ready to become real. Begin making it.","down":"Another beginning would scatter your effort. Finish what you already started.","tex":23},{"id":"air-01","name":"Breath","element":"Air","up":"A brief pause will improve your response. Take it before acting.","down":"Pausing has become postponing. Respond to what needs action.","tex":24},{"id":"water-01","name":"Spring","element":"Water","up":"Your feelings are returning after a dry period. Welcome connection.","down":"You feel emotionally depleted. Restore yourself before giving more.","tex":25},{"id":"earth-01","name":"Seed","element":"Earth","up":"Your plan is ready. Take the first concrete step.","down":"Your plan lacks support. Secure the time or resources first.","tex":26},{"id":"fire-01","name":"Spark","element":"Fire","up":"Inspiration is present. Act before the moment passes.","down":"Your motivation is depleted. Restore your energy before beginning.","tex":27},{"id":"air-02","name":"Curiosity","element":"Air","up":"You need more understanding. Ask questions before choosing.","down":"Questions are delaying commitment. Use what you know.","tex":28},{"id":"water-02","name":"Connection","element":"Water","up":"Both people are reaching toward each other. Deepen the relationship.","down":"You are maintaining the connection alone. Stop chasing reciprocity.","tex":29},{"id":"earth-02","name":"Foundation","element":"Earth","up":"The underlying structure is sound. Proceed with your plans.","down":"A basic weakness threatens the outcome. Repair it before proceeding.","tex":30},{"id":"fire-02","name":"Desire","element":"Fire","up":"You genuinely want this. Pursue it with intention.","down":"You want the relief more than the thing itself. Address the underlying need.","tex":31},{"id":"air-03","name":"Perspective","element":"Air","up":"Another viewpoint will reveal something useful. Consider it seriously.","down":"Others’ viewpoints have drowned out your own. Decide where you stand.","tex":32},{"id":"water-03","name":"Trust","element":"Water","up":"Consistent behavior supports trust. Allow greater openness.","down":"Words and behavior conflict. Keep limits until reliability is demonstrated.","tex":33},{"id":"earth-04","name":"Craft","element":"Earth","up":"Your skill is developing. Improve through repetition and attention.","down":"Your method has stopped working. Seek help or change it.","tex":34},{"id":"fire-03","name":"Courage","element":"Fire","up":"Fear is present, but the step is worthwhile. Proceed.","down":"You are ignoring a genuine danger. Prepare or reconsider.","tex":35},{"id":"air-04","name":"Clarity","element":"Air","up":"The facts are sufficient. Make a clear decision.","down":"Important facts are missing or unreliable. Verify before deciding.","tex":36},{"id":"water-04","name":"Tenderness","element":"Water","up":"Vulnerability needs care. Be gentle rather than critical.","down":"Gentleness is excusing repeated harm. Add a firm boundary.","tex":37},{"id":"earth-05","name":"Patience","element":"Earth","up":"Progress is happening slowly. Give the process more time.","down":"Waiting is no longer helping. Make the overdue decision.","tex":38},{"id":"fire-04","name":"Action","element":"Fire","up":"You have planned enough. Do the next concrete thing.","down":"You are acting without direction. Stop and choose a purpose.","tex":39},{"id":"air-05","name":"Doubt","element":"Air","up":"Your concern points to a real uncertainty. Investigate it.","down":"Fear is dismissing the evidence. Stop seeking guarantees.","tex":40},{"id":"water-05","name":"Grief","element":"Water","up":"A loss needs acknowledgment. Allow yourself to mourn.","down":"Suppressed grief is affecting your life. Find support to face it.","tex":41},{"id":"earth-06","name":"Boundary","element":"Earth","up":"Your limit protects something important. State and enforce it.","down":"Your defenses are blocking healthy connection. Allow appropriate access.","tex":42},{"id":"fire-05","name":"Conflict","element":"Fire","up":"The disagreement must be addressed. Confront the actual issue.","down":"The argument has become destructive. Disengage and de-escalate.","tex":43},{"id":"air-07","name":"Confusion","element":"Air","up":"You lack essential information. Ask for a clear explanation.","down":"You already understand enough. Stop complicating the next step.","tex":44},{"id":"water-06","name":"Release","element":"Water","up":"Holding on is prolonging the hurt. Let the attachment go.","down":"You are leaving to avoid an unfinished conversation. Address it first.","tex":45},{"id":"earth-07","name":"Burden","element":"Earth","up":"This responsibility belongs to you. Carry it through.","down":"You are carrying someone else’s responsibility. Hand it back.","tex":46},{"id":"fire-06","name":"Defiance","element":"Fire","up":"Resistance protects your integrity. Refuse the demand.","down":"You are opposing something simply to resist. Reconsider its merits.","tex":47},{"id":"air-08","name":"Insight","element":"Air","up":"A new explanation fits the evidence. Put it to practical use.","down":"An appealing explanation does not fit the facts. Revise it.","tex":48},{"id":"water-08","name":"Forgiveness","element":"Water","up":"You are ready to release resentment. Let the past loosen its hold.","down":"Forgiveness is being rushed. Take the time you need.","tex":49},{"id":"earth-09","name":"Harvest","element":"Earth","up":"The results are ready. Collect and enjoy them.","down":"You are demanding results too early. Continue tending the work.","tex":50},{"id":"fire-07","name":"Ambition","element":"Fire","up":"The goal deserves sustained effort. Commit to the work.","down":"Success is costing health or relationships. Set limits.","tex":51},{"id":"air-09","name":"Vision","element":"Air","up":"Your long-term direction is clear. Plan toward it.","down":"The imagined future ignores present conditions. Make the plan realistic.","tex":52},{"id":"water-09","name":"Overflow","element":"Water","up":"You have more than you need. Share without depleting yourself.","down":"Your feelings exceed your capacity. Reduce demands and seek support.","tex":53},{"id":"earth-11","name":"Stillness","element":"Earth","up":"A pause will restore your judgment. Stop pushing temporarily.","down":"Inactivity has become stagnation. Take a concrete action today.","tex":54},{"id":"fire-09","name":"Exhaustion","element":"Fire","up":"Your reserves are spent. Stop and recover.","down":"Your energy is returning. Resume activity gradually.","tex":55},{"id":"air-11","name":"Silence","element":"Air","up":"Listening will help more than speaking. Leave the space open.","down":"Silence is hiding an important truth. Say what needs saying.","tex":56},{"id":"water-10","name":"Healing","element":"Water","up":"Recovery is happening. Continue the care that is helping.","down":"The wound is not improving. Change the approach or seek help.","tex":57},{"id":"earth-12","name":"Inheritance","element":"Earth","up":"Something passed down still serves you. Preserve and develop it.","down":"An inherited pattern is harming you. Choose to end it.","tex":58},{"id":"fire-11","name":"Resolve","element":"Fire","up":"Your commitment still serves your values. Hold your position.","down":"Pride is keeping you committed to a mistake. Change your position.","tex":59},{"id":"air-12","name":"Message","element":"Air","up":"The message is direct and consistent. Respond to what was said.","down":"The message is ambiguous or contradictory. Ask rather than assume.","tex":60},{"id":"water-11","name":"Depth","element":"Water","up":"This feeling needs attention. Stay with what is difficult.","down":"Further analysis is becoming rumination. Return to daily activity.","tex":61},{"id":"earth-13","name":"Home","element":"Earth","up":"You can belong here without hiding yourself. Invest in this place.","down":"Belonging requires you to abandon yourself. Seek a healthier arrangement.","tex":62},{"id":"fire-13","name":"Transformation","element":"Fire","up":"Your behavior has changed. Build a life that supports it.","down":"Your intentions changed, but your behavior has not. Practice differently.","tex":63},{"id":"air-13","name":"Freedom","element":"Air","up":"You have room to choose. Exercise it deliberately.","down":"Avoiding commitment limits freedom. Choose your loyalties.","tex":64},{"id":"water-13","name":"Acceptance","element":"Water","up":"The situation cannot presently be changed. Adapt to what is real.","down":"You can change this situation. Stop treating it as inevitable.","tex":65},{"id":"major-causation","name":"Causation","element":"Earth","up":"Your actions are producing results. Continue deliberately.","down":"Your current approach keeps producing the problem. Change it.","tex":66},{"id":"major-vibration","name":"Vibration","element":"Fire","up":"Your energy is building momentum. Put it into action.","down":"You are stimulated but accomplishing little. Remove distractions and focus.","tex":67},{"id":"major-mentalism","name":"Mentalism","element":"Air","up":"Your thinking supports useful action. Follow it with practice.","down":"An untested belief is directing you. Check it against evidence.","tex":68},{"id":"major-two-currents","name":"Two Currents","element":"Water","up":"Giving and receiving are balanced. Continue the exchange.","down":"One person directs while the other disappears. Change the arrangement.","tex":69},{"name":"Limitless","element":"Air","up":"More is possible. Explore beyond your usual limits.","down":"Too many possibilities are scattering you. Choose one path.","id":"magnificent-limitless","master":true,"tex":70},{"name":"Change","element":"Fire","up":"Your old approach is finished. Commit to the change.","down":"You are changing too quickly. Give one approach time.","id":"magnificent-change","master":true,"tex":71},{"name":"Universal","element":"All","up":"Different paths belong to one whole. Find what connects them.","down":"Different paths belong to one whole. Find what connects them.","id":"magnificent-universal","mythic":true,"tex":72},{"name":"Surrender","element":"Water","up":"Let what you couldn’t plan take its own shape.","down":"You’re yielding where you still have a choice.","id":"expansion-surrender","master":true,"tex":73},{"name":"Commitment","element":"Earth","up":"Choose the path you’re willing to build.","down":"You’re keeping every path open to avoid choosing one.","id":"expansion-commitment","master":true,"tex":74},{"name":"Return","element":"All","up":"Begin again with what the journey taught you.","down":"Begin again with what the journey taught you.","id":"expansion-return","mythic":true,"tex":75},{"id":"mark-uplift","name":"Uplift","element":"Air","mark":"+","mystery":true,"up":"Give a promising idea room to rise.","down":"Give the idea a small action to stand on.","tex":76},{"id":"mark-support","name":"Support","element":"Water","mark":"+","mystery":true,"up":"Let others carry part of the weight.","down":"Offer the help you’ve been waiting to receive.","tex":77},{"id":"mark-cooperation","name":"Cooperation","element":"Earth","mark":"+","mystery":true,"up":"Fit your strengths together.","down":"Give each person a clearer part to play.","tex":78},{"id":"mark-composure","name":"Composure","element":"Fire","mark":"+","mystery":true,"up":"Give your strength time to settle.","down":"Ease the pressure before you act.","tex":79},{"id":"mark-receptivity","name":"Receptivity","element":"Water","mark":"+","mystery":true,"up":"Take in what nourishes you.","down":"Pause when you have enough to carry.","tex":80},{"id":"mark-kinship","name":"Kinship","element":"Earth","mark":"+","mystery":true,"up":"Care for the ties beneath the surface.","down":"Give a strained connection time and space.","tex":81},{"id":"mark-integration","name":"Integration","element":"Fire","mark":"+","mystery":true,"up":"Bring separate efforts into one.","down":"Let each part take shape before you join them.","tex":82},{"id":"mark-discernment","name":"Discernment","element":"Air","mark":"−","mystery":true,"up":"Keep what has weight. Let the rest go.","down":"Look again at what you passed over.","tex":83},{"id":"mark-impermanence","name":"Impermanence","element":"Water","mark":"−","mystery":true,"up":"Let a passing moment pass.","down":"Name what deserves to stay.","tex":84},{"id":"mark-renewal","name":"Renewal","element":"Earth","mark":"−","mystery":true,"up":"Clear room for the next growth.","down":"Protect what still needs time to grow.","tex":85},{"id":"mark-restraint","name":"Restraint","element":"Fire","mark":"−","mystery":true,"up":"Cool the impulse before you act.","down":"Act once the heat has passed.","tex":86},{"id":"mark-separation","name":"Separation","element":"Water","mark":"−","mystery":true,"up":"Give each part room to settle.","down":"See what belongs together before choosing.","tex":87},{"id":"mark-rest","name":"Rest","element":"Earth","mark":"−","mystery":true,"up":"Rest before you ask for more.","down":"Notice when rest has become delay.","tex":88},{"id":"mark-conservation","name":"Conservation","element":"Fire","mark":"−","mystery":true,"up":"Save enough energy for tomorrow.","down":"Use the strength you’ve been saving.","tex":89}];
function createGreatWork(deck, rng=Math.random) {
  const elements=['Air','Water','Earth','Fire'];
  const cards=new Map(deck.map(c=>[c.id,c]));
  const cardType=c=>c.mystery?'Mystery':c.mythic?'Mythic':c.master?'Master':c.major?'Major':'Modest';
  const tier=c=>c.mythic?4:c.master?3:c.major?2:1;
  const suits=c=>c.mystery?[]:c.mythic?elements:[c.element];
  const targetLabel=(e,id)=>e+' · '+cards.get(id).name;
  const signs=['+','−'];
  const spareMarks=['spare-mark-plus','spare-mark-minus'];
  const sign=id=>cards.get(id)?.mark??signs[spareMarks.indexOf(id)];
  const active=s=>s.players[s.turn];
  const upright=p=>elements.filter(e=>p.work[e]&&!p.work[e].reversed).length;
  const reversed=p=>elements.filter(e=>p.work[e]?.reversed).length;
  const score=p=>[upright(p),reversed(p)];
  const alignment=p=>Math.max(...score(p));
  const threatened=p=>alignment(p)===4;
  const locked=w=>Boolean(w?.locked&&!w.reversed);
  const append=(s,msg)=>s.log.push(msg);
  const discard=(s,id)=>s.discard.push(id);
  const remove=(hand,id)=>hand.splice(hand.indexOf(id),1)[0];
  const readyMarks=p=>p.marks.filter(mark=>!mark.spent).map(mark=>mark.id);
  const spendable=p=>[...readyMarks(p),...p.hand.filter(id=>sign(id))];
  const restorePrice=s=>1+s.restores;
  function shuffle(items){
    for(let i=items.length-1;i>0;i--){
      const j=Math.floor(rng()*(i+1));
      [items[i],items[j]]=[items[j],items[i]];
    }
    return items;
  }
  function refill(s){
    if(s.planning)return;
    while(s.shelf.length<3&&s.deck.length)s.shelf.push(s.deck.pop());
  }
  function take(s,p,source){
    const id=source==='deck'?s.deck.pop():s.shelf.splice(Number(source),1)[0];
    if(id)p.hand.push(id);
    refill(s);
    return id;
  }
  function round(seats,starter=0,wins=seats.map(()=>0),roundNumber=1){
    if(seats.length<2||seats.length>4)throw Error('Choose two to four seats.');
    const signPiles=signs.map((face,i)=>{
      const pile=shuffle(deck.filter(c=>c.mark===face).map(c=>c.id));
      if(seats.length===4&&pile.length===7)pile.push(spareMarks[i]);
      return pile;
    });
    if(signPiles.some(pile=>pile.length<seats.length*2))throw Error('This deck needs two Marks of each sign per seat.');
    const players=seats.map(({name,ai})=>({
      name,ai,hand:[],work:Object.fromEntries(elements.map(e=>[e,null])),wards:[],
      marks:signPiles.flatMap(pile=>pile.splice(0,2)).map(id=>({id,spent:false}))
    }));
    const s={players,starter,turn:starter,wins:[...wins],roundNumber,turnNumber:0,
      phase:'pass',restores:0,deck:shuffle([...deck.filter(c=>!c.mark).map(c=>c.id),...signPiles.flat()]),
      shelf:[],discard:[],pending:null,log:[],winner:null,matchOver:false};
    for(let i=0;i<5;i++)for(const p of players)p.hand.push(s.deck.pop());
    refill(s);
    append(s,'Round '+roundNumber+' begins. '+active(s).name+' goes first.');
    return s;
  }
  function practiceRound(){
    const s=round([{name:'You',ai:false},{name:'The Adept',ai:true}]);
    const place=(list,index,id)=>{
      const source=[s.deck,s.shelf,...s.players.map(p=>p.hand)].find(ids=>ids.includes(id));
      if(!source)throw Error('Practice card is missing.');
      const from=source.indexOf(id);
      [source[from],list[index]]=[list[index],id];
    };
    place(s.players[0].hand,0,'major-potential');
    place(s.shelf,0,'water-01');
    s.practice=true;
    s.difficulty='easy';
    return s;
  }
  function ready(s){
    if(s.phase!=='pass')throw Error('Finish the current turn first.');
    const p=active(s);
    for(const mark of p.marks)mark.spent=false;
    s.restores=0;
    s.phase='act';
    append(s,p.name+' begins with two + and two − Marks.');
  }
  function finish(s,reason){
    const scores=s.players.map((p,i)=>reason==='alignment'&&i===s.turn?-1:alignment(p));
    const best=Math.max(...scores), winners=scores.flatMap((n,i)=>n===best?[i]:[]);
    s.winner=winners.length===1?winners[0]:null;
    s.reason=reason;
    s.phase='roundOver';
    s.pending=null;
    if(s.winner!==null)s.wins[s.winner]++;
    s.matchOver=s.players.length!==2||s.wins.some(n=>n>=2);
    append(s,s.winner===null?'The round ends in a tie.':s.players[s.winner].name+' wins with '+best+' aligned cards.');
  }
  function nextRound(s){
    if(s.phase!=='roundOver'||s.matchOver)throw Error('There is no next round.');
    const next=round(s.players,s.winner===null?1-s.starter:1-s.winner,s.wins,s.roundNumber+1);
    if(s.difficulty)next.difficulty=s.difficulty;
    return next;
  }
  const winningRival=s=>s.players.findIndex((p,i)=>i!==s.turn&&threatened(p));
  const draws=s=>[...s.shelf.map((_,i)=>String(i)),...(s.deck.length?['deck']:[])];
  function after(s,phase='act'){
    const overLimit=s.players.findIndex(p=>p.hand.length>7);
    if(overLimit>=0){s.pending={kind:'discard',i:overLimit,phase};s.phase='discard';return}
    if(phase==='draw'&&winningRival(s)>=0){finish(s,'alignment');return}
    if(!s.deck.length&&!s.shelf.length){finish(s,'deck-out');return}
    if(phase==='next'){
      s.turn=(s.turn+1)%s.players.length;
      s.turnNumber++;
      s.phase='pass';
      return;
    }
    s.phase=phase;
  }
  function payments(p){
    const pool=spendable(p), bySize=[[[]],[],[],[]];
    for(const id of pool){
      for(let n=3;n>0;n--)for(const set of bySize[n-1])bySize[n].push([...set,id]);
    }
    return bySize;
  }
  function legal(s){
    if(s.phase!=='act')return [];
    const p=active(s), bySize=payments(p), out=[];
    const add=(move,n,required=null)=>{
      for(const cost of bySize[n]){
        if(cost.includes(move.id)||required&&!cost.some(id=>sign(id)===required))continue;
        out.push({...move,cost});
      }
    };
    for(const e of elements){
      if(p.work[e]?.reversed)add({kind:'Bless',e},1,'+');
    }
    for(const [i,rival] of s.players.entries()){
      if(i===s.turn)continue;
      for(const e of elements){
        const work=rival.work[e];
        if(work&&!locked(work))add({kind:'Hex',i,e,reversed:!work.reversed},1,'−');
      }
    }
    for(const id of p.hand){
      const c=cards.get(id);
      const price=4-tier(c);
      if(!p.wards.length)add({kind:'Ward',id},c.mystery?1:price);
      for(const e of suits(c)){
        for(const [i,q] of s.players.entries()){
          const previous=q.work[e];
          const here=i===s.turn;
          const allowed=here&&(!previous||c.mythic)||
            locked(previous)&&tier(c)>=tier(cards.get(previous.id));
          if(!allowed)continue;
          const move={kind:previous?'Replace':'Transmute',id,i,e};
          add({...move,reversed:false},price,price?'+':null);
          add({...move,reversed:true},price,price?'−':null);
        }
      }
    }
    for(const source of draws(s))add({kind:'Study',source},1);
    return out;
  }
  function canRestore(s,face){
    const p=active(s);
    return s.phase==='act'&&s.restores<2&&p.hand.length>=restorePrice(s)&&
      p.marks.some(mark=>mark.spent&&sign(mark.id)===face);
  }
  function restoreMark(s,face,ids,markId=null){
    const p=active(s),n=restorePrice(s);
    const mark=p.marks.find(mark=>mark.spent&&sign(mark.id)===face&&(markId===null||mark.id===markId));
    if(!mark||!canRestore(s,face)||ids.length!==n||new Set(ids).size!==n||ids.some(id=>!p.hand.includes(id))){
      throw Error('Choose '+n+' hand card'+(n===1?'':'s')+' to restore a spent Mark.');
    }
    for(const id of ids)discard(s,remove(p.hand,id));
    mark.spent=false;
    s.restores++;
    append(s,p.name+' discards '+n+' to restore one '+face+' Mark.');
  }
  function resolveHex(s,wardIndex=null){
    if(s.phase!=='ward'||s.pending?.kind!=='hex')throw Error('There is no Hex to answer.');
    const {i,e,reversed}=s.pending, defender=s.players[i], work=defender.work[e];
    if(wardIndex!==null){
      if(wardIndex!==0||!defender.wards.length)throw Error('Choose the face-down Ward.');
      discard(s,defender.wards.shift().id);
      append(s,defender.name+' uses a Ward to block the Hex on '+e+'.');
    }else{
      work.reversed=reversed;
      work.locked=false;
      work.hexUntil=s.turnNumber+1;
      append(s,defender.name+'’s '+e+' turns '+(reversed?'reversed.':'upright.'));
    }
    s.pending=null;
    after(s);
  }
  function spend(s,cost){
    const p=active(s);
    for(const id of cost){
      const mark=p.marks.find(entry=>entry.id===id);
      if(mark)mark.spent=true;
      else discard(s,remove(p.hand,id));
    }
  }
  function execute(s,a){
    const p=active(s);
    spend(s,a.cost);
    const said=message=>append(s,p.name+' '+message+'.');
    if(a.kind==='Transmute'||a.kind==='Replace'){
      const q=s.players[a.i],previous=q.work[a.e];
      if(previous)discard(s,previous.id);
      q.work[a.e]={id:remove(p.hand,a.id),reversed:a.reversed,locked:false};
      const facing=a.reversed?'reversed':'upright';
      said(previous?'replaces '+q.name+'’s '+a.e+' with '+cards.get(a.id).name+' '+facing:
        'summons '+cards.get(a.id).name+' '+facing+' in '+a.e);
    }else if(a.kind==='Bless'){
      p.work[a.e].reversed=false;
      p.work[a.e].locked=true;
      delete p.work[a.e].hexUntil;
      said('Blesses '+a.e+' and Locks it upright');
    }else if(a.kind==='Ward'){
      p.wards.push({id:remove(p.hand,a.id)});
      said('sets a face-down Ward');
    }else if(a.kind==='Study'){
      const id=take(s,p,a.source);
      said(a.source==='deck'?'draws an extra card from the deck':'draws '+cards.get(id).name+' from the Shelf');
    }else if(a.kind==='Hex'){
      const defender=s.players[a.i];
      said('Hexes '+defender.name+'’s '+a.e);
      s.pending={kind:'hex',i:a.i,e:a.e,reversed:a.reversed};
      s.phase='ward';
      if(!defender.wards.length)resolveHex(s);
      return;
    }
    after(s);
  }
  function act(s,choice){
    const key=JSON.stringify(choice);
    const action=legal(s).find(a=>JSON.stringify(a)===key);
    if(!action)throw Error('That play is unavailable.');
    execute(s,action);
  }
  function shelfPlays(s,source){
    const id=s.shelf[Number(source)];
    if(s.phase!=='act'||!id||!suits(cards.get(id)).length)return [];
    return legal(s).filter(a=>a.kind==='Study'&&a.source===source).flatMap(study=>{
      const preview=planningCopy(s);
      spend(preview,study.cost);
      take(preview,active(preview),source);
      return legal(preview).filter(a=>a.id===id&&a.e).map(play=>({study,play}));
    });
  }
  function playFromShelf(s,choice){
    const key=JSON.stringify(choice);
    const pair=shelfPlays(s,choice.study.source).find(pair=>JSON.stringify(pair)===key);
    if(!pair)throw Error('That Shelf play is unavailable.');
    spend(s,pair.study.cost);
    const id=take(s,active(s),pair.study.source);
    append(s,active(s).name+' draws '+cards.get(id).name+' from the Shelf.');
    execute(s,pair.play);
  }
  function endActions(s){
    if(s.phase!=='act')throw Error('Finish the current choice first.');
    after(s,'draw');
  }
  function freeDraw(s,source){
    if(s.phase!=='draw'||!draws(s).includes(source))throw Error('Choose a card to draw.');
    const id=take(s,active(s),source);
    append(s,active(s).name+' draws '+(source==='deck'?'from the deck.':cards.get(id).name+' from the Shelf.'));
    after(s,'next');
  }
  function discardHand(s,id){
    if(s.phase!=='discard')throw Error('There is no discard to make.');
    const p=s.players[s.pending.i],phase=s.pending.phase;
    if(!p.hand.includes(id))throw Error('Choose a card from your hand.');
    discard(s,remove(p.hand,id));
    append(s,p.name+' discards '+cards.get(id).name+' to the hand limit.');
    s.pending=null;
    after(s,phase);
  }
  function discardWard(s,i){
    if(s.phase!=='act'||i!==0||!active(s).wards.length)throw Error('Choose your Ward.');
    discard(s,active(s).wards.shift().id);
    append(s,active(s).name+' discards a Ward.');
  }

  function cardValue(p,id){
    if(sign(id))return 6;
    const c=cards.get(id);
    const open=suits(c).some(e=>!p.work[e]||locked(p.work[e]));
    return tier(c)*1.8+(open?5:0)+(c.mythic?6:0);
  }
  const cheapest=p=>[...p.hand].sort((a,b)=>cardValue(p,a)-cardValue(p,b));
  function handValue(p){
    const distinct=new Map();
    let total=0;
    for(const id of p.hand){
      const c=cards.get(id),key=sign(id)||suits(c).join('/');
      const old=distinct.get(key)??0, value=cardValue(p,id);
      total+=Math.max(0,value-old)+Math.min(old,value)*.25;
      if(value>old)distinct.set(key,value);
    }
    return total;
  }
  function boardValue(p){
    const [up,down]=score(p), protectedCount=elements.filter(e=>locked(p.work[e])).length;
    return [0,14,35,68,153][Math.max(up,down)]+4*Math.min(up,down)+8*protectedCount+
      10*p.wards.length+(threatened(p)&&p.wards.length?14:0);
  }
  // A rival refreshes two + Marks each turn and can Bless reversed cards into upright Locks.
  function outlook(q){
    let blessings=2;
    const work=Object.fromEntries(elements.map(e=>{
      const w=q.work[e];
      if(w?.reversed&&!w.locked&&blessings>0){blessings--;return [e,{...w,reversed:false,locked:true}]}
      return [e,w];
    }));
    return {...q,work};
  }
  let foresight=true;
  function positionValue(s,seat){
    if(s.phase==='roundOver')return s.winner===seat?10000:s.winner===null?0:-10000;
    const p=s.players[seat], rivals=s.players.filter((_,i)=>i!==seat);
    const risk=rivals.map(q=>threatened(q)?235:boardValue(foresight?outlook(q):q)*.57);
    return boardValue(p)+handValue(p)*.76-Math.max(...risk)-risk.reduce((n,v)=>n+v,0)*.12;
  }
  function planningCopy(s){
    return {...s,planning:true,deck:Array(s.deck.length).fill(null),shelf:[...s.shelf],discard:[],
      pending:s.pending&&{...s.pending},wins:[...s.wins],log:[],
      players:s.players.map((p,i)=>({...p,hand:i===s.turn?[...p.hand]:[],
        marks:p.marks.map(mark=>({...mark})),wards:[...p.wards],
        work:Object.fromEntries(elements.map(e=>[e,p.work[e]&&{...p.work[e]}]))}))};
  }
  function moveKey(s,a){
    const {cost,...effect}=a;
    const p=active(s);
    const forms=cost.map(id=>p.hand.includes(id)?'drawn '+sign(id):sign(id));
    return JSON.stringify(effect)+' '+forms.sort().join('/');
  }
  function candidates(s){
    const out=[], unique=new Set();
    for(const a of legal(s)){
      if(a.kind==='Study'&&a.source==='deck')continue;
      const key=moveKey(s,a);
      if(unique.has(key))continue;
      unique.add(key);
      out.push({a});
    }
    for(const face of signs){
      if(canRestore(s,face))out.push({face,ids:cheapest(active(s)).slice(0,restorePrice(s))});
    }
    return out;
  }
  function project(s,move){
    const copy=planningCopy(s);
    if(move.a)execute(copy,move.a);
    else restoreMark(copy,move.face,move.ids);
    if(copy.phase==='ward')resolveHex(copy,copy.players[copy.pending.i].wards.length?0:null);
    return copy;
  }
  function planTurn(s,depth){
    const seat=s.turn, base=positionValue(s,seat);
    let best=null,bestValue=base+.24,beam=[{s,first:null}];
    const seen=new Set();
    for(let n=0;n<depth&&beam.length;n++){
      const next=[];
      for(const node of beam){
        for(const move of candidates(node.s)){
          const x=project(node.s,move),p=active(x),first=node.first??move;
          const key=JSON.stringify([x.phase,p.hand,x.shelf,x.restores,p.marks.map(m=>m.spent),
            x.players.map(q=>[q.work,q.wards.length])]);
          if(seen.has(key))continue;
          seen.add(key);
          const value=positionValue(x,seat)-(n+1)*.14;
          if(value>bestValue){bestValue=value;best=first}
          if(x.phase==='act')next.push({s:x,first,priority:value+readyMarks(p).length});
        }
      }
      beam=next.sort((a,b)=>b.priority-a.priority).slice(0,6);
    }
    return best;
  }
  // Find the shortest run of Hexes, Replaces and restores that leaves no rival aligned.
  // A Ward can absorb the first Hex, so this looks past plays that show no gain on their own.
  function breakLine(s,depth){
    let budget=1500;
    const search=(x,d)=>{
      const p=active(x),seen=new Set(),moves=[];
      for(const a of legal(x)){
        if(a.kind!=='Hex'&&(a.kind!=='Replace'||a.i===x.turn))continue;
        const {cost,...effect}=a,key=JSON.stringify(effect);
        if(seen.has(key))continue;
        seen.add(key);
        moves.push({a});
      }
      for(const face of signs)if(canRestore(x,face))moves.push({face,ids:cheapest(p).slice(0,restorePrice(x))});
      for(const move of moves){
        if(--budget<0)return null;
        const y=project(x,move);
        if(y.phase!=='act')continue;
        if(winningRival(y)<0)return [move];
        if(d>1){const rest=search(y,d-1);if(rest)return [move,...rest];}
      }
      return null;
    };
    for(let d=1;d<=depth;d++){const found=search(s,d);if(found)return found[0];}
    return null;
  }
  function aiStep(s){
    if(s.phase==='pass'){ready(s);return}
    if(s.phase==='ward'){resolveHex(s,s.players[s.pending.i].wards.length?0:null);return}
    if(s.phase==='discard'){discardHand(s,cheapest(s.players[s.pending.i])[0]);return}
    const p=active(s);
    if(s.phase==='draw'){
      const best=s.shelf.map((id,i)=>({i,v:cardValue(p,id)})).sort((a,b)=>b.v-a.v)[0];
      freeDraw(s,best&&(best.v>=7||!s.deck.length)?String(best.i):'deck');
      return;
    }
    if(s.phase!=='act')return;
    if(s.practice&&s.turnNumber===1&&s.players[0].work.Air&&!s.players[0].work.Air.reversed){
      const lesson=legal(s).find(a=>a.kind==='Hex'&&a.e==='Air'&&a.i===0);
      if(lesson){execute(s,lesson);return}
    }
    // Easy: shallow plans, no defensive search, sometimes stops early. Normal: defends but
    // ignores the rival's next Blessings. Hard: full planning (default).
    const level=s.difficulty??'hard';
    foresight=level==='hard';
    const urgent=winningRival(s)>=0;
    if(level==='easy'){
      if(!urgent&&rng()<.15){endActions(s);return}
      const move=planTurn(s,2);
      if(move?.a){execute(s,move.a);return}
      if(move?.face){restoreMark(s,move.face,move.ids);return}
      endActions(s);
      return;
    }
    if(urgent){
      const fix=breakLine(s,4);
      if(fix?.a){execute(s,fix.a);return}
      if(fix?.face){restoreMark(s,fix.face,fix.ids);return}
    }
    const move=planTurn(s,urgent||alignment(p)>=2?4:2);
    if(move?.a){execute(s,move.a);return}
    if(move?.face){restoreMark(s,move.face,move.ids);return}
    if(!urgent&&p.hand.length<4&&s.deck.length>2){
      const extra=legal(s).find(a=>a.kind==='Study'&&a.source==='deck');
      if(extra){execute(s,extra);return}
    }
    endActions(s);
  }
  return {cards,elements,cardType,targetLabel,suits,sign,readyMarks,restorePrice,round,practiceRound,nextRound,ready,legal,
    canRestore,restoreMark,act,shelfPlays,playFromShelf,resolveHex,endActions,freeDraw,draws,discardHand,discardWard,aiStep,upright,
    locked,score,alignment,threatened,winningRival};
}

function groupGreatWorkMoves(game,state,options){
  const player=state.players[state.turn], hand=new Set(player.hand);
  const ready={'+':0,'−':0};
  for(const id of game.readyMarks(player))ready[game.sign(id)]++;
  const groups=new Map();
  const costOf=({a,combo})=>combo?[...combo.study.cost,...a.cost]:a.cost;
  const score=(option,cost)=>{
    const left={...ready};
    let discarded=0;
    for(const id of cost){
      if(hand.has(id))discarded++;
      else left[game.sign(id)]--;
    }
    const {a}=option;
    const preserve=(ready['+']>0&&left['+']===0?1:0)+(ready['−']>0&&left['−']===0?1:0);
    const required=(a.kind==='Transmute'||a.kind==='Replace')?(a.reversed?'−':'+'):null;
    return 100*discarded+10*preserve+(required?ready[required]-left[required]:0);
  };
  for(const option of options){
    const {cost:_,...effect}=option.a;
    const key=JSON.stringify(effect);
    if(!groups.has(key))groups.set(key,new Map());
    const choices=groups.get(key),cost=costOf(option);
    const payment=JSON.stringify(cost.map(id=>hand.has(id)?id:game.sign(id)).sort());
    if(!choices.has(payment))choices.set(payment,{option,rank:score(option,cost)});
  }
  return [...groups.values()].map(choices=>{
    const payments=[...choices.values()].sort((a,b)=>a.rank-b.rank).map(({option})=>option);
    return {...payments[0],payments};
  });
}
function greatWorkRivals(game,s){
  return s.players.filter((player,index)=>index!==s.turn&&game.threatened(player));
}

const game=createGreatWork(DECK);
const keys={up:16,right:32,down:64,left:128,L:256,R:512,triangle:4096,circle:8192,cross:16384,square:32768,start:8,select:1};
const gold=0xffd89e, paper=0xf8f6ef, muted=0xe2cfc2, purple=0x574736;
const elements=game.elements;
const elementInk={Air:0xffd5cf,Water:0xf7da98,Earth:0xa9e8ad,Fire:0xaabaff,All:0xcfc1ff};
const tierGlyph={Modest:30,Major:31,Master:32,Mystery:33,Mythic:34};
const tierColor={Modest:0xb5d2f2,Major:0x91daff,Master:0x7fd4ff,Mystery:0xe3caa5,Mythic:0x9cf0de};
const elementIcon={Air:0,Water:1,Earth:2,Fire:3,All:4};
const actionIcon={Transmute:18,Replace:28,Ward:15,Bless:12,Hex:16,Study:17};
let state=null, previous=0, mode=0, modeMenu=true, menu=null, cursor=0, section=0, slot=0, side=0;
let runningMode=0, dirty=true;
const focusPositions={};
let boardFocus=null;
function easeFocus(group,x,y,w,h){
const target=[x,y,w,h];
const previous=focusPositions[group]??target;
const eased=target.map((v,i)=>Math.abs(v-previous[i])<.3?v:previous[i]+(v-previous[i])*.22);
focusPositions[group]=eased;
highlight(...eased);
}
let holder=-1, preview=null, rx=0, ry=0, pay=null, ticks=0, error='', analogDirection=0, analogNext=0, lastPhase='';
const modes=['Solo vs. the Adept','2 players','3 players','4 players','Guided practice'];
const levels=['easy','normal','hard'];let level=1;
let guide=false;
const solo=()=>mode===0||mode===4;
const card=id=>game.cards.get(id);
const actor=()=>state.phase==='roundOver'?state.turn:state.pending?.i??state.turn;
const faces=['+','−'];
const markGlyph=face=>face==='+'?13:14;
const markColor=face=>face==='+'?0xa9e9bd:0xc0a3ff;
const hasCard=(p,id)=>p.hand.includes(id);
const readyCount=()=>game.readyMarks(state.players[state.turn]).length;
const hexFlash=w=>w?.hexUntil!==undefined&&state.turnNumber<w.hexUntil;
const clean=text=>String(text).replace(/[−–—]/g,'-').replace(/[’‘]/g,"'").replace(/[^ -~]/g,' ');
const label=(text,x,y,c=paper,n=58,scale=1)=>ink(clean(text).slice(0,n),x,y,c,scale);
const border=(x,y,w,h,color=purple)=>glass(x,y,w,h,color);
const image=(id,x,y,w,h,reversed=false)=>art(card(id)?.tex??90,x,y,w,h,0,0,reversed);
function begin(){
const seats=solo()?[{name:'You',ai:false},{name:'The Adept',ai:true}]:
Array.from({length:mode+1},(_,i)=>({name:'Player '+(i+1),ai:false}));
guide=mode===4;state=guide?game.practiceRound():game.round(seats);if(!guide)state.difficulty=levels[level];dirty=true;runningMode=mode;modeMenu=false;holder=solo()?0:-1;section=0;slot=side=0;menu=preview=pay=null;error='';lastPhase='';
}
function show(title,items){menu={title,items};cursor=0}
function dismiss(){menu=null;cursor=0}
const item=(label,run,glyph=17)=>({label,run,glyph});
function openPreview(id,work=null){if(id){preview={id,reversed:Boolean(work?.reversed),work,zoom:false};rx=ry=0}}
function execute(f){dismiss();preview=null;f();dirty=true}
function rivalWarning(){
  const rivals=greatWorkRivals(game,state);
  if(rivals.length===1)return rivals[0].name+' wins if you end your turn.';
  if(rivals.length>1)return 'The aligned rivals tie if you end your turn.';
  return '';
}
function finishTurn(source=null){
  const finish=()=>execute(()=>{
    if(state.phase==='act')game.endActions(state);
    if(source!==null&&state.phase==='draw')game.freeDraw(state,source);
  });
  const threat=rivalWarning(), remaining=readyCount();
  if(state.phase!=='act'||(!remaining&&!threat)){finish();return}
  preview=null;
  show(threat?'Winning alignment':remaining+' unused '+(remaining===1?'Mark':'Marks'),[
    item('Keep playing',dismiss,23),item('End turn anyway',finish,27)
  ]);
  if(threat)menu.message=threat;
}
function payment(n,run,title,first=null){
const ids=first?[first]:[];
if(ids.length===n){execute(()=>run(ids));return}
pay={n,run,ids};
const p=state.players[actor()];
show(title,p.hand.map(id=>({...item('',()=>{
if(pay.ids.includes(id)){pay.ids=pay.ids.filter(x=>x!==id);return}
pay.ids.push(id);
if(pay.ids.length===n){const {run,ids}=pay;pay=null;execute(()=>run(ids))}
}),cardId:id})));
if(first)cursor=Math.max(0,p.hand.findIndex(id=>id!==first));
}
function costLabel(cost, player){
  return cost.length?cost.map(id=>({face:game.sign(id),card:hasCard(player,id),id})):[];
}
function costPreview(cost){
  return cost.map(mark=>(mark.card?'card ':'')+(mark.face==='+'?'+':'-')).join(' ');
}
function moveEntry(group){
  const player=state.players[state.turn], a=group.a;
  const marks=({a,combo})=>costLabel(combo?[...combo.study.cost,...a.cost]:a.cost,player);
  const cost=marks(group);
  const who=a.i===state.turn?'My':state.players.length===2?'Rival':'P'+(a.i+1);
  const short=a.kind==='Replace'?who+' '+a.e+' swap':
    a.kind==='Transmute'?'Play '+a.e:
    a.kind==='Ward'?'Set Ward':a.kind==='Bless'?'Bless '+a.e:
    a.kind==='Hex'?'Hex '+a.e+' P'+(a.i+1):'Draw extra';
  const orientation=a.kind==='Bless'?10:a.reversed===undefined?null:a.reversed?11:10;
  const play=option=>execute(()=>option.combo?game.playFromShelf(state,option.combo):game.act(state,option.a));
  const payFor=(option,goBack)=>{
    const payment=marks(option), discarded=payment.filter(mark=>mark.card);
    if(!discarded.length){play(option);return}
    show('Spend Mystery Marks?',[
      item('Go back',goBack,23),item('Confirm payment',()=>play(option),27)
    ]);
    menu.message='Discard '+discarded.map(mark=>card(mark.id).name).join(', ');
    menu.onBack=goBack;
  };
  const preserveMenu=()=>{
    const previous=menu,index=cursor;
    return ()=>{menu=previous;cursor=index};
  };
  const alternate=group.payments.length>1?()=>{
    const goBack=preserveMenu();
    show('Choose payment',group.payments.map((option,i)=>{
      const payment=marks(option);
      return {...item(i===0?'Suggested':'Pay',()=>payFor(option,preserveMenu())),cost:payment,
        note:payment.some(mark=>mark.card)?payment.filter(mark=>mark.card).map(mark=>card(mark.id).name).join(', '):null};
    }));
    menu.onBack=goBack;
    menu.paymentOptions=true;
  }:null;
  return {...item(short,()=>payFor(group,preserveMenu()),actionIcon[a.kind]),
    move:a,cardId:a.id,cost,orientation,alternate};
}
function distinctMoves(moves,pairs=false){
  const choices=moves.map(move=>pairs?{a:move.play,combo:move}:{a:move});
  const rank={Bless:0,Hex:1,Transmute:2,Replace:3,Ward:4,Study:5};
  return groupGreatWorkMoves(game,state,choices)
    .sort((a,b)=>rank[a.a.kind]-rank[b.a.kind]).map(moveEntry);
}
function restoreItems(first=null){
  return faces.filter(face=>game.canRestore(state,face)).map(face=>{
    const price=game.restorePrice(state), tag=face==='+'?'+':'-';
    return item('Restore '+tag+' for '+price+' card'+(price===1?'':'s'),()=>payment(
      price,ids=>game.restoreMark(state,face,ids),'Restore '+tag+': choose '+price,first
    ),markGlyph(face));
  });
}
function actions(filter,title,handCard=null){
  const picks=distinctMoves(game.legal(state).filter(filter));
  if(handCard)picks.push(...restoreItems(handCard));
  show(title,picks.length?picks:[item('No legal actions',dismiss)]);
  menu.actions=true;
}
function playHandCard(id){
  openPreview(id);
  const mythic=card(id).mythic;
  actions(a=>a.id===id,mythic?'Mythic: choose a slot':'Play this card',id);
  if(!mythic)return;
  const slots=new Map(), choices=[];
  for(const entry of menu.items){
    const move=entry.move;
    if(!move?.e){choices.push(entry);continue}
    const key=move.i+':'+move.e;
    if(!slots.has(key)){
      const owner=move.i===state.turn?'Your':state.players.length===2?'Rival':'P'+(move.i+1);
      const group=[];
      slots.set(key,group);
      choices.push(item(owner+' '+move.e,()=>{
        show(move.e+': choose facing',group);menu.mythic=id;
      },elementIcon[move.e]));
    }
    slots.get(key).push({...entry,label:move.reversed?'Reversed':'Upright'});
  }
  menu.items=choices;
}
function moveAdvice(a){
if(a.kind==='Hex'&&game.threatened(state.players[a.i]))return [150,'Break the rival set before it can win.'];
if(a.kind==='Bless')return [110,'Bless this element upright and lock it.'];
if(a.kind==='Transmute')return a.reversed?[75,'Fill an empty slot and turn it upright later.']:[105,'Add an upright element to your set.'];
if(a.kind==='Replace')return [65,'Change the card occupying this element.'];
if(a.kind==='Ward')return [60,'Save a Ward to block a Hex.'];
if(a.kind==='Hex')return [50,'Disrupt the rival field.'];
return [40,'Draw an extra card and keep your free draw.'];
}
function guideMenu(explain=true){
actions(()=>true,'All legal plays');
if(!menu.items[0]?.move)menu.items=[];
menu.items.sort((a,b)=>moveAdvice(b.move)[0]-moveAdvice(a.move)[0]);
for(const entry of menu.items){
if(entry.cardId)entry.label+=' / '+card(entry.cardId).name;
}
if(explain&&menu.items.length)menu.items[0].recommended=true;
menu.items.push(...restoreItems(),item('Finish actions',()=>finishTurn(),27),item('Board map',boardMap,21));
menu.guide=explain;
}
function boardMap(){
show('Board map',[
item('Top left: rival field',guideMenu,16),
item('Middle left: your four elements',guideMenu,4),
item('Bottom: your hand',guideMenu,25),
item('Right: Shelf and draw pile',guideMenu,17),
item('Far right: Wards and Marks',guideMenu,15),
item('Bottom bar: turn and win warnings',guideMenu,26),
item('Triangles: Modest 1, Major 2, Master 3',guideMenu,4)
]);
}
function options(){
show('Turn options',[item('All legal plays',()=>guideMenu(guide),4),
  ...restoreItems(),item('Finish actions',()=>finishTurn(),27)]);
}
function pause(){
show('Paused',[
item('Resume',dismiss),item(guide?'Turn guidance off':'Turn guidance on',()=>{guide=!guide;dismiss();},4),item('Controls',()=>show('Controls',[
item('D-pad / analog: move cursor',pause,21),
item('Triangle: change payment if shown',pause,24),
item('Confirm / card actions',pause,22),
item('Back / open Exit from pause',pause,23),
item('Options / zoom in inspection',pause,24),
item('Inspect highlighted card',pause,25),
item('L / R: switch sections',pause,26)
]),21),item('Game rules',rulesMenu,4),item('Reset match',()=>{if(!systemResetDialog())show('Reset this match?',[item('Keep playing',dismiss),item('Reset match',begin)])},28),
item('Exit match',exitMatch,23),
]);
}
function rulesMenu(){
show('Game rules',[
item('Refresh two + and two - each turn',dismiss,13),
item('Summon costs 3 Modest, 2 Major, 1 Master',dismiss,18),
item('Upright needs +, reversed needs -',dismiss,11),
item('Mythics play free in either direction',dismiss,34),
item('Replace Locked with equal/higher tier',dismiss,28),
item('Hex flips an unlocked rival card',dismiss,16),
item('Bless locks your reversed card upright',dismiss,12),
item('A face-down Ward blocks one Hex',dismiss,15),
item('Discard 1 then 2 cards to restore Marks',dismiss,14),
item('Finish: check rivals, then draw one',dismiss,17),
item('Hold four aligned through a rival turn',dismiss,27),
item('Back',pause,23)]);
}
function exitMatch(){
show('Exit match?',[
item('Keep playing',pause),
item('Exit to title',()=>{state=null;holder=-1;modeMenu=true;dismiss();preview=pay=null;},27)
]);
}
const boardOwner=()=>solo()?0:holder;
const opponent=own=>side!==own?side:(own+1)%state.players.length;
const danger=p=>game.threatened(p)?2:game.score(p).includes(3)?1:0;
const dangerInk=[0,0x81c5ff,0x7777ff];
function boardSlots(){
const own=boardOwner(), rival=opponent(own), p=state.players[own], cells=[];
function add(group,index,seat,x,y,w,h,id=null,extra={}){
cells.push({group,index,seat,x,y,w,h,id,...extra});
}
for(const [seat,y] of [[rival,3],[own,86]]){
elements.forEach((element,i)=>{
const work=state.players[seat].work[element];
add(1,i,seat,6+i*68,y,64,81,work?.id,{element,work});
});
}
game.draws(state).forEach((source,i)=>add(2,i,own,290+i%2*65,3+Math.floor(i/2)*83,64,81,source==='deck'?null:state.shelf[Number(source)],{source}));
p.wards.forEach((ward,i)=>add(3,i,own,424+i*24,87,23,26,ward.id));
p.hand.forEach((id,i)=>add(0,i,own,p.hand.length>7?6+i*59:6+i*68,169,p.hand.length>7?56:64,81,id));
return cells;
}
function selectedCell(cells){
return cells.find(c=>c.group===section&&c.index===slot&&(section!==1||c.seat===side))
??cells.find(c=>c.group===section&&(section!==1||c.seat===side))
??cells[0];
}
function focus(cell){
if(!cell)return;
section=cell.group;slot=cell.index;
if(section===1)side=cell.seat;
}
function availableCells(cells=boardSlots()){
if(state.phase==='draw')return cells.filter(c=>c.group===2);
if(state.phase==='discard')return cells.filter(c=>c.group===0);
return cells;
}
function moveBoard(dx,dy){
const cells=availableCells(), from=selectedCell(cells);
if(!from)return;
const cx=c=>c.x+c.w/2,cy=c=>c.y+c.h/2;
let next=null,best=Infinity;
for(const c of cells){
const x=cx(c)-cx(from),y=cy(c)-cy(from);
const along=dx*x+dy*y, across=Math.abs(dx*y-dy*x);
if(along<18||across>along+14)continue;
const score=along+across*3;
if(score<best){best=score;next=c;}
}
if(!next&&dy<0&&state.players.length>2&&from.group===1&&from.seat!==boardOwner()){
let seat=(from.seat+1)%state.players.length;
if(seat===boardOwner())seat=(seat+1)%state.players.length;
side=seat;
}else focus(next);
}
function cycleSection(direction){
const cells=availableCells(),own=boardOwner();
for(let i=1;i<=4;i++){
const group=(section+direction*i+4)%4;
const next=cells.find(c=>c.group===group&&(group!==1||c.seat===own));
if(next){focus(next);return;}
}
}
function hidden(){return !solo()&&holder!==actor()&&state.phase!=='roundOver'}
function defending(){
  const w=state.players[actor()].wards[0];
  show('Defend '+state.pending.e,[
    {...item('Reveal Ward',()=>execute(()=>game.resolveHex(state,0)),15),cardId:w.id},
    item('Let the Hex happen',()=>execute(()=>game.resolveHex(state)),23)
  ]);
}
function tick(){
  if(!state||modeMenu||menu||hidden()||preview||state.phase==='roundOver')return;
  if(state.phase==='pass'){
    game.ready(state);
    const threat=rivalWarning();
    if(threat&&!state.players[state.turn].ai){
      show('Winning alignment',[item('Continue turn',dismiss,27)]);
      menu.message=threat;menu.turnNotice=true;
    }
    dirty=true;return;
  }
  if(state.players[actor()].ai){if(ticks%18===0){game.aiStep(state);dirty=true}return}
  if(state.phase==='ward'){defending();dirty=true}
}
function confirm(){
if(state.phase==='roundOver'){
if(solo()||state.matchOver)begin();
else{state=game.nextRound(state);holder=-1;}
return;
}
const current=selectedCell(availableCells());
if(!current)return;
focus(current);
if(state.phase==='discard'){if(current.id)execute(()=>game.discardHand(state,current.id));return;}
if(current.group===2&&(state.phase==='draw'||state.phase==='act')){
if(state.phase==='draw'){finishTurn(current.source);return}
openPreview(current.id);
actions(a=>a.source===current.source,current.source==='deck'?'Draw pile':'Shelf');
if(!menu.items[0]?.move)menu.items=[];
if(current.id){
  const combined=distinctMoves(game.shelfPlays(state,current.source),true);
  if(combined.length)menu.items.push(item('Draw and play',()=>{
    show('Shelf: choose play',combined);menu.shelf=current.source;
  },18));
}
menu.items.push(item('Take and finish turn',()=>finishTurn(current.source),27));
return;
}
if(state.phase!=='act')return;
if(section===0&&current.id){
playHandCard(current.id);
}
if(section===1){
openPreview(current.id,current.work);
const own=side===state.turn;
actions(a=>a.e===current.element&&(a.i===side||own&&a.i===undefined),current.element+' field');
if(own&&current.work?.reversed&&!game.legal(state).some(a=>a.kind==='Bless'&&a.e===current.element)){
  menu.note='Bless costs one + Mark.';
  menu.items.push(...restoreItems());
}
menu.items.push(item('All legal plays',()=>{preview=null;guideMenu(guide);},4));
}
if(section===3&&current.id){
openPreview(current.id);
show('Ward',[item('Keep Ward',()=>{dismiss();preview=null},15),item('Discard Ward',()=>execute(()=>game.discardWard(state,current.index)),27)]);
}
}
function handle(b){
const hit=k=>(b&keys[k])!==0;
if(modeMenu){
if(hit('up'))mode=(mode+modes.length-1)%modes.length;
if(hit('down'))mode=(mode+1)%modes.length;
if(hit('left'))level=(level+2)%3;
if(hit('right'))level=(level+1)%3;
if(hit('cross'))begin();
if(hit('circle')&&state){mode=runningMode;modeMenu=false}
return;
}
if(hidden()&&!menu){if(hit('start')){pause();return;}if(hit('cross')){holder=actor();slot=0;side=state.turn;section=0;menu=preview=pay=null;lastPhase=''}return}
if(hit('start')){
if(menu?.turnNotice)return;
if(menu?.title==='Paused'){dismiss();return;}
if(state.phase!=='ward'){preview=pay=null;pause();}
return;
}
if(state.players[actor()].ai&&state.phase!=='roundOver'&&!menu)return;
if(menu?.turnNotice){if(hit('cross'))dismiss();return}
if(hit('triangle')&&menu?.items[cursor]?.alternate){menu.items[cursor].alternate();return}
if(preview&&hit('triangle')&&!menu){preview.zoom=!preview.zoom;return}
if(preview?.zoom){
if(hit('circle')||hit('square')||hit('cross'))preview.zoom=false;
return;
}
if(menu){
if(pay){
const column=cursor%4;
if(hit('left')&&column>0)cursor--;
if(hit('right')&&column<3&&cursor+1<menu.items.length)cursor++;
if(hit('up')&&cursor>=4)cursor-=4;
if(hit('down')&&cursor+4<menu.items.length)cursor+=4;
}else{
if(hit('up'))cursor=Math.max(0,cursor-1);
if(hit('down'))cursor=Math.min(menu.items.length-1,cursor+1);
if(preview&&menu.actions&&section===0&&(hit('left')||hit('right'))){
const hand=state.players[actor()].hand;
slot=Math.max(0,Math.min(hand.length-1,slot+(hit('right')?1:-1)));
if(hand[slot])playHandCard(hand[slot]);
return;
}
}
if(hit('cross')){menu.items[cursor]?.run();return;}
if(hit('circle')||hit('square')){
if(state.phase==='ward'){if(hit('circle'))execute(()=>game.resolveHex(state));return;}
if(menu.onBack){menu.onBack();return;}
if(hit('circle')&&menu.mythic){playHandCard(menu.mythic);return;}
if(hit('circle')&&menu.shelf!==undefined){confirm();return;}
if(hit('circle')&&menu.title==='Paused'){exitMatch();return;}
if(hit('circle')&&(menu.title==='Controls'||menu.title==='Game rules'||menu.title==='Exit match?')){pause();return;}
if(menu.title==='Board map'&&hit('circle')){guideMenu();return;}
dismiss();pay=null;preview=null;
}
return;
}
if(preview){
if(hit('circle')||hit('square')){preview=null;return;}
if(hit('cross')&&(state.phase==='act'||state.phase==='draw')){preview=null;confirm();return;}
if(section===0&&(hit('left')||hit('right'))){
const hand=state.players[actor()].hand;
slot=Math.max(0,Math.min(hand.length-1,slot+(hit('right')?1:-1)));
openPreview(hand[slot]);
}
return;
}
if(state.phase==='roundOver'){if(hit('cross'))confirm();return;}
if(hit('triangle')&&state.phase==='act'){if(guide)guideMenu();else options();return;}
if(hit('L')||hit('R')){cycleSection(hit('R')?1:-1);return;}
if(hit('up'))moveBoard(0,-1);
else if(hit('down'))moveBoard(0,1);
else if(hit('left'))moveBoard(-1,0);
else if(hit('right'))moveBoard(1,0);
if(hit('square')){
const current=selectedCell(availableCells());
if(current?.id)openPreview(current.id,current.work);
return;
}
if(hit('cross'))confirm();
}
function top(sub){
glass(0,0,480,30,0x806c4b);
icon(4,8,6,gold);label('The Great Work',31,3,gold,28,1.35);label(sub,234,7,paper,24);
}
function padFooter(groups){
glass(0,251,480,21,0x806c4b);
let x=8;
for(const [symbol,title,advance] of groups){icon(symbol,x,252,symbol>=22&&symbol<=25?0xffffff:gold);label(title,x+20,254,paper,18,.8);x+=advance}
}
function cardTile(id,x,y,w,h,selected=false,reversed=false,cropped=false){
if(selected)boardFocus=[x,y,w,h];
border(x,y,w,h,0x65574b);
if(id&&cropped)art(card(id).tex,x+2,y+2,w-4,h-4,0,0,reversed,3);
else image(id,x+2,y+2,w-4,h-4,reversed);
}
const reverseInk=0x9999ff;
function badge(glyph,x,y,color){
box(x,y,18,18,0x231821);
icon(glyph,x,y,color,true);
}
function cardBadges(id,x,y,w,h,reversed,element,work){
  const c=card(id), type=game.cardType(c), suit=element??c.element, tier=tierGlyph[type];
  const locked=game.locked(work);
  if(type!=='Mythic')badge(elementIcon[suit]+(reversed?35:0),x+2,y+h-20,elementInk[suit]);
  if(c.mark)badge(markGlyph(c.mark),x+2,y+2,markColor(c.mark));
  badge(tier+(reversed&&tier<=32?9:0),x+w-20,y+h-20,tierColor[type]);
  if(locked||work&&type==='Mythic'){
    badge(locked?12:reversed?11:10,x+w-20,y+2,locked?gold:reversed?reverseInk:0xa9e9bd);
  }
}
function pictured(id,x,y,w,h,selected=false,reversed=false,element=null,work=null){
cardTile(id,x,y,w,h,selected,reversed,true);
if(!id)return;
cardBadges(id,x,y,w,h,reversed,element,work);
if(hexFlash(work)){
  box(x,y,w,2,0x7474ff);box(x,y+h-2,w,2,0x7474ff);
  box(x,y,2,h,0x7474ff);box(x+w-2,y,2,h,0x7474ff);
}
}
function boardStatus(selected,own,rival){
const onTurn=own===state.turn;
const rivalLevel=danger(state.players[rival]);
const warning=state.players.map((p,i)=>i===own?0:danger(p));
const level=Math.max(...warning);
const seat=warning.indexOf(level);
const whose=state.players[state.turn].name.replace('The ','');
const turn=state.phase==='ward'?'Defend '+state.pending.e:onTurn?'Your turn':whose+"'s turn";
const color=onTurn?0xc5efb4:0xffd5a6;
box(3,253,474,17,onTurn?0x25372a:0x492f22);
icon(10,5,252,color,true);
label(turn,27,253,color,20,.95);
if(level){
const who=state.players[seat].name.replace('The ','');
const message=level===2?(onTurn?rivalWarning()||who+' has a winning set':who+' has a winning set'):who+' is 1 card away';
box(161,253,316,17,level===2?0x362374:0x254b65);
icon(16,163,252,dangerInk[level],true);
label(message,185,253,paper,40,.95);
}else{
const prompt=state.phase==='draw'?'Free draw':state.phase==='discard'?'Discard a card':'';
if(prompt)label(prompt,166,254,paper,30,.85);
else if(onTurn&&state.phase==='act'&&!menu){icon(22,164,252,0xffffff);label('Play',184,254,paper,6,.85);icon(25,226,252,0xffffff);label('Inspect',246,254,paper,9,.85);icon(24,310,252,0xffffff);label('Options',330,254,paper,9,.85)}
else if(!onTurn&&state.players[state.turn].ai)label('Thinking...',166,254,muted,14,.85);
if(guide&&onTurn&&state.phase==='act')icon(24,452,252,gold);
}
if(rivalLevel===2)icon(16,438,52,dangerInk[rivalLevel],true);
}
function drawBoard(){
const own=boardOwner(), cells=boardSlots(), selected=selectedCell(availableCells(cells));
const onTurn=state.turn===own,rival=opponent(own);
const rivalLevel=danger(state.players[rival]);
function frame(x,y,w,h,color){
box(x,y,w,1,color);box(x,y+h-1,w,1,color);
box(x,y,1,h,color);box(x+w-1,y,1,h,color);
}
frame(3,1,275,84,dangerInk[rivalLevel]||(onTurn?0x786078:0xffd5a6));
if(rivalLevel===2)frame(4,2,273,82,dangerInk[2]);
frame(3,85,275,83,onTurn?0xc5efb4:0xa79663);
frame(3,168,474,84,onTurn?0xc5efb4:0x645570);
frame(286,1,134,167,0xa77959);
frame(421,1,55,84,0x786078);
frame(421,85,55,83,0xa79663);
const rivals=state.players[rival].wards;
if(rivals.length)image(null,425,5,23,26);
else icon(15,427,9,0x786078,true);
if(!state.players[own].wards.length)icon(15,427,92,0xa79663,true);
for(const c of cells){
const {id,x,y,w,h,work,element}=c;
if(c.group!==1||id){
pictured(c.group===3?null:id,x,y,w,h,false,work?.reversed,element,work);
if(c.group===2){
frame(x,y,w,h,0xb69364);
if(c.source==='deck'){
const count=String(state.deck.length),width=count.length*6;
box(x+Math.floor((w-width)/2)-5,y+h-17,width+10,15,0x000000,.78);
label(count,x+Math.floor((w-width)/2),y+h-15,paper,3,.8);
}
}
}else{
glass(x,y,w,h,0x5d4b59,.66);
icon(elementIcon[element],x+Math.floor(w/2)-9,y+Math.floor(h/2)-9,elementInk[element],true);
}
if(c.group===1&&c.seat===rival&&rivalLevel===1&&(!work||work.reversed===(game.upright(state.players[rival])===3)))
frame(x,y,w,h,dangerInk[1]);
if(c.group===selected?.group&&c.index===selected.index&&(c.group!==1||c.seat===selected.seat))
boardFocus=[x,y,w,h];
}
boardStatus(selected,own,rival);
for(const [seat,y] of [[rival,33],[own,119]]){
  state.players[seat].marks.forEach((mark,i)=>{
    const face=game.sign(mark.id);
    if(mark.spent)image(null,430+i%2*21,y+Math.floor(i/2)*17,15,17);
    else badge(markGlyph(face),428+i%2*21,y+Math.floor(i/2)*17,markColor(face));
  });
}
}
function drawPayment(){
box(174,30,298,215,0x241c16);
glass(174,30,298,215,0x9f7153);
label(menu.title,184,39,paper,28);
for(let i=0;i<pay.n;i++)icon(i<pay.ids.length?27:17,386+i*21,36,i<pay.ids.length?0xa9e9bd:muted);
menu.items.forEach((it,i)=>{
const x=184+i%4*71,y=62+Math.floor(i/4)*88;
pictured(it.cardId,x,y,59,80);
if(pay.ids.includes(it.cardId))badge(27,x+37,y+3,0xa9e9bd);
if(i===cursor)highlight(x,y,59,80);
});
if(!preview){
const selected=menu.items[cursor]?.cardId;
if(selected)art(card(selected).tex,23,38,126,171,0,0,false,1);
}
}
function draw(){
table();boardFocus=null;
if(modeMenu){
top('PSP build 20');
image(null,306,58,114,156);
modes.forEach((v,i)=>{border(32,42+i*38,238,32,0x624760);label(v,44,48+i*38,paper,25,1.13)});
easeFocus('setup',32,42+mode*38,238,32);
label('Adept level  < '+['Easy','Normal','Hard'][level]+' >   Left/Right',32,233,gold,40,.85);
padFooter([[21,'Choose',110],[22,'Confirm',110],[23,'Back',110]]);return;
}
if(hidden()&&!menu){top('Private handoff');label('Pass the PSP to '+state.players[actor()].name,70,107,gold,42,1.24);padFooter([[22,'Reveal your hand',170]]);return}
if(state.phase==='roundOver'){
label(state.winner===null?'Round tied':state.players[state.winner].name+' wins!',102,91,gold,34,1.4);
label(state.reason,102,120);
icon(22,102,151,0xffffff);
}else if(!hidden()){
drawBoard();
if(boardFocus&&!state.players[actor()].ai)highlight(...boardFocus);
}
if(preview&&!preview.zoom){
  const x=menu?12:158,y=menu?28:17,w=menu?151:164,h=menu?208:226;
  box(7,9,466,238,0x241c16);
  border(7,9,466,238,gold);
  art(card(preview.id).tex,x,y,w,h,rx,ry,preview.reversed,1);
  if(preview.work)cardBadges(preview.id,x,y,w,h,preview.reversed,null,preview.work);
}
if(pay)drawPayment();
else if(menu&&!preview?.zoom){
const x=preview?174:10, y=preview?60:38,w=preview?285:460;
const selected=menu.items[cursor];
const tip=menu.message??(menu.paymentOptions?selected?.note:null);
border(x,y,w,preview?182:207,gold);
label(menu.title,x+8,y+4,gold,preview?34:53,1);
const visible=menu.message?5:menu.note?4:menu.guide?5:preview?6:6;
const offset=Math.max(0,Math.min(cursor-2,menu.items.length-visible));
menu.items.slice(offset,offset+visible).forEach((it,j)=>{
const index=offset+j,row=y+23+j*(preview?24:28);
if(index===cursor)glass(x+5,row,w-10,preview?22:26,0x91764d);
if(it.cardId&&!preview)tile(card(it.cardId).tex,x+8,row+2,34,22,false);
else icon(it.glyph,x+8,row+2,gold);
const labelX=x+(it.cardId&&!preview?48:32);
const textLimit=it.cost?.length||it.orientation!=null?(preview?19:38):(preview?32:53);
label(it.label,labelX,row+3,it.recommended?gold:paper,textLimit,.84);
if(it.orientation!=null)icon(it.orientation,x+w-89,row+1,it.orientation===11?reverseInk:0xa9e9bd,true);
if(it.cost?.length){
  const step=14,start=x+w-5-it.cost.length*step;
  for(const [i,mark] of it.cost.entries()){
    if(mark.card)box(start+i*step,row+3,13,15,0x59436c);
    icon(markGlyph(mark.face),start+i*step-2,row+2,markColor(mark.face));
  }
}
});
highlight(x+5,y+23+(cursor-offset)*(preview?24:28),w-10,preview?22:26);
if(menu.note)label(menu.note,x+9,211,muted,38,.82);
if(tip)label(tip,x+9,preview?230:230,muted,preview?40:70,.82);
if(selected?.alternate){
  icon(24,x+w-112,221,0xffffff);
  label('Payment',x+w-87,225,paper,12,.85);
}
if(menu.title==='Paused'){
icon(23,x+9,218,0xffffff);
label('Exit match',x+30,222,muted,12,.8);
}
if(menu.guide){
const entry=menu.items[cursor];
const tip=entry?.move?(entry.recommended?'Suggested: ':'')+moveAdvice(entry.move)[1]:'Choose a move or finish your turn.';
label(tip,x+9,213,gold,72,.86);
}
}
if(preview?.zoom){
box(7,34,466,213,0x241c16);
border(7,34,466,213,gold);
art(card(preview.id).tex,119,47,243,183,0,0,preview.reversed,2);
if(preview.work)cardBadges(preview.id,119,47,243,183,preview.reversed,null,preview.work);
}
if(error)label(error,9,234,0x9696ff,57);
}
globalThis.confirmSystemReset=()=>{if(menu?.title==='Paused')begin()};
globalThis.frame=(buttons,lx,ly,forceDraw=false)=>{
ticks++;
const ax=lx-128,ay=ly-128;
let pressed=buttons&~previous;previous=buttons;
if(!preview||pay||menu){
const direction=Math.max(Math.abs(ax),Math.abs(ay))<52?0:
Math.abs(ax)>Math.abs(ay)?(ax>0?keys.right:keys.left):(ay>0?keys.down:keys.up);
if(direction&&(direction!==analogDirection||ticks>=analogNext)){
if(!(pressed&(keys.up|keys.down|keys.left|keys.right)))pressed|=direction;
analogNext=ticks+(direction===analogDirection?7:16);
}
analogDirection=direction;
}else analogDirection=0;
if(pressed)try{dirty=true;handle(pressed)}catch(e){error=e.message;diagnostic('Input: '+e.stack);dismiss();pay=null;preview=null;}
try{tick()}catch(e){error=e.message;diagnostic('Turn: '+e.stack)}
if(state&&!modeMenu&&state.phase!==lastPhase){
lastPhase=state.phase;
if(!hidden()&&!state.players[actor()].ai){
if(lastPhase==='draw'){section=2;slot=0;}
if(lastPhase==='discard'){section=0;slot=0;}
}
}
if(preview&&!pay&&!menu){
if(Math.abs(ax)>16){ry=(ry+ax*.00065)%(2*Math.PI);dirty=true}
if(Math.abs(ay)>16){rx=Math.max(-1.25,Math.min(1.25,rx+ay*.00065));dirty=true}
}
if(!forceDraw&&!dirty&&ticks%2!==0)return false;
dirty=false;draw();return true;
};
