const RequestPrayer = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Request Prayer
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We believe in the power of prayer. Share your prayer requests with our community and let us pray for you.
          </p>
        </div>
        <div className="max-w-md mx-auto">
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            />
            <textarea
              rows={4}
              placeholder="Your Prayer Request"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Submit Prayer Request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RequestPrayer;
