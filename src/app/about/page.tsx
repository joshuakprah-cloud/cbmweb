import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import Button from '../../components/Button';

export const metadata = {
  title: 'About Us - Church Website',
  description: 'Learn about our church vision, mission, history, and leadership team.',
};

export default function About() {
  return (
    <div>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-navy text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-inter">About Our Church</h1>
            <p className="text-xl font-inter">Discover our vision, mission, and the heart of our community.</p>
          </div>
        </section>

        {/* Overview Link */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 font-inter text-navy">Our Story</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Get to know ThaGospel Church - our story, mission, vision, and core values that guide our community.
            </p>
            <Button variant="primary" href="/about/overview">Learn More About Us</Button>
          </div>
        </section>

        {/* Beliefs Link */}
        <section className="py-16 bg-neutral">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 font-inter text-navy">Beliefs</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Explore the core beliefs and doctrines that form the foundation of our faith community.
            </p>
            <Button variant="primary" href="/about/beliefs">Read Our Beliefs</Button>
          </div>
        </section>

        {/* Leadership Link */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 font-inter text-navy">Leadership</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Meet the dedicated pastors and leaders who guide our congregation with wisdom and compassion.
            </p>
            <Button variant="primary" href="/about/leadership">Meet Our Team</Button>
          </div>
        </section>

        {/* Theme Link */}
        <section className="py-16 bg-neutral">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 font-inter text-navy">Church Theme</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover this year's church theme and anchor scripture that inspires our worship and teaching.
            </p>
            <Button variant="primary" href="/about/theme">Explore This Year's Theme</Button>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-navy text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 font-inter">Join Our Community</h2>
            <p className="text-lg mb-8">We'd love to welcome you to our church family. Visit us this Sunday!</p>
            <Button variant="secondary" href="/plan-your-visit">Plan a Visit</Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
