import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = ({ testimonies, headline, testimonials, button }: { testimonies?: any[], headline?: string, testimonials?: any[], button?: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayedTestimonies = (testimonials || testimonies || []).slice(0, 4);

  if (displayedTestimonies.length === 0) return null;

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % displayedTestimonies.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + displayedTestimonies.length) % displayedTestimonies.length);
  };

  return (
    <section className="py-16 bg-background dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-inter text-foreground dark:text-white">{headline || 'Lives Being Changed'}</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Carousel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {displayedTestimonies.map((testimony, index) => (
                <div key={testimony._id || index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-card dark:bg-gray-800 border border-border rounded-lg p-8 shadow-lg text-center">
                    <Quote className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
                    <p className="text-lg text-foreground dark:text-white mb-6 italic">"{testimony.message || testimony}"</p>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">- {testimony.name || 'Anonymous'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {displayedTestimonies.length > 1 && (
            <>
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-8 space-x-2">
                {displayedTestimonies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="text-center mt-8">
          <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors">
            {button || 'Share Your Story'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
