'use client'

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import { createClient } from 'next-sanity';
import { servicesQuery } from '../../../sanity/lib/queries';

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

interface VisitorForm {
  name: string;
  phone: string;
  email: string;
  service: string;
  bringingChildren: boolean;
  notes: string;
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2023-01-01',
  useCdn: true,
});

export default function PlanYourVisit() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<VisitorForm>();

  useEffect(() => {
    const fetchServices = async () => {
      const data = await client.fetch(servicesQuery);
      setServices(data);
    };
    fetchServices();
  }, []);

  const onSubmit = async (data: VisitorForm) => {
    const recaptchaToken = recaptchaRef.current?.getValue();
    if (!recaptchaToken) {
      alert('Please complete the reCAPTCHA');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/visit', {
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
        // Trigger analytics
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'visit_registered', {
            event_category: 'engagement',
            event_label: 'visit_registration',
          })
        }
      } else {
        alert('Failed to register. Please try again.');
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-inter">Plan Your Visit</h1>
            <p className="text-xl font-inter">We're excited to welcome you to ThaGospel Church. Here's everything you need to know for your first visit.</p>
          </div>
        </section>

        {/* Welcome Message */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 font-inter text-navy">Welcome to Our Church Family</h2>
            <p className="text-lg text-gray-600 mb-8">
              Whether you're new to faith, returning to church, or just visiting our community, you're welcome here.
              We believe in creating a warm, inclusive environment where everyone can connect with God and each other.
            </p>
            <div className="bg-neutral p-6 rounded-lg">
              <p className="text-gray-700 italic text-lg">
                "For where two or three gather in my name, there am I with them." - Matthew 18:20
              </p>
            </div>
          </div>
        </section>

        {/* Service Times */}
        <section className="py-16 bg-neutral">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-inter text-navy">Service Times</h2>
              <p className="text-lg text-gray-600">Join us for worship at one of our regular services.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service: any) => (
                <div key={service._id} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <h3 className="text-xl font-bold mb-2 text-navy">{service.title}</h3>
                  <p className="text-2xl font-semibold text-gold mb-1">{service.time}</p>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-inter text-navy">What to Expect</h2>
              <p className="text-lg text-gray-600">A typical Sunday service includes worship, prayer, and teaching from God's Word.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-navy">During the Service</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    Contemporary worship music with a live band
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    Prayer time for personal and community needs
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    Biblical teaching and preaching
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    Communion (first Sunday of each month)
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    Fellowship time after service
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-navy">Our Community</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    Welcoming atmosphere for all ages
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    Children and youth programs available
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    Small groups for deeper connection
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    Community outreach and service opportunities
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    Coffee and refreshments after service
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Children Info */}
        <section className="py-16 bg-neutral">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 font-inter text-navy">Children & Youth Programs</h2>
            <p className="text-lg text-gray-600 mb-8">
              We love having families worship together! We offer age-appropriate programs for children during our services.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2 text-navy">Nursery (0-2)</h3>
                <p className="text-gray-600">Caring environment with trained staff for our youngest members.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2 text-navy">Children's Church (3-12)</h3>
                <p className="text-gray-600">Fun, interactive programs teaching biblical truths in age-appropriate ways.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2 text-navy">Youth Group (13-18)</h3>
                <p className="text-gray-600">Engaging activities and discussions for teenagers to grow in faith.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center font-inter text-navy">Find Us</h2>
            <div className="aspect-video max-w-4xl mx-auto">
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
            <div className="mt-8 text-center">
              <p className="text-lg text-gray-600">
                123 Church Street, City, State 12345<br />
                Parking available on site. Wheelchair accessible entrance.
              </p>
            </div>
          </div>
        </section>

        {/* First-time Visitor Form */}
        <section className="py-16 bg-neutral">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold mb-6 text-center font-inter text-navy">Register for Your Visit</h2>
              <p className="text-center text-gray-600 mb-8">
                Let us know you're coming! We'll prepare a special welcome for you and your family.
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    {...register('phone', { required: 'Phone is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Attending</label>
                  <select
                    {...register('service', { required: 'Please select a service' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    {services.map((service: any) => (
                      <option key={service._id} value={service.title}>
                        {service.title} ({service.day} {service.time})
                      </option>
                    ))}
                  </select>
                  {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>}
                </div>

                <div>
                  <label className="flex items-center">
                    <input type="checkbox" {...register('bringingChildren')} className="mr-3 h-4 w-4 text-gold focus:ring-gold border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">I will be bringing children</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                  <textarea
                    rows={3}
                    {...register('notes')}
                    placeholder="Any special needs, questions, or additional information..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-vertical"
                  />
                </div>

                <div className="flex justify-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gold text-navy px-8 py-3 rounded-lg font-inter font-semibold hover:bg-opacity-80 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Registering...' : 'Register for Visit'}
                  </button>
                </div>
              </form>

              {/* Success Message */}
              {submitted && (
                <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-800 text-center">
                    Thank you for registering! We're excited to welcome you to ThaGospel Church.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
