import { client } from '../../sanity/lib/client';
import { eventsQuery } from '../../sanity/lib/queries';
import Image from 'next/image';
import { urlFor } from '../../sanity/lib/image';

const UpcomingEvent = async () => {
  const events = await client.fetch(eventsQuery);

  const upcomingEvents = events.slice(0, 3);

  return (
    <section className="py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-inter text-foreground">
          Upcoming Events
        </h2>

        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event: any) => (
              <div key={event._id} className="bg-background rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video relative">
                  <Image
                    src={event.image ? urlFor(event.image).url() : '/placeholder-event.jpg'}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 font-inter text-foreground">{event.title}</h3>
                  <p className="text-muted-foreground mb-4">{new Date(event.date).toLocaleDateString()}</p>
                  <p className="text-foreground mb-6 leading-relaxed line-clamp-3">{event.description}</p>
                  <a href="/events" className="bg-red-600 text-white px-6 py-3 rounded-lg font-inter hover:bg-red-700 transition-colors inline-block">
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <div className="bg-background rounded-lg shadow-lg p-12">
              <h3 className="text-2xl font-bold mb-4 text-foreground">No Upcoming Events</h3>
              <p className="text-muted-foreground mb-6">Check back soon for upcoming events and activities.</p>
              <a href="/events" className="bg-red-600 text-white px-6 py-3 rounded-lg font-inter hover:bg-red-700 transition-colors inline-block">
                View All Events
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvent;
