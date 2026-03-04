import { client } from '../../../../sanity/lib/client'
import Navbar from '../../../components/navbar/Navbar'
import Footer from '../../../components/Footer'
import LazyYouTube from '../../../components/LazyYouTube'

interface Sermon {
  _id: string
  title: string
  slug: { current: string }
  preacher: { name: string }
  date: string
  videoUrl: string
  audioUrl: string
  series: string
  scripture: string
}

export const metadata = {
  title: 'Sermon Series | ThaGospel Church',
  description: 'Browse sermon series from ThaGospel Church. Discover teachings organized by topic.',
  openGraph: {
    title: 'Sermon Series | ThaGospel Church',
    description: 'Browse sermon series from ThaGospel Church.',
    type: 'website',
  },
}

export default async function Series() {
  const sermons = await client.fetch(`*[_type == "sermon"] | order(date desc)`) as Sermon[]

  const seriesGroups = sermons.reduce((acc, sermon) => {
    const series = sermon.series || 'General'
    if (!acc[series]) acc[series] = []
    acc[series].push(sermon)
    return acc
  }, {} as Record<string, Sermon[]>)

  const extractYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=)([^&\n?#]+)/)
    return match ? match[1] : null
  }

  return (
    <div>
      <Navbar />
      <main>
        <section className="bg-navy text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-inter">Sermon Series</h1>
            <p className="text-xl font-inter">Browse sermons organized by series.</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(seriesGroups).map(([seriesName, sermonsInSeries]) => (
                <div key={seriesName} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-2">{seriesName}</h3>
                  <p className="text-gray-600 mb-4">{sermonsInSeries.length} sermons</p>
                  {(() => {
                    const videoId = extractYouTubeId(sermonsInSeries[0]?.videoUrl || '');
                    return videoId ? (
                      <div className="mb-4 aspect-video">
                        <LazyYouTube videoId={videoId} title={sermonsInSeries[0].title} />
                      </div>
                    ) : null;
                  })()}
                  <a
                    href={`/sermons/series/${encodeURIComponent(seriesName)}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block"
                  >
                    View Series
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
