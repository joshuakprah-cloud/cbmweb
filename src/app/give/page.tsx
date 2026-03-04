'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/Footer'

interface GivingType {
  _id: string
  title: string
  description: string
  suggestedAmounts: number[]
}

interface DonationForm {
  name: string
  email: string
  amount: number
  paymentMethod: 'Paystack' | 'Stripe'
}

export default function Give() {
  const [givingTypes, setGivingTypes] = useState<GivingType[]>([])
  const [selectedType, setSelectedType] = useState<GivingType | null>(null)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<DonationForm>()

  const watchedAmount = watch('amount')

  useEffect(() => {
    // Fetch active giving types
    fetch('/api/giving-types')
      .then(res => res.json())
      .then(data => setGivingTypes(data))
  }, [])

  const onSubmit = async (data: DonationForm) => {
    if (!selectedType) return

    setLoading(true)
    try {
      const response = await fetch('/api/give', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, givingTypeId: selectedType._id }),
      })
      const result = await response.json()
      if (result.url) {
        window.location.href = result.url
      } else if (result.sessionId) {
        // For Stripe, redirect to checkout
        window.location.href = `https://checkout.stripe.com/pay/${result.sessionId}`
      }
    } catch (error) {
      alert('Error processing donation')
    }
    setLoading(false)
  }

  return (
    <div>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-navy text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-inter">Give</h1>
            <p className="text-xl font-inter">Support the mission of ThaGospel Church</p>
          </div>
        </section>

        {/* Giving Type Selector */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 font-inter text-navy">Choose How to Give</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {givingTypes.map(type => (
                <div key={type._id} className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2 text-navy">{type.title}</h3>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <button
                    onClick={() => setSelectedType(type)}
                    className="bg-gold text-navy px-4 py-2 rounded hover:bg-opacity-80"
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Donation Form */}
        {selectedType && (
          <section className="py-16 bg-neutral">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8 font-inter text-navy">Make Your Donation</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                      required
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      {...register('email', { required: 'Email is required' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                      required
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount (NGN)</label>
                  <input
                    type="number"
                    {...register('amount', { required: 'Amount is required', min: 1 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    required
                  />
                  {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedType.suggestedAmounts.map(amount => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setValue('amount', amount)}
                        className={`px-3 py-1 rounded border ${watchedAmount === amount ? 'bg-gold text-navy border-gold' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                      >
                        {amount}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="Paystack"
                        {...register('paymentMethod', { required: 'Payment method is required' })}
                        className="mr-2"
                      />
                      Paystack
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="Stripe"
                        {...register('paymentMethod', { required: 'Payment method is required' })}
                        className="mr-2"
                      />
                      Stripe
                    </label>
                  </div>
                  {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-inter hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Proceed to Payment'}
                </button>
              </form>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
