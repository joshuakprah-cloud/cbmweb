import React from 'react';

const GoogleMapSection = () => {
  const churchAddress = "123 Church Street, Accra, Ghana";
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d-0.186236!2d5.603716!3m3!2m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sgh!4v1698989083999!5m2!1sen!2sgh";

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827]">
            Our Location
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Location Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-[#111827] mb-4">
                Visit Us
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#111827] mb-2">Address</h4>
                  <p className="text-[#6B7280] leading-relaxed">
                    {churchAddress}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#111827] mb-2">Description</h4>
                  <p className="text-[#6B7280] leading-relaxed">
                    Located in the heart of Accra, near Independence Arch. 
                    Our church is easily accessible by public transportation and has parking available.
                  </p>
                </div>
              </div>

              {/* Get Directions Button */}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(churchAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105"
              >
                Get Directions
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column - Map */}
          <div>
            <div className="w-full h-[400px] rounded-2xl shadow-lg overflow-hidden">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ThaGospel Church Location"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleMapSection;
