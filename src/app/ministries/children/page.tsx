import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';

export default function ChildrensMinistry() {
  return (
    <div>
      <Navbar />
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Children's Ministry</h1>
          <p className="text-lg mb-6">
            Our Children's Ministry is dedicated to nurturing young hearts and minds in faith. We provide age-appropriate programs that teach children about God's love, the Bible, and Christian values in a fun, engaging way.
          </p>
          <p className="text-lg mb-6">
            From nursery care to elementary age programs, we offer Sunday school, Vacation Bible School, and special events designed to help children grow in their understanding of God and develop a lifelong faith.
          </p>
          <p className="text-lg">
            Parents and volunteers play a crucial role in our children's ministry. Contact us to learn how you can get involved or register your child for our programs.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
