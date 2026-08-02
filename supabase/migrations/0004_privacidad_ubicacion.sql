-- 0004_privacidad_ubicacion.sql
-- PRIVACIDAD: la ubicación de un pedido se guarda SIEMPRE aproximada (~100 m, "nivel manzana"),
-- nunca la dirección exacta del cliente.
--
-- Antes: publicarPedido guardaba lat/lng EXACTOS y la app solo los redondeaba al mostrar
-- (cosmético). Cualquiera con la anon key podía leer la casa real del cliente vía la API.
-- Ahora: se redondea en el cliente Y en la base (este trigger), así la coordenada exacta
-- nunca llega a existir en la DB, pase lo que pase desde cualquier versión de la app.

-- 1) Redondear (a la grilla de ~100 m) los pedidos que ya estaban cargados con coords exactas.
update public.pedidos
set lat = round(lat / 0.001) * 0.001,
    lng = round(lng / 0.001) * 0.001
where lat is not null or lng is not null;

-- 2) Trigger: forzar el redondeo en cada insert/update de pedidos.
create or replace function public.redondear_ubicacion_pedido()
returns trigger
language plpgsql
as $$
begin
  if new.lat is not null then new.lat := round(new.lat / 0.001) * 0.001; end if;
  if new.lng is not null then new.lng := round(new.lng / 0.001) * 0.001; end if;
  return new;
end;
$$;

drop trigger if exists trg_redondear_ubicacion_pedido on public.pedidos;
create trigger trg_redondear_ubicacion_pedido
  before insert or update on public.pedidos
  for each row execute function public.redondear_ubicacion_pedido();
