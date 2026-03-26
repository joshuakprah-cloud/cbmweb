import SectionTitle from './SectionTitle';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';

export default function VisitSection() {
  return (
    <section className="py-30 bg-neutral-50">
      <div className="container">
        <SectionTitle
          title="Plan Your Visit"
          subtitle="We'd love to welcome you to our church family. Join us for worship and fellowship."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Service Times */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <FaClock className="w-6 h-6 text-church-blue mr-3" />
                <h3 className="text-xl font-bold font-poppins text-gray-900">Service Times</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-inter text-gray-700">Sunday Worship</span>
                  <span className="font-semibold text-church-blue">8:00 AM</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-inter text-gray-700">Sunday Worship</span>
                  <span className="font-semibold text-church-blue">10:30 AM</span>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <FaMapMarkerAlt className="w-6 h-6 text-church-blue mr-3" />
                <h3 className="text-xl font-bold font-poppins text-gray-900">Location</h3>
              </div>
              <div className="font-inter text-gray-700 space-y-1">
                <p>ThaGospel Church</p>
                <p>Gbeshigon Street, La, Accra, Ghana</p>
                <p>(Near Maale Dada Street)</p>
                <p>Digital Address: GL-020-5834</p>
                <p>P.O. Box GP 2194, Accra, Ghana</p>
              </div>
            </div>

            {/* Get Directions Button */}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=ThaGospel+Church+Gbeshigon+Street+La+Accra+Ghana"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-church-blue text-white font-semibold rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-300 font-inter"
            >
              Get Directions
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Right Column - Google Map */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.8265424175!2d-0.1877!3d5.5612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzMnMzYuMiJOwcrwMTAnMzYuNiJF!5e0!3m2!1sen!2sgh!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ThaGospel Church Location"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
