# CLAUDE.md — Proyecto Doncellas
> Contexto completo para continuar el desarrollo en un nuevo chat

---

## 1. IDENTIDAD DEL PROYECTO

| Campo | Detalle |
|-------|---------|
| **Nombre** | Doncellas (antes: VelvetStage) |
| **Giro** | Plataforma de escorts en Guadalajara, México |
| **Nombre para las chicas** | "Las Doncellas" |
| **Ciudad inicial** | Guadalajara, Jalisco, México |
| **Expansión futura** | CDMX, Monterrey, Cancún |
| **Dominio objetivo** | doncellas.mx + doncellas.com (~$315 MXN ambos/año en akky.mx) |
| **URL en vivo** | https://pakogq.github.io/Doncellas/ |
| **Color principal** | Negro `#0A0A0A` |
| **Color acento** | Dorado `#C9A84C` |
| **Carpeta del proyecto** | `~/doncellas` en Mac |
| **Herramienta de desarrollo** | Claude Code en Mac |
| **Repositorio GitHub** | https://github.com/pakogq/Doncellas |

---

## 2. CONTEXTO DEL USUARIO

- **Nombre:** Francisco (Paco) Gaitan Quintero
- **Ubicación:** Guadalajara, México (doble nacionalidad mexicana-americana, nacido en Los Ángeles CA)
- **Situación:** Ya tiene escorts listas para iniciar — lanzamiento casi inmediato
- **Claude Code:** Instalado y funcionando en Mac, carpeta `~/doncellas`
- **GitHub Pages:** Configurado y en vivo en `pakogq.github.io/Doncellas/`
- **Canva:** Cuenta activa, logo subido (ID diseño: `DAHHd8_Xx8o`), PNG descargado
- **Otro negocio:** Empresa de agentes IA para PyMEs en USA (contadores, abogados migratorios, logística México-USA) con paquetes Essential/Pro/Elite

---

## 3. STACK TECNOLÓGICO

| Capa | Tecnología | Estado |
|------|-----------|--------|
| Frontend | HTML + CSS + JS vanilla | ✅ Construido |
| Hosting | GitHub Pages | ✅ Activo |
| Base de datos | Supabase | ⏳ Pendiente conectar |
| Agente IA | Claude API + Make.com + WhatsApp API + Telegram | ⏳ Pendiente construir |
| Dominio | doncellas.mx + doncellas.com | ⏳ Pendiente comprar en akky.mx |
| Hosting futuro | Vercel | ⏳ Pendiente migrar |

---

## 4. ARCHIVOS DEL PROYECTO

```
~/doncellas/
├── index.html          ← Página principal
├── modelos.html        ← Grid de escorts (llamada "Doncellas")
├── categorias.html     ← Categorías de escorts
├── perfil.html         ← Perfil individual de escort
├── panel-admin.html    ← Panel de administrador
├── panel-modelo.html   ← Panel de escort
├── membresias.html     ← Planes y precios
├── styles.css          ← Todos los estilos
├── app.js              ← Lógica JavaScript
├── manifest.json       ← PWA manifest
└── sw.js               ← Service Worker PWA
```

**Credenciales de demo:**
- Admin: `admin` / `admin123`
- Escort demo: `isabella` / `modelo123`

---

## 5. FUNCIONES CONSTRUIDAS

### index.html — Página principal
- Hero banner rotativo 3 slides, altura 260px en móvil
- Selector de ciudades (solo GDL activo)
- Buscador debajo del banner, alineado a la izquierda en móvil
- Strip "Disponibles para una cita ahora" con avatares
- Secciones rotativas con barra de progreso 4s
- Grid de escorts con carrusel hover (fade 1.2s, barras blancas)
- Banner PWA instalación
- Modo discreto (cambia a página de clima)
- CTA flotante "¿Quieres ser escort?"
- Bottom navigation fija en móvil (Inicio / Doncellas / Categorías / Cuenta)

### perfil.html — Perfil de escort
- Pill "Disponible" (verde) + badge "Verificada" + badge "TOP 10"
- Botones de acción: Guardar, Compartir, WhatsApp, Telegram
- Stats: fotos, videos, seguidores, calificación
- Galería con pestañas Todo/Fotos/Videos
- Apartado "Citas" colapsable con calendario de disponibilidad
- Días verdes = disponibles, click activa botón "Agendar"
- Modal de confirmación con hora/nombre/WhatsApp
- Secciones: Sobre mí, Características, Servicios, Reseñas
- Reseñas al final en móvil (order: 99)
- Sidebar con WhatsApp, info personal, idiomas

### panel-admin.html
- Login: `admin` / `admin123`
- Dashboard: stats, gráfica de visitas
- Ingresos: gráfica barras, proyección anual, tabla de cobros
- Escorts: tabla con plan/estado/verificación/calificación
- Alta de escorts controlada por admin (no se registran solas)
- Calendario editable por escort
- Reseñas: aprobar o rechazar antes de publicar
- Referidos: historial y bonos

### panel-modelo.html
- Login: `isabella` / `modelo123`
- Toggle Online/Offline sticky (verde cuando activa)
- Estadísticas: visitas, seguidores, gráfica diaria, horarios pico
- Contenido: upload, grid de archivos
- Perfil editable (nombre artístico bloqueado 🔒)
- Mis citas: lista con estado, confirmar/cancelar
- Calendario: click en días para marcar disponible
- Referidos: link personalizado, contador, historial
- Mi plan: puede cambiar entre Starter/Gold/Elite

### membresias.html
- 3 planes: Starter $199 / Gold $299 / Elite $499 MXN/mes
- Toggle mensual/anual con ahorro calculado
- Primer mes gratis
- Pasarela pagos: tarjeta / OXXO / SPEI

### PWA
- manifest.json y sw.js creados
- Banner de instalación en móvil
- Funciona como app instalable en iOS y Android

---

## 6. DECISIONES DE DISEÑO TOMADAS

- Admin controla el alta de escorts — ellas NO se registran solas
- Las escorts editan su contenido pero NO nombre artístico ni plan
- WhatsApp directo (wa.me/número) en lugar de chat interno
- Pill dice "Disponible" (no "En línea")
- Calendario colapsable bajo label "Citas"
- Reseñas moderadas — admin aprueba antes de publicar
- Solo Guadalajara al inicio — arquitectura lista para más ciudades
- Las escorts proporcionan sus propias fotos y videos ($0 costo producción)
- Carrusel hover en todos los grids
- Indicadores del banner: líneas horizontales delgadas (no dots)
- Bottom navigation fija en móvil en lugar de hamburguesa

### Categorías de escorts (actualizadas)
1. VIP
2. Universitarias
3. GFE — Novia por un día
4. Venezolanas
5. A domicilio
6. Petite
7. Eventos y cenas
8. Nuevas

---

## 7. OPTIMIZACIÓN MÓVIL APLICADA

### Navbar móvil
- Solo logo "Doncellas" a la izquierda
- Palabra "Escorts" en cursiva dorada a la derecha
- Sin botones de inicio de sesión ni hamburguesa en móvil
- Cambio aplicado en: index.html, modelos.html, categorias.html

### Hero banner móvil
- Altura 260px
- Sin mini-cards flotantes
- Sin indicadores de navegación (barras/dots)
- Título font-size 22px

### Buscador móvil
- Debajo del banner
- Alineado a la izquierda

### Grid de escorts móvil
- 2 columnas exactas
- gap 8px

### Perfil móvil
- Oculto: ubicación, edad, estatura, estrellas, reseñas del bloque superior
- Botones de acción: solo iconos, debajo del carrusel de fotos
- Servicios debajo de Características
- Reseñas al final (order: 99)

### Paneles en móvil
- Sidebar lateral → bottom navigation inferior
- Todas las funcionalidades accesibles
- Formularios en columna única, inputs 44px mínimo

---

## 8. NAVBAR DESKTOP

- Izquierda: logo D + "DONCELLAS"
- Centro: links de navegación
- Derecha: "Escorts" en cursiva dorada + botón "Iniciar sesión"
- El botón Iniciar sesión va a la DERECHA de "Escorts"

---

## 9. LOGO DE DONCELLAS

- Diseño: letra D caligráfica con perfil femenino sutil, dorado sobre negro
- Canva ID diseño: `DAHHd8_Xx8o`
- PNG: descargado en carpeta de Descargas
- SVG: requiere Canva Pro (alternativa: generarlo desde Claude Code)
- JPG: pendiente de descargar (mismo proceso que PNG en Canva)

---

## 10. AGENTE DE MARKETING IA — DISEÑADO, PENDIENTE DE CONSTRUIR

### Stack
- Claude API (cerebro del agente)
- Make.com (orquestador de flujos)
- WhatsApp Business API
- Telegram Bot API
- Supabase (base de datos)
- Costo estimado: ~$30-65 USD/mes (~$1,300 MXN/mes)

### Flujo 1 — Publicación automática
Cuando escort marca "Disponible" → Make.com detecta el cambio → Claude genera texto elegante + foto → publica automáticamente en canal Telegram + estado WhatsApp Business

### Flujo 2 — Chatbot conversacional + Confirmación de cita
1. Cliente escribe en Telegram o WhatsApp
2. Agente consulta Supabase → presenta escorts disponibles con perfil
3. Cliente elige una escort
4. Agente le avisa al cliente: *"Perfecto, le voy a preguntar a [nombre] si tiene disponibilidad ⏳"*
5. Agente manda WhatsApp a la escort: *"Tienes solicitud de cita para [día/hora]. ¿Puedes asistir? Responde SÍ o NO"*
6. **Si escort dice SÍ** → agente confirma al cliente: *"¡Listo! Tu cita está confirmada 🌹"* → cita guardada en panel
7. **Si escort dice NO o no responde en 15 min** → agente avisa al cliente: *"[Nombre] tuvo un imprevisto 😔 ¿Te presento a [otras disponibles] o prefieres cancelar?"*

### Flujo 3 — Recordatorios escalonados
- **30 min antes al cliente:** escort recibe aviso primero con 30 min de margen
- Escort confirma → 30 min después cliente recibe confirmación final
- **Si escort NO confirma o cancela en ese margen:**
  - Cliente recibe: *"[Nombre] tuvo un imprevisto. ¿Te presento opciones disponibles o cancelamos?"*
  - Se ofrecen escorts alternativas disponibles esa noche
  - Panel se actualiza con el nuevo estado de la cita

### Stack para versión final del agente
- **GPT-4o mini** (cerebro — reemplaza Claude API por menos restricciones de contenido)
- **Make.com** (orquestador de flujos y tiempos)
- **WhatsApp Business API** (mensajes a escorts y clientes)
- **Telegram Bot** (canal público + chatbot clientes)
- **Supabase** (escorts, citas, disponibilidad, clientes)
- Costo estimado: ~$39 USD/mes (~$700 MXN/mes)

---

## 11. ESTRATEGIA DE MARKETING (sin Google Ads primeros meses)

| Canal | Impacto | Descripción |
|-------|---------|-------------|
| Escorts comparten sus perfiles | 95% | 8 escorts × 500 seguidores = 4,000 personas día 1 gratis |
| WhatsApp Business | 92% | Estados automáticos + lista de difusión VIP |
| Telegram | 90% | Canal público con publicaciones automáticas del agente |
| Instagram | 75% | Siluetas elegantes, historias diarias de disponibilidad |
| SEO local + directorios | 70% | Google Search Console desde día 1 |
| Google Ads | — | Activar en mes 4-5 cuando haya 20+ perfiles |

---

## 12. COSTOS DEL PROYECTO

| Concepto | Costo |
|----------|-------|
| Inversión inicial (dominios) | $315 MXN una sola vez |
| Mes 1-2 (sin agente) | ~$100 MXN/mes |
| Mes 3+ (con agente IA) | ~$1,300 MXN/mes |
| Mes 5+ (con Google Ads) | ~$5,000-7,300 MXN/mes |
| Punto de equilibrio | 1 escort en Starter ($199 MXN) |
| Proyección mes 6 (30 escorts) | ~$8,970 MXN/mes |

---

## 13. ANÁLISIS DE COMPETENCIA

| Sitio | SEO | Diseño | Lo que tomamos |
|-------|-----|--------|----------------|
| tentacionesgdl.com | 8/10 | 4/10 | Niveles visibles en cards, banner con precios |
| laboutique.vip | 9/10 | 6/10 | Carrusel hover, calendario viajes |
| goldenescortgdl.com | 5/10 | 3/10 | Canal de Telegram como comunidad |

---

## 14. FLUJO DE TRABAJO CON CLAUDE CODE

```bash
# Entrar al proyecto
cd doncellas
claude

# Pegar el prompt en Claude Code (español)
> [prompt aquí]

# Salir de Claude Code
> /exit

# Subir cambios a GitHub (en Terminal)
git add . && git commit -m "descripción del cambio" && git push
```

**Regla:** Prompts en español → Claude Code `>`  |  Comandos git → Terminal `%`

---

## 15. PENDIENTES

### Técnicos
- [x] Comprar dominios doncellas.mx + doncellas.com.mx en akky.mx
- [x] Conectar dominio a GitHub Pages via Cloudflare
- [x] doncellas.mx activo con HTTPS
- [x] Bot de Telegram demo funcionando (@DocenllasGDLbot — corregir typo a @DoncellasGDLbot)
- [ ] Corregir username del bot: DocenllasGDLbot → DoncellasGDLbot
- [ ] Redirección doncellas.com.mx → doncellas.mx (pendiente propagar)
- [ ] Conectar Supabase como base de datos real
- [ ] Construir agente real (Make.com + GPT-4o mini + WhatsApp Business + Telegram)
- [ ] Flujo de confirmación: escort confirma ANTES de notificar al cliente
- [ ] Recordatorios escalonados: escort 30 min antes que cliente
- [ ] Descargar logo en JPG desde Canva
- [ ] Generar SVG del logo desde Claude Code

### Marketing y negocio
- [ ] Crear canal de Telegram "Doncellas GDL"
- [ ] Configurar WhatsApp Business con número dedicado
- [ ] Registrar doncellas.mx en Google Search Console
- [ ] Crear cuenta de Instagram discreta
- [ ] Subir primeros perfiles de escorts reales
- [ ] Activar programa de referidos
- [ ] Primeros artículos SEO en el blog

---

## 16. PROMPTS ÚTILES PARA CLAUDE CODE

### Subir cambios a GitHub (siempre al final)
```bash
git add . && git commit -m "descripción" && git push
```

### Si Claude Code pide login
```bash
claude
/login
```

### Ver la página localmente en el celular
```bash
npx serve .
ipconfig getifaddr en0   # te da la IP de tu Mac
# Abrir en celular: http://[IP]:3000
```

---

*Archivo generado automáticamente el 23 de abril de 2026*
*Proyecto Doncellas — Guadalajara, México*
