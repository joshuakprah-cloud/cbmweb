import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaTwitter, FaInstagram, FaCross, FaUsers, FaHandHoldingHeart, FaBible, FaPrayingHands, FaHands, FaHeart, FaCalendarAlt, FaVideo, FaUserFriends, FaChurch, FaBookOpen, FaHome } from 'react-icons/fa'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'About Our Church - ThaGospel Church',
  description: 'Learn about ThaGospel Church - our mission, vision, values, and story of faith and community.',
}

export default function AboutOverview() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero / Page Introduction */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            About ThaGospel Church
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            ThaGospel Church is a vibrant faith community dedicated to raising leaders, shaping visions, and influencing society through Christ. We are committed to spreading the gospel, nurturing spiritual growth, and building disciples who make a lasting impact in their communities and the world.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  ThaGospel Church was founded with a vision to create a spiritual home where people from all walks of life could encounter God's love and discover their purpose. What began as a small gathering of believers has grown into a thriving community of faith, hope, and love.
                </p>
                <p>
                  Through years of prayer, dedication, and faithful service, our church has become a beacon of hope in our community. We continue to grow, not just in numbers, but in our commitment to spreading God's word and making a lasting impact in the lives of those we serve.
                </p>
                <p>
                  Our story is one of transformation, community, and unwavering faith in God's promises. Join us as we continue to write new chapters in our journey of faith.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="w-80 h-80 bg-gray-100 rounded-lg mx-auto flex items-center justify-center border-4 border-gray-300">
                <div className="text-center">
                  <div className="text-6xl font-bold text-gray-400 mb-2">LOGO</div>
                  <div className="text-sm text-gray-500">Church Logo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Core Beliefs */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mission, Vision & Core Beliefs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The foundation of everything we do at ThaGospel Church
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <FaCross className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To spread the gospel of Jesus Christ, nurture spiritual growth, and make disciples who impact their communities and the world for God's kingdom.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <FaUsers className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be a vibrant faith community where lives are transformed, leaders are raised, and God's love is demonstrated through service and outreach.
              </p>
            </div>

            {/* Core Beliefs */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6">
                <FaBible className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Core Beliefs</h3>
              <div className="text-gray-700 leading-relaxed">
                <ul className="space-y-2">
                  <li>• The Bible</li>
                  <li>• Salvation</li>
                  <li>• Worship</li>
                  <li>• Community</li>
                  <li>• Prayer</li>
                  <li>• Fellowship</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Leadership
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated leaders who guide our church community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="w-48 h-64 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500">Portrait Photo</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Pastor John Doe</h3>
              <p className="text-blue-600 font-medium">Lead Pastor</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="w-48 h-64 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500">Portrait Photo</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Pastor Jane Smith</h3>
              <p className="text-purple-600 font-medium">Associate Pastor</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="w-48 h-64 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500">Portrait Photo</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Elder Michael Johnson</h3>
              <p className="text-green-600 font-medium">Elder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Community / What We Do */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Community
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the ways we serve and impact our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <div className="w-48 h-32 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Worship Services</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Worship Services</h3>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <div className="w-48 h-32 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Prayer Meetings</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Prayer Meetings</h3>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <div className="w-48 h-32 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Youth Ministry</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Youth Ministry</h3>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <div className="w-48 h-32 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Community Outreach</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Community Outreach</h3>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <div className="w-48 h-32 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Bible Study</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Bible Study</h3>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <div className="w-48 h-32 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Family Ministry</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Family Ministry</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Us This Sunday
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience the warmth of our community and discover how faith can transform your life. We welcome everyone with open hearts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/visit" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Plan Your Visit
            </Link>
            <Link href="/sermons" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Watch Sermons
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
