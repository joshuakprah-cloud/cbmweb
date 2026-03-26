import Image from 'next/image'
import Link from 'next/link'

interface ContentCardProps {
  image: string
  badge?: string
  title: string
  meta?: string
  description?: string
  cta?: {
    label: string
    href: string
  }
  sizes?: string
  priority?: boolean
}

export default function ContentCard({
  image,
  badge,
  title,
  meta,
  description,
  cta,
  sizes = '(max-width: 768px) 100vw, 33vw',
  priority = false,
}: ContentCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative aspect-[2/1] overflow-hidden">
        {badge && (
          <div className="absolute top-3 left-3 z-10 bg-teal-600 text-white px-2 py-1 text-xs font-medium rounded">
            {badge}
          </div>
        )}
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transform hover:scale-105 transition-transform duration-300"
          sizes={sizes}
          priority={priority}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        {meta && <p className="text-sm text-gray-500 mb-2">{meta}</p>}
        {description && (
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">{description}</p>
        )}
        {cta && (
          <Link
            href={cta.href}
            className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors duration-200"
          >
            {cta.label}
            <svg
              className="ml-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  )
}
