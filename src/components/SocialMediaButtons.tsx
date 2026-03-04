const SocialMediaButtons = () => {
  const socialLinks = [
    { name: 'Facebook', href: '#', icon: 'f' },
    { name: 'Instagram', href: '#', icon: '📷' },
    { name: 'X (Twitter)', href: '#', icon: '🐦' },
    { name: 'TikTok', href: '#', icon: '🎵' },
    { name: 'YouTube', href: '#', icon: '▶️' },
  ];

  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Follow Us
          </h2>
        </div>
        <div className="flex justify-center space-x-6">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors"
              aria-label={link.name}
            >
              {link.icon === 'f' ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              ) : (
                <span className="text-xl">{link.icon}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialMediaButtons;
