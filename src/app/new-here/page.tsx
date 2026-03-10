import Image from 'next/image'
import Link from 'next/link'
import { FaUsers, FaPrayingHands, FaBookOpen, FaClock, FaMapMarkerAlt, FaDirections, FaEnvelope } from 'react-icons/fa'

export const metadata = {
  title: 'New Here? - ThaGospel Church',
  description: 'Welcome to ThaGospel Church! Discover what to expect, our service times, and how to find us.',
}

export default function NewHerePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-orange-900 via-red-800 to-pink-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
            New Here?
          </h1>
          <p className="text-2xl md:text-4xl font-light drop-shadow-lg mb-12">
            You Are Welcome
          </p>
          <div className="text-lg md:text-xl drop-shadow-md">
            <p className="mb-4">We're so glad you've found us!</p>
            <p>Here's everything you need to know about joining our community.</p>
          </div>
        </div>
      </section>

      {/* What To Expect */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What To Expect
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the warmth of community and the power of God's presence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Friendly Community */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <FaUsers className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Friendly Community</h3>
              <p className="text-gray-600 leading-relaxed">
                Join a welcoming family where everyone belongs. Our congregation is diverse,
                warm, and ready to embrace you just as you are.
              </p>
            </div>

            {/* Powerful Worship */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <FaPrayingHands className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Powerful Worship</h3>
              <p className="text-gray-600 leading-relaxed">
                Experience dynamic worship that engages your heart, mind, and spirit.
                From contemporary music to heartfelt prayer, every moment draws us closer to God.
              </p>
            </div>

            {/* Practical Teaching */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <FaBookOpen className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Practical Teaching</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive biblical teaching that applies to everyday life. Our messages are
                relevant, encouraging, and designed to help you grow in your faith journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Service Times
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us for worship and fellowship at these times
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sunday Service */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <FaClock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Sunday Service</h3>
              <p className="text-lg text-blue-600 font-semibold mb-2">Main Worship</p>
              <p className="text-gray-700 font-medium">Every Sunday</p>
              <p className="text-gray-700">9:00 AM - 11:30 AM</p>
            </div>

            {/* Wednesday Prayer */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <FaPrayingHands className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Prayer Meeting</h3>
              <p className="text-lg text-purple-600 font-semibold mb-2">Midweek Prayer</p>
              <p className="text-gray-700 font-medium">Every Wednesday</p>
              <p className="text-gray-700">6:00 PM - 8:00 PM</p>
            </div>

            {/* Friday Youth */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <FaUsers className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Youth Fellowship</h3>
              <p className="text-lg text-green-600 font-semibold mb-2">Youth Night</p>
              <p className="text-gray-700 font-medium">Every Friday</p>
              <p className="text-gray-700">7:00 PM - 9:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Find Us
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Located in the heart of the community, easily accessible by car and public transport
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map Placeholder */}
            <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="h-96 bg-gray-700 flex items-center justify-center">
                <div className="text-center">
                  <FaMapMarkerAlt className="w-16 h-16 text-red-400 mx-auto mb-4" />
                  <p className="text-gray-300 text-lg">Google Maps Integration</p>
                  <p className="text-gray-400 text-sm mt-2">Interactive map will be displayed here</p>
                </div>
              </div>
            </div>

            {/* Address & Directions */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-4">Address</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  ThaGospel Church<br />
                  123 Faith Avenue<br />
                  Accra, Ghana<br />
                  West Africa
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Parking</h3>
                <p className="text-gray-300 leading-relaxed">
                  Free parking available on church grounds. Accessible parking spaces
                  are available for those with mobility needs.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Public Transport</h3>
                <p className="text-gray-300 leading-relaxed">
                  Easily accessible by bus and taxi. The nearest bus stop is just
                  2 minutes walk from our entrance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Visit?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            We'd love to welcome you to our church family. Take the next step today!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/plan-your-visit"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <FaDirections className="w-5 h-5 mr-2" />
              Get Directions
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center"
            >
              <FaEnvelope className="w-5 h-5 mr-2" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Enhanced Hero Section */}
      <div
        className="relative h-96 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 flex items-center justify-center overflow-hidden"
        style={newHereData?.heroBackgroundImage ? {
          backgroundImage: `url(${urlFor(newHereData.heroBackgroundImage).url()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        } : undefined}
      >
        {newHereData?.heroBackgroundImage && <div className="absolute inset-0 bg-black/50"></div>}
        {!newHereData?.heroBackgroundImage && <div className="absolute inset-0 bg-black/20"></div>}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">{newHereData?.heroTitle || 'Welcome to ThaGospel Church'}</h1>
          <p className="text-xl md:text-2xl drop-shadow-md max-w-2xl mx-auto mb-6">{newHereData?.heroSubtitle || "We're glad you're here! Discover what to expect and how to get connected."}</p>

          {/* Feature Indicators */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base">
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="mr-2">👨‍👩‍👧‍👦</span>
              <span className="font-medium">Family Friendly</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="mr-2">🙏</span>
              <span className="font-medium">Spirit-filled Worship</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="mr-2">📖</span>
              <span className="font-medium">Biblical Teaching</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* What to Expect */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{newHereData?.whatToExpectTitle || 'What to Expect'}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {newHereData?.whatToExpect?.map((item: any, index: number) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{item.icon || '🙏'}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            )) || (
              <>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🙏</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Worship Service</h3>
                  <p>Experience uplifting worship with contemporary music, powerful preaching, and a welcoming atmosphere.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Friendly Community</h3>
                  <p>Join a community of believers who care about each other and support one another in faith.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Bible Teaching</h3>
                  <p>Learn from the Word of God through relevant, life-changing messages and Bible studies.</p>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Sunday Experience Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{newHereData?.sundayExperienceTitle || 'Your First Sunday'}</h2>
          <div className="relative max-w-4xl mx-auto pl-4 md:pl-8">
            <div className="space-y-8">
              {newHereData?.sundayExperience?.map((step: any, index: number) => (
                <div key={index} className="flex items-start">
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg mr-6 ${
                    index === 0 ? 'bg-blue-500' :
                    index === 1 ? 'bg-green-500' :
                    index === 2 ? 'bg-purple-500' :
                    'bg-orange-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                  </div>
                </div>
              )) || (
                <>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-6">
                      1
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold mb-2">Arrival & Welcome</h3>
                      <p className="text-gray-600 dark:text-gray-300">Warm greetings and seating assistance as you enter our welcoming environment.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-6">
                      2
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold mb-2">Worship</h3>
                      <p className="text-gray-600 dark:text-gray-300">Spirit-filled music and praise that creates an atmosphere of worship and celebration.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-6">
                      3
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold mb-2">Message</h3>
                      <p className="text-gray-600 dark:text-gray-300">Biblical teaching that's relevant to everyday life and applicable to your journey.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-6">
                      4
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold mb-2">Fellowship</h3>
                      <p className="text-gray-600 dark:text-gray-300">Meet people and build connections over refreshments and conversation after service.</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">See What Sunday Feels Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newHereData?.photoGallery?.map((photo: any, index: number) => (
              <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden group cursor-pointer">
                {photo.image ? (
                  <Image
                    src={urlFor(photo.image).url()}
                    alt={photo.alt || 'Church photo'}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <div className="text-center">
                      <span className="text-4xl mb-2 block">
                        {index === 0 ? '🎵' : index === 1 ? '👥' : index === 2 ? '👶' : '☕'}
                      </span>
                      <p className="text-sm text-gray-600">{photo.caption || 'Church photo'}</p>
                    </div>
                  </div>
                )}
              </div>
            )) || (
              <>
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center group cursor-pointer overflow-hidden">
                  <div className="text-center transition-transform duration-300 group-hover:scale-110">
                    <span className="text-4xl mb-2 block">🎵</span>
                    <p className="text-sm text-gray-600">Worship Moment</p>
                  </div>
                </div>
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center group cursor-pointer overflow-hidden">
                  <div className="text-center transition-transform duration-300 group-hover:scale-110">
                    <span className="text-4xl mb-2 block">👥</span>
                    <p className="text-sm text-gray-600">Church Congregation</p>
                  </div>
                </div>
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center group cursor-pointer overflow-hidden">
                  <div className="text-center transition-transform duration-300 group-hover:scale-110">
                    <span className="text-4xl mb-2 block">👶</span>
                    <p className="text-sm text-gray-600">Children Ministry</p>
                  </div>
                </div>
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center group cursor-pointer overflow-hidden">
                  <div className="text-center transition-transform duration-300 group-hover:scale-110">
                    <span className="text-4xl mb-2 block">☕</span>
                    <p className="text-sm text-gray-600">Fellowship</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* How to Get Connected */}
        <section className="mb-16 bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-center">{newHereData?.connectTitle || 'How to Get Connected'}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Visit Us</h3>
              <div className="space-y-2">
                <p><strong>Sunday Services:</strong> {newHereData?.visitInfo?.services || '7:30 AM & 10:30 AM'}</p>
                <p><strong>Location:</strong> {newHereData?.visitInfo?.location || '[Church Address]'}</p>
                <p><strong>Parking:</strong> {newHereData?.visitInfo?.parking || 'Available on-site'}</p>
                <p><strong>Greeters:</strong> {newHereData?.visitInfo?.greeters || 'Friendly team to help you find your way'}</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Connect with Us</h3>
              <ul className="space-y-2">
                {newHereData?.connectItems?.map((item: string, index: number) => (
                  <li key={index}>• {item}</li>
                )) || (
                  <>
                    <li>• Fill out visitor card during service</li>
                    <li>• Join fellowship after service</li>
                    <li>• Sign up for email newsletter</li>
                    <li>• Follow us on social media</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* Meet Our Spiritual Leaders */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Spiritual Leaders</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Prophet/Lead Pastor */}
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-lg overflow-hidden shadow-lg">
                {newHereData?.prophetImage ? (
                  <Image
                    src={urlFor(newHereData.prophetImage).url()}
                    alt={newHereData.prophetName || 'Lead Prophet'}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-4xl text-white">👨‍⚖️</span>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">{newHereData?.prophetName || 'Prophet John Doe'}</h3>
              <p className="text-blue-600 dark:text-blue-400">{newHereData?.prophetTitle || 'Lead Prophet'}</p>
            </div>

            {/* First Lady */}
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-lg overflow-hidden shadow-lg">
                {newHereData?.firstLadyImage ? (
                  <Image
                    src={urlFor(newHereData.firstLadyImage).url()}
                    alt={newHereData.firstLadyName || 'First Lady'}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                    <span className="text-4xl text-white">👩‍⚖️</span>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">{newHereData?.firstLadyName || 'Lady Jane Doe'}</h3>
              <p className="text-blue-600 dark:text-blue-400">{newHereData?.firstLadyTitle || 'First Lady'}</p>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="text-center max-w-4xl mx-auto">
            <blockquote className="text-lg md:text-xl italic text-gray-700 dark:text-gray-300">
              "Welcome to ThaGospel Church. Our heart is to raise believers rooted in truth and empowered for impact across nations."
            </blockquote>
          </div>
        </section>

        {/* Plan Your Visit */}
        <PlanYourVisit />

        {/* Frequently Asked Questions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{newHereData?.faqTitle || 'Frequently Asked Questions'}</h2>
          <div className="max-w-4xl mx-auto pl-4 md:pl-8 space-y-6">
            {newHereData?.faq?.map((item: any, index: number) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-xl font-semibold mb-2">{item.question}</h3>
                <p className="text-gray-700 dark:text-gray-300">{item.answer}</p>
              </div>
            )) || (
              <>
                <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <h3 className="text-xl font-semibold mb-2">What should I wear?</h3>
                  <p className="text-gray-700 dark:text-gray-300">Casual attire is perfectly fine. Come as you are!</p>
                </div>
                <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <h3 className="text-xl font-semibold mb-2">Are children welcome?</h3>
                  <p className="text-gray-700 dark:text-gray-300">Absolutely! We have programs for all ages and love having families worship together.</p>
                </div>
                <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <h3 className="text-xl font-semibold mb-2">How long is the service?</h3>
                  <p className="text-gray-700 dark:text-gray-300">Our Sunday services typically last about 90 minutes.</p>
                </div>
                <div className="pb-6">
                  <h3 className="text-xl font-semibold mb-2">Can I participate if I'm not a member?</h3>
                  <p className="text-gray-700 dark:text-gray-300">Yes! Everyone is welcome to participate in our services and activities.</p>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Lives Being Changed */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Lives Being Changed</h2>
          <TestimonialCarousel />
        </section>

        {/* Final Call to Action */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 rounded-lg mx-4">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Visit ThaGospel Church?</h2>
            <p className="text-xl mb-8 opacity-90">We can't wait to meet you and welcome you into our church family.</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {newHereData?.ctaButtons?.map((button: any, index: number) => (
                <a
                  key={index}
                  href={button.url || '#'}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    button.color === 'white'
                      ? 'bg-white text-blue-600 hover:bg-gray-100'
                      : button.color === 'blue'
                      ? 'bg-blue-700 text-white hover:bg-blue-800'
                      : 'bg-purple-700 text-white hover:bg-purple-800'
                  }`}
                >
                  {button.text}
                </a>
              )) || (
                <>
                  <a href="/about" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Plan Your Visit
                  </a>
                  <a href="/about" className="px-8 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                    Learn More About Us
                  </a>
                  <a href="/contact" className="px-8 py-3 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800 transition-colors">
                    Contact Us
                  </a>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
