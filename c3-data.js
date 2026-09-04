/* c3-data.js — carica i contenuti da Supabase e poi avvia lo script di pagina.
 *
 * Uso:  <script src="c3-data.js" data-render="script.js"></script>
 *
 * Regole:
 *  - se c'è una copia in cache recente, la pagina parte subito e i dati
 *    freschi vengono richiesti in background (stale-while-revalidate);
 *  - se Supabase non risponde entro il timeout, si usano i dati inclusi
 *    nel sito: la pagina non resta mai bianca.
 */
(function () {
  var script = document.currentScript;
  var render = script && script.dataset.render;
  var cfg = window.C3_SUPABASE || {};
  var CACHE_KEY = 'c3_payload_cache';
  var CACHE_TTL = 5 * 60 * 1000;   // 5 minuti
  var TIMEOUT   = 3000;            // 3 secondi

  var booted = false;
  function boot() {
    if (booted || !render) { booted = true; return; }
    booted = true;
    var s = document.createElement('script');
    s.src = render;
    document.head.appendChild(s);
  }

  function apply(data) {
    if (!data || typeof data !== 'object') return false;
    // Creator e aree arrivano come array: l'ordine dentro un oggetto jsonb
    // non è quello di inserimento, e sul sito l'ordine conta.
    if (Array.isArray(data.creators) && data.creators.length) {
      var map = {};
      data.creators.forEach(function (c) { if (c && c.slug) map[c.slug] = c; });
      window.C3_CREATORS = map;
      if (Array.isArray(data.geo) && data.geo.length) {
        var geo = {};
        data.geo.forEach(function (a) {
          if (a && a.key) geo[a.key] = { title: a.title, subtitle: a.subtitle, creators: a.creators || [] };
        });
        window.C3_GEO = geo;
      }
    }
    if (Array.isArray(data.panels) && data.panels.length) window.C3_PANELS = data.panels;
    if (data.content && Object.keys(data.content).length) {
      window.C3_SITE_CONTENT = Object.assign({}, window.C3_SITE_CONTENT_DEFAULTS, data.content);
    }
    window.C3_SETTINGS = data.settings || {};
    window.C3_PAYLOAD = data;
    return true;
  }

  function readCache() {
    try {
      var raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      var box = JSON.parse(raw);
      if (!box || !box.at || !box.data) return null;
      return { data: box.data, fresh: (Date.now() - box.at) < CACHE_TTL };
    } catch (e) { return null; }
  }

  function writeCache(data) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data: data })); }
    catch (e) { /* quota piena: pazienza, si ricarica dalla rete */ }
  }

  function load() {
    if (!cfg.url || !cfg.anonKey) return Promise.reject(new Error('Supabase non configurato'));
    var ctrl = new AbortController();
    var timer = setTimeout(function () { ctrl.abort(); }, TIMEOUT);
    return fetch(cfg.url.replace(/\/+$/, '') + '/rest/v1/rpc/site_payload', {
      method: 'POST',
      headers: {
        'apikey': cfg.anonKey,
        'Authorization': 'Bearer ' + cfg.anonKey,
        'Content-Type': 'application/json'
      },
      body: '{}',
      signal: ctrl.signal
    }).then(function (r) {
      clearTimeout(timer);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    });
  }

  /* Salva una richiesta dal form contatti. Il sito continua a funzionare
     anche se fallisce: email e WhatsApp restano il canale principale. */
  window.C3_SAVE_CONTACT = function (form) {
    if (!cfg.url || !cfg.anonKey) return Promise.resolve(false);
    var f = new FormData(form), v = function (k) { return (f.get(k) || '').toString().trim(); };
    if (!v('name') || !v('email')) return Promise.resolve(false);
    return fetch(cfg.url.replace(/\/+$/, '') + '/rest/v1/contact_requests', {
      method: 'POST',
      headers: {
        'apikey': cfg.anonKey,
        'Authorization': 'Bearer ' + cfg.anonKey,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        name: v('name'), email: v('email'), phone: v('phone'),
        event_name: v('event'), city: v('city'), event_dates: v('dates'),
        audience: v('audience') || null, areas: v('areas') || null,
        budget: v('budget') || null, interest: v('interest') || null
      })
    }).then(function (r) { return r.ok; })
      .catch(function (e) { console.warn('[C3] Richiesta non registrata sul database.', e); return false; });
  };

  var cached = readCache();

  if (cached && cached.fresh) {
    // Partenza immediata dai dati in cache, aggiornamento silenzioso.
    apply(cached.data);
    window.C3_DATA_SOURCE = 'cache';
    boot();
    load().then(function (data) { writeCache(data); }).catch(function () {});
    return;
  }

  load().then(function (data) {
    apply(data);
    writeCache(data);
    window.C3_DATA_SOURCE = 'supabase';
  }).catch(function (err) {
    if (cached && apply(cached.data)) {
      window.C3_DATA_SOURCE = 'cache-scaduta';
    } else {
      window.C3_DATA_SOURCE = 'statico';
    }
    console.warn('[C3] Contenuti da Supabase non disponibili, uso i dati inclusi nel sito.', err && err.message);
  }).then(boot, boot);
})();
