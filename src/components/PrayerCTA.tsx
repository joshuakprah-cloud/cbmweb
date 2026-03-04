import Link from 'next/link';

const PrayerCTA = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold font-inter text-foreground mb-4">Need Prayer?</h2>
        <p className="text-muted-foreground mb-6">We're here to pray with you and support you through life's challenges.</p>
        <Link href="/prayer">
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
            Submit Prayer Request
          </button>
        </Link>
      </div>
    </section>
  );
};

export default PrayerCTA;
