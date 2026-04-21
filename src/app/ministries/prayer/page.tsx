import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { UsersIcon, HandRaisedIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Prayer Ministry - ThaGospel Church',
  description: 'Join our prayer team and submit your prayer requests. We believe in the power of prayer.',
};

// Sample prayer requests data (this would come from a database in production)
const prayerRequests = [
  {
    id: 1,
    name: 'Sarah M.',
    request: 'Please pray for my mother who is undergoing surgery next week. We are trusting God for a successful procedure and quick recovery.',
    date: 'Dec 15, 2024',
    prayers: 12,
    userPrayed: false,
  },
  {
    id: 2,
    name: 'James K.',
    request: 'Praying for job opportunities and financial breakthrough. God knows my needs and I trust He will provide.',
    date: 'Dec 14, 2024',
    prayers: 8,
    userPrayed: false,
  },
  {
    id: 3,
    name: 'Anonymous',
    request: 'Please pray for my marriage restoration. We are going through a difficult season and need God\'s intervention.',
    date: 'Dec 13, 2024',
    prayers: 24,
    userPrayed: true,
  },
];

export default function PrayerPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Styled like ministries page */}
      <section 
        className="relative min-h-[300px] md:min-h-[350px] flex items-center justify-center overflow-hidden"
        role="banner"
      >
        {/* Background Image with gradient fallback */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          }}
        />
        
        {/* Dark Overlay */}
        <div 
          className="absolute inset-0 bg-black/50"
          aria-hidden="true"
        />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight drop-shadow-lg">
            Prayer
          </h1>
          <p className="mt-6 text-xl text-white/90 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            The power of prayer moves mountains and transforms lives.
          </p>
        </div>
      </section>

      {/* Scripture Section */}
      <section className="relative py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A] uppercase tracking-wide leading-tight mb-4">
            May you accept my prayer like incense, my uplifted hands like the evening offering
          </h2>
          <p className="text-gray-600 text-lg">Psalm 141:2</p>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 px-4 bg-[#F8F9FB]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-700 text-lg leading-relaxed">
            ThaGospel Prayer focuses on Holy Spirit-led lifting of one another to God for mercy and 
            grace. We desire to pray for individuals, our church leadership, our missionaries, 
            our community, and our nation. Our team prays before and after the Sunday service and 
            during the week as needs and thanksgiving arises.
          </p>
        </div>
      </section>

      {/* Prayer Images Gallery */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-64 rounded-2xl overflow-hidden">
              <Image
                src="/images/prayer-wall.jpg"
                alt="Prayer wall"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden">
              <Image
                src="/images/prayer-team.jpg"
                alt="Prayer team"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden">
              <Image
                src="/images/prayer-cards.jpg"
                alt="Prayer cards"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Join Team Button */}
      <div className="py-8 px-4 bg-white text-center">
        <Link
          href="/connect"
          className="inline-flex items-center justify-center px-8 py-4 bg-[#0d9488] text-white font-semibold rounded-lg hover:bg-[#0f766e] transition-all duration-200"
        >
          Join the Team
        </Link>
      </div>

      {/* Submit Prayer Request Section */}
      <section id="prayer-request" className="py-20 px-4 bg-[#F8F9FB]">
        <div className="max-w-3xl mx-auto">
          {/* Prayer Request Form */}
          <div id="submit-form" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-[#0B1F3A] mb-6 text-center">Submit Your Prayer Request</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name or leave blank for anonymous"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0d9488] focus:border-transparent outline-none transition-all"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="For updates on your request"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0d9488] focus:border-transparent outline-none transition-all"
                />
              </div>
              
              <div>
                <label htmlFor="request" className="block text-sm font-medium text-gray-700 mb-2">
                  Prayer Request *
                </label>
                <textarea
                  id="request"
                  name="request"
                  rows={4}
                  required
                  placeholder="Share your prayer request..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0d9488] focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="public"
                  name="public"
                  className="w-4 h-4 text-[#0d9488] border-gray-300 rounded focus:ring-[#0d9488]"
                />
                <label htmlFor="public" className="text-sm text-gray-600">
                  Share on the public prayer wall (first name only)
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full py-4 bg-[#0d9488] text-white font-semibold rounded-lg hover:bg-[#0f766e] transition-all duration-200"
              >
                Submit Prayer Request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Prayer Wall Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A] uppercase tracking-wide">
              Prayer Wall
            </h2>
            <p className="text-gray-600 mt-4">Join us in praying for these requests</p>
          </div>

          {/* Prayer Requests */}
          <div className="space-y-6">
            {prayerRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-[#0B1F3A] uppercase tracking-wide">{request.name}</h3>
                  <span className="text-sm text-gray-400">{request.date}</span>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  {request.request}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <UsersIcon className="w-4 h-4" />
                    <span>{request.prayers}</span>
                    <HandRaisedIcon className="w-4 h-4 ml-2" />
                    <span>I Prayed</span>
                  </div>
                  
                  <button
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                      request.userPrayed
                        ? 'bg-[#0d9488]/10 text-[#0d9488]'
                        : 'bg-[#0d9488] text-white hover:bg-[#0f766e]'
                    }`}
                  >
                    {request.userPrayed ? (
                      <>
                        <HandRaisedIcon className="w-4 h-4" />
                        Prayed
                      </>
                    ) : (
                      <>
                        <HandRaisedIcon className="w-4 h-4" />
                        I Prayed
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-10">
            <button className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#0d9488] text-[#0d9488] font-semibold rounded-lg hover:bg-[#0d9488] hover:text-white transition-all duration-200">
              Load More Requests
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
