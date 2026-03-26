import Image from 'next/image';
import { urlFor } from '../../sanity/lib/image';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: any;
}

const PageHero = ({ title, subtitle, image }: PageHeroProps) => {
  return (
    <section className="relative h-96 bg-gray-100">
      {image ? (
        <div className="absolute inset-0">
          <Image
            src={urlFor(image).url()}
            alt={title}
            fill
            className="object-cover"
            priority={true}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-teal-800" />
      )}
      
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          <h1 className="text-white font-bold mb-4" style={{ fontSize: '48px', lineHeight: '1.1' }}>
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-white text-lg" style={{ fontSize: '18px', lineHeight: '1.6' }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
