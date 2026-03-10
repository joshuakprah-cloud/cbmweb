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
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Mission, Vision & Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Mission & Vision</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300">
                To raise believers rooted in biblical truth and empowered to impact nations for Christ through worship, discipleship, and service.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">👁️</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-300">
                To be a thriving multicultural church community that transforms lives and influences society through authentic faith and compassionate action.
              </p>
            </div>

            {/* Values */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Core Values</h3>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Faith in God's Word</li>
                <li>• Authentic Community</li>
                <li>• Excellence in Service</li>
                <li>• Integrity & Character</li>
                <li>• Compassionate Outreach</li>
              </ul>
            </div>
          </div>
        </section>

        {/* What We Believe */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">What We Believe</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "The Bible", desc: "We believe the Bible is God's inspired Word, the ultimate authority for faith and practice." },
              { title: "Jesus Christ", desc: "We believe in Jesus as the Son of God, our Savior, and Lord of all." },
              { title: "Salvation", desc: "We believe salvation comes through faith in Jesus Christ and His finished work on the cross." },
              { title: "The Holy Spirit", desc: "We believe in the Holy Spirit who empowers believers for service and witness." },
              { title: "The Church", desc: "We believe the church is the body of Christ, called to worship, fellowship, and mission." },
              { title: "The Kingdom", desc: "We believe in God's Kingdom purposes and the hope of Christ's return." }
            ].map((belief, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">{belief.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{belief.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="/beliefs"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Read Full Statement of Faith
            </a>
          </div>
        </section>

        {/* Meet Our Spiritual Leaders */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Spiritual Leaders</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Prophet/Lead Pastor */}
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-lg overflow-hidden shadow-lg">
                {homepageData?.prophetImage ? (
                  <Image
                    src={urlFor(homepageData.prophetImage).url()}
                    alt={homepageData.prophetName || 'Lead Prophet'}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-4xl text-white">👨‍⚖️</span>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">{homepageData?.prophetName || 'Prophet John Doe'}</h3>
              <p className="text-blue-600 dark:text-blue-400">{homepageData?.prophetTitle || 'Lead Prophet'}</p>
            </div>

            {/* First Lady */}
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-lg overflow-hidden shadow-lg">
                {homepageData?.firstLadyImage ? (
                  <Image
                    src={urlFor(homepageData.firstLadyImage).url()}
                    alt={homepageData.firstLadyName || 'First Lady'}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                    <span className="text-4xl text-white">👩‍⚖️</span>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">{homepageData?.firstLadyName || 'Lady Jane Doe'}</h3>
              <p className="text-blue-600 dark:text-blue-400">{homepageData?.firstLadyTitle || 'First Lady'}</p>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="text-center max-w-4xl mx-auto">
            <blockquote className="text-lg md:text-xl italic text-gray-700 dark:text-gray-300">
              "{homepageData?.leadersWelcomeMessage || "Welcome to ThaGospel Church. Our heart is to raise believers rooted in truth and empowered for impact across nations."}"
            </blockquote>
          </div>
        </section>

        {/* Our Ministries */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Ministries</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Children's Ministry", icon: "👶", desc: "Nurturing young hearts in faith and fun" },
              { name: "Youth Ministry", icon: "🎸", desc: "Empowering teens to live out their faith" },
              { name: "Men's Ministry", icon: "👥", desc: "Building godly men and leaders" },
              { name: "Women's Ministry", icon: "💃", desc: "Supporting and strengthening women" },
              { name: "Worship Ministry", icon: "🎵", desc: "Leading hearts in praise and worship" },
              { name: "Outreach Ministry", icon: "🤝", desc: "Serving our community with love" }
            ].map((ministry, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-4">{ministry.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{ministry.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{ministry.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Join Our Family */}
        <section className="mb-16 bg-gradient-to-r from-green-600 to-blue-600 text-white py-16 rounded-lg">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Church Family</h2>
            <p className="text-xl mb-8 opacity-90">
              We welcome you to be part of a growing community of believers dedicated to faith, fellowship, and service.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/plan-your-visit" className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Plan Your Visit
              </a>
              <a href="/ministries" className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                Join a Ministry
              </a>
              <a href="/contact" className="bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </section>

        {/* Contact & Location */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Visit Us</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">📍 Address</h3>
                <p className="text-gray-700 dark:text-gray-300">ThaGospel Church<br />Accra, Ghana</p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">⏰ Service Times</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Sunday: 7:30 AM & 10:30 AM<br />
                  Midweek Service: Wednesday 7:00 PM
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">📞 Contact</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Phone: [Church Phone]<br />
                  Email: info@thagospel.org
                </p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">🗺️ Location</h3>
              <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-600 dark:text-gray-400">Interactive Map</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Click for directions</p>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Get Directions
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
