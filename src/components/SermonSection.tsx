import { client } from '../../sanity/lib/client';
import { allSermonsQuery } from '../../sanity/lib/queries';
import Image from 'next/image';
import { urlFor } from '../../sanity/lib/image';

const SermonSection = async ({ homepage }: { homepage: any }) => {
  const sermons = await client.fetch(allSermonsQuery);

  const featuredSermon = sermons[0];
  const recentSermons = sermons.slice(1, 5);

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Latest Message</h2>
        </div>

        {/* Featured Sermon */}
        {featuredSermon && (
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="aspect-video mb-6">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${featuredSermon.videoUrl?.split('v=')[1]}`}
                    title={featuredSermon.title}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{featuredSermon.title}</h3>
                <p className="text-lg text-blue-600 dark:text-blue-400 mb-2">by {featuredSermon.preacher?.name}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{new Date(featuredSermon.date).toLocaleDateString()}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-6">{featuredSermon.series || "A powerful message for spiritual growth."}</p>
                <a href={`/sermons/${featuredSermon.slug?.current}`} className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block">
                  Watch Message
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Recent Sermons Grid */}
        {recentSermons.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-8 text-center">More Recent Messages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentSermons.map((sermon: any) => (
                <div key={sermon._id} className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${sermon.videoUrl?.split('v=')[1]}`}
                      title={sermon.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">{sermon.title}</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">{sermon.preacher?.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(sermon.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SermonSection;
