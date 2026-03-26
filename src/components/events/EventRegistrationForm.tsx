'use client';

import { useState } from 'react';
import { EVENTS_FALLBACKS } from '@/constants/fallbacks';

interface EventRegistrationFormProps {
  eventSlug: string;
  eventTitle: string;
  requiresRegistration: boolean;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  numberOfAttendees: number;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
}

const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({
  eventSlug,
  eventTitle,
  requiresRegistration,
}) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    numberOfAttendees: 1,
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = EVENTS_FALLBACKS.registration.validationErrors.fullNameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = EVENTS_FALLBACKS.registration.validationErrors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = EVENTS_FALLBACKS.registration.validationErrors.emailInvalid;
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
      setErrors(prev => ({ ...prev, fullName: EVENTS_FALLBACKS.registration.validationErrors.fullNameRequired }));
    }
    
    if (name === 'email' && !formData.email.trim()) {
      setErrors(prev => ({ ...prev, email: EVENTS_FALLBACKS.registration.validationErrors.emailRequired }));
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
      const response = await fetch('/api/events/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          event: eventSlug,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(EVENTS_FALLBACKS.registration.thankYouMessage.replace('{eventTitle}', eventTitle));
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          numberOfAttendees: 1,
          message: '',
        });
      } else if (response.status === 409) {
        setSubmitStatus('error');
        setSubmitMessage(EVENTS_FALLBACKS.registration.eventFullyBooked);
      } else {
        throw new Error('Failed to submit registration');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(EVENTS_FALLBACKS.registration.registrationFailedMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setSubmitStatus('idle');
    setSubmitMessage('');
  };

  if (!requiresRegistration) {
    return null;
  }

  if (submitStatus === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 text-4xl mb-4">✓</div>
        <h3 className="text-lg font-semibold text-green-900 mb-2">
          {EVENTS_FALLBACKS.registration.thankYou}
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
          {EVENTS_FALLBACKS.registration.registrationFailed}
        </h3>
        <p className="text-red-700 mb-4" aria-live="polite">
          {submitMessage}
        </p>
        <button
          onClick={handleRetry}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          {EVENTS_FALLBACKS.registration.tryAgain}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Register for {eventTitle}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="event" value={eventSlug} />
        
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            {EVENTS_FALLBACKS.registration.fullName} <span className="text-red-500">*</span>
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
            {EVENTS_FALLBACKS.registration.email} <span className="text-red-500">*</span>
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
            {EVENTS_FALLBACKS.registration.phone}
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
          <label htmlFor="numberOfAttendees" className="block text-sm font-medium text-gray-700 mb-1">
            {EVENTS_FALLBACKS.registration.numberOfAttendees}
          </label>
          <input
            type="number"
            id="numberOfAttendees"
            name="numberOfAttendees"
            value={formData.numberOfAttendees}
            onChange={handleInputChange}
            min="1"
            max="10"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            {EVENTS_FALLBACKS.registration.message}
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
          {isSubmitting ? EVENTS_FALLBACKS.registration.submitting : EVENTS_FALLBACKS.registration.registerButton}
        </button>
      </form>
    </div>
  );
};

export default EventRegistrationForm;
