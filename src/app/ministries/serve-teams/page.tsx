import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeftIcon, UserGroupIcon, HeartIcon, CameraIcon, CurrencyDollarIcon, UserIcon, UsersIcon, AcademicCapIcon, PhoneIcon, ClipboardDocumentIcon, HandRaisedIcon, MegaphoneIcon, MusicalNoteIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Serve Teams - ThaGospel Church',
  description: 'Discover opportunities to serve in our internal departments. Join a team and use your gifts to make a difference.',
  openGraph: {
    title: 'Serve Teams - ThaGospel Church',
    description: 'Discover opportunities to serve in our internal departments. Join a team and use your gifts to make a difference.',
  },
};

// Ministry Teams data
const ministryTeams = [
  {
    name: 'Prayer',
    description: 'Intercede for the church, community, and world through the power of prayer and spiritual warfare.',
    icon: HandRaisedIcon,
    color: 'bg-amber-500',
  },
  {
    name: 'Choir',
    description: 'Lead the congregation in worship through powerful vocal ministry and musical excellence.',
    icon: MusicalNoteIcon,
    color: 'bg-violet-500',
  },
  {
    name: 'Ministers',
    description: 'Serve in various ministerial capacities to nurture and grow the body of Christ.',
    icon: HeartIcon,
    color: 'bg-pink-500',
  },
  {
    name: 'Pastoral Care',
    description: 'Work alongside our pastoral team in caring for the spiritual needs of our church family.',
    icon: UsersIcon,
    color: 'bg-indigo-500',
  },
  {
    name: "Head Pastor's Office",
    description: 'Support the vision and leadership of our Head Pastor in shepherding the congregation.',
    icon: UserIcon,
    color: 'bg-red-500',
  },
];

// Community & Outreach Teams data
const communityTeams = [
  {
    name: 'Outreach',
    description: 'Serve our local community through practical acts of love, service, and meeting tangible needs.',
    icon: UserGroupIcon,
    color: 'bg-emerald-500',
  },
  {
    name: 'Evangelism',
    description: 'Share the Gospel and reach out to those who have not yet experienced the love of Christ.',
    icon: MegaphoneIcon,
    color: 'bg-rose-500',
  },
  {
    name: 'Cell Leaders',
    description: 'Lead and shepherd small groups, fostering community and spiritual growth in intimate settings.',
    icon: UsersIcon,
    color: 'bg-cyan-500',
  },
];

// Support Teams data
const supportTeams = [
  {
    name: 'Ushering',
    description: 'Welcome guests and create a warm, inviting atmosphere for everyone who walks through our doors.',
    icon: UserGroupIcon,
    color: 'bg-blue-500',
  },
  {
    name: 'Media',
    description: 'Capture and share our story through photography, video production, and social media.',
    icon: CameraIcon,
    color: 'bg-purple-500',
  },
  {
    name: 'Finance',
    description: 'Manage resources responsibly and support the financial operations of the church.',
    icon: CurrencyDollarIcon,
    color: 'bg-green-500',
  },
  {
    name: 'Follow Up & Communication',
    description: 'Connect with visitors and members, ensuring no one falls through the cracks.',
    icon: PhoneIcon,
    color: 'bg-orange-500',
  },
  {
    name: 'Administration',
    description: 'Keep operations running smoothly through organizational and administrative support.',
    icon: ClipboardDocumentIcon,
    color: 'bg-teal-500',
  },
];

export default function ServeTeamsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#0B1F3A] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/ministries"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-6 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Ministries
          </Link>
          <span className="inline-block text-[#C6A75E] text-sm font-semibold tracking-[0.15em] uppercase mb-4">
            Join the Mission
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Serve Teams
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Behind every powerful service and thriving church is a dedicated team of servants. 
            Discover where you can use your gifts to make an impact.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="pt-12 px-4 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 border-b border-gray-200 pb-6">
            <button className="px-6 py-3 text-[#0B1F3A] font-semibold border-b-2 border-[#C6A75E]">
              Ministry Teams
            </button>
            <button className="px-6 py-3 text-gray-500 hover:text-[#0B1F3A] font-medium transition-colors">
              Community & Outreach
            </button>
            <button className="px-6 py-3 text-gray-500 hover:text-[#0B1F3A] font-medium transition-colors">
              Support Teams
            </button>
          </div>
        </div>
      </section>

      {/* Ministry Teams Section */}
      <section className="py-16 px-4 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1F3A] mb-4">
              Ministry Teams
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These teams are focused on spiritual growth, worship, and ministering to the body of Christ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministryTeams.map((dept) => (
              <div
                key={dept.name}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-[#C6A75E] transition-all duration-300 group"
              >
                <h3 className="text-lg font-bold text-[#0B1F3A] mb-2 group-hover:text-[#C6A75E] transition-colors">
                  {dept.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {dept.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community & Outreach Section */}
      <section className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1F3A] mb-4">
              Community & Outreach
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Connect with our community and share the love of Christ through outreach and small groups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityTeams.map((dept) => (
              <div
                key={dept.name}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-[#C6A75E] transition-all duration-300 group"
              >
                <h3 className="text-lg font-bold text-[#0B1F3A] mb-2 group-hover:text-[#C6A75E] transition-colors">
                  {dept.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {dept.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Teams Section */}
      <section className="py-16 px-4 bg-[#F8F9FB] border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1F3A] mb-4">
              Support Teams
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These teams work behind the scenes to ensure our church operates effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportTeams.map((dept) => (
              <div
                key={dept.name}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-[#C6A75E] transition-all duration-300 group"
              >
                <h3 className="text-lg font-bold text-[#0B1F3A] mb-2 group-hover:text-[#C6A75E] transition-colors">
                  {dept.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {dept.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#0B1F3A]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Serve?
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Every gift matters. Whether you are skilled in administration, media, hospitality, 
            or leadership, there is a place for you on our Serve Teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/connect"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#C6A75E] text-[#0B1F3A] font-semibold rounded-lg hover:bg-[#b89a4f] transition-all duration-200"
            >
              Get Connected
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/ministries"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              Explore All Ministries
            </Link>
          </div>
        </div>
      </section>

      {/* How to Join Section */}
      <section className="py-16 px-4 bg-[#F8F9FB]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0B1F3A] text-center mb-12">
            How to Join a Serve Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C6A75E] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#0B1F3A]">1</span>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3A] mb-2">Pray</h3>
              <p className="text-gray-600">
                Ask God where He wants you to serve. Consider your gifts, passions, and availability.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C6A75E] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#0B1F3A]">2</span>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3A] mb-2">Connect</h3>
              <p className="text-gray-600">
                Reach out to our team through the Connect form or speak with a department leader after service.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C6A75E] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#0B1F3A]">3</span>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3A] mb-2">Serve</h3>
              <p className="text-gray-600">
                Start serving with training and support from experienced team members.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
