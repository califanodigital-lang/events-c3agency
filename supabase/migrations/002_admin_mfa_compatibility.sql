create or replace function public.is_c3_admin(require_mfa boolean default true)
returns boolean
language sql
stable
security definer
set search_path=''
as $$
  select lower(coalesce(auth.jwt()->>'email',''))='direzione@c3agency.it'
    and (
      not require_mfa
      or coalesce(auth.jwt()->>'aal','')='aal2'
      or not exists (
        select 1
        from auth.mfa_factors
        where user_id=auth.uid()
          and status='verified'
      )
    );
$$;

comment on function public.is_c3_admin(boolean) is
'Consente la gestione all’amministratore; richiede aal2 soltanto quando esiste un fattore MFA verificato.';
