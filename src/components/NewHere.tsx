import Link from 'next/link';

const NewHere = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-inter text-foreground">New Here?</h2>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl mx-auto">
            We're so glad you've found us! Whether you're exploring faith for the first time or looking for a new church home, you're welcome here at ThaGospel Church.
          </p>
          <ul className="text-left max-w-md mx-auto mb-8 space-y-2 text-muted-foreground">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>What to expect: Warm welcome, inspiring worship, and life-changing messages</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Service duration: Approximately 90-120 minutes</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Kids ministry available for ages 0-12 during services</span>
            </li>
          </ul>
          <Link href="/plan-your-visit">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-inter hover:bg-primary/90 transition-colors">
              Plan Your Visit
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewHere;
