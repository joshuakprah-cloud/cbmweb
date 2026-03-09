'use client'

import { useState } from 'react'

interface Testimonial {
  quote: string
  name: string
}

interface TestimonialCarouselProps {
  testimonials?: Testimonial[]
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Fallback testimonials
  const defaultTestimonials: Testimonial[] = [
    {
      quote: "ThaGospel Church helped me grow spiritually and discover my purpose.",
      name: "Sarah Johnson"
    },
    {
      quote: "This church truly feels like home. The community is incredibly welcoming.",
      name: "Michael Thompson"
    },
    {
      quote: "The biblical teaching here has transformed my life and family.",
      name: "Grace Williams"
    },
    {
      quote: "I found genuine spiritual growth and meaningful connections at ThaGospel.",
      name: "David Brown"
    }
  ]

  const displayTestimonials = testimonials || defaultTestimonials

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length)
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12">
        <div className="text-center">
          <blockquote className="text-lg md:text-xl italic text-gray-700 dark:text-gray-300 mb-6">
            "{displayTestimonials[currentIndex].quote}"
          </blockquote>
          <cite className="text-blue-600 dark:text-blue-400 font-semibold">
            — {displayTestimonials[currentIndex].name}
          </cite>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={prevTestimonial}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots indicator */}
          <div className="flex space-x-2">
            {displayTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-blue-600'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
