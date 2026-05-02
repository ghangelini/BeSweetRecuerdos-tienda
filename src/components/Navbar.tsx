'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Store } from 'lucide-react';
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
            <span className="ml-3 text-2xl font-bold text-[#EBB4A4] tracking-tight hidden sm:block transition-colors group-hover:text-[#E8A593]">
              BeSweet Recuerdos
            </span>
          </Link>

          <div className="flex items-center gap-4">
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