import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBars, FaCar, FaTimes, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaTools } from 'react-icons/fa';
import { useState } from 'react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-primary-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center min-h-16 py-3 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <FaCar className="text-white text-3xl group-hover:scale-105 transition-transform" />
            <span className="text-white font-bold text-2xl hidden sm:block">
              Car<span className="text-accent-300">Yatra</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              to="/"
              className="text-white hover:text-accent-200 font-semibold text-sm lg:text-base transition-colors"
            >
              Home
            </Link>
            <Link
              to="/cars"
              className="text-white hover:text-accent-200 font-semibold text-sm lg:text-base transition-colors"
            >
              Browse Vehicles
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-accent-200 font-semibold text-sm lg:text-base transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-accent-200 font-semibold text-sm lg:text-base transition-colors"
            >
              About Us
            </Link>

            {isAuthenticated && user?.role === 'admin' && (
              <Link
                to="/admin"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold text-sm lg:text-base transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
              >
                <FaTools />
                <span>Admin Panel</span>
              </Link>
            )}

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-white hover:text-accent-200 font-semibold text-sm lg:text-base transition-colors flex items-center space-x-2 max-w-40"
                >
                  <FaUser className="text-lg" />
                  <span className="truncate">{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-sm lg:text-base flex items-center space-x-2 transition-all shadow-md hover:shadow-lg"
                >
                  <FaSignOutAlt className="text-lg" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-white text-primary-700 hover:bg-gray-100 px-4 py-2 rounded-lg font-semibold text-sm lg:text-base flex items-center space-x-2 transition-all shadow-md hover:shadow-lg"
                >
                  <FaSignInAlt className="text-lg" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg font-semibold text-sm lg:text-base flex items-center space-x-2 transition-all shadow-md hover:shadow-lg"
                >
                  <FaUserPlus className="text-lg" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white focus:outline-none p-2 rounded-lg"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-5 animate-slide-up">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-accent-200 font-semibold text-lg transition-colors py-2"
              >
                Home
              </Link>
              <Link
                to="/cars"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-accent-200 font-semibold text-lg transition-colors py-2"
              >
                Browse Vehicles
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-accent-200 font-semibold text-lg transition-colors py-2"
              >
                Contact Us
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-accent-200 font-semibold text-lg transition-colors py-2"
              >
                About Us
              </Link>

              {isAuthenticated && user?.role === 'admin' && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all inline-flex items-center justify-center gap-2"
                >
                  <FaTools />
                  <span>Admin Panel</span>
                </Link>
              )}

              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white hover:text-accent-200 font-semibold text-lg transition-colors py-2 flex items-center space-x-2"
                  >
                    <FaUser className="text-lg" />
                    <span>{user?.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold text-lg flex items-center space-x-2 transition-all w-full justify-center"
                  >
                    <FaSignOutAlt className="text-lg" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-white text-primary-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold text-lg flex items-center space-x-2 transition-all justify-center"
                  >
                    <FaSignInAlt className="text-lg" />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold text-lg flex items-center space-x-2 transition-all justify-center"
                  >
                    <FaUserPlus className="text-lg" />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
