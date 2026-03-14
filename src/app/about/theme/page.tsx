import { FaBible } from 'react-icons/fa'

export const metadata = {
  title: 'This Year\'s Theme - ThaGospel Church',
  description: 'Discover this year\'s spiritual theme and focus at ThaGospel Church - Raising Leaders for Kingdom Impact.',
}

export default function ThemePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
            This Year's Theme
          </h1>
          <p className="text-xl md:text-2xl font-light drop-shadow-lg mb-12">
            Our spiritual focus and vision for the coming year
          </p>
        </div>
      </section>

      {/* Theme Display */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-16">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 mb-8 leading-tight">
              Raising Leaders
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              for Kingdom Impact
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-12">
              This year, we are called to rise up as leaders who make a lasting impact
              in God's kingdom. Through discipleship, mentorship, and bold faith,
              we will equip the next generation to carry forward the mission of Christ.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl text-white font-bold">1</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Equip</h4>
                <p className="text-gray-600">Training and preparing leaders for ministry and service</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl text-white font-bold">2</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Empower</h4>
                <p className="text-gray-600">Giving authority and resources to fulfill God's calling</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl text-white font-bold">3</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Impact</h4>
                <p className="text-gray-600">Making a difference in our community and the world</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scripture */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <FaBible className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Scripture Foundation</h2>
          </div>

          <blockquote className="text-2xl md:text-3xl font-light italic leading-relaxed mb-8">
            "And he gave some, apostles; and some, prophets; and some, evangelists;
            and some, pastors and teachers; For the perfecting of the saints, for the work
            of the ministry, for the edifying of the body of Christ."
          </blockquote>

          <cite className="text-xl text-yellow-400 font-semibold">
            — Ephesians 4:11-12 (KJV)
          </cite>
        </div>
      </section>

      {/* Explanation */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Spiritual Focus
            </h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-8"></div>
          </div>

          <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
            <p>
              This year's theme, "Raising Leaders for Kingdom Impact," is rooted in our
              commitment to developing godly leaders who will carry forward the mission
              of Jesus Christ. We believe that every believer is called to leadership in
              some capacity, whether in the church, workplace, family, or community.
            </p>

            <p>
              Throughout this year, we will focus on three key areas: equipping leaders
              with biblical knowledge and practical skills, empowering them with authority
              and resources to fulfill their calling, and mobilizing them to make a
              meaningful impact in God's kingdom.
            </p>

            <p>
              Our prayer is that this year will see a new generation of leaders emerge,
              equipped and empowered to advance God's purposes on earth. We invite you
              to join us in this important work of leadership development and kingdom
              advancement.
            </p>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg">
              2025: Year of Kingdom Impact
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Join the Movement
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Be part of raising leaders who will impact the kingdom of God this year.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/leadership"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
            >
              Meet Our Leaders
            </a>
            <a
              href="/ministries"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Get Involved
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
