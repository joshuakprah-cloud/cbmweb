'use client';

import { useState } from 'react';
import { CONTACT_FALLBACKS } from '@/constants/fallbacks';

interface FormData {
  name: string;
  email: string;
  phone: string;
  requestType: 'public' | 'private';
  needsFollowUp: boolean;
  message: string;
  website: string; // Honeypot field
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const PrayerRequestForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    requestType: 'private',
    needsFollowUp: false,
    message: '',
    website: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = CONTACT_FALLBACKS.prayerForm.validationErrors.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = CONTACT_FALLBACKS.prayerForm.validationErrors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = CONTACT_FALLBACKS.prayerForm.validationErrors.emailInvalid;
    }

    if (!formData.message.trim()) {
      newErrors.message = CONTACT_FALLBACKS.prayerForm.validationErrors.messageRequired;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = CONTACT_FALLBACKS.prayerForm.validationErrors.messageMinLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    
    if (name === 'name' && !formData.name.trim()) {
      setErrors(prev => ({ ...prev, name: CONTACT_FALLBACKS.prayerForm.validationErrors.nameRequired }));
    }
    
    if (name === 'email' && !formData.email.trim()) {
      setErrors(prev => ({ ...prev, email: CONTACT_FALLBACKS.prayerForm.validationErrors.emailRequired }));
    }
    
    if (name === 'message' && !formData.message.trim()) {
      setErrors(prev => ({ ...prev, message: CONTACT_FALLBACKS.prayerForm.validationErrors.messageRequired }));
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
      const response = await fetch('/api/prayer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(CONTACT_FALLBACKS.prayerForm.thankYouMessage);
        setFormData({
          name: '',
          email: '',
          phone: '',
          requestType: 'private',
          needsFollowUp: false,
          message: '',
          website: '',
        });
      } else {
        throw new Error('Failed to submit prayer request');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(CONTACT_FALLBACKS.prayerForm.submissionFailedMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitAnother = () => {
    setSubmitStatus('idle');
    setSubmitMessage('');
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
          {CONTACT_FALLBACKS.prayerForm.thankYou}
        </h3>
        <p className="text-green-700 mb-4" aria-live="polite">
          {submitMessage}
        </p>
        <button
          onClick={handleSubmitAnother}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          {CONTACT_FALLBACKS.prayerForm.submitAnother}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Prayer Request</h2>
      
      <form onSubmit={handleSubmit} aria-label="Prayer request form">
        {/* Honeypot field */}
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          className="sr-only"
        />

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              {CONTACT_FALLBACKS.prayerForm.name} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-required="true"
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {CONTACT_FALLBACKS.prayerForm.email} <span className="text-red-500">*</span>
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

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              {CONTACT_FALLBACKS.prayerForm.phone}
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

          {/* Request Type */}
          <div>
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium text-gray-700 mb-2">
                {CONTACT_FALLBACKS.prayerForm.requestType}
              </legend>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="requestType"
                    value="public"
                    checked={formData.requestType === 'public'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {CONTACT_FALLBACKS.prayerForm.public}
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="requestType"
                    value="private"
                    checked={formData.requestType === 'private'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {CONTACT_FALLBACKS.prayerForm.private}
                  </span>
                </label>
              </div>
            </fieldset>
          </div>

          {/* Needs Follow Up */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="needsFollowUp"
                checked={formData.needsFollowUp}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                {CONTACT_FALLBACKS.prayerForm.needsFollowUp}
              </span>
            </label>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              {CONTACT_FALLBACKS.prayerForm.message} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              onBlur={handleBlur}
              rows={6}
              placeholder={CONTACT_FALLBACKS.prayerForm.message}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-required="true"
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <p id="message-error" className="text-red-500 text-sm mt-1" role="alert">
                {errors.message}
              </p>
            )}
          </div>
        </div>

        {/* Error State */}
        {submitStatus === 'error' && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700" aria-live="polite">
              {submitMessage}
            </p>
            <button
              type="button"
              onClick={handleRetry}
              className="mt-2 text-red-600 hover:text-red-700 font-medium"
            >
              {CONTACT_FALLBACKS.prayerForm.tryAgain}
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? CONTACT_FALLBACKS.prayerForm.submitting : CONTACT_FALLBACKS.prayerForm.submitButton}
        </button>
      </form>
    </div>
  );
};

export default PrayerRequestForm;
