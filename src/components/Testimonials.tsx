const Testimonials = ({ testimonies, headline, testimonials, button }: { testimonies?: any[], headline?: string, testimonials?: any[], button?: string }) => {
  const displayedTestimonies = (testimonials || testimonies || []).slice(0, 3);

  if (displayedTestimonies.length === 0) return null;

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-inter text-foreground">{headline || 'Lives Are Being Transformed'}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {displayedTestimonies.map((testimony, index) => (
            <div key={testimony._id || index} className="bg-card border border-border rounded-lg p-6 shadow-md">
              <p className="text-foreground mb-4 italic">"{testimony.message || testimony}"</p>
              <p className="text-sm text-muted-foreground font-semibold">- {testimony.name || 'Anonymous'}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            {button || 'Share Your Story'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
