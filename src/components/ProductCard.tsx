'use client';

import React, { useState } from 'react';
import { Plus, MessageCircle } from 'lucide-react';
import { Product, useCart } from '@/context/CartContext';
import ImageModal from './ImageModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const allImages = product.images && product.images.length > 0
    ? [product.image, ...product.images]
    : [product.image];

  const handleMouseEnter = () => {
    if (allImages.length > 1 && imageIndex === 0) {
      setImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setImageIndex(0);
  };

  const minSwipeDistance = 40;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && allImages.length > 1) {
      setImageIndex((prev) => (prev + 1) % allImages.length);
    }
    if (isRightSwipe && allImages.length > 1) {
      setImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
  };

  const displayImage = allImages[imageIndex] || allImages[0];

  return (
    <div className="group relative bg-[#F5EFE0] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#D4C4A8]">
      <div
        className="aspect-square relative overflow-hidden bg-[#E8DCC8] cursor-zoom-in"
        onClick={() => setIsModalOpen(true)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEndHandler}
      >
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />

        {allImages.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
            {allImages.map((_, i) => (
              <span
                key={i}
                className={`block w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  imageIndex === i
                    ? 'bg-white scale-125'
                    : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isFeatured && (
            <span className="bg-[#EBB6A4] text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg overflow-hidden">
              DESTACADO
            </span>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="bg-[#dfa99c] text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg overflow-hidden">
              OFERTA
            </span>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col h-[180px]">
        <h3 className="text-lg font-semibold text-[#5D4E37] mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-[#8B7355] mb-4 line-clamp-2">
          {product.description || 'Souvenir artesanal hecho con amor.'}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-[#8B7355] line-through">
                ${product.originalPrice.toLocaleString('es-AR')}
              </span>
            )}
            <span className="text-xl font-bold text-[#E8A0A0]">
              {product.price > 0 ? `$${product.price.toLocaleString('es-AR')}` : '$'}
            </span>
          </div>
          {product.stock !== undefined && product.stock <= 0 ? (
            <a
              href={`https://wa.me/5491163746491?text=${encodeURIComponent(`Hola! Quería saber si tenés stock de: ${product.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 justify-center px-4 h-10 rounded-full bg-white border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all shadow-md text-sm font-bold whitespace-nowrap active:scale-95 group/btn"
              title="Agotado - Consultar por WhatsApp"
            >
              <MessageCircle className="w-4 h-4 group-hover/btn:animate-pulse" />
              <span>Consultar!</span>
            </a>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#EBB6A4] text-white hover:bg-[#dfa99c] transition-all active:scale-95 shadow-lg"
              aria-label="Agregar al carrito"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={allImages}
        altText={product.name}
      />
    </div>
  );
};

export default ProductCard;