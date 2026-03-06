import { Users, Heart, Music, BookOpen, Baby, HandHeart } from 'lucide-react';

const MinistriesSection = ({ homepage }: { homepage: any }) => {
  const getIcon = (name: string) => {
    if (name.toLowerCase().includes('youth')) return Users;
    if (name.toLowerCase().includes('children')) return Baby;
    if (name.toLowerCase().includes('prayer')) return Heart;
    if (name.toLowerCase().includes('worship')) return Music;
    if (name.toLowerCase().includes('outreach') || name.toLowerCase().includes('missions')) return HandHeart;
    return BookOpen;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{homepage?.ministriesHeadline}</h2>
          <p className="text-lg text-gray-600 mb-8">{homepage?.ministriesIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {homepage?.ministries?.map((ministry: any, index: number) => {
              const IconComponent = getIcon(ministry.name);
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{ministry.name}</h3>
                  <p className="text-gray-600 mb-4">{ministry.description}</p>
                  <a href="/ministries" className="text-blue-600 hover:text-blue-800 font-medium">
                    Learn More →
                  </a>
                </div>
              );
            })}
          </div>
          <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
            {homepage?.ministriesButton}
          </button>
        </div>
      </div>
    </section>
  );
};

export default MinistriesSection;
