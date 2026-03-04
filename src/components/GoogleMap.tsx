const GoogleMap = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Find Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visit us at our location. We welcome everyone to join our community.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg">
            <div className="h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-muted-foreground">Google Maps Placeholder</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Church Address: 123 Faith Street, Gospel City, GC 12345
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleMap;
