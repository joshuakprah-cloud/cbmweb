'use client'

import Navbar from '../../../components/navbar/Navbar'
import Footer from '../../../components/Footer'
import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'

interface PrayerForm {
  name: string
  email: string
  phone: string
  requestType: 'public' | 'private'
  followUp: boolean
  message: string
}

export default function Prayer() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const { register, handleSubmit, formState: { errors } } = useForm<PrayerForm>()

  const onSubmit = async (data: PrayerForm) => {
    const recaptchaToken = recaptchaRef.current?.getValue()
    if (!recaptchaToken) {
      alert('Please complete the reCAPTCHA')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/prayer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, recaptchaToken }),
      })
      if (response.ok) {
        setSubmitted(true)
        // Trigger analytics
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'prayer_submitted', {
            event_category: 'engagement',
            event_label: 'prayer_request',
          })
        }
      } else {
        alert('Failed to submit prayer request. Please try again.')
      }
    } catch (error) {
      alert('An error occurred. Please try again.')
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div>
        <Navbar />
        <main className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-inter text-navy">Thank You</h1>
            <p className="text-xl font-inter mb-8">Your prayer request has been submitted. We will pray for you.</p>
            <a href="/contact" className="bg-gold text-navy px-8 py-3 rounded-lg font-inter hover:bg-opacity-80 transition-colors">Back to Contact</a>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <main>
        {/* Intro Section */}
        <section className="bg-navy text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-inter">Prayer Request</h1>
            <p className="text-xl font-inter">Share your prayer needs with us. All requests are handled with confidentiality and care.</p>
          </div>
        </section>

        {/* Prayer Form */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    required
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    required
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Request Type</label>
                <select
                  {...register('requestType', { required: 'Please select request type' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  required
                >
                  <option value="">Select...</option>
                  <option value="public">Public - Share with congregation</option>
                  <option value="private">Private - Keep confidential</option>
                </select>
                {errors.requestType && <p className="text-red-500 text-sm">{errors.requestType.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <input
                    type="checkbox"
                    {...register('followUp')}
                    className="mr-2"
                  />
                  Would you like follow-up?
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={6}
                  {...register('message', { required: 'Message is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-vertical"
                  required
                />
                {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
              </div>
              <div className="flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-inter hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Prayer Request'}
              </button>
            </form>
          </div>
        </section>

        {/* Encouragement Scripture */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <blockquote className="text-2xl font-inter italic text-navy mb-4">
              "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."
            </blockquote>
            <cite className="text-lg text-gray-600">- Philippians 4:6</cite>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
