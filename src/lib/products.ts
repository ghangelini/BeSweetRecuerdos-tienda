import { Product } from '@/context/CartContext';

export const PRODUCT_CATEGORIES = [
  'dulces',
  'sueltos',
  'cajas',
  'regalos',
  'alfajores',
  'galletas',
  'bombones',
  'tazas',
  'mates',
  'varios',
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

interface ProductRecord {
  id: string | number;
  name: string;
  description?: string | null;
  price: string | number;
  original_price?: string | number | null;
  image: string;
  images?: string[] | null;
  stock?: string | number | null;
  is_featured?: boolean | null;
  order_index?: string | number | null;
  category?: string | null;
}

const CATEGORY_ALIASES: Record<string, ProductCategory> = {
  dulce: 'dulces',
  dulces: 'dulces',
  einzeln: 'sueltos',
 单独: 'sueltos',
  caja: 'cajas',
  cajas: 'cajas',
  regalo: 'regalos',
  regalos: 'regalos',
  alfajor: 'alfajores',
  alfajores: 'alfajores',
  galleta: 'galletas',
  galletas: 'galletas',
  bombon: 'bombones',
  bombones: 'bombones',
};

const CATEGORY_KEYWORDS: Array<{ category: ProductCategory; keywords: string[] }> = [
  { category: 'dulces', keywords: ['dulce', 'dulces'] },
  { category: 'sueltos', keywords: ['suelto', 'sueltos', 'individual'] },
  { category: 'cajas', keywords: ['caja', 'cajas'] },
  { category: 'regalos', keywords: ['regalo', 'regalos', 'kit'] },
  { category: 'alfajores', keywords: ['alfajor', 'alfajores'] },
  { category: 'galletas', keywords: ['galleta', 'galletas'] },
  { category: 'bombones', keywords: ['bombon', 'bombones'] },
  { category: 'tazas', keywords: ['taza', 'tazas'] },
  { category: 'mates', keywords: ['mate', 'mates'] },
  { category: 'varios', keywords: ['vario', 'varios'] },
];

function normalizeText(value?: string | null) {
  return (value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function normalizeCategory(value?: string | null): ProductCategory | undefined {
  const normalized = normalizeText(value);
  if (!normalized) return undefined;
  return CATEGORY_ALIASES[normalized];
}

export function formatCategoryLabel(category: string) {
  if (!category) return '';
  return category.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function inferProductCategory(product: Pick<Product, 'name' | 'description' | 'category'>) {
  const explicitCategory = normalizeCategory(product.category);
  if (explicitCategory) return explicitCategory;

  const haystack = normalizeText(`${product.name} ${product.description || ''}`);
  const matchedCategory = CATEGORY_KEYWORDS.find(({ keywords }) =>
    keywords.some((keyword) => haystack.includes(keyword))
  );

  return matchedCategory?.category;
}

export function mapProductRecord(item: ProductRecord): Product {
  return {
    id: String(item.id),
    name: item.name,
    description: item.description ?? undefined,
    price: Number(item.price),
    originalPrice: item.original_price ? Number(item.original_price) : undefined,
    image: item.image,
    images: item.images || [],
    stock: item.stock !== null && item.stock !== undefined ? Number(item.stock) : undefined,
    isFeatured: item.is_featured ?? undefined,
    order_index: item.order_index !== null && item.order_index !== undefined ? Number(item.order_index) : undefined,
    category: item.category ?? undefined,
  };
}