'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Product } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import CartSidebar from '@/components/CartSidebar';
import WhatsAppButton from '@/components/WhatsAppButton';
import { formatCategoryLabel, mapProductRecord } from '@/lib/products';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ALL_FILTER = 'all';

const CATEGORIAS_MANUALES = ['cajas', 'varios','adornos','velas','fragancias','miel'];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(CATEGORIAS_MANUALES);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>(ALL_FILTER);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: productsData, error: productsError } = await supabase
          .from('productos')
          .select('*')
          .order('order_index', { ascending: true, nullsFirst: false });

        if (productsError) throw productsError;

        if (productsData && productsData.length > 0) {
          setProducts(productsData.map(mapProductRecord));
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const categoryItems = [
    { value: ALL_FILTER, label: 'Todos', count: products.length },
    ...categories.map(cat => ({
      value: cat,
      label: formatCategoryLabel(cat),
      count: products.filter(p => p.category === cat).length
    })).filter(item => item.count > 0)
  ];

  const filterItems = [
    {
      value: ALL_FILTER,
      label: 'Todos',
      count: products.length,
    },
    ...categories.map(cat => ({
      value: cat,
      label: formatCategoryLabel(cat),
      count: products.filter(p => p.category === cat).length
    })).filter(item => item.count > 0)
  ];

  const filteredProducts =
    activeCategory === ALL_FILTER
      ? products
      : products.filter((product) => product.category === activeCategory);

  const scrollFilters = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === 'right' ? 320 : -320,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-[#ECE4D6] pb-20 transition-colors duration-300">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WhatsAppButton />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="bg-[#F5EFE0] rounded-3xl shadow-xl p-6 sm:p-8 border border-[#D4C4A8] transition-colors duration-300">
          <div className="mb-6 sm:mb-7">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8B7355]">
              Recuerdos artesanales 💟
            </p>
            <h1 className="mt-2 text-3xl font-bold leading-tight text-[#EBB4A4] sm:text-4xl">
              Souvenirs personalizados 
            </h1>
            <p className="mt-3 max-w-3xl text-sm text-[#8B7355] sm:text-base">
              Identificadores, llaveros y más souvenirs personalizados para tu evento especial.
            </p>
          </div>

          <div className="mb-8 rounded-[2rem] border border-[#D4C4A8] bg-[#FBFAF8] p-4">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8B7355]">
                  Filtrar por categoría
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollFilters('left')}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4C4A8] bg-[#F5EFE0] text-[#5D4E37] transition hover:border-[#EBB6A4] hover:text-[#EBB6A4]"
                  aria-label="Ver categorías anteriores"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollFilters('right')}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4C4A8] bg-[#F5EFE0] text-[#5D4E37] transition hover:border-[#EBB6A4] hover:text-[#EBB6A4]"
                  aria-label="Ver más categorías"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {filterItems.map((item) => {
                const isActive = item.value === activeCategory;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setActiveCategory(item.value)}
                    className={`group min-w-[118px] shrink-0 rounded-[28px] border px-4 py-3 text-left transition-all duration-200 ${
                      isActive
                        ? 'border-[#EBB6A4] bg-[#FDF9F6] shadow-lg shadow-[#ECCEB2]/30'
                        : 'border-[#ECCEB2] bg-[#F5EFE0] hover:-translate-y-0.5 hover:border-[#EBB6A4] hover:shadow-md'
                    }`}
                  >
                    <div
                      className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full border text-sm font-bold transition ${
                        isActive
                          ? 'border-[#EBB6A4] bg-[#F5EFE0] text-[#EBB6A4]'
                          : 'border-[#ECCEB2] bg-[#FDF9F6] text-[#BBCBCA] group-hover:text-[#EBB6A4]'
                      }`}
                    >
                      {item.label.slice(0, 2).toUpperCase()}
                    </div>
                    <p className={`text-sm font-semibold ${isActive ? 'text-[#9a8a7a]' : 'text-stone-700'}`}>
                      {item.label}
                    </p>
                    <p className="text-xs text-stone-400">
                      {item.count} {item.count === 1 ? 'producto' : 'productos'}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-100 aspect-square rounded-2xl" />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-[#ECCEB2] bg-[#ECCEB2]/10 px-6 py-14 text-center">
              <p className="text-lg font-semibold text-stone-700">
                No hay productos en esta categoría.
              </p>
              <p className="mt-2 text-sm text-stone-500">
                Elegí otra categoría o cargá productos desde el panel admin.
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-8 py-4 text-center">
        <p className="text-[#8B7355] text-sm">
          © {new Date().getFullYear()} BeSweet Recuerdos | Desarrollado por{' '}
          <a
            href="https://www.ga-labs.com.ar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#EBB6A4] transition-colors font-medium underline-offset-4 hover:underline"
          >
            GA-Labs
          </a>
        </p>
      </footer>
    </div>
  );
}