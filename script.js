(window.C3_DATA_READY||Promise.resolve()).then(()=>{
const creatorGrid=document.querySelector('.creator-grid');
const savedRoster=localStorage.getItem('c3_creator_manager_data');
const escapeHtml=value=>String(value??'').replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
if(window.C3_SITE_CONTENT){
  const formatCopyMigrations={
    formatText:{from:'Ogni proposta è acquistabile singolarmente oppure integrata in un pacchetto: più attività, un’unica regia editoriale e logistica.',to:'Panel, show, workshop e hosting per fiere del fumetto e festival nerd, anche in un unico palinsesto coordinato.'},
    formatSeoText:{from:'C3 Agency progetta cast e palinsesti per fiere del fumetto, comics, festival nerd ed eventi pop culture in tutta Italia. Selezioniamo creator, presentatori, divulgatori, cosplayer, musicisti e performer in base al pubblico e agli obiettivi della manifestazione.',to:'Cast, ospiti e attività per fiere del fumetto e festival nerd, costruiti intorno al pubblico e agli obiettivi dell’evento.'},
    communityTitle:{from:'Passioni condivise. Spazi da vivere.',to:'Community che creano mondi.'}
  };
  Object.entries(formatCopyMigrations).forEach(([key,copy])=>{if(window.C3_SITE_CONTENT[key]===copy.from)window.C3_SITE_CONTENT[key]=copy.to});
  const contentMap={
    navCreator:'.topbar nav a:nth-child(1)',navPanel:'.topbar nav a:nth-child(2)',navCommunity:'.topbar nav a:nth-child(3)',navTerritory:'.topbar nav a:nth-child(4)',navContact:'.topbar nav a:nth-child(5)',headerCta:'.topbar>.button',
    heroEyebrow:'#home .hero-copy .eyebrow',heroTitle:'#home .hero-copy h1',heroLead:'#home .hero-copy .lead',heroPrimary:'#home .actions .button',heroSecondary:'#home .actions .text-link',heroLabel:'#home .cast-label b',
    formatEyebrow:'#format .section-head .eyebrow',formatTitle:'#format .section-head h2',formatText:'#format .section-head>p',formatSeoText:'#format .format-seo-text',format1Title:'#format .format-card:nth-child(1) h3',format1Text:'#format .format-card:nth-child(1) p',format1Tag:'#format .format-card:nth-child(1)>b',format2Title:'#format .format-card:nth-child(2) h3',format2Text:'#format .format-card:nth-child(2) p',format2Tag:'#format .format-card:nth-child(2)>b',format3Title:'#format .format-card:nth-child(3) h3',format3Text:'#format .format-card:nth-child(3) p',format3Tag:'#format .format-card:nth-child(3)>b',format4Title:'#format .format-card:nth-child(4) h3',format4Text:'#format .format-card:nth-child(4) p',format4Tag:'#format .format-card:nth-child(4)>b',
    rosterEyebrow:'#creator .section-head .eyebrow',rosterTitle:'#creator .section-head h2',rosterText:'#creator .section-head>p',filterAll:'.filters button:nth-child(1)',filterFantasy:'.filters button:nth-child(2)',filterGaming:'.filters button:nth-child(3)',filterCosplay:'.filters button:nth-child(5)',filterMusic:'.filters button:nth-child(6)',filterPop:'.filters button:nth-child(7)',
    territoryEyebrow:'#territorio .section-head .eyebrow',territoryTitle:'#territorio .section-head h2',territoryText:'#territorio .section-head>p',methodEyebrow:'#metodo .eyebrow',methodTitle:'#metodo h2',method1Title:'#metodo li:nth-child(1) h3',method1Text:'#metodo li:nth-child(1) p',method2Title:'#metodo li:nth-child(2) h3',method2Text:'#metodo li:nth-child(2) p',method3Title:'#metodo li:nth-child(3) h3',method3Text:'#metodo li:nth-child(3) p',method4Title:'#metodo li:nth-child(4) h3',method4Text:'#metodo li:nth-child(4) p',
    logisticsEyebrow:'#logistica .eyebrow',logisticsTitle:'#logistica h2',logisticsText:'#logistica .logistics-intro>p:last-child',logistics1Title:'#logistica article:nth-child(1) h3',logistics1Text:'#logistica article:nth-child(1) p',logistics2Title:'#logistica article:nth-child(2) h3',logistics2Text:'#logistica article:nth-child(2) p',logistics3Title:'#logistica article:nth-child(3) h3',logistics3Text:'#logistica article:nth-child(3) p',logistics4Title:'#logistica article:nth-child(4) h3',logistics4Text:'#logistica article:nth-child(4) p',
    contactEyebrow:'#contatti .contact-copy .eyebrow',contactTitle:'#contatti .contact-copy h2',contactText:'#contatti .contact-copy>p:last-child',contactFormTitle:'.contact-form-head h3',contactName:'label[for="contact-name"]',contactEmail:'label[for="contact-email"]',contactEvent:'label[for="contact-event"]',contactCity:'label[for="contact-city"]',contactDates:'label[for="contact-dates"]',contactAudience:'label[for="contact-audience"]',contactAreas:'label[for="contact-areas"]',contactBudget:'label[for="contact-budget"]',contactInterest:'label[for="contact-interest"]',contactPhone:'label[for="contact-phone"]',contactEmailButton:'.contact-actions button:nth-child(1)',contactWhatsappButton:'.contact-actions button:nth-child(2)',contactPrivacy:'.form-privacy',
    footerCompany:'.company-footer strong',footerAddress:'.company-footer span:nth-of-type(1)',footerTax:'.company-footer span:nth-of-type(2)',footerReserved:'.company-footer a[href^="login"]',footerTop:'.company-footer .footer-top'
  };
  Object.assign(contentMap,{faqEyebrow:'.seo-faq .eyebrow',faqTitle:'.seo-faq h2',faqQuestion1:'.chat-row:nth-child(1) h3',faqAnswer1:'.chat-row:nth-child(1) p',faqQuestion2:'.chat-row:nth-child(2) h3',faqAnswer2:'.chat-row:nth-child(2) p',faqQuestion3:'.chat-row:nth-child(3) h3',faqAnswer3:'.chat-row:nth-child(3) p'});
  contentMap.filterRoleplay='.filters button:nth-child(4)';
  contentMap.filterEducation='.filters button:nth-child(8)';
  contentMap.sharedPanelEyebrow='#panel-condivisi .section-head .eyebrow';
  contentMap.sharedPanelTitle='#panel-condivisi .section-head h2';
  contentMap.sharedPanelText='#panel-condivisi .section-head>p';
  contentMap.communityEyebrow='#community .section-head .eyebrow';
  contentMap.communityTitle='#community .section-head h2';
  contentMap.communityText='#community .section-head>p';
  Object.entries(contentMap).forEach(([key,selector])=>{const node=document.querySelector(selector);if(node&&window.C3_SITE_CONTENT[key])node.textContent=window.C3_SITE_CONTENT[key]});
  const privacyNote=document.querySelector('.form-privacy');
  if(privacyNote){const label=window.C3_SITE_CONTENT.contactPrivacy||'I dati vengono utilizzati esclusivamente per rispondere alla richiesta.';privacyNote.innerHTML=`${escapeHtml(label)} <a href="privacy.html">Leggi l’informativa privacy</a>.`}
  ['heroImage1','heroImage2','heroImage3'].forEach((key,index)=>{const image=document.querySelectorAll('#home .cast-image img')[index];if(image&&window.C3_SITE_CONTENT[key])image.src=window.C3_SITE_CONTENT[key]});
}
const communityTrack=document.querySelector('#community-track');
if(communityTrack&&Array.isArray(window.C3_COMMUNITIES)){
  window.C3_COMMUNITIES=window.C3_COMMUNITIES.map(item=>{const initial=(window.C3_COMMUNITIES_DEFAULTS||[]).find(entry=>entry.slug===item.slug)||{};return {...initial,...item,thematicEnabled:item.slug==='skepsis-gaming'?false:item.thematicEnabled!==false,thematicAreas:Array.isArray(item.thematicAreas)?item.thematicAreas:(initial.thematicAreas||[])}});
  communityTrack.innerHTML=window.C3_COMMUNITIES.map(community=>{
    const tags=(community.activities||[]).map(activity=>`<span>${escapeHtml(activity)}</span>`).join('');
    return `<article class="community-card" data-community="${escapeHtml(community.slug)}" role="button" tabindex="0" aria-label="Apri la scheda di ${escapeHtml(community.name)}"><div class="community-body"><img class="community-logo" src="${escapeHtml(community.logo)}" alt="Logo ${escapeHtml(community.name)}"><p class="eyebrow">${escapeHtml(community.eyebrow||'Community')}</p><h3>${escapeHtml(community.name)}</h3><p>${escapeHtml(community.description)}</p><div class="community-tags">${tags}</div><span class="community-open">Scopri cosa può fare <b>↗</b></span></div></article>`;
  }).join('');
  document.querySelectorAll('[data-community-scroll]').forEach(button=>button.addEventListener('click',()=>{
    const card=communityTrack.querySelector('.community-card');
    communityTrack.scrollBy({left:(card?.offsetWidth||600)*(button.dataset.communityScroll==='previous'?-1:1),behavior:'smooth'});
  }));
  const modal=document.createElement('div');modal.className='community-modal';modal.hidden=true;modal.innerHTML='<div class="community-modal-backdrop" data-community-close></div><section class="community-modal-panel" role="dialog" aria-modal="true" aria-labelledby="community-modal-title"><button class="community-modal-close" type="button" data-community-close aria-label="Chiudi">×</button><div id="community-modal-content"></div></section>';document.body.append(modal);
  let modalGalleryIndex=0,activeCommunity=null;
  const renderModalGallery=()=>{const root=modal.querySelector('.community-event-gallery'),images=activeCommunity?.gallery||[];if(!root)return;if(images.length){root.innerHTML=`<img src="${escapeHtml(images[modalGalleryIndex])}" alt="Evento di ${escapeHtml(activeCommunity.name)}"><div class="community-gallery-count">${modalGalleryIndex+1} / ${images.length}</div>`}else{root.innerHTML='<div class="community-gallery-placeholder"><span>Foto evento</span><small>Caricabile dall’area riservata</small></div>'}};
  const openCommunity=slug=>{activeCommunity=window.C3_COMMUNITIES.find(item=>item.slug===slug);if(!activeCommunity)return;modalGalleryIndex=0;const activities=(activeCommunity.activities||[]).map(item=>`<li>${escapeHtml(item)}</li>`).join('');const thematicAreas=activeCommunity.thematicEnabled===false?'':(activeCommunity.thematicAreas||[]).map((area,index)=>`<article class="community-thematic-card"><div><span>Area tematica ${String(index+1).padStart(2,'0')}</span><h4>${escapeHtml(area.title||'Area personalizzabile')}</h4><p>${escapeHtml(area.description||'Contenuti e allestimento definibili insieme alla manifestazione.')}</p></div>${area.gallery?.[0]?`<img src="${escapeHtml(area.gallery[0])}" alt="${escapeHtml(area.title||'Area tematica')}">`:'<div class="community-thematic-placeholder">Foto area</div>'}</article>`).join('');modal.querySelector('#community-modal-content').innerHTML=`<div class="community-modal-head"><img src="${escapeHtml(activeCommunity.logo)}" alt="Logo ${escapeHtml(activeCommunity.name)}"><div><p class="eyebrow">${escapeHtml(activeCommunity.eyebrow||'Community')}</p><h2 id="community-modal-title">${escapeHtml(activeCommunity.name)}</h2></div></div><div class="community-modal-grid"><div class="community-modal-copy"><h3>Cosa può portare in fiera</h3><p>${escapeHtml(activeCommunity.details||activeCommunity.description)}</p><ul>${activities}</ul><a href="${escapeHtml(activeCommunity.instagram)}" target="_blank" rel="noopener">Apri la pagina Instagram ↗</a></div><div><div class="community-event-gallery"></div><div class="community-gallery-nav"><button type="button" data-community-gallery="previous" aria-label="Foto precedente">‹</button><span>Eventi e attività</span><button type="button" data-community-gallery="next" aria-label="Foto successiva">›</button></div></div></div>${thematicAreas?`<section class="community-thematic-section"><p class="eyebrow">Progetti su misura</p><h3>Aree tematiche realizzabili</h3><div class="community-thematic-grid">${thematicAreas}</div></section>`:''}`;renderModalGallery();modal.hidden=false;document.body.classList.add('modal-open');modal.querySelector('.community-modal-close').focus()};
  communityTrack.addEventListener('click',event=>{const card=event.target.closest('.community-card');if(card)openCommunity(card.dataset.community)});
  communityTrack.addEventListener('keydown',event=>{if((event.key==='Enter'||event.key===' ')&&event.target.closest('.community-card')){event.preventDefault();openCommunity(event.target.closest('.community-card').dataset.community)}});
  modal.addEventListener('click',event=>{if(event.target.closest('[data-community-close]')){modal.hidden=true;document.body.classList.remove('modal-open');return}const button=event.target.closest('[data-community-gallery]');if(!button||!(activeCommunity?.gallery||[]).length)return;const length=activeCommunity.gallery.length;modalGalleryIndex=(modalGalleryIndex+(button.dataset.communityGallery==='previous'?-1:1)+length)%length;renderModalGallery()});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!modal.hidden){modal.hidden=true;document.body.classList.remove('modal-open')}});
}
const creatorTags=creator=>{
  if(Array.isArray(creator.filters)&&creator.filters.length) return creator.filters.join(' ');
  const value=`${creator.category} ${(creator.activities||[]).map(item=>typeof item==='string'?item:item.title).join(' ')}`.toLowerCase();
  return [/(fantasy|tolkien|harry potter|mitologia|folklore)/.test(value)&&'fantasy',/(panel|talk|hosting|moderazione|pop culture|cinema|serie)/.test(value)&&'pop',/(cosplay|prop)/.test(value)&&'cosplay',/(gaming|videogioco|videogame|esport)/.test(value)&&'gaming',/(gdr|gdt|gioco di ruolo|giochi di ruolo|gioco da tavolo|giochi da tavolo|boardgame)/.test(value)&&'gdr-gdt',/(music|musica|concerto|canto|performance|j-pop|k-pop|rock)/.test(value)&&'musica',/(divulgazione|storia|arte|tech|psicologia|soccorso|lezione|educazione)/.test(value)&&'divulgazione'].filter(Boolean).join(' ')||'pop';
};
const creatorCardMeta=creator=>{
  const fallback=window.C3_DEFAULT_CREATORS?.[creator.slug]||{};
  const raw=String(creator.meta||fallback.meta||'').trim();
  const savedRegions=(creator.territories||[]).map(item=>item.region).filter(Boolean);
  const geoRegions=[...Object.values(window.C3_DEFAULT_GEO||{}),...Object.values(window.C3_GEO||{})].flatMap(group=>(group.creators||[]).filter(item=>item[0]===creator.slug).map(item=>item[1]));
  const regions=[...new Set([...savedRegions,...geoRegions])];
  const territory=regions.join(' / ');
  const parts=[];
  if(territory&&!regions.some(region=>raw.toLocaleLowerCase('it').includes(String(region).toLocaleLowerCase('it'))))parts.push(territory);
  if(raw)parts.push(raw);
  if(!/(target|pubblico|audience|giovan|famiglie|trasversale|adulti|teen)/i.test(parts.join(' ')))parts.push('target trasversale');
  return parts.join(' · ')||'Italia · target trasversale';
};
const creatorPhotoPosition=creator=>`${creator.imagePositionX??50}% ${creator.imagePositionY??50}%`;
const creatorPhotoMarkup=creator=>{if(!creator.image)return `<div class="creator-placeholder">${escapeHtml(creator.name.split(' ').map(word=>word[0]).slice(0,2).join(''))}</div>`;const customized=creator.imagePositionX!=null||creator.imagePositionY!=null||creator.imageZoom!=null,position=creatorPhotoPosition(creator),zoom=(Number(creator.imageZoom)||100)/100,style=customized?` style="object-position:${position};transform-origin:${position};transform:scale(${zoom})"`:'';return `<div class="creator-photo"><img src="${escapeHtml(creator.image)}" alt="${escapeHtml(creator.name)}"${style}></div>`};

const heroCast=document.querySelector('.hero-cast');
if(heroCast&&window.C3_CREATORS&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const heroCards=[...heroCast.querySelectorAll('.cast-card')];
  const allHeroCreators=Object.values(window.C3_CREATORS).filter(creator=>creator.image);
  const prioritySlugs=['soryu-geggy','team-rocker'];
  const heroCreators=[...prioritySlugs.map(slug=>allHeroCreators.find(creator=>creator.slug===slug)).filter(Boolean),...allHeroCreators.filter(creator=>!prioritySlugs.includes(creator.slug))];
  let heroIndex=0;
  let heroTimer;
  let heroTransitioning=false;
  const loadHeroImage=creator=>new Promise(resolve=>{const preload=new Image();preload.onload=()=>resolve(creator);preload.onerror=()=>resolve(creator);preload.src=creator.image});
  const rotateHeroCreators=async()=>{
    if(document.hidden||heroTransitioning||heroCreators.length<=heroCards.length)return;
    heroTransitioning=true;
    const selected=heroCards.map((card,offset)=>heroCreators[(heroIndex+offset)%heroCreators.length]);
    const soryuIndex=selected.findIndex(creator=>creator.slug==='soryu-geggy');
    if(soryuIndex>0)[selected[0],selected[soryuIndex]]=[selected[soryuIndex],selected[0]];
    const teamIndex=selected.findIndex(creator=>creator.slug==='team-rocker');
    if(teamIndex===0&&selected.length>1)[selected[0],selected[1]]=[selected[1],selected[0]];
    await Promise.all(selected.map(loadHeroImage));
    heroCards.forEach((card,offset)=>{
      const creator=selected[offset];
      const image=card.querySelector('img');
      const outgoing=image.cloneNode(true);
      outgoing.classList.add('cast-outgoing');
      image.parentElement.append(outgoing);
      image.src=creator.image;
      image.alt=creator.name;
      requestAnimationFrame(()=>requestAnimationFrame(()=>outgoing.classList.add('is-leaving')));
      window.setTimeout(()=>outgoing.remove(),900);
    });
    heroIndex=(heroIndex+heroCards.length)%heroCreators.length;
    window.setTimeout(()=>heroTransitioning=false,920);
  };
  const startHeroRotation=()=>{window.clearInterval(heroTimer);heroTimer=window.setInterval(rotateHeroCreators,3200)};
  const stopHeroRotation=()=>window.clearInterval(heroTimer);
  startHeroRotation();
  document.addEventListener('visibilitychange',()=>document.hidden?stopHeroRotation():startHeroRotation());
}
if(creatorGrid&&window.C3_CREATORS){
  creatorGrid.innerHTML=Object.values(window.C3_CREATORS).map(creator=>`<article class="creator" data-slug="${escapeHtml(creator.slug)}" data-tags="${creatorTags(creator)}">${creatorPhotoMarkup(creator)}<div><span>${escapeHtml(creator.category)}</span><h3>${escapeHtml(creator.name)}</h3><p>${escapeHtml(creator.cardDescription||creator.description)}</p><small>${escapeHtml(creatorCardMeta(creator))}</small></div></article>`).join('');
  const count=document.querySelector('.roster-count');
  if(count) count.textContent=`${Object.keys(window.C3_CREATORS).length} CREATOR · UN UNICO PARTNER`;
}
const creatorFilterDefaults=[['fantasy','Fantasy'],['gaming','Gaming'],['gdr-gdt','GDR/GDT'],['cosplay','Cosplay'],['musica','Musica'],['pop','Pop culture'],['divulgazione','Divulgazione']].map(([slug,label])=>({slug,label}));
const creatorFilterDefinitions=window.C3_REMOTE_CREATOR_FILTERS||JSON.parse(localStorage.getItem('c3_creator_filters')||'null')||creatorFilterDefaults;
const creatorFilterBar=document.querySelector('#creator .filters');
if(creatorFilterBar)creatorFilterBar.innerHTML=`<button class="active" data-filter="all">Tutti</button>${creatorFilterDefinitions.map(item=>`<button data-filter="${escapeHtml(item.slug)}">${escapeHtml(item.label)}</button>`).join('')}`;
const buttons=[...document.querySelectorAll('.filters button')];
const cards=[...document.querySelectorAll('.creator')];
const creatorOrderCategories=window.C3_REMOTE_CREATOR_ORDERS||JSON.parse(localStorage.getItem('c3_creator_order_categories')||'null')||{};
const rosterGrid=document.querySelector('.creator-grid');
const rosterPagination=document.createElement('nav');
rosterPagination.className='roster-pagination';
rosterPagination.setAttribute('aria-label','Pagine del roster');
rosterPagination.innerHTML='<div class="roster-swipe-hint" aria-hidden="true">Scorri i creator</div><button type="button" data-page="previous" aria-label="Creator precedenti">←</button><span aria-live="polite"></span><button type="button" data-page="next" aria-label="Creator successivi">→</button>';
if(rosterGrid)rosterGrid.after(rosterPagination);
let rosterFilter='all',rosterPage=0;
let rosterAutoTimer;
const rosterColumns=()=>innerWidth<=760?1:innerWidth<=1100?2:3;
const matchingRosterCards=()=>{const matches=cards.filter(card=>rosterFilter==='all'||card.dataset.tags.split(' ').includes(rosterFilter)),saved=creatorOrderCategories[rosterFilter]||[];return [...matches].sort((a,b)=>{const ai=saved.indexOf(a.dataset.slug),bi=saved.indexOf(b.dataset.slug);return (ai<0?Number.MAX_SAFE_INTEGER:ai)-(bi<0?Number.MAX_SAFE_INTEGER:bi)})};
const renderRosterPage=()=>{
  const matches=matchingRosterCards();
  matches.forEach(card=>rosterGrid.append(card));
  const pageSize=innerWidth<=760?1:rosterColumns()*3,totalPages=Math.max(1,Math.ceil(matches.length/pageSize));
  rosterPage=Math.min(rosterPage,totalPages-1);
  cards.forEach(card=>card.classList.add('hidden'));
  matches.slice(rosterPage*pageSize,(rosterPage+1)*pageSize).forEach(card=>card.classList.remove('hidden'));
  rosterPagination.querySelector('span').textContent=`${rosterPage+1} / ${totalPages}`;
  rosterPagination.querySelector('[data-page="previous"]').disabled=rosterPage===0;
  rosterPagination.querySelector('[data-page="next"]').disabled=rosterPage>=totalPages-1;
  rosterPagination.hidden=totalPages<=1;
};
const startRosterAutoplay=()=>{
  clearInterval(rosterAutoTimer);
  if(innerWidth>760||matchMedia('(prefers-reduced-motion: reduce)').matches||document.hidden)return;
  rosterAutoTimer=setInterval(()=>{
    const matches=matchingRosterCards();
    if(matches.length<2)return;
    rosterPage=(rosterPage+1)%matches.length;
    renderRosterPage();
  },4200);
};
rosterPagination.addEventListener('click',event=>{
  const button=event.target.closest('button[data-page]');
  if(!button)return;
  rosterPage+=button.dataset.page==='next'?1:-1;
  renderRosterPage();
  startRosterAutoplay();
  document.querySelector('#creator .filters').scrollIntoView({behavior:'smooth',block:'start'});
});
let rosterTouchStartX=0,rosterTouchStartY=0;
rosterGrid?.addEventListener('touchstart',event=>{
  rosterTouchStartX=event.changedTouches[0].clientX;
  rosterTouchStartY=event.changedTouches[0].clientY;
},{passive:true});
rosterGrid?.addEventListener('touchend',event=>{
  if(innerWidth>760)return;
  const deltaX=event.changedTouches[0].clientX-rosterTouchStartX;
  const deltaY=event.changedTouches[0].clientY-rosterTouchStartY;
  if(Math.abs(deltaX)<55||Math.abs(deltaX)<=Math.abs(deltaY))return;
  const direction=deltaX<0?1:-1;
  const nextButton=rosterPagination.querySelector(direction>0?'[data-page="next"]':'[data-page="previous"]');
  if(!nextButton.disabled){rosterPage+=direction;renderRosterPage();startRosterAutoplay();}
},{passive:true});
let rosterResizeTimer;
addEventListener('resize',()=>{clearTimeout(rosterResizeTimer);rosterResizeTimer=setTimeout(()=>{renderRosterPage();startRosterAutoplay()},160)});
document.addEventListener('visibilitychange',startRosterAutoplay);
const topbar=document.querySelector('.topbar');
if(topbar){
  let previousScroll=window.scrollY;
  let headerFrame=false;
  const updateHeader=()=>{
    const currentScroll=window.scrollY;
    if(currentScroll<90) topbar.classList.remove('is-hidden');
    else if(currentScroll>previousScroll+3) topbar.classList.add('is-hidden');
    else if(currentScroll<previousScroll-3) topbar.classList.remove('is-hidden');
    previousScroll=currentScroll;
    headerFrame=false;
  };
  addEventListener('scroll',()=>{if(!headerFrame){headerFrame=true;requestAnimationFrame(updateHeader)}},{passive:true});
}
buttons.forEach(button=>button.addEventListener('click',()=>{
  buttons.forEach(item=>item.classList.remove('active'));
  button.classList.add('active');
  rosterFilter=button.dataset.filter;
  rosterPage=0;
  renderRosterPage();
  startRosterAutoplay();
}));
renderRosterPage();
startRosterAutoplay();

const slugify = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
cards.forEach(card=>{
  const name=card.querySelector('h3')?.textContent.trim();
  if(!name) return;
  const href=`creator.html?id=${encodeURIComponent(card.dataset.slug||slugify(name))}`;
  card.tabIndex=0;
  card.setAttribute('role','link');
  card.setAttribute('aria-label',`Apri il profilo di ${name}`);
  card.addEventListener('click',()=>location.href=href);
  card.addEventListener('keydown',event=>{
    if(event.key==='Enter'||event.key===' '){event.preventDefault();location.href=href;}
  });
});

const territoryRoot=document.querySelector('#territory-grid');
const panelTrack=document.querySelector('#panel-track');
if(panelTrack&&window.C3_PANELS){
  panelTrack.innerHTML=window.C3_PANELS.map((panel,index)=>{const people=(panel.participants||[]).map(id=>window.C3_CREATORS[id]).filter(Boolean);return `<article class="shared-panel-card"><span class="panel-number">PANEL ${String(index+1).padStart(2,'0')} · ${escapeHtml(panel.eyebrow||'PROPOSTA CONDIVISA')}</span><h3>${escapeHtml(panel.title)}</h3><p>${escapeHtml(panel.description)}</p><div class="panel-faces" data-count="${people.length}">${panel.image?`<div class="panel-face panel-face-cover"><span class="panel-photo"><img src="${escapeHtml(panel.image)}" alt="Immagine di ${escapeHtml(panel.title)}"></span></div>`:people.map(person=>`<a class="panel-face" href="creator.html?id=${encodeURIComponent(person.slug)}"><span class="panel-photo"><img src="${escapeHtml(person.image)}" alt="${escapeHtml(person.name)}"></span><span>${escapeHtml(person.name)}</span></a>`).join('')}</div><a class="panel-open" href="panel.html?id=${encodeURIComponent(panel.slug)}" aria-label="Apri la scheda ${escapeHtml(panel.title)}"><span>Scopri il panel</span><b>↗</b></a></article>`}).join('');
  let activePanel=0;
  const panelCards=[...panelTrack.querySelectorAll('.shared-panel-card')];
  const showPanel=index=>{
    if(!panelCards.length)return;
    activePanel=(index+panelCards.length)%panelCards.length;
    panelTrack.scrollTo({left:panelCards[activePanel].offsetLeft-panelTrack.offsetLeft,behavior:'smooth'});
  };
  document.querySelectorAll('[data-panel-scroll]').forEach(button=>button.addEventListener('click',()=>showPanel(activePanel+(button.dataset.panelScroll==='next'?1:-1))));
  panelTrack.addEventListener('scroll',()=>{
    clearTimeout(panelTrack.panelScrollTimer);
    panelTrack.panelScrollTimer=setTimeout(()=>{
      const currentLeft=panelTrack.scrollLeft;
      activePanel=panelCards.reduce((best,card,index)=>Math.abs(card.offsetLeft-panelTrack.offsetLeft-currentLeft)<Math.abs(panelCards[best].offsetLeft-panelTrack.offsetLeft-currentLeft)?index:best,0);
    },120);
  },{passive:true});
}
if(territoryRoot&&window.C3_GEO&&window.C3_CREATORS){
  territoryRoot.innerHTML=Object.entries(window.C3_GEO).map(([area,group])=>`
    <article class="territory-column territory-${area}">
      <header><span>${String(group.creators.length).padStart(2,'0')}</span><h3>${group.title}</h3><p>${group.subtitle}</p></header>
      <div class="territory-list">
        ${group.creators.filter(([slug])=>window.C3_CREATORS[slug]).map(([slug,region])=>{
          const creator=window.C3_CREATORS[slug];
          return `<a href="creator.html?id=${slug}"><span>${creator.name}</span><small>${region}</small><b aria-hidden="true">→</b></a>`;
        }).join('')}
      </div>
    </article>`).join('');

  const territoryCards=[...territoryRoot.querySelectorAll('.territory-column')];
  const territoryStatus=document.querySelector('.territory-carousel-status');
  const territoryButtons=[...document.querySelectorAll('[data-territory-scroll]')];
  let activeTerritory=0;
  const updateTerritoryControls=()=>{
    if(territoryStatus) territoryStatus.textContent=`${activeTerritory+1} / ${territoryCards.length}`;
    territoryButtons.forEach(button=>{
      button.disabled=button.dataset.territoryScroll==='previous'?activeTerritory===0:activeTerritory===territoryCards.length-1;
    });
  };
  const showTerritory=index=>{
    if(!territoryCards.length)return;
    activeTerritory=Math.max(0,Math.min(index,territoryCards.length-1));
    territoryRoot.scrollTo({left:territoryCards[activeTerritory].offsetLeft-territoryRoot.offsetLeft,behavior:'smooth'});
    updateTerritoryControls();
  };
  territoryButtons.forEach(button=>button.addEventListener('click',()=>showTerritory(activeTerritory+(button.dataset.territoryScroll==='next'?1:-1))));
  territoryRoot.addEventListener('scroll',()=>{
    clearTimeout(territoryRoot.territoryScrollTimer);
    territoryRoot.territoryScrollTimer=setTimeout(()=>{
      activeTerritory=territoryCards.reduce((best,card,index)=>Math.abs(card.offsetLeft-territoryRoot.offsetLeft-territoryRoot.scrollLeft)<Math.abs(territoryCards[best].offsetLeft-territoryRoot.offsetLeft-territoryRoot.scrollLeft)?index:best,0);
      updateTerritoryControls();
    },100);
  },{passive:true});
  updateTerritoryControls();
}

const contactForm=document.querySelector('#contact-form');
const whatsappButton=document.querySelector('#contact-whatsapp');
if(contactForm&&whatsappButton){
  const phoneField=contactForm.elements.phone;
  const phoneLabel=document.querySelector('label[for="contact-phone"]');
  if(phoneField&&phoneLabel&&!phoneLabel.textContent.includes('*')) phoneLabel.textContent=`${phoneLabel.textContent.trim()} *`;
  const requestText=()=>{
    const data=new FormData(contactForm);
    return `Buongiorno C3 Agency,\n\nNome e ruolo: ${data.get('name')||'-'}\nEmail: ${data.get('email')||'-'}\nEvento: ${data.get('event')||'-'}\nCittà e location: ${data.get('city')||'-'}\nDate previste: ${data.get('dates')||'-'}\nAffluenza stimata: ${data.get('audience')||'-'}\nAree tematiche: ${data.get('areas')||'-'}\nBudget indicativo: ${data.get('budget')||'-'}\nCreator o format di interesse: ${data.get('interest')||'-'}\nRecapito telefonico: ${data.get('phone')||'-'}`;
  };
  contactForm.addEventListener('submit',async event=>{
    event.preventDefault();
    if(!contactForm.reportValidity()) return;
    const submitButton=contactForm.querySelector('button[type="submit"]'),status=document.querySelector('#contact-status');
    status.className='contact-status';status.textContent='Invio in corso…';submitButton.disabled=true;
    const data=new FormData(contactForm),payload=Object.fromEntries(data.entries());
    try{
      if(!window.C3_SUPABASE)throw new Error('Servizio non disponibile');
      const {data:result,error}=await window.C3_SUPABASE.functions.invoke('contact-request',{body:payload});
      if(error||!result?.ok)throw error||new Error(result?.error||'Invio non riuscito');
      contactForm.reset();status.className='contact-status is-success';status.textContent='Richiesta inviata correttamente. Ti ricontatteremo al più presto.';
    }catch(error){console.error(error);status.className='contact-status is-error';status.textContent='Invio non riuscito. Riprova tra poco oppure utilizza WhatsApp.'}
    finally{submitButton.disabled=false}
  });
  whatsappButton.addEventListener('click',()=>{
    if(!contactForm.reportValidity()) return;
    window.open(`https://wa.me/${(window.C3_SITE_CONTENT?.contactWhatsappTarget||'393513448497').replace(/\D/g,'')}?text=${encodeURIComponent(requestText())}`,'_blank','noopener');
  });
}
const floatingContact=document.createElement('aside');floatingContact.className='floating-contact';floatingContact.setAttribute('aria-label','Contatto rapido');floatingContact.innerHTML='<a href="#contatti">Contattaci</a><button type="button" aria-label="Nascondi il contatto rapido">×</button>';document.body.append(floatingContact);
let floatingContactDismissed=sessionStorage.getItem('c3_floating_contact_dismissed')==='1';
const updateFloatingContact=()=>{const contact=document.querySelector('#contatti'),contactVisible=contact&&contact.getBoundingClientRect().top<innerHeight*.72;floatingContact.classList.toggle('is-visible',!floatingContactDismissed&&scrollY>Math.max(700,innerHeight*.85)&&!contactVisible)};
addEventListener('scroll',updateFloatingContact,{passive:true});addEventListener('resize',updateFloatingContact);updateFloatingContact();
floatingContact.querySelector('a').addEventListener('click',()=>floatingContact.classList.remove('is-visible'));
floatingContact.querySelector('button').addEventListener('click',()=>{floatingContactDismissed=true;sessionStorage.setItem('c3_floating_contact_dismissed','1');floatingContact.remove()});
});
