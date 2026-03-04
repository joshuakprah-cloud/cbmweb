const GlobalPresenceStrip = () => {
  const locations = [
    { country: 'Ghana (HQ)', flag: '🇬🇭' },
    { country: 'UK', flag: '🇬🇧' },
    { country: 'Zimbabwe', flag: '🇿🇼' },
    { country: 'Germany', flag: '🇩🇪' },
  ];

  return (
    <section className="py-12 bg-red-600 text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-8 font-inter">
          One Church. Multiple Nations.
        </h3>
        <div className="flex justify-center items-center space-x-6">
          {locations.map((location, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-2xl">{location.flag}</span>
              <span className="text-sm md:text-base font-medium">{location.country}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalPresenceStrip;
