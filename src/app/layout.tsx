import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../components/theme-provider'
import { client } from '../sanity/lib/client'
import { navbarQuery } from 'sanity/lib/queries'
import ConditionalLayout from '../components/ConditionalLayout'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
})

export const metadata: Metadata = {
  title: 'ThaGospel Church',
  description: 'Welcome to ThaGospel Church, where faith comes alive and lives are transformed through the power of God\'s word. Join our vibrant community for worship, spiritual growth, and community impact.',
  keywords: ['church', 'gospel', 'worship', 'faith', 'community', 'ThaGospel'],
  manifest: '/manifest.json',
  openGraph: {
    title: 'ThaGospel Church',
    description: 'Join ThaGospel Church for inspiring worship and community outreach.',
    url: 'https://yourwebsite.com',
    siteName: 'ThaGospel Church',
    images: [
      {
        url: 'https://yourwebsite.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ThaGospel Church',
    description: 'Join ThaGospel Church for inspiring worship and community outreach.',
    images: ['https://yourwebsite.com/twitter-image.jpg'],
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let navbarData = null
  let announcementData = null

  try {
    const data = await client.fetch(navbarQuery, {}, { next: { revalidate: 3600 } })
    navbarData = data?.navbar
    announcementData = data?.navbar?.announcementBar
  } catch (error) {
    console.error('Error fetching navbar data:', error)
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light">
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-teal-500 focus:text-white focus:rounded"
          >
            Skip to main content
          </a>
          <ConditionalLayout 
            navbarData={navbarData} 
            announcementData={announcementData}
          >
            {children}
          </ConditionalLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
