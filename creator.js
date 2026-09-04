const slug = new URLSearchParams(location.search).get('id');
const creator = window.C3_CREATORS[slug];
const root = document.querySelector('#profile');
const profileHeader=document.querySelector('.profile-header');
if(profileHeader){
  let previousScroll=window.scrollY;
  let headerFrame=false;
  const updateHeader=()=>{
    const currentScroll=window.scrollY;
    if(currentScroll<90) profileHeader.classList.remove('is-hidden');
    else if(currentScroll>previousScroll+3) profileHeader.classList.add('is-hidden');
    else if(currentScroll<previousScroll-3) profileHeader.classList.remove('is-hidden');
    previousScroll=currentScroll;
    headerFrame=false;
  };
  addEventListener('scroll',()=>{if(!headerFrame){headerFrame=true;requestAnimationFrame(updateHeader)}},{passive:true});
}
const imageFocus = {
  'beatrice-lorenzi':'62% 42%','lo-scribacchino':'50% 42%','cristiana-nerdarte':'52% 42%','itsklyo':'50% 38%',
  'vale-spaccagiochi':'50% 35%','golgota':'50% 55%','carla-grimaldi':'50% 42%','mochichuu':'52% 48%',
  'loon':'50% 42%','sareika-lab':'48% 42%','faenel':'52% 40%','nennella-esposito':'52% 43%',
  'ardenchan':'54% 42%','shizen':'50% 42%','team-rocker':'50% 44%','il-forla':'50% 45%',
  'dio-eros':'50% 22%','maurolone':'50% 44%','ludo-thorn':'62% 38%','inazuma-sensei':'62% 52%',
  'kety':'50% 38%','filo-d-oro':'50% 30%','kiria-eternalove':'32% 43%','ede-e-davide':'50% 40%',
  'sa-leggenda':'55% 40%','crudest-tv':'54% 22%','monkey-tuna':'31% 38%','pepiyos':'50% 50%',
  'teddino':'50% 44%','shorii':'50% 43%','soryu-geggy':'50% 24%','spiegabro':'50% 32%','teo-the-teach':'50% 38%',
  'sonny-cosplay':'50% 40%','gattoacab':'50% 50%','never-20':'66% 58%'
};

function explainActivity(activity, person){
  if(activity&&typeof activity==='object'&&activity.description) return activity.description;
  const title=typeof activity==='object'?activity.title:activity;
  const label=title.toLowerCase();
  if(/hosting|conduzione|presentazione|stage host/.test(label)) return `${person.name} gestisce il palco dall’apertura alla chiusura: introduce gli ospiti, tiene i tempi, collega i diversi momenti del programma e mantiene attivo il rapporto con il pubblico. Il format viene preparato insieme all’organizzazione, compresi scaletta, tono e gestione degli imprevisti.`;
  if(/moderazione|interviste|q&a/.test(label)) return `${person.name} prepara domande e temi in anticipo, guida la conversazione senza tempi morti e valorizza ogni ospite. Può integrare domande dal pubblico, momenti di confronto e call to action, adattando il registro a una platea generalista o specializzata.`;
  if(/giuria|contest|gara/.test(label)) return `${person.name} partecipa alla valutazione con criteri chiari e coerenti con il regolamento, offrendo commenti utili ai partecipanti. Può affiancare la giuria alla conduzione del contest, coordinando presentazioni, passaggi sul palco e premiazione.`;
  if(/workshop|laboratori|dimostrazioni|simulazioni/.test(label)) return `${person.name} conduce un’esperienza pratica costruita sul livello del pubblico. L’attività alterna spiegazione, esempi e partecipazione diretta, con materiali e durata concordati in anticipo, così che ogni partecipante porti via competenze e un risultato concreto.`;
  if(/concerto|performance|show|main stage|musical|doppiaggio live|magia/.test(label)) return `${person.name} porta una performance completa, preparata sulla durata e sul pubblico della manifestazione. La scaletta, le esigenze tecniche e le prove vengono coordinate prima dell’evento; sul palco sono previsti momenti di coinvolgimento per trasformare lo spettacolo in un’esperienza condivisa.`;
  if(/meet & greet|firmacopie|foto|video-saluti|artist alley/.test(label)) return `${person.name} incontra la community in uno spazio organizzato per foto, firme e conversazioni. C3 Agency aiuta a definire durata, flussi, accessi e comunicazione, evitando code disordinate e rendendo l’incontro piacevole sia per il pubblico sia per l’evento.`;
  if(/gaming|gdr|gioco|sessioni|sfide/.test(label)) return `${person.name} trasforma l’area gaming in un’attività partecipativa: spiega le regole, coinvolge giocatori di livelli diversi e mantiene ritmo e spettacolarità. Il contenuto può diventare una sessione guidata, una sfida sul palco o un momento di divulgazione.`;
  if(/social|reel|video|itineranti|tra il pubblico/.test(label)) return `${person.name} si muove tra stand e aree evento per creare contenuti spontanei ma coordinati con gli obiettivi della fiera. Interviste, sketch e momenti community possono essere pensati per aumentare visibilità, racconto dell’atmosfera e condivisioni sui social.`;
  if(/panel|talk|approfondimenti|lezioni|storytelling|dialoghi/.test(label)) return `${person.name} costruisce un intervento originale intorno al tema scelto con l’organizzazione. Il panel combina racconto, esempi e approfondimento, mantiene un ritmo accessibile e può chiudersi con domande dal pubblico o una parte interattiva.`;
  if(/quiz|dibattiti/.test(label)) return `${person.name} prepara un format a domande e partecipazione diretta, calibrato sulla conoscenza del pubblico. Regole, premi, ritmo e contenuti vengono concordati prima dell’evento per creare un momento leggero, competitivo e facilmente condivisibile.`;
  return `${person.name} adatta questa attività al tema, alla durata e al pubblico della manifestazione. Prima dell’evento vengono definiti obiettivo, scaletta, necessità tecniche e modalità di coinvolgimento, così da inserire il format in modo naturale nel palinsesto.`;
}

const nerdartePanelDescriptions = {
  'Arte in Tim Burton: dal museo al cinema':'Un viaggio nell’immaginario di Tim Burton per scoprire come pittura, illustrazione, cinema espressionista e cultura gotica abbiano plasmato personaggi, scenografie e atmosfere dei suoi film.',
  'Il Medioevo secondo Walt Disney: come i cartoni hanno trasformato l’età di mezzo':'Castelli, cavalieri, principesse e magie: il panel confronta il Medioevo storico con quello reinventato dai classici Disney e mostra come l’animazione abbia trasformato la nostra idea dell’epoca.',
  'Cartoni a regola d’arte: che ci fanno le opere d’arte nei classici Disney?':'Una caccia alle citazioni artistiche nascoste nei film Disney, fra dipinti celebri, architetture e simboli che hanno ispirato animatori e scenografi.',
  'Revelio: l’Arte in Harry Potter fra location ed easter egg':'Dalle vere architetture usate come location ai riferimenti artistici disseminati nei film: uno sguardo da storica dell’arte sul mondo visivo di Harry Potter.',
  'Fiabe spaventose: il lato dark delle fiabe dai Fratelli Grimm alla Disney':'Le versioni originali delle fiabe erano molto più oscure di quelle che conosciamo. Il panel ripercorre la loro trasformazione, dai racconti popolari alle riscritture Disney.',
  'Animali fantastici e dove trovarli: dai miti a Newt Scamander!':'Un bestiario narrato che collega le creature del mondo magico alle loro radici nella mitologia, nel folklore e nell’arte.',
  'Dadi e Quadri: fatti ispirare dall’Arte per giocare a Dungeons and Dragons!':'Come usare opere, artisti e movimenti visivi per creare personaggi, ambientazioni e avventure memorabili nelle campagne di Dungeons & Dragons.',
  'Dal Museo al dungeon: quanto sono cambiati i mostri dal mito a DnD?':'Draghi, chimere, meduse e altre creature passano dai miti e dalle raffigurazioni antiche ai manuali di D&D: cosa è rimasto e cosa è cambiato?',
  'Pop Olimpo: come ci è finita l’Antica Grecia in TV?':'Divinità ed eroi greci tra serie, film, anime e animazione: il panel racconta come la cultura pop riscrive l’Olimpo per il pubblico contemporaneo.',
  'Medioevo da ridere: gli stereotipi comici dell’età di mezzo nella cultura pop':'Un’analisi ironica di re pasticcioni, cavalieri improbabili, streghe e villaggi fangosi, per separare il Medioevo reale dalle sue caricature pop.',
  'Storie di Streghe: dal mito alla cultura pop':'Dalle figure del folklore e dei processi storici alle streghe di cinema, serie e videogiochi: evoluzione, simboli e nuovi significati.',
  'Nell’antro della strega: storie di oggetti stregati fra cappelli a punta, scope volanti e sfere di cristallo':'Gli oggetti più iconici della magia raccontati attraverso storia, arte e folklore, fino alle loro reinterpretazioni nella cultura pop.',
  'Storie del Piccolo popolo: da dove nascono elfi, fate e folletti?':'Un percorso fra tradizioni europee, racconti popolari e fantasy moderno per scoprire origini e trasformazioni del Piccolo Popolo.',
  'Storie di Vampiri: dalla mitologia a Hollywood':'Dai demoni succhiasangue dell’antichità al conte Dracula e ai vampiri contemporanei: come nasce e cambia uno dei miti più longevi della cultura pop.',
  'All’Arrembaggio: i pirati dalla storia al mondo nerd':'La realtà della vita piratesca incontra romanzi, cinema, anime e videogiochi, sfatando miti e raccontando perché i pirati continuano ad affascinarci.',
  'Invito a Camelot: il mondo di Artù dal mito alla cultura pop':'Artù, Merlino, Excalibur e i Cavalieri della Tavola Rotonda dalle fonti medievali alle versioni moderne in film, serie, fumetti e videogiochi.',
  'Invito ad Avalon: le donne del mito arturiano e l’evoluzione dei loro personaggi':'Ginevra, Morgana, la Dama del Lago e le altre protagoniste del ciclo arturiano, osservate nelle fonti e nelle reinterpretazioni contemporanee.',
  'Benvenuti all’Inferno! Quanto sono biblicamente accurati Hazbin Hotel, Good Omens e Lucifer?':'Angeli, demoni e aldilà nelle serie più amate vengono messi a confronto con testi, iconografia e tradizioni che ne hanno costruito l’immaginario.',
  'Alle radici di Arda: storia e mito nell’universo di J.R.R. Tolkien':'Le fonti mitologiche, linguistiche, artistiche e storiche che hanno contribuito alla costruzione della Terra di Mezzo.',
  'In una galassia lontana lontana: viaggi nello spazio dal Medioevo a Star Wars':'Star Wars letto attraverso cavalieri, ordini, reliquie e modelli narrativi medievali, in un viaggio tra storia e fantascienza.',
  'I primi cosplayer erano imperatori romani! Viaggio nella storia del cosplay dall’Antica Roma ai giorni nostri':'Dalle feste in costume e dalle rievocazioni del passato alle convention moderne: una storia sorprendente del travestimento performativo e del cosplay.'
};

function activityCategory(activity){
  if(activity&&typeof activity==='object'&&activity.group) return activity.group;
  const label=(typeof activity==='object'?activity.title:activity).toLowerCase();
  if(/cosplay|giuria|contest|gara/.test(label)) return 'Cosplay';
  if(/hosting|conduzione|presentazione|interviste|stage host|moderazione/.test(label)) return 'Host';
  if(/panel|talk|approfondimenti|lezioni|storytelling|dialoghi|divulgazione|lore/.test(label)) return 'Panel & talk';
  if(/workshop|laboratori|dimostrazioni|simulazioni/.test(label)) return 'Workshop';
  if(/concerto|performance|show|main stage|musical|doppiaggio|magia/.test(label)) return 'Performance';
  if(/gaming|gdr|gioco|sessioni|sfide|quiz/.test(label)) return 'Gaming & GdR';
  if(/meet & greet|firmacopie|foto|video|social|artist alley|community/.test(label)) return 'Community & contenuti';
  return 'Attività in fiera';
}

function groupedActivities(person){
  if(person.slug==='cristiana-nerdarte') return [
    {name:'Host',items:[{title:'Moderazione, interviste e quiz',description:'Moderazione di panel tematici e interviste, intrattenimento sul palco, creazione e presentazione di quiz a premi dedicati a fantasy, Harry Potter, Tolkien, supereroi e fantascienza.'}]},
    {name:'Cosplay',items:[{title:'Giurata e presentatrice cosplay',description:'Giurata e presentatrice di gare cosplay, con esperienza diretta da cosplayer e capacità di accompagnare concorrenti e pubblico durante tutte le fasi del contest.'}]},
    {name:'Panel',items:person.activities.map(activity=>{const title=typeof activity==='object'?activity.title:activity;return{title,description:(typeof activity==='object'&&activity.description)||nerdartePanelDescriptions[title]||explainActivity(title,person)}})}
  ];
  const groups=[];
  person.activities.forEach(activity=>{
    const title=typeof activity==='object'?activity.title:activity;
    const name=activityCategory(activity);
    let group=groups.find(item=>item.name===name);
    if(!group){ group={name,items:[]}; groups.push(group); }
    group.items.push({title,description:explainActivity(activity,person)});
  });
  return groups;
}

if (!creator) {
  document.title = 'Creator non trovato | C3 Agency';
  root.innerHTML = `<section class="profile-error"><p class="eyebrow">Profilo non trovato</p><h1>Questo creator non è disponibile.</h1><a class="button" href="index.html#creator">Torna al roster</a></section>`;
} else {
  document.title = `${creator.name} | C3 Agency`;
  document.querySelector('meta[name="description"]').content = `${creator.name}: ${creator.description}`;
  const media = creator.image
    ? `<img src="${creator.image}" alt="${creator.name}" style="object-position:${imageFocus[creator.slug]||'50% 42%'}">`
    : `<div class="profile-monogram" aria-hidden="true">${creator.name.split(' ').map(word=>word[0]).slice(0,2).join('')}</div>`;
  const categories=groupedActivities(creator);
  const contactEmailTarget=window.C3_SITE_CONTENT?.contactEmailTarget||'info@c3agency.it';
  const contactWhatsappTarget=(window.C3_SITE_CONTENT?.contactWhatsappTarget||'393513448497').replace(/\D/g,'');
  const activitiesMarkup = `<div class="activity-categories">${categories.map((category,categoryIndex)=>`
    <details class="activity-category panel-list">
      <summary><span><span class="activity-kicker">Categoria ${String(categoryIndex+1).padStart(2,'0')}</span><strong>${category.name}</strong><small>${category.items.length} ${category.items.length===1?'attività':'attività disponibili'} · apri per i dettagli</small></span><i aria-hidden="true"><span>Mostra</span><b></b></i></summary>
      <ol>${category.items.map((item,index)=>`<li style="--panel-delay:${Math.min(index*24,240)}ms"><details class="panel-item"><summary><span>${item.title}</span><b aria-hidden="true"></b></summary><p>${item.description}</p></details></li>`).join('')}</ol>
    </details>`).join('')}</div>`;
  root.innerHTML = `
    <section class="profile-hero">
      <div class="profile-media">${media}<div class="profile-rings"><i></i><i></i><i></i></div></div>
      <div class="profile-copy">
        <p class="eyebrow">${creator.category}</p>
        <h1>${creator.name}</h1>
        <p class="profile-lead">${creator.description}</p>
        <span class="profile-meta">${creator.meta}</span>
      </div>
    </section>
    <section class="profile-activities">
      <div><p class="eyebrow">In fiera</p><h2>Cosa può fare.</h2></div>
      ${activitiesMarkup}
    </section>
    <section class="profile-cta"><p class="eyebrow">Inseriscilo nel tuo palinsesto</p><h2>Costruiamo il format giusto per il tuo evento.</h2><div class="contact-actions" style="justify-content:center"><a class="button light" href="mailto:${contactEmailTarget}?subject=${encodeURIComponent('Richiesta '+creator.name+' per una fiera')}&body=${encodeURIComponent(`Buongiorno C3 Agency,\n\nSono interessato/a a ${creator.name}.\n\n1. Nome e ruolo:\n2. Nome dell'evento:\n3. Città e location:\n4. Date previste:\n5. Affluenza stimata e pubblico:\n6. Format di interesse:\n7. Budget indicativo:\n8. Recapito telefonico:\n\nAltre informazioni:`)}">Richiedi via email</a><a class="button" href="https://wa.me/${contactWhatsappTarget}?text=${encodeURIComponent(`Buongiorno C3 Agency, vorrei informazioni su ${creator.name} per una fiera.`)}" target="_blank" rel="noreferrer">WhatsApp Business</a></div></section>`;
  const tabs=[...root.querySelectorAll('.activity-tabs button')];
  const panel=root.querySelector('.activity-detail');
  const selectActivity=index=>{
    tabs.forEach((tab,i)=>tab.setAttribute('aria-selected',String(i===index)));
    const activity=creator.activities[index];
    panel.querySelector('.activity-kicker').textContent=`Attività 0${index+1}`;
    panel.querySelector('h3').textContent=activity;
    panel.querySelector('p').textContent=explainActivity(activity,creator);
  };
  if(panel) tabs.forEach((tab,index)=>tab.addEventListener('click',()=>selectActivity(index)));
}
