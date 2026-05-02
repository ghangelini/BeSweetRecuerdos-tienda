'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Store, Instagram } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface NavbarProps {
  onCartClick?: () => void;
  showCart?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick, showCart = true }) => {
  const { totalItems } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5EFE0] border-b border-[#D4C4A8] shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex-shrink-0 flex items-center pr-4 group">
            <img
              src="/logo.jpg"
              alt="BeSweet Recuerdos Logo"
              className="h-16 w-auto object-contain mix-blend-multiply transition-transform group-hover:scale-105"
            />
            <div className="ml-3 hidden sm:flex flex-col items-center justify-center transition-all group-hover:scale-105">
              <span className="text-4xl text-[#F29CA3] leading-none" style={{ fontFamily: 'var(--font-great-vibes)' }}>
                Besweet
              </span>
              <span className="text-lg text-[#C2B176] tracking-[0.2em] -mt-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                recuerdos
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-2 border-r border-[#D4C4A8] pr-2 sm:pr-4">
              <a
                href="https://www.instagram.com/besweetrecuerdos/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EBB6A4] hover:text-[#E8A593] transition-colors p-2 hover:bg-[#EBB6A4]/10 rounded-full"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>

              <a
                href="https://wa.me/5491131301425?text=Hola!%20Vi%20tu%20tienda%20y%20me%20gustar%C3%ADa%20consultar%20por%20productos."
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EBB6A4] hover:text-[#E8A593] transition-colors p-2 hover:bg-[#EBB6A4]/10 rounded-full"
                aria-label="Contactar por WhatsApp"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 sm:w-6 sm:h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>

            <Link 
              href="/tienda"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#EBB6A4] text-white font-medium hover:bg-[#E8A593] transition-colors"
            >
              <Store className="w-5 h-5" />
              <span className="hidden sm:inline">Ir a la Tienda</span>
            </Link>

            {showCart && onCartClick && (
              <button
                onClick={onCartClick}
                className="relative p-2 text-[#E8B4B4] hover:text-[#EBB6A4] transition-colors"
                aria-label="Ver carrito"
              >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#EBB6A4] rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;