import type { Metadata } from 'next';
import { Inter, Lora, Oswald } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import FloatingBrandMark from '@/components/brand/FloatingBrandMark';
import { AuthProvider } from '@/context/AuthContext';
import { SiteSettingsProvider } from '@/context/SiteSettingsContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });
const oswald = Oswald({ subsets: ['latin'], weight: ['500', '600'], variable: '--font-oswald' });

export const metadata: Metadata = {
  title: 'Casa de la Memoria Cumbal - Archivo & Salvaguarda',
  description: 'Centro cultural y Archivo General. Desarrollamos estrategias de salvaguarda y protección de las memorias y el patrimonio cultural del sur de Colombia.',
  icons: {
    icon: [
      { url: '/images/hero-logo.png?v=3', type: 'image/png' },
      { url: '/icon.png?v=3', type: 'image/png' },
    ],
    shortcut: '/images/hero-logo.png?v=3',
    apple: '/images/hero-logo.png?v=3',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${lora.variable} ${oswald.variable}`}>
      <head>
        <link rel="icon" href="/images/hero-logo.png?v=3" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/images/hero-logo.png?v=3" type="image/png" />
        <link rel="apple-touch-icon" href="/images/hero-logo.png?v=3" />
      </head>
      <body className="flex flex-col min-h-screen bg-crema text-cafe antialiased">
        <SiteSettingsProvider>
          <AuthProvider>
            <Navbar />
            <LoginModal />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <FloatingBrandMark />
          </AuthProvider>
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
