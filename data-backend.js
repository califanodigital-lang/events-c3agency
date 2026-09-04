(function(){
  const parseLocal=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||'null')||fallback}catch{return fallback}};
  window.C3_LOCAL_DRAFT={creators:parseLocal('c3_creator_manager_data',null),panels:parseLocal('c3_shared_panels',null),siteContent:parseLocal('c3_site_content',null),macrocategories:parseLocal('c3_activity_macrocategories',null)};
  const client=window.C3_SUPABASE;
  if(!client){window.C3_DATA_READY=Promise.resolve({source:'local'});return}
  window.C3_DATA_READY=(async()=>{
    const [creatorResult,panelResult,settingResult]=await Promise.all([
      client.from('creators').select('slug,sort_order,data').order('sort_order'),
      client.from('shared_panels').select('slug,sort_order,data').order('sort_order'),
      client.from('site_settings').select('key,data')
    ]);
    const error=creatorResult.error||panelResult.error||settingResult.error;if(error)throw error;
    if(creatorResult.data?.length){const list=creatorResult.data.map(row=>({...row.data,slug:row.slug}));window.C3_CREATORS=list.reduce((map,item)=>(map[item.slug]=item,map),{});if(window.C3_GEO)Object.entries(window.C3_GEO).forEach(([area,group])=>{group.creators=list.flatMap(item=>(item.territories||[]).filter(place=>place.area===area).map(place=>[item.slug,place.region]))});localStorage.setItem('c3_creator_manager_data',JSON.stringify(list))}
    if(panelResult.data?.length){window.C3_PANELS=panelResult.data.map(row=>({...row.data,slug:row.slug}));localStorage.setItem('c3_shared_panels',JSON.stringify(window.C3_PANELS))}
    const settings=Object.fromEntries((settingResult.data||[]).map(row=>[row.key,row.data]));
    if(settings.site_content){window.C3_SITE_CONTENT={...window.C3_SITE_CONTENT_DEFAULTS,...settings.site_content};localStorage.setItem('c3_site_content',JSON.stringify(window.C3_SITE_CONTENT))}
    if(Array.isArray(settings.macrocategories)){window.C3_REMOTE_MACROCATEGORIES=settings.macrocategories;localStorage.setItem('c3_activity_macrocategories',JSON.stringify(settings.macrocategories))}
    return {source:'supabase'};
  })().catch(error=>{console.warn('Contenuti online non disponibili; uso la copia locale.',error);return {source:'local',error}});
  const replaceRows=async(table,items)=>{
    const rows=items.map((item,index)=>({slug:item.slug,sort_order:index,data:item,updated_at:new Date().toISOString()}));
    if(rows.length){const {error}=await client.from(table).upsert(rows,{onConflict:'slug'});if(error)throw error}
    const existing=await client.from(table).select('slug');if(existing.error)throw existing.error;
    const keep=new Set(items.map(item=>item.slug)),removed=(existing.data||[]).map(row=>row.slug).filter(slug=>!keep.has(slug));
    if(removed.length){const {error}=await client.from(table).delete().in('slug',removed);if(error)throw error}
  };
  window.C3_BACKEND={saveCreators:items=>replaceRows('creators',items),savePanels:items=>replaceRows('shared_panels',items),saveSetting:async(key,data)=>{const {error}=await client.from('site_settings').upsert({key,data,updated_at:new Date().toISOString()},{onConflict:'key'});if(error)throw error}};
})();
