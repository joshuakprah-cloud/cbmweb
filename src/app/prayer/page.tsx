'use client'

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';

interface PrayerRequestForm {
  name: string;
  email: string;
  message: string;
  phone: string;
  requestType: 'public' | 'private';
  followUpRequested: boolean;
}

export default function Prayer() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PrayerRequestForm>();

  const onSubmit = async (data: PrayerRequestForm) => {
    const recaptchaToken = recaptchaRef.current?.getValue();
    if (!recaptchaToken) {
      alert('Please complete the reCAPTCHA');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/prayer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });
      if (response.ok) {
        setSubmitted(true);
        reset();
        recaptchaRef.current?.reset();
      } else {
        alert('Failed to submit prayer request. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-navy text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-inter">Prayer Requests</h1>
            <p className="text-xl font-inter">Share your needs and let our community lift you up in prayer.</p>
          </div>
        </section>

        {/* Prayer Request Form */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-neutral p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold mb-6 text-center font-inter text-navy">Submit a Prayer Request</h2>
              <p className="text-center text-gray-600 mb-8">
                Your prayer requests are confidential and will be shared only with our prayer team. We respect your privacy and handle all requests with care.
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email address'
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone (Optional)</label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prayer Request</label>
                  <textarea
                    rows={6}
                    {...register('message', { required: 'Message is required' })}
                    placeholder="Please share your prayer request. Be as specific or general as you'd like."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-vertical"
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Request Type</label>
                  <select
                    {...register('requestType')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  >
                    <option value="private">Private (Only prayer team)</option>
                    <option value="public">Public (Can be shared anonymously)</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center">
                    <input type="checkbox" {...register('followUpRequested')} className="mr-3 h-4 w-4 text-gold focus:ring-gold border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Request follow-up from our prayer team</span>
                  </label>
                </div>

                <div className="flex justify-center">
                  {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    />
                  ) : (
                    <div className="text-center text-gray-500">ReCAPTCHA not configured</div>
                  )}
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gold text-navy px-8 py-3 rounded-lg font-inter font-semibold hover:bg-opacity-80 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Submit Prayer Request'}
                  </button>
                </div>
              </form>

              {/* Success Message */}
              {submitted && (
                <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-800 text-center">
                    Thank you for sharing your prayer request. Our prayer team will lift you up in prayer.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* How We Pray */}
        <section className="py-16 bg-neutral">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-inter text-navy">How We Pray</h2>
              <p className="text-lg text-gray-600">Our prayer ministry is dedicated to interceding for our congregation and community.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🙏</div>
                <h3 className="text-xl font-bold mb-2 font-inter text-navy">Weekly Prayer Meetings</h3>
                <p className="text-gray-600">Join us every Wednesday for corporate prayer and worship.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📖</div>
                <h3 className="text-xl font-bold mb-2 font-inter text-navy">Prayer Partners</h3>
                <p className="text-gray-600">Connect with a prayer partner for ongoing support and encouragement.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">❤️</div>
                <h3 className="text-xl font-bold mb-2 font-inter text-navy">24/7 Prayer Line</h3>
                <p className="text-gray-600">Call our prayer hotline anytime for immediate prayer support.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Scripture */}
        <section className="py-16 bg-navy text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <blockquote className="text-xl md:text-2xl italic mb-4 font-inter">
              "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."
            </blockquote>
            <cite className="text-gold font-inter">- Philippians 4:6</cite>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
