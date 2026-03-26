'use client';

import { useState } from 'react';

interface MinistryJoinFormProps {
  ministryName: string;
  ministrySlug: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  ageGroup: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
}

const MinistryJoinForm: React.FC<MinistryJoinFormProps> = ({
  ministryName,
  ministrySlug,
}) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    ageGroup: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    
    if (name === 'fullName' && !formData.fullName.trim()) {
      setErrors(prev => ({ ...prev, fullName: 'Full name is required' }));
    }
    
    if (name === 'email' && !formData.email.trim()) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/ministry-join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          ministry: ministrySlug,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(`Thank you for your interest in ${ministryName}! We'll be in touch soon.`);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          ageGroup: '',
          message: '',
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setSubmitStatus('idle');
    setSubmitMessage('');
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 text-4xl mb-4">✓</div>
        <h3 className="text-lg font-semibold text-green-900 mb-2">
          Thank You!
        </h3>
        <p className="text-green-700" aria-live="polite">
          {submitMessage}
        </p>
      </div>
    );
  }

  if (submitStatus === 'error') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 text-4xl mb-4">✕</div>
        <h3 className="text-lg font-semibold text-red-900 mb-2">
          Submission Failed
        </h3>
        <p className="text-red-700 mb-4" aria-live="polite">
          {submitMessage}
        </p>
        <button
          onClick={handleRetry}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div id="join" className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Join {ministryName}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="ministry" value={ministrySlug} />
        
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
              errors.fullName ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-required="true"
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          />
          {errors.fullName && (
            <p id="fullName-error" className="text-red-500 text-sm mt-1" role="alert">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-required="true"
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label htmlFor="ageGroup" className="block text-sm font-medium text-gray-700 mb-1">
            Age Group
          </label>
          <select
            id="ageGroup"
            name="ageGroup"
            value={formData.ageGroup}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">Select age group</option>
            <option value="Under 13">Under 13</option>
            <option value="13-17">13-17</option>
            <option value="18-25">18-25</option>
            <option value="26-40">26-40</option>
            <option value="40+">40+</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Join Ministry'}
        </button>
      </form>
    </div>
  );
};

export default MinistryJoinForm;
