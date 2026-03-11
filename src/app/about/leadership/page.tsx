import Image from 'next/image'
import { FaFacebookF, FaTwitter, FaInstagram, FaUserTie, FaHandsHelping, FaMusic } from 'react-icons/fa'

export const metadata = {
  title: 'Our Leadership - ThaGospel Church',
  description: 'Meet the dedicated leaders and pastors who guide ThaGospel Church in ministry and service.',
}

export default function LeadershipPage() {
  const leadershipTeam = [
    {
      name: "Pastor David Johnson",
      role: "Youth Pastor",
      bio: "Passionate about reaching the next generation with God's love and truth.",
      image: "/placeholder-pastor3.jpg",
      social: { facebook: "#", twitter: "#", instagram: "#" }
    },
    {
      name: "Pastor Sarah Williams",
      role: "Worship Leader",
      bio: "Leading our congregation in powerful worship experiences that draw us closer to God.",
      image: "/placeholder-pastor4.jpg",
      social: { facebook: "#", twitter: "#", instagram: "#" }
    },
    {
      name: "Pastor Michael Brown",
      role: "Outreach Director",
      bio: "Dedicated to extending God's love and care to our community through service and outreach.",
      image: "/placeholder-pastor5.jpg",
      social: { facebook: "#", twitter: "#", instagram: "#" }
    },
    {
      name: "Pastor Emily Davis",
      role: "Children's Ministry",
      bio: "Nurturing young hearts and minds with biblical truths and God's amazing love.",
      image: "/placeholder-pastor6.jpg",
      social: { facebook: "#", twitter: "#", instagram: "#" }
    },
    {
      name: "Pastor Robert Wilson",
      role: "Elder",
      bio: "Providing spiritual guidance and wisdom to our church family.",
      image: "/placeholder-pastor7.jpg",
      social: { facebook: "#", twitter: "#", instagram: "#" }
    },
    {
      name: "Pastor Lisa Garcia",
      role: "Prayer Ministry",
      bio: "Leading our prayer efforts and helping others develop deeper prayer lives.",
      image: "/placeholder-pastor8.jpg",
      social: { facebook: "#", twitter: "#", instagram: "#" }
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
            Our Leadership
          </h1>
          <p className="text-xl md:text-2xl font-light drop-shadow-lg mb-12">
            Dedicated servants leading with vision, faith, and love
          </p>
        </div>
      </section>

      {/* Senior Pastor Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet Our Senior Pastor
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A visionary leader called to shepherd our church family
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image Side */}
              <div className="relative h-96 lg:h-auto">
                <Image
                  src="/placeholder-pastor1.jpg"
                  alt="Senior Pastor"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Content Side */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Prophet Christopher Yaw Annor</h3>
                <p className="text-lg text-blue-600 font-semibold mb-6">Senior Pastor & Founder</p>

                <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
                  <p>
                    Prophet Christopher Yaw Annor is a dynamic leader with a heart for God and a passion
                    for seeing lives transformed through the power of the Gospel. With over two decades
                    of ministry experience, he has led ThaGospel Church from its humble beginnings to
                    becoming a thriving community of faith.
                  </p>
                  <p>
                    His vision is to raise leaders who will impact their generation for Christ, and his
                    teachings combine biblical truth with practical wisdom for everyday living. Under
                    his leadership, the church has grown not just in numbers, but in spiritual depth
                    and community impact.
                  </p>
                </div>

                {/* Social Media Links */}
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                    aria-label="Facebook"
                  >
                    <FaFacebookF className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                    aria-label="Twitter"
                  >
                    <FaTwitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A dedicated team of ministers and leaders serving with passion and purpose
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipTeam.map((leader, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow group">
                {/* Image */}
                <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6 bg-white">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{leader.name}</h3>
                  <p className="text-blue-600 font-semibold mb-4">{leader.role}</p>
                  <p className="text-gray-600 leading-relaxed mb-6">{leader.bio}</p>

                  {/* Social Media */}
                  <div className="flex justify-center space-x-3">
                    <a
                      href={leader.social.facebook}
                      className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                      aria-label="Facebook"
                    >
                      <FaFacebookF className="w-4 h-4" />
                    </a>
                    <a
                      href={leader.social.twitter}
                      className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                      aria-label="Twitter"
                    >
                      <FaTwitter className="w-4 h-4" />
                    </a>
                    <a
                      href={leader.social.instagram}
                      className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
                      aria-label="Instagram"
                    >
                      <FaInstagram className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Join Our Ministry Team
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Feel called to serve? We'd love to connect with you about ministry opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
            >
              Get in Touch
            </a>
            <a
              href="/ministries"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Explore Ministries
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
