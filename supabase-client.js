(()=>{
  const config=window.C3_SUPABASE_CONFIG;
  if(!config||!window.supabase){console.error('Configurazione Supabase non disponibile.');return}
  window.C3_SUPABASE=window.supabase.createClient(config.url,config.publishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  window.C3_REQUIRE_ADMIN=async({requireMfa=true}={})=>{
    const {data:{user}}=await window.C3_SUPABASE.auth.getUser();
    if(!user||user.email?.toLowerCase()!==config.adminEmail.toLowerCase()){location.replace('login.html');return null}
    if(requireMfa){const {data}=await window.C3_SUPABASE.auth.mfa.getAuthenticatorAssuranceLevel();if(data?.nextLevel==='aal2'&&data.currentLevel!=='aal2'){location.replace('login.html?step=mfa');return null}}
    return user;
  };
})();
