import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../../../sanity/lib/image';

interface PostCardProps {
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: any;
  publishedAt: string;
  readTime: string;
  authorName: string;
  authorPhoto?: any;
  categoryTitles?: string[];
  tags?: string[];
  variant?: 'grid' | 'list';
  isFeatured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ 
  title, 
  slug, 
  excerpt, 
  coverImage, 
  publishedAt, 
  readTime, 
  authorName, 
  authorPhoto,
  categoryTitles = [],
  tags = [],
  variant = 'grid',
  isFeatured = false
}) => {
  const imageUrl = coverImage 
    ? urlFor(coverImage).width(400).height(250).url()
    : null;

  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const cardClasses = variant === 'grid' 
    ? 'bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer'
    : 'bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden group cursor-pointer flex gap-4';

  return (
    <Link href={`/media/blog/${slug}`} className={cardClasses} aria-label={`Read: ${title}`}>
      {variant === 'grid' ? (
        // Grid Variant
        <>
          {/* Cover Image */}
          <div className="aspect-video relative overflow-hidden bg-gray-100">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
                placeholder="blur"
                blurDataURL={urlFor(coverImage).width(40).height(25).blur(20).url()}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-3xl mb-2">📝</div>
                  <p className="text-sm font-medium">No Image</p>
                </div>
              </div>
            )}
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-orange-600 text-white text-xs font-semibold rounded-full">
                {categoryTitles[0] || 'Blog'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Meta Information */}
            <div className="flex items-center gap-3 mb-4">
              {authorPhoto && (
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={urlFor(authorPhoto).width(40).height(40).url()}
                    alt={authorName}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm text-gray-600 font-medium">{authorName}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <time dateTime={publishedAt}>{formattedDate}</time>
                  <span>•</span>
                  <span>{readTime} min read</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
              {title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
              {excerpt}
            </p>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.slice(0, 3).map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    +{tags.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
              <span>Read More</span>
              <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </>
      ) : (
        // List Variant
        <>
          {/* Thumbnail */}
          <div className="w-24 h-24 flex-shrink-0 relative overflow-hidden rounded-lg bg-gray-100">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="96px"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-lg mb-1">📝</div>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                {title}
              </h3>
              
              {/* Meta */}
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <time dateTime={publishedAt}>{formattedDate}</time>
                <span>•</span>
                <span>{readTime} min read</span>
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
              {excerpt}
            </p>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tags.slice(0, 2).map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 2 && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    +{tags.length - 2}
                  </span>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors">
              <span>Read More</span>
              <svg className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </>
      )}
    </Link>
  );
};

export default PostCard;
