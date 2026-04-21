'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MINISTRIES_FALLBACKS } from '@/constants/fallbacks';
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon, 
  UserGroupIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/solid';

const groupJoinSchema = z.object({
  fullName: z.string().min(2, MINISTRIES_FALLBACKS.validationErrors.fullNameRequired),
  email: z.string().email(MINISTRIES_FALLBACKS.validationErrors.emailInvalid),
  phone: z.string().min(10, 'Phone number is required'),
  ageGroup: z.string().min(1, 'Please select an age group'),
  message: z.string().optional(),
  preferredContact: z.enum(['email', 'phone', 'whatsapp']),
  availability: z.array(z.string()).min(1, 'Please select at least one day'),
});

type GroupJoinFormData = z.infer<typeof groupJoinSchema>

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

interface GroupJoinFormProps {
  groupName?: string;
  groupId?: string;
  onSuccess?: () => void;
}

const ageGroups = [
  { value: 'under13', label: MINISTRIES_FALLBACKS.ageGroups.under13 },
  { value: '13-17', label: MINISTRIES_FALLBACKS.ageGroups.range13_17 },
  { value: '18-25', label: MINISTRIES_FALLBACKS.ageGroups.range18_25 },
  { value: '26-40', label: MINISTRIES_FALLBACKS.ageGroups.range26_40 },
  { value: '40+', label: MINISTRIES_FALLBACKS.ageGroups.over40 },
];

const availabilityOptions = [
  { value: 'sunday', label: 'Sunday' },
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
];

const GroupJoinForm = ({ groupName = 'Small Group', groupId, onSuccess }: GroupJoinFormProps) => {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm<GroupJoinFormData>({
    resolver: zodResolver(groupJoinSchema),
    defaultValues: {
      preferredContact: 'email',
      availability: [],
    },
  });

  const selectedAvailability = watch('availability') || [];

  const toggleAvailability = (day: string) => {
    const current = selectedAvailability;
    const updated = current.includes(day)
      ? current.filter((d) => d !== day)
      : [...current, day];
    setValue('availability', updated, { shouldValidate: true });
  };

  const onSubmit = async (data: GroupJoinFormData) => {
    setStatus('submitting');
    setErrorMessage('');

    try {
      // Simulate API call - replace with actual API integration
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // TODO: Replace with actual group join API
      console.log('Group join request:', { ...data, groupId });
      
      setStatus('success');
      onSuccess?.();
      
      // Reset form after delay
      setTimeout(() => {
        reset();
        setStatus('idle');
      }, 4000);
    } catch (error) {
      console.error('Error joining group:', error);
      setStatus('error');
      setErrorMessage(MINISTRIES_FALLBACKS.errorMessage);
    }
  };

  const handleRetry = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  // Success state
  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircleIcon className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {MINISTRIES_FALLBACKS.thankYou.replace('{ministryName}', groupName)}
        </h3>
        <p className="text-gray-600 mb-2">
          {MINISTRIES_FALLBACKS.successMessage.replace('{ministryName}', groupName)}
        </p>
        <p className="text-sm text-gray-500 mb-6">
          A group leader will contact you within 2-3 business days.
        </p>
        <button
          onClick={() => {
            reset();
            setStatus('idle');
          }}
          className="text-teal-600 font-semibold hover:text-teal-700 transition-colors"
        >
          Join Another Group
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
          {MINISTRIES_FALLBACKS.submissionFailed}
        </h3>
        <p className="text-gray-600 mb-6">{errorMessage}</p>
        <button
          onClick={handleRetry}
          className="px-6 py-2 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors"
        >
          {MINISTRIES_FALLBACKS.tryAgain}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Group Info Banner */}
      <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 flex items-start gap-3">
        <UserGroupIcon className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-teal-900">Join {groupName}</p>
          <p className="text-sm text-teal-700">
            Fill out this form to connect with a group leader and get started.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1.5">
            {MINISTRIES_FALLBACKS.fullName} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              {...register('fullName')}
              type="text"
              id="fullName"
              disabled={status === 'submitting'}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                errors.fullName 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                  : 'border-gray-300 focus:border-teal-500 focus:ring-teal-200'
              } focus:ring-2 focus:ring-opacity-50 outline-none transition-all disabled:bg-gray-50`}
              placeholder="Your full name"
            />
          </div>
          {errors.fullName && (
            <p className="mt-1.5 text-sm text-red-600">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            {MINISTRIES_FALLBACKS.email} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              {...register('email')}
              type="email"
              id="email"
              disabled={status === 'submitting'}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                errors.email 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                  : 'border-gray-300 focus:border-teal-500 focus:ring-teal-200'
              } focus:ring-2 focus:ring-opacity-50 outline-none transition-all disabled:bg-gray-50`}
              placeholder="your@email.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
          {MINISTRIES_FALLBACKS.phone} <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            {...register('phone')}
            type="tel"
            id="phone"
            disabled={status === 'submitting'}
            className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
              errors.phone 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                : 'border-gray-300 focus:border-teal-500 focus:ring-teal-200'
            } focus:ring-2 focus:ring-opacity-50 outline-none transition-all disabled:bg-gray-50`}
            placeholder="+233 XX XXX XXXX"
          />
        </div>
        {errors.phone && (
          <p className="mt-1.5 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {/* Age Group */}
      <div>
        <label htmlFor="ageGroup" className="block text-sm font-medium text-gray-700 mb-1.5">
          {MINISTRIES_FALLBACKS.ageGroup} <span className="text-red-500">*</span>
        </label>
        <select
          {...register('ageGroup')}
          id="ageGroup"
          disabled={status === 'submitting'}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.ageGroup 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
              : 'border-gray-300 focus:border-teal-500 focus:ring-teal-200'
          } focus:ring-2 focus:ring-opacity-50 outline-none transition-all disabled:bg-gray-50 bg-white`}
        >
          <option value="">Select your age group...</option>
          {ageGroups.map((group) => (
            <option key={group.value} value={group.value}>
              {group.label}
            </option>
          ))}
        </select>
        {errors.ageGroup && (
          <p className="mt-1.5 text-sm text-red-600">{errors.ageGroup.message}</p>
        )}
      </div>

      {/* Preferred Contact Method */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Contact Method
        </label>
        <div className="flex flex-wrap gap-3">
          {[
            { value: 'email', label: 'Email', icon: EnvelopeIcon },
            { value: 'phone', label: 'Phone Call', icon: PhoneIcon },
            { value: 'whatsapp', label: 'WhatsApp', icon: ChatBubbleLeftRightIcon },
          ].map((option) => {
            const Icon = option.icon;
            const isSelected = watch('preferredContact') === option.value;
            return (
              <label
                key={option.value}
                className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg cursor-pointer transition-all ${
                  isSelected
                    ? 'border-teal-500 bg-teal-50 text-teal-900'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <input
                  type="radio"
                  {...register('preferredContact')}
                  value={option.value}
                  className="sr-only"
                />
                <Icon className={`w-4 h-4 ${isSelected ? 'text-teal-600' : 'text-gray-400'}`} />
                <span className="text-sm font-medium">{option.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Availability */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Availability <span className="text-red-500">*</span>
          <span className="text-gray-400 font-normal ml-1">(Select all that apply)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {availabilityOptions.map((day) => {
            const isSelected = selectedAvailability.includes(day.value);
            return (
              <button
                key={day.value}
                type="button"
                onClick={() => toggleAvailability(day.value)}
                disabled={status === 'submitting'}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } disabled:opacity-50`}
              >
                {day.label}
              </button>
            );
          })}
        </div>
        {errors.availability && (
          <p className="mt-1.5 text-sm text-red-600">{errors.availability.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
          {MINISTRIES_FALLBACKS.message}
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={3}
          disabled={status === 'submitting'}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:ring-opacity-50 outline-none transition-all resize-none disabled:bg-gray-50"
          placeholder="Tell us a bit about yourself and what you're looking for in a group..."
        />
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
            {MINISTRIES_FALLBACKS.submitting}
          </>
        ) : (
          <>
            <UserGroupIcon className="w-5 h-5" />
            {MINISTRIES_FALLBACKS.joinMinistryButton}
          </>
        )}
      </button>
    </form>
  );
};

export default GroupJoinForm;
