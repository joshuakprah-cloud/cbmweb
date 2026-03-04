import { notFound } from 'next/navigation'
import { client } from '../../../../sanity/lib/client'
import Navbar from '../../../components/navbar/Navbar'
import Footer from '../../../components/Footer'
import Image from 'next/image'
import { urlFor } from '../../../../sanity/lib/image'
import { PortableText } from '@portabletext/react'

interface Ministry {
  _id: string
  title: string
  slug: { current: string }
  description: string
  leaderName: string
  leaderPhoto: any
  meetingDay: string
  meetingTime: string
  location: string
  heroImage: any
  content: any[]
  branch: string
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ministry = await client.fetch(`*[_type == "ministry" && slug.current == $slug][0]`, { slug }) as Ministry | null

  if (!ministry) {
    return {
      title: 'Ministry Not Found | ThaGospel Church',
    }
  }

  return {
    title: `${ministry.title} | ThaGospel Church`,
    description: ministry.description,
    openGraph: {
      title: `${ministry.title} | ThaGospel Church`,
      description: ministry.description,
      images: ministry.heroImage ? [{ url: urlFor(ministry.heroImage).url() }] : [],
      type: 'website',
    },
  }
}

export default async function MinistryDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ministry = await client.fetch(`*[_type == "ministry" && slug.current == $slug][0]`, { slug }) as Ministry | null

  if (!ministry) notFound()

  return (
    <div>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative h-96 flex items-center justify-center text-white">
          {ministry.heroImage && (
            <Image
              src={urlFor(ministry.heroImage).url()}
              alt={ministry.title}
              fill
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-inter">{ministry.title}</h1>
          </div>
        </section>

        {/* Description */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-lg text-gray-600">{ministry.description}</p>
          </div>
        </section>

        {/* Leader Spotlight */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Meet Our Leader</h2>
            {ministry.leaderPhoto && (
              <Image
                src={urlFor(ministry.leaderPhoto).url()}
                alt={ministry.leaderName}
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4"
              />
            )}
            <h3 className="text-xl font-bold">{ministry.leaderName}</h3>
          </div>
        </section>

        {/* Meeting Details */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Meeting Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-bold">Day</h3>
                <p className="text-gray-600">{ministry.meetingDay}</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">Time</h3>
                <p className="text-gray-600">{ministry.meetingTime}</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">Location</h3>
                <p className="text-gray-600">{ministry.location}</p>
              </div>
            </div>
          </div>
        </section>

        {/* What to Expect */}
        {ministry.content && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">What to Expect</h2>
              <PortableText value={ministry.content} />
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 bg-navy text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Ministry</h2>
            <p className="text-lg mb-8">Ready to get involved? Contact us to learn more.</p>
            <a href="/contact" className="bg-gold text-navy px-8 py-3 rounded-lg font-inter hover:bg-opacity-80 transition-colors">Contact Us</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
