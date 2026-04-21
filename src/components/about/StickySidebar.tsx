'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'

const ABOUT_SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'who-we-are', label: 'Who We Are' },
  { id: 'our-story', label: 'Our Story' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'faqs', label: 'FAQs' },
]

const BELIEFS_SECTIONS = [
  { id: 'beliefs', label: 'Beliefs' },
  { id: 'what-we-value', label: 'Values' },
  { id: 'what-we-do', label: 'What We Do' },
  { id: 'what-we-believe', label: 'Doctrine' },
  { id: 'how-we-think', label: 'Principles' },
]

export default function StickySidebar() {
  const pathname = usePathname()
  const isBeliefsPage = pathname === '/about/beliefs'
  const sections = isBeliefsPage ? BELIEFS_SECTIONS : ABOUT_SECTIONS

  const [activeId, setActiveId] = useState(sections[0]?.id || '')
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach((section) => {
      const el = document.getElementById(section.id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(section.id)
          }
        },
        { threshold: 0.3 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [sections])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const activeIndex = sections.findIndex((s) => s.id === activeId)

  return (
    <nav
      ref={navRef}
      className="hidden lg:block fixed right-8 top-36 z-40"
      aria-label="Page sections"
    >
      <div className="relative flex items-start gap-4">
        {/* Links */}
        <div className="flex flex-col items-end space-y-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className={`text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded px-1 ${
                activeId === section.id
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-400 font-medium hover:text-gray-700'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Vertical indicator line with active bar */}
        <div className="relative w-[2px] h-full min-h-[200px] bg-gray-200 rounded-full">
          {/* Active indicator bar */}
          <div
            className="absolute right-0 w-[2px] bg-gray-900 rounded-full transition-all duration-300 ease-out"
            style={{
              height: '18px',
              top: activeIndex >= 0 ? `${activeIndex * 32 + 2}px` : '2px',
            }}
          />
        </div>
      </div>
    </nav>
  )
}
