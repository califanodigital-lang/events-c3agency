-- =====================================================================
--  C3 Agency · events.c3agency.it
--  Schema, sicurezza e API di lettura
--  Da eseguire una sola volta nel SQL Editor di Supabase.
-- =====================================================================

-- ---------------------------------------------------------------- utils
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

-- ---------------------------------------------------------------- admin
-- Chi può scrivere. Un utente entra qui solo con un INSERT manuale
-- (o via service_role): registrarsi su Supabase non basta.
create table if not exists public.admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  email      text,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public, auth as $$
  select exists (select 1 from public.admins a where a.user_id = auth.uid());
$$;

-- ------------------------------------------------------------- contenuti
create table if not exists public.creators (
  slug        text primary key,
  name        text not null,
  category    text not null default '',
  description text not null default '',
  meta        text not null default '',
  image       text not null default '',
  activities  jsonb not null default '[]'::jsonb,
  filters     text[],
  sort_order  integer not null default 0,
  published   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.geo_areas (
  key        text primary key check (key in ('nord','centro','sud')),
  title      text not null,
  subtitle   text not null default '',
  sort_order integer not null default 0
);

create table if not exists public.creator_territories (
  creator_slug text not null references public.creators(slug) on delete cascade,
  area         text not null references public.geo_areas(key) on delete cascade,
  region       text not null,
  primary key (creator_slug, area, region)
);
create index if not exists creator_territories_area_idx on public.creator_territories(area);

create table if not exists public.panels (
  slug         text primary key,
  title        text not null,
  eyebrow      text not null default '',
  description  text not null default '',
  participants text[] not null default '{}',
  duration     text not null default '',
  target       text not null default '',
  ideal        text not null default '',
  image        text not null default '',
  sort_order   integer not null default 0,
  published    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table if not exists public.site_content (
  key        text primary key,
  value      text not null default '',
  updated_at timestamptz not null default now()
);

-- Impostazioni sparse (es. macrocategorie delle attività)
create table if not exists public.app_settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

drop trigger if exists creators_touch     on public.creators;
drop trigger if exists panels_touch       on public.panels;
drop trigger if exists site_content_touch on public.site_content;
drop trigger if exists app_settings_touch on public.app_settings;
create trigger creators_touch     before update on public.creators     for each row execute function public.touch_updated_at();
create trigger panels_touch       before update on public.panels       for each row execute function public.touch_updated_at();
create trigger site_content_touch before update on public.site_content for each row execute function public.touch_updated_at();
create trigger app_settings_touch before update on public.app_settings for each row execute function public.touch_updated_at();

-- --------------------------------------------------------------- sicurezza
alter table public.admins              enable row level security;
alter table public.creators            enable row level security;
alter table public.geo_areas           enable row level security;
alter table public.creator_territories enable row level security;
alter table public.panels              enable row level security;
alter table public.site_content        enable row level security;
alter table public.app_settings        enable row level security;

-- Lettura pubblica: chiunque (anon key) legge i contenuti pubblicati.
drop policy if exists "read pubblico" on public.creators;
create policy "read pubblico" on public.creators
  for select to anon, authenticated using (published or public.is_admin());

drop policy if exists "read pubblico" on public.panels;
create policy "read pubblico" on public.panels
  for select to anon, authenticated using (published or public.is_admin());

drop policy if exists "read pubblico" on public.geo_areas;
create policy "read pubblico" on public.geo_areas
  for select to anon, authenticated using (true);

drop policy if exists "read pubblico" on public.creator_territories;
create policy "read pubblico" on public.creator_territories
  for select to anon, authenticated using (true);

drop policy if exists "read pubblico" on public.site_content;
create policy "read pubblico" on public.site_content
  for select to anon, authenticated using (true);

drop policy if exists "read pubblico" on public.app_settings;
create policy "read pubblico" on public.app_settings
  for select to anon, authenticated using (true);

-- Scrittura: solo utenti presenti in public.admins.
do $$
declare t text;
begin
  foreach t in array array['creators','geo_areas','creator_territories','panels','site_content','app_settings']
  loop
    execute format('drop policy if exists "scrittura admin" on public.%I', t);
    execute format(
      'create policy "scrittura admin" on public.%I for all to authenticated
         using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- La tabella admins si legge solo da se stessi, e non si scrive dal client.
drop policy if exists "vedo me stesso" on public.admins;
create policy "vedo me stesso" on public.admins
  for select to authenticated using (user_id = auth.uid());

-- ------------------------------------------------------- API di lettura
-- Una sola chiamata restituisce tutto quello che serve al sito pubblico,
-- già nella forma che il frontend si aspetta.
create or replace function public.site_payload()
returns jsonb
language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'creators', coalesce((
      select jsonb_object_agg(c.slug, jsonb_build_object(
        'slug', c.slug, 'name', c.name, 'category', c.category,
        'description', c.description, 'meta', c.meta, 'image', c.image,
        'activities', c.activities, 'filters', c.filters,
        'territories', coalesce((
          select jsonb_agg(jsonb_build_object('area', t.area, 'region', t.region) order by t.area, t.region)
          from creator_territories t where t.creator_slug = c.slug), '[]'::jsonb)
      ) order by c.sort_order, c.name)
      from creators c where c.published or is_admin()), '{}'::jsonb),

    'geo', coalesce((
      select jsonb_object_agg(g.key, jsonb_build_object(
        'title', g.title, 'subtitle', g.subtitle,
        'creators', coalesce((
          select jsonb_agg(jsonb_build_array(t.creator_slug, t.region) order by c2.sort_order, c2.name)
          from creator_territories t
          join creators c2 on c2.slug = t.creator_slug and (c2.published or is_admin())
          where t.area = g.key), '[]'::jsonb)
      ))
      from geo_areas g), '{}'::jsonb),

    'panels', coalesce((
      select jsonb_agg(jsonb_build_object(
        'slug', p.slug, 'title', p.title, 'eyebrow', p.eyebrow,
        'description', p.description, 'participants', p.participants,
        'duration', p.duration, 'target', p.target, 'ideal', p.ideal, 'image', p.image
      ) order by p.sort_order, p.title)
      from panels p where p.published or is_admin()), '[]'::jsonb),

    'content', coalesce((select jsonb_object_agg(s.key, s.value) from site_content s), '{}'::jsonb),

    'settings', coalesce((select jsonb_object_agg(a.key, a.value) from app_settings a), '{}'::jsonb),

    'generated_at', now()
  );
$$;

grant execute on function public.site_payload() to anon, authenticated;
