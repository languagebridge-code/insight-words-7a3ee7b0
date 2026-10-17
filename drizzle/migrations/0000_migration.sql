create table public.dashboard_layouts (
  user_id uuid primary key,
  layout jsonb not null,
  filters jsonb,
  updated_at timestamptz default now()
);

grant select, insert, update, delete on public.dashboard_layouts to authenticated;
grant all on public.dashboard_layouts to service_role;

alter table public.dashboard_layouts enable row level security;

create policy "own layout" on public.dashboard_layouts
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);