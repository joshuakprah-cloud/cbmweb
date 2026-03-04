import { client } from '../../sanity/lib/client';
import { urlFor } from '../../sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';

const PastorSpotlight = async () => {
  const pastor = await client.fetch(`*[_type == "pastor"][0]{name, bio, photo}`) || {
    name: "Prophet Powerman & Prophetess Tracy Bekoe",
    bio: "A dedicated leader serving our community with faith and devotion. Committed to spreading the Gospel and nurturing spiritual growth in our congregation.",
    photo: null
  };

  const bio = pastor.bio || 'A dedicated leader serving our community with faith and devotion.';
  const truncatedBio = bio.length > 200 ? bio.substring(0, 200) + '...' : bio;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm h-80">
              {pastor.photo ? (
                <Image
                  src={urlFor(pastor.photo).url()}
                  alt={`Photo of ${pastor.name}`}
                  fill
                  sizes="384px"
                  className="rounded-lg object-contain"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600">No Image</span>
                </div>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Meet Prophet Powerman & Prophetess Tracy Bekoe</h2>
            <p className="text-lg mb-6">
              {truncatedBio}
            </p>
            <Link href="/leadership" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
              Meet Our Pastor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PastorSpotlight;
