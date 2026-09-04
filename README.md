# C3 Agency · events.c3agency.it

Sito dei creator e dei format per fiere e festival, con area riservata per
aggiornare i contenuti senza toccare il codice.

- **Sito statico** su GitHub Pages, sottodominio `events.c3agency.it`
  (il dominio resta su Aruba, che punta qui con un record CNAME).
- **Contenuti e autenticazione** su Supabase, progetto `eventi`.

## Come funziona

Il sito legge tutto con **una sola chiamata**: `select site_payload()`.
Restituisce creator, aree geografiche, panel, testi e impostazioni già nella
forma che il frontend si aspetta, quindi il codice di rendering è rimasto
quello di prima.

L'area riservata scrive con `save_creators()`, `save_panels()`,
`save_site_content()` e `save_setting()`. Ognuna controlla da sé che chi
chiama sia l'admin: riscrivere il JavaScript nel browser non serve a niente.

| Tabella | Contenuto |
|---|---|
| `creators` | una riga per creator, `data` jsonb con scheda, attività e territori |
| `shared_panels` | i panel condivisi fra più creator |
| `site_settings` | `site_content` (i testi), `geo_areas` (le tre aree), macrocategorie |
| `contact_requests` | le richieste inviate dal form contatti |

Creator e aree tornano dall'API come **array**, non come oggetti: un oggetto
jsonb riordina le proprie chiavi, e sul sito l'ordine conta.

## File

| File | A cosa serve |
|---|---|
| `supabase-config.js` | URL del progetto e publishable key |
| `c3-data.js` | carica i contenuti, avvia lo script di pagina, salva le richieste dal form |
| `c3-auth.js` | login, rinnovo del token, chiamate autenticate |
| `admin-auth.js` | protegge `admin.html` |
| `creators.js` `panels.js` `site-content.js` | copia dei contenuti usata come riserva |
| `supabase/01-api.sql` | funzioni di lettura e scrittura |
| `supabase/02-seed.sql` | contenuti iniziali, rigenerabili dai file del sito |

## Primo popolamento del database

Il database parte vuoto e il sito funziona lo stesso, usando la copia inclusa
nei file `.js`. Per portarla dentro Supabase ci sono due strade:

1. entrare in `/login.html` e premere **Pubblica tutto su Supabase**
   nell'area riservata; oppure
2. eseguire `supabase/02-seed.sql` nel SQL Editor di Supabase.

## Sicurezza

La `publishable key` in `supabase-config.js` è pubblica per definizione: sta
nel JavaScript del sito. A proteggere il database sono le policy RLS, non la
segretezza della chiave. La `secret key` non va mai messa in questo
repository.

L'accesso all'area riservata è consentito al solo utente
`direzione@c3agency.it`. Il controllo è nella funzione `is_c3_admin()`, che
prevede anche il secondo fattore: oggi è disattivato perché sull'utente non
è registrato alcun TOTP. Per riattivarlo basta rimettere `default true`.

## Se Supabase non risponde

Il sito continua a funzionare con la copia inclusa nei file: la pagina non
resta mai bianca, al massimo mostra contenuti non aggiornati. Lo stesso vale
per il form contatti, che in ogni caso apre email o WhatsApp.
