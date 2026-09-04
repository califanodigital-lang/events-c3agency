-- =====================================================================
--  C3 Agency · events.c3agency.it
--  API sopra le tabelle gia presenti nel progetto Supabase:
--    creators(slug, sort_order, data jsonb, updated_at)
--    shared_panels(slug, sort_order, data jsonb, updated_at)
--    site_settings(key, data jsonb, updated_at)
--    contact_requests(...)  -- richieste dal form contatti
--  Le policy RLS erano gia definite e non sono state toccate.
-- =====================================================================

-- ---------------------------------------------------------------- admin
-- Chi puo scrivere. Il secondo fattore non e piu obbligatorio: sull'unico
-- utente non era mai stato registrato alcun fattore MFA, quindi con il
-- default originale (true) nessuno avrebbe potuto salvare niente.
-- Per riattivarlo: rimettere "default true" e registrare un TOTP.
create or replace function public.is_c3_admin(require_mfa boolean default false)
returns boolean language sql stable security definer set search_path to '' as $$
  select lower(coalesce(auth.jwt()->>'email',''))='direzione@c3agency.it'
     and (not require_mfa or coalesce(auth.jwt()->>'aal','')='aal2');
$$;

-- ------------------------------------------------------- lettura pubblica
-- Una sola chiamata restituisce tutto il sito. Creator e aree tornano come
-- array e non come oggetti: un oggetto jsonb riordina le proprie chiavi, e
-- sul sito l'ordine dei creator e delle aree geografiche conta.
create or replace function public.site_payload()
returns jsonb language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'creators', coalesce((select jsonb_agg(c.data order by c.sort_order, c.slug) from creators c), '[]'::jsonb),
    'panels',   coalesce((select jsonb_agg(p.data order by p.sort_order, p.slug) from shared_panels p), '[]'::jsonb),
    'geo', coalesce((
      select jsonb_agg(jsonb_build_object(
               'key', a.key,
               'title', a.value->>'title',
               'subtitle', a.value->>'subtitle',
               'creators', coalesce((
                  select jsonb_agg(jsonb_build_array(c.slug, t.value->>'region') order by c.sort_order, c.slug)
                  from creators c, jsonb_array_elements(coalesce(c.data->'territories','[]'::jsonb)) t
                  where t.value->>'area' = a.key), '[]'::jsonb))
             order by coalesce((a.value->>'sort_order')::int, 0))
      from jsonb_each(coalesce((select s.data from site_settings s where s.key='geo_areas'), '{}'::jsonb)) a
    ), '[]'::jsonb),
    'content',  coalesce((select s.data from site_settings s where s.key='site_content'), '{}'::jsonb),
    'settings', coalesce((select jsonb_object_agg(s.key, s.data) from site_settings s
                          where s.key not in ('site_content','geo_areas')), '{}'::jsonb),
    'generated_at', now()
  );
$$;
grant execute on function public.site_payload() to anon, authenticated;

-- ------------------------------------------------------ scrittura admin
-- Ogni funzione verifica da se chi la chiama: riscrivere il JavaScript
-- del browser non serve a niente.

create or replace function public.save_creators(payload jsonb)
returns integer language plpgsql security definer set search_path = public as $$
declare n integer;
begin
  if not public.is_c3_admin() then raise exception 'Non autorizzato' using errcode='42501'; end if;
  if jsonb_typeof(payload) <> 'array' or jsonb_array_length(payload) = 0 then
    raise exception 'Elenco creator vuoto o non valido: salvataggio annullato.';
  end if;

  delete from public.creators c
   where c.slug not in (select e.value->>'slug' from jsonb_array_elements(payload) e);

  insert into public.creators (slug, sort_order, data, updated_at)
  select e.value->>'slug', (e.ordinality-1)::int, e.value, now()
    from jsonb_array_elements(payload) with ordinality e(value, ordinality)
   where coalesce(e.value->>'slug','') <> ''
  on conflict (slug) do update
    set sort_order = excluded.sort_order, data = excluded.data, updated_at = now();

  select count(*) into n from public.creators;
  return n;
end $$;

create or replace function public.save_panels(payload jsonb)
returns integer language plpgsql security definer set search_path = public as $$
declare n integer;
begin
  if not public.is_c3_admin() then raise exception 'Non autorizzato' using errcode='42501'; end if;
  if jsonb_typeof(payload) <> 'array' then raise exception 'Elenco panel non valido.'; end if;

  delete from public.shared_panels p
   where p.slug not in (select e.value->>'slug' from jsonb_array_elements(payload) e);

  insert into public.shared_panels (slug, sort_order, data, updated_at)
  select e.value->>'slug', (e.ordinality-1)::int, e.value, now()
    from jsonb_array_elements(payload) with ordinality e(value, ordinality)
   where coalesce(e.value->>'slug','') <> ''
  on conflict (slug) do update
    set sort_order = excluded.sort_order, data = excluded.data, updated_at = now();

  select count(*) into n from public.shared_panels;
  return n;
end $$;

create or replace function public.save_site_content(payload jsonb)
returns integer language plpgsql security definer set search_path = public as $$
begin
  if not public.is_c3_admin() then raise exception 'Non autorizzato' using errcode='42501'; end if;
  if jsonb_typeof(payload) <> 'object' then raise exception 'Testi non validi.'; end if;
  insert into public.site_settings (key, data, updated_at) values ('site_content', payload, now())
  on conflict (key) do update set data = excluded.data, updated_at = now();
  return (select count(*)::int from jsonb_object_keys(payload));
end $$;

create or replace function public.save_setting(p_key text, p_value jsonb)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_c3_admin() then raise exception 'Non autorizzato' using errcode='42501'; end if;
  insert into public.site_settings (key, data, updated_at) values (p_key, p_value, now())
  on conflict (key) do update set data = excluded.data, updated_at = now();
end $$;

revoke all on function public.save_creators(jsonb)      from anon;
revoke all on function public.save_panels(jsonb)        from anon;
revoke all on function public.save_site_content(jsonb)  from anon;
revoke all on function public.save_setting(text,jsonb)  from anon;
grant execute on function public.save_creators(jsonb)     to authenticated;
grant execute on function public.save_panels(jsonb)       to authenticated;
grant execute on function public.save_site_content(jsonb) to authenticated;
grant execute on function public.save_setting(text,jsonb) to authenticated;
