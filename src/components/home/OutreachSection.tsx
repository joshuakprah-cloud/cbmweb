import Image from 'next/image';
import Link from 'next/link';

const OutreachSection = () => {
  const initiatives = [
    {
      title: 'Food Bank Drive',
      description: 'Help us feed the community by donating and volunteering at our food bank.',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGQyZDJkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Gb29kIEJhbms8L3RleHQ+PC9zdmc+',
      link: '/ministries'
    },
    {
      title: 'Community Clean-Up',
      description: 'Join our efforts to keep our neighborhoods clean and beautiful.',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGQyZDJkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5DbGVhbiBVcDwvdGV4dD48L3N2Zz4=',
      link: '/ministries'
    },
    {
      title: 'Youth Mentorship',
      description: 'Mentor our youth and help shape the next generation of leaders.',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGQyZDJkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Zb3V0aDwvdGV4dD48L3N2Zz4=',
      link: '/ministries'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Outreach & Community</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {initiatives.map((initiative, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 hover:shadow-lg transition-transform">
              <Image
                src={initiative.image}
                alt={initiative.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{initiative.title}</h3>
                <p className="text-gray-600 mb-4">{initiative.description}</p>
                <Link href={initiative.link} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OutreachSection;
