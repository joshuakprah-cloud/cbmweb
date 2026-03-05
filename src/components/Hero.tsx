import { urlFor } from '../../sanity/lib/image'
import Image from 'next/image'

const Hero = ({ heroHeadline, heroSubtext, heroBackgroundImage, heroBackgroundImageAlt, heroPrimaryButton, heroSecondaryButton, heroSmallLine }: { heroHeadline?: string, heroSubtext?: string, heroBackgroundImage?: any, heroBackgroundImageAlt?: string, heroPrimaryButton?: string, heroSecondaryButton?: string, heroSmallLine?: string }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {(heroBackgroundImage || true) && ( // Always show, with fallback if needed
        <Image
          src={heroBackgroundImage ? urlFor(heroBackgroundImage).url() : '/fallback-hero.jpg'} // Add fallback image
          alt={heroBackgroundImageAlt || "ThaGospel Church hero background"}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>
      <div className="text-center text-white z-10 px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 font-inter leading-tight">
          
        </h1>
        <p className="text-lg md:text-xl mb-6 font-inter">
          
        </p>
        <div className="mb-8 text-sm md:text-base">
          <p className="mb-2"><strong></strong> </p>
          <p className="mb-2"><strong></strong> </p>
          <p><strong></strong> </p>
        </div>
        <div className="flex flex-row items-center justify-center space-x-4">
          <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-inter font-semibold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            
          </button>
          <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-inter font-semibold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
