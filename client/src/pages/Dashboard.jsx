import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { bookingsAPI } from '../services/api';
import { FaUser, FaEnvelope, FaPhone, FaCar, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const response = await bookingsAPI.getUserBookings(user._id);
      setBookings(response.data.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      active: 'bg-blue-100 text-blue-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Dashboard</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Profile Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaUser className="text-primary-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-semibold">{user?.name}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-primary-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FaPhone className="text-primary-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-semibold">{user?.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-600 to-primary-500 rounded-xl shadow-lg p-6 mt-6 text-white">
              <h3 className="text-lg font-bold mb-2">Total Bookings</h3>
              <p className="text-4xl font-extrabold">{bookings.length}</p>
            </div>
          </div>

          {/* Bookings Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">My Bookings</h2>

              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="spinner"></div>
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-12">
                  <FaCar className="text-6xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">No bookings yet</p>
                  <p className="text-gray-500 mt-2">Start browsing cars to make your first booking!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-4">
                          <img
                            src={booking.car.images[0]}
                            alt={`${booking.car.brand} ${booking.car.model}`}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div>
                            <h3 className="font-bold text-lg">
                              {booking.car.brand} {booking.car.model}
                            </h3>
                            <p className="text-sm text-gray-600">{booking.car.type}</p>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <FaCalendar className="text-primary-500" />
                          <span>
                            {new Date(booking.startDate).toLocaleDateString()} -{' '}
                            {new Date(booking.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <FaMapMarkerAlt className="text-primary-500" />
                          <span>{booking.pickupLocation}</span>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t flex items-center justify-between">
                        <span className="text-gray-600">Total Amount</span>
                        <span className="text-xl font-bold text-primary-600">
                          ₹{booking.totalPrice}
                        </span>
                      </div>

                      <div className="mt-2 text-xs text-gray-500">
                        Payment: {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
