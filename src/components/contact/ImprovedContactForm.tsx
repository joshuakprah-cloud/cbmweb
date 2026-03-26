'use client';

import { useState } from 'react';
import { CONTACT_FALLBACKS } from '@/constants/fallbacks';

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  website: string; // Honeypot field
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string;
}

const subjectOptions = [
  'General Inquiry',
  'Prayer Request',
  'Volunteering',
  'Partnership',
  'Media',
  'Tech & Media Team',
  'Other',
];

const ImprovedContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
    website: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const validateField = (field: keyof FormData, value: string): string | undefined => {
    switch (field) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Full name must be at least 2 characters';
        return undefined;
      
      case 'email':
        if (!value.trim()) return 'Email address is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return undefined;
      
      case 'subject':
        if (!value.trim()) return 'Subject is required';
        return undefined;
      
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        if (value.trim().length > 1000) return 'Message must be less than 1000 characters';
        return undefined;
      
      default:
        return undefined;
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof FormData, value: string) => {
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validate all required fields
    Object.keys(formData).forEach((field) => {
      if (field !== 'website' && field !== 'phone') { // Skip honeypot and optional phone
        const error = validateField(field as keyof FormData, formData[field as keyof FormData]);
        if (error) {
          newErrors[field as keyof FormErrors] = error;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check honeypot field - if filled, it's a bot
    if (formData.website.trim() !== '') {
      // Return success to make bots think submission worked
      setSubmitStatus('success');
      setSubmitMessage('Thank you for your message. We\'ll be in touch soon.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          subject: formData.subject,
          message: formData.message.trim(),
          website: formData.website, // Include honeypot for bot detection
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(`Thank you, ${formData.fullName.trim()}. We'll be in touch within 24-48 hours.`);
        // Reset form
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          subject: 'General Inquiry',
          message: '',
          website: '',
        });
        setErrors({});
      } else {
        throw new Error(data.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage(`Something went wrong. Please try again or email us directly at ${CONTACT_FALLBACKS.email}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendAnother = () => {
    setSubmitStatus('idle');
    setSubmitMessage('');
    setErrors({});
  };

  const remainingCharacters = 1000 - formData.message.length;

  if (submitStatus === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Message Sent Successfully</h3>
        <p className="text-gray-600 mb-6">{submitMessage}</p>
        <button
          onClick={handleSendAnother}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          onBlur={(e) => handleBlur('fullName', e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.fullName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your full name"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
        )}
      </div>

      {/* Email Address */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          onBlur={(e) => handleBlur('email', e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number <span className="text-gray-400">(optional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="(555) 123-4567"
        />
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
          Subject <span className="text-red-500">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={(e) => handleInputChange('subject', e.target.value)}
          onBlur={(e) => handleBlur('subject', e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.subject ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          {subjectOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          onBlur={(e) => handleBlur('message', e.target.value)}
          rows={6}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Tell us how we can help you..."
          maxLength={1000}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.message && (
            <p className="text-sm text-red-600">{errors.message}</p>
          )}
          <p className={`text-sm ${remainingCharacters < 100 ? 'text-orange-500' : 'text-gray-500'} ml-auto`}>
            {remainingCharacters} characters remaining
          </p>
        </div>
      </div>

      {/* Honeypot Field (hidden) */}
      <input
        type="text"
        name="_honey"
        value={formData.website}
        onChange={(e) => handleInputChange('website', e.target.value)}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{submitMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ImprovedContactForm;
