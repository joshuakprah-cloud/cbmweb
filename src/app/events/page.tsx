import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Card from '../../components/Card';

export const metadata = {
  title: 'Events - Church Website',
  description: 'Stay updated on upcoming church events, services, and community activities.',
};

export default function Events() {
  const events = [
    {
      id: 1,
      title: 'Easter Sunday Service',
      date: 'April 9, 2024',
      time: '10:00 AM',
      location: 'Main Sanctuary',
      description: 'Join us for a special Easter celebration with worship, music, and fellowship.',
      image: '/event1.jpg',
      buttonText: 'RSVP Now'
    },
    {
      id: 2,
      title: 'Community Outreach Day',
      date: 'March 23, 2024',
      time: '9:00 AM - 3:00 PM',
      location: 'Community Center',
      description: 'Serve our local community through food drives, cleaning, and support services.',
      image: '/event2.jpg',
      buttonText: 'Register to Help'
    },
    {
      id: 3,
      title: 'Bible Study Workshop',
      date: 'March 18, 2024',
      time: '7:00 PM',
      location: 'Fellowship Hall',
      description: 'Deep dive into scripture with interactive discussions and learning.',
      image: '/event3.jpg',
      buttonText: 'RSVP'
    },
    {
      id: 4,
      title: 'Youth Retreat',
      date: 'April 12-14, 2024',
      time: 'Friday-Sunday',
      location: 'Camp Crystal Lake',
      description: 'A weekend of fun, faith, and fellowship for our youth group.',
      image: '/event4.jpg',
      buttonText: 'Sign Up'
    },
    {
      id: 5,
      title: 'Women\'s Ministry Brunch',
      date: 'March 30, 2024',
      time: '11:00 AM',
      location: 'Church Cafe',
      description: 'Monthly gathering for fellowship, prayer, and encouragement.',
      image: '/event5.jpg',
      buttonText: 'Join Us'
    },
    {
      id: 6,
      title: 'Men\'s Breakfast',
      date: 'April 6, 2024',
      time: '8:00 AM',
      location: 'Fellowship Hall',
      description: 'Monthly breakfast meeting for fellowship and discussion.',
      image: '/event6.jpg',
      buttonText: 'RSVP'
    }
  ];

  return (
    <div>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-navy text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-inter">Upcoming Events</h1>
            <p className="text-xl font-inter">Join us for worship, fellowship, and community activities.</p>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div key={event.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 font-inter text-navy">{event.title}</h3>
                    <div className="text-sm text-gray-600 mb-2">
                      <p><strong>Date:</strong> {event.date}</p>
                      <p><strong>Time:</strong> {event.time}</p>
                      <p><strong>Location:</strong> {event.location}</p>
                    </div>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <button className="bg-gold text-navy px-4 py-2 rounded font-inter hover:bg-opacity-80 transition-colors w-full">
                      {event.buttonText}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Calendar/Subscribe Section */}
        <section className="py-16 bg-neutral">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 font-inter text-navy">Stay Updated</h2>
            <p className="text-lg text-gray-600 mb-8">Subscribe to our events calendar to never miss an important date.</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-gold text-navy px-8 py-3 rounded-lg font-inter hover:bg-opacity-80 transition-colors">Subscribe to Calendar</button>
              <button className="border border-gold text-gold px-8 py-3 rounded-lg font-inter hover:bg-gold hover:text-navy transition-colors">Download Calendar</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
