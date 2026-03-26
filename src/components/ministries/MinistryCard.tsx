import Image from 'next/image';
import Link from 'next/link';

interface MinistryCardProps {
  name: string;
  slug: string;
  tagline: string;
  heroImage?: string;
  color?: string;
  meetingDay?: string;
  meetingTime?: string;
  ageRange?: string;
}

const MinistryCard: React.FC<MinistryCardProps> = ({
  name,
  slug,
  tagline,
  heroImage,
  color,
  meetingDay,
  meetingTime,
  ageRange,
}) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      aria-label={`${name} Ministry`}
    >
      <div className="relative h-48">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={`${name} ministry`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <span className="text-4xl font-bold text-blue-600">{name.charAt(0)}</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{tagline}</p>
        
        {(meetingDay || meetingTime || ageRange) && (
          <div className="space-y-2 mb-6 text-sm text-gray-600">
            {meetingDay && <div>📅 {meetingDay}</div>}
            {meetingTime && <div>⏰ {meetingTime}</div>}
            {ageRange && <div>👥 {ageRange}</div>}
          </div>
        )}
        
        <div className="flex gap-3">
          <Link
            href={`/ministries/${slug}`}
            className="flex-1 text-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Learn More
          </Link>
          <Link
            href={`/ministries/${slug}#join`}
            className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Join Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MinistryCard;
