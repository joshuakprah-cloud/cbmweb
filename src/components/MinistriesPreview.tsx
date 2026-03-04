import Link from 'next/link';
import { urlFor } from '../../sanity/lib/image';

const MinistriesPreview = ({ services, headline, intro, ministries, button }: { services?: any[], headline?: string, intro?: string, ministries?: any[], button?: string }) => {
  const featuredMinistries = ministries || services?.filter(service =>
    ['Youth', 'Women', 'Men', 'Children'].some(keyword => service.title.toLowerCase().includes(keyword.toLowerCase()))
  ).slice(0, 4);

  if (!featuredMinistries || featuredMinistries.length === 0) return null;

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-inter text-foreground">{headline || 'Our Ministries'}</h2>
          {intro && <p className="text-lg mt-4">{intro}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredMinistries.map((ministry, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <img
                src={ministry.image ? urlFor(ministry.image).url() : `https://via.placeholder.com/120x80?text=${encodeURIComponent(ministry.name || ministry.title)}`}
                alt={ministry.name || ministry.title}
                className="w-full h-32 object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-semibold text-foreground mb-2">{ministry.name || ministry.title}</h3>
              <p className="text-muted-foreground mb-4 text-sm line-clamp-3">{ministry.description}</p>
              <Link href="/ministries">
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Explore
                </button>
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/ministries">
            <button className="border border-primary text-primary px-6 py-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors">
              {button || 'View All Ministries'}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MinistriesPreview;
