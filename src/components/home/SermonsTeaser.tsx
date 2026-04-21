import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../../sanity/lib/image';
import { 
  PlayIcon, 
  SpeakerWaveIcon, 
  ClockIcon,
  BookOpenIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

interface SermonsTeaserProps {
  messages?: Array<{
    title: string;
    slug: string;
    thumbnail?: any;
    seriesTitle?: string;
    publishedAt: string;
    duration?: string;
    videoUrl?: string | null;
    audioUrl?: string | null;
    speaker?: {
      name?: string;
      photo?: any;
    } | null;
  }>;
  sectionTitle?: string;
  sectionDescription?: string;
  ctaText?: string;
  ctaLink?: string;
  showSpeakerPhoto?: boolean;
}

// Get initials from speaker name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Format date nicely
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const SermonsTeaser = ({ 
  messages = [],
  sectionTitle = 'Fresh Word',
  sectionDescription = 'Every message is crafted to inspire, challenge, and equip you for everyday life.',
  ctaText = 'View All Sermons',
  ctaLink = '/messages',
  showSpeakerPhoto = true
}: SermonsTeaserProps) => {
  const hasSermons = messages && messages.length > 0;

  return (
    <section id="messages" className="bg-[#f9fafb]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-20 py-16 lg:py-24">
        {/* Section Header */}
        <div className="text-center max-w-[600px] mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.12em] text-[#0d9488] font-medium">
            {sectionTitle}
          </span>
          
          <h2 className="text-[32px] sm:text-[40px] font-bold text-[#111111] leading-[1.15] mt-2.5">
            Latest Sermons
          </h2>
          
          <p className="text-[17px] text-[#666666] leading-[1.7] mt-3.5">
            {sectionDescription}
          </p>
        </div>

        {/* Sermons Grid */}
        {hasSermons ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {messages.slice(0, 3).map((sermon, index) => {
              const isVideo = !!sermon.videoUrl;
              const ctaText = isVideo ? 'Watch Sermon →' : 'Listen →';
              const ctaLabel = isVideo ? `Watch sermon: ${sermon.title}` : `Listen to sermon: ${sermon.title}`;
              
              return (
                <div
                  key={sermon.slug || index}
                  className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden transition-all duration-200 hover:translate-y-[-3px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-[#111111]">
                    {sermon.thumbnail ? (
                      <Image
                        src={urlFor(sermon.thumbnail).width(600).height(338).url()}
                        alt={sermon.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[#1a1a2e] flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/10 border-[1.5px] border-white/30 flex items-center justify-center">
                          <PlayIcon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    )}
                    
                    {/* Series Badge */}
                    <div className="absolute top-3 left-3" aria-hidden="true">
                      <span className="bg-[#0d9488] text-white text-[11px] uppercase tracking-[0.08em] font-semibold px-2.5 py-1 rounded-md">
                        {sermon.seriesTitle || 'Sunday Service'}
                      </span>
                    </div>

                    {/* Watch/Listen Badge */}
                    <div className="absolute top-3 right-3">
                      {sermon.videoUrl ? (
                        <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-[11px] px-2.5 py-1 rounded-md">
                          <PlayIcon className="w-3 h-3" />
                          Watch
                        </span>
                      ) : sermon.audioUrl ? (
                        <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-[11px] px-2.5 py-1 rounded-md">
                          <SpeakerWaveIcon className="w-3 h-3" />
                          Listen
                        </span>
                      ) : null}
                    </div>
                  </div>
                  
                  {/* Card Body */}
                  <div className="p-5">
                    {/* Speaker Row */}
                    <div className="flex items-center gap-2.5 mb-3.5">
                      {showSpeakerPhoto && (
                        <>
                          {sermon.speaker?.photo ? (
                            <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-[#e5e7eb] flex-shrink-0">
                              <Image
                                src={urlFor(sermon.speaker.photo).width(72).height(72).url()}
                                alt={sermon.speaker?.name || 'Speaker'}
                                fill
                                className="object-cover"
                                sizes="36px"
                              />
                            </div>
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-[#e6fffa] border-2 border-[#e5e7eb] flex items-center justify-center flex-shrink-0">
                              <span className="text-[13px] font-semibold text-[#0f766e]">
                                {getInitials(sermon.speaker?.name || 'U')}
                              </span>
                            </div>
                          )}
                        </>
                      )}
                      <div className="flex flex-col">
                        <span className="text-[13px] font-semibold text-[#111111]">
                          {sermon.speaker?.name || 'Unknown Speaker'}
                        </span>
                        <span className="text-[12px] text-[#999999]">
                          {formatDate(sermon.publishedAt)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Sermon Title */}
                    <h3 className="text-[18px] font-bold text-[#111111] leading-[1.4] line-clamp-2 mb-4">
                      {sermon.title}
                    </h3>
                    
                    {/* Card Footer */}
                    <div className="flex items-center justify-between pt-3.5 border-t border-[#e5e7eb]">
                      {sermon.duration ? (
                        <div className="flex items-center gap-1 text-[13px] text-[#999999]">
                          <ClockIcon className="w-3.5 h-3.5" />
                          <span>{sermon.duration}</span>
                        </div>
                      ) : (
                        <div />
                      )}
                      
                      {/* Watch/Listen Link */}
                      {isVideo ? (
                        <a
                          href={sermon.videoUrl!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[13px] font-semibold text-[#0d9488] hover:text-[#0f766e] transition-colors"
                          aria-label={ctaLabel}
                        >
                          {ctaText}
                        </a>
                      ) : (
                        <Link
                          href={`/messages/${sermon.slug}`}
                          className="text-[13px] font-semibold text-[#0d9488] hover:text-[#0f766e] transition-colors"
                          aria-label={ctaLabel}
                        >
                          {ctaText}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-14 px-6" aria-live="polite">
            <div className="w-16 h-16 bg-[#f0fdf4] rounded-2xl flex items-center justify-center mx-auto mb-5">
              <BookOpenIcon className="w-7 h-7 text-[#0d9488]" />
            </div>
            <h3 className="text-[22px] font-bold text-[#111111]">Messages Coming Soon</h3>
            <p className="text-[15px] text-[#666666] mt-2">
              New messages are uploaded regularly. Check back after our next service.
            </p>
            <Link
              href={ctaLink}
              className="inline-flex items-center gap-1 text-[#0d9488] text-[14px] font-semibold mt-5 hover:text-[#0f766e] transition-colors"
            >
              Browse All Messages
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Bottom CTA */}
        {hasSermons && (
          <div className="flex justify-center mt-12">
            <Link
              href={ctaLink}
              className="inline-flex items-center justify-center bg-[#111111] hover:bg-[#333333] text-white font-semibold py-3.5 px-8 rounded-lg transition-colors duration-200 text-[15px] w-full sm:w-auto"
            >
              {ctaText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default SermonsTeaser;
