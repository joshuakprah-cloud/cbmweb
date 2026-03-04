import { client } from '../../../../sanity/lib/client'
import Navbar from '../../../components/navbar/Navbar'
import Footer from '../../../components/Footer'
import { urlFor } from '../../../../sanity/lib/image'

interface Preacher {
  _id: string
  name: string
  slug: { current: string }
  photo: any
  bio: string
}

export const metadata = {
  title: 'Our Preachers | ThaGospel Church',
  description: 'Meet the preachers at ThaGospel Church. Learn about our pastors and teachers.',
  openGraph: {
    title: 'Our Preachers | ThaGospel Church',
    description: 'Meet the preachers at ThaGospel Church.',
    type: 'website',
  },
}

export default async function Preachers() {
  const preachers = await client.fetch(`*[_type == "preacher"] | order(name asc)`) as Preacher[]

  return (
    <div>
      <Navbar />
      <main>
        <section className="bg-navy text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-inter">Our Preachers</h1>
            <p className="text-xl font-inter">Meet the dedicated preachers who lead our congregation.</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {preachers.map((preacher) => (
                <div key={preacher._id} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
                  {preacher.photo && (
                    <img
                      src={urlFor(preacher.photo).url()}
                      alt={preacher.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                  )}
                  <h3 className="text-xl font-bold mb-2">{preacher.name}</h3>
                  <p className="text-gray-600 mb-4">{preacher.bio?.slice(0, 100)}...</p>
                  <a
                    href={`/sermons/preachers/${preacher.slug.current}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block"
                  >
                    View Sermons
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
