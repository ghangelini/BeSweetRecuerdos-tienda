'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Store, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const images = [
  '/images/carrusel-1.jpg',
  '/images/carrusel-2.jpg',
  '/images/carrusel-3.jpg',
  '/images/carrusel-4.jpg'
];

const backgrounds = [
  '#FCE4EC', // Soft Pink
  '#E3F2FD', // Soft Blue
  '#F3E5F5', // Soft Purple
  '#FFF3E0'  // Soft Peach
];

const messages = [
  { title: 'Momentos Inolvidables', text: 'Recuerdos personalizados para cada ocasión especial.' },
  { title: 'Detalles Únicos', text: 'Diseñados con amor para sorprender a tus invitados.' },
  { title: 'Aromas y Colores', text: 'Velas, fragancias y souvenirs que enamoran.' },
  { title: 'Calidad Artesanal', text: 'Cada pieza es única, creada especialmente para vos.' }
];

export default function LandingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play the carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
        
        {/* Hero Section */}
        <div className="text-center mb-10 mt-4">
          <motion.h1 
            key={`title-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#8B7355] mb-4"
          >
            {messages[currentIndex].title}
          </motion.h1>
          <motion.p 
            key={`text-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#8B7355]/80 max-w-2xl mx-auto"
          >
            {messages[currentIndex].text}
          </motion.p>
        </div>

        {/* Carousel */}
        <div className="relative w-full max-w-4xl aspect-[16/10] md:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/50">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
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
    </motion.div>
  );
}
