'use client';

import { useState } from 'react';
import { CONTACT_FALLBACKS } from '@/constants/fallbacks';

interface FormData {
  name: string;
  email: string;
  phone: string;
  prayerType: string;
  request: string;
  urgent: boolean;
  consent: boolean;
  website: string; // Honeypot field
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  prayerType?: string;
  request?: string;
  urgent?: string;
  consent?: string;
  website?: string;
}

const prayerTypeOptions = [
  'Personal',
  'Family',
  'Health',
  'Financial',
  'Relationships',
  'Work',
  'Salvation',
  'Other',
];

const ImprovedPrayerForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    prayerType: 'Personal',
    request: '',
    urgent: false,
    consent: false,
    website: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const validateField = (field: keyof FormData, value: any): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return undefined;
      
      case 'email':
        if (!value.trim()) return 'Email address is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return undefined;
      
      case 'prayerType':
        if (!value.trim()) return 'Prayer type is required';
        return undefined;
      
      case 'request':
        if (!value.trim()) return 'Prayer request is required';
        if (value.trim().length < 10) return 'Prayer request must be at least 10 characters';
        if (value.trim().length > 2000) return 'Prayer request must be less than 2000 characters';
        return undefined;
      
      case 'consent':
        if (!value) return 'You must consent to be contacted regarding this prayer request';
        return undefined;
      
      default:
        return undefined;
    }
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof FormData, value: any) => {
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validate all required fields
    Object.keys(formData).forEach((field) => {
      if (field !== 'website' && field !== 'phone' && field !== 'urgent') { // Skip honeypot, optional phone, and optional urgent
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
      setSubmitMessage(`Thank you, ${formData.name.trim()}. Our team is praying for you.`);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/prayer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          prayerType: formData.prayerType,
          request: formData.request.trim(),
          urgent: formData.urgent,
          consent: formData.consent,
          website: formData.website, // Include honeypot for bot detection
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(`Thank you, ${formData.name.trim()}. Our team is praying for you. You are not alone.`);
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          prayerType: 'Personal',
          request: '',
          urgent: false,
          consent: false,
          website: '',
        });
        setErrors({});
      } else {
        throw new Error(data.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Prayer form submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage(`Something went wrong. Please try again or call us directly at ${CONTACT_FALLBACKS.phone}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendAnother = () => {
    setSubmitStatus('idle');
    setSubmitMessage('');
    setErrors({});
  };

  const remainingCharacters = 2000 - formData.request.length;

  if (submitStatus === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Prayer Request Received</h3>
        <p className="text-gray-600 mb-6">{submitMessage}</p>
        <button
          onClick={handleSendAnother}
          className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          onBlur={(e) => handleBlur('name', e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your full name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
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
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="(555) 123-4567"
        />
      </div>

      {/* Prayer Type */}
      <div>
        <label htmlFor="prayerType" className="block text-sm font-medium text-gray-700 mb-2">
          Prayer Type <span className="text-red-500">*</span>
        </label>
        <select
          id="prayerType"
          name="prayerType"
          value={formData.prayerType}
          onChange={(e) => handleInputChange('prayerType', e.target.value)}
          onBlur={(e) => handleBlur('prayerType', e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
            errors.prayerType ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          {prayerTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.prayerType && (
          <p className="mt-1 text-sm text-red-600">{errors.prayerType}</p>
        )}
      </div>

      {/* Prayer Request */}
      <div>
        <label htmlFor="request" className="block text-sm font-medium text-gray-700 mb-2">
          Prayer Request <span className="text-red-500">*</span>
        </label>
        <textarea
          id="request"
          name="request"
          value={formData.request}
          onChange={(e) => handleInputChange('request', e.target.value)}
          onBlur={(e) => handleBlur('request', e.target.value)}
          rows={6}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${
            errors.request ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Share what you'd like us to pray for..."
          maxLength={2000}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.request && (
            <p className="text-sm text-red-600">{errors.request}</p>
          )}
          <p className={`text-sm ${remainingCharacters < 100 ? 'text-orange-500' : 'text-gray-500'} ml-auto`}>
            {remainingCharacters} characters remaining
          </p>
        </div>
      </div>

      {/* Consent Checkbox */}
      <div>
        <label className="flex items-start">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={formData.consent}
            onChange={(e) => handleInputChange('consent', e.target.checked)}
            onBlur={(e) => handleBlur('consent', e.target.checked)}
            className={`mt-1 h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 ${
              errors.consent ? 'border-red-500' : ''
            }`}
          />
          <div className="ml-3 text-sm">
            <label htmlFor="consent" className="font-medium text-gray-700">
              I agree to allow the ThaGospel pastoral team to contact me regarding this prayer request
              <span className="text-red-500">*</span>
            </label>
            {errors.consent && (
              <p className="mt-1 text-sm text-red-600">{errors.consent}</p>
            )}
          </div>
        </label>
      </div>

      {/* Urgency Toggle */}
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            id="urgent"
            name="urgent"
            checked={formData.urgent}
            onChange={(e) => handleInputChange('urgent', e.target.checked)}
            className="mt-1 h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <div className="ml-3 text-sm">
            <label htmlFor="urgent" className="font-medium text-gray-700">
              This is urgent
            </label>
            <p className="text-gray-500">Mark this as urgent if you need immediate prayer support</p>
          </div>
        </label>
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
        className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Prayer Request'}
      </button>
    </form>
  );
};

export default ImprovedPrayerForm;
