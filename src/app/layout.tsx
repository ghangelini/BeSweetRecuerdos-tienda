import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'BeSweet Recuerdos',
  description: 'Souvenirs personalizados - Recuerdos diseñados para vos',
  keywords: ['souvenirs', 'recuerdos', 'personalizado', 'regalos', 'velas', 'difusores'],
  authors: [{ name: 'BeSweet Recuerdos' }],
  openGraph: {
    title: 'BeSweet Recuerdos',
    description: 'Souvenirs personalizados - Recuerdos diseñados para vos',
    url: 'https://besweetrecuerdos.com',
    siteName: 'BeSweet Recuerdos',
    images: [
      {
        url: '/logo.jpg',
        width: 500,
        height: 500,
        alt: 'BeSweet Recuerdos Logo',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BeSweet Recuerdos',
    description: 'Souvenirs personalizados - Recuerdos diseñados para vos',
    images: ['/logo.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}