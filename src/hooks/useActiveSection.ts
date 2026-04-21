'use client'

import { useEffect, useState } from 'react'

export function useActiveSection(
  sectionIds: string[],
  rootMargin = '-20% 0px -70% 0px'
) {
  const [activeId, setActiveId] = useState(sectionIds[0] || '')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id)
        },
        { rootMargin, threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [sectionIds, rootMargin])

  return activeId
}
