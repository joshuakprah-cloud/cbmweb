import { client } from '../../../sanity/lib/client'
import { urlFor } from '../../../sanity/lib/image'
import { PortableText } from '@portabletext/react'
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

        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Introduction */}
          <section className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-8">Our Leadership Team</h2>
            <p className="text-lg max-w-3xl mx-auto">
              {leadershipData?.intro || "Our leadership team is committed to serving God and guiding our congregation with wisdom, compassion, and dedication. Each member brings unique gifts and experiences to help fulfill our mission of spreading God's word and building His kingdom."}
            </p>
          </section>

        {/* Senior Pastor Spotlight */}
        {seniorPastors.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Senior Pastors</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {seniorPastors.map((pastor: any) => (
                <div key={pastor._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-64 bg-gray-300 flex items-center justify-center">
                    {pastor.image ? (
                      <img src={urlFor(pastor.image).url()} alt={pastor.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-600 text-lg">Pastor Photo</span>
                    )}
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{pastor.name}</h3>
                    <p className="text-purple-600 font-semibold mb-4">Senior Pastor</p>
                    {pastor.bio && (
                      <div className="prose prose-lg">
                        <PortableText value={pastor.bio} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

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

        {/* Leadership Philosophy */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Leadership Philosophy</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {leadershipData?.philosophy?.map((item: any, index: number) => (
              <div key={index}>
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-lg">{item.content}</p>
              </div>
            )) || (
              <>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Servant Leadership</h3>
                  <p className="text-lg">Following Jesus' example, our leaders serve with humility and love, putting the needs of others first.</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Spiritual Growth</h3>
                  <p className="text-lg">We are committed to ongoing spiritual development, ensuring our leadership remains grounded in God's Word.</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Community Focus</h3>
                  <p className="text-lg">Our leadership works to build and maintain a strong, supportive community where everyone can thrive.</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Visionary Direction</h3>
                  <p className="text-lg">Guided by God's vision, we lead with purpose and direction to fulfill His plans for our church.</p>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Serve CTA Section */}
        <section className="text-center bg-green-600 text-white p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Serve With Us</h2>
          <p className="text-lg mb-6">
            God has given each of us unique gifts to serve His church and community.
            Discover your calling and join our ministry teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/ministries" className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Explore Ministries
            </a>
            <a href="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Get Involved
            </a>
          </div>
        </section>
      </div>
      </div>
      <Footer />
    </div>
  )
}
