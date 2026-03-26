'use client';

import { useState, useEffect } from 'react';
import { EVENTS_FALLBACKS } from '@/constants/fallbacks';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  preferences: string[];
}

interface FormErrors {
  email?: string;
}

const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    preferences: ['Events'],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'exists'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePreferenceChange = (preference: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(EVENTS_FALLBACKS.newsletter.thankYouMessage);
        setFormData({
          name: '',
          email: '',
          preferences: ['Events'],
        });
      } else if (response.status === 409) {
        setSubmitStatus('exists');
        setSubmitMessage(EVENTS_FALLBACKS.newsletter.alreadySubscribedMessage);
      } else {
        throw new Error('Failed to submit subscription');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(EVENTS_FALLBACKS.newsletter.subscriptionFailedMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setSubmitStatus('idle');
    setSubmitMessage('');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={EVENTS_FALLBACKS.newsletter.title}
    >
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {EVENTS_FALLBACKS.newsletter.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close newsletter subscription"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitStatus === 'idle' && (
            <>
              <p className="text-gray-600 mb-6">
                {EVENTS_FALLBACKS.newsletter.subtitle}
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {EVENTS_FALLBACKS.newsletter.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {EVENTS_FALLBACKS.newsletter.email} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    aria-required="true"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {EVENTS_FALLBACKS.newsletter.preferences}
                  </label>
                  <div className="space-y-2">
                    {Object.entries(EVENTS_FALLBACKS.newsletter.preferencesOptions).map(([key, label]) => (
                      <label key={key} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.preferences.includes(label)}
                          onChange={() => handlePreferenceChange(label)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? EVENTS_FALLBACKS.newsletter.subscribing : EVENTS_FALLBACKS.newsletter.subscribeButton}
                </button>
              </form>
            </>
          )}

          {submitStatus === 'success' && (
            <div className="text-center py-8">
              <div className="text-green-600 text-4xl mb-4">✓</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {EVENTS_FALLBACKS.newsletter.thankYou}
              </h3>
              <p className="text-gray-600" aria-live="polite">
                {submitMessage}
              </p>
            </div>
          )}

          {submitStatus === 'exists' && (
            <div className="text-center py-8">
              <div className="text-yellow-600 text-4xl mb-4">ℹ️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {EVENTS_FALLBACKS.newsletter.alreadySubscribed}
              </h3>
              <p className="text-gray-600" aria-live="polite">
                {submitMessage}
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="text-center py-8">
              <div className="text-red-600 text-4xl mb-4">✕</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {EVENTS_FALLBACKS.newsletter.subscriptionFailed}
              </h3>
              <p className="text-gray-600 mb-4" aria-live="polite">
                {submitMessage}
              </p>
              <button
                onClick={handleRetry}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {EVENTS_FALLBACKS.newsletter.tryAgain}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterModal;
