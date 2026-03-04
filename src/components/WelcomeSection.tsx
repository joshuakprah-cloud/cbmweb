import { urlFor } from '../../sanity/lib/image'

const WelcomeSection = ({ pastor, heading }: { pastor: { name: string, bio: string, photo: any }, heading: string }) => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-inter text-foreground">
            Welcome to ThaGospel Church
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
          <div className="text-center">
            <p className="text-muted-foreground leading-relaxed mt-4 max-w-2xl mx-auto">
              We are delighted to welcome you to ThaGospel Church, where faith comes alive and 
              lives are transformed through the power of God's word. Our church is a vibrant 
              community of believers committed to spreading the gospel, nurturing spiritual growth, 
              and making a positive impact in our community and beyond. Whether you are new to faith or seeking to deepen your relationship with God, 
              you'll find a warm, welcoming family here. Join us as we worship, learn, and 
              serve together in unity and love.
            </p>
            <p className="text-center text-base font-bold text-foreground mb-4 mt-6">
              Prophet Powerman & Prophetess Tracy Bekoe
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors" aria-label="X (Twitter)">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="flex justify-start">
            <div className="relative ml-[-2rem]">
              <div className="w-48 h-64 md:w-56 md:h-72 overflow-hidden border-4 border-purple-200 shadow-xl">
                <img src={pastor.photo ? urlFor(pastor.photo).url() : 'https://via.placeholder.com/300x400?text=No+Photo'} alt={pastor.name} className="w-full h-full object-cover"/>
              </div>
              <div className="absolute inset-0 rounded-full bg-purple-400 opacity-10 blur-xl -z-10"></div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
