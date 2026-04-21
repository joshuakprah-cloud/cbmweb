'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CONTACT_FALLBACKS } from '@/constants/fallbacks';
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon, 
  PaperAirplaneIcon,
  HeartIcon,
  LockClosedIcon,
  UsersIcon
} from '@heroicons/react/24/solid';

const prayerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  requestType: z.enum(['public', 'private']),
  needsFollowUp: z.boolean().optional(),
  category: z.string().min(1, 'Please select a category'),
  message: z.string().min(10, 'Prayer request must be at least 10 characters'),
});

type PrayerFormData = z.infer<typeof prayerSchema>

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const prayerCategories = [
  { value: 'healing', label: 'Healing & Health' },
  { value: 'family', label: 'Family & Relationships' },
  { value: 'financial', label: 'Financial Provision' },
  { value: 'career', label: 'Career & Work' },
  { value: 'spiritual', label: 'Spiritual Growth' },
  { value: 'other', label: 'Other' },
];

const PrayerForm = () => {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<PrayerFormData>({
    resolver: zodResolver(prayerSchema),
    defaultValues: {
      requestType: 'private',
      needsFollowUp: false,
    },
  });

  const requestType = watch('requestType');

  const onSubmit = async (data: PrayerFormData) => {
    setStatus('submitting');
    setErrorMessage('');

    try {
      // Simulate API call - replace with actual API integration
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // TODO: Replace with actual prayer request API
      console.log('Prayer request:', data);
      
      setStatus('success');
      
      // Reset form after delay
      setTimeout(() => {
        reset();
        setStatus('idle');
      }, 4000);
    } catch (error) {
      console.error('Error submitting prayer request:', error);
      setStatus('error');
      setErrorMessage(CONTACT_FALLBACKS.prayerForm.submissionFailedMessage);
    }
  };

  const handleRetry = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  // Success state
  if (status === 'success') {
    return (
      <div className="bg-gradient-to-br from-teal-50 to-green-50 border border-teal-100 rounded-2xl p-8 text-center">
        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <HeartIcon className="w-10 h-10 text-teal-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {CONTACT_FALLBACKS.prayerForm.thankYou}
        </h3>
        <p className="text-gray-600 mb-2">
          {CONTACT_FALLBACKS.prayerForm.thankYouMessage}
        </p>
        <p className="text-sm text-gray-500 italic mb-6">
          &ldquo;The prayer of a righteous person is powerful and effective.&rdquo; — James 5:16
        </p>
        <button
          onClick={() => {
            reset();
            setStatus('idle');
          }}
          className="text-teal-600 font-semibold hover:text-teal-700 transition-colors"
        >
          {CONTACT_FALLBACKS.prayerForm.submitAnother}
        </button>
      </div>
    );
  }

  // Error state
  if (status === 'error') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ExclamationCircleIcon className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {CONTACT_FALLBACKS.prayerForm.submissionFailed}
        </h3>
        <p className="text-gray-600 mb-6">{errorMessage}</p>
        <button
          onClick={handleRetry}
          className="px-6 py-2 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors"
        >
          {CONTACT_FALLBACKS.prayerForm.tryAgain}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Privacy Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
        <LockClosedIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium text-amber-900">Your privacy matters</p>
          <p className="text-amber-700">
            Choose to share your request with our prayer team (confidential) or keep it completely private.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
            {CONTACT_FALLBACKS.prayerForm.name} <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            disabled={status === 'submitting'}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.name 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                : 'border-gray-300 focus:border-teal-500 focus:ring-teal-200'
            } focus:ring-2 focus:ring-opacity-50 outline-none transition-all disabled:bg-gray-50`}
            placeholder="Your name"
          />
          {errors.name && (
            <p className="mt-1.5 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            {CONTACT_FALLBACKS.prayerForm.email} <span className="text-red-500">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            disabled={status === 'submitting'}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                : 'border-gray-300 focus:border-teal-500 focus:ring-teal-200'
            } focus:ring-2 focus:ring-opacity-50 outline-none transition-all disabled:bg-gray-50`}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Phone Field (Optional) */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
          {CONTACT_FALLBACKS.prayerForm.phone} <span className="text-gray-400">(Optional)</span>
        </label>
        <input
          {...register('phone')}
          type="tel"
          id="phone"
          disabled={status === 'submitting'}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:ring-opacity-50 outline-none transition-all disabled:bg-gray-50"
          placeholder="+233 XX XXX XXXX"
        />
      </div>

      {/* Request Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {CONTACT_FALLBACKS.prayerForm.requestType}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
            requestType === 'public' 
              ? 'border-teal-500 bg-teal-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="radio"
              {...register('requestType')}
              value="public"
              className="sr-only"
            />
            <UsersIcon className={`w-5 h-5 ${requestType === 'public' ? 'text-teal-600' : 'text-gray-400'}`} />
            <div>
              <p className={`font-medium ${requestType === 'public' ? 'text-teal-900' : 'text-gray-700'}`}>
                {CONTACT_FALLBACKS.prayerForm.public}
              </p>
              <p className="text-xs text-gray-500">Share with prayer team</p>
            </div>
          </label>

          <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
            requestType === 'private' 
              ? 'border-teal-500 bg-teal-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="radio"
              {...register('requestType')}
              value="private"
              className="sr-only"
            />
            <LockClosedIcon className={`w-5 h-5 ${requestType === 'private' ? 'text-teal-600' : 'text-gray-400'}`} />
            <div>
              <p className={`font-medium ${requestType === 'private' ? 'text-teal-900' : 'text-gray-700'}`}>
                {CONTACT_FALLBACKS.prayerForm.private}
              </p>
              <p className="text-xs text-gray-500">Only pastors see this</p>
            </div>
          </label>
        </div>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1.5">
          Prayer Category <span className="text-red-500">*</span>
        </label>
        <select
          {...register('category')}
          id="category"
          disabled={status === 'submitting'}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.category 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
              : 'border-gray-300 focus:border-teal-500 focus:ring-teal-200'
          } focus:ring-2 focus:ring-opacity-50 outline-none transition-all disabled:bg-gray-50 bg-white`}
        >
          <option value="">Select a category...</option>
          {prayerCategories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1.5 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      {/* Follow Up Checkbox */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('needsFollowUp')}
            disabled={status === 'submitting'}
            className="w-5 h-5 text-teal-500 border-gray-300 rounded focus:ring-teal-500"
          />
          <span className="text-sm text-gray-700">
            {CONTACT_FALLBACKS.prayerForm.needsFollowUp}
          </span>
        </label>
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
          Your Prayer Request <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={5}
          disabled={status === 'submitting'}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.message 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
              : 'border-gray-300 focus:border-teal-500 focus:ring-teal-200'
          } focus:ring-2 focus:ring-opacity-50 outline-none transition-all resize-none disabled:bg-gray-50`}
          placeholder={CONTACT_FALLBACKS.prayerForm.message}
        />
        {errors.message && (
          <p className="mt-1.5 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
      >
        {status === 'submitting' ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {CONTACT_FALLBACKS.prayerForm.submitting}
          </>
        ) : (
          <>
            <PaperAirplaneIcon className="w-5 h-5" />
            {CONTACT_FALLBACKS.prayerForm.submitButton}
          </>
        )}
      </button>
    </form>
  );
};

export default PrayerForm;
