import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../../sanity/lib/image';

interface Sermon {
  title: string;
  slug: string;
  thumbnail?: any;
  seriesTitle?: string;
  publishedAt: string;
  duration?: string;
  videoUrl?: string | null;
  audioUrl?: string | null;
  speaker: {
    name: string;
    photo?: any;
  };
}

interface SermonsTeaserProps {
  sermons?: Sermon[];
}

const SermonsTeaser = ({ sermons }: SermonsTeaserProps) => {
  const hasSermons = sermons && sermons.length > 0;

  return (
    <section id="sermons" className="bg-gray-50 py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span 
            className="text-gray-600 italic"
            style={{ 
              fontSize: '18px',
              fontFamily: 'Georgia, serif'
            }}
          >
            Fresh Word
          </span>
          
          <h2 
            className="text-black font-bold mt-4 mb-6" 
            style={{ fontSize: '52px', lineHeight: '1.1' }}
          >
            Latest Messages
          </h2>
        </div>

        {/* Sermons Grid */}
        {hasSermons ? (
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {sermons.slice(0, 3).map((sermon, index) => (
              <div
                key={sermon.slug || index}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="aspect-video relative">
                  {sermon.thumbnail ? (
                    <Image
                      src={urlFor(sermon.thumbnail).width(400).height(225).url()}
                      alt={`${sermon.title} sermon thumbnail`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  ) : (
                    <div className="bg-gray-200 flex items-center justify-center w-full h-full text-gray-400 text-sm">
                      No thumbnail
                    </div>
                  )}
                  
                  {/* Series Badge */}
                  {sermon.seriesTitle && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-teal-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {sermon.seriesTitle}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Card Body */}
                <div className="p-6">
                  <h3 
                    className="text-black font-bold mb-3"
                    style={{ fontSize: '19px', lineHeight: '1.2' }}
                  >
                    {sermon.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">{sermon.speaker.name}</p>
                  <p className="text-gray-600 text-sm mb-4">
                    {new Date(sermon.publishedAt).toLocaleDateString()}
                    {sermon.duration && ` • ${sermon.duration}`}
                  </p>
                  
                  {/* Watch/Listen Link - opens in new tab for external URLs */}
                  {sermon.videoUrl ? (
                    <a
                      href={sermon.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-teal-600 hover:text-teal-700 font-semibold transition-colors"
                      aria-label={`Watch ${sermon.title}`}
                    >
                      Watch
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href={`/sermons/${sermon.slug}`}
                      className="inline-flex items-center text-teal-600 hover:text-teal-700 font-semibold transition-colors"
                      aria-label={`Listen to ${sermon.title}`}
                    >
                      Listen
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-white rounded-2xl mb-16">
            <div className="text-6xl mb-4">🎧</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No sermons available</h3>
            <p className="text-gray-600 mb-4">Check back soon for new messages from our pastors.</p>
            <Link
              href="/sermons"
              className="inline-flex items-center text-teal-600 hover:text-teal-700 font-semibold"
            >
              Browse all sermons
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/sermons"
            className="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-8 rounded-full transition-all duration-200 hover:scale-105"
            style={{ fontSize: '13px', letterSpacing: '0.05em' }}
          >
            VIEW ALL MESSAGES
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SermonsTeaser;
