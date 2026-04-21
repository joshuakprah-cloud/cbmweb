import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

const PageHero = ({ title, subtitle }: PageHeroProps) => {
  return (
    <>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-[#F8FAFC] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">
              <ChevronRightIcon className="w-4 h-4" />
            </li>
            <li aria-current="page" className="text-gray-900 font-medium">About</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-xl text-gray-600 leading-relaxed max-w-3xl">
              {subtitle}
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default PageHero;
