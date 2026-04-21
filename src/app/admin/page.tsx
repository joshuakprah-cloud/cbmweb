import { Metadata } from 'next';
import Link from 'next/link';
import { 
  CloudArrowUpIcon, 
  VideoCameraIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Admin Dashboard | ThaGospel Church',
  description: 'Manage sermons, uploads, and content',
};

const adminTools = [
  {
    title: 'Upload Sermon',
    description: 'Upload video files directly to Sanity',
    href: '/admin/upload',
    icon: CloudArrowUpIcon,
    color: 'bg-blue-500',
  },
  {
    title: 'YouTube Sync',
    description: 'Sync sermons from YouTube playlist',
    href: '/admin/youtube-sync',
    icon: VideoCameraIcon,
    color: 'bg-red-500',
  },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your church content</p>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {adminTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all"
            >
              <div className="flex items-start space-x-4">
                <div className={`${tool.color} p-3 rounded-lg`}>
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-gray-600 mt-1">{tool.description}</p>
                  <div className="flex items-center text-blue-600 mt-3 text-sm font-medium">
                    <span>Go to tool</span>
                    <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <a 
                href="https://cbmweb.vercel.app/studio" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 hover:underline"
              >
                → Open Sanity Studio
              </a>
            </li>
            <li>
              <a 
                href="/messages" 
                className="text-blue-700 hover:text-blue-900 hover:underline"
              >
                → View Messages Page
              </a>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
