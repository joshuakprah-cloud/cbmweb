'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CheckCircleIcon, LockClosedIcon, ClockIcon } from '@heroicons/react/24/outline';

const ConnectCardForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    hearAboutUs: '',
    interests: [] as string[],
    firstTime: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (interest: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: checked
        ? [...prev.interests, interest]
        : prev.interests.filter(i => i !== interest)
    }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Required field validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);

    // If no errors, submit form
    if (Object.keys(newErrors).length === 0) {
      // TODO: connect form to real backend or email service
      console.log('Form submitted:', formData);
      setSubmitted(true);
    }
  };

  const trustSignals = [
    { icon: CheckCircleIcon, text: 'No spam, ever' },
    { icon: LockClosedIcon, text: 'Your info stays private' },
    { icon: ClockIcon, text: 'We respond within 24 hours' }
  ];

  const interestOptions = [
    'New Members Class',
    'Small Groups',
    'Volunteering',
    'Baptism',
    'Missions & Outreach',
    'Prayer Team',
    'Just saying hello'
  ];

  if (submitted) {
    return (
      <section className="bg-[#F9FAFB] py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <CheckCircleIcon className="w-16 h-16 text-[#2563EB] mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-[#111827] mb-4">
              Thanks for reaching out!
            </h2>
            <p className="text-base text-[#6B7280]">
              We will be in touch very soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F9FAFB] py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Side - Text */}
          <div className="lg:col-span-5">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#2563EB] mb-4">
              Connect Card
            </span>

            <h2 className="text-2xl font-bold text-[#111827] mb-6">
              We Would Love To Hear From You
            </h2>

            <p className="text-base text-[#6B7280] mb-8">
              Fill in your details below and one of our team will be in touch to help you find your next step.
            </p>

            <div className="space-y-4 mb-8">
              {trustSignals.map((signal, index) => {
                const IconComponent = signal.icon;
                return (
                  <div key={index} className="flex items-center">
                    <IconComponent className="w-5 h-5 text-[#2563EB] mr-3 flex-shrink-0" />
                    <span className="text-sm text-[#6B7280]">{signal.text}</span>
                  </div>
                );
              })}
            </div>

            <div className="rounded-2xl overflow-hidden">
              <Image
                src="https://placehold.co/500x300"
                alt="Warm community gathering"
                width={500}
                height={300}
                className="object-cover w-full h-auto"
                // TODO: replace with real warm community photo
              />
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8">
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-xl text-base focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors ${
                      errors.firstName ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-xl text-base focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors ${
                      errors.lastName ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-xl text-base focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-xl text-base focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  How did you hear about us?
                </label>
                <select
                  name="hearAboutUs"
                  value={formData.hearAboutUs}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-xl text-base focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors"
                >
                  <option value="">Select an option</option>
                  <option value="friend-family">Friend or Family</option>
                  <option value="social-media">Social Media</option>
                  <option value="google-search">Google Search</option>
                  <option value="walked-past">Walked/Drove Past</option>
                  <option value="online-service">Online Service</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[#111827] mb-3">
                  I am interested in:
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {interestOptions.map((interest) => (
                    <label key={interest} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={(e) => handleCheckboxChange(interest, e.target.checked)}
                        className="mr-3 text-[#2563EB] focus:ring-[#2563EB]"
                      />
                      <span className="text-sm text-[#6B7280]">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[#111827] mb-3">
                  First time visiting?
                </label>
                <div className="flex gap-6">
                  {['Yes', 'No', 'Planning to visit'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="firstTime"
                        value={option.toLowerCase()}
                        checked={formData.firstTime === option.toLowerCase()}
                        onChange={handleInputChange}
                        className="mr-2 text-[#2563EB] focus:ring-[#2563EB]"
                      />
                      <span className="text-sm text-[#6B7280]">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Message / Anything else?
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-3 border border-gray-200 rounded-xl text-base focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-4 px-8 rounded-full transition-all duration-200 hover:scale-105"
              >
                Send My Connect Card
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectCardForm;
