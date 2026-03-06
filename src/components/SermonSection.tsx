const SermonSection = ({ homepage }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{homepage?.sermonHeadline}</h2>
          <p className="text-lg text-gray-600 mb-8">{homepage?.sermonIntro}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
              {homepage?.sermonButton}
            </button>
            <button className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
              {homepage?.sermonSecondaryButton}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SermonSection;
