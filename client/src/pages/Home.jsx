import { Link } from 'react-router-dom';
import { FaCar, FaCheckCircle, FaClock, FaShieldAlt, FaArrowRight, FaUserCircle, FaHandPaper } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import FAQ from '../components/FAQ';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white py-20 overflow-hidden min-h-[600px]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1920&auto=format&fit=crop')",
          }}
        >
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute transform rotate-45 -top-20 -right-20 w-96 h-96 bg-white rounded-full"></div>
          <div className="absolute transform -rotate-45 -bottom-20 -left-20 w-96 h-96 bg-white rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fade-in">
            {/* Personalized Welcome Message for Logged-in Users */}
            {user && (
              <div className="mb-6 animate-fade-in">
                <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                  <FaUserCircle className="text-3xl text-accent-300" />
                  <div className="text-left">
                    <p className="text-sm text-gray-200">Welcome back,</p>
                    <p className="text-xl font-bold text-white flex items-center gap-2">
                      <span>{user.name}!</span>
                      <FaHandPaper className="text-accent-300" />
                    </p>
                  </div>
                </div>
              </div>
            )}

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-shadow leading-tight">
              Rent Your Perfect Vehicle
              <span className="block text-accent-300 mt-2">Across India</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-3xl mx-auto leading-relaxed">
              From cars to buses, find and book your ideal vehicle instantly. Experience seamless rentals with real-time availability across India.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/cars"
                className="bg-white text-primary-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2"
              >
                <span>Browse Vehicles</span>
                <FaArrowRight />
              </Link>
              {!user && (
                <Link
                  to="/register"
                  className="bg-accent-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent-600 transition-all shadow-xl hover:shadow-2xl"
                >
                  Get Started
                </Link>
              )}
              {user && (
                <Link
                  to="/dashboard"
                  className="bg-accent-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent-600 transition-all shadow-xl hover:shadow-2xl"
                >
                  My Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose <span className="text-primary-600">Car Yatra</span>?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-xl shadow-lg card-hover text-center">
              <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Real-Time Updates</h3>
              <p className="text-gray-600">
                See live car availability with WebSocket technology. No more outdated listings!
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-accent-50 to-accent-100 p-8 rounded-xl shadow-lg card-hover text-center">
              <div className="bg-accent-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Easy Booking</h3>
              <p className="text-gray-600">
                Simple, streamlined booking process with secure PayPal payment integration.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-lg card-hover text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Secure & Reliable</h3>
              <p className="text-gray-600">
                Your data is protected with industry-standard security and encryption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Register', desc: 'Create your free account' },
              { step: '2', title: 'Browse', desc: 'Filter and find your car' },
              { step: '3', title: 'Book', desc: 'Select dates and location' },
              { step: '4', title: 'Drive', desc: 'Pick up and enjoy!' },
            ].map((item, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="bg-gradient-to-br from-primary-600 to-primary-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <section className="w-full py-16 bg-gradient-to-r from-primary-700 to-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaCar className="text-6xl mx-auto mb-6 animate-pulse-slow" />
          <h2 className="text-4xl font-bold mb-4">Ready to Hit the Road?</h2>
          <p className="text-xl mb-8 text-gray-100">
            Join thousands of satisfied customers and rent your perfect car today!
          </p>
          <Link
            to="/cars"
            className="bg-white text-primary-700 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl inline-flex items-center space-x-2"
          >
            <span>Start Browsing</span>
            <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

