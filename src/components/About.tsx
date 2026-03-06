import Image from 'next/image';

const About = ({ homepage }: { homepage: any }) => {
  const overview = homepage?.aboutContent || "ThaGospel Church is a Christ-centered church committed to raising believers rooted in truth, growing in faith, and impacting nations.";

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{homepage?.aboutHeadline || "About Us"}</h2>
            <p className="text-lg text-gray-600 mb-8">{overview}</p>
            <a href="/about" className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-block">
              Learn More
            </a>
          </div>
          <div className="relative">
            <Image
              src="/placeholder-about.jpg"
              alt="About ThaGospel Church"
              width={500}
              height={400}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
