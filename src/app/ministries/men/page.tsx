import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Men Ministry - ThaGospel Church',
  description: 'Join our Men Ministry for fellowship, discipleship, and leadership development.',
};

export default function MenPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section 
        className="relative min-h-[300px] md:min-h-[350px] flex items-center justify-center overflow-hidden"
        role="banner"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          }}
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight drop-shadow-lg">
            Men
          </h1>
          <p className="mt-6 text-xl text-white/90 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            Building men of character, faith, and leadership
          </p>
        </div>
      </section>

      <section className="relative py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A] uppercase tracking-wide leading-tight mb-4">
            As iron sharpens iron, so one person sharpens another
          </h2>
          <p className="text-gray-600 text-lg">Proverbs 27:17</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#F8F9FB]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-700 text-lg leading-relaxed">
            The Men Ministry at ThaGospel Church is dedicated to helping men grow in their faith, 
            develop strong character, and become effective leaders in their homes, church, and community. 
            Through Bible studies, fellowship events, and service opportunities, we build authentic relationships.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-[#0B1F3A] to-[#1a3a5c] flex items-center justify-center">
              <span className="text-white/50 text-6xl">👔</span>
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-[#0d9488] to-[#0f766e] flex items-center justify-center">
              <span className="text-white/50 text-6xl">📖</span>
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-[#0B1F3A] to-[#0d9488] flex items-center justify-center">
              <span className="text-white/50 text-6xl">🤝</span>
            </div>
          </div>
        </div>
      </section>

      <div className="py-8 px-4 bg-white text-center">
        <Link href="/connect" className="inline-flex items-center justify-center px-8 py-4 bg-[#0d9488] text-white font-semibold rounded-lg hover:bg-[#0f766e] transition-all duration-200">
          Join the Team
        </Link>
      </div>

      <section className="py-16 px-4 bg-[#F8F9FB]">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-[#0B1F3A] mb-6 text-center">Meeting Schedule</h3>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="font-medium">Men&apos;s Bible Study</span>
                <span className="text-[#0d9488] font-semibold">Thursdays at 7:00 PM</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="font-medium">Men&apos;s Breakfast</span>
                <span className="text-[#0d9488] font-semibold">First Saturday, 8:00 AM</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="font-medium">Service Projects</span>
                <span className="text-[#0d9488] font-semibold">Monthly</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
