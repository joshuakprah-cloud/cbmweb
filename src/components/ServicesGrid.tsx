import Link from 'next/link';
import { urlFor } from '../../sanity/lib/image'

const ServicesGrid = ({ services }: { services: any[] }) => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link key={index} href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`} className="group">
              <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <img 
                  src={service.image ? urlFor(service.image).url() : `https://via.placeholder.com/120x80?text=${encodeURIComponent(service.title)}`} 
                  alt={service.title} 
                  className="w-3/4 h-32 object-contain mb-4 rounded mx-auto"
                />
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
