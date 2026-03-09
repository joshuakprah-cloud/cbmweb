'use client';

import { useTheme } from './theme-provider';
import Link from 'next/link';
import { useState } from 'react';
import { 
  FaHome, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaFacebookF, 
  FaTwitter, 
  FaYoutube, 
  FaInstagram, 
  FaWhatsapp 
} from 'react-icons/fa';

const Footer = ({ homepage }: { homepage?: any }) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submission:', formData);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* COLUMN 1 — CONTACT INFORMATION */}
            <div>
              <h4 className="text-lg font-bold mb-6">Contact Information</h4>
              
              {/* Address */}
              <div className="flex items-start mb-4">
                <FaHome className="text-red-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">Gbeshigon Street, La, Accra, Ghana (Near Maale Dada Street)</p>
                  <p className="text-sm text-gray-400">Digital Address: GL-020-5834</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start mb-4">
                <FaMapMarkerAlt className="text-red-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">ThaGospel Church – Main Branch</p>
                  <p className="text-sm text-gray-400">P.O. Box GP 2194, Accra, Ghana</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start mb-4">
                <FaPhoneAlt className="text-red-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">Telephone: (+233) 571 124 180 | 0570 947 621</p>
                  <p className="text-sm text-gray-400">Helpline: (+233) 543 308 187</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start">
                <FaEnvelope className="text-red-500 mr-4 mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-300">info@thagospel.org</p>
              </div>
            </div>

            {/* COLUMN 2 — SOCIAL + NEWSLETTER + MAP */}
            <div>
              {/* Social Media */}
              <h4 className="text-lg font-bold mb-6">Follow us on Social Media</h4>
              <div className="flex space-x-3 mb-8">
                <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                  <FaFacebookF className="text-white text-sm" />
                </a>
                <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                  <FaTwitter className="text-white text-sm" />
                </a>
                <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                  <FaYoutube className="text-white text-sm" />
                </a>
                <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                  <FaInstagram className="text-white text-sm" />
                </a>
              </div>

              {/* Newsletter */}
              <h4 className="text-lg font-bold mb-4">Sign-up to receive our Newsletter</h4>
              <form onSubmit={handleNewsletterSubmit} className="mb-8">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email here"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center"
                  >
                    Send
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </form>

              {/* Map */}
              <div className="w-full h-48 bg-gray-800 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.8265424175!2d-0.1877!3d5.5612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzMnMzYuMiJOwcrwMTAnMzYuNiJF!5e0!3m2!1sen!2sgh!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ThaGospel Church Accra Ghana"
                />
              </div>
            </div>

            {/* COLUMN 3 — CONTACT FORM */}
            <div>
              <h4 className="text-lg font-bold mb-6">Write to us:</h4>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full Name here"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email here"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Your Phone Number here"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                  required
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message"
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors resize-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/233571124180"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center space-x-2 z-50"
      >
        <FaWhatsapp className="text-xl" />
        <span className="text-sm font-medium">Chat with us on WhatsApp</span>
      </a>
    </>
  );
};

export default Footer;
