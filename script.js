const creatorGrid=document.querySelector('.creator-grid');
const escapeHtml=value=>String(value??'').replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
if(window.C3_SITE_CONTENT){
  const contentMap={
    navFormat:'.topbar nav a:nth-child(1)',navCreator:'.topbar nav a:nth-child(2)',navTerritory:'.topbar nav a:nth-child(3)',navMethod:'.topbar nav a:nth-child(4)',navLogistics:'.topbar nav a:nth-child(5)',headerCta:'.topbar>.button',
    heroEyebrow:'#home .hero-copy .eyebrow',heroTitle:'#home .hero-copy h1',heroLead:'#home .hero-copy .lead',heroPrimary:'#home .actions .button',heroSecondary:'#home .actions .text-link',heroLabel:'#home .cast-label b',
    formatEyebrow:'#format .section-head .eyebrow',formatTitle:'#format .section-head h2',formatText:'#format .section-head>p',format1Title:'#format .format-card:nth-child(1) h3',format1Text:'#format .format-card:nth-child(1) p',format1Tag:'#format .format-card:nth-child(1)>b',format2Title:'#format .format-card:nth-child(2) h3',format2Text:'#format .format-card:nth-child(2) p',format2Tag:'#format .format-card:nth-child(2)>b',format3Title:'#format .format-card:nth-child(3) h3',format3Text:'#format .format-card:nth-child(3) p',format3Tag:'#format .format-card:nth-child(3)>b',format4Title:'#format .format-card:nth-child(4) h3',format4Text:'#format .format-card:nth-child(4) p',format4Tag:'#format .format-card:nth-child(4)>b',
    rosterEyebrow:'#creator .section-head .eyebrow',rosterTitle:'#creator .section-head h2',rosterText:'#creator .section-head>p',filterAll:'.filters button:nth-child(1)',filterFantasy:'.filters button:nth-child(2)',filterGaming:'.filters button:nth-child(3)',filterCosplay:'.filters button:nth-child(5)',filterMusic:'.filters button:nth-child(6)',filterPop:'.filters button:nth-child(7)',
    territoryEyebrow:'#territorio .section-head .eyebrow',territoryTitle:'#territorio .section-head h2',territoryText:'#territorio .section-head>p',methodEyebrow:'#metodo .eyebrow',methodTitle:'#metodo h2',method1Title:'#metodo li:nth-child(1) h3',method1Text:'#metodo li:nth-child(1) p',method2Title:'#metodo li:nth-child(2) h3',method2Text:'#metodo li:nth-child(2) p',method3Title:'#metodo li:nth-child(3) h3',method3Text:'#metodo li:nth-child(3) p',method4Title:'#metodo li:nth-child(4) h3',method4Text:'#metodo li:nth-child(4) p',
    logisticsEyebrow:'#logistica .eyebrow',logisticsTitle:'#logistica h2',logisticsText:'#logistica .logistics-intro>p:last-child',logistics1Title:'#logistica article:nth-child(1) h3',logistics1Text:'#logistica article:nth-child(1) p',logistics2Title:'#logistica article:nth-child(2) h3',logistics2Text:'#logistica article:nth-child(2) p',logistics3Title:'#logistica article:nth-child(3) h3',logistics3Text:'#logistica article:nth-child(3) p',logistics4Title:'#logistica article:nth-child(4) h3',logistics4Text:'#logistica article:nth-child(4) p',
    contactEyebrow:'#contatti .contact-copy .eyebrow',contactTitle:'#contatti .contact-copy h2',contactText:'#contatti .contact-copy>p:last-child',contactFormTitle:'.contact-form-head h3',contactName:'label[for="contact-name"]',contactEmail:'label[for="contact-email"]',contactEvent:'label[for="contact-event"]',contactCity:'label[for="contact-city"]',contactDates:'label[for="contact-dates"]',contactAudience:'label[for="contact-audience"]',contactAreas:'label[for="contact-areas"]',contactBudget:'label[for="contact-budget"]',contactInterest:'label[for="contact-interest"]',contactPhone:'label[for="contact-phone"]',contactEmailButton:'.contact-actions button:nth-child(1)',contactWhatsappButton:'.contact-actions button:nth-child(2)',contactPrivacy:'.form-privacy',
    footerCompany:'.company-footer strong',footerAddress:'.company-footer span:nth-of-type(1)',footerTax:'.company-footer span:nth-of-type(2)',footerReserved:'.company-footer a[href^="login"]',footerTop:'.company-footer .footer-top'
  };
  contentMap.filterRoleplay='.filters button:nth-child(4)';
  contentMap.filterEducation='.filters button:nth-child(8)';
  contentMap.sharedPanelEyebrow='#panel-condivisi .section-head .eyebrow';
  contentMap.sharedPanelTitle='#panel-condivisi .section-head h2';
  contentMap.sharedPanelText='#panel-condivisi .section-head>p';
  Object.entries(contentMap).forEach(([key,selector])=>{const node=document.querySelector(selector);if(node&&window.C3_SITE_CONTENT[key])node.textContent=window.C3_SITE_CONTENT[key]});
  ['heroImage1','heroImage2','heroImage3'].forEach((key,index)=>{const image=document.querySelectorAll('#home .cast-image img')[index];if(image&&window.C3_SITE_CONTENT[key])image.src=window.C3_SITE_CONTENT[key]});
}
const creatorTags=creator=>{
  if(Array.isArray(creator.filters)&&creator.filters.length) return creator.filters.join(' ');
  const value=`${creator.category} ${(creator.activities||[]).map(item=>typeof item==='string'?item:item.title).join(' ')}`.toLowerCase();
  return [/(fantasy|tolkien|harry potter|mitologia|folklore)/.test(value)&&'fantasy',/(panel|talk|hosting|moderazione|pop culture|cinema|serie)/.test(value)&&'pop',/(cosplay|prop)/.test(value)&&'cosplay',/(gaming|videogioco|videogame|esport)/.test(value)&&'gaming',/(gdr|gdt|gioco di ruolo|giochi di ruolo|gioco da tavolo|giochi da tavolo|boardgame)/.test(value)&&'gdr-gdt',/(music|musica|concerto|canto|performance|j-pop|k-pop|rock)/.test(value)&&'musica',/(divulgazione|storia|arte|tech|psicologia|soccorso|lezione|educazione)/.test(value)&&'divulgazione'].filter(Boolean).join(' ')||'pop';
};

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
if(creatorGrid&&window.C3_CREATORS&&Object.keys(window.C3_CREATORS).length){
  creatorGrid.innerHTML=Object.values(window.C3_CREATORS).map(creator=>`<article class="creator" data-slug="${escapeHtml(creator.slug)}" data-tags="${creatorTags(creator)}">${creator.image?`<img src="${escapeHtml(creator.image)}" alt="${escapeHtml(creator.name)}">`:`<div class="creator-placeholder">${escapeHtml(creator.name.split(' ').map(word=>word[0]).slice(0,2).join(''))}</div>`}<div><span>${escapeHtml(creator.category)}</span><h3>${escapeHtml(creator.name)}</h3><p>${escapeHtml(creator.description)}</p><small>${escapeHtml(creator.meta)}</small></div></article>`).join('');
  const count=document.querySelector('.roster-count');
  if(count) count.textContent=`${Object.keys(window.C3_CREATORS).length} CREATOR · UN UNICO PARTNER`;
}
const buttons=[...document.querySelectorAll('.filters button')];
const cards=[...document.querySelectorAll('.creator')];
const rosterGrid=document.querySelector('.creator-grid');
const rosterPagination=document.createElement('nav');
rosterPagination.className='roster-pagination';
rosterPagination.setAttribute('aria-label','Pagine del roster');
rosterPagination.innerHTML='<button type="button" data-page="previous" aria-label="Creator precedenti">←</button><span aria-live="polite"></span><button type="button" data-page="next" aria-label="Creator successivi">→</button>';
if(rosterGrid)rosterGrid.after(rosterPagination);
let rosterFilter='all',rosterPage=0;
const rosterColumns=()=>innerWidth<=680?1:innerWidth<=1100?2:3;
const renderRosterPage=()=>{
  const matches=cards.filter(card=>rosterFilter==='all'||card.dataset.tags.split(' ').includes(rosterFilter));
  const pageSize=rosterColumns()*3,totalPages=Math.max(1,Math.ceil(matches.length/pageSize));
  rosterPage=Math.min(rosterPage,totalPages-1);
  cards.forEach(card=>card.classList.add('hidden'));
  matches.slice(rosterPage*pageSize,(rosterPage+1)*pageSize).forEach(card=>card.classList.remove('hidden'));
  rosterPagination.querySelector('span').textContent=`${rosterPage+1} / ${totalPages}`;
  rosterPagination.querySelector('[data-page="previous"]').disabled=rosterPage===0;
  rosterPagination.querySelector('[data-page="next"]').disabled=rosterPage>=totalPages-1;
  rosterPagination.hidden=totalPages<=1;
};
rosterPagination.addEventListener('click',event=>{
  const button=event.target.closest('button[data-page]');
  if(!button)return;
  rosterPage+=button.dataset.page==='next'?1:-1;
  renderRosterPage();
  document.querySelector('#creator .filters').scrollIntoView({behavior:'smooth',block:'start'});
});
let rosterResizeTimer;
addEventListener('resize',()=>{clearTimeout(rosterResizeTimer);rosterResizeTimer=setTimeout(renderRosterPage,160)});
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
}));
renderRosterPage();

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
        ${group.creators.map(([slug,region])=>{
          const creator=window.C3_CREATORS[slug];
          return `<a href="creator.html?id=${slug}"><span>${creator.name}</span><small>${region}</small><b aria-hidden="true">→</b></a>`;
        }).join('')}
      </div>
    </article>`).join('');
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
  contactForm.addEventListener('submit',event=>{
    event.preventDefault();
    if(!contactForm.reportValidity()) return;
    window.C3_SAVE_CONTACT&&window.C3_SAVE_CONTACT(contactForm);
    location.href=`mailto:${window.C3_SITE_CONTENT?.contactEmailTarget||'info@c3agency.it'}?subject=${encodeURIComponent('Richiesta creator per '+contactForm.elements.event.value)}&body=${encodeURIComponent(requestText())}`;
  });
  whatsappButton.addEventListener('click',()=>{
    if(!contactForm.reportValidity()) return;
    window.C3_SAVE_CONTACT&&window.C3_SAVE_CONTACT(contactForm);
    window.open(`https://wa.me/${(window.C3_SITE_CONTENT?.contactWhatsappTarget||'393513448497').replace(/\D/g,'')}?text=${encodeURIComponent(requestText())}`,'_blank','noopener');
  });
}
