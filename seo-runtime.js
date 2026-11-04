(window.C3_DATA_READY||Promise.resolve()).then(()=>{
  const content=window.C3_SITE_CONTENT||{},seo=window.C3_SEO;
  if(!seo)return;
  const references=document.querySelector('#esperienze');if(references){const markup=seo.referencesMarkup(content);references.hidden=!markup;if(markup)references.querySelector('.reference-list').innerHTML=markup}
  if(document.body.dataset.seoService){
    const robots=document.querySelector('meta[name="robots"]');if(robots)robots.content='noindex,follow';
    const service=seo.services.find(item=>item.slug===document.body.dataset.seoService);
    if(service){const resolved=seo.resolveService(service,content);document.querySelector('#service-content').innerHTML=seo.serviceMarkup(service,content,window.C3_CREATORS);document.title=resolved.title+' | C3 Agency';document.querySelector('meta[name="description"]').content=resolved.lead}
  }else if(document.querySelector('#home')){
    document.title=content.seoHomeTitle||document.title;
    const meta=document.querySelector('meta[name="description"]');if(meta&&content.seoHomeDescription)meta.content=content.seoHomeDescription;
  }
  const prepareImages=()=>{
    document.querySelectorAll('img:not([data-loading-ready])').forEach(image=>{image.dataset.loadingReady='true';image.decoding='async';if(!image.closest('#home,.profile-hero,.panel-detail,.topbar,.profile-header,.panel-header'))image.loading='lazy'});
    document.querySelectorAll('a[href*="creator.html?id="],a[href*="panel.html?id="]').forEach(link=>{const url=new URL(link.getAttribute('href'),document.baseURI);if(url.origin!==location.origin)return;const slug=url.searchParams.get('id');if(!slug)return;link.href=new URL(url.pathname.endsWith('/creator.html')?seo.creatorUrl(slug):seo.panelUrl(slug),document.baseURI).href});
  };
  prepareImages();
  let pending=false;new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;prepareImages()})}).observe(document.body,{childList:true,subtree:true});
});
