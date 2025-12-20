import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookingsAPI } from '../services/api';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Payment = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  useEffect(() => {
    fetchBooking();
  }, [bookingId]);

  const fetchBooking = async () => {
    try {
      const response = await bookingsAPI.getBookingById(bookingId);
      setBooking(response.data.data);
    } catch (err) {
      setPaymentError('Failed to load booking details');
    } finally {
      setLoading(false);
    }
  };

  const handleMockPayment = async () => {
    setPaymentProcessing(true);
    setPaymentError('');

    // Simulate payment processing (2 seconds)
    setTimeout(async () => {
      try {
        // Update booking status to confirmed
        await bookingsAPI.updateBooking(bookingId, {
          status: 'confirmed',
          paymentStatus: 'completed'
        });

        setPaymentSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } catch (error) {
        console.error('Error updating booking:', error);
        setPaymentError('Failed to confirm booking');
        setPaymentProcessing(false);
      }
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Booking not found</p>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="bg-white rounded-xl shadow-2xl p-12 text-center max-w-md animate-fade-in">
          <div className="mb-6">
            <FaCheckCircle className="text-green-500 text-7xl mx-auto animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-2">
            Your booking has been confirmed.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Booking ID: #{booking._id.slice(-8).toUpperCase()}
          </p>
          <div className="flex items-center justify-center space-x-2 text-primary-600">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
            <span>Redirecting to dashboard...</span>
          </div>
        </div>
      </div>
    );
  }

  // Generate UPI payment URL for QR code
  const upiUrl = `upi://pay?pa=caryatra@razorpay&pn=CarYatra&am=${booking.totalPrice}&cu=INR&tn=Booking%20${booking._id.slice(-8)}`;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Complete Payment</h1>
        <p className="text-gray-600 mb-8">Secure payment powered by Razorpay</p>

        {paymentError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6 flex items-center">
            <FaTimesCircle className="text-2xl mr-3" />
            <span>{paymentError}</span>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Booking Summary */}
          <div className="space-y-6">
            {/* Car Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Summary</h2>
              
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={booking.car.images[0]}
                  alt={`${booking.car.brand} ${booking.car.model}`}
                  className="w-24 h-24 object-cover rounded-lg shadow"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {booking.car.brand} {booking.car.model}
                  </h3>
                  <p className="text-sm text-gray-600">{booking.car.type} • {booking.car.year}</p>
                  <p className="text-sm text-gray-600">{booking.car.location}</p>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pickup:</span>
                  <span className="font-semibold">{new Date(booking.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Return:</span>
                  <span className="font-semibold">{new Date(booking.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold">{booking.totalDays} Days</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-gray-600">Rate per day:</span>
                  <span className="font-semibold">₹{booking.car.pricePerDay}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-primary-600 pt-2 border-t">
                  <span>Total Amount:</span>
                  <span>₹{booking.totalPrice}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Payment Section */}
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mb-4">
                <span className="text-3xl">💳</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Razorpay Payment</h2>
              <p className="text-gray-600 text-sm">Scan QR code or click Pay Now</p>
            </div>

            {/* Mock QR Code */}
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl p-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-inner">
                <div className="w-48 h-48 mx-auto bg-white border-4 border-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* QR Code Pattern (Mock) */}
                  <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1 p-2">
                    {[...Array(64)].map((_, i) => (
                      <div
                        key={i}
                        className={`${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} rounded-sm`}
                      ></div>
                    ))}
                  </div>
                  {/* Center Logo */}
                  <div className="relative z-10 bg-white p-2 rounded">
                    <span className="text-2xl">🚗</span>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 mt-4">
                  Scan with any UPI app to pay
                </p>
              </div>

              {/* Amount Display */}
              <div className="bg-white rounded-lg p-4 mt-4 text-center">
                <p className="text-sm text-gray-600">Amount to Pay</p>
                <p className="text-3xl font-bold text-primary-600">₹{booking.totalPrice}</p>
              </div>
            </div>

            {/* UPI ID */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">UPI ID:</p>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value="caryatra@razorpay"
                  readOnly
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg font-mono text-sm"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('caryatra@razorpay');
                    alert('UPI ID copied!');
                  }}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all text-sm"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Pay Now Button */}
            <button
              onClick={handleMockPayment}
              disabled={paymentProcessing}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all transform ${
                paymentProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:shadow-xl hover:scale-105'
              } text-white`}
            >
              {paymentProcessing ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing Payment...</span>
                </span>
              ) : (
                '💰 Pay Now'
              )}
            </button>

            <p className="text-xs text-center text-gray-500 mt-4">
              🔒 This is a demo payment. No real money will be charged.
            </p>

            {/* Supported Apps */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-600 mb-2">Supported UPI Apps:</p>
              <div className="flex justify-center space-x-3">
                <span className="text-2xl" title="Google Pay">📱</span>
                <span className="text-2xl" title="PhonePe">💜</span>
                <span className="text-2xl" title="Paytm">💙</span>
                <span className="text-2xl" title="BHIM">🇮🇳</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
