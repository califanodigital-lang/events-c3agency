window.C3_ANALYTICS_CONFIG={measurementId:'G-PFPNDJ300P'};
(()=>{
  const hasConsent=()=>{
    try{return JSON.parse(localStorage.getItem('c3_cookie_preferences_v1')||'null')?.analytics===true}catch{return false}
  };
  window.C3_ANALYTICS={
    contactSent(){
      if(!hasConsent()||typeof window.gtag!=='function')return false;
      try{
        // Only an acknowledged submission calls this; never pass form fields to Analytics.
        window.gtag('event','generate_lead',{send_to:window.C3_ANALYTICS_CONFIG.measurementId,method:'contact_form',form_id:'contact-form'});
        return true;
      }catch{return false}
    }
  };
})();
