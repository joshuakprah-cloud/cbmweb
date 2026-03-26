import Image from 'next/image';
import Link from 'next/link';

const FeaturedSeries = () => {
  return (
    <section className="bg-[#F9FAFB] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-16 items-center">
          {/* Left Column - Large Image (60%) */}
          <div className="lg:col-span-3">
            <div className="aspect-[16/10] relative rounded-2xl overflow-hidden">
              <Image
                src="https://placehold.co/800x500"
                alt="Current teaching series"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column - Text (40%) */}
          <div className="lg:col-span-2">
            <p className="text-sm font-medium text-[#6B7280] uppercase tracking-wider mb-4">
              Now Teaching
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111827] leading-tight mb-6">
              // TODO: Current Series Title
            </h2>
            <p className="text-lg text-[#6B7280] leading-relaxed mb-8">
              // TODO: Join us as we explore this powerful series that will deepen your faith and equip you for the journey ahead. Each week we'll dive into practical applications that transform lives and strengthen our community.
            </p>
            <button className="bg-[#2563EB] hover:scale-105 transition-transform duration-200 text-white font-semibold px-8 py-4 rounded-full">
              Watch Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSeries;
