import { client } from '../../../sanity/lib/client'
import { PortableText } from '@portabletext/react'
import { urlFor } from '../../../sanity/lib/image'

export const revalidate = 60

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug: params.slug }, { next: { revalidate: 60 } })

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold">Post not found</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-sm text-muted-foreground mb-8">{new Date(post.publishedAt).toLocaleDateString()}</p>
        {post.image && (
          <img
            src={urlFor(post.image).url()}
            alt={post.title}
            className="w-full h-64 object-cover mb-8 rounded"
          />
        )}
        <div className="prose prose-lg max-w-none">
          <PortableText value={post.content} />
        </div>
      </div>
    </div>
  )
}
