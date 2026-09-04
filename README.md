# C3 Agency · events.c3agency.it

Sito pubblico dei creator e dei format per fiere e festival, con area riservata
per aggiornare contenuti senza toccare il codice.

- **Sito statico** pubblicato con GitHub Pages sul sottodominio `events.c3agency.it`.
- **Contenuti e autenticazione** su Supabase (Postgres + Auth), letti dal sito
  con una sola chiamata SQL.

## Come sono organizzati i dati

| Tabella | Contenuto |
|---|---|
| `creators` | schede creator: nome, categoria, descrizione, immagine, attività |
| `creator_territories` | in quali aree e regioni compare ogni creator |
| `geo_areas` | le tre aree geografiche (nord, centro, sud) |
| `panels` | i panel condivisi fra più creator |
| `site_content` | tutti i testi della homepage, chiave/valore |
| `app_settings` | impostazioni sparse (macrocategorie delle attività) |
| `admins` | chi può scrivere. Un utente entra qui solo con un insert manuale |

Il sito legge tutto con `select site_payload()`: una chiamata sola, che
restituisce i dati già nella forma che il frontend si aspetta.
L'area riservata scrive con `save_creators()`, `save_panels()`,
`save_site_content()` e `save_setting()`: ognuna verifica da sé che chi chiama
sia un admin, quindi non sono aggirabili dal browser.

## Primo avvio

1. Crea un progetto su [supabase.com](https://supabase.com).
2. Nel **SQL Editor** esegui in ordine i file in `supabase/`:
   `01-schema.sql`, `02-seed.sql`, `03-admin-api.sql`.
3. In **Authentication → Users** crea l'utente amministratore, poi autorizzalo:

   ```sql
   insert into public.admins (user_id, email)
   select id, email from auth.users where email = 'tua@email.it';
   ```

4. In **Project Settings → API** copia *Project URL* e *anon public key*
   dentro `supabase-config.js`.

> La `anon key` è pubblica per definizione: sta nel JavaScript del sito.
> A proteggere il database sono le policy RLS, non la segretezza della chiave.
> La `service_role key` non va mai messa nel repository.

## Se Supabase non risponde

Il sito continua a funzionare: `creators.js`, `panels.js` e `site-content.js`
contengono una copia dei contenuti, usata come riserva. La pagina non resta
mai bianca, al massimo mostra una versione non aggiornata.
