import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, UserGroupIcon, HeartIcon, UsersIcon, MegaphoneIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Community & Service - ThaGospel Church',
  description: 'Connect with our community and share the love of Christ through outreach, small groups, and evangelism.',
  openGraph: {
    title: 'Community & Service - ThaGospel Church',
    description: 'Connect with our community and share the love of Christ through outreach, small groups, and evangelism.',
    type: 'website',
  },
};

const communityMinistries = [
  {
    name: 'Outreach',
    description: 'Serve our local community through practical acts of love, service, and meeting tangible needs. From feeding programs to community cleanups, we believe in showing Christs love through action.',
    icon: UserGroupIcon,
    color: 'bg-emerald-500',
    href: '/ministries/outreach',
  },
  {
    name: 'Evangelism',
    description: 'Share the Gospel and reach out to those who have not yet experienced the love of Christ. Through street evangelism, door-to-door outreach, and personal witnessing.',
    icon: MegaphoneIcon,
    color: 'bg-rose-500',
    href: '/ministries/evangelism',
  },
  {
    name: 'Cell Leaders',
    description: 'Lead and shepherd small groups, fostering community and spiritual growth in intimate settings. Cell groups are the heart of our church community.',
    icon: UsersIcon,
    color: 'bg-cyan-500',
    href: '/ministries/cell-leaders',
  },
];

export default function CommunityServicePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 to-teal-700 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/ministries"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-6 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Ministries
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Community & Service
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Connect with our community and share the love of Christ through outreach, 
            small groups, and evangelism. Together, we make a difference.
          </p>
        </div>
      </section>

      {/* Ministry Cards */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {communityMinistries.map((ministry) => {
              const IconComponent = ministry.icon;
              return (
                <Link
                  key={ministry.name}
                  href={ministry.href}
                  className="group bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-md hover:border-[#0d9488]/20 transition-all duration-200"
                >
                  <div className={`${ministry.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#0d9488] transition-colors">
                    {ministry.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {ministry.description}
                  </p>
                  <div className="flex items-center gap-2 text-[#0d9488] font-semibold">
                    <span>Learn more</span>
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Making an Impact Together
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Our Community & Service ministries are the hands and feet of ThaGospel Church. 
            Through outreach programs, evangelism efforts, and cell group communities, we extend 
            Gods love beyond our church walls and into the hearts of those who need it most.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-[#0d9488] mb-2">Community</div>
              <p className="text-gray-600">Building meaningful relationships</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-[#0d9488] mb-2">Service</div>
              <p className="text-gray-600">Meeting practical needs</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-[#0d9488] mb-2">Evangelism</div>
              <p className="text-gray-600">Sharing the Gospel</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#f0fdfa] border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Serve?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you are passionate about community outreach, sharing your faith, 
            or leading a small group, there is a place for you here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/connect"
              className="inline-flex items-center px-8 py-3 bg-[#0d9488] text-white font-semibold rounded-lg hover:bg-[#0c857a] transition-colors"
            >
              Get Connected
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/ministries/serve-teams"
              className="inline-flex items-center px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-white transition-colors"
            >
              Explore Serve Teams
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
