'use client';

import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#F5EFE0] shadow-2xl z-[70] flex flex-col"
          >
            <div className="p-6 border-b border-[#D4C4A8] flex items-center justify-between bg-[#E8DCC8]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-[#9a8a7a]" />
                <h2 className="text-xl font-bold text-gray-900">Tu Carrito</h2>
                <span className="text-sm bg-[#EBB6A4] text-white px-2 py-0.5 rounded-full font-medium">
                  {totalItems}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FBFAF8]">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-[#ECCEB2]/20 rounded-full flex items-center justify-center text-[#ECCEB2]">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <p className="text-gray-500 font-medium">Tu carrito está vacío</p>
                  <button
                    onClick={onClose}
                    className="text-[#EBB6A4] font-semibold hover:text-[#dfa99c] underline-offset-4 hover:underline"
                  >
                    Seguir comprando
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-[#5D4E37] truncate">{item.name}</h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[#9a8a7a] font-bold mb-3">{item.price > 0 ? `$${item.price.toLocaleString('es-AR')}` : '$'}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-gray-200 rounded-lg p-1 bg-gray-50">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-white rounded-md transition-colors"
                          >
                            <Minus className="w-3 h-3 text-gray-600" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-white rounded-md transition-colors"
                          >
                            <Plus className="w-3 h-3 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4">
                <div className="flex justify-between text-lg pt-2 border-t border-gray-200">
                  <span className="text-gray-600">Total</span>
                  <span className="font-extrabold text-[#9a8a7a] text-2xl">
                    ${totalPrice.toLocaleString('es-AR')}
                  </span>
                </div>
                <a
                  href={`https://wa.me/5491131301425?text=${encodeURIComponent('Hola! Quiero comprar: ' + cart.map(i => `${i.quantity}x ${i.name}`).join(', '))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#EBB6A4] text-white rounded-2xl font-bold text-lg hover:bg-[#dfa99c] transition-all active:scale-[0.98] shadow-lg text-center block"
                >
                  Comprar por WhatsApp
                </a>
                <p className="text-xs text-center text-gray-400">
                  Coordinamos el envío por WhatsApp.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;