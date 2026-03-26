'use client';

import { useState } from 'react';
import { CONTACT_FALLBACKS } from '@/constants/fallbacks';

interface ContactFormProps {
  formType: 'general';
}

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
  email?: string;
  message?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ formType }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    subject: 'general',
    message: '',
    website: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = CONTACT_FALLBACKS.contactForm.validationErrors.fullNameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = CONTACT_FALLBACKS.contactForm.validationErrors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = CONTACT_FALLBACKS.contactForm.validationErrors.emailInvalid;
    }

    if (!formData.message.trim()) {
      newErrors.message = CONTACT_FALLBACKS.contactForm.validationErrors.messageRequired;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = CONTACT_FALLBACKS.contactForm.validationErrors.messageMinLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    
    if (name === 'fullName' && !formData.fullName.trim()) {
      setErrors(prev => ({ ...prev, fullName: CONTACT_FALLBACKS.contactForm.validationErrors.fullNameRequired }));
    }
    
    if (name === 'email' && !formData.email.trim()) {
      setErrors(prev => ({ ...prev, email: CONTACT_FALLBACKS.contactForm.validationErrors.emailRequired }));
    }
    
    if (name === 'message' && !formData.message.trim()) {
      setErrors(prev => ({ ...prev, message: CONTACT_FALLBACKS.contactForm.validationErrors.messageRequired }));
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(CONTACT_FALLBACKS.contactForm.thankYouMessage);
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          subject: 'general',
          message: '',
          website: '',
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(CONTACT_FALLBACKS.contactForm.submissionFailedMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendAnother = () => {
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
          {CONTACT_FALLBACKS.contactForm.thankYou}
        </h3>
        <p className="text-green-700 mb-4" aria-live="polite">
          {submitMessage}
        </p>
        <button
          onClick={handleSendAnother}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          {CONTACT_FALLBACKS.contactForm.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {formType === 'general' ? 'Send us a Message' : 'Contact Form'}
      </h2>
      
      <form onSubmit={handleSubmit} aria-label="Contact form">
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
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              {CONTACT_FALLBACKS.contactForm.fullName} <span className="text-red-500">*</span>
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

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              {CONTACT_FALLBACKS.contactForm.phone}
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

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {CONTACT_FALLBACKS.contactForm.email} <span className="text-red-500">*</span>
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

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              {CONTACT_FALLBACKS.contactForm.subject}
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="general">{CONTACT_FALLBACKS.contactForm.subjects.general}</option>
              <option value="prayer">{CONTACT_FALLBACKS.contactForm.subjects.prayer}</option>
              <option value="pastoral">{CONTACT_FALLBACKS.contactForm.subjects.pastoral}</option>
              <option value="partnership">{CONTACT_FALLBACKS.contactForm.subjects.partnership}</option>
              <option value="media">{CONTACT_FALLBACKS.contactForm.subjects.media}</option>
              <option value="feedback">{CONTACT_FALLBACKS.contactForm.subjects.feedback}</option>
              <option value="volunteering">{CONTACT_FALLBACKS.contactForm.subjects.volunteering}</option>
              <option value="other">{CONTACT_FALLBACKS.contactForm.subjects.other}</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              {CONTACT_FALLBACKS.contactForm.message} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              onBlur={handleBlur}
              rows={6}
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
              {CONTACT_FALLBACKS.contactForm.tryAgain}
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? CONTACT_FALLBACKS.contactForm.sending : CONTACT_FALLBACKS.contactForm.submitButton}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
