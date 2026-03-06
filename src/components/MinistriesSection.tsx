const MinistriesSection = ({ homepage }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{homepage?.ministriesHeadline}</h2>
          <p className="text-lg text-gray-600 mb-8">{homepage?.ministriesIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {homepage?.ministries?.map((ministry, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{ministry.name}</h3>
                <p className="text-gray-600 mb-4">{ministry.description}</p>
              </div>
            ))}
          </div>
          <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
            {homepage?.ministriesButton}
          </button>
        </div>
      </div>
    </section>
  );
};

export default MinistriesSection;
