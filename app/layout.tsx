import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'
import DesignInspector from '@/components/DesignInspector'
import { HeaderGate } from '@/components/header-gate'
import { SiteJsonLd } from '@/components/json-ld'
import { PERSON, SITE_URL, SITE_DESCRIPTION } from '@/lib/seo'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PERSON.name} — ${PERSON.jobTitle}`,
    template: `%s — ${PERSON.name}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: `${PERSON.name} Portfolio`,
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: `${PERSON.name} — Portfolio`,
    title: `${PERSON.name} — ${PERSON.jobTitle}`,
    description: SITE_DESCRIPTION,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PERSON.name} — ${PERSON.jobTitle}`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b0b0d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <SiteJsonLd />
        <SmoothScrollProvider>
          <div className="relative flex min-h-dvh flex-col">
            <HeaderGate>
              <SiteHeader />
            </HeaderGate>
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </SmoothScrollProvider>

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
