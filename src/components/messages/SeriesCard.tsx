import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../../sanity/lib/image';

interface SeriesCardProps {
  series: {
    seriesTitle: string;
    seriesSlug: string;
    seriesCoverImage?: any;
    sermonCount: number;
    firstDate?: string;
    lastDate?: string;
  };
}

const SeriesCard: React.FC<SeriesCardProps> = ({ series }) => {
  const { seriesTitle, seriesSlug, seriesCoverImage, sermonCount, firstDate, lastDate } = series;
  
  const imageUrl = seriesCoverImage ? urlFor(seriesCoverImage).url() : null;

  // Format date range
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const dateRange = firstDate && lastDate 
    ? `${formatDate(firstDate)} - ${formatDate(lastDate)}`
    : 'Ongoing series';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
      {/* Cover Image */}
      <div className="relative aspect-video">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={seriesTitle}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">{seriesTitle.charAt(0)}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{seriesTitle}</h3>
        
        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600">
            {sermonCount} {sermonCount === 1 ? 'sermon' : 'sermons'}
          </p>
          
          {dateRange && (
            <p className="text-xs text-gray-500">
              {dateRange}
            </p>
          )}
        </div>

        <Link
          href={`/sermons/series/${seriesSlug}`}
          className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors"
        >
          View Series
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default SeriesCard;
