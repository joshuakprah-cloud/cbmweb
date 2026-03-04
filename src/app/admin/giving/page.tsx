'use client'

import { useState, useEffect } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Footer from '../../../components/Footer'

interface Transaction {
  _id: string
  donorName: string
  email: string
  amount: number
  givingType: { title: string }
  paymentGateway: string
  status: string
  createdAt: string
}

export default function GivingDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/giving/transactions')
      .then(res => res.json())
      .then(data => {
        setTransactions(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  // Calculations
  const totalGiven = transactions.reduce((sum, t) => sum + t.amount, 0)
  const thisMonth = new Date().getMonth()
  const thisYear = new Date().getFullYear()
  const thisMonthGiven = transactions
    .filter(t => {
      const date = new Date(t.createdAt)
      return date.getMonth() === thisMonth && date.getFullYear() === thisYear
    })
    .reduce((sum, t) => sum + t.amount, 0)
  const averageGift = transactions.length > 0 ? totalGiven / transactions.length : 0
  const totalTransactions = transactions.length

  // Breakdown by type
  const typeBreakdown = transactions.reduce((acc, t) => {
    const type = t.givingType.title
    acc[type] = (acc[type] || 0) + t.amount
    return acc
  }, {} as Record<string, number>)

  const maxType = Math.max(...Object.values(typeBreakdown))

  // Monthly trend (last 12 months)
  const monthlyTrend = transactions.reduce((acc, t) => {
    const date = new Date(t.createdAt)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    acc[key] = (acc[key] || 0) + t.amount
    return acc
  }, {} as Record<string, number>)

  const last12Months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    return { month: date.toLocaleString('default', { month: 'short' }), amount: monthlyTrend[key] || 0 }
  }).reverse()

  const maxTrend = Math.max(...last12Months.map(m => m.amount))

  return (
    <div>
      <Navbar />
      <main className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 font-inter text-navy">Giving Dashboard</h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-navy text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Total Given</h3>
              <p className="text-3xl font-bold">₦{totalGiven.toLocaleString()}</p>
            </div>
            <div className="bg-gold text-navy p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">This Month</h3>
              <p className="text-3xl font-bold">₦{thisMonthGiven.toLocaleString()}</p>
            </div>
            <div className="bg-green-600 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Average Gift</h3>
              <p className="text-3xl font-bold">₦{Math.round(averageGift).toLocaleString()}</p>
            </div>
            <div className="bg-gray-600 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Total Transactions</h3>
              <p className="text-3xl font-bold">{totalTransactions}</p>
            </div>
          </div>

          {/* Giving Breakdown */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-navy">Giving Breakdown</h2>
            <div className="space-y-4">
              {Object.entries(typeBreakdown).map(([type, amount]) => (
                <div key={type} className="flex items-center">
                  <div className="w-32 text-sm">{type}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4 mx-4">
                    <div
                      className="bg-gold h-4 rounded-full"
                      style={{ width: `${(amount / maxType) * 100}%` }}
                    ></div>
                  </div>
                  <div className="w-24 text-right text-sm">₦{amount.toLocaleString()}</div>
                  <div className="w-16 text-right text-sm">{((amount / totalGiven) * 100).toFixed(1)}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-navy">Monthly Trend</h2>
            <div className="flex items-end space-x-2 h-32">
              {last12Months.map((month, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div
                    className="bg-blue-500 w-full rounded-t"
                    style={{ height: `${maxTrend > 0 ? (month.amount / maxTrend) * 100 : 0}%` }}
                  ></div>
                  <div className="text-xs mt-1">{month.month}</div>
                  <div className="text-xs">₦{month.amount.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Transactions Table */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-navy">Recent Transactions</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">Donor</th>
                    <th className="border border-gray-300 p-2 text-left">Amount</th>
                    <th className="border border-gray-300 p-2 text-left">Type</th>
                    <th className="border border-gray-300 p-2 text-left">Gateway</th>
                    <th className="border border-gray-300 p-2 text-left">Status</th>
                    <th className="border border-gray-300 p-2 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 50).map((t) => (
                    <tr key={t._id}>
                      <td className="border border-gray-300 p-2">{t.donorName}</td>
                      <td className="border border-gray-300 p-2">₦{t.amount.toLocaleString()}</td>
                      <td className="border border-gray-300 p-2">{t.givingType.title}</td>
                      <td className="border border-gray-300 p-2">{t.paymentGateway}</td>
                      <td className="border border-gray-300 p-2">{t.status}</td>
                      <td className="border border-gray-300 p-2">{new Date(t.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
