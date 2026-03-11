import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaTwitter, FaInstagram, FaCross, FaUsers, FaHandHoldingHeart, FaBible } from 'react-icons/fa'

export const metadata = {
  title: 'About Our Church - ThaGospel Church',
  description: 'Learn about ThaGospel Church - our mission, vision, values, and story of faith and community.',
}

export default function AboutOverview() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
            About Our Church
          </h1>
          <p className="text-xl md:text-2xl font-light drop-shadow-lg mb-12">
            Raising Leaders, Shaping Visions & Influencing Society through Christ
          </p>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Welcome Text */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Welcome to ThaGospel Church
              </h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  At ThaGospel Church, we believe in creating a welcoming community where faith comes alive,
                  lives are transformed, and relationships flourish. Our church is more than just a place
                  of worship—it's a family that supports, encourages, and grows together.
                </p>
                <p>
                  Whether you're exploring faith for the first time or seeking to deepen your spiritual journey,
                  you'll find a place where you belong. We are committed to spreading the gospel, nurturing
                  spiritual growth, and making a positive impact in our community and beyond.
                </p>
              </div>
            </div>

            {/* Right Column - Pastor Images */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              {/* Pastor 1 */}
              <div className="flex flex-col items-center">
                <div className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-2xl bg-white">
                  <Image
                    src="/placeholder-pastor1.jpg"
                    alt="Senior Pastor"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <p className="text-xl font-bold text-gray-900 mt-6 mb-4">Prophet Christopher Yaw Annor</p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <FaFacebookF className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <FaTwitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                    <FaInstagram className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Pastor 2 */}
              <div className="flex flex-col items-center">
                <div className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-2xl bg-white">
                  <Image
                    src="/placeholder-pastor2.jpg"
                    alt="Lady Pastor"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <p className="text-xl font-bold text-gray-900 mt-6 mb-4">Lady Pastor Name</p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <FaFacebookF className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <FaTwitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                    <FaInstagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Mission, Vision & Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The foundation of everything we do at ThaGospel Church
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <FaCross className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To spread the gospel of Jesus Christ, nurture spiritual growth, and make disciples
                who impact their communities and the world for God's kingdom.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <FaUsers className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be a vibrant faith community where lives are transformed, leaders are raised,
                and God's love is demonstrated through service and outreach.
              </p>
            </div>

            {/* Values */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6">
                <FaHandHoldingHeart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <p className="text-gray-700 leading-relaxed">
                Faith in Christ, love for people, excellence in ministry, integrity in leadership,
                and commitment to community transformation through biblical truth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Church History */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Our Story</h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              ThaGospel Church was founded with a vision to create a spiritual home where people from
              all walks of life could encounter God's love and discover their purpose. What began as
              a small gathering of believers has grown into a thriving community of faith, hope, and love.
            </p>
            <p>
              Through years of prayer, dedication, and faithful service, our church has become a beacon
              of hope in our community. We continue to grow, not just in numbers, but in our commitment
              to spreading God's word and making a lasting impact in the lives of those we serve.
            </p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Experience the love of Christ and discover your place in our faith family.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/plan-your-visit"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
            >
              Plan Your Visit
            </Link>
            <Link
              href="/sermons"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Watch Sermons
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
