import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tienda | BeSweet Recuerdos — Velas, Difusores, Identificadores y Souvenirs',
  description:
    'Explorá nuestra tienda de souvenirs artesanales: identificadores, llaveros, velas de soja, difusores, cajas regalo, didácticos y más. Personalizados para casamientos, bautismos, baby showers y eventos en Zona Sur.',
  keywords: [
    'tienda souvenirs', 'identificadores personalizados', 'llaveros personalizados',
    'velas de soja personalizadas', 'difusores artesanales', 'cajas regalo',
    'souvenirs casamiento', 'souvenirs bautismo', 'souvenirs baby shower',
    'recuerdos personalizados zona sur', 'didácticos personalizados',
    'fragancias artesanales', 'miel artesanal', 'regalos originales',
    'BeSweet Recuerdos', 'souvenirs Lanús',
  ],
  openGraph: {
    title: 'Tienda | BeSweet Recuerdos — Velas, Difusores, Identificadores y Souvenirs',
    description:
      'Identificadores, llaveros, velas de soja, difusores y más souvenirs artesanales personalizados para tu evento especial.',
    url: 'https://www.besweetrecuerdos.com.ar/tienda',
    siteName: 'BeSweet Recuerdos',
    images: [
      {
        url: '/logo.jpg',
        width: 500,
        height: 500,
        alt: 'BeSweet Recuerdos — Tienda de Souvenirs',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
};

export default function TiendaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
