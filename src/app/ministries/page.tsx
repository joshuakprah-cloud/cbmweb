import { client } from '../../../sanity/lib/client'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/Footer'
import Image from 'next/image'
import { urlFor } from '../../../sanity/lib/image'

const CURRENT_BRANCH = process.env.CURRENT_BRANCH || 'main'

interface Ministry {
  _id: string
  title: string
  slug: { current: string }
  description: string
  heroImage: any
}

export const metadata = {
  title: 'Ministries | ThaGospel Church',
  description: 'Explore our ministries at ThaGospel Church. Find a place to serve and grow in faith.',
  openGraph: {
    title: 'Ministries | ThaGospel Church',
    description: 'Explore our ministries at ThaGospel Church.',
    type: 'website',
  },
}

export const revalidate = 60

export default async function Ministries() {
  const ministries = await client.fetch(`*[_type == "ministry" && branch == $branch] | order(title asc)`, { branch: CURRENT_BRANCH }, { next: { revalidate: 60 } }) as Ministry[]

  return (
    <div>
      <Navbar />
      <main>
        <section className="bg-navy text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-inter">Our Ministries</h1>
            <p className="text-xl font-inter">Discover opportunities to serve, connect, and grow in your faith journey.</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-inter text-navy">Get Involved</h2>
              <p className="text-lg text-gray-600">Discover the many ways you can participate and make a difference.</p>
            </div>
            {ministries.length === 0 ? (
              <div className="text-center py-16">
                <p>No ministries found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ministries.map((ministry) => (
                  <div key={ministry._id} className="bg-gray-50 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all">
                    {ministry.heroImage && (
                      <Image
                        src={urlFor(ministry.heroImage).url()}
                        alt={ministry.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{ministry.title}</h3>
                      <p className="text-gray-600 mb-4">{ministry.description?.slice(0, 100)}...</p>
                      <a
                        href={`/ministries/${ministry.slug.current}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block"
                      >
                        View Ministry
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-neutral">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 font-inter text-navy">Not Sure Where to Start?</h2>
            <p className="text-lg text-gray-600 mb-8">Contact us to learn more about our ministries and find the perfect fit for you.</p>
            <a href="/contact" className="bg-gold text-navy px-8 py-3 rounded-lg font-inter hover:bg-opacity-80 transition-colors">Contact Us</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
