'use client';

import { useState } from 'react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
          <p className="text-gray-600 mb-6">Subscribe to our newsletter for the latest updates and events.</p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded"
              required
            />
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
