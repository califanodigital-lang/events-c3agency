-- =====================================================================
--  C3 Agency · API di scrittura per l'area riservata
--  Ogni funzione verifica da sola che chi chiama sia un admin: il
--  frontend non può aggirarle, e una singola chiamata è una transazione.
-- =====================================================================

-- --------------------------------------------------------------- creator
create or replace function public.save_creators(payload jsonb)
returns integer
language plpgsql security definer set search_path = public as $$
declare n integer;
begin
  if not public.is_admin() then
    raise exception 'Non autorizzato' using errcode = '42501';
  end if;
  if jsonb_typeof(payload) <> 'array' or jsonb_array_length(payload) = 0 then
    raise exception 'Elenco creator vuoto o non valido: salvataggio annullato.';
  end if;

  delete from public.creators c
   where c.slug not in (select e.value->>'slug' from jsonb_array_elements(payload) e);

  insert into public.creators (slug,name,category,description,meta,image,activities,filters,sort_order)
  select e.value->>'slug',
         coalesce(e.value->>'name',''),
         coalesce(e.value->>'category',''),
         coalesce(e.value->>'description',''),
         coalesce(e.value->>'meta',''),
         coalesce(e.value->>'image',''),
         coalesce(e.value->'activities','[]'::jsonb),
         case when jsonb_typeof(e.value->'filters') = 'array'
              then (select array_agg(x #>> '{}') from jsonb_array_elements(e.value->'filters') x)
              else null end,
         (e.ordinality - 1)::int
    from jsonb_array_elements(payload) with ordinality e(value, ordinality)
   where coalesce(e.value->>'slug','') <> ''
  on conflict (slug) do update set
    name        = excluded.name,
    category    = excluded.category,
    description = excluded.description,
    meta        = excluded.meta,
    image       = excluded.image,
    activities  = excluded.activities,
    filters     = excluded.filters,
    sort_order  = excluded.sort_order;

  -- I territori vengono riscritti per intero a ogni salvataggio.
  delete from public.creator_territories;
  insert into public.creator_territories (creator_slug, area, region)
  select e.value->>'slug', t.value->>'area', t.value->>'region'
    from jsonb_array_elements(payload) e,
         jsonb_array_elements(coalesce(e.value->'territories','[]'::jsonb)) t
   where t.value->>'area' in ('nord','centro','sud')
     and coalesce(t.value->>'region','') <> ''
  on conflict do nothing;

  select count(*) into n from public.creators;
  return n;
end $$;

-- ----------------------------------------------------------------- panel
create or replace function public.save_panels(payload jsonb)
returns integer
language plpgsql security definer set search_path = public as $$
declare n integer;
begin
  if not public.is_admin() then
    raise exception 'Non autorizzato' using errcode = '42501';
  end if;
  if jsonb_typeof(payload) <> 'array' then
    raise exception 'Elenco panel non valido.';
  end if;

  delete from public.panels p
   where p.slug not in (select e.value->>'slug' from jsonb_array_elements(payload) e);

  insert into public.panels (slug,title,eyebrow,description,participants,duration,target,ideal,image,sort_order)
  select e.value->>'slug',
         coalesce(e.value->>'title',''),
         coalesce(e.value->>'eyebrow',''),
         coalesce(e.value->>'description',''),
         coalesce((select array_agg(x #>> '{}') from jsonb_array_elements(coalesce(e.value->'participants','[]'::jsonb)) x), '{}'),
         coalesce(e.value->>'duration',''),
         coalesce(e.value->>'target',''),
         coalesce(e.value->>'ideal',''),
         coalesce(e.value->>'image',''),
         (e.ordinality - 1)::int
    from jsonb_array_elements(payload) with ordinality e(value, ordinality)
   where coalesce(e.value->>'slug','') <> ''
  on conflict (slug) do update set
    title        = excluded.title,
    eyebrow      = excluded.eyebrow,
    description  = excluded.description,
    participants = excluded.participants,
    duration     = excluded.duration,
    target       = excluded.target,
    ideal        = excluded.ideal,
    image        = excluded.image,
    sort_order   = excluded.sort_order;

  select count(*) into n from public.panels;
  return n;
end $$;

-- ------------------------------------------------------- testi del sito
create or replace function public.save_site_content(payload jsonb)
returns integer
language plpgsql security definer set search_path = public as $$
declare n integer;
begin
  if not public.is_admin() then
    raise exception 'Non autorizzato' using errcode = '42501';
  end if;
  if jsonb_typeof(payload) <> 'object' then
    raise exception 'Testi non validi.';
  end if;

  insert into public.site_content (key, value)
  select x.key, coalesce(x.value #>> '{}', '')
    from jsonb_each(payload) x
  on conflict (key) do update set value = excluded.value;

  select count(*) into n from public.site_content;
  return n;
end $$;

-- ---------------------------------------------------------- impostazioni
create or replace function public.save_setting(p_key text, p_value jsonb)
returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then
    raise exception 'Non autorizzato' using errcode = '42501';
  end if;
  insert into public.app_settings (key, value) values (p_key, p_value)
  on conflict (key) do update set value = excluded.value;
end $$;

-- Solo utenti autenticati possono anche solo provare a chiamarle.
revoke all on function public.save_creators(jsonb)      from anon;
revoke all on function public.save_panels(jsonb)        from anon;
revoke all on function public.save_site_content(jsonb)  from anon;
revoke all on function public.save_setting(text,jsonb)  from anon;
grant execute on function public.save_creators(jsonb)     to authenticated;
grant execute on function public.save_panels(jsonb)       to authenticated;
grant execute on function public.save_site_content(jsonb) to authenticated;
grant execute on function public.save_setting(text,jsonb) to authenticated;
