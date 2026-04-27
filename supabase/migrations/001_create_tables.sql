-- Script para crear las tablas necesarias en Supabase
-- Besweet Recuerdo Store

-- Tabla de productos
CREATE TABLE IF NOT EXISTS public.products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  image TEXT,
  images TEXT[],
  stock INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de pedidos/órdenes
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mp_preference_id TEXT,
  mp_payment_id TEXT,
  items JSONB NOT NULL,
  total_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  shipping_address TEXT,
  shipping_cp TEXT,
  shipping_cost NUMERIC DEFAULT 0,
  shipping_zone TEXT
);

-- Habilitar Row Level Security (opcional, por si se usa auth)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Políticas para acceso público a lectura (ajustar según necesidades)
CREATE POLICY "Allow public read products" ON public.products
  FOR SELECT USING (true);

CREATE POLICY "Allow public read orders" ON public.orders
  FOR SELECT USING (true);

-- Índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS products_category_idx ON public.products (category);
CREATE INDEX IF NOT EXISTS products_order_idx ON public.products (order_index);
CREATE INDEX IF NOT EXISTS orders_created_idx ON public.orders (created_at);

-- Comentarios
COMMENT ON TABLE public.products IS 'Catálogo de productos de la tienda';
COMMENT ON TABLE public.orders IS 'Pedidos realizados por clientes';

-- Actualizar columna category con nuevos productos
-- Este update usa unaccent si está disponible
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'unaccent') THEN
    UPDATE public.products
    SET category = CASE
      WHEN lower(unaccent(name)) LIKE '%porta espiral%' THEN 'porta espiral'
      WHEN lower(unaccent(name)) LIKE '%porta vela%' THEN 'porta vela'
      WHEN lower(unaccent(name)) LIKE '%porta sahumerio%' THEN 'porta sahumerio'
      WHEN lower(unaccent(name)) LIKE '%porta saquito%' THEN 'porta saquito'
      WHEN lower(unaccent(name)) LIKE '%hornito%' THEN 'hornitos'
      WHEN lower(unaccent(name)) LIKE '%bandeja%' THEN 'bandejas'
      WHEN lower(unaccent(name)) LIKE '%plato%' THEN 'platos'
      WHEN lower(unaccent(name)) LIKE '%tabla%' THEN 'tablas'
      WHEN lower(unaccent(name)) LIKE '%taza%' THEN 'tazas'
      WHEN lower(unaccent(name)) LIKE '%mate%' THEN 'mates'
      WHEN lower(unaccent(name)) LIKE '%collar%' THEN 'collares'
      WHEN lower(unaccent(name)) LIKE '%cuenco%' THEN 'cuencos'
      WHEN lower(unaccent(name)) LIKE '%bowl%' THEN 'bowls'
      WHEN lower(unaccent(name)) LIKE '%vasija%' THEN 'vasijas'
      WHEN lower(unaccent(name)) LIKE '%cucharita%' THEN 'cucharitas'
      WHEN lower(unaccent(name)) LIKE '%salero%' THEN 'saleros'
      WHEN lower(unaccent(name)) LIKE '%panera%' THEN 'paneras'
      ELSE category
    END
    WHERE category IS NULL;
  END IF;
END $$;