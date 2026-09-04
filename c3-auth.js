/* c3-auth.js — autenticazione dell'area riservata su Supabase Auth.
 *
 * Niente password dentro il codice: le credenziali vengono verificate dal
 * server di Supabase, che restituisce un token a scadenza. Il token viene
 * poi presentato al database, dove le policy RLS decidono cosa si può
 * leggere e scrivere. Modificare questo file non dà accesso a nulla.
 */
window.C3Auth = (function () {
  var cfg = window.C3_SUPABASE || {};
  var KEY = 'c3_auth_session';
  var base = (cfg.url || '').replace(/\/+$/, '');

  function headers(token) {
    var h = { 'apikey': cfg.anonKey, 'Content-Type': 'application/json' };
    h['Authorization'] = 'Bearer ' + (token || cfg.anonKey);
    return h;
  }

  function store(session) {
    if (!session) { localStorage.removeItem(KEY); return null; }
    session.expires_at = Date.now() + ((session.expires_in || 3600) - 60) * 1000;
    localStorage.setItem(KEY, JSON.stringify(session));
    return session;
  }

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; }
  }

  function configured() { return !!(base && cfg.anonKey); }

  function signIn(email, password) {
    if (!configured()) return Promise.reject(new Error('Supabase non configurato.'));
    return fetch(base + '/auth/v1/token?grant_type=password', {
      method: 'POST', headers: headers(), body: JSON.stringify({ email: email, password: password })
    }).then(function (r) {
      return r.json().then(function (body) {
        if (!r.ok) throw new Error(body.error_description || body.msg || body.message || 'Accesso non riuscito.');
        return store(body);
      });
    });
  }

  function refresh(session) {
    return fetch(base + '/auth/v1/token?grant_type=refresh_token', {
      method: 'POST', headers: headers(), body: JSON.stringify({ refresh_token: session.refresh_token })
    }).then(function (r) {
      if (!r.ok) throw new Error('Sessione scaduta.');
      return r.json();
    }).then(store);
  }

  /** Restituisce una sessione valida, rinnovando il token se serve. */
  function session() {
    var s = read();
    if (!s || !s.access_token) return Promise.resolve(null);
    if (s.expires_at && Date.now() < s.expires_at) return Promise.resolve(s);
    if (!s.refresh_token) { store(null); return Promise.resolve(null); }
    return refresh(s).catch(function () { store(null); return null; });
  }

  function signOut() {
    var s = read();
    store(null);
    if (!s || !configured()) return Promise.resolve();
    return fetch(base + '/auth/v1/logout', { method: 'POST', headers: headers(s.access_token) })
      .catch(function () {});
  }

  /** Protegge una pagina: senza sessione valida rimanda al login. */
  function requireSession(loginUrl) {
    return session().then(function (s) {
      if (!s) { location.replace(loginUrl || 'login.html'); return null; }
      return s;
    });
  }

  /** Chiamata a una funzione SQL con i permessi dell'utente collegato. */
  function rpc(name, args) {
    return session().then(function (s) {
      if (!s) throw new Error('Sessione scaduta: rientra dall’area riservata.');
      return fetch(base + '/rest/v1/rpc/' + name, {
        method: 'POST', headers: headers(s.access_token), body: JSON.stringify(args || {})
      }).then(function (r) {
        if (r.status === 204) return null;
        return r.json().then(function (body) {
          if (!r.ok) throw new Error((body && (body.message || body.hint)) || ('Errore ' + r.status));
          return body;
        });
      });
    });
  }

  /** Cambia la password dell'utente collegato. */
  function updatePassword(newPassword) {
    return session().then(function (s) {
      if (!s) throw new Error('Sessione scaduta.');
      return fetch(base + '/auth/v1/user', {
        method: 'PUT', headers: headers(s.access_token),
        body: JSON.stringify({ password: newPassword })
      }).then(function (r) {
        return r.json().then(function (body) {
          if (!r.ok) throw new Error(body.msg || body.message || 'Aggiornamento non riuscito.');
          return body;
        });
      });
    });
  }

  function currentUser() { var s = read(); return s && s.user ? s.user : null; }

  return {
    configured: configured,
    signIn: signIn,
    signOut: signOut,
    session: session,
    requireSession: requireSession,
    rpc: rpc,
    updatePassword: updatePassword,
    user: currentUser
  };
})();
