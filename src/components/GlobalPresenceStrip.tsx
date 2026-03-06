const GlobalPresenceStrip = ({ homepage }) => {
  const locations = [
    { country: 'Ghana (HQ)', flag: '🇬🇭' },
    { country: 'UK', flag: '🇬🇧' },
    { country: 'Zimbabwe', flag: '🇿🇼' },
    { country: 'Germany', flag: '🇩🇪' },
  ];

  return (
    <section className="py-16 bg-red-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">{homepage?.globalHeadline}</h2>
        <p className="text-lg mb-8">{homepage?.globalContent}</p>
        <div className="flex justify-center items-center space-x-6">
          {locations.map((location, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-2xl">{location.flag}</span>
              <span className="text-sm md:text-base font-medium">{location.country}</span>
            </div>
          ))}
        </div>
        <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          {homepage?.globalButton}
        </button>
      </div>
    </section>
  );
};

export default GlobalPresenceStrip;
