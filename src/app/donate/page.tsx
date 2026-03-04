'use client'

import { useState } from 'react'

const Donate = () => {
  const [amount, setAmount] = useState('')
  const [email, setEmail] = useState('')
  const [isRecurring, setIsRecurring] = useState(false)
  const [category, setCategory] = useState('')

  const presetAmounts = [10, 25, 50, 100]

  const categories = [
    { value: 'tithe', label: 'Tithe' },
    { value: 'offering', label: 'Offering' },
    { value: 'missions', label: 'Missions' },
    { value: 'building_fund', label: 'Building Fund' },
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      amount: 'GHS 50',
      impact: 'Helped fund our community outreach program that reached 200 families.',
      category: 'Missions'
    },
    {
      name: 'Michael Brown',
      amount: 'GHS 100',
      impact: 'Contributed to our new building fund, expanding our worship space.',
      category: 'Building Fund'
    },
    {
      name: 'Emily Davis',
      amount: 'GHS 25',
      impact: 'Supported weekly offerings that maintain our church operations.',
      category: 'Offering'
    }
  ]

  const payWithPaystack = () => {
    const handler = (window as any).PaystackPop.setup({
      key: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxx', // Replace with your Paystack public key
      email: email,
      amount: parseInt(amount) * 100, // Amount in pesewas (GHS)
      currency: 'GHS',
      ref: '' + Math.floor((Math.random() * 1000000000) + 1),
      metadata: {
        category: category,
        isRecurring: isRecurring,
      },
      callback: function(response: any) {
        alert('Payment successful! Reference: ' + response.reference)
        // You can redirect or update state here
      },
      onClose: function() {
        alert('Transaction was not completed, window closed.')
      },
    })
    handler.openIframe()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Give to ThaGospel Church</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your generous giving supports our ministry, outreach, and community programs. 
            Every contribution makes a difference in spreading God's word and helping those in need.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Choose Your Gift Amount</h2>
            
            {/* Preset Amounts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt.toString())}
                  className={`py-4 px-6 rounded-lg border-2 font-semibold transition-all ${
                    amount === amt.toString()
                      ? 'border-purple-600 bg-purple-600 text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-purple-400'
                  }`}
                >
                  GHS {amt}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Or Enter Custom Amount</label>
              <input
                type="number"
                placeholder="Enter amount in GHS"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                min="1"
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Giving Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Recurring Option */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">Donation Frequency</label>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setIsRecurring(false)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    !isRecurring
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  One-time
                </button>
                <button
                  type="button"
                  onClick={() => setIsRecurring(true)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    isRecurring
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            {/* Donate Button */}
            <button
              onClick={payWithPaystack}
              className="w-full bg-purple-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!amount || !email || !category}
            >
              {isRecurring ? 'Start Monthly Giving' : 'Give Now'}
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              All donations are processed securely through Paystack. 
              Your information is protected and your generosity is greatly appreciated.
            </p>
          </div>
        </div>

        {/* Donation Impact Testimonials */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Giving Makes a Difference</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how your generous contributions are transforming lives and supporting our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.category} • {testimonial.amount}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.impact}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Donate
