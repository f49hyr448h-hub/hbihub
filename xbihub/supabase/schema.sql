-- XBIHUB V1.1 initial schema. Review with your security owner before production.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 email text unique not null,
 full_name text not null default '',
 role text not null default 'applicant' check (role in ('applicant','reviewer','agreement_manager','admin')),
 created_at timestamptz not null default now()
);
create table if not exists public.applications (
 id text primary key,
 user_id uuid not null references public.profiles(id),
 entity_type text not null check(entity_type in ('company','individual')),
 company_name text not null,
 applicant_name text not null,
 country_region text not null,
 city text not null default '',
 node_type text not null check(node_type in ('commercial','research','technology','community')),
 node_plan text not null,
 contact_email text not null,
 status text not null default 'submitted' check(status in ('submitted','under_review','needs_info','approved','rejected','pending_signature','signed','active','suspended','terminated')),
 review_note text,
 reviewed_by uuid references public.profiles(id),\n payment_confirmed boolean not null default false,\n training_completed boolean not null default false,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create table if not exists public.agreements (
 id uuid primary key default gen_random_uuid(),
 application_id text not null references public.applications(id),
 template_name text not null,
 template_version text not null,
 status text not null default 'draft' check(status in ('draft','pending_signature','signed','void','declined')),
 provider text,
 provider_envelope_id text,
 signed_document_path text,
 signed_at timestamptz,
 provider_verified boolean not null default false,
 created_at timestamptz not null default now()
);
create table if not exists public.resources (
 id uuid primary key default gen_random_uuid(),
 title text not null,
 category text not null default 'General',
 url text not null,
 access_level text not null default 'all_partners' check(access_level in ('all_partners','approved','active','admin')),
 is_published boolean not null default false,
 created_at timestamptz not null default now()
);
create table if not exists public.audit_logs (
 id bigint generated always as identity primary key,
 actor_id uuid references public.profiles(id),
 action text not null,
 entity_type text not null,
 entity_id text not null,
 metadata jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
alter table public.applications enable row level security;
alter table public.agreements enable row level security;
alter table public.resources enable row level security;
alter table public.audit_logs enable row level security;
-- This deployment uses server-side Netlify Functions with the service-role key, never in browser code.
-- No anon/authenticated policies are intentionally granted here. Add narrow policies only if direct client DB access is introduced.
revoke all on public.profiles,public.applications,public.agreements,public.resources,public.audit_logs from anon,authenticated;
grant usage on schema public to service_role;
grant all on public.profiles,public.applications,public.agreements,public.resources,public.audit_logs to service_role;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
 insert into public.profiles(id,email,full_name,role)
 values(new.id,lower(new.email),coalesce(new.raw_user_meta_data->>'full_name',''),'applicant')
 on conflict(id) do update set email=excluded.email,full_name=excluded.full_name;
 return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Admin role assignment must be done manually by a trusted project owner, never by public registration:
-- update public.profiles set role='admin' where email='your-controlled-admin@example.com';
