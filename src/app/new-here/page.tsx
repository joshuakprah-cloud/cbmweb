import Image from 'next/image'
import Link from 'next/link'
import { FaUsers, FaPrayingHands, FaBookOpen, FaClock, FaMapMarkerAlt, FaDirections, FaEnvelope } from 'react-icons/fa'

export const metadata = {
  title: 'New Here? - ThaGospel Church',
  description: 'Welcome to ThaGospel Church! Discover what to expect, our service times, and how to find us.',
}

export default function NewHerePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-orange-900 via-red-800 to-pink-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
            New Here?
          </h1>
          <p className="text-2xl md:text-4xl font-light drop-shadow-lg mb-12">
            You Are Welcome
          </p>
          <div className="text-lg md:text-xl drop-shadow-md">
            <p className="mb-4">We're so glad you've found us!</p>
            <p>Here's everything you need to know about joining our community.</p>
          </div>
        </div>
      </section>

      {/* What To Expect */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What To Expect
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the warmth of community and the power of God's presence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Friendly Community */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <FaUsers className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Friendly Community</h3>
              <p className="text-gray-600 leading-relaxed">
                Join a welcoming family where everyone belongs. Our congregation is diverse,
                warm, and ready to embrace you just as you are.
              </p>
            </div>

            {/* Powerful Worship */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <FaPrayingHands className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Powerful Worship</h3>
              <p className="text-gray-600 leading-relaxed">
                Experience dynamic worship that engages your heart, mind, and spirit.
                From contemporary music to heartfelt prayer, every moment draws us closer to God.
              </p>
            </div>

            {/* Practical Teaching */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <FaBookOpen className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Practical Teaching</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive biblical teaching that applies to everyday life. Our messages are
                relevant, encouraging, and designed to help you grow in your faith journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Service Times
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us for worship and fellowship at these times
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sunday Service */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <FaClock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Sunday Service</h3>
              <p className="text-lg text-blue-600 font-semibold mb-2">Main Worship</p>
              <p className="text-gray-700 font-medium">Every Sunday</p>
              <p className="text-gray-700">9:00 AM - 11:30 AM</p>
            </div>

            {/* Wednesday Prayer */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <FaPrayingHands className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Prayer Meeting</h3>
              <p className="text-lg text-purple-600 font-semibold mb-2">Midweek Prayer</p>
              <p className="text-gray-700 font-medium">Every Wednesday</p>
              <p className="text-gray-700">6:00 PM - 8:00 PM</p>
            </div>

            {/* Friday Youth */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <FaUsers className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Youth Fellowship</h3>
              <p className="text-lg text-green-600 font-semibold mb-2">Youth Night</p>
              <p className="text-gray-700 font-medium">Every Friday</p>
              <p className="text-gray-700">7:00 PM - 9:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Find Us
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Located in the heart of the community, easily accessible by car and public transport
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map Placeholder */}
            <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="h-96 bg-gray-700 flex items-center justify-center">
                <div className="text-center">
                  <FaMapMarkerAlt className="w-16 h-16 text-red-400 mx-auto mb-4" />
                  <p className="text-gray-300 text-lg">Google Maps Integration</p>
                  <p className="text-gray-400 text-sm mt-2">Interactive map will be displayed here</p>
                </div>
              </div>
            </div>

            {/* Address & Directions */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-4">Address</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  ThaGospel Church<br />
                  123 Faith Avenue<br />
                  Accra, Ghana<br />
                  West Africa
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Parking</h3>
                <p className="text-gray-300 leading-relaxed">
                  Free parking available on church grounds. Accessible parking spaces
                  are available for those with mobility needs.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Public Transport</h3>
                <p className="text-gray-300 leading-relaxed">
                  Easily accessible by bus and taxi. The nearest bus stop is just
                  2 minutes walk from our entrance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Visit?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            We'd love to welcome you to our church family. Take the next step today!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/plan-your-visit"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <FaDirections className="w-5 h-5 mr-2" />
              Get Directions
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center"
            >
              <FaEnvelope className="w-5 h-5 mr-2" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
export default function NewHerePage() {
