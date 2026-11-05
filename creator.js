(()=>{const id=new URLSearchParams(location.search).get('id');if(id&&!document.body.dataset.creatorSlug&&(window.C3_SEO_ROUTES?.creator||[]).includes(id))location.replace(new URL(window.C3_SEO.creatorUrl(id),document.baseURI).href)})();
(window.C3_DATA_READY||Promise.resolve()).then(result=>{
const slug = new URLSearchParams(location.search).get('id')||document.body.dataset.creatorSlug;
const creator = window.C3_CREATORS[slug]||(result?.source!=='supabase'?window.C3_PRERENDERED_CREATOR:null);
const root = document.querySelector('#profile');
const escapeHtml=value=>String(value??'').replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
const normalizeSocials=person=>(person.socials?.length?person.socials:(window.C3_CREATOR_SOCIALS?.[person.slug]||[])).map(item=>Array.isArray(item)?{label:item[0],url:item[1]}:item).filter(item=>item&&/^https?:\/\//i.test(item.url||''));
const socialIcon=label=>{
  const name=String(label||'').toLowerCase();
  let body='<circle cx="12" cy="12" r="9"/><path d="M3.6 12h16.8M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>';
  if(name.includes('instagram')) body='<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.7" r="1" class="social-icon-fill"/>';
  else if(name.includes('youtube')) body='<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10 9 5 3-5 3Z" class="social-icon-fill"/>';
  else if(name.includes('tiktok')) body='<path d="M15 4v10.2a4.2 4.2 0 1 1-3.4-4.1"/><path d="M15 4c.7 2.5 2.2 3.8 4.5 4"/>';
  else if(name.includes('facebook')) body='<path d="M14.5 21v-8h3l.5-3h-3.5V8.3c0-1 .4-1.8 1.9-1.8H18V3.8c-.7-.1-1.5-.2-2.3-.2-3.1 0-5.2 1.9-5.2 5.3V10H8v3h2.5v8Z" class="social-icon-fill"/>';
  else if(name.includes('twitch')) body='<path d="M4 3h17v12l-5 5h-4l-3 2v-2H4Z"/><path d="M9 7v6M15 7v6"/>';
  else if(name.includes('spotify')) body='<circle cx="12" cy="12" r="9"/><path d="M7 9c3.8-1 7.7-.7 11 .9M7.8 12.3c3.1-.8 6.4-.5 9.2.8M8.7 15.4c2.5-.5 5-.3 7.2.6"/>';
  return `<svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true">${body}</svg>`;
};
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

const explainActivity=(activity,person)=>window.C3_SEO.activityDescription(activity,person);

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
  document.querySelector('meta[name="robots"]').content='noindex,follow';
  root.innerHTML = `<section class="profile-error"><p class="eyebrow">Profilo non trovato</p><h1>Questo creator non è disponibile.</h1><a class="button" href="index.html#creator">Torna al roster</a></section>`;
} else {
  document.title = `${creator.name}: creator per fiere e convention | C3 Agency`;
  const seoDescription = `${creator.name}, creator C3 Agency per fiere, festival ed eventi: ${creator.description}`.slice(0, 300);
  const canonicalUrl = new URL(window.C3_SEO.creatorUrl(creator.slug),'https://events.c3agency.it/').href;
  const absoluteImage = window.C3_SEO.publicImage(creator.image,'creator',creator.slug);
  document.querySelector('meta[name="description"]').content = seoDescription;
  let canonical=document.querySelector('link[rel="canonical"]');if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.append(canonical)}canonical.href=canonicalUrl;
  const setMeta=(selector,value,attribute='content')=>{const node=document.querySelector(selector);if(node)node.setAttribute(attribute,value)};
  setMeta('meta[property="og:title"]',`${creator.name}: creator per fiere ed eventi | C3 Agency`);
  setMeta('meta[property="og:description"]',seoDescription);
  setMeta('meta[property="og:url"]',canonicalUrl);
  let ogImage=document.querySelector('meta[property="og:image"]');
  if(!ogImage){ogImage=document.createElement('meta');ogImage.setAttribute('property','og:image');document.head.append(ogImage)}
  ogImage.content=absoluteImage;
  let twitterImage=document.querySelector('meta[name="twitter:image"]');if(!twitterImage){twitterImage=document.createElement('meta');twitterImage.name='twitter:image';document.head.append(twitterImage)}twitterImage.content=absoluteImage;
  const structured=document.getElementById('seo-entity')||document.createElement('script');structured.id='seo-entity';
  structured.type='application/ld+json';
  const creatorSocials=normalizeSocials(creator);
  structured.textContent=JSON.stringify({'@context':'https://schema.org','@type':'ProfilePage',url:canonicalUrl,mainEntity:{'@type':['never-20','team-rocker','ede-e-davide'].includes(creator.slug)?'Organization':'Person',name:creator.name,description:creator.description,image:absoluteImage,url:canonicalUrl,sameAs:creatorSocials.map(item=>item.url)}});
  document.head.append(structured);
  const creatorImagePosition=creator.imagePositionX!=null||creator.imagePositionY!=null?`${creator.imagePositionX??50}% ${creator.imagePositionY??30}%`:(imageFocus[creator.slug]||'50% 42%');
  const creatorImageZoom=(Number(creator.imageZoom)||100)/100;
  const media = creator.image
    ? `<img src="${escapeHtml(creator.image)}" alt="${escapeHtml(creator.name)}" style="object-position:${creatorImagePosition};object-fit:cover;transform-origin:${creatorImagePosition};transform:scale(${creatorImageZoom})">`
    : `<div class="profile-monogram" aria-hidden="true">${creator.name.split(' ').map(word=>word[0]).slice(0,2).join('')}</div>`;
  const categories=groupedActivities(creator);
  const contactEmailTarget=window.C3_SITE_CONTENT?.contactEmailTarget||'info@c3agency.it';
  const contactWhatsappTarget=(window.C3_SITE_CONTENT?.contactWhatsappTarget||'393513448497').replace(/\D/g,'');
  const activitiesMarkup = `<div class="activity-categories">${categories.map((category,categoryIndex)=>`
    <details class="activity-category panel-list">
      <summary><span><span class="activity-kicker">Categoria ${String(categoryIndex+1).padStart(2,'0')}</span><strong>${escapeHtml(category.name)}</strong><small>${category.items.length} ${category.items.length===1?'attività':'attività disponibili'} · apri per i dettagli</small></span><i aria-hidden="true"><span>Mostra</span><b></b></i></summary>
      <ol>${category.items.map((item,index)=>`<li style="--panel-delay:${Math.min(index*24,240)}ms"><details class="panel-item"><summary><span>${escapeHtml(item.title)}</span><b aria-hidden="true"></b></summary><p>${escapeHtml(item.description)}</p></details></li>`).join('')}</ol>
    </details>`).join('')}</div>`;
  const socialsMarkup=creatorSocials.length?`<section class="profile-socials"><p class="eyebrow">Online</p><h2>Segui ${escapeHtml(creator.name)}.</h2><div class="social-links">${creatorSocials.map(item=>`<a class="social-link" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(creator.name)} su ${escapeHtml(item.label)}">${socialIcon(item.label)}<span>${escapeHtml(item.label)}</span></a>`).join('')}</div></section>`:'';
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
    ${socialsMarkup}
    <section class="profile-activities">
      <div><p class="eyebrow">In fiera</p><h2>Cosa può fare.</h2></div>
      ${activitiesMarkup}
    </section>
    ${window.C3_SEO.relatedPanelsMarkup(creator,result?.source==='supabase'?(window.C3_PANELS||[]):(window.C3_PRERENDERED_PANELS||window.C3_PANELS||[]))}
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
});
