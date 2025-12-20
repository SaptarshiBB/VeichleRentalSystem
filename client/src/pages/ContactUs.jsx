import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaQuestionCircle } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            Have questions? We're here to help!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 rounded-full p-3">
                  <FaEnvelope className="text-primary-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <a href="mailto:saptarshi.support@caryatra.com" className="text-primary-600 hover:text-primary-700">
                    saptarshi.support@caryatra.com
                  </a>
                  <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-full p-3">
                  <FaPhone className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <a href="tel:+919876543210" className="text-primary-600 hover:text-primary-700">
                    +91 98765 43210
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Mon-Sat, 9:00 AM - 6:00 PM IST</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 rounded-full p-3">
                  <FaMapMarkerAlt className="text-purple-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Office Address</h3>
                  <p className="text-gray-600">
                    CarYatra Headquarters<br />
                    123 MG Road, Bangalore<br />
                    Karnataka 560001, India
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 rounded-full p-3">
                  <FaClock className="text-orange-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 7:00 PM<br />
                    Saturday: 10:00 AM - 5:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Person */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Contact Person</h3>
              <p className="text-gray-600">
                <span className="font-medium">Saptarshi Banerjee</span><br />
                Customer Support Manager<br />
                Direct: +91 98765 43210
              </p>
            </div>
          </div>

          {/* Guidelines & FAQ */}
          <div className="space-y-6">
            {/* Guidelines */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <FaQuestionCircle className="text-primary-600 text-2xl mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Guidelines</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">📋 Booking Inquiries</h3>
                  <p className="text-gray-600 text-sm">
                    For booking-related questions, please include your booking ID and registered email address.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">💳 Payment Issues</h3>
                  <p className="text-gray-600 text-sm">
                    If you face payment problems, contact us with your transaction ID and screenshot of the error.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🚗 Vehicle Availability</h3>
                  <p className="text-gray-600 text-sm">
                    Check real-time availability on our website. For bulk bookings (5+ vehicles), contact us directly.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🔄 Cancellations & Refunds</h3>
                  <p className="text-gray-600 text-sm">
                    Cancellations made 48 hours before pickup are eligible for full refund. Contact support for assistance.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">📞 Emergency Support</h3>
                  <p className="text-gray-600 text-sm">
                    For urgent issues during your rental period, call our 24/7 emergency helpline: +91 98765 43210
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Quick Tips</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Have your booking details ready when contacting support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Check our FAQ section before reaching out</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Email is best for non-urgent inquiries</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Call for immediate assistance during business hours</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
