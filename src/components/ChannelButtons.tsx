const ChannelButtons = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Join Our Community
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay connected with our latest updates and messages through our channels.
          </p>
        </div>
        <div className="flex justify-center space-x-6">
          <a
            href="#"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <span>📱</span>
            <span>Join WhatsApp</span>
          </a>
          <a
            href="#"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <span>✈️</span>
            <span>Join Telegram</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ChannelButtons;
