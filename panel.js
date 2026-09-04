(async()=>{
try{
  const base='https://nmgqdqowtblfrdjmmziu.supabase.co/rest/v1',key='sb_publishable_xrn0-qUphljq3nlPGsq6pA_ssqphmYk',headers={apikey:key,Authorization:`Bearer ${key}`};
  const [creatorResponse,panelResponse]=await Promise.all([fetch(`${base}/creators?select=slug,sort_order,data&order=sort_order`,{headers}),fetch(`${base}/shared_panels?select=slug,sort_order,data&order=sort_order`,{headers})]);
  if(creatorResponse.ok){const rows=await creatorResponse.json();if(rows.length)window.C3_CREATORS=rows.reduce((map,row)=>(map[row.slug]={...row.data,slug:row.slug},map),{})}
  if(panelResponse.ok){const rows=await panelResponse.json();if(rows.length)window.C3_PANELS=rows.map(row=>({...row.data,slug:row.slug}))}
}catch(error){console.warn('Scheda online non disponibile; uso i dati inclusi nel sito.',error)}
const root=document.querySelector('#panel-detail'),slug=new URLSearchParams(location.search).get('id'),panel=window.C3_PANELS.find(item=>item.slug===slug);
const esc=value=>String(value??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
if(!panel){root.innerHTML='<div class="empty-panel"><h1>Panel non trovato</h1><p>Questa proposta non è disponibile.</p><a class="button" href="index.html#panel-condivisi">Torna ai panel</a></div>'}else{
  document.title=`${panel.title} | C3 Agency`;
  const canonicalUrl=`https://events.c3agency.it/panel.html?id=${encodeURIComponent(panel.slug)}`;
  const description=String(panel.description||'').slice(0,300);
  let descriptionMeta=document.querySelector('meta[name="description"]');if(!descriptionMeta){descriptionMeta=document.createElement('meta');descriptionMeta.name='description';document.head.append(descriptionMeta)}descriptionMeta.content=description;
  let robotsMeta=document.querySelector('meta[name="robots"]');if(!robotsMeta){robotsMeta=document.createElement('meta');robotsMeta.name='robots';document.head.append(robotsMeta)}robotsMeta.content='index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1';
  let canonical=document.querySelector('link[rel="canonical"]');if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.append(canonical)}canonical.href=canonicalUrl;
  const addMeta=(property,content)=>{let node=document.querySelector(`meta[property="${property}"]`);if(!node){node=document.createElement('meta');node.setAttribute('property',property);document.head.append(node)}node.content=content};addMeta('og:type','article');addMeta('og:site_name','C3 Agency Events');addMeta('og:title',`${panel.title} | C3 Agency`);addMeta('og:description',description);addMeta('og:url',canonicalUrl);
  const structured=document.createElement('script');structured.type='application/ld+json';structured.textContent=JSON.stringify({'@context':'https://schema.org','@type':'Event',name:panel.title,description:panel.description,url:canonicalUrl,eventAttendanceMode:'https://schema.org/OfflineEventAttendanceMode',organizer:{'@type':'Organization',name:'C3 Agency SRL',url:'https://events.c3agency.it/'}});document.head.append(structured);
  const people=(panel.participants||[]).map(id=>window.C3_CREATORS[id]).filter(Boolean);
  root.innerHTML=`<section class="panel-detail"><div class="panel-detail-inner"><div class="panel-copy"><p class="eyebrow">${esc(panel.eyebrow||'Panel condiviso')}</p><h1>${esc(panel.title)}</h1><p>${esc(panel.description)}</p><div class="panel-facts"><div><b>Durata</b><span>${esc(panel.duration)}</span></div><div><b>Target</b><span>${esc(panel.target)}</span></div><div><b>Ideale per</b><span>${esc(panel.ideal)}</span></div></div></div><div class="panel-people">${panel.image?`<img class="panel-cover" src="${esc(panel.image)}" alt="${esc(panel.title)}">`:`<div class="panel-portraits" data-count="${people.length}">${people.map(person=>`<div class="panel-person"><img src="${esc(person.image)}" alt="${esc(person.name)}"><a href="creator.html?id=${esc(person.slug)}">${esc(person.name)}</a></div>`).join('')}</div>`}</div></div></section>`;
}
})();
