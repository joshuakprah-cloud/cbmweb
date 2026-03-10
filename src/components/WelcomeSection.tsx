import Image from 'next/image'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

interface WelcomeMessageSectionProps {
  welcomeTitle: string
  welcomeMessage: string
  malePastorName: string
  ladyPastorName: string
  pastorImage1: string
  pastorImage2: string
  facebookUrl?: string
  twitterUrl?: string
  instagramUrl?: string
}

const WelcomeMessageSection = ({
  welcomeTitle,
  welcomeMessage,
  malePastorName,
  ladyPastorName,
  pastorImage1,
  pastorImage2,
  facebookUrl = '#',
  twitterUrl = '#',
  instagramUrl = '#'
}: WelcomeMessageSectionProps) => {
  return (
    <section className="py-16 bg-[#f7f7f7]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            {welcomeTitle}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
          {/* Left Column - Welcome Message */}
          <div className="relative flex flex-col justify-center text-center min-h-[400px] max-w-xl">
            {/* Quotation Mark Icon */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-6xl text-gray-300 font-serif opacity-20">
              "
            </div>

            {/* Welcome Message */}
            <div className="relative z-10">
              <p className="text-gray-700 leading-relaxed text-lg">
                {welcomeMessage}
              </p>
            </div>
          </div>

          {/* Right Column - Pastor Images */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {/* Male Pastor Image 1 */}
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                <Image
                  src={pastorImage1 || '/placeholder-pastor1.jpg'}
                  alt="Male Pastor Portrait"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <p className="text-center font-bold text-gray-800 mt-4 mb-3">
                {malePastorName}
              </p>
              <div className="flex space-x-3">
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Lady Pastor Image 2 */}
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                <Image
                  src={pastorImage2 || '/placeholder-pastor2.jpg'}
                  alt="Lady Pastor Portrait"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <p className="text-center font-bold text-gray-800 mt-4 mb-3">
                {ladyPastorName}
              </p>
              <div className="flex space-x-3">
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WelcomeMessageSection
