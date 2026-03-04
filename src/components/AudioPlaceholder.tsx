const AudioPlaceholder = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Latest Audio Podcast
          </h2>
        </div>
        <div className="flex justify-center">
          <div className="bg-card border border-border rounded-lg p-8 max-w-md w-full">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5h3V7h4v5h3l-5 5z"/>
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-foreground text-center mb-2">
              Episode Title Placeholder
            </h3>
            <p className="text-muted-foreground text-center mb-4">
              Description of the latest podcast episode
            </p>
            <div className="flex justify-center">
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Play Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioPlaceholder;
