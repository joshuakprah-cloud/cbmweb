import { client } from '../../../sanity/lib/client'
import { urlFor } from '../../../sanity/lib/image'
import Image from 'next/image'

export const metadata = {
  title: 'About Us - ThaGospel Church',
  description: 'Learn about ThaGospel Church - our story, mission, vision, beliefs, leadership, and community impact.',
}

export default async function About() {
  // Fetch homepage data which contains about-related content
  const homepageData = await client.fetch('*[_type == "homepage"][0]', {}, { next: { revalidate: 60 } })

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="relative h-96 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 flex items-center justify-center overflow-hidden"
        style={homepageData?.heroBackgroundImage ? {
          backgroundImage: `url(${urlFor(homepageData.heroBackgroundImage).url()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        } : undefined}
      >
        {homepageData?.heroBackgroundImage && <div className="absolute inset-0 bg-black/50"></div>}
        {!homepageData?.heroBackgroundImage && <div className="absolute inset-0 bg-black/20"></div>}

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            {homepageData?.heroHeadline || 'About ThaGospel Church'}
          </h1>
          <p className="text-xl md:text-2xl drop-shadow-md mb-6">
            {homepageData?.heroSubtext || "Discover our story, mission, and the heart of our faith community."}
          </p>

          {/* Feature Indicators */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base mb-8">
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="mr-2">👨‍👩‍👧‍👦</span>
              <span className="font-medium">Family Focused</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="mr-2">📖</span>
              <span className="font-medium">Bible Centered</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="mr-2">🙏</span>
              <span className="font-medium">Spirit Led</span>
            </div>
          </div>
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
