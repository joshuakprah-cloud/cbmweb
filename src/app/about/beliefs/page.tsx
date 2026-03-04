import { client } from '../../../../sanity/lib/client'
import BeliefsAccordion from '../../components/BeliefsAccordion'
import Navbar from '../../../components/navbar/Navbar'
import Footer from '../../../components/Footer'

export const metadata = {
  title: 'Our Beliefs | ThaGospel Church',
  description: 'Explore the core beliefs and doctrines that guide ThaGospel Church. Learn about our faith foundation and biblical teachings.',
  openGraph: {
    title: 'Our Beliefs | ThaGospel Church',
    description: 'Explore the core beliefs and doctrines that guide ThaGospel Church.',
    type: 'website',
  },
}

export default async function Beliefs() {
  const data = await client.fetch(`*[_type == "beliefsPage"][0]`)

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
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Intro Section */}
          <section className="mb-16 text-center">
            <h1 className="text-4xl font-bold mb-8">What We Believe</h1>
            <p className="text-xl leading-relaxed text-gray-700">
              {data.intro || 'Our beliefs are rooted in Scripture and guide everything we do as a church community.'}
            </p>
          </section>

          {/* Beliefs Accordion */}
          <section className="mb-16">
            {data.beliefs && data.beliefs.length > 0 ? (
              <BeliefsAccordion beliefs={data.beliefs} />
            ) : (
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">The Bible</h3>
                  <p>The Holy Bible is the inspired Word of God and the ultimate authority for faith and practice.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">Jesus Christ</h3>
                  <p>Jesus is the Son of God, our Savior, and the only way to eternal life.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">The Holy Spirit</h3>
                  <p>The Holy Spirit empowers believers for service and guides us in truth.</p>
                </div>
              </div>
            )}
          </section>

          {/* Call to Action */}
          <section className="text-center bg-blue-600 text-white p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
            <p className="text-lg mb-6">
              We'd love to discuss our beliefs with you and answer any questions you may have.
            </p>
            <a href="/contact" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contact Us
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
