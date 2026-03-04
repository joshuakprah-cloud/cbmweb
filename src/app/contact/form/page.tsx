'use client'

import Navbar from '../../../components/navbar/Navbar'
import Footer from '../../../components/Footer'
import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'

interface ContactForm {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>()

  const onSubmit = async (data: ContactForm) => {
    const recaptchaToken = recaptchaRef.current?.getValue()
    if (!recaptchaToken) {
      alert('Please complete the reCAPTCHA')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/contact', {
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
          window.gtag('event', 'contact_submitted', {
            event_category: 'engagement',
            event_label: 'contact_form',
          })
        }
      } else {
        alert('Failed to send message. Please try again.')
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
            <p className="text-xl font-inter mb-8">Your message has been sent. We'll get back to you soon.</p>
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
        {/* Hero Section */}
        <section className="bg-navy text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-inter">Contact Us</h1>
            <p className="text-xl font-inter">Have a question or need more information? Send us a message and we'll get back to you.</p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    {...register('firstName', { required: 'First name is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    required
                  />
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    {...register('lastName', { required: 'Last name is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    required
                  />
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                </div>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select
                  {...register('subject', { required: 'Please select a subject' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  required
                >
                  <option value="">Select a subject...</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Volunteering">Volunteering</option>
                  <option value="Event Information">Event Information</option>
                  <option value="Ministry">Ministry</option>
                  <option value="Other">Other</option>
                </select>
                {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
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
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-inter hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
