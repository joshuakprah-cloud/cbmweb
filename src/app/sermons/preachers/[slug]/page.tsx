import { client } from '../../../../../sanity/lib/client'
import Navbar from '../../../../components/navbar/Navbar'
import Footer from '../../../../components/Footer'
import LazyYouTube from '../../../../components/LazyYouTube'
import { urlFor } from '../../../../../sanity/lib/image'

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

interface Preacher {
  _id: string
  name: string
  slug: { current: string }
  photo: any
  bio: string
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const preacher = await client.fetch(`*[_type == "preacher" && slug.current == $slug][0]`, { slug: params.slug }) as Preacher
  return {
    title: `${preacher?.name} Sermons | ThaGospel Church`,
    description: `Browse all sermons by ${preacher?.name} from ThaGospel Church.`,
    openGraph: {
      title: `${preacher?.name} Sermons | ThaGospel Church`,
      description: `Browse all sermons by ${preacher?.name} from ThaGospel Church.`,
      type: 'website',
    },
  }
}

export default async function PreacherDetail({ params }: { params: { slug: string } }) {
  const preacher = await client.fetch(`*[_type == "preacher" && slug.current == $slug][0]`, { slug: params.slug }) as Preacher
  const sermons = await client.fetch(`*[_type == "sermon" && preacher._ref == $id] | order(date desc)`, { id: preacher._id }) as Sermon[]

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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-inter">{preacher.name}</h1>
            <p className="text-xl font-inter">Sermons by {preacher.name}.</p>
            {preacher.photo && (
              <img
                src={urlFor(preacher.photo).url()}
                alt={preacher.name}
                className="w-32 h-32 rounded-full mx-auto mt-8 object-cover"
              />
            )}
            <p className="text-lg mt-4 max-w-2xl mx-auto">{preacher.bio}</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Sermons by {preacher.name}</h2>
            {sermons.length === 0 ? (
              <div className="text-center py-16">
                <p>No sermons found by this preacher.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sermons.map((sermon) => (
                  <div key={sermon._id} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    {(() => {
                      const videoId = extractYouTubeId(sermon.videoUrl || '');
                      return videoId ? (
                        <div className="mb-4 aspect-video">
                          <LazyYouTube videoId={videoId} title={sermon.title} />
                        </div>
                      ) : null;
                    })()}
                    <h3 className="text-xl font-bold mb-2">{sermon.title}</h3>
                    <p className="text-gray-600 mb-2">By {sermon.preacher.name}</p>
                    <p className="text-sm text-gray-500 mb-2">{new Date(sermon.date).toLocaleDateString()}</p>
                    {sermon.scripture && <p className="text-sm text-gray-700 mb-4">Scripture: {sermon.scripture}</p>}
                    <div className="flex space-x-2">
                      {sermon.videoUrl && <a href={sermon.videoUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Watch</a>}
                      {sermon.audioUrl && <a href={sermon.audioUrl} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Listen</a>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
