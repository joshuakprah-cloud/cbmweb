const Services = ({ homepage }: { homepage: any }) => {
  const services = [
    {
      title: "Sunday Worship",
      time: homepage?.serviceTimes?.join(" & ") || "8:00 AM & 10:30 AM",
      description: "Spirit-filled worship and practical biblical teaching."
    },
    {
      title: "Midweek Service",
      time: homepage?.midweekService || "Wednesday 6:30 PM",
      description: "Prayer, teaching, and spiritual growth."
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Service Times</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md text-center">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">Time: {service.time}</p>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
          <button className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            {homepage?.servicesButton}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
