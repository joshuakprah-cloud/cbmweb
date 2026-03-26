'use client';

import { useState } from 'react';
import EventPageContent from './EventPageContent';

export default function EventPageWrapper({ params }: { params: { slug: string } }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    attendees: '1'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  return (
    <EventPageContent 
      params={params}
      formData={formData}
      setFormData={setFormData}
      isSubmitting={isSubmitting}
      setIsSubmitting={setIsSubmitting}
      submitMessage={submitMessage}
      setSubmitMessage={setSubmitMessage}
    />
  );
}
