export default function NewHere() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to ThaGospel Church</h1>
          <p className="text-xl">We're glad you're here! Discover what to expect and how to get connected.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* What to Expect */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">What to Expect</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🙏</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Worship Service</h3>
              <p>Experience uplifting worship with contemporary music, powerful preaching, and a welcoming atmosphere.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Friendly Community</h3>
              <p>Join a community of believers who care about each other and support one another in faith.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Bible Teaching</h3>
              <p>Learn from the Word of God through relevant, life-changing messages and Bible studies.</p>
            </div>
          </div>
        </section>

        {/* How to Get Connected */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-center">How to Get Connected</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Visit Us</h3>
              <p className="mb-4">Join us for our Sunday worship service at 10 AM. Our services are held at [Church Address].</p>
              <p>Parking is available, and our greeters will help you find your way.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Connect with Us</h3>
              <ul className="space-y-2">
                <li>• Fill out our visitor card during service</li>
                <li>• Join us for fellowship after service</li>
                <li>• Sign up for our email newsletter</li>
                <li>• Follow us on social media</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-2">What should I wear?</h3>
              <p>Casual attire is perfectly fine. Come as you are!</p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-2">Are children welcome?</h3>
              <p>Absolutely! We have programs for all ages and love having families worship together.</p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-2">How long is the service?</h3>
              <p>Our Sunday services typically last about 90 minutes.</p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-2">Can I participate if I'm not a member?</h3>
              <p>Yes! Everyone is welcome to participate in our services and activities.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-green-600 text-white p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Visit?</h2>
          <p className="text-lg mb-6">
            We can't wait to meet you and welcome you into our church family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/overview" className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Learn More About Us
            </a>
            <a href="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
