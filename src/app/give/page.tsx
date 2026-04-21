'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

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
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center overflow-hidden bg-[#0B1F3A]">
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight drop-shadow-lg">
            Give
          </h1>
          <p className="mt-6 text-xl text-white/90 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            Support the mission of ThaGospel Church
          </p>
        </div>
      </section>

        {/* Giving Type Selector */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#0d9488] text-sm font-semibold tracking-[0.15em] uppercase">Ways to Give</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] mt-3">Choose How to Give</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {givingTypes.map(type => (
                <div key={type._id} className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-[#0d9488] hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-2 text-[#0B1F3A]">{type.title}</h3>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <button
                    onClick={() => setSelectedType(type)}
                    className="bg-[#0d9488] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#0f766e] transition-colors"
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
          <section className="py-20 bg-[#F8F9FB] border-t border-gray-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="text-[#0d9488] text-sm font-semibold tracking-[0.15em] uppercase">Complete Your Gift</span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] mt-3">Make Your Donation</h2>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
                      required
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
                    required
                  />
                  {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedType.suggestedAmounts.map(amount => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setValue('amount', amount)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${watchedAmount === amount ? 'bg-[#0d9488] text-white border-[#0d9488]' : 'bg-white text-gray-700 border-gray-200 hover:border-[#0d9488]'}`}
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
                  className="w-full bg-[#0d9488] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#0f766e] transition-colors disabled:opacity-50 shadow-lg hover:shadow-xl"
                >
                  {loading ? 'Processing...' : 'Proceed to Payment'}
                </button>
              </form>
            </div>
          </section>
        )}
    </main>
  )
}
