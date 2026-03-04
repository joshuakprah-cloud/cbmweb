import React from 'react';

interface SocialMediaLink {
  platform: string;
  url: string;
}

interface SocialMediaProps {
  socialMedia: SocialMediaLink[];
}

const SocialMedia: React.FC<SocialMediaProps> = ({ socialMedia }) => {
  if (!socialMedia || socialMedia.length === 0) return null;

  const getIcon = (platform: string) => {
    const icons: { [key: string]: string } = {
      Facebook: '📘',
      Twitter: '🐦',
      Instagram: '📷',
      YouTube: '📺',
      LinkedIn: '💼',
      TikTok: '🎵',
    };
    return icons[platform] || '🔗';
  };

  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
        <div className="flex justify-center space-x-6">
          {socialMedia.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:scale-110 transition-transform"
              title={link.platform}
            >
              {getIcon(link.platform)}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;
