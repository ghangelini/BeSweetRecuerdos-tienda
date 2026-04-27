const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
envContent.split('\n').forEach(line => {
  if (line.includes('=')) {
    const [key, ...value] = line.split('=');
    process.env[key.trim()] = value.join('=').trim();
  }
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Faltan variables de entorno');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const productsDir = path.join(__dirname, '..', 'productos');

const products = [
  { name: 'Souvenirs para Bombon', price: 500, category: 'bombones', order: 1 },
  { name: 'Cuaderno Personalizado', price: 2500, category: 'varios', order: 2 },
  { name: 'Gorra Bordada', price: 3500, category: 'varios', order: 3 },
  { name: 'Remera con Nombre', price: 2800, category: 'varios', order: 4 },
  { name: 'Gorra Mickey', price: 3200, category: 'varios', order: 5 },
  { name: 'Almohadon Personalizado', price: 2200, category: 'varios', order: 6 },
  { name: 'Set de Tazas', price: 1800, category: 'tazas', order: 7 },
  { name: 'Taza con Nombre', price: 1500, category: 'tazas', order: 8 },
  { name: 'Mate Personalizado', price: 2000, category: 'mates', order: 9 },
  { name: 'Llavero de Acrilico', price: 800, category: 'llaveros', order: 10 },
  { name: 'Llavero de madera', price: 600, category: 'llaveros', order: 11 },
  { name: 'Imán Nevera', price: 400, category: 'varios', order: 12 },
  { name: 'Display de Fotos', price: 2800, category: 'varios', order: 13 },
  { name: 'Caja de Regalo', price: 1500, category: 'cajas', order: 14 },
  { name: 'Bolsa Ecológica', price: 1200, category: 'varios', order: 15 },
];

async function uploadProducts() {
  console.log('Iniciando subida...');
  
  const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  console.log(`Encontradas ${files.length} imágenes`);
  
  let uploaded = 0;
  
  for (let i = 0; i < products.length && i < files.length; i++) {
    const file = files[i];
    const product = products[i];
    const filePath = path.join(productsDir, file);
    
    try {
      const fileBuffer = fs.readFileSync(filePath);
      const ext = path.extname(file);
      const fileName = `${Date.now()}_${i}${ext}`;
      
      const { data, error } = await supabase.storage
        .from('products')
        .upload(fileName, fileBuffer, { contentType: `image/${ext.slice(1)}` });
      
      if (error) {
        console.error(`Error subiendo ${file}:`, error.message);
        continue;
      }
      
      const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(fileName);
      
      const { error: insertError } = await supabase
        .from('products')
        .insert({
          name: product.name,
          description: `Souvenir personalizado - ${product.category}`,
          price: product.price,
          image: publicUrl,
          stock: 50,
          order_index: product.order,
          category: product.category,
        });
      
      if (insertError) {
        console.error(`Error insertando ${product.name}:`, insertError.message);
      } else {
        console.log(`✓ Subido: ${product.name}`);
        uploaded++;
      }
    } catch (err) {
      console.error(`Error procesando ${file}:`, err.message);
    }
  }
  
  console.log(`\nTotal subidos: ${uploaded}/${products.length}`);
}

uploadProducts().catch(console.error);