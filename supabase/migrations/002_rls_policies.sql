-- Políticas RLS para operaciones de escritura en products
CREATE POLICY "Allow public insert products" ON public.products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update products" ON public.products
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete products" ON public.products
  FOR DELETE USING (true);

-- Políticas RLS para el storage bucket 'productos'
CREATE POLICY "Allow public upload productos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'productos');

CREATE POLICY "Allow public update productos" ON storage.objects
  FOR UPDATE USING (bucket_id = 'productos');

CREATE POLICY "Allow public delete productos" ON storage.objects
  FOR DELETE USING (bucket_id = 'productos');

CREATE POLICY "Allow public read productos" ON storage.objects
  FOR SELECT USING (bucket_id = 'productos');
