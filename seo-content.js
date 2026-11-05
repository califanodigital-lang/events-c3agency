(function(){
  const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const lines=value=>String(value||'').split('\n').map(item=>item.trim()).filter(Boolean);
  const services=[
    {slug:'creator-ospiti-fiere-convention',key:'booking',label:'Creator e ospiti',title:'Creator e ospiti per fiere del fumetto e convention',lead:'Un cast costruito intorno al tuo pubblico: creator, divulgatori, cosplayer, musicisti e presentatori per fiere del fumetto, festival nerd e convention in tutta Italia.',text:'Partiamo dal tema della manifestazione, dalle date e dal pubblico che vuoi coinvolgere. Selezioniamo i profili disponibili e proponiamo attività coerenti con il programma: panel, meet & greet, conduzione, workshop e performance.\nIl booking viene definito insieme all’organizzazione. Durata, disponibilità, cachet ed esigenze tecniche dipendono dai creator e dalle attività richieste; viaggio e pernottamento vengono concordati nella proposta.',items:'Selezione dei creator in base a tema, pubblico e territorio\nVerifica delle disponibilità nelle date della manifestazione\nProposta di attività e coordinamento del palinsesto\nDefinizione di viaggio, pernottamento e necessità tecniche',question:'Come richiedere disponibilità e preventivo?',answer:'Indica nome e città dell’evento, date, pubblico atteso, attività di interesse e budget indicativo. Il modulo di contatto ci permette di costruire una proposta coerente e verificare i creator disponibili.',pattern:'.'},
    {slug:'presentatori-giurie-contest-cosplay',key:'cosplay',label:'Conduzione e cosplay',title:'Presentatori e giurie per contest cosplay e fiere',lead:'Conduzione del palco, moderazione e giurie cosplay per collegare ospiti, partecipanti e pubblico con un programma preparato insieme all’organizzazione.',text:'Un contest richiede attenzione ai tempi, alle presentazioni e al rapporto con il pubblico. C3 Agency seleziona dal roster presentatori, cosplayer e professionisti adatti alla conduzione e alla valutazione delle esibizioni.\nPrima dell’evento vengono concordati regolamento, criteri di valutazione, scaletta ed esigenze del palco. La composizione della giuria e le attività aggiuntive, come panel, workshop o meet & greet, dipendono dai profili scelti.',items:'Conduzione del contest e presentazione dei partecipanti\nGiuria cosplay e confronto sui criteri di valutazione\nHosting del main stage e moderazione delle interviste\nPanel e workshop sul cosplay, secondo disponibilità del roster',question:'Possiamo abbinare conduzione e altre attività?',answer:'Sì. In base al profilo e alle disponibilità possiamo valutare più attività nello stesso evento. Durate, spostamenti e momenti sul palco vengono definiti nella proposta.',pattern:'cosplay|giuria|contest|hosting|conduzione|presentazione|moderazione'},
    {slug:'panel-workshop-spettacoli-fiere',key:'format',label:'Panel, workshop e spettacoli',title:'Panel, workshop e spettacoli per fiere e festival nerd',lead:'Talk, laboratori pratici, concerti e performance: format da inserire nel programma di una fiera del fumetto, di un festival nerd o di una convention.',text:'I panel mettono in dialogo creator e pubblico su fantasy, cinema, animazione, gaming e cultura pop. I workshop aggiungono una parte pratica, con contenuti e materiali da concordare in base allo spazio e ai partecipanti.\nPer il palco possiamo valutare concerti, performance vocali, doppiaggio live e altri spettacoli del roster. Ogni proposta viene verificata rispetto a durata, pubblico e necessità tecniche, senza imporre un programma uguale per tutte le manifestazioni.',items:'Panel e talk con uno o più creator\nWorkshop di cosplay, prop-making, gaming e storytelling\nConcerti e performance ispirati ad anime, fantasy e cultura pop\nDurata, spazi e dotazioni tecniche concordati prima dell’evento',question:'Di quali informazioni avete bisogno per proporre un format?',answer:'Sono utili date, pubblico, spazi disponibili, durata desiderata e dotazione tecnica. Se il programma è ancora in costruzione, possiamo partire dalle aree tematiche e dal budget.',pattern:'panel|talk|workshop|laborator|concerto|performance|show|musica|doppiaggio'}
  ];
  const defaults={seoHomeTitle:'Creator e ospiti per fiere del fumetto e convention | C3 Agency',seoHomeDescription:'Booking creator e ospiti per fiere del fumetto e convention in Italia. Panel, workshop, spettacoli, presentatori e giurie cosplay: richiedi una proposta.'};
  services.forEach(service=>{['title','lead','text','items','question','answer'].forEach(field=>defaults[`service_${service.key}_${field}`]=service[field])});
  const exampleDefaults={booking:['beatrice-lorenzi','teo-the-teach','lo-scribacchino','never-20','itsklyo','mochichuu'],cosplay:['mochichuu','loon','giovada','zhalia','soryu-geggy','sareika-lab'],format:['cristiana-nerdarte','golgota','sareika-lab','carla-grimaldi','itsklyo','team-rocker']};
  services.forEach(service=>exampleDefaults[service.key].forEach((slug,index)=>defaults[`service_${service.key}_creator${index+1}`]=slug));
  [1,2,3].forEach(index=>['name','text','url'].forEach(field=>defaults[`reference_${index}_${field}`]=''));
  window.C3_SITE_CONTENT_DEFAULTS={...window.C3_SITE_CONTENT_DEFAULTS,...defaults};
  window.C3_SITE_CONTENT={...defaults,...window.C3_SITE_CONTENT};
  const route=(type,slug)=>((window.C3_SEO_ROUTES?.[type]||[]).includes(slug)?`${type}/${encodeURIComponent(slug)}/`:`${type}.html?id=${encodeURIComponent(slug)}`);
  const activityTitle=item=>typeof item==='string'?item:String(item?.title||'');
  const safeHref=value=>/^https?:\/\//i.test(value||'')?escape(value):'#';
  const image=(person,eager=false)=>person.image?`<img src="${escape(person.image)}" alt="${escape(person.name)}" loading="${eager?'eager':'lazy'}" decoding="async" style="object-fit:cover;object-position:${Number(person.imagePositionX??50)}% ${Number(person.imagePositionY??42)}%;transform-origin:${Number(person.imagePositionX??50)}% ${Number(person.imagePositionY??42)}%;transform:scale(${Math.max(1,(Number(person.imageZoom)||100)/100)})">`:`<div class="profile-monogram">${escape(person.name)}</div>`;

  const editorialActivities={
    ...{
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
},
    'Hosting e conduzione main stage':'Conduzione del palco principale: presentazione degli ospiti e dei diversi appuntamenti del programma. La scaletta e i tempi si concordano con l’organizzazione.',
    'Moderazione di panel e interviste':'Moderazione degli incontri con gli ospiti: introduzione dei temi e domande per accompagnare il confronto sul palco.',
    'Presentazione e giuria cosplay':'Presentazione del contest e partecipazione alla giuria cosplay, secondo il regolamento e i criteri di valutazione della manifestazione.',
    'Talk su fantasy, anime, cinema e cultura pop':'Un talk dedicato a fantasy, anime, cinema e cultura pop. Il tema dell’incontro viene scelto tra questi ambiti insieme alla manifestazione.',
    'Panel fantasy e letteratura':'Un incontro dedicato alla narrativa fantasy, ai suoi mondi e ai suoi personaggi, per inserire la letteratura nel programma della convention.',
    'Approfondimenti su Harry Potter':'Un approfondimento sull’universo di Harry Potter, dai personaggi alle ambientazioni e ai temi della saga.',
    'Firmacopie e incontri editoriali':'Un appuntamento dedicato ai libri e al confronto con i lettori. Titoli presentati, disponibilità per le firme e modalità dell’incontro si concordano prima dell’evento.',
    'Interviste e storytelling live':'Un incontro che unisce intervista e racconto dal vivo, con un percorso di domande e storie definito per il programma della manifestazione.',
    'Panel su Tolkien':'Un incontro dedicato a Tolkien e al suo universo narrativo, per il pubblico interessato alla Terra di Mezzo e alla letteratura fantasy.',
    'Panel tolkieniani e fantasy':'Tolkien e il fantasy al centro di un panel sui mondi narrativi, sui personaggi e sulle storie che li animano.',
    'Lezioni-spettacolo sulla lore':'Un format di racconto e approfondimento dedicato alla lore: storie, personaggi e collegamenti interni agli universi narrativi.',
    'Dialoghi su miti e simbolismi':'Un confronto sui miti e sui simboli che attraversano gli immaginari fantasy e la cultura pop.',
    'Workshop pratici di prop-making':'Un laboratorio dedicato alla costruzione di prop per il cosplay. Tecniche da affrontare, materiali e numero di partecipanti si definiscono con l’organizzazione.',
    'Panel tecnici sul cosplay':'Un approfondimento sugli aspetti tecnici del cosplay e sulla realizzazione di costumi e accessori.',
    'Giuria tecnica cosplay':'Valutazione degli aspetti tecnici dei costumi e degli accessori, secondo i criteri previsti dal regolamento del contest.',
    'Panel su board game e GdR':'Un incontro su giochi da tavolo e giochi di ruolo, per esplorare questi due modi di giocare nel contesto della convention.',
    'Sessioni di gioco guidate':'Sessioni accompagnate di gioco da tavolo o di ruolo. Titoli, durata e numero di posti si concordano in base al programma dell’area games.',
    'Sessioni di GdR dal vivo':'Sessioni di gioco di ruolo dal vivo. Sistema di gioco, avventura, durata e posti disponibili si definiscono per l’evento.',
    'Panel su GdR, anime e cinema':'Un confronto sui giochi di ruolo, sugli anime e sul cinema, scegliendo con l’organizzazione il tema dell’incontro.',
    'Hosting dell’area GdR e games':'Conduzione degli appuntamenti dell’area dedicata ai giochi di ruolo e al gaming, in coordinamento con il programma della manifestazione.',
    'Panel su musica, folklore e fantasy':'Un incontro sui legami tra musica, folklore e immaginario fantasy, tra racconto e approfondimento.',
    'Sonorizzazioni narrative':'Musica a sostegno del racconto: una proposta che mette in relazione suono e narrazione, da definire rispetto al contenuto e allo spazio dell’evento.',
    'Medley di sigle anime':'Un’esibizione costruita intorno alle sigle anime, in una sequenza musicale da inserire nel programma del palco.',
    'Show KaleidosPop':'Lo show KaleidosPop di Shizen per il programma della manifestazione. Scaletta, durata e necessità del palco si concordano prima dell’evento.',
    'Performance J-pop e K-pop':'Una performance dedicata alla musica J-pop e K-pop, con repertorio e durata da concordare per il palco della manifestazione.',
    'Panel sul doppiaggio':'Un incontro sul doppiaggio e sull’interpretazione vocale, dedicato al pubblico interessato a voci e personaggi.',
    'Talk su cinema e animazione':'Cinema e animazione al centro di un talk, con opere e temi scelti insieme all’organizzazione.',
    'Panel su psicologia e media':'Un incontro che mette in relazione psicologia e media. Argomento e taglio divulgativo si definiscono per il pubblico della manifestazione.',
    'Talk su sanità e narrazione':'Un confronto sul rapporto tra sanità e narrazione, a partire dall’attività di divulgazione e fumetto del creator.',
    'Dimostrazioni di primo soccorso':'Dimostrazioni divulgative dedicate al primo soccorso. Contenuti, spazi e modalità di partecipazione si concordano con l’organizzazione.',
    'Panel sulla sicurezza in fiera':'Un incontro divulgativo sulla sicurezza nel contesto della fiera e sulle attenzioni utili durante la manifestazione.',
    'Workshop di scrittura creativa':'Un laboratorio dedicato alla scrittura creativa. Tema, livello dei partecipanti e modalità di lavoro vengono definiti per l’evento.',
    'Panel su storytelling e visual novel':'Un incontro sul racconto e sulle visual novel, per approfondire il rapporto tra scrittura, personaggi e narrazione interattiva.',
    'Workshop di videomaking':'Un laboratorio dedicato alla creazione di video. Argomento, strumenti e livello richiesto si concordano con la manifestazione.',
    'Panel su cultura e inclusività':'Un confronto su cultura e inclusività nel contesto della community e degli eventi, con un tema definito insieme alla manifestazione.',
    'Talk-show su AI e creatività':'Un talk-show sul rapporto tra intelligenza artificiale e creatività, tra strumenti, linguaggi e produzione di contenuti.',
    'Pronunce che fanno schifo: Live':'La pronuncia inglese al centro del format live di Teo the Teach. Contenuti e durata si concordano per il pubblico della convention.',
    'Dungeons & English':'Il format di Teo the Teach che mette in relazione inglese e immaginario dei giochi di ruolo. Modalità e durata si definiscono per l’evento.',
    'International host bilingue':'Conduzione bilingue in italiano e inglese per gli appuntamenti della manifestazione e gli incontri con ospiti internazionali.',
    'Panel e workshop su inglese e cultura pop':'Incontri e laboratori che collegano la lingua inglese alla cultura pop, con contenuti e livello da concordare per i partecipanti.',
    'Dal museo alla moodboard: prepara il tuo photoset con l’aiuto dell’Arte':'Un incontro per usare i riferimenti artistici nella preparazione di una moodboard e di un photoset cosplay.'
  };
  const normalizeTitle=value=>String(value||'').trim().toLocaleLowerCase('it');
  const editorialByTitle=new Map(Object.entries(editorialActivities).map(([title,text])=>[normalizeTitle(title),text]));
  const activityDescription=(activity,person={})=>{
    const title=activityTitle(activity).trim(),custom=typeof activity==='object'?String(activity?.description||'').trim():'';
    const legacy=/^.+ propone “.+” in un formato costruito sulla durata, sul pubblico e sugli obiettivi della manifestazione\. Contenuti, scaletta, necessità tecniche e momenti di coinvolgimento vengono concordati prima dell’evento\.$/;
    if(custom&&!legacy.test(custom))return custom;
    if(!title)return '';
    const editorial=editorialByTitle.get(normalizeTitle(title));if(editorial)return editorial;
    const name=person.name||'Il creator',label=normalizeTitle(title),intro=`${name}: ${title}.`;
    if(/giuria|contest|gara cosplay/.test(label))return `${intro} Ruolo e criteri di valutazione si concordano secondo il regolamento del contest.`;
    if(/hosting|conduzione|presentazione|stage host/.test(label))return `${intro} Scaletta, ospiti da presentare e tempi del palco vengono definiti con l’organizzazione.`;
    if(/moderazione|interviste|q&a/.test(label))return `${intro} Temi e domande dell’incontro si preparano in relazione agli ospiti e al programma.`;
    if(/firmacopie|meet & greet|foto|video-saluti|artist alley/.test(label))return `${intro} Un appuntamento di incontro con il pubblico; durata e accessi si concordano prima dell’evento.`;
    if(/workshop|laboratori|dimostrazioni|simulazioni/.test(label))return `${intro} Per definire il laboratorio si concordano argomento, livello dei partecipanti, materiali e spazio necessario.`;
    if(/concerto|performance|show|musical|doppiaggio live|magia|main stage/.test(label))return `${intro} Durata, contenuto dell’esibizione e dotazione tecnica si concordano per il palco della manifestazione.`;
    if(/gaming|gdr|gioco|sessioni|sfide|quiz|challenge/.test(label))return `${intro} Contenuti, regole e modalità di partecipazione si definiscono per l’area dedicata al gioco.`;
    if(/social|reel|video|itineranti|tra il pubblico/.test(label))return `${intro} Una proposta di contenuti e racconto dell’evento, con modalità di realizzazione da concordare.`;
    return `${intro} Tema specifico, durata e modalità di partecipazione vengono concordati per il programma della manifestazione.`;
  };
  const publicImage=(value,type,slug)=>{
    const candidate=/^(?:data|blob):/i.test(String(value||''))?window.C3_SEO_ROUTES?.images?.[type]?.[slug]:value;
    try{const url=new URL(candidate||'assets/c3-agency-logo.png','https://events.c3agency.it/');if(/^https?:$/.test(url.protocol))return url.href}catch{}
    return 'https://events.c3agency.it/assets/c3-agency-logo.png';
  };
  const relatedPanelsMarkup=(person,panels=[])=>{
    const related=panels.filter(panel=>(panel.participants||[]).includes(person.slug));
    if(!related.length)return '';
    return `<section class="profile-related-panels" aria-labelledby="related-panels-title"><div><p class="eyebrow">Insieme sul palco</p><h2 id="related-panels-title">I panel con ${escape(person.name)}.</h2></div><ul>${related.map(panel=>`<li><a href="${route('panel',panel.slug)}"><strong>${escape(panel.title)}</strong>${panel.description?`<span>${escape(panel.description)}</span>`:''}${panel.duration?`<small>Durata: ${escape(panel.duration)}</small>`:''}<b>Scopri il panel →</b></a></li>`).join('')}</ul></section>`;
  };

  const creatorMarkup=(person,panels=[])=>{
    const groups=new Map();
    (person.activities||[]).forEach(item=>{const group=typeof item==='object'&&item.group?item.group:'Attività in fiera';if(!groups.has(group))groups.set(group,[]);groups.get(group).push(item)});
    return `<section class="profile-hero"><div class="profile-media">${image(person,true)}<div class="profile-rings" aria-hidden="true"><i></i><i></i><i></i></div></div><div class="profile-copy"><p class="eyebrow">${escape(person.category)}</p><h1>${escape(person.name)}</h1><p class="profile-lead">${escape(person.description)}</p><span class="profile-meta">${escape(person.meta)}</span></div></section>
      <section class="profile-activities"><div><p class="eyebrow">In fiera</p><h2>Cosa può fare.</h2></div><div class="activity-categories">${[...groups].map(([group,items])=>`<details class="activity-category panel-list"><summary><span><strong>${escape(group)}</strong><small>${items.length} attività disponibili</small></span></summary><ol>${items.map(item=>`<li><details class="panel-item"><summary><span>${escape(activityTitle(item))}</span></summary><p>${escape(activityDescription(item,person))}</p></details></li>`).join('')}</ol></details>`).join('')}</div></section>
      ${(person.socials||[]).length?`<section class="profile-socials"><h2>Segui ${escape(person.name)}.</h2><div class="social-links">${person.socials.map(item=>{const label=Array.isArray(item)?item[0]:item.label,url=Array.isArray(item)?item[1]:item.url;return `<a href="${safeHref(url)}" class="social-link" rel="noopener noreferrer">${escape(label)}</a>`}).join('')}</div></section>`:''}
      ${relatedPanelsMarkup(person,panels)}
      <section class="profile-cta"><p class="eyebrow">Inseriscilo nel tuo palinsesto</p><h2>Parliamo del tuo evento.</h2><a class="button" href="index.html#contatti">Richiedi disponibilità e proposta</a></section>`;
  };
  const panelMarkup=(panel,creators)=>`<section class="panel-detail"><div class="panel-detail-inner"><div class="panel-copy"><p class="eyebrow">${escape(panel.eyebrow||'Panel condiviso')}</p><h1>${escape(panel.title)}</h1><p>${escape(panel.description)}</p><div class="panel-facts">${[['Durata',panel.duration],['Target',panel.target],['Ideale per',panel.ideal]].map(([label,value])=>`<div><b>${label}</b><span>${escape(value)}</span></div>`).join('')}</div><a class="button light" href="index.html#contatti">Richiedi questo panel</a></div><div class="panel-people">${panel.image?`<img class="panel-cover" src="${escape(panel.image)}" alt="${escape(panel.title)}" decoding="async">`:`<div class="panel-portraits" data-count="${(panel.participants||[]).length}">${(panel.participants||[]).map(slug=>creators[slug]).filter(Boolean).map(person=>`<div class="panel-person">${image(person)}<a href="${route('creator',person.slug)}">${escape(person.name)}</a></div>`).join('')}</div>`}</div></div></section>`;
  const resolveService=(service,content)=>({...service,...Object.fromEntries(['title','lead','text','items','question','answer'].map(field=>[field,content[`service_${service.key}_${field}`]??service[field]]))});
  const serviceMarkup=(definition,content,creators)=>{
    const service=resolveService(definition,content),selected=[...new Set([1,2,3,4,5,6].map(index=>content[`service_${service.key}_creator${index}`]??exampleDefaults[service.key][index-1]).filter(Boolean))],people=selected.map(slug=>creators?.[slug]).filter(Boolean);
    return `<nav class="service-breadcrumb" aria-label="Percorso"><a href="index.html">Home</a><span aria-hidden="true">/</span><span>${escape(service.label)}</span></nav><section class="service-hero"><p class="eyebrow">C3 Agency · Fiere e convention</p><h1>${escape(service.title)}</h1><p class="service-lead">${escape(service.lead)}</p><a class="button" href="index.html#contatti">Richiedi una proposta per il tuo evento</a></section><section class="service-details"><div><h2>Una proposta per la tua manifestazione.</h2>${lines(service.text).map(text=>`<p>${escape(text)}</p>`).join('')}</div><aside><h2>Cosa possiamo coordinare</h2><ul>${lines(service.items).map(text=>`<li>${escape(text)}</li>`).join('')}</ul></aside></section><section class="service-roster"><div class="service-section-head"><div><p class="eyebrow">Dal nostro roster</p><h2>Trova i profili per il tuo programma.</h2></div><a href="index.html#creator">Esplora tutti i creator →</a></div><div class="service-talent-list">${people.map(person=>`<a href="${route('creator',person.slug)}"><strong>${escape(person.name)}</strong><span>${escape(person.category)}</span><small>${escape(person.meta)}</small></a>`).join('')}</div></section><section class="service-faq"><h2>${escape(service.question)}</h2><p>${escape(service.answer)}</p><a class="button" href="index.html#contatti">Raccontaci la tua convention</a></section><nav class="service-related" aria-label="Altri servizi">${services.filter(item=>item.slug!==service.slug).map(item=>`<a href="servizi/${item.slug}/">${escape(item.label)} →</a>`).join('')}</nav>`;
  };
  const referencesMarkup=content=>[1,2,3].filter(index=>content[`reference_${index}_name`]?.trim()&&content[`reference_${index}_text`]?.trim()).map(index=>`<article><h3>${escape(content[`reference_${index}_name`])}</h3><p>${escape(content[`reference_${index}_text`])}</p>${/^https?:\/\//i.test(content[`reference_${index}_url`]||'')?`<a href="${safeHref(content[`reference_${index}_url`])}" target="_blank" rel="noopener noreferrer">Visita il sito dell’evento →</a>`:''}</article>`).join('');
  const territories=(creators,groups)=>{
    const normalize=value=>String(value).normalize('NFD').replace(/[\u0300-\u036f\s-]/g,'').toLocaleLowerCase('it');
    const labels=['Abruzzo','Basilicata','Calabria','Campania','Emilia-Romagna','Friuli-Venezia Giulia','Lazio','Liguria','Lombardia','Marche','Molise','Piemonte','Puglia','Sardegna','Sicilia','Toscana','Trentino-Alto Adige','Umbria',"Valle d’Aosta",'Veneto'];
    const split=value=>String(value||'').split(/\s*[\/;,·]\s*/).map(item=>item.trim()).filter(Boolean).map(item=>labels.find(label=>normalize(label)===normalize(item))||item);
    const unique=items=>[...new Map(items.map(item=>[normalize(item),item])).values()];
    return Object.fromEntries(Object.entries(groups||{}).map(([area,group])=>{
      const entries=Object.values(creators||{}).flatMap(person=>{const regions=Array.isArray(person.territories)?person.territories.filter(place=>place.area===area).flatMap(place=>split(place.region)):(group.creators||[]).filter(([slug])=>slug===person.slug).flatMap(([,region])=>split(region));return regions.length?[[person.slug,unique(regions).join(' / ')]]:[]});
      const regions=unique(entries.flatMap(([,region])=>split(region))).sort((left,right)=>left.localeCompare(right,'it'));
      return [area,{...group,creators:entries,subtitle:regions.join(' · ')}];
    }));
  };
  window.C3_SEO={escape,activityDescription,publicImage,relatedPanelsMarkup,services,resolveService,referencesMarkup,territories,creatorUrl:slug=>route('creator',slug),panelUrl:slug=>route('panel',slug),creatorMarkup,panelMarkup,serviceMarkup};
})();
