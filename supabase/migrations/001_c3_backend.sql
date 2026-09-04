create extension if not exists pgcrypto;

create table if not exists public.creators (
  slug text primary key,
  sort_order integer not null default 0,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
create table if not exists public.shared_panels (
  slug text primary key,
  sort_order integer not null default 0,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
create table if not exists public.site_settings (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  event_name text not null,
  city text not null,
  event_dates text not null,
  audience text,
  areas text,
  budget text,
  interest text,
  privacy_version text not null default '2026-09-04',
  created_at timestamptz not null default now()
);

alter table public.creators enable row level security;
alter table public.shared_panels enable row level security;
alter table public.site_settings enable row level security;
alter table public.contact_requests enable row level security;

create or replace function public.is_c3_admin(require_mfa boolean default true)
returns boolean language sql stable security definer set search_path='' as $$
  select lower(coalesce(auth.jwt()->>'email',''))='direzione@c3agency.it'
    and (not require_mfa or coalesce(auth.jwt()->>'aal','')='aal2');
$$;

drop policy if exists "public reads creators" on public.creators;
create policy "public reads creators" on public.creators for select using (true);
drop policy if exists "admin manages creators" on public.creators;
create policy "admin manages creators" on public.creators for all using (public.is_c3_admin()) with check (public.is_c3_admin());
drop policy if exists "public reads panels" on public.shared_panels;
create policy "public reads panels" on public.shared_panels for select using (true);
drop policy if exists "admin manages panels" on public.shared_panels;
create policy "admin manages panels" on public.shared_panels for all using (public.is_c3_admin()) with check (public.is_c3_admin());
drop policy if exists "public reads settings" on public.site_settings;
create policy "public reads settings" on public.site_settings for select using (true);
drop policy if exists "admin manages settings" on public.site_settings;
create policy "admin manages settings" on public.site_settings for all using (public.is_c3_admin()) with check (public.is_c3_admin());
drop policy if exists "public submits requests" on public.contact_requests;
create policy "public submits requests" on public.contact_requests for insert to anon, authenticated with check (true);
drop policy if exists "admin reads requests" on public.contact_requests;
create policy "admin reads requests" on public.contact_requests for select using (public.is_c3_admin());

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('c3-media','c3-media',true,8388608,array['image/jpeg','image/png','image/webp'])
on conflict(id) do update set public=true,file_size_limit=8388608,allowed_mime_types=array['image/jpeg','image/png','image/webp'];
drop policy if exists "public reads c3 media" on storage.objects;
create policy "public reads c3 media" on storage.objects for select using(bucket_id='c3-media');
drop policy if exists "admin uploads c3 media" on storage.objects;
create policy "admin uploads c3 media" on storage.objects for insert with check(bucket_id='c3-media' and public.is_c3_admin());
drop policy if exists "admin updates c3 media" on storage.objects;
create policy "admin updates c3 media" on storage.objects for update using(bucket_id='c3-media' and public.is_c3_admin()) with check(bucket_id='c3-media' and public.is_c3_admin());
drop policy if exists "admin deletes c3 media" on storage.objects;
create policy "admin deletes c3 media" on storage.objects for delete using(bucket_id='c3-media' and public.is_c3_admin());

create index if not exists creators_sort_idx on public.creators(sort_order);
create index if not exists shared_panels_sort_idx on public.shared_panels(sort_order);
create index if not exists contact_requests_created_idx on public.contact_requests(created_at desc);
