import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';

export default function SermonArchive() {
  return (
    <div>
      <Navbar />
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Sermon Archive</h1>
          <p className="text-lg mb-6">
            Explore our complete collection of past sermons. Here you can find teachings on various topics, biblical studies, and messages that have inspired our congregation over the years.
          </p>
          <p className="text-lg mb-6">
            Browse by date, topic, or speaker to find the message that speaks to you. All sermons are available for streaming or download.
          </p>
          <p className="text-lg">
            If you have questions about our sermon archive or need help finding a specific message, please contact us.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
