import Link from 'next/link';

const GetInvolvedBanner = () => {
  return (
    <section className="bg-[#1F2937] py-24 relative">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready To Take A Step?
        </h2>
        <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
          // TODO: Join our community and discover how you can make a difference. Whether through volunteering, giving, or connecting with others, there's a place for you here.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/volunteer"
            className="bg-[#2563EB] hover:scale-105 transition-transform duration-200 text-white font-semibold px-8 py-4 rounded-full inline-block text-center"
          >
            Volunteer
          </Link>
          <Link
            href="/give"
            className="border-2 border-white text-white hover:bg-white hover:text-[#111827] transition-colors font-semibold px-8 py-4 rounded-full inline-block text-center"
          >
            Give
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedBanner;
