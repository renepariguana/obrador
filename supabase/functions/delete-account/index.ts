// Edge Function: borra la cuenta del usuario logueado y todos sus datos.
// Como profiles.id → auth.users(id) ON DELETE CASCADE y las demás tablas → profiles ON DELETE CASCADE,
// borrar el usuario de Auth arrastra en cascada pedidos, postulaciones, reviews, trabajador, etc.
// Deploy: supabase functions deploy delete-account
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })

  const authHeader = req.headers.get('Authorization')
  if (!authHeader) return json({ error: 'No autorizado' }, 401)

  const url = Deno.env.get('SUPABASE_URL')!
  const anon = Deno.env.get('SUPABASE_ANON_KEY')!
  const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

  // 1) identificar al usuario a partir de su JWT
  const userClient = createClient(url, anon, { global: { headers: { Authorization: authHeader } } })
  const { data: auth, error: e1 } = await userClient.auth.getUser()
  if (e1 || !auth.user) return json({ error: 'Sesión inválida' }, 401)

  // 2) borrarlo con la service role (cascada en la base)
  const admin = createClient(url, service)
  const { error: e2 } = await admin.auth.admin.deleteUser(auth.user.id)
  if (e2) return json({ error: e2.message }, 500)

  return json({ ok: true }, 200)
})

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } })
}
