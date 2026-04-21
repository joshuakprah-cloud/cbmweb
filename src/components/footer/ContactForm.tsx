'use client';

import { useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    
    // Reset success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div>
      <h3 className="text-white font-semibold text-[15px] mb-4">Write to Us</h3>
      
      {submitted ? (
        <div className="p-4 rounded-lg bg-[#0d9488]/20 border border-[#0d9488]/30">
          <p className="text-[14px] text-[#2dd4bf]">Message sent successfully!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name and Email row */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="name"
              placeholder="Your full Name here"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 rounded bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-[14px] focus:outline-none focus:border-[#2dd4bf] transition-colors"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email here"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 rounded bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-[14px] focus:outline-none focus:border-[#2dd4bf] transition-colors"
            />
          </div>
          
          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number here"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2.5 rounded bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-[14px] focus:outline-none focus:border-[#2dd4bf] transition-colors"
          />
          
          {/* Message */}
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2.5 rounded bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-[14px] focus:outline-none focus:border-[#2dd4bf] transition-colors resize-none"
          />
          
          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded bg-[#dc2626] hover:bg-[#b91c1c] text-white font-medium text-[14px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'SUBMIT'}
          </button>
        </form>
      )}
    </div>
  );
}
