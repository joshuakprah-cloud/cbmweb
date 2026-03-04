import { client } from '../../../../sanity/lib/client'
import { PortableText } from '@portabletext/react'
import Navbar from '../../../components/navbar/Navbar'
import Footer from '../../../components/Footer'

interface CoreValue {
  title: string
  description: string
}

export const metadata = {
  title: 'Church Overview | ThaGospel Church',
  description: 'Learn about ThaGospel Church\'s story, mission, vision, and core values.',
  openGraph: {
    title: 'Church Overview | ThaGospel Church',
    description: 'Learn about ThaGospel Church\'s story, mission, vision, and core values.',
    type: 'website',
  },
}

export default async function Overview() {
  const data = await client.fetch(`*[_type == "overviewPage"][0]`)

  if (!data) {
    return (
      <div>
        <Navbar />
        <main className="min-h-screen bg-background text-foreground">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold">Page not found</h1>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        {/* Hero Section */}
        <div className="relative h-96 bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{data.heroTitle || 'About ThaGospel Church'}</h1>
            <p className="text-xl">{data.heroSubtitle || 'Discover our story, mission, and community'}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Our Story Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
            <div className="max-w-4xl mx-auto prose prose-lg">
              {data.story ? <PortableText value={data.story} /> : (
                <p className="text-lg leading-relaxed">
                  ThaGospel Church was founded with a vision to create a vibrant community where faith comes alive and lives are transformed through the power of God's word.
                </p>
              )}
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="mb-16 bg-gray-50 p-8 rounded-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4 text-purple-600">Our Mission</h3>
                <p className="text-lg">{data.mission || 'To glorify God by making disciples of Jesus Christ, spreading the gospel, and building a community of faith that serves others with love and compassion.'}</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4 text-blue-600">Our Vision</h3>
                <p className="text-lg">{data.vision || 'To be a beacon of hope and transformation in our community, where every person can experience God\'s love and discover their purpose in His kingdom.'}</p>
              </div>
            </div>
          </section>

          {/* Core Values Grid */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {data.coreValues ? data.coreValues.map((value: CoreValue, index: number) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💎</span>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">{value.title}</h4>
                  <p>{value.description}</p>
                </div>
              )) : (
                <>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📖</span>
                    </div>
                    <h4 className="text-xl font-semibold mb-2">Scripture</h4>
                    <p>The Bible is our foundation and guide.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🙏</span>
                    </div>
                    <h4 className="text-xl font-semibold mb-2">Prayer</h4>
                    <p>Communicating with God in all circumstances.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🤝</span>
                    </div>
                    <h4 className="text-xl font-semibold mb-2">Community</h4>
                    <p>Supporting one another in faith and life.</p>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-purple-600 text-white p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg mb-6">
              Whether you're new to faith or seeking to deepen your relationship with God,
              you'll find a welcoming home at ThaGospel Church.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/plan-your-visit" className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Plan Your Visit
              </a>
              <a href="/donate" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Give Today
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
