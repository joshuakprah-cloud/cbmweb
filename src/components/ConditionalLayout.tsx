'use client'

import { usePathname } from 'next/navigation'
import Navbar from './navbar/Navbar'
import AnnouncementBar from './layout/AnnouncementBar'
import Footer from './Footer'

interface ConditionalLayoutProps {
  children: React.ReactNode
  navbarData?: any
  announcementData?: any
}

export default function ConditionalLayout({ children, navbarData, announcementData }: ConditionalLayoutProps) {
  const pathname = usePathname()
  const isStudioRoute = pathname?.startsWith('/studio')

  return (
    <>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-teal-500 focus:text-white focus:rounded"
      >
        Skip to main content
      </a>
      {!isStudioRoute && (
        <>
          <AnnouncementBar
            isActive={announcementData?.isActive || false}
            message={announcementData?.message || ''}
            linkLabel={announcementData?.linkLabel}
            linkUrl={announcementData?.linkUrl}
          />
          <Navbar navbarData={navbarData} />
        </>
      )}
      <main id="main-content">{children}</main>
      {!isStudioRoute && <Footer />}
    </>
  )
}
