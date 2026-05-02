'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Store, ArrowRight, Pause, Play } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import WhatsAppButton from '@/components/WhatsAppButton';

const images = [
  '/images/carrusel-1.jpg',
  '/images/carrusel-2.jpg',
  '/images/carrusel-3.jpg',
  '/images/carrusel-4.jpg',
  '/images/carrusel-5.jpg',
  '/images/carrusel-6.jpg',
  '/images/carrusel-7.jpg',
  '/images/carrusel-8.jpg',
  '/images/carrusel-9.jpg'
];

const backgrounds = [
  'rgba(218, 120, 87, 0.15)',
  'rgba(132, 159, 68, 0.15)',
  'rgba(193, 145, 22, 0.15)',
  'rgba(189, 137, 76, 0.15)',
  'rgba(188, 84, 22, 0.15)',
  'rgba(161, 117, 69, 0.15)',
  'rgba(239, 90, 134, 0.15)',
  'rgba(224, 187, 68, 0.15)',
  'rgba(54, 89, 181, 0.15)'
];

export default function LandingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-play the carousel
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlaying, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div 
      className="min-h-screen transition-colors duration-1000 ease-in-out"
      animate={{ backgroundColor: backgrounds[currentIndex] }}
    >
      <Navbar showCart={false} />

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        


        {/* Carousel */}
        <div className="relative w-full max-w-5xl lg:max-w-6xl h-[60vh] md:h-[75vh] rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/50 bg-white/20 backdrop-blur-sm">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="absolute inset-0 w-full h-full object-contain p-4"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </AnimatePresence>

          {/* Gradient Overlay for better text visibility if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

          {/* Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 text-[#8B7355] hover:bg-white transition-all hover:scale-110 shadow-lg backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 text-[#8B7355] hover:bg-white transition-all hover:scale-110 shadow-lg backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Play/Pause & Hourglass Controls */}
          <div className="absolute top-4 right-4 flex gap-2">

            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-white/70 text-[#8B7355] hover:bg-white transition-all hover:scale-110 shadow-lg backdrop-blur-sm"
              aria-label={isPlaying ? 'Pausar carrusel' : 'Reproducir carrusel'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Link 
            href="/tienda"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-white bg-[#EBB6A4] rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
            <span className="relative flex items-center gap-2">
              <Store className="w-6 h-6" />
              Ingresar a la Tienda
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>

      </main>

      <WhatsAppButton />

      <footer className="w-full py-6 text-center z-10 relative mt-auto">
        <p className="text-[#8B7355] text-sm">
          © 2026 BesweetRecuerdos. | Desarrollado por:{' '}
          <a
            href="https://www.ga-labs.com.ar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#EBB6A4] transition-colors font-bold underline-offset-4 hover:underline"
          >
            GA-Labs
          </a>
        </p>
      </footer>
    </motion.div>
  );
}
