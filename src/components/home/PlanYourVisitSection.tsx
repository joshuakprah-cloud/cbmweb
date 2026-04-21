'use client';

import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  ctaText: string;
  ctaLink: string;
}

interface PlanYourVisitSectionProps {
  title?: string;
  description?: string;
  faqItems?: FAQItem[];
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  contactLink?: string;
  defaultOpenFaqId?: string;
}

const defaultFaqItems: FAQItem[] = [
  {
    id: 'giving',
    question: 'Do I have to give money?',
    answer: "Not at all. Giving is never expected from first-time visitors. It's always voluntary and a personal decision. There's no pressure or obligation—simply come and experience the service.",
    ctaText: 'Learn More',
    ctaLink: '/im-new#faq',
  },
  {
    id: 'location',
    question: 'Where are you located and where do I park?',
    answer: "We're located at Taifa Burkina, Accra, Ghana. We have free on-site parking available for all attendees, with plenty of space and easy access to the church entrance.",
    ctaText: 'Get Directions',
    ctaLink: '/im-new#location',
  },
  {
    id: 'duration',
    question: 'How long is the service?',
    answer: 'Our services typically last about 75-90 minutes. This includes vibrant worship, a welcoming atmosphere, and an inspiring message that you can apply to your daily life.',
    ctaText: 'See What to Expect',
    ctaLink: '/im-new#what-to-expect',
  },
  {
    id: 'kids',
    question: 'What about my kids?',
    answer: "We have safe, fun environments for kids of all ages. Our children's ministry offers age-appropriate teaching and activities so your kids will love coming to church as much as you do.",
    ctaText: 'Learn About Kids Ministry',
    ctaLink: '/im-new#kids',
  },
];

const PlanYourVisitSection = ({
  title = 'Plan Your Visit',
  description = "What to expect when you visit",
  faqItems = defaultFaqItems,
  primaryCtaText = 'Plan Your Visit',
  primaryCtaLink = '/im-new',
  secondaryCtaText = 'Still have questions?',
  contactLink = '/contact',
  defaultOpenFaqId = 'location',
}: PlanYourVisitSectionProps) => {
  const items = faqItems?.length > 0 ? faqItems : defaultFaqItems;

  return (
    <section className="bg-gray-50 py-20 lg:py-28 pb-32 lg:pb-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {description}
          </p>
          <p className="text-gray-500 text-base max-w-xl mx-auto mt-3 italic">
            No pressure. No awkward moments. Just come as you are.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible defaultValue={defaultOpenFaqId} className="w-full">
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="bg-white rounded-lg mb-3 border border-gray-200 shadow-sm overflow-hidden">
              <AccordionTrigger className="px-6 py-4 text-left text-gray-900 font-semibold hover:no-underline hover:bg-gray-50 transition-colors [&[data-state=open]]:bg-gray-50">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-gray-600 leading-relaxed mb-4">
                  {item.answer}
                </p>
                <Link
                  href={item.ctaLink}
                  className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium text-sm border-2 border-teal-600 rounded-md px-4 py-2 hover:bg-teal-50 transition-colors"
                >
                  {item.ctaText}
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Bottom CTAs */}
        <div className="mt-12 text-center">
          {/* Visitor Registration CTA - bordered style */}
          <Link 
            href="/im-new#visitor-form" 
            className="inline-flex items-center border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white font-semibold py-2.5 px-6 rounded-md transition-all duration-300 hover:scale-105 text-sm tracking-wide"
          >
            Let us know you're coming
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          
          <p className="mt-6 text-gray-500 text-sm">
            {secondaryCtaText}{' '}
            <Link href={contactLink} className="text-teal-600 hover:text-teal-700 font-medium underline">
              Contact Us
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PlanYourVisitSection;
