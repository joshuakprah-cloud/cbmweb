import { client } from '../../../sanity/lib/client'
import { newHereQuery } from '../../../sanity/lib/queries'
import { urlFor } from '../../../sanity/lib/image'
import Image from 'next/image'

export default async function NewHere() {
  const newHereData = await client.fetch(newHereQuery)

  if (!newHereData) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Enhanced Hero Section */}
      <div
        className="relative h-96 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 flex items-center justify-center overflow-hidden"
        style={newHereData.heroBackgroundImage ? {
          backgroundImage: `url(${urlFor(newHereData.heroBackgroundImage).url()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        } : undefined}
      >
        {!newHereData.heroBackgroundImage && <div className="absolute inset-0 bg-black/20"></div>}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">{newHereData.heroTitle || 'Welcome to ThaGospel Church'}</h1>
          <p className="text-xl md:text-2xl drop-shadow-md max-w-2xl mx-auto">{newHereData.heroSubtitle || "We're glad you're here! Discover what to expect and how to get connected."}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* What to Expect */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{newHereData.whatToExpectTitle || 'What to Expect'}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {newHereData.whatToExpect?.map((item: any, index: number) => (
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
          <h2 className="text-3xl font-bold mb-8 text-center">{newHereData.sundayExperienceTitle || 'Your First Sunday'}</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-300 hidden md:block"></div>
            <div className="space-y-8">
              {newHereData.sundayExperience?.map((step: any, index: number) => (
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
          <h2 className="text-3xl font-bold mb-8 text-center">{newHereData.photoGalleryTitle || 'See What Sunday Feels Like'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newHereData.photoGallery?.map((photo: any, index: number) => (
              <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                {photo.image ? (
                  <Image
                    src={urlFor(photo.image).url()}
                    alt={photo.alt || 'Church photo'}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
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
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-4xl mb-2 block">🎵</span>
                    <p className="text-sm text-gray-600">Worship Moment</p>
                  </div>
                </div>
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-4xl mb-2 block">👥</span>
                    <p className="text-sm text-gray-600">Church Congregation</p>
                  </div>
                </div>
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-4xl mb-2 block">👶</span>
                    <p className="text-sm text-gray-600">Children Ministry</p>
                  </div>
                </div>
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
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
          <h2 className="text-3xl font-bold mb-8 text-center">{newHereData.connectTitle || 'How to Get Connected'}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Visit Us</h3>
              <div className="space-y-2">
                <p><strong>Sunday Services:</strong> {newHereData.visitInfo?.services || '7:30 AM & 10:30 AM'}</p>
                <p><strong>Location:</strong> {newHereData.visitInfo?.location || '[Church Address]'}</p>
                <p><strong>Parking:</strong> {newHereData.visitInfo?.parking || 'Available on-site'}</p>
                <p><strong>Greeters:</strong> {newHereData.visitInfo?.greeters || 'Friendly team to help you find your way'}</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Connect with Us</h3>
              <ul className="space-y-2">
                {newHereData.connectItems?.map((item: string, index: number) => (
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
          <h2 className="text-3xl font-bold mb-8 text-center">{newHereData.leadersTitle || 'Meet Our Spiritual Leaders'}</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              {newHereData.prophet?.image ? (
                <Image
                  src={urlFor(newHereData.prophet.image).url()}
                  alt={newHereData.prophet.name || 'Prophet'}
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👨‍🏫</span>
                </div>
              )}
              <h3 className="text-xl font-semibold">{newHereData.prophet?.name || 'Prophet Name'}</h3>
              <p className="text-blue-600 dark:text-blue-400">{newHereData.prophet?.title || 'Lead Prophet'}</p>
            </div>
            <div className="text-center">
              {newHereData.firstLady?.image ? (
                <Image
                  src={urlFor(newHereData.firstLady.image).url()}
                  alt={newHereData.firstLady.name || 'First Lady'}
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👩‍🏫</span>
                </div>
              )}
              <h3 className="text-xl font-semibold">{newHereData.firstLady?.name || 'First Lady Name'}</h3>
              <p className="text-blue-600 dark:text-blue-400">{newHereData.firstLady?.title || 'First Lady'}</p>
            </div>
          </div>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 dark:text-gray-300 italic">
              {newHereData.leadersMessage || "Welcome to ThaGospel Church! We are excited to have you join our community of faith. Our doors are open to everyone seeking spiritual growth, fellowship, and a deeper relationship with God."}
            </p>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">{newHereData.faqTitle || 'Frequently Asked Questions'}</h2>
          <div className="space-y-6">
            {newHereData.faq?.map((item: any, index: number) => (
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

        {/* Call to Action */}
        <section className="text-center bg-green-600 text-white p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">{newHereData.ctaTitle || 'Ready to Visit ThaGospel Church?'}</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            {newHereData.ctaSubtitle || "We can't wait to meet you and welcome you into our church family."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {newHereData.ctaButtons?.map((button: any, index: number) => (
              <a
                key={index}
                href={button.url}
                className={`px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors ${
                  button.color === 'white'
                    ? 'bg-white text-green-600 hover:bg-gray-100'
                    : button.color === 'blue'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {button.text}
              </a>
            )) || (
              <>
                <a href="/plan-your-visit" className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Plan Your Visit
                </a>
                <a href="/overview" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Learn More About Us
                </a>
                <a href="/contact" className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                  Contact Us
                </a>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
