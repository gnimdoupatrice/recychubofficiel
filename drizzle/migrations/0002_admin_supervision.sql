-- Supervision administrateur : lecture globale + modération, réservées au rôle 'admin'.
create or replace function public.admin_guard() returns void language plpgsql stable security definer set search_path=public as $$
begin if not public.has_role(auth.uid(),'admin') then raise exception 'Accès réservé à l''administrateur'; end if; end $$;

create or replace function public.admin_stats() returns json language plpgsql stable security definer set search_path=public as $$
begin perform public.admin_guard();
return json_build_object(
 'households',(select count(*) from user_roles where role='household'),
 'companies',(select count(*) from user_roles where role='company'),
 'decl_pending',(select count(*) from declarations where status='pending'),
 'decl_scheduled',(select count(*) from declarations where status='scheduled'),
 'decl_collected',(select count(*) from declarations where status='collected'),
 'decl_cancelled',(select count(*) from declarations where status='cancelled'),
 'tours_planned',(select count(*) from tours where status='planned'),
 'tours_done',(select count(*) from tours where status='done'),
 'kg_collected',(select coalesce(sum(collected_kg),0) from declarations where status='collected'));
end $$;

create or replace function public.admin_users() returns table(id uuid, full_name text, phone text, quartier text, role text, created_at timestamptz, decl_count bigint)
language plpgsql stable security definer set search_path=public as $$
begin perform public.admin_guard();
return query select p.id, p.full_name, p.phone, p.quartier,
 coalesce((select string_agg(r.role::text,',') from user_roles r where r.user_id=p.id),'') ,
 p.created_at, (select count(*) from declarations d where d.user_id=p.id)
 from profiles p order by p.created_at desc;
end $$;

create or replace function public.admin_declarations() returns table(id uuid, material_id text, quartier text, status text, estimated_kg numeric, collected_kg numeric, note text, created_at timestamptz, household text, phone text, company text, tour_date date)
language plpgsql stable security definer set search_path=public as $$
begin perform public.admin_guard();
return query select d.id, d.material_id::text, d.quartier, d.status, d.estimated_kg::numeric, d.collected_kg::numeric, d.note, d.created_at, p.full_name, p.phone, c.name, t.tour_date
 from declarations d left join profiles p on p.id=d.user_id left join tours t on t.id=d.tour_id left join companies c on c.id=t.company_id
 order by d.created_at desc;
end $$;

create or replace function public.admin_tours() returns table(id uuid, company text, tour_date date, zone text, status text, stops bigint, kg_estimated numeric, kg_collected numeric)
language plpgsql stable security definer set search_path=public as $$
begin perform public.admin_guard();
return query select t.id, c.name, t.tour_date, t.zone, t.status,
 count(d.id) filter (where d.status<>'cancelled'),
 coalesce(sum(d.estimated_kg) filter (where d.status<>'cancelled'),0)::numeric,
 coalesce(sum(d.collected_kg) filter (where d.status='collected'),0)::numeric
 from tours t left join companies c on c.id=t.company_id left join declarations d on d.tour_id=t.id
 group by t.id, c.name order by t.tour_date desc;
end $$;

create or replace function public.admin_cancel_declaration(_id uuid) returns void language plpgsql security definer set search_path=public as $$
begin perform public.admin_guard();
update declarations set status='cancelled', tour_id=null where id=_id and status in ('pending','scheduled'); end $$;

create or replace function public.admin_release_declaration(_id uuid) returns void language plpgsql security definer set search_path=public as $$
begin perform public.admin_guard();
update declarations set status='pending', tour_id=null where id=_id and status='scheduled'; end $$;

create or replace function public.admin_cancel_tour(_id uuid) returns void language plpgsql security definer set search_path=public as $$
begin perform public.admin_guard();
update declarations set status='pending', tour_id=null where tour_id=_id and status='scheduled';
update tours set status='cancelled' where id=_id and status='planned'; end $$;

revoke all on function public.admin_guard(), public.admin_stats(), public.admin_users(), public.admin_declarations(), public.admin_tours(), public.admin_cancel_declaration(uuid), public.admin_release_declaration(uuid), public.admin_cancel_tour(uuid) from public, anon;
grant execute on function public.admin_stats(), public.admin_users(), public.admin_declarations(), public.admin_tours(), public.admin_cancel_declaration(uuid), public.admin_release_declaration(uuid), public.admin_cancel_tour(uuid) to authenticated;

-- Pour vous nommer administrateur (remplacez le numéro) :
-- insert into user_roles(user_id, role) select id, 'admin' from profiles where phone like '%90000000' on conflict do nothing;
