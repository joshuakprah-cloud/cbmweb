import { client } from '../../../sanity/lib/client'
import { PortableText } from '@portabletext/react'

export const metadata = {
  title: 'Church Theme | ThaGospel Church',
  description: 'Discover this year\'s church theme and anchor scripture. Join us as we explore God\'s word together.',
  openGraph: {
    title: 'Church Theme | ThaGospel Church',
    description: 'Discover this year\'s church theme and anchor scripture.',
    type: 'website',
  },
}

export default async function Theme() {
  const data = await client.fetch(`*[_type == "themePage"][0]`)

  if (!data) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold">Page not found</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Theme Title and Year */}
        <section className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-4">
            {data.year ? `${data.year} Theme` : 'Church Theme'}
          </h1>
          <h2 className="text-4xl font-semibold text-purple-600 mb-8">
            {data.title || 'Our Theme This Year'}
          </h2>
        </section>

        {/* Anchor Scripture */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Anchor Scripture</h3>
            <blockquote className="text-xl italic">
              "{data.anchorScripture || 'For I know the plans I have for you," declares the Lord. - Jeremiah 29:11'}"
            </blockquote>
          </div>
        </section>

        {/* Explanation */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center">Theme Explanation</h3>
          <div className="max-w-3xl mx-auto prose prose-lg">
            {data.explanation ? <PortableText value={data.explanation} /> : (
              <p className="text-lg leading-relaxed">
                This year's theme guides our worship, teaching, and community outreach.
                Join us as we dive deeper into God's word and discover His purpose for our lives.
              </p>
            )}
          </div>
        </section>

        {/* CTA to Sermons */}
        <section className="text-center bg-blue-600 text-white p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Explore Our Sermons</h2>
          <p className="text-lg mb-6">
            Hear teachings and messages inspired by this year's theme.
          </p>
          <a href="/sermons" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Listen to Sermons
          </a>
        </section>
      </div>
    </div>
  )
}
