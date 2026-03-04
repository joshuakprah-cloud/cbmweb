import Link from 'next/link';

const GivingCTA = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold font-inter text-foreground mb-4">Your Generosity Fuels Our Mission</h2>
        <p className="text-muted-foreground mb-6">
          Your generous giving helps us continue our work of spreading God's love and transforming lives in our community.
        </p>
        <Link href="/give">
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
            Give Online
          </button>
        </Link>
      </div>
    </section>
  );
};

export default GivingCTA;
