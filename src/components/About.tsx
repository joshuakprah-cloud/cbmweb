const About = ({ homepage }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{homepage?.aboutHeadline}</h2>
            <p className="text-lg text-gray-600 mb-8">{homepage?.aboutContent}</p>
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
              {homepage?.aboutButton}
            </button>
          </div>
          <div className="relative">
            <img
              src="/placeholder-about.jpg"
              alt="About ThaGospel Church"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
