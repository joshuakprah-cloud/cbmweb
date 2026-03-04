const UpcomingEvent = () => {
  // Placeholder event - in production, fetch from Sanity
  const event = {
    title: 'Annual Church Picnic',
    date: 'June 15, 2024',
    description: 'Join us for a day of fun, food, and fellowship at our annual church picnic. Bring your family and friends for games, BBQ, and community spirit!',
    image: '/placeholder-event.jpg', // Placeholder image
    buttonText: 'Learn More',
  };

  return (
    <section className="py-16 bg-muted">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-inter text-foreground">
          Upcoming Event
        </h2>
        <div className="bg-background rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 md:h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-8">
              <h3 className="text-2xl font-bold mb-2 font-inter text-foreground">{event.title}</h3>
              <p className="text-muted-foreground mb-4">{event.date}</p>
              <p className="text-foreground mb-6 leading-relaxed">{event.description}</p>
              <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-inter hover:bg-red-700 transition-colors">
                {event.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvent;
