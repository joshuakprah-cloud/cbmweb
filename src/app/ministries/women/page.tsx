import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';

export default function WomensMinistry() {
  return (
    <div>
      <Navbar />
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Women's Ministry</h1>
          <p className="text-lg mb-6">
            Our Women's Ministry provides a nurturing community where women can grow in their faith, support one another, and serve together. We offer Bible studies, prayer groups, fellowship events, and opportunities to use our gifts in ministry.
          </p>
          <p className="text-lg mb-6">
            Whether you're seeking spiritual growth, friendship, or ways to serve, our women's ministry welcomes women of all ages and backgrounds. Join us for monthly meetings, retreats, and special events.
          </p>
          <p className="text-lg">
            Contact our women's ministry coordinator to learn more about upcoming activities and how to get involved.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
