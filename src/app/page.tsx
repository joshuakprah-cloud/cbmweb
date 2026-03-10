import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer';
import HeroGallery from '../components/HeroGallery';
import PrayerScrollEffect from '../components/PrayerScrollEffect';
import WelcomeMessageSection from '../components/WelcomeSection';
import { client } from '../../sanity/lib/client';
import { homepageQuery } from '../../sanity/lib/queries';
import Image from 'next/image';
import { urlFor } from '../../sanity/lib/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

interface MinistryLink {
  title: string;
  href: string;
  imageUrl?: string;
}

interface EventItem {
  title: string;
  date: string;
  time: string;
  venue: string;
  flyerImage?: any;
}

export default async function Home() {
  let data = null;
  try {
    data = await client.fetch(homepageQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    // Continue with null data - will use fallbacks
  }

  console.log('Homepage data:', data);
  console.log('Prophet name from CMS:', data?.prophetName);
  console.log('First lady name from CMS:', data?.firstLadyName);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* 1. Hero Section (Auto Sliding Gallery) */}
      <HeroGallery slides={data?.heroSlides || []} />

      {/* 2. Welcome Section */}
      <WelcomeMessageSection
        welcomeMessage={data?.welcomeMessage || 'We are delighted to welcome you to ThaGospel Church, where faith comes alive and lives are transformed through the power of God\'s word. Our church is a vibrant community of believers committed to spreading the gospel, nurturing spiritual growth, and making a positive impact in our community and beyond. Whether you are new to faith or seeking to deepen your relationship with God, you\'ll find a warm, welcoming family here. Join us as we worship, learn, and serve together in unity and love.'}
        pastorName={data?.pastorName || 'Prophet Christopher Yaw Annor'}
        pastorImage1={data?.pastorImage1 ? urlFor(data.pastorImage1).url() : '/placeholder-pastor1.jpg'}
        pastorImage2={data?.pastorImage2 ? urlFor(data.pastorImage2).url() : '/placeholder-pastor2.jpg'}
        facebookUrl={data?.facebookUrl}
        twitterUrl={data?.twitterUrl}
        instagramUrl={data?.instagramUrl}
      />

      {/* 3. Quick Access Ministry Links */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {(data?.ministryLinks || [
              { title: "Our Leadership", href: "/about/leadership", imageUrl: "/images/leadership.jpg" },
              { title: "Year's Theme", href: "/about/theme", imageUrl: "/images/theme.jpg" },
              { title: "Give", href: "/give", imageUrl: "/images/give.jpg" },
              { title: "Testimonies", href: "/testimonies", imageUrl: "/images/testimonies.jpg" },
              { title: "Sermons", href: "/sermons", imageUrl: "/images/sermons.jpg" },
              { title: "Forms", href: "/forms", imageUrl: "/images/forms.jpg" }
            ]).map((item: MinistryLink, index: number) => (
              <Link
                key={index}
                href={item.href}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
              >
                <div className="h-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center group-hover:bg-gray-300 dark:group-hover:bg-gray-600 transition-colors relative">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-xs text-gray-500">Image</p>
                    </div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Latest Sermon Audio */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Latest Sermon</h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* Left Side - Cover Image */}
              <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 relative">
                {data?.latestSermon?.coverImage ? (
                  <Image
                    src={urlFor(data.latestSermon.coverImage).url()}
                    alt="Sermon cover"
                    fill
                    className="object-cover rounded-lg"
                    sizes="128px"
                  />
                ) : (
                  <span className="text-4xl text-gray-400">🎧</span>
                )}
              </div>
              
              {/* Middle Content - Sermon Info */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                  {data?.latestSermon?.title || 'The Faith Life'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  Prophet Powerman Bekoe · ThaGospel Church · {data?.latestSermon?.date || 'Feb 10, 2026'}
                </p>
              </div>
              
              {/* Right Side - Audio Player Controls */}
              <div className="flex items-center space-x-3 flex-shrink-0">
                <button className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
                <div className="flex-1">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                    <div className="bg-blue-600 h-2 rounded-full w-1/3"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span>0:00</span>
                    <span>{data?.latestSermon?.duration || '45:23'}</span>
                  </div>
                </div>
                <button className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.462 9 12c0-.462-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632 3.316m0 0a3 3 0 10-2.684 2.684" />
                  </svg>
                </button>
                <button className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L24 20.368l-7.682-7.682a4.5 4.5 0 00-6.364 0L4.318 12.682a4.5 4.5 0 000-6.364z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.548 7.548c.746 0 1.352.675 1.352 1.5v8.904c0 .825-.606 1.5-1.352 1.5h-8.904c-.846 0-1.548-.675-1.548-1.5V9.048c0-.825.602-1.548 1.548-1.5h8.904z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* View More Sermons Button */}
          <div className="text-center mt-6">
            <Link 
              href="/sermons" 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View More Sermons
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Upcoming Events Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Upcoming Events</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {(data?.upcomingEvents || [
              {
                title: "Sunday Service",
                date: "This Sunday",
                time: "9:00 AM",
                venue: "Main Auditorium"
              },
              {
                title: "Youth Fellowship",
                date: "Friday",
                time: "7:00 PM",
                venue: "Youth Center"
              },
              {
                title: "Prayer Meeting",
                date: "Wednesday",
                time: "6:00 PM",
                venue: "Prayer Hall"
              }
            ]).map((event: EventItem, index: number) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                {/* Event Flyer Image Placeholder */}
                <div className="h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center relative">
                  {event.flyerImage ? (
                    <Image
                      src={urlFor(event.flyerImage).url()}
                      alt={event.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="text-center">
                      <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Event Flyer</p>
                    </div>
                  )}
                </div>
                
                {/* Event Details */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p className="font-medium text-blue-600 dark:text-blue-400">{event.date}</p>
                    <p>🕐 {event.time}</p>
                    <p>📍 {event.venue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Prayer Request Section with Scroll Fade */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ 
          backgroundImage: data?.prayerSection?.backgroundImage ? `url(${urlFor(data.prayerSection.backgroundImage).url()})` : undefined 
        }}>
          {/* Fallback gradient background for when image doesn't load */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900"></div>
          {/* Prayer-themed overlay with icons */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="text-center">
              <span className="text-8xl md:text-9xl block mb-4">🙏</span>
              <span className="text-6xl md:text-7xl block">✝️</span>
            </div>
          </div>
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        {/* Scroll Fade Effect */}
        <div className="prayer-bg-fade absolute inset-0 bg-white transition-opacity duration-500"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Title */}
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
                {data?.prayerSection?.title || 'REQUEST PRAYER'}
              </h2>
            </div>
            
            {/* Right Side - Form */}
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg p-8 shadow-xl">
              <form className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                
                {/* Phone Number Field */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                
                {/* Prayer Request Field */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Prayer Request
                  </label>
                  <textarea
                    placeholder="Share your prayer request with us..."
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {data?.prayerSection?.submitButtonText || 'Send'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Scroll Effect Component */}
      <PrayerScrollEffect />

      {/* 7. Footer (Keep existing) */}
      <Footer homepage={data} />
    </div>
  );
}
