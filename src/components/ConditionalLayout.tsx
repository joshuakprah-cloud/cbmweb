'use client'

import { usePathname } from 'next/navigation'
import Navbar from './navbar/Navbar'
import AnnouncementBar from './layout/AnnouncementBar'
import { Footer } from './footer/Footer'

interface ConditionalLayoutProps {
  children: React.ReactNode
  navbarData?: any
  announcementData?: any
}

export default function ConditionalLayout({ children, navbarData, announcementData }: ConditionalLayoutProps) {
  const pathname = usePathname()
  const isStudioRoute = pathname?.startsWith('/studio')
  const isAdminRoute = pathname?.startsWith('/admin')
  const hideLayout = isStudioRoute || isAdminRoute

  return (
    <>
      {!hideLayout && (
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
      {!hideLayout && <Footer />}
    </>
  )
}
