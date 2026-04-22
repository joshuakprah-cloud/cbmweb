import Image from 'next/image';
import Link from 'next/link';
import { urlForCacheBusted } from '../../../sanity/lib/image';

interface SermonCardProps {
  sermon: {
    title: string;
    slug?: string;
    description?: string;
    scriptureReference?: string;
    seriesTitle?: string;
    publishedAt: string;
    duration?: string;
    videoUrl?: string | null;
    audioUrl?: string | null;
    thumbnail?: any;
    speaker?: {
      name?: string;
      photo?: any;
    } | null;
  };
  variant?: 'grid' | 'list';
}

const SermonCard: React.FC<SermonCardProps> = ({ sermon, variant = 'grid' }) => {
  const {
    title,
    slug,
    description,
    scriptureReference,
    seriesTitle,
    publishedAt,
    duration,
    videoUrl,
    audioUrl,
    thumbnail,
    speaker,
  } = sermon;

  const hasVideo = !!videoUrl;
  const hasAudio = !!audioUrl;
  const sermonDate = new Date(publishedAt).toLocaleDateString();
  // Add cache-busting using asset _id to force fresh image loads
  const thumbnailUrl = thumbnail ? urlForCacheBusted(thumbnail) : null;

  if (variant === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <div className="flex gap-4">
          {/* Thumbnail */}
          <div className="relative w-40 h-28 flex-shrink-0 rounded-md overflow-hidden">
            {thumbnailUrl ? (
              <Image
                src={thumbnailUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="160px"
                priority={false}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-sm">No image</span>
              </div>
            )}
            
            {/* Play button overlay */}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity">
              {hasVideo && (
                <Link
                  href={`/messages/${slug}`}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
                  aria-label={`Watch: ${title}`}
                >
                  <svg className="w-5 h-5 text-gray-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </Link>
              )}
              {hasAudio && !hasVideo && (
                <Link
                  href={`/messages/${slug}`}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
                  aria-label={`Listen: ${title}`}
                >
                  <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </Link>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{title}</h3>
            
            {seriesTitle && (
              <p className="text-sm text-teal-600 font-medium mb-1">{seriesTitle}</p>
            )}
            
            <p className="text-sm text-gray-600 mb-2">{speaker?.name || 'Unknown Speaker'}</p>
            
            {description && (
              <p className="text-sm text-gray-700 line-clamp-2 mb-2">{description}</p>
            )}
            
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>{sermonDate}</span>
              {duration && <span>{duration}</span>}
              {scriptureReference && <span>{scriptureReference}</span>}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2">
            {hasVideo && (
              <Link
                href={`/messages/${slug}`}
                className="px-3 py-1 bg-teal-600 text-white text-sm rounded hover:bg-teal-700 transition-colors"
                aria-label={`Watch: ${title}`}
              >
                Watch
              </Link>
            )}
            {hasAudio && (
              <Link
                href={`/messages/${slug}`}
                className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                aria-label={`Listen: ${title}`}
              >
                Listen
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Grid variant
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
      {/* Thumbnail */}
      <div className="relative aspect-video">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
        
        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
          {hasVideo && (
            <Link
              href={`/messages/${slug}`}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
              aria-label={`Watch: ${title}`}
            >
              <svg className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </Link>
          )}
          {hasAudio && !hasVideo && (
            <Link
              href={`/messages/${slug}`}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
              aria-label={`Listen: ${title}`}
            >
              <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {seriesTitle && (
          <p className="text-sm text-teal-600 font-medium mb-1">{seriesTitle}</p>
        )}
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{title}</h3>
        
        <p className="text-sm text-gray-600 mb-2">{speaker?.name || 'Unknown Speaker'}</p>
        
        {description && (
          <p className="text-sm text-gray-700 line-clamp-3 mb-3">{description}</p>
        )}
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{sermonDate}</span>
          {duration && <span>{duration}</span>}
        </div>
        
        {scriptureReference && (
          <p className="text-xs text-gray-500 mt-1 italic">{scriptureReference}</p>
        )}
      </div>
    </div>
  );
};

export default SermonCard;
