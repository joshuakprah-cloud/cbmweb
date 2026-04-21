import { Metadata } from 'next';
import { client } from '../../../sanity/lib/client';
import { livestreamQuery } from '../../../sanity/lib/queries';
import { urlFor } from '../../../sanity/lib/image';
import { VideoPlayer } from './VideoPlayer';
import { CountdownTimer } from './CountdownTimer';
import { InfoTabs } from './InfoTabs';
import { PastMessages } from './PastMessages';
import { SubscribeCTA } from './SubscribeCTA';
import { ChatPlaceholder } from './ChatPlaceholder';

export const metadata: Metadata = {
  title: 'Watch Live | ThaGospel Church',
  description: 'Join our live worship experience every Sunday. Watch sermons, connect with our community, and grow in faith.',
};

export const dynamic = 'force-dynamic';

export default async function LivestreamPage() {
  const data = await client.fetch(livestreamQuery);
  const livestreamSettings = data?.livestreamSettings || {};
  const recentSermons = data?.recentSermons || [];

  const {
    pageTitle = 'Watch Live',
    pageDescription = 'Join us for live worship every Sunday',
    liveVideoId = 'dQw4w9WgXcQ',
    isLive = false,
    nextServiceTime,
    serviceDays = ['Sunday'],
    sermonNotesUrl,
    givingUrl = '/give',
  } = livestreamSettings;

  // Calculate next service time if not provided
  const getNextServiceTime = () => {
    if (nextServiceTime) return new Date(nextServiceTime);
    
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday
    const daysUntilSunday = currentDay === 0 && now.getHours() < 9 ? 0 : (7 - currentDay) % 7;
    
    const nextService = new Date(now);
    nextService.setDate(now.getDate() + daysUntilSunday);
    nextService.setHours(9, 0, 0, 0); // 9:00 AM
    
    return nextService;
  };

  const calculatedNextService = getNextServiceTime();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Video Player */}
      <section className="bg-gray-900 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Video Player - Left Side (2/3) */}
            <div className="lg:col-span-2">
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                <VideoPlayer 
                  videoId={liveVideoId} 
                  isLive={isLive}
                />
                
                {/* Live Badge */}
                {isLive && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 animate-pulse">
                    <span className="w-2 h-2 bg-white rounded-full" />
                    LIVE
                  </div>
                )}
              </div>
              
              {/* Video Info */}
              <div className="mt-4 text-white">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{pageTitle}</h1>
                <p className="text-gray-400 mb-4">{pageDescription}</p>
                
                {/* Share Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm text-gray-500">Share:</span>
                  <ShareButtons />
                </div>
              </div>
            </div>

            {/* Sidebar - Right Side (1/3) */}
            <div className="lg:col-span-1 space-y-6">
              {/* Countdown Timer or Live Status */}
              <div className="bg-gray-800 rounded-xl p-6">
                {isLive ? (
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-lg font-semibold mb-3">
                      <span className="w-3 h-3 bg-white rounded-full animate-pulse" />
                      Live Now
                    </div>
                    <p className="text-gray-400 text-sm">Join the conversation below</p>
                  </div>
                ) : (
                  <CountdownTimer 
                    targetDate={calculatedNextService}
                    serviceDays={serviceDays}
                  />
                )}
              </div>

              {/* Live Chat Placeholder */}
              <ChatPlaceholder isLive={isLive} />

              {/* Quick Links */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                <div className="space-y-3">
                  {sermonNotesUrl && (
                    <a 
                      href={sermonNotesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-teal-400 hover:text-teal-300 transition-colors text-sm"
                    >
                      📄 Download Sermon Notes
                    </a>
                  )}
                  <a 
                    href={givingUrl}
                    className="block text-teal-400 hover:text-teal-300 transition-colors text-sm"
                  >
                    💚 Give Online
                  </a>
                  <a 
                    href="/connect/prayer"
                    className="block text-teal-400 hover:text-teal-300 transition-colors text-sm"
                  >
                    🙏 Submit Prayer Request
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Tabs Section */}
      <section className="py-8 md:py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InfoTabs 
            sermonNotesUrl={sermonNotesUrl}
            givingUrl={givingUrl}
          />
        </div>
      </section>

      {/* Past Messages Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PastMessages messages={recentSermons} />
        </div>
      </section>

      {/* Subscribe CTA Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SubscribeCTA />
        </div>
      </section>
    </main>
  );
}

// Share Buttons Component
function ShareButtons() {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://thagospel.com/livestream';
  const shareText = 'Join me for live worship at ThaGospel Church!';

  return (
    <>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm transition-colors"
      >
        Facebook
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1.5 rounded-md text-sm transition-colors"
      >
        Twitter
      </a>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm transition-colors"
      >
        WhatsApp
      </a>
      <button
        onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: 'Watch Live - ThaGospel Church',
              text: shareText,
              url: shareUrl,
            });
          } else {
            navigator.clipboard.writeText(shareUrl);
          }
        }}
        className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-md text-sm transition-colors"
      >
        Copy Link
      </button>
    </>
  );
}
