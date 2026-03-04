import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';

export default function YouthMinistry() {
  return (
    <div>
      <Navbar />
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Youth Ministry</h1>
          <p className="text-lg mb-6">
            Our Youth Ministry is dedicated to empowering the next generation of believers. We provide a safe, fun environment where young people can grow in their faith, build friendships, and discover their purpose in God's plan.
          </p>
          <p className="text-lg mb-6">
            Through Bible studies, service projects, retreats, and social activities, we help youth develop strong spiritual foundations and leadership skills. Our programs are designed for teens aged 13-18.
          </p>
          <p className="text-lg">
            Join us for weekly meetings and special events. Contact us to learn more about getting involved in our youth ministry.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
