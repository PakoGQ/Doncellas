/* ================================================================
   DONCELLAS GDL — Supabase Config
   ----------------------------------------------------------------
   Cuando tengas tu proyecto de Supabase listo:
   1. Ve a supabase.com → tu proyecto → Settings → API
   2. Copia "Project URL"  → pégalo en SUPABASE_URL
   3. Copia "anon public"  → pégalo en SUPABASE_KEY
   4. Guarda el archivo
   ================================================================ */

const SUPABASE_URL = 'https://lhfmyfxltxhpgfgymyzo.supabase.co';
const SUPABASE_KEY = 'sb_publishable_R5iQ_m8bkQqe2eK3UiWhWw_6YFx7cIw';

/* ── No modificar lo de abajo ──────────────────────────────── */
(function () {
  const configured =
    typeof window !== 'undefined' &&
    typeof window.supabase !== 'undefined' &&
    SUPABASE_URL.startsWith('https://') &&
    SUPABASE_KEY.length > 20;

  window.sbClient = configured
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
    : null;

  if (window.sbClient) {
    console.log('%c✅ Supabase conectado', 'color:#C9A84C;font-weight:bold');
  } else {
    console.log('%c⚠️  Supabase no configurado — usando datos demo', 'color:#888');
  }
})();
