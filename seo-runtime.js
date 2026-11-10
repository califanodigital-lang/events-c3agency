(window.C3_DATA_READY||Promise.resolve()).then(()=>{
  const seo=window.C3_SEO;
  if(!seo)return;
  const content=seo.resolveSiteContent(window.C3_SITE_CONTENT);
  window.C3_SITE_CONTENT=content;
  const references=document.querySelector('#esperienze');if(references){const markup=seo.referencesMarkup(content);references.hidden=!markup;if(markup)references.querySelector('.reference-list').innerHTML=markup}
  if(document.body.dataset.seoService){
    const robots=document.querySelector('meta[name="robots"]');if(robots)robots.content='noindex,follow';
    const service=seo.services.find(item=>item.slug===document.body.dataset.seoService);
    if(service){const resolved=seo.resolveService(service,content);document.querySelector('#service-content').innerHTML=seo.serviceMarkup(service,content,window.C3_CREATORS);document.title=resolved.title+' | C3 Agency';document.querySelector('meta[name="description"]').content=resolved.lead}
  }else if(document.querySelector('#home')){
    document.title=content.seoHomeTitle||document.title;
    const meta=document.querySelector('meta[name="description"]');if(meta&&content.seoHomeDescription)meta.content=content.seoHomeDescription;
    [['og:title',content.seoHomeTitle],['og:description',content.seoHomeDescription],['twitter:title',content.seoHomeTitle],['twitter:description',content.seoHomeDescription]].forEach(([name,value])=>{const node=document.querySelector(`meta[property="${name}"],meta[name="${name}"]`);if(node&&value)node.content=value});
    document.querySelectorAll('script[type="application/ld+json"]').forEach(node=>{
      try{
        const entity=JSON.parse(node.textContent);
        if(Array.isArray(entity['@graph']))entity['@graph']=entity['@graph'].map(item=>item['@type']==='Service'?seo.homeService(content):item);
        else if(entity['@type']==='FAQPage')entity.mainEntity=[1,2,3].map(index=>({'@type':'Question',name:content[`faqQuestion${index}`],acceptedAnswer:{'@type':'Answer',text:content[`faqAnswer${index}`]}}));
        else return;
        node.textContent=JSON.stringify(entity).replace(/</g,'\\u003c');
      }catch{}
    });
  }
  const prepareImages=()=>{
    document.querySelectorAll('img:not([data-loading-ready])').forEach(image=>{image.dataset.loadingReady='true';image.decoding='async';if(!image.closest('#home,.profile-hero,.panel-detail,.topbar,.profile-header,.panel-header'))image.loading='lazy'});
    document.querySelectorAll('a[href*="creator.html?id="],a[href*="panel.html?id="]').forEach(link=>{const url=new URL(link.getAttribute('href'),document.baseURI);if(url.origin!==location.origin)return;const slug=url.searchParams.get('id');if(!slug)return;link.href=new URL(url.pathname.endsWith('/creator.html')?seo.creatorUrl(slug):seo.panelUrl(slug),document.baseURI).href});
  };
  prepareImages();
  let pending=false;new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;prepareImages()})}).observe(document.body,{childList:true,subtree:true});
});
