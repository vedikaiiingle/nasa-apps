import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3003'),
  title: 'Will It Rain On My Parade? | NASA Space Apps Challenge',
  description: 'Plan your outdoor events with confidence using NASA Earth observation data. Get weather probabilities for any location and date.',
  keywords: ['weather', 'NASA', 'space apps', 'outdoor events', 'weather prediction', 'earth observation'],
  authors: [{ name: 'Your Team Name' }],
  openGraph: {
    title: 'Will It Rain On My Parade? | NASA Space Apps Challenge',
    description: 'Plan your outdoor events with confidence using NASA Earth observation data.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Will It Rain On My Parade?',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Will It Rain On My Parade?',
    description: 'Plan your outdoor events with confidence using NASA Earth observation data.',
    images: ['/images/twitter-card.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {children}
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
