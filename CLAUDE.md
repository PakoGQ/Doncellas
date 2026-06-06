# CLAUDE.md — Proyecto Doncellas
> Estado real del proyecto al 1 de junio de 2026. Actualizado leyendo todos los archivos.

---

## ⚡ ACTUALIZACIONES — 5 junio 2026 (LEER PRIMERO; sustituye descripciones viejas de abajo)

> Registro detallado en memoria: `sesion-2026-06-05-cambios.md`. Resumen de cambios que
> superan lo que digan las secciones 5–6 más abajo:

- **ZONAS ELIMINADAS de todo lo público** — decisión: todas las escorts cubren la ZMG, no se segmentan por zona. Se quitó el city-bar, los filtros de zona (index/modelos), la sección de zonas (categorias) y la zona del perfil. **Las cards ahora muestran EDAD en vez de zona.** Zona queda solo como metadata interna en Supabase.
- **HERO rediseñado a 6 slides**: Marca (stats HONESTOS dinámicos: 100% Verificadas · 24/7 · N Disponibles hoy) · 2 Ofertas (simulan promos rotando — flag `HERO_SIMULATE_PROMOS`) · Telegram · **WhatsApp (nuevo)** · **Agenda tu cita (nuevo)**. Slide de **Pagos ELIMINADO** (hasta definir con escorts). Promos reescritas a 6 realistas (30 min gratis, Mañanero, 1ª cita −20%, 3x2, Cliente frecuente, Noche completa).
- **Números falsos → dinámicos**: stats-bar index, contador y KPI "Doncellas activas" del panel-admin (ya no "240").
- **10 enlaces de Telegram corregidos**: `t.me/doncellas` (roto) → `t.me/DoncellasGDLbot` (bot). El canal es `t.me/DoncellasGDL`.
- **Posicionamiento**: marca en CALIDAD (escala), NUNCA en escasez/exclusividad — Paco va a crecer gradualmente (ver `estrategia-numero-escorts.md`).
- **Arranque**: ~12-15 escorts activas + lista de espera escalonada (no "10").
- **BLOQUEADO hasta hablar con escorts**: promociones y métodos de pago.
- **Pendientes vivos**: reemplazar número WhatsApp placeholder `523312345678`; quitar cuentas demo del login antes de abrir al público; poner `HERO_SIMULATE_PROMOS=false` con clientes reales; crear Canal de WhatsApp.

---

## 1. IDENTIDAD DEL PROYECTO

| Campo | Detalle |
|-------|---------|
| **Nombre** | Doncellas GDL |
| **Giro** | Plataforma de escorts en Guadalajara, México |
| **Nombre para las chicas** | "Las Doncellas" |
| **Tagline** | "La Elegancia del Placer" |
| **Ciudad inicial** | Guadalajara, Jalisco, México |
| **Expansión futura** | CDMX, Monterrey, Cancún |
| **Dominio activo** | doncellas.mx (con HTTPS via Cloudflare) |
| **Dominio alterno** | doncellas.com.mx → redirect a doncellas.mx (propagando) |
| **URL GitHub Pages** | https://pakogq.github.io/Doncellas/ |
| **Color principal** | Negro `#0A0A0A` |
| **Color acento** | Dorado `#C9A84C` |
| **Carpeta del proyecto** | `~/doncellas` en Mac |
| **Repositorio GitHub** | https://github.com/pakogq/Doncellas |

---

## 2. CONTEXTO DEL USUARIO

- **Nombre:** Francisco (Paco) Gaitan Quintero
- **Ubicación:** Guadalajara, México (doble nacionalidad mexicana-americana, nacido en Los Ángeles CA)
- **Correo:** francisco.gaitanq@gmail.com
- **Situación:** Plataforma lista para beta — en proceso de incorporar primeras escorts reales
- **Otro negocio:** Empresa de agentes IA para PyMEs en USA (contadores, abogados migratorios, logística México-USA)

---

## 3. STACK TECNOLÓGICO

| Capa | Tecnología | Estado |
|------|-----------|--------|
| Frontend | HTML + CSS + JS vanilla | ✅ Construido |
| Hosting | GitHub Pages | ✅ Activo |
| Dominio | doncellas.mx | ✅ Activo con HTTPS |
| CDN/DNS | Cloudflare | ✅ Configurado |
| Base de datos | Supabase | ✅ Conectado |
| PWA | manifest.json + sw.js | ✅ Funcional |
| Agente IA | GPT-4o mini + Make.com + Telegram + WhatsApp Business | ⏳ Pendiente (Mes 2) |
| Hosting futuro | Vercel | ⏳ Pendiente migrar |

### Supabase
- **URL:** `https://lhfmyfxltxhpgfgymyzo.supabase.co`
- **Key (anon):** `sb_publishable_R5iQ_m8bkQqe2eK3UiWhWw_6YFx7cIw`
- **Configurado en:** `supabase-config.js` — expone `window.sbClient`
- **Tablas activas:** escorts, fotos, servicios, disponibilidad, citas, resenas, resenas_clientes, usuarios
- **5 escorts demo cargadas:** Valentina, Camila, Isabella, Sofía, Renata

---

## 4. ARCHIVOS DEL PROYECTO

```
~/doncellas/
├── index.html           ← Página principal
├── modelos.html         ← Directorio completo de escorts
├── categorias.html      ← Categorías y zonas
├── perfil.html          ← Perfil individual de escort
├── panel-admin.html     ← Panel de administrador
├── panel-modelo.html    ← Panel de escort
├── membresias.html      ← Página de afiliación (NO precios — lead gen)
├── legal.html           ← Aviso legal / términos integrados
├── terminos.html        ← Términos de uso
├── privacidad.html      ← Política de privacidad
├── cookies.html         ← Política de cookies
├── offline.html         ← Página offline PWA
├── styles.css           ← Todos los estilos
├── app.js               ← Lógica JS principal (login, modelos, galería, admin)
├── supabase-config.js   ← Conexión a Supabase (window.sbClient)
├── schema.sql           ← Esquema de base de datos
├── manifest.json        ← PWA manifest
├── sw.js                ← Service Worker PWA
├── logo.png             ← Logo Doncellas (PNG)
├── doncellas-logo.svg   ← Logo en SVG
├── watermark.png        ← Marca de agua para galería de fotos
├── CNAME                ← doncellas.mx (GitHub Pages custom domain)
├── sitemap.xml          ← SEO sitemap
├── robots.txt           ← SEO robots
├── agente/              ← Carpeta para el agente IA (pendiente de construir)
└── assets/              ← Iconos PWA y otros assets
```

**Credenciales de acceso (hardcodeadas en app.js + Supabase):**
- Admin: `admin` / `admin123` → panel-admin.html
- Escort demo 1: `valentina` / `modelo123` → panel-modelo.html
- Escort demo 2: `camila` / `modelo123` → panel-modelo.html
- Escort demo 3: `isabella` / `modelo123` → panel-modelo.html
- Escorts reales: login via tabla `usuarios` en Supabase

---

## 5. FUNCIONES CONSTRUIDAS

### index.html — Página principal
- **Navbar:** Logo + "Doncellas" + tagline centrado + links (Inicio/Doncellas/Categorías/Legal) + botón "Iniciar Sesión" a la derecha. Mobile: solo logo, tagline cursiva dorada, hamburger que abre drawer.
- **Mobile Drawer:** Slide-in lateral con links completos (incluye Afiliación)
- **Hero dinámico:** Slides generadas por JS desde escorts con promo. Sin slides estáticos.
- **City bar (mobile):** Chips de zonas de GDL (Toda GDL / Zona Rosa / Providencia / Chapultepec / Tlaquepaque / Zapopan / Andares)
- **Search bar:** Buscador expandible en mobile (icono lupa) con filtros zona + categoría (2 grupos: principales + más filtros). Botón "Buscar".
- **Stats bar:** Doncellas activas (cuenta de Supabase) · Perfiles verificados · 100% discreto · Atención 24h
- **Galería "Nuestras Doncellas":** Sección `#doncellaGallery` construida por JS con tarjetas animadas (crossfade Ken Burns). Link "Ver todas".
- **Cómo funciona:** 3 pasos (Explora / Agenda por Telegram / Disfruta). CTA → @DoncellasGDLbot
- **CTA Banner:** "¿Quieres ser una de nuestras Doncellas?" → WhatsApp
- **¿Por qué elegirnos?:** 4 cards (Verificados / Disponibilidad Real / Total Discreción / Reseñas Reales)
- **FAQ:** 6 preguntas con `<details>` accordion nativo
- **Footer:** 4 columnas (brand + social / Plataforma / Para Doncellas / Legal)
- **Botones flotantes:** Telegram (@DoncellasGDLbot) + WhatsApp
- **Bottom nav (mobile):** Inicio / Doncellas / Categorías / Cuenta (abre loginModal)
- **Login modal:** Username + password, cuentas demo precargables
- **PWA install banner:** Se muestra en mobile si no está instalada
- **Modo discreto:** `(display-mode: standalone)` detectado

### modelos.html — Directorio de Doncellas
- **Page header:** Título + contador de resultados (`#resultsCount`) + toggle grid/lista + select orden (Destacadas/Nuevas/Mejor calificadas/Precio ↑↓)
- **Search bar:** Input con lupa + botón limpiar
- **Filters bar:** Zona · Categoría · Tarifa (rangos MXN) · Disponibilidad (toggle Todas/Disponible/No Disponible) · Rating · botón Limpiar
- **Active filter pills:** Muestra filtros activos como chips removibles
- **Grid `#modelosGrid`:** Construido por JS. Carga desde Supabase si disponible, si no genera 10 modelos demo con RNG determinista.
- **Quick View Modal:** Preview de perfil sin salir de la página
- **Login modal:** Mismo que en todas las páginas

### categorias.html — Categorías
- **Search dropdown:** Input con resultados live (`#catSearchDrop`)
- **Feature grid CSS:** `.cat-feature-grid` — primera card ocupa 2 columnas + 2 filas (520px), resto 240px. Responsive a 2 col y 1 col en mobile.
- **`#catFeatureGrid`:** Cards grandes para categorías principales (con imagen, overlay, count)
- **`#allCatsGrid`:** Grid de todas las especialidades
- **`#zonesGrid`:** Cards de zonas con icono + flecha hover
- **`#popularTags`:** Tags populares en chips

### perfil.html — Perfil individual
- **Carrusel hero:** Track deslizable con 5 fotos demo, blur bg dinámico, overlay, botones prev/next, contador "1 / 5"
- **Barra de info:** Pills (Disponible / Verificada / Top 10), nombre, meta (zona/edad/altura/stars), botones acción
- **Botones mobile:** `.botones-perfil-mobile` — Guardar / Compartir / WhatsApp / Telegram
- **Layout 2 columnas:** Columna izquierda (contenido) + columna derecha sticky (sidebar)
- **Sobre mí + tags**
- **Galería:** Vista principal (4/3) con flechas nav + columna de thumbnails + botón pantalla completa. Funciones `navigateMedia()`, `openFullscreen()`, `playMainVideo()`
- **Servicios | Características:** Side by side en grid 1fr 1fr. Características: grid `.caract-grid`
- **Reseñas:** Rating numérico + barras de distribución (68%/22%/7%/3%) + lista construida por JS + "Cargar más"
- **Sidebar:** Card de tarifas (1h/$2,500 · 3h/$6,500 · Día/$18,000) + promo box (oculto por defecto) + métodos de pago · Calendario colapsable · Contacto rápido · Perfiles similares
- **Calendario colapsable:** `.calendar-wrap` con header mes, grid días, leyenda (Verde=disponible/Dorado=hoy/Gris=no disponible)
- **Fullscreen viewer:** `#fullscreenViewer` — overlay 97% negro con nav, contador, soporte imagen+video
- **Gallery Modal:** Grid auto-fill minmax(180px)

### panel-admin.html — Panel Administrador
- **Login:** admin/admin123
- **Sidebar fijo:** Dashboard · Doncellas · Contenido · Citas · Reseñas (badge 7) | Ingresos · Membresías · Pagos | Configuración · Moderación
- **Mobile bottom nav:** Dashboard / Escorts / Reseñas / Ingresos
- **Dashboard:** 6 KPIs (Ingresos mes/Citas/Activas/Miembros VIP/Rating/Reseñas pendientes) + 4 gráficas Chart.js (Ingresos mensuales con tabs 7D/30D/90D/1A, Distribución pie, Citas por día, Nuevas membresías) + tabla Actividad Reciente
- **Doncellas (Gestión):** Tabla con columnas (Doncella/Zona/Categoría/Plan/Citas mes/Ingresos/Estado/Acciones) + filtros + paginación. Botón "Agregar Doncella".
- **Modal "Agregar Doncella":** Nombre artístico → auto-genera username. Campos: nombre/edad/zona/categoría/plan (default Elite)/tarifa/teléfono/descripción + sección credenciales con generador de contraseña. Botón "Crear cuenta y guardar".
- **Contenido:** Grid de modelos por foto, buscador
- **Citas:** Calendario mes con grid 7 columnas + panel "Citas de hoy"
- **Reseñas:** Tabs Pendientes (7) / Aprobadas / Rechazadas — moderación antes de publicar
- **Ingresos:** 4 KPIs (semana/mes/año/comisión 20%) + gráfica + tabla transacciones con Export CSV
- **Membresías:** KPIs por plan (Elite 234 / Gold 415 / Silver 243) + cancelaciones
- **Pagos:** Tabla historial completo
- **Configuración:** Nombre plataforma + comisión % + ciudad + toggles notificaciones
- **Moderación:** Contenido reportado

### panel-modelo.html — Panel Escort
- **Login:** isabella/modelo123 (o cualquier escort de Supabase)
- **Navbar:** Toggle Disponible/No Disponible (verde, naranja si en cita, rojo) + nombre + avatar
- **Mobile sticky bar:** `.mobile-avail-bar` — toggle disponibilidad fijo en mobile
- **Lógica de cita activa:** Si hay cita en curso → toggle bloqueado "En cita hasta HH:MM", se restaura al terminar (polling cada 30s)
- **Sidebar:** Mini perfil + progreso (72% completo) + nav: Estadísticas / Mi Contenido / Mis Citas / Disponibilidad / Editar Perfil / Configuración + links "Ver mi perfil" y "Mejorar plan"
- **Mobile bottom nav (5 items):** Inicio / Contenido / Citas / Calendario / Perfil
- **Estadísticas:** 6 KPIs (Ingresos/Citas/Rating/Visitas/Favoritos/Reseñas nuevas) + 4 gráficas (Ingresos semanal con tabs, Fuentes de contacto pie, Visitas al perfil, Satisfacción del cliente con barras de progreso)
- **Mi Contenido:** Dos pestañas:
  - **📸 Perfil** — fotos/videos de alta calidad para galería en doncellas.mx
  - **🎬 Redes** — contenido casual (outfits, selfies, día a día) que el agente usa para publicar en canales. Banner informativo del agente + estado vacío si no hay fotos. Mínimo recomendado: 10 fotos para evitar repetición.
- **Mis Citas:** Tabs Próximas (badge 3) / Historial / Por confirmar + items tipo `.cita-item` con fecha visual + estado
- **Disponibilidad:** Toggle global "Disponible ahora" + week-grid (7 días × horas, click para activar/desactivar) + bloqueo de fechas específicas con chips removibles
- **Editar Perfil:** Foto con preview + Información básica (nombre artístico read-only 🔒, descripción, edad, altura, zona) + Medidas (busto/cintura/cadera/ojos/cabello/piel) + Servicios (tabla Sí/Extra con 8 servicios) + Tarifas (1h/3h/día completo) + WhatsApp/Telegram
- **Configuración:** Credenciales read-only (solo admin puede cambiar) + toggles notificaciones
- **Modal Reseña de Cliente:** Sistema privado solo entre escorts y admin. Tipos: Buen cliente / Neutral / Cuidado. Tags predefinidos para cada tipo. Notas opcionales. Se guarda en tabla `resenas_clientes` en Supabase. Función `loadClientBadge()` muestra historial del cliente en las citas.

### membresias.html — Afiliación (no es de precios)
- **Hero:** "¿Quieres ser una Doncella?" + banner invitación selecta
- **Formulario lead-gen:** Nombre artístico + WhatsApp + Ciudad + Bio (opcional) + checkbox mayor de 18. Submit → estado de éxito (simulado, 1.4s). Alternativa WhatsApp directo.
- **Trust badges:** Discreción total / Datos protegidos / Sin costo inicial
- **Proceso en 4 pasos**
- **Beneficios:** 6 items (Perfil publicado / Galería / Calendario / Estadísticas / Privacidad / Soporte)
- **FAQ de afiliación:** 6 preguntas (accordion JS) — sin `<details>`, usa clases open/close
- **NOTA:** Los precios de membresías (Silver $1,500 / Gold $2,000 / Elite $2,500) solo aparecen en panel-admin.html sección Membresías. En beta todas las escorts son Elite GRATIS.

---

## 6. LÓGICA DE APP.JS (puntos clave)

### Login (`doLogin`)
1. Busca en USERS hardcodeados (admin, valentina, camila, isabella)
2. Si no encuentra → consulta tabla `usuarios` en Supabase con join a `escorts`
3. Guarda en `sessionStorage`: `userRole`, `userNombre`, `escortId`
4. Redirige a panel correspondiente

### Generación de modelos demo (`generateModels`)
- Genera **10 modelos** con RNG determinista (seed por índice)
- Campos: id, name, age, height, zone, cat, tags, rate, rating, reviews, citas, available, featured, isNew, img, photos (3), hasVideo, hairColor, eyeColor, skinColor, waist, hips, bust, nationality, services (8 tipos Sí/Extra), promo
- 25 modelos de los 10 tienen promo (índices múltiples de 4)

### Pool de promos (8 plantillas)
- 4 sobre precio hora: 2x1 · 30% off · 3x2 · 40% off
- 4 con servicio gratis: Oral natural · Trato de novios · Oral terminado · Relaciones ilimitadas

### Mapeo Supabase → modelo (`mapEscortToModel`)
- Convierte registro de tabla `escorts` (con joins fotos, servicios) al formato de MODELS
- Fallback a foto Unsplash si la escort no tiene fotos cargadas

### Watermark
- `watermark.png` se aplica como overlay en galería de fotos (`.wm-overlay` con CSS background)

---

## 7. DECISIONES DE DISEÑO TOMADAS

- **Alta de escorts:** Solo Paco las da de alta desde panel-admin → "Agregar Doncella" → genera credenciales → les manda por WhatsApp
- **Las escorts editan** su contenido, descripción, medidas, servicios, tarifas, disponibilidad — pero NO nombre artístico ni credenciales
- **WhatsApp directo** (wa.me) en lugar de chat interno — contacto va al número central
- **Telegram bot:** @DoncellasGDLbot (typo provisional — corregir a @DoncellasGDLbot al crear bot nuevo con GPT-4o mini)
- **Número WhatsApp placeholder:** +52 33 1234 5678 (cambiar cuando haya número Business real)
- **Membresías en beta:** Todas Elite GRATIS (primeras 15-20 escorts). Precios: Silver $1,500 / Gold $2,000 / Elite $2,500 MXN/mes. Rediseñar membresias.html con precios cuando haya feedback.
- **Reseñas de clientes:** Sistema privado entre escorts — ayuda a identificar clientes problemáticos antes de aceptar citas. Solo visible en panel-modelo y admin.
- **Moderación de reseñas públicas:** Admin aprueba antes de publicar en perfil
- **Programa de referidos:** Eliminado completamente
- **Estados de escort (Oculta vs Suspendida):** Dos botones en la tabla del panel-admin (Gestión de Doncellas):
  - **Ocultar** (ojo): la quita SOLO de la página pública. El agente sigue publicando y se pueden agendar citas. Para escorts que por privacidad no quieren salir en la web pero sí quieren todo lo demás.
  - **Suspender** (🚫): la quita de la página + el agente NO publica + NO se agendan citas. Para vacaciones o falta de pago. Registra rango de fechas (desde/hasta) en la sección **"Doncellas suspendidas"** del dashboard, con días calculados para saber qué cobrar de membresía.
  - Ambos estados persisten en **localStorage** (clave `doncellas_escort_estados`, por id de escort), compartido por origen → admin marca / sitio público lee. **PENDIENTE: migrar a Supabase** (columnas `hidden`, `suspended`, `suspended_from` + tabla de historial de suspensiones) cuando se conecte el resto del admin. El agente IA (Mes 2) debe consultar `suspended` antes de publicar/agendar.

### Navbar
- **Desktop:** Logo + Doncellas · tagline centrado · links (Inicio/Doncellas/Categorías/Legal) + "Iniciar Sesión" dorado
- **Mobile:** Logo + "Doncellas" izquierda · tagline dorada cursiva derecha · ícono hamburger → drawer

### Categorías principales (en filtros y dropdowns)
VIP · Universitaria · GFE — Novia por un día · Venezolana · A domicilio · Petite · Eventos y cenas · Nuevas

### Categorías extendidas (filtro modelos.html)
Milf · Nalgona · Voluptuosa · Chichona · Extranjera · Jovencita · Fit · Natural · Tuneada · Chaparrita · Alta

---

## 8. OPTIMIZACIÓN MÓVIL

- `class="page-mobile-min-nav"` en `<body>` → aplica estilos mobile a las páginas públicas
- `class="panel-page panel-admin"` / `"panel-page panel-modelo"` → paneles sin bottom nav público
- City bar con chips de zonas solo en mobile (homepage)
- Search bar expandible en mobile (toggle con ícono lupa)
- Grid de escorts 2 columnas en mobile
- Botones de acción del perfil: `.botones-perfil-mobile` debajo del carrusel
- Bottom nav fija (4 items en páginas públicas, 5 items en panel-modelo)
- Paneles: sidebar → oculta en mobile, bottom nav de panel toma el control

---

## 9. SEO TÉCNICO (ya implementado)

- Meta tags completos en todas las páginas
- Open Graph para compartir en redes
- Structured data (JSON-LD LocalBusiness) en index.html
- `sitemap.xml` y `robots.txt` activos
- Links canónicos apuntando a doncellas.mx
- **Pendiente:** Registrar en Google Search Console cuando haya perfiles reales

---

## 10. AGENTE DE MARKETING IA — PENDIENTE (Mes 2)

### Personalidad y tono del agente

**Identidad:**
- Se presenta como: Doncellas GDL (sin nombre propio)
- Si preguntan si es bot → responde con gracia: "Soy el asistente de Doncellas GDL 😊 pero aquí estoy para lo que necesites 🌹"
- Nunca menciona tecnología (Make.com, GPT, bots, automatización)

**Tono:**
- Cálido y cercano — nunca frío ni robótico
- Con clase — nunca vulgar aunque el tema lo sea
- Discreto — nunca dice más de lo necesario
- Natural — lenguaje fluido, no frases de call center

**Tratamiento:**
- Se adapta al cliente: si tutea → tutea, si habla de usted → usted

**Esperas:**
- Solo manda mensaje amable y espera: "Con mucho gusto, un momento por favor 🙏"
- Solo rompe el silencio si el cliente pregunta, comenta, o pasan los 20 min

**Lo que NUNCA hace:**
- Frases de call center
- Respuestas largas cuando una corta basta
- Más de 2 emojis por mensaje
- Presionar al cliente para agendar
- Revelar que es automatizado

### Base de conocimiento del agente

**Tarifas:**
- Puede informar tarifa, qué incluye y qué tiene cargo extra — solo si el cliente pregunta
- Siempre sugiere ver el perfil para detalle completo

**Discreción:**
- Al cliente solo se le dice: "Tu información es completamente confidencial 🔒"
- Nunca se menciona que se guarda su número o usuario
- Internamente registra: número/usuario, clasificación (nuevo/frecuente/esporádico), reseña de escort, marca de cancelación tardía o no-show
- Todo el sistema de registro es interno — el cliente nunca sabe que existe

**Lugar de la cita:**
- Por ahora solo hoteles y moteles — el cliente elige el lugar
- El agente nunca recomienda establecimientos específicos
- Si el cliente pregunta dónde → "El lugar lo eliges tú, nosotros nos adaptamos 😊"

**Cancelaciones:**
- Cancelación normal → notifica a la escort
- Cancelación con menos de 15 min o no-show → marca permanente en el registro del cliente
- Las escorts pueden consultar ese historial antes de confirmar una cita

**Servicios:**
- Puede hablar a grandes rasgos del servicio de cada escort si el cliente pregunta
- Siempre cierra con: "Para ver todos los detalles visita su perfil → doncellas.mx/..."

**Pagos:**
- ⏳ Pendiente — Paco define después de hablar con las escorts

### Stack definitivo
- **GPT-4o mini** (cerebro — menos restricciones que Claude API para contenido adulto)
- **Make.com** (orquestador)
- **Telegram Bot API** — bot @DoncellasGDLbot ✅ creado | canal @DoncellasGDL ✅ creado
- **WhatsApp Business App** ✅ instalada — número dedicado, nombre "Doncellas", categoría Beauty
- **WhatsApp Business API** ✅ conectada — número +52 33 2168 5023 verificado en Meta
- **Baileys** — para WhatsApp Estados automáticos (20+ diarios con timing aleatorio)
- **Supabase** — sincronización de disponibilidad, citas, clientes
- **Costo estimado:** ~$39 USD/mes en producción

### Canales del agente

**Comunicación + Estados (clientes recurrentes):**
- WhatsApp Business — gestiona citas (Flujo 2) + Estados visibles para quien tiene el número guardado
- Bot Telegram @DoncellasGDLbot — gestiona citas (Flujo 2) + publicaciones visibles para seguidores

**Publicación (captación de clientes nuevos):**
- Canal Telegram @DoncellasGDL — broadcast abierto
- Canal de WhatsApp — broadcast abierto
- Twitter/X — alcance abierto, cuenta marcada como contenido sensible

**Manuales (no automatizar — riesgo de ban):**
- Facebook, Instagram, TikTok — manejados por Paco/agencia con contenido discreto

### Flujos planeados

**Flujo 1 — Publicación automática:**

*Fuente de contenido:*
- Primera opción: fotos/videos del banco "Redes" de la escort (contenido casual, día a día)
- Si no hay contenido nuevo en Redes: usa fotos del banco "Perfil"
- El agente nunca repite la misma foto dos veces seguidas
- Si la escort agota su contenido → aviso automático para que suba más
- El agente puede publicar aunque la escort NO esté marcada disponible (mantener presencia)

*Canales y contenido — regla de unicidad:*
- Nunca se publica el mismo contenido en dos canales el mismo día
- Cada canal tiene su propia personalidad y contenido exclusivo
- Excepción: promociones de la plataforma → se publican en todos los canales el mismo día pero con copy y foto diferente en cada uno

*Tipos de publicación (rotan en cada canal):*
- TIPO 1 — Carta de presentación (catálogo): foto + nombre + 1 línea sugerente + link al perfil
- TIPO 2 — Disponible ahora: foto casual + copy con horario sugerente + link al perfil
- TIPO 3 — Promocional: promo al WhatsApp Business, Canal Telegram, doncellas.mx o futuras redes

*Personalidad por canal:*
- Canal Telegram @DoncellasGDL → catálogo + comunidad (cartas de presentación, perfiles destacados)
- Canal WhatsApp → disponibilidad + exclusivo (quién está disponible ahora, contenido más íntimo)
- Estado WhatsApp Business → personal + cercano (contenido casual de Redes, muy sugerente)
- Estado Bot Telegram → dinámico + directo (mezcla disponibilidad y promociones)

*Frecuencia — Estados (WhatsApp Business + Bot Telegram):*
- Máximo 2 estados por escort por día
- Entre los 2 estados de la misma escort: mínimo 4 horas de diferencia
- Entre estados de diferentes escorts: intervalo aleatorio entre 23 y 47 minutos (nunca número redondo)
- En los huecos entre escorts se insertan estados promocionales (máx. 2 promos por día)
- Horario permitido: 8:00am — 11:30pm (salvo que la escort esté disponible en madrugada)
- Promos rotan en orden: Canal WhatsApp → Canal Telegram → futuras redes al agregarlas

*Frecuencia — Canales (Telegram + WhatsApp):*
- 2 a 3 publicaciones por día por canal
- Intervalos variables entre publicaciones (misma lógica anti-bot)
- Máximo 1 publicación promocional por día por canal
- Nunca dos publicaciones del mismo tipo seguidas
- Nunca la misma escort dos veces el mismo día en el mismo canal
- Todas las escorts rotan para tener visibilidad similar

*Copy — lógica del texto:*
- El agente toma 3 variables: descripción de la escort + categoría + horario de publicación
- Horarios: 🌅 Mañana (6-12) / ☀️ Tarde (12-19) / 🌙 Noche (19-24) / 🌑 Madrugada (0-6)
- Adapta el tono y las referencias al momento del día
- Ejemplo: escort Milf con servicio oral publicada a las 9am → "¿Se te antoja un rico oral mañanero? 🌅 Sofía te espera → doncellas.mx/..."

**Flujo 2 — Chatbot conversacional:**
- Cliente escribe al bot → agente saluda: "Bienvenido a Doncellas GDL 🌹 ¿En qué podemos servirle?"
- NO presenta escorts de entrada — espera la intención del cliente
- CASO A: Cliente pide escort específica → agente pregunta fecha/hora/lugar → manda datos a la escort
  - Escort tiene 20 min para confirmar (si cliente pregunta antes → "estamos contactando a la chica 🙏")
  - UMBRAL: Cita en menos de 2h → Modo tiempo real (sin Flujo 3)
  - UMBRAL: Cita en más de 2h → Modo programado (Flujo 3 se programa)
  - Escort confirma → agente confirma al cliente + programa Flujo 3 o activa Flujo 4
  - Escort confirma con ajuste de hora → agente consulta al cliente si acepta el nuevo horario
  - Cliente acepta → forma de pago → info a escort → Flujo 4
  - Cliente no acepta → ¿otra chica? → si no → disculpa + fin
  - Escort no confirma en 20 min → presenta todas las disponibles + links a perfiles
- CASO B: Cliente pide opciones → presenta disponibles + links → cliente elige → Caso A

**Flujo 3 — Confirmación escalonada (solo citas programadas +2h):**
- T-1h30: Mensaje a escort → tiene 30 min para confirmar
- Escort confirma → mensaje al cliente → tiene 30 min para confirmar
  - Cliente confirma → pregunta forma de pago → info a escort → Flujo 4
  - Cliente no confirma en 30 min → cita cancelada → aviso a escort
- Escort no confirma en 30 min → mensaje al cliente con disculpa → presenta todas las disponibles + links
  - Ciclo: cada opción tiene 10 min para confirmar → si confirma → protocolo normal → Flujo 4
  - Ninguna disponible o cliente no quiere ninguna → disculpa + cancelación

**Flujo 4 — Canal directo temporal:**
- Cita tiempo real (<2h): canal se activa a los 5 min de confirmar ambos
- Cita programada (+2h): canal se activa en T-30min
- Cierre: ambos confirman presencia física → canal se cierra automáticamente

---

## 11. ESTRATEGIA DE MARKETING

| Canal | Estado | Descripción |
|-------|--------|-------------|
| Skokka.mx / Mileroticos.com | ⏳ Activar con perfiles reales | Paco publica manualmente (captcha) |
| Canal Telegram @DoncellasGDL | ✅ Creado | Agente publica disponibilidad automáticamente |
| WhatsApp Business | ✅ App instalada / API pendiente Meta Business | Estados + chatbot de citas |
| WhatsApp Estados | ⏳ Manual en beta → automático Mes 3 | Agente genera, Paco publica; luego Baileys |
| SEO Google | 🟡 Base lista | Activar GSC cuando haya perfiles reales |
| Instagram discreto | ⏳ Pendiente | Siluetas sin rostros, manejado por la agencia |
| Google Ads | ⏳ Mes 4-5 con 20+ perfiles | |
| Boca a boca | — | El más poderoso en este giro |

**Principio:** Las escorts NO comparten perfiles (quieren privacidad). Doncellas GDL marketing = 100% por la agencia.

---

## 12. COSTOS

| Concepto | Costo |
|----------|-------|
| Dominios (ya comprados) | $315 MXN (única vez) |
| Beta sin agente (ahora) | ~$100 MXN/mes |
| Mes 3+ (con agente IA) | ~$700 MXN/mes (~$39 USD) |
| Mes 5+ (con Google Ads) | ~$5,000–7,000 MXN/mes |
| Punto de equilibrio | 1 escort en Silver ($1,500 MXN) |

---

## 13. FLUJO DE TRABAJO CON CLAUDE CODE

```bash
# Abrir el proyecto (alias en Terminal)
doncellas          # equivale a: cd ~/doncellas && claude --model claude-sonnet-4-6

# Subir cambios a GitHub (siempre al final de cada sesión)
git add . && git commit -m "descripción del cambio" && git push
```

**Regla:** Prompts en español → Claude Code `>` | Comandos git → Terminal `%`

### Ver la página localmente en el celular
```bash
npx serve .
ipconfig getifaddr en0   # IP de tu Mac
# Abrir en celular: http://[IP]:3000
```

### Flujo de alta de una escort real
1. Escort contacta a Paco por WhatsApp — verificación en persona
2. Paco abre panel-admin.html → "Agregar Doncella"
3. Llena: nombre artístico, edad, zona, categoría, plan (Elite), tarifa, WhatsApp
4. Sistema genera usuario automático + genera contraseña
5. Paco le manda credenciales por WhatsApp a la escort
6. Escort entra a panel-modelo.html, sube fotos y configura disponibilidad

---

## 14. PENDIENTES

### Técnicos prioritarios
- [ ] Reemplazar número WhatsApp placeholder (+52 33 1234 5678) con número Business real
- [ ] Activar supabase-auth real (tabla usuarios actual es temporal con password en texto plano)
- [x] Bot @DoncellasGDLbot ✅ creado con logo, descripción y token
- [x] Canal Telegram @DoncellasGDL ✅ creado, público, con logo
- [x] WhatsApp Business App ✅ instalada con número dedicado (luego eliminada para conectar API)
- [x] Crear Meta Business en business.facebook.com ✅
- [x] Conectar número dedicado +52 33 2168 5023 a WhatsApp Business API via Meta ✅
- [x] App Meta para developers creada (DoncellasGDL) ✅
- [x] Galería mobile: franjas negras corregidas, grid 2 columnas con altura proporcional ✅
- [x] PWA: banner reaparece cada 5 días (antes era permanente) ✅
- [x] PWA: banner dorado "Hay versión nueva" fuerza actualización automática ✅
- [ ] Reemplazar número placeholder +52 33 1234 5678 con número real en index.html
- [ ] Probar flujo completo login de escort real (Supabase tabla usuarios)
- [ ] Registrar doncellas.mx en Google Search Console

### Credenciales y accesos del agente
- **Telegram Bot Token:** `8620840103:AAEMStKPn02v4p2RSWB05YBOmTpNLrKg6fA`
- **Bot:** @DoncellasGDLbot | **Canal:** @DoncellasGDL
- **WhatsApp Business:** número dedicado (Paco tiene el cel)
- **Correo Meta/Facebook:** doncellasgdl@gmail.com
- **WhatsApp número:** +52 33 2168 5023
- **Phone Number ID:** 1250996401420685
- **WhatsApp Business Account ID:** 27174755062182821
- **Token de acceso:** guardado por Paco (temporal — generar permanente al conectar Make.com)
- **Make.com:** ⏳ pendiente crear cuenta
- **OpenAI API:** ⏳ pendiente crear cuenta

### Agente IA — próximos pasos (en orden)
1. [ ] Crear cuenta Make.com (plan gratuito para pruebas, Core $10.59/mes para producción)
2. [ ] Crear cuenta OpenAI y agregar $5 USD de crédito (GPT-4o mini)
3. [ ] Construir Flujo 1 en Make.com (publicación automática — el más fácil, ~3-4h)
4. [ ] Construir Flujo 2 en Make.com (chatbot conversacional — el más importante, ~6-8h)
5. [ ] Construir Flujo 3 en Make.com (confirmaciones escalonadas, ~3-4h)
6. [ ] Construir Flujo 4 en Make.com (relay privado, ~4-6h)
7. [ ] Conectar Supabase webhooks con Make.com
8. [ ] Crear Canal de WhatsApp (cuando Meta Business esté verificado)
9. [ ] WhatsApp Estados automáticos con Baileys (Mes 3)
10. [ ] Migrar hosting a Vercel

### Pendientes de negocio (bloquean partes del agente)
- [ ] Hablar con escorts sobre forma de pagos → define lógica en Flujo 2 y 3
- [ ] Confirmar si escorts quieren recibir a domicilio → actualizar base de conocimiento del agente
- [ ] Reemplazar número placeholder +52 33 1234 5678 con número real en index.html

### Técnicos prioritarios de la plataforma
- [ ] Activar supabase-auth real (contraseñas en texto plano — hacer ANTES de escorts reales)
- [ ] Probar flujo completo login de escort real (Supabase tabla usuarios)
- [ ] Registrar doncellas.mx en Google Search Console
- [ ] **Conectar "Editar Perfil" del panel-modelo a Supabase (NO persiste aún).** Todos los formularios de panel-modelo.html → Editar Perfil son demo: `saveModelServices()` (servicios + modalidad de Relaciones), medidas, tarifas, colores de ojos/cabello/piel, descripción y etiquetas solo muestran un toast, no guardan a la tabla `escorts`/`servicios`. Resultado: lo que la modelo edita NO se refleja en su perfil real. Falta leer los campos del form, hacer UPDATE a Supabase por `escortId` (localStorage) y refrescar. El modal de edición del admin (`editModel`/`saveEditModel`) sí actualiza MODELS en memoria, pero tampoco persiste a Supabase. Para el servicio "Relaciones" guardar `{ si, modalidad }` (columna `modalidad` en `servicios` o equivalente).

### Marketing y negocio
- [ ] Subir primeros perfiles de escorts reales con fotos reales
- [ ] Publicar en Skokka y Mileroticos con link a doncellas.mx
- [ ] Crear cuenta de Instagram discreta
- [ ] Rediseñar membresias.html con precios reales cuando haya feedback de escorts
- [ ] Activar Google Ads (Mes 4-5 con 20+ perfiles)

---

## 15. ANÁLISIS DE COMPETENCIA (referencia)

| Sitio | SEO | Diseño | Lo que tomamos |
|-------|-----|--------|----------------|
| tentacionesgdl.com | 8/10 | 4/10 | Niveles visibles en cards, banner con precios |
| laboutique.vip | 9/10 | 6/10 | Carrusel hover, calendario de disponibilidad |
| goldenescortgdl.com | 5/10 | 3/10 | Canal de Telegram como comunidad |

---

*Actualizado el 4 de junio de 2026 — agente IA planeado, Telegram + WhatsApp Business API conectados, fixes mobile PWA.*
*Proyecto Doncellas GDL — Guadalajara, México*
