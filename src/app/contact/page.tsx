import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Contact | ThaGospel Church',
  description: 'Connect with ThaGospel Church. Send us a message, submit a prayer request, or plan your visit.',
  openGraph: {
    title: 'Contact | ThaGospel Church',
    description: 'Connect with ThaGospel Church.',
    type: 'website',
  },
}

export default function Contact() {
  return (
    <div>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-navy text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-inter">Connect With Us</h1>
            <p className="text-xl font-inter">We'd love to hear from you. Reach out with any questions, prayer requests, or to plan your visit.</p>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg shadow-md text-center">
                <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
                <p className="text-gray-600 mb-6">Have a question or need more information? Send us a message and we'll get back to you.</p>
                <a href="/contact/form" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 inline-block">Send Message</a>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg shadow-md text-center">
                <h3 className="text-2xl font-bold mb-4">Prayer Request</h3>
                <p className="text-gray-600 mb-6">Share your prayer needs with us. All requests are handled with confidentiality and care.</p>
                <a href="/contact/prayer" className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 inline-block">Submit Request</a>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg shadow-md text-center">
                <h3 className="text-2xl font-bold mb-4">Plan Your Visit</h3>
                <p className="text-gray-600 mb-6">Planning to join us? Let us know when you'll be visiting so we can welcome you properly.</p>
                <a href="/plan-your-visit" className="bg-gold text-navy px-6 py-3 rounded hover:bg-opacity-80 inline-block">Plan Visit</a>
              </div>
            </div>
          </div>
        </section>

        {/* Church Info Block */}
        <section className="py-16 bg-neutral">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold mb-6 font-inter text-navy">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="text-gold text-2xl mr-4">📍</div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy mb-1">Address</h3>
                      <p className="text-gray-600">
                        123 Church Street<br />
                        City, State 12345<br />
                        United States
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-gold text-2xl mr-4">📞</div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy mb-1">Phone</h3>
                      <p className="text-gray-600">(123) 456-7890</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-gold text-2xl mr-4">✉️</div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy mb-1">Email</h3>
                      <p className="text-gray-600">info@church.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-gold text-2xl mr-4">🕒</div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy mb-1">Office Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 5:00 PM<br />
                        Sunday: 8:00 AM - 12:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Embedded Map */}
              <div>
                <h2 className="text-3xl font-bold mb-6 font-inter text-navy">Find Us</h2>
                <div className="aspect-video">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.241264907318!2d-73.98785368459375!3d40.75889697932781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1640992800000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Church Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
