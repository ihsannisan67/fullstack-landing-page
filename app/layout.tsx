import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

// Font configurations
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

// Metadata configuration
export const metadata: Metadata = {
  title: 'LangkahHijau | Jasa Reboisasi & Rehabilitasi Lahan Profesional',
  description:
    'Spesialis jasa reboisasi profesional di Indonesia. Kami membantu memulihkan lahan bekas tambang, perkebunan, dan lahan kritis menjadi hutan produktif dengan survival rate 85%+. Konsultasi gratis.',
  keywords: [
    'jasa reboisasi',
    'rehabilitasi lahan',
    'penanaman pohon',
    'reforestasi',
    'mangrove',
    'carbon credit',
    'Indonesia',
  ],
  authors: [{ name: 'LangkahHijau' }],
  creator: 'LangkahHijau',
  publisher: 'LangkahHijau',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://langkahhijau.id'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: 'LangkahHijau',
    title: 'LangkahHijau | Jasa Reboisasi & Rehabilitasi Lahan Profesional',
    description:
      'Spesialis jasa reboisasi profesional. Setiap lahan adalah kesempatan untuk pulih.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LangkahHijau - Reboisasi Profesional',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LangkahHijau | Jasa Reboisasi Profesional',
    description: 'Pulihkan lahan terdegradasi menjadi hutan produktif.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${dmSans.variable} ${plusJakarta.variable} ${playfair.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  )
}