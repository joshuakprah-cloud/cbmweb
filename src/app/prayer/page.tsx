'use client'

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import { HandRaisedIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline';

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
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center overflow-hidden bg-[#0B1F3A]">
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight drop-shadow-lg">
            Prayer Requests
          </h1>
          <p className="mt-6 text-xl text-white/90 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            Share your needs and let our community lift you up in prayer
          </p>
        </div>
      </section>

        {/* Prayer Request Form */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-center mb-8">
                <span className="text-[#0d9488] text-sm font-semibold tracking-[0.15em] uppercase">We're Here For You</span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] mt-3">Submit a Prayer Request</h2>
              </div>
              <p className="text-center text-gray-600 mb-8">
                Your prayer requests are confidential and will be shared only with our prayer team. We respect your privacy and handle all requests with care.
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone (Optional)</label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prayer Request</label>
                  <textarea
                    rows={6}
                    {...register('message', { required: 'Message is required' })}
                    placeholder="Please share your prayer request. Be as specific or general as you'd like."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d9488] focus:border-transparent resize-vertical"
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Request Type</label>
                  <select
                    {...register('requestType')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
                  >
                    <option value="private">Private (Only prayer team)</option>
                    <option value="public">Public (Can be shared anonymously)</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center">
                    <input type="checkbox" {...register('followUpRequested')} className="mr-3 h-4 w-4 text-[#0d9488] focus:ring-[#0d9488] border-gray-300 rounded" />
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
                    className="bg-[#0d9488] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#0f766e] transition-colors disabled:opacity-50 shadow-lg hover:shadow-xl"
                  >
                    {loading ? 'Submitting...' : 'Submit Prayer Request'}
                  </button>
                </div>
              </form>

              {/* Success Message */}
              {submitted && (
                <div className="mt-8 p-6 bg-[#0d9488]/10 border border-[#0d9488]/20 rounded-xl">
                  <p className="text-[#0d9488] text-center font-medium">
                    Thank you for sharing your prayer request. Our prayer team will lift you up in prayer.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* How We Pray */}
        <section className="py-20 bg-[#F8F9FB] border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-[#0d9488] text-sm font-semibold tracking-[0.15em] uppercase">Prayer Ministry</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] mt-3">How We Pray</h2>
              <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Our prayer ministry is dedicated to interceding for our congregation and community.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-[#0d9488]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <HandRaisedIcon className="w-8 h-8 text-[#0d9488]" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#0B1F3A]">Weekly Prayer Meetings</h3>
                <p className="text-gray-600">Join us every Wednesday for corporate prayer and worship.</p>
              </div>
              <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-[#0d9488]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <UserGroupIcon className="w-8 h-8 text-[#0d9488]" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#0B1F3A]">Prayer Partners</h3>
                <p className="text-gray-600">Connect with a prayer partner for ongoing support and encouragement.</p>
              </div>
              <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-[#0d9488]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ClockIcon className="w-8 h-8 text-[#0d9488]" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#0B1F3A]">24/7 Prayer Line</h3>
                <p className="text-gray-600">Call our prayer hotline anytime for immediate prayer support.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Scripture */}
        <section className="py-20 bg-[#0B1F3A] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-[#0d9488]/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <span className="text-3xl">📖</span>
            </div>
            <blockquote className="text-xl md:text-2xl italic mb-4 leading-relaxed">
              "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."
            </blockquote>
            <cite className="text-[#0d9488] font-semibold not-italic">— Philippians 4:6</cite>
          </div>
        </section>
    </main>
  );
}
