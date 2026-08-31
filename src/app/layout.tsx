import type { Metadata } from 'next';
import { Inter, Lora } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import PublicKioskWrapper from '@/components/kiosk/PublicKioskWrapper';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });

export const metadata: Metadata = {
  title: 'Casa de la Memoria Cumbal - Archivo & Salvaguarda',
  description: 'Centro cultural y Archivo General. Desarrollamos estrategias de salvaguarda y protección de las memorias y el patrimonio cultural del sur de Colombia.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${lora.variable}`}>
      <body className="flex flex-col min-h-screen bg-crema text-cafe antialiased">
        <AuthProvider>
          <Navbar />
          <LoginModal />
          <PublicKioskWrapper />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
