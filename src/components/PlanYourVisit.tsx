interface PlanYourVisitProps {
  visitInfo?: {
    address?: string
    services?: string
    parking?: string
    greeters?: string
  }
}

export default function PlanYourVisit({ visitInfo }: PlanYourVisitProps) {
  // Default visit information
  const defaultInfo = {
    address: "ThaGospel Church, Accra, Ghana",
    services: "Sundays: 7:30 AM & 10:30 AM",
    parking: "Available on-site parking",
    greeters: "Friendly welcome team at entrance"
  }

  const info = visitInfo || defaultInfo

  return (
    <section className="bg-blue-50 dark:bg-blue-900/20 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Plan Your Visit</h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Visit Information */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">📍 Address</h3>
              <p className="text-gray-700 dark:text-gray-300">{info.address}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">⏰ Service Times</h3>
              <p className="text-gray-700 dark:text-gray-300">{info.services}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">🚗 Parking</h3>
              <p className="text-gray-700 dark:text-gray-300">{info.parking}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">👋 Welcome Team</h3>
              <p className="text-gray-700 dark:text-gray-300">{info.greeters}</p>
            </div>
          </div>

          {/* Map and Visitor Form Placeholder */}
          <div className="space-y-6">
            {/* Google Map Placeholder */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">🗺️ Location</h3>
              <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-600 dark:text-gray-400">Interactive Map</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Click for directions</p>
                </div>
              </div>
              <button className="w-full mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Get Directions
              </button>
            </div>

            {/* Visitor Form Placeholder */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">📝 Let Us Know You're Coming</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of People</label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                    <option>Just me</option>
                    <option>2 people</option>
                    <option>3 people</option>
                    <option>4+ people</option>
                  </select>
                </div>
                <button className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Submit
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                We'll follow up with more details about your visit
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
