-- Borra las tablas si ya existen (para poder correr el script varias veces)
DROP TABLE IF EXISTS company_configs;
DROP TABLE IF EXISTS report_types;
DROP TABLE IF EXISTS companies;

-- Empresas
CREATE TABLE companies (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE
);

-- Formatos de reporte disponibles
CREATE TABLE report_types (
    id        SERIAL PRIMARY KEY,
    code      VARCHAR(20)  NOT NULL UNIQUE,
    mime_type VARCHAR(150) NOT NULL
);

-- Marca de cada empresa, guardada en JSON
CREATE TABLE company_configs (
    id         SERIAL  PRIMARY KEY,
    company_id INTEGER NOT NULL UNIQUE REFERENCES companies(id) ON DELETE CASCADE,
    branding   JSONB   NOT NULL
);

-- Datos iniciales
INSERT INTO report_types (code, mime_type) VALUES
  ('xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'),
  ('csv',  'text/csv');

INSERT INTO companies (name, slug) VALUES ('Ara', 'ara'), ('D1', 'd1');

INSERT INTO company_configs (company_id, branding)
SELECT id, '{
  "logo": "https://upload.wikimedia.org/wikipedia/commons/4/40/Solo_letras_ara.jpg",
  "textos": { "titulo": "Reporte de viajes - Tiendas Ara" }
}'::jsonb
FROM companies WHERE slug = 'ara';

INSERT INTO company_configs (company_id, branding)
SELECT id, '{
  "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tiendas_D1_logo.svg/250px-Tiendas_D1_logo.svg.png",
  "textos": { "titulo": "Reporte de viajes - Tiendas D1" }
}'::jsonb
FROM companies WHERE slug = 'd1';