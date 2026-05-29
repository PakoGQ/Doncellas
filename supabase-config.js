/* ================================================================
   DONCELLAS GDL — Supabase Config
   ----------------------------------------------------------------
   Cuando tengas tu proyecto de Supabase listo:
   1. Ve a supabase.com → tu proyecto → Settings → API
   2. Copia "Project URL"  → pégalo en SUPABASE_URL
   3. Copia "anon public"  → pégalo en SUPABASE_KEY
   4. Guarda el archivo
   ================================================================ */

const SUPABASE_URL = 'REEMPLAZA_CON_TU_URL';
const SUPABASE_KEY = 'REEMPLAZA_CON_TU_ANON_KEY';

/* ── No modificar lo de abajo ──────────────────────────────── */
(function () {
  const configured =
    typeof window !== 'undefined' &&
    typeof window.supabase !== 'undefined' &&
    SUPABASE_URL !== 'REEMPLAZA_CON_TU_URL' &&
    SUPABASE_KEY !== 'REEMPLAZA_CON_TU_ANON_KEY';

  window.sbClient = configured
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
    : null;

  if (window.sbClient) {
    console.log('%c✅ Supabase conectado', 'color:#C9A84C;font-weight:bold');
  } else {
    console.log('%c⚠️  Supabase no configurado — usando datos demo', 'color:#888');
  }
})();
