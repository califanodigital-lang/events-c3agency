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
    if (data.creators && Object.keys(data.creators).length) {
      window.C3_CREATORS = data.creators;
      if (data.geo && Object.keys(data.geo).length) window.C3_GEO = data.geo;
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
