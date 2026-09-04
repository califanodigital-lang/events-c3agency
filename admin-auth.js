/* Protegge admin.html. La sessione è un token firmato da Supabase: senza,
   il database non restituisce nulla e nessuna scrittura passa. */
(function () {
  var root = document.documentElement;
  root.style.visibility = 'hidden';
  function show() { root.style.visibility = ''; }
  if (!window.C3Auth || !C3Auth.configured()) {
    show();
    console.warn('[C3] Supabase non configurato: area riservata non protetta.');
    return;
  }
  C3Auth.requireSession('login.html').then(function (s) { if (s) show(); });
})();
