-- ═══════════════════════════════════════════════════════════════
-- 0002 — Puntos por reseña
-- Cada reseña recibida suma +10 puntos al trabajador destinatario.
-- Si el destinatario todavía no tiene fila en `trabajadores`, se crea.
-- ═══════════════════════════════════════════════════════════════

create or replace function public.sumar_puntos_review()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.trabajadores (profile_id, puntos)
  values (new.destinatario_id, 10)
  on conflict (profile_id)
    do update set puntos = public.trabajadores.puntos + 10;
  return new;
end;
$$;

drop trigger if exists on_review_created on public.reviews;
create trigger on_review_created
  after insert on public.reviews
  for each row execute function public.sumar_puntos_review();
