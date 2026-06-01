-- ================================================================
-- DONCELLAS GDL — Schema Supabase v1
-- ----------------------------------------------------------------
-- Instrucciones:
-- 1. Abre tu proyecto en supabase.com
-- 2. Ve a SQL Editor → New query
-- 3. Pega TODO este contenido y da clic en RUN
-- ================================================================


-- ── 1. Tabla principal de escorts ───────────────────────────────
CREATE TABLE IF NOT EXISTS escorts (
  id             BIGSERIAL PRIMARY KEY,
  slug           TEXT UNIQUE NOT NULL,            -- URL amigable
  nombre         TEXT NOT NULL,                   -- Nombre artístico
  edad           INTEGER CHECK (edad >= 18),
  ciudad         TEXT DEFAULT 'Guadalajara',
  zona           TEXT,                            -- Colonia / zona
  categoria      TEXT,                            -- VIP, Universitaria, etc.
  plan           TEXT DEFAULT 'Elite'
                   CHECK (plan IN ('Silver','Gold','Elite')),
  disponible     BOOLEAN DEFAULT false,
  verificada     BOOLEAN DEFAULT false,
  top10          BOOLEAN DEFAULT false,
  activa         BOOLEAN DEFAULT true,            -- Admin puede desactivar
  descripcion    TEXT,
  whatsapp       TEXT,                            -- Solo número, sin +52
  altura         INTEGER,                         -- cm
  peso           INTEGER,                         -- kg
  cabello        TEXT,
  ojos           TEXT,
  piel           TEXT,
  busto          INTEGER,                         -- cm
  cintura        INTEGER,                         -- cm
  cadera         INTEGER,                         -- cm
  nacionalidad   TEXT DEFAULT 'Mexicana',
  idiomas        TEXT[]  DEFAULT ARRAY['Español'],
  precio_hora    INTEGER DEFAULT 2000,            -- MXN
  calificacion   DECIMAL(3,2) DEFAULT 5.00
                   CHECK (calificacion BETWEEN 0 AND 5),
  num_resenas    INTEGER DEFAULT 0,
  num_seguidores INTEGER DEFAULT 0,
  num_citas      INTEGER DEFAULT 0,
  tiene_video    BOOLEAN DEFAULT false,
  es_nueva       BOOLEAN DEFAULT false,
  es_destacada   BOOLEAN DEFAULT false,
  tags           TEXT[]  DEFAULT '{}',
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── 2. Fotos y Videos ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS fotos (
  id         BIGSERIAL PRIMARY KEY,
  escort_id  BIGINT REFERENCES escorts(id) ON DELETE CASCADE,
  url        TEXT NOT NULL,
  tipo       TEXT DEFAULT 'foto' CHECK (tipo IN ('foto','video')),
  orden      INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 3. Servicios ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS servicios (
  id               BIGSERIAL PRIMARY KEY,
  escort_id        BIGINT REFERENCES escorts(id) ON DELETE CASCADE,
  nombre           TEXT NOT NULL,
  incluido         BOOLEAN DEFAULT true,
  tiene_costo_extra BOOLEAN DEFAULT false
);

-- ── 4. Disponibilidad (calendario) ──────────────────────────────
CREATE TABLE IF NOT EXISTS disponibilidad (
  id         BIGSERIAL PRIMARY KEY,
  escort_id  BIGINT REFERENCES escorts(id) ON DELETE CASCADE,
  fecha      DATE NOT NULL,
  disponible BOOLEAN DEFAULT true,
  UNIQUE(escort_id, fecha)
);

-- ── 5. Citas ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS citas (
  id               BIGSERIAL PRIMARY KEY,
  escort_id        BIGINT REFERENCES escorts(id),
  tipo_lugar       TEXT DEFAULT 'Hotel' CHECK (tipo_lugar IN ('Hotel','Motel')),
  lugar            TEXT,                  -- Nombre del hotel o motel
  cliente_whatsapp TEXT,                  -- Solo para relay agente (nunca visible)
  fecha            DATE,
  hora             TEXT,
  duracion         TEXT,                  -- '1hr', '3hr', 'Día', etc.
  tarifa           INTEGER,               -- MXN
  estado           TEXT DEFAULT 'pendiente'
                     CHECK (estado IN ('pendiente','confirmada','cancelada','completada')),
  notas            TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ── 6. Reseñas (moderadas por admin) ────────────────────────────
CREATE TABLE IF NOT EXISTS resenas (
  id           BIGSERIAL PRIMARY KEY,
  escort_id    BIGINT REFERENCES escorts(id) ON DELETE CASCADE,
  autor        TEXT DEFAULT 'Anónimo',
  calificacion INTEGER CHECK (calificacion BETWEEN 1 AND 5),
  texto        TEXT,
  aprobada     BOOLEAN DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);


-- ── 7. Trigger: actualizar updated_at automáticamente ───────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS escorts_updated_at ON escorts;
CREATE TRIGGER escorts_updated_at
  BEFORE UPDATE ON escorts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();


-- ── 8. Row Level Security (permisos públicos) ───────────────────
ALTER TABLE escorts      ENABLE ROW LEVEL SECURITY;
ALTER TABLE fotos        ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicios    ENABLE ROW LEVEL SECURITY;
ALTER TABLE disponibilidad ENABLE ROW LEVEL SECURITY;
ALTER TABLE citas        ENABLE ROW LEVEL SECURITY;
ALTER TABLE resenas      ENABLE ROW LEVEL SECURITY;

-- Público lee escorts activas
CREATE POLICY "read_escorts_activas" ON escorts
  FOR SELECT USING (activa = true);

-- Público lee fotos de escorts activas
CREATE POLICY "read_fotos_publicas" ON fotos
  FOR SELECT USING (
    escort_id IN (SELECT id FROM escorts WHERE activa = true)
  );

-- Público lee servicios de escorts activas
CREATE POLICY "read_servicios_publicos" ON servicios
  FOR SELECT USING (
    escort_id IN (SELECT id FROM escorts WHERE activa = true)
  );

-- Público lee disponibilidad de escorts activas
CREATE POLICY "read_disponibilidad_publica" ON disponibilidad
  FOR SELECT USING (
    escort_id IN (SELECT id FROM escorts WHERE activa = true)
  );

-- Público puede solicitar citas
CREATE POLICY "insert_citas_publico" ON citas
  FOR INSERT WITH CHECK (true);

-- Público puede enviar reseñas (quedan pendientes de aprobación)
CREATE POLICY "insert_resenas_publico" ON resenas
  FOR INSERT WITH CHECK (true);

-- Público lee solo reseñas aprobadas por admin
CREATE POLICY "read_resenas_aprobadas" ON resenas
  FOR SELECT USING (aprobada = true);


-- ── 9. Datos Demo ───────────────────────────────────────────────
INSERT INTO escorts
  (slug, nombre, edad, zona, categoria, plan, disponible, verificada,
   top10, es_destacada, es_nueva, descripcion, whatsapp, altura, peso,
   cabello, ojos, piel, busto, cintura, cadera, nacionalidad, idiomas,
   precio_hora, calificacion, num_resenas, num_seguidores, num_citas, tags)
VALUES

('valentina-r', 'Valentina R.', 25, 'Zona Rosa', 'VIP', 'Elite',
  true, true, true, true, false,
  'Soy estudiante de diseño, sofisticada y apasionada. Me encanta la buena conversación y hacer que cada momento sea verdaderamente memorable.',
  '3312345671', 167, 56, 'Castaño', 'Miel', 'Blanca', 90, 63, 92,
  'Mexicana', ARRAY['Español','Inglés'], 3500, 4.9, 47, 312, 189,
  ARRAY['VIP','Universitaria','Bilingüe','Elite']),

('camila-v', 'Camila V.', 22, 'Providencia', 'GFE — Novia por un día', 'Elite',
  true, true, false, true, false,
  'La experiencia de novia perfecta. Elegante, cariñosa y discreta. Te haré sentir especial desde el primer momento hasta el último.',
  '3312345672', 163, 52, 'Negro', 'Café', 'Morena clara', 88, 60, 89,
  'Mexicana', ARRAY['Español'], 2500, 4.8, 31, 218, 127,
  ARRAY['GFE','Petite','Natural']),

('isabella-m', 'Isabella M.', 27, 'Chapultepec', 'VIP', 'Elite',
  false, true, true, true, false,
  'Escort VIP para hombres que aprecian lo mejor. Refinada, inteligente y sin límites para hacer tus fantasías realidad con total discreción.',
  '3312345673', 170, 59, 'Rubio', 'Verde', 'Blanca', 92, 65, 94,
  'Venezolana', ARRAY['Español','Inglés','Portugués'], 5000, 5.0, 89, 541, 312,
  ARRAY['VIP','Elite','Venezolana','Bilingüe']),

('sofia-l', 'Sofía L.', 21, 'Zapopan', 'Universitaria', 'Elite',
  true, false, false, false, true,
  'Nueva en la plataforma pero con muchas ganas de conocerte. Fresca, espontánea y llena de energía positiva.',
  '3312345674', 160, 50, 'Castaño claro', 'Café', 'Morena', 86, 59, 88,
  'Mexicana', ARRAY['Español'], 2000, 4.7, 8, 89, 23,
  ARRAY['Nueva','Universitaria','Petite']),

('renata-m', 'Renata M.', 29, 'Tlaquepaque', 'Eventos y cenas', 'Elite',
  true, true, false, false, false,
  'Perfecta para eventos corporativos, cenas de negocios y reuniones sociales. Culta, elegante y con excelente conversación.',
  '3312345675', 168, 58, 'Castaño oscuro', 'Avellana', 'Trigueña', 91, 64, 93,
  'Colombiana', ARRAY['Español','Inglés'], 4000, 4.8, 28, 167, 98,
  ARRAY['Eventos','VIP','Colombiana','Bilingüe']);


-- Fotos demo (Unsplash — mismas que usa la app actualmente)
INSERT INTO fotos (escort_id, url, tipo, orden) VALUES

-- Valentina
((SELECT id FROM escorts WHERE slug='valentina-r'),
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=530&fit=crop&crop=face&auto=format&q=75','foto',0),
((SELECT id FROM escorts WHERE slug='valentina-r'),
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=530&fit=crop&crop=face&auto=format&q=75','foto',1),
((SELECT id FROM escorts WHERE slug='valentina-r'),
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=530&fit=crop&crop=face&auto=format&q=75','foto',2),

-- Camila
((SELECT id FROM escorts WHERE slug='camila-v'),
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=530&fit=crop&crop=face&auto=format&q=75','foto',0),
((SELECT id FROM escorts WHERE slug='camila-v'),
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=530&fit=crop&crop=face&auto=format&q=75','foto',1),
((SELECT id FROM escorts WHERE slug='camila-v'),
  'https://images.unsplash.com/photo-1502323703975-b9c8f761e6e7?w=400&h=530&fit=crop&crop=face&auto=format&q=75','foto',2),

-- Isabella
((SELECT id FROM escorts WHERE slug='isabella-m'),
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=530&fit=crop&crop=face&auto=format&q=75','foto',0),
((SELECT id FROM escorts WHERE slug='isabella-m'),
  'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=400&h=530&fit=crop&crop=face&auto=format&q=75','foto',1),
((SELECT id FROM escorts WHERE slug='isabella-m'),
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=530&fit=crop&crop=face&auto=format&q=75','foto',2),

-- Sofía
((SELECT id FROM escorts WHERE slug='sofia-l'),
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=530&fit=crop&crop=face&auto=format&q=75','foto',0),
((SELECT id FROM escorts WHERE slug='sofia-l'),
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=530&fit=crop&crop=face&auto=format&q=75','foto',1),
((SELECT id FROM escorts WHERE slug='sofia-l'),
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=530&fit=crop&crop=face&auto=format&q=75','foto',2),

-- Renata
((SELECT id FROM escorts WHERE slug='renata-m'),
  'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=530&fit=crop&crop=face&auto=format&q=75','foto',0),
((SELECT id FROM escorts WHERE slug='renata-m'),
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=530&fit=crop&crop=face&auto=format&q=75','foto',1),
((SELECT id FROM escorts WHERE slug='renata-m'),
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=530&fit=crop&crop=face&auto=format&q=75','foto',2);


-- Servicios demo
INSERT INTO servicios (escort_id, nombre, incluido, tiene_costo_extra) VALUES
-- Valentina
((SELECT id FROM escorts WHERE slug='valentina-r'),'Relaciones ilimitadas',true,false),
((SELECT id FROM escorts WHERE slug='valentina-r'),'Trato de novios',true,false),
((SELECT id FROM escorts WHERE slug='valentina-r'),'Oral con protección',true,false),
((SELECT id FROM escorts WHERE slug='valentina-r'),'Oral natural',true,true),
((SELECT id FROM escorts WHERE slug='valentina-r'),'Oral terminado',false,false),
((SELECT id FROM escorts WHERE slug='valentina-r'),'Anal',false,false),
-- Isabella (VIP — catálogo completo)
((SELECT id FROM escorts WHERE slug='isabella-m'),'Relaciones ilimitadas',true,false),
((SELECT id FROM escorts WHERE slug='isabella-m'),'Trato de novios',true,false),
((SELECT id FROM escorts WHERE slug='isabella-m'),'Oral con protección',true,false),
((SELECT id FROM escorts WHERE slug='isabella-m'),'Oral natural',true,false),
((SELECT id FROM escorts WHERE slug='isabella-m'),'Oral terminado',true,true),
((SELECT id FROM escorts WHERE slug='isabella-m'),'Tiro MHM',true,true),
((SELECT id FROM escorts WHERE slug='isabella-m'),'Anal',true,true),
-- Camila
((SELECT id FROM escorts WHERE slug='camila-v'),'Relaciones ilimitadas',true,false),
((SELECT id FROM escorts WHERE slug='camila-v'),'Trato de novios',true,false),
((SELECT id FROM escorts WHERE slug='camila-v'),'Oral con protección',true,false),
((SELECT id FROM escorts WHERE slug='camila-v'),'Oral natural',false,false);


-- Disponibilidad: próximos 30 días para escorts disponibles
INSERT INTO disponibilidad (escort_id, fecha, disponible)
SELECT e.id, d.fecha, true
FROM escorts e
CROSS JOIN (
  SELECT generate_series(CURRENT_DATE, CURRENT_DATE + 30, '1 day')::date AS fecha
) d
WHERE e.slug IN ('valentina-r','camila-v','sofia-l','renata-m')
ON CONFLICT (escort_id, fecha) DO NOTHING;


-- Reseñas demo (ya aprobadas)
INSERT INTO resenas (escort_id, autor, calificacion, texto, aprobada) VALUES
((SELECT id FROM escorts WHERE slug='valentina-r'),'Carlos M.',5,
  'Una experiencia increíble. Valentina es exactamente como su perfil. Muy recomendable.',true),
((SELECT id FROM escorts WHERE slug='valentina-r'),'Roberto A.',5,
  'Puntual, elegante y encantadora. Sin duda volvería.',true),
((SELECT id FROM escorts WHERE slug='isabella-m'),'Eduardo L.',5,
  'La mejor experiencia VIP que he tenido. Vale absolutamente cada peso.',true),
((SELECT id FROM escorts WHERE slug='isabella-m'),'Javier R.',5,
  'Isabella es extraordinaria. Discreta, inteligente y apasionada.',true),
((SELECT id FROM escorts WHERE slug='camila-v'),'Miguel S.',5,
  'La experiencia GFE que siempre había buscado. 100% recomendada.',true);


-- ── FIN DEL SCHEMA ──────────────────────────────────────────────
-- Cuando termines, ve a Table Editor y verifica que las 6 tablas
-- aparezcan con datos. Luego copia el Project URL y la Anon Key
-- desde Settings → API y dáselos a Claude Code.
