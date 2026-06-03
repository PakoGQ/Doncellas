# CLAUDE.md — Proyecto Doncellas
> Estado real del proyecto al 1 de junio de 2026. Actualizado leyendo todos los archivos.

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
- **Cómo funciona:** 3 pasos (Explora / Agenda por Telegram / Disfruta). CTA → @DocenllasGDLbot
- **CTA Banner:** "¿Quieres ser una de nuestras Doncellas?" → WhatsApp
- **¿Por qué elegirnos?:** 4 cards (Verificados / Disponibilidad Real / Total Discreción / Reseñas Reales)
- **FAQ:** 6 preguntas con `<details>` accordion nativo
- **Footer:** 4 columnas (brand + social / Plataforma / Para Doncellas / Legal)
- **Botones flotantes:** Telegram (@DocenllasGDLbot) + WhatsApp
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
- **Telegram bot:** @DocenllasGDLbot (typo provisional — corregir a @DoncellasGDLbot al crear bot nuevo con GPT-4o mini)
- **Número WhatsApp placeholder:** +52 33 1234 5678 (cambiar cuando haya número Business real)
- **Membresías en beta:** Todas Elite GRATIS (primeras 15-20 escorts). Precios: Silver $1,500 / Gold $2,000 / Elite $2,500 MXN/mes. Rediseñar membresias.html con precios cuando haya feedback.
- **Reseñas de clientes:** Sistema privado entre escorts — ayuda a identificar clientes problemáticos antes de aceptar citas. Solo visible en panel-modelo y admin.
- **Moderación de reseñas públicas:** Admin aprueba antes de publicar en perfil
- **Programa de referidos:** Eliminado completamente

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

### Stack definitivo
- **GPT-4o mini** (cerebro — menos restricciones que Claude API para contenido adulto)
- **Make.com** (orquestador)
- **Telegram Bot API** — canal @DoncellasGDL (crear cuando haya 3+ escorts)
- **WhatsApp Business API** — con número dedicado
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
- Escort marca Disponible → Make detecta → GPT genera texto + toma foto/video del banco "Redes" de esa escort → publica en Canal Telegram + Canal WhatsApp + Twitter/X + Estado WhatsApp Business
- El agente rota el contenido sin repetir la misma foto dos veces seguidas
- Si la escort se agota el contenido de redes → aviso para que suba más
- El agente también puede publicar contenido de redes aunque la escort NO esté disponible (para mantener presencia)

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
| Canal Telegram @DoncellasGDL | ⏳ Crear con 3+ escorts | Agente publica disponibilidad automáticamente |
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
- [ ] Corregir username del bot: @DocenllasGDLbot → @DoncellasGDLbot (crear nuevo bot al activar agente)
- [ ] Probar flujo completo login de escort real (Supabase tabla usuarios)
- [ ] Registrar doncellas.mx en Google Search Console

### Técnicos Mes 2-3
- [ ] Construir agente IA (Make.com + GPT-4o mini + Telegram + WhatsApp Business + Supabase)
- [ ] Canal Telegram @DoncellasGDL (cuando haya 3+ escorts activas)
- [ ] Flujo de confirmación de citas con relay privado
- [ ] Recordatorios escalonados
- [ ] WhatsApp Estados automáticos con Baileys
- [ ] Migrar hosting a Vercel

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

*Actualizado el 1 de junio de 2026 leyendo el estado real de todos los archivos.*
*Proyecto Doncellas GDL — Guadalajara, México*
