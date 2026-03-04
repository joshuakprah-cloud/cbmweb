'use client'

import { useState } from 'react'
import { PortableText } from '@portabletext/react'

interface Belief {
  title: string
  description: any[]
}

interface BeliefsAccordionProps {
  beliefs: Belief[]
}

export default function BeliefsAccordion({ beliefs }: BeliefsAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {beliefs.map((belief, index) => (
        <div key={index} className="border border-gray-200 rounded-lg">
          <button
            className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg"
            onClick={() => toggleAccordion(index)}
            aria-expanded={openIndex === index}
            aria-controls={`belief-content-${index}`}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{belief.title}</h3>
              <span className="text-2xl">
                {openIndex === index ? '−' : '+'}
              </span>
            </div>
          </button>
          <div
            id={`belief-content-${index}`}
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
            aria-hidden={openIndex !== index}
          >
            <div className="px-6 pb-4 prose prose-lg max-w-none">
              <PortableText value={belief.description} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
