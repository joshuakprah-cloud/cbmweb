'use client'

import { useActiveSection } from '@/hooks/useActiveSection'
import Link from 'next/link'

export const sections = [
  { id: 'who-we-are', label: 'Who We Are' },
  { id: 'our-story', label: 'Our Story' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'beliefs', label: 'Beliefs & Values' },
]

export function useAboutSidebar() {
  const activeId = useActiveSection(sections.map((s) => s.id))

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return { activeId, scrollTo }
}

export function DesktopSidebar() {
  const { activeId, scrollTo } = useAboutSidebar()

  return (
    <aside className="sticky top-0 h-screen hidden lg:flex flex-col border-l border-gray-200 bg-gray-50 w-64 flex-shrink-0 px-6 py-12">
      <p className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-6">
        About
      </p>

      <nav className="flex flex-col gap-1">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`text-left text-sm px-3 py-2 rounded-lg transition-colors w-full ${
              activeId === id
                ? 'font-semibold text-gray-900 bg-gray-100 border-l-2 border-teal-600'
                : 'font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-8 border-t border-gray-100">
        <p className="text-xs text-gray-400 mb-3">Have questions?</p>
        <Link
          href="/connect/contact"
          className="text-sm font-medium text-teal-600 hover:text-teal-700 hover:underline underline-offset-4 transition-colors"
        >
          Get in Touch →
        </Link>
      </div>
    </aside>
  )
}

export function MobilePillNav() {
  const { activeId, scrollTo } = useAboutSidebar()

  return (
    <div className="lg:hidden sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 overflow-x-auto flex gap-2 scrollbar-hide">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className={`flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-full transition-colors ${
            activeId === id
              ? 'bg-teal-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default function AboutSidebar() {
  return (
    <>
      <DesktopSidebar />
      <MobilePillNav />
    </>
  )
}
