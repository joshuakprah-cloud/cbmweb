const UpcomingEvents = ({ events }: { events: any[] }) => {
  const displayedEvents = events.slice(0, 3);

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Upcoming Events
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {displayedEvents.map((event, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {event.title}
              </h3>
              <p className="text-muted-foreground mb-1">
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-muted-foreground">
                {event.description}
              </p>
            </div>
          ))}
        </div>
        {events.length > 3 && (
          <div className="text-center">
            <a href="/events" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              View All Events
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;
