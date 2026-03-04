const SocialFeed = () => {
  const posts = [
    { platform: 'Facebook', content: 'Latest post from our Facebook page...', time: '2 hours ago' },
    { platform: 'Instagram', content: 'New photo from our recent event...', time: '5 hours ago' },
    { platform: 'Twitter/X', content: 'Daily devotion update...', time: '1 day ago' },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Social Feed
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3">
                  {post.platform.charAt(0)}
                </div>
                <span className="font-semibold text-foreground">{post.platform}</span>
              </div>
              <p className="text-muted-foreground mb-2">{post.content}</p>
              <p className="text-sm text-muted-foreground">{post.time}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialFeed;
