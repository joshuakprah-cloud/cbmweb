'use client'

import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/Footer';
import LazyYouTube from '../../components/LazyYouTube';
import { useState, useEffect, useMemo } from 'react';

interface Sermon {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  preacher: {
    _id: string;
    name: string;
    slug: {
      current: string;
    };
    photo: any;
    bio: string;
  };
  date: string;
  videoUrl: string;
  audioUrl: string;
  series: string;
  scripture: string;
  notes: any[];
  branch: string;
}

export default function Sermons() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [filteredSermons, setFilteredSermons] = useState<Sermon[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<string>('all');
  const [selectedPreacher, setSelectedPreacher] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSermons();
  }, []);

  useEffect(() => {
    filterSermons();
  }, [sermons, selectedSeries, selectedPreacher, searchTerm]);

  const fetchSermons = async () => {
    try {
      const response = await fetch('/api/sermons');
      const data = await response.json();
      setSermons(data.sermons || []);
    } catch (error) {
      console.error('Error fetching sermons:', error);
    }
    setLoading(false);
  };

  const filterSermons = () => {
    let filtered = sermons;

    if (selectedSeries !== 'all') {
      filtered = filtered.filter(sermon => sermon.series === selectedSeries);
    }

    if (selectedPreacher !== 'all') {
      filtered = filtered.filter(sermon => sermon.preacher.name === selectedPreacher);
    }

    if (searchTerm) {
      filtered = filtered.filter(sermon =>
        sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sermon.preacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sermon.series.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sermon.scripture?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSermons(filtered);
  };

  const series = useMemo(() => Array.from(new Set(sermons.map(s => s.series))).filter(Boolean), [sermons]);
  const preachers = useMemo(() => Array.from(new Set(sermons.map(s => s.preacher.name))).filter(Boolean), [sermons]);

  const shareSermon = (sermon: Sermon) => {
    if (navigator.share) {
      navigator.share({
        title: sermon.title || 'Sermon',
        text: `Check out this sermon: ${sermon.title || 'Untitled'} by ${sermon.preacher?.name || 'Unknown'}`,
        url: `${window.location.origin}/sermons/${sermon.slug?.current || sermon._id}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/sermons/${sermon.slug?.current || sermon._id}`);
      alert('Link copied to clipboard!');
    }
  };

  const extractYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  return (
    <div>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-navy text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-inter">Sermons</h1>
            <p className="text-xl font-inter">Listen to messages that inspire and guide our faith journey.</p>
          </div>
        </section>

        {/* Search/Filter Section */}
        <section className="py-8 bg-neutral">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <input
                  type="text"
                  placeholder="Search sermons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                />
              </div>
              <div className="flex space-x-4">
                <select
                  value={selectedSeries}
                  onChange={(e) => setSelectedSeries(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                >
                  <option value="all">All Series</option>
                  {series.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedPreacher}
                  onChange={(e) => setSelectedPreacher(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                >
                  <option value="all">All Preachers</option>
                  {preachers.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Sermons List */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            {loading ? (
              <div className="text-center py-16">
                <p>Loading sermons...</p>
              </div>
            ) : filteredSermons.length === 0 ? (
              <div className="text-center py-16">
                <p>No sermons found matching your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSermons.map((sermon) => (
                  <div key={sermon._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    {(() => {
                      const videoId = extractYouTubeId(sermon.videoUrl || '');
                      return videoId ? (
                        <div className="mb-4 aspect-video">
                          <LazyYouTube videoId={videoId} title={sermon.title} />
                        </div>
                      ) : null;
                    })()}
                    <h3 className="text-xl font-bold mb-2">{sermon.title}</h3>
                    <p className="text-gray-600 mb-2">By {sermon.preacher.name}</p>
                    <p className="text-sm text-gray-500 mb-2">{new Date(sermon.date).toLocaleDateString()}</p>
                    {sermon.scripture && <p className="text-sm text-gray-700 mb-4">Scripture: {sermon.scripture}</p>}
                    <div className="flex space-x-2">
                      {sermon.videoUrl && <a href={sermon.videoUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Watch</a>}
                      {sermon.audioUrl && <a href={sermon.audioUrl} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Listen</a>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-navy text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 font-inter">Subscribe to Our Sermons</h2>
            <p className="text-lg mb-8">Get notified when new sermons are available.</p>
            <button className="bg-gold text-navy px-8 py-3 rounded-lg font-inter hover:bg-opacity-80 transition-colors">Subscribe</button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
