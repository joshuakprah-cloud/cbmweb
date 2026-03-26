'use client';

import React, { useState } from 'react';

const CallToAction = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email signup logic
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <section className="bg-blue-600 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
          Get our culture guide and stay connected with what's happening at ThaGospel Church.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Download Culture Guide */}
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Download Our Culture Guide
            </h3>
            <p className="text-gray-600 mb-6">
              A 20-page guide to who we are, what we believe, and how we live out our faith together.
            </p>
            <button className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 w-full">
              Download PDF
            </button>
          </div>

          {/* Email Signup */}
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Join Our Newsletter
            </h3>
            <p className="text-gray-600 mb-6">
              Get weekly updates, upcoming events, and encouraging content delivered to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 w-full"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Simple Join CTA */}
        <div className="text-center">
          <p className="text-blue-100 mb-4">
            Ready to visit us this weekend?
          </p>
          <button className="bg-white text-blue-600 py-3 px-8 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-lg">
            Plan Your Visit
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
