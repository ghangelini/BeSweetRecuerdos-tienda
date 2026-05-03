import type { Metadata } from 'next';
import { Great_Vibes, Playfair_Display } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';

const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400', variable: '--font-great-vibes' });
const playfair = Playfair_Display({ subsets: ['latin'], weight: '400', variable: '--font-playfair' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.besweetrecuerdos.com.ar'),
  title: 'BeSweet Recuerdos | Souvenirs y Recuerdos Personalizados en Zona Sur',
  description: 'Souvenirs y recuerdos personalizados para eventos en Zona Sur y Lanús. Velas de soja, difusores, regalos originales y más. Diseñados especialmente para vos.',
  keywords: [
    'souvenirs', 'recuerdos', 'personalizados', 'souvenirs personalizados', 
    'recuerdos personalizados', 'zona sur', 'lanus', 'souvenirs en lanus', 
    'souvenirs en zona sur', 'recuerdos para eventos', 'regalos', 'velas', 
    'velas de soja', 'difusores', 'regalos empresariales', 'souvenirs de nacimiento', 
    'souvenirs de bautismo', 'souvenirs de casamiento', 'BeSweet', 'BeSweet Recuerdos'
  ],
  authors: [{ name: 'BeSweet Recuerdos' }],
  openGraph: {
    title: 'BeSweet Recuerdos | Souvenirs y Recuerdos Personalizados en Zona Sur',
    description: 'Souvenirs y recuerdos personalizados para eventos en Zona Sur y Lanús. Velas de soja, difusores, regalos originales y más.',
    url: 'https://www.besweetrecuerdos.com.ar',
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
    title: 'BeSweet Recuerdos | Souvenirs y Recuerdos Personalizados en Zona Sur',
    description: 'Souvenirs y recuerdos personalizados para eventos en Zona Sur y Lanús. Velas de soja, difusores, regalos originales y más.',
    images: ['/logo.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${greatVibes.variable} ${playfair.variable}`}>
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