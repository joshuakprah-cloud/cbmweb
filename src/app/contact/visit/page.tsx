import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';

export default function VisitUs() {
  return (
    <div>
      <Navbar />
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Visit Us</h1>
          <p className="text-lg mb-6">
            We welcome you to visit ThaGospel Church! Our services are held every Sunday at 10 AM, and we have various programs and events throughout the week.
          </p>
          <p className="text-lg mb-6">
            Our address is 123 Church Street, City, State 12345. We have ample parking and accessible facilities for all visitors. Come early to enjoy coffee and fellowship before the service.
          </p>
          <p className="text-lg">
            If you're visiting for the first time, look for our welcome team who can help you find your way and answer any questions. We hope to see you soon!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
