import { client } from '../../../sanity/lib/client'
import { postsQuery } from '../../../sanity/lib/queries'
import { urlFor } from '../../../sanity/lib/image'
import Link from 'next/link'

export default async function Blog() {
  const posts = await client.fetch(postsQuery) || []

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <div key={post.slug.current} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              {post.image && (
                <img
                  src={urlFor(post.image).url()}
                  alt={post.title}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
              )}
              <Link href={`/blog/${post.slug.current}`}>
                <h2 className="text-xl font-semibold mb-2 hover:text-purple-500 cursor-pointer">{post.title}</h2>
              </Link>
              <p className="text-sm text-muted-foreground mb-4">
                {new Date(post.publishedAt).toLocaleDateString()}
              </p>
              {/* Add excerpt if needed */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
