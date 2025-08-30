import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, Architects_Daughter, Playfair_Display } from 'next/font/google'
import './globals.css'
import '../../mobile-optimization.css'
import ClientWrapper from '@/components/ClientWrapper'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'block',
  preload: true,
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'block',
  preload: true,
})

const architectsDaughter = Architects_Daughter({ 
  subsets: ['latin'],
  variable: '--font-architects-daughter',
  weight: '400',
  display: 'block',
  preload: true,
})

const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'block',
  preload: true,
})


export const metadata: Metadata = {
  title: 'Aureole Pharma Tech - Engineering Precision in Pharmaceutical Technology',
  description: 'Aureole Pharma Tech - Leading manufacturer of pharmaceutical equipment including stability chambers, instruments, and air samplers. Engineering precision in pharmaceutical technology.',
  keywords: 'pharmaceutical equipment, stability chambers, air samplers, pharma instruments, Aureole Pharma Tech',
  authors: [{ name: 'Aureole Pharma Tech' }],
  creator: 'Aureole Pharma Tech',
  publisher: 'Aureole Pharma Tech',
  robots: 'index, follow',
  openGraph: {
    title: 'Aureole Pharma Tech - Engineering Precision in Pharmaceutical Technology',
    description: 'Leading manufacturer of pharmaceutical equipment including stability chambers, instruments, and air samplers.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aureole Pharma Tech - Engineering Precision in Pharmaceutical Technology',
    description: 'Leading manufacturer of pharmaceutical equipment including stability chambers, instruments, and air samplers.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${architectsDaughter.variable} ${playfairDisplay.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-inter bg-background-light text-text-primary overflow-x-hidden">
        <ClientWrapper />
        {children}
      </body>
    </html>
  )
}
