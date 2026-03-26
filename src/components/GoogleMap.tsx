import React from 'react';

const GoogleMap: React.FC = () => {
  // Church address
  const address = '123 Church Street, City, State 12345';
  const encodedAddress = encodeURIComponent(address);

  return (
    <div className="w-full h-[420px] rounded-lg overflow-hidden shadow-md">
      <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Church Location"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
