import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' })

export const metadata: Metadata = {
  title: 'Casa de la Memoria Cumbal',
  description: 'Centro cultural. Desarrollamos estrategias de salvaguarda y protección de las memorias y el patrimonio cultural de los pueblos indígenas del sur de Colombia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${lora.variable}`}>
      <body className="flex flex-col min-h-screen bg-crema text-cafe">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
