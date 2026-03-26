const ServiceTimesLocation = ({ services, headline, location, locationLat, locationLng, serviceTimes, midweek, button, smallLine }: { services: any[], headline?: string, location?: string, locationLat?: number, locationLng?: number, serviceTimes?: any[], midweek?: any, button?: string, smallLine?: string }) => {
  const address = location || "123 Church Street, Accra, Ghana"; // Placeholder address
  const mapQuery = locationLat && locationLng ? `${locationLat},${locationLng}` : encodeURIComponent(address);

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-inter text-foreground">{headline || 'Service Times & Location'}</h2>
          {smallLine && <p className="text-sm mt-4">{smallLine}</p>}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Service Times</h3>
            {serviceTimes && serviceTimes.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-foreground">Sunday Services</h4>
                <ul className="list-disc list-inside text-muted-foreground">
                  {serviceTimes.map((service, index) => (
                    <li key={index}>{service.service} - {service.time}</li>
                  ))}
                </ul>
              </div>
            )}
            {midweek && (
              <div className="mb-4">
                <h4 className="font-semibold text-foreground">{midweek.day} Service</h4>
                <p className="text-muted-foreground">{midweek.description} - {midweek.time}</p>
              </div>
            )}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2 text-foreground">Location</h3>
              <p className="text-muted-foreground">{address}</p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                {button || 'Get Directions'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceTimesLocation;
