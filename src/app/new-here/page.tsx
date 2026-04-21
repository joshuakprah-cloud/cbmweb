import Image from 'next/image'
import Link from 'next/link'
import { FaUsers, FaPrayingHands, FaBookOpen, FaClock, FaMapMarkerAlt, FaDirections, FaEnvelope, FaHeart, FaHands, FaChild, FaUserFriends, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import Navbar from '@/components/navbar/Navbar'
import { Footer } from '@/components/footer/Footer'

export const metadata = {
  title: 'New Here? - ThaGospel Church',
  description: 'Welcome to ThaGospel Church! Discover what to expect, our service times, and how to find us.',
}

export default function NewHerePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            New Here?
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-6">
            We're so glad you're here.
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto">
            First-time visitors are always welcome at ThaGospel Church. Whether you're exploring faith for the first time or looking for a new church home, you'll find a warm, welcoming community ready to embrace you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/plan-your-visit" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Plan Your Visit
            </Link>
            <Link href="/watch-live" className="bg-gray-100 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              Watch Online
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Welcome to ThaGospel Church
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  At ThaGospel Church, we believe that church should be a place where everyone feels welcome, valued, and loved. Our community is made up of people from all walks of life, united by our shared faith in Jesus Christ and our commitment to supporting one another.
                </p>
                <p>
                  Whether you're exploring Christianity for the first time, returning to church after a long break, or simply looking for a spiritual home, you'll find open arms and genuine warmth here. We don't expect you to be perfect – we just ask that you come as you are.
                </p>
                <p>
                  Our services are designed to be accessible and engaging, with a focus on creating an atmosphere where you can encounter God, connect with others, and grow in your faith journey. From our vibrant worship music to our practical biblical teaching, every element is crafted with the hope of helping you experience God's love in a real and meaningful way.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-400 mb-2">👥</div>
                  <div className="text-sm text-gray-500">Church Community Image</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
              <div className="w-64 h-48 bg-gray-200 rounded-lg mx-auto mb-6 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Sunday Service Flyer</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Sunday Service</h3>
              <p className="text-lg text-blue-600 font-semibold mb-2">Main Worship</p>
              <p className="text-gray-700 font-medium">Every Sunday</p>
              <p className="text-gray-700">9:00 AM - 11:30 AM</p>
            </div>

            {/* Wednesday Prayer */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg text-center">
              <div className="w-64 h-48 bg-gray-200 rounded-lg mx-auto mb-6 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Prayer Meeting Flyer</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Prayer Meeting</h3>
              <p className="text-lg text-purple-600 font-semibold mb-2">Midweek Prayer</p>
              <p className="text-gray-700 font-medium">Every Wednesday</p>
              <p className="text-gray-700">6:00 PM - 8:00 PM</p>
            </div>

            {/* Friday Youth */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg text-center">
              <div className="w-64 h-48 bg-gray-200 rounded-lg mx-auto mb-6 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Youth Fellowship Flyer</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Youth Fellowship</h3>
              <p className="text-lg text-green-600 font-semibold mb-2">Youth Night</p>
              <p className="text-gray-700 font-medium">Every Friday</p>
              <p className="text-gray-700">7:00 PM - 9:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ministries For Everyone */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ministries For Everyone
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We have dedicated groups and programs designed to meet people at every stage of life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Children */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <FaChild className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Children</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Fun, engaging programs that help kids grow in faith while having a great time.
              </p>
            </div>

            {/* Youth */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <FaUserFriends className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Youth</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Dynamic fellowship and leadership development for teenagers and young adults.
              </p>
            </div>

            {/* Young Adults */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <FaUsers className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Young Adults</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Community and connection for those navigating the exciting challenges of adulthood.
              </p>
            </div>

            {/* Families */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <FaHands className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Families</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Support and resources to help families grow stronger in faith together.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Find Us
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Located in the heart of the community, easily accessible by car and public transport
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map */}
            <div className="w-full h-96 bg-gray-800 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.8265424175!2d-0.1877!3d5.5612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzMnMzYuMiJOwcrwMTAnMzYuNiJF!5e0!3m2!1sen!2sgh!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ThaGospel Church Accra Ghana"
              />
            </div>

            {/* Address Information */}
            <div className="space-y-8">
              <div className="flex items-start">
                <FaMapMarkerAlt className="w-8 h-8 text-red-400 mt-1 flex-shrink-0 mr-4" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Address</h3>
                  <p className="text-gray-300 leading-relaxed">
                    ThaGospel Church<br />
                    Gbeshigon Street, La, Accra, Ghana<br />
                    (Near Maale Dada Street)<br />
                    Digital Address: GL-020-5834<br />
                    P.O. Box GP 2194, Accra, Ghana
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FaClock className="w-8 h-8 text-blue-400 mt-1 flex-shrink-0 mr-4" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Parking</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Free parking available on church grounds. Accessible parking spaces are available for those with mobility needs. Our parking lot is well-lit and easily accessible.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FaDirections className="w-8 h-8 text-green-400 mt-1 flex-shrink-0 mr-4" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Public Transport</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Easily accessible by bus and taxi. The nearest bus stop is just 2 minutes walk from our entrance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              We understand you might have questions. Here are some of the most common ones we hear from first-time visitors.
            </p>
          </div>

          <div className="space-y-4">
            {/* FAQ 1 */}
            <div className="border border-gray-200 rounded-lg">
              <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <span className="font-semibold text-gray-900">What should I wear?</span>
                <FaChevronDown className="w-5 h-5 text-gray-500" />
              </button>
              <div className="px-6 pb-4 text-gray-700">
                Come as you are! We have a casual, welcoming atmosphere. You'll see everything from jeans and t-shirts to more formal attire. The most important thing is that you're comfortable.
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="border border-gray-200 rounded-lg">
              <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <span className="font-semibold text-gray-900">How long is the service?</span>
                <FaChevronDown className="w-5 h-5 text-gray-500" />
              </button>
              <div className="px-6 pb-4 text-gray-700">
                Our Sunday morning service typically runs about 90-120 minutes, including worship, announcements, and the message. We also have coffee and fellowship time afterward.
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="border border-gray-200 rounded-lg">
              <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <span className="font-semibold text-gray-900">Do I need to bring anything?</span>
                <FaChevronDown className="w-5 h-5 text-gray-500" />
              </button>
              <div className="px-6 pb-4 text-gray-700">
                Just yourself! We provide everything you need for the service, including Bibles, hymnals, and children's activity materials. Feel free to bring your own Bible if you prefer.
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="border border-gray-200 rounded-lg">
              <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <span className="font-semibold text-gray-900">Is there parking available?</span>
                <FaChevronDown className="w-5 h-5 text-gray-500" />
              </button>
              <div className="px-6 pb-4 text-gray-700">
                Yes! We have plenty of free parking available on our church grounds. Our parking lot is well-lit and easily accessible. We also have designated accessible parking spaces.
              </div>
            </div>

            {/* FAQ 5 */}
            <div className="border border-gray-200 rounded-lg">
              <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <span className="font-semibold text-gray-900">Is there a place for children?</span>
                <FaChevronDown className="w-5 h-5 text-gray-500" />
              </button>
              <div className="px-6 pb-4 text-gray-700">
                Absolutely! We have a dedicated children's ministry with age-appropriate programs during our Sunday service. Our childcare is provided by trained, background-checked volunteers in a safe, nurturing environment.
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-8 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Plan Your Visit
          </h2>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
            We'd love to welcome you to our church family. Take the next step today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/plan-your-visit" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Directions
            </Link>
            <Link href="/connect/contact" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
