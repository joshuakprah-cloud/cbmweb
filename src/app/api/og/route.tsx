import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return new Response('Missing slug parameter', { status: 400 });
    }

    // Simple mock data for now - replace with actual Sanity fetch later
    const post = {
      title: 'Sample Blog Post',
      author: { name: 'John Doe' },
      publishedAt: '2024-03-25T00:00:00Z',
      coverImage: null
    };

    return new ImageResponse(
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ea580c',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)',
        }} />
        
        <div style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '40px',
          maxWidth: '80%',
        }}>
          <div style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '20px',
            lineHeight: 1.2,
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          }}>
            {post.title}
          </div>
          
          {post.author?.name && (
            <div style={{
              fontSize: '24px',
              color: 'white',
              marginBottom: '10px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            }}>
              By {post.author.name}
            </div>
          )}
          
          <div style={{
            fontSize: '18px',
            color: '#fbbf24',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          }}>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          
          <div style={{
            fontSize: '20px',
            color: 'white',
            marginTop: '20px',
            padding: '8px 16px',
            backgroundColor: '#dc2626',
            borderRadius: '8px',
            fontWeight: '600',
          }}>
            ThaGospel Church Blog
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
