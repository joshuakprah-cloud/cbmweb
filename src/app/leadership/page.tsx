import { client } from '../../../sanity/lib/client'
import { urlFor } from '../../../sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { FaUsers, FaPrayingHands, FaBookOpen, FaHands, FaHeart, FaDirections } from 'react-icons/fa'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Church Leadership | ThaGospel Church',
  description: 'Meet the dedicated leadership team at ThaGospel Church. Learn about our pastors and leaders who guide our community with wisdom and compassion.',
  openGraph: {
    title: 'Church Leadership | ThaGospel Church',
    description: 'Meet the dedicated leadership team at ThaGospel Church.',
    type: 'website',
  },
}

export default async function Leadership() {
  const leaders = await client.fetch(`*[_type == "author"] | order(name asc)`)
  const leadershipData = await client.fetch('*[_type == "leadership"][0]', {}, { next: { revalidate: 60 } })

  // Assuming senior pastors are those with names containing "Prophet" or specific names
  const seniorPastors = leaders.filter((leader: any) =>
    leader.name?.toLowerCase().includes('prophet') ||
    leader.name?.toLowerCase().includes('powerman') ||
    leader.name?.toLowerCase().includes('bekoe')
  )
  const otherLeaders = leaders.filter((leader: any) => !seniorPastors.includes(leader))

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-background text-foreground">
        {/* Hero Section */}
        <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{leadershipData?.heroHeadline || "Church Leadership"}</h1>
            <p className="text-xl">{leadershipData?.heroSubtext || "Meet the dedicated team serving God and our community"}</p>
          </div>
        </div>

      {/* Lead Pastor Spotlight */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-400 mb-2">👨‍💼</div>
                  <div className="text-sm text-gray-500">Lead Pastor Image</div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Prophet Isaac Bekoe
              </h2>
              <h3 className="text-xl text-blue-600 font-semibold mb-6">
                Lead Pastor
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Prophet Isaac Bekoe is the founding pastor and spiritual leader of ThaGospel Church. With over two decades of ministry experience, he has dedicated his life to preaching the Gospel and building a community rooted in faith, love, and service.
                </p>
                <p>
                  His prophetic ministry and apostolic calling have guided thousands in their spiritual journey, helping them discover God's purpose for their lives. He is passionate about creating an environment where people can encounter God, grow in their faith, and serve their community.
                </p>
                <p>
                  Under his leadership, ThaGospel Church has grown from a small gathering to a thriving congregation committed to spreading the love of Christ throughout Ghana and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Leadership Team Grid */}
        {otherLeaders.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Leadership Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherLeaders.map((leader: any) => (
                <div key={leader._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gray-300 flex items-center justify-center">
                    {leader.image ? (
                      <img src={urlFor(leader.image).url()} alt={leader.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-600 text-lg">Leader Photo</span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{leader.name}</h3>
                    <p className="text-purple-600 font-semibold mb-4">Church Leader</p>
                    {leader.bio && (
                      <div className="prose">
                        <PortableText value={leader.bio} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      {/* Ministry Leaders */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ministry Leaders
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dedicated leaders who oversee our various ministry programs and serve our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Youth Ministry Leader */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center border border-gray-100">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <FaUsers className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Sarah Mensah</h3>
              <p className="text-blue-600 font-semibold mb-2">Youth Ministry Leader</p>
              <p className="text-gray-600 text-sm">Youth Programs</p>
            </div>

            {/* Worship Leader */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center border border-gray-100">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <FaPrayingHands className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">David Asante</h3>
              <p className="text-purple-600 font-semibold mb-2">Worship Leader</p>
              <p className="text-gray-600 text-sm">Music Ministry</p>
            </div>

            {/* Outreach Leader */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center border border-gray-100">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <FaHands className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Grace Ofori</h3>
              <p className="text-green-600 font-semibold mb-2">Outreach Leader</p>
              <p className="text-gray-600 text-sm">Community Service</p>
            </div>

            {/* Children's Ministry Leader */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center border border-gray-100">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold text-white">C</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Mary Johnson</h3>
              <p className="text-red-600 font-semibold mb-2">Children's Ministry</p>
              <p className="text-gray-600 text-sm">Kids Programs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join a Ministry */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Serve With Us
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            God has given each of us unique gifts to serve His church and community. Discover your calling and join our ministry teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/ministries"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <FaDirections className="w-5 h-5 mr-2" />
              Get Involved
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center"
            >
              <FaUsers className="w-5 h-5 mr-2" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      </div>
      <Footer />
    </div>
  )
}
