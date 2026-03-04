'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [isSending, setIsSending] = useState(false)

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value })

  const sendEmail = (e: any) => {
    e.preventDefault()
    setIsSending(true)
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form, 'YOUR_PUBLIC_KEY')
      .then(() => alert('Message sent successfully!'))
      .catch(() => alert('Error sending message. Please try again.'))
      .finally(() => setIsSending(false))
  }

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-inter text-foreground">Contact Us</h2>
        </div>
        <form onSubmit={sendEmail} className="max-w-md mx-auto">
          <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            value={form.name} 
            onChange={handleChange} 
            required 
            className="w-full mb-4 p-2 border border-border rounded" 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={form.email} 
            onChange={handleChange} 
            required 
            className="w-full mb-4 p-2 border border-border rounded" 
          />
          <textarea 
            name="message" 
            placeholder="Message" 
            value={form.message} 
            onChange={handleChange} 
            required 
            className="w-full mb-4 p-2 border border-border rounded" 
            rows={5} 
          />
          <button 
            type="submit" 
            disabled={isSending} 
            className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition-colors" 
          >
            {isSending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default ContactForm
