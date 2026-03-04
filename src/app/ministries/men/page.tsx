import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';

export default function MensMinistry() {
  return (
    <div>
      <Navbar />
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Men's Ministry</h1>
          <p className="text-lg mb-6">
            Our Men's Ministry focuses on building strong men of faith who lead with integrity, serve their families, and make a positive impact in their communities. We provide opportunities for fellowship, spiritual growth, and service.
          </p>
          <p className="text-lg mb-6">
            Through Bible studies, men's retreats, service projects, and accountability groups, we help men grow in their relationship with God and become the leaders He created them to be.
          </p>
          <p className="text-lg">
            Join our men's ministry for weekly meetings and special events. Contact us to learn how you can get involved.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
