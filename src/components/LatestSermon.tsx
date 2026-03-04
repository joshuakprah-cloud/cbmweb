import Link from 'next/link';
import { urlFor } from '../../sanity/lib/image';

const LatestSermon = ({ sermons, headline, intro, button, secondaryButton }: { sermons: any[], headline?: string, intro?: string, button?: string, secondaryButton?: string }) => {
  if (sermons.length === 0) return null;

  const latestSermon = sermons[0];

  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-inter text-foreground">{headline || 'Latest Sermon'}</h2>
          {intro && <p className="text-lg mt-4">{intro}</p>}
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              {/* Placeholder for thumbnail - in real app, use video thumbnail */}
              <div className="text-gray-500 text-lg">Sermon Thumbnail</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">{latestSermon.title}</h3>
              <p className="text-muted-foreground mb-4">By {latestSermon.preacher?.name || 'Unknown'}</p>
              <div className="flex justify-center space-x-4">
                {latestSermon.videoUrl && (
                  <a
                    href={latestSermon.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    {button || 'Watch Now'}
                  </a>
                )}
                <Link href="/sermons">
                  <button className="border border-primary text-primary px-6 py-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors">
                    {secondaryButton || 'View All Sermons'}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestSermon;
