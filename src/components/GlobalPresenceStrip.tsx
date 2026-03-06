const GlobalPresenceStrip = ({ homepage }: { homepage: any }) => {
  const locations = [
    { country: 'Ghana (HQ)', flag: '🇬🇭' },
    { country: 'United Kingdom', flag: '🇬🇧' },
    { country: 'Zimbabwe', flag: '🇿🇼' },
    { country: 'Germany', flag: '🇩🇪' },
  ];

  return (
    <section className="py-16 bg-red-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-8">One Church. Multiple Nations.</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {locations.map((location, index) => (
            <div key={index} className="bg-white/10 rounded-lg p-6 text-center hover:bg-white/20 transition-colors">
              <div className="text-4xl mb-4">{location.flag}</div>
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
