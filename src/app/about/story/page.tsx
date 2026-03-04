import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';

export default function OurStory() {
  return (
    <div>
      <Navbar />
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Our Story</h1>
          <p className="text-lg mb-6">
            ThaGospel Church was founded with a vision to spread the Gospel and build a community of faith, hope, and love. Our journey began many years ago with a small group of believers committed to sharing God's word and making a difference in our community.
          </p>
          <p className="text-lg mb-6">
            Through years of growth, challenges, and blessings, we have remained dedicated to our mission of nurturing spiritual growth, serving others, and welcoming all who seek a deeper relationship with God. Our story is one of faith, perseverance, and the transformative power of God's love.
          </p>
          <p className="text-lg">
            Join us as we continue this journey together, building a brighter future for our congregation and our community.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
