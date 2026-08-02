# Obrador — Etapa 3: Moderación

> Ejecución inline con checkpoints (superpowers:executing-plans). Pasos con checkbox.

**Goal:** Cumplir los requisitos de moderación de App Store / Google Play: reportar contenido, bloquear usuarios, y páginas legales (Privacidad + Términos) con URL pública.

**Arquitectura:** Backend ya listo (`reportes`, `bloqueos` en `0001_marketplace.sql` con RLS). Se agregan APIs + UI. Legales como páginas estáticas en GitHub Pages (después → obrador.com.ar).

## Global Constraints
- **Paleta:** SOLO amarillo (`t.primary`) + negro/grises. Nada de azul/verde/rojo. (ver [[feedback-obrador-paleta]])
- Español rioplatense. Gate en acciones que requieren sesión.
- Reportar: solo guardar en DB + aviso (sin mail por ahora).
- Metro en CI (watcher off): reiniciar con `--clear` para cada cambio.

---

### Task 1: Reportar

**Files:**
- Create: `apps/mobile/src/data/reportesApi.ts`
- Create: `apps/mobile/src/components/ReportarSheet.tsx`
- Modify: `apps/mobile/src/screens/ProfesionalScreen.tsx`, `apps/mobile/src/screens/DetallePedidoScreen.tsx`

**Interfaces:**
- Produces: `reportar(tipo: 'usuario'|'pedido'|'review', targetId: string, motivo: string)`.

- [ ] `reportesApi.reportar` — insert en `reportes` (reporter_id = auth.uid). Con gate.
- [ ] `ReportarSheet` — modal con motivos (Spam / Contenido inapropiado / Estafa / Otro) → `reportar`.
- [ ] Botón ⚑ en `ProfesionalScreen` (reporta usuario) y `DetallePedidoScreen` (reporta pedido).
- [ ] Probar: reportar guarda fila en `reportes` + "Gracias, lo revisamos".

### Task 2: Bloquear

**Files:**
- Create: `apps/mobile/src/data/bloqueosApi.ts`
- Create: `apps/mobile/src/screens/BloqueadosScreen.tsx`
- Modify: `apps/mobile/src/data/pedidosApi.ts` (filtrar), `apps/mobile/src/data/trabajadoresApi.ts` (filtrar),
  `ProfesionalScreen.tsx`, `DetallePedidoScreen.tsx`, `MiPerfilScreen.tsx`, `App.tsx` (registrar pantalla)

**Interfaces:**
- Produces: `bloquear(userId)`, `desbloquear(userId)`, `listarBloqueados()`, `idsBloqueados(): Promise<string[]>`.

- [ ] `bloqueosApi` — bloquear/desbloquear (insert/delete en `bloqueos`), listarBloqueados (con nombre), idsBloqueados.
- [ ] `pedidosAbiertos` y `listarTrabajadores` excluyen los ids bloqueados.
- [ ] Botón "Bloquear" en `ProfesionalScreen` y `DetallePedidoScreen` (con confirm).
- [ ] `BloqueadosScreen` + fila "Usuarios bloqueados" en `MiPerfil` → desbloquear.
- [ ] Probar: bloqueo un usuario → no veo sus pedidos/perfil; lo desbloqueo desde Mi perfil.

### Task 3: Legales (Privacidad + Términos)

**Files:**
- Create: `Obrador/legal/index.html`, `privacidad.html`, `terminos.html` (GitHub Pages)
- Modify: `apps/mobile/src/screens/MiPerfilScreen.tsx` (links)

- [ ] Páginas estáticas (español, a medida de Obrador, paleta amarillo/negro): qué datos se recogen
  (email, nombre, teléfono, zona), Supabase, sin pagos, cómo borrar cuenta, contacto estudiologarquitectura@gmail.com.
- [ ] Links "Términos y condiciones" y "Política de privacidad" en `MiPerfil` → `Linking.openURL`.
- [ ] René: crear repo GitHub + activar Pages; pegar la URL final en la app.
