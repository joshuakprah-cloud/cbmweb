const Services = ({ homepage }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{homepage?.servicesHeadline}</h2>
          <p className="text-lg text-gray-600 mb-8">{homepage?.location}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Service Times</h3>
              {homepage?.serviceTimes?.map((time, index) => (
                <p key={index} className="text-gray-600">{time}</p>
              ))}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Midweek Service</h3>
              <p className="text-gray-600">{homepage?.midweekService}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600">{homepage?.location}</p>
              <p className="text-sm text-gray-500 mt-2">{homepage?.servicesSmallLine}</p>
            </div>
          </div>
          <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
            {homepage?.servicesButton}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
