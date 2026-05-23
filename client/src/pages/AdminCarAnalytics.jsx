import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCarAnalytics } from '../services/adminService';
import { FaArrowLeft, FaCar, FaCalendar, FaUser, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';

const AdminCarAnalytics = () => {
  const { carId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, [carId]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await getCarAnalytics(carId);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      active: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
          <Link to="/admin/cars" className="mt-4 inline-block text-primary-600 hover:text-primary-700">
            Back to Cars
          </Link>
        </div>
      </div>
    );
  }

  const { car, bookings, analytics } = data;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link to="/admin/cars" className="text-primary-600 hover:text-primary-700 flex items-center mb-4">
            <FaArrowLeft className="mr-2" /> Back to Cars
          </Link>
          <div className="flex items-center space-x-4">
            <img
              src={car.images[0]}
              alt={`${car.brand} ${car.model}`}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-600">{car.type} - {car.location}</p>
              <p className="text-primary-600 font-semibold">Rs. {car.pricePerDay}/day</p>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600 mt-2">
                  Rs. {analytics.totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <FaMoneyBillWave className="text-green-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-blue-600 mt-2">
                  {analytics.totalBookings}
                </p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <FaCalendar className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Bookings</p>
                <p className="text-2xl font-bold text-purple-600 mt-2">
                  {analytics.activeBookings}
                </p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <FaChartLine className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Days Booked</p>
                <p className="text-2xl font-bold text-orange-600 mt-2">
                  {analytics.totalDaysBooked}
                </p>
              </div>
              <div className="bg-orange-100 rounded-full p-3">
                <FaCar className="text-orange-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Pending Revenue</p>
            <p className="text-xl font-bold text-yellow-600 mt-2">
              Rs. {analytics.pendingRevenue.toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Completed Bookings</p>
            <p className="text-xl font-bold text-gray-900 mt-2">
              {analytics.completedBookings}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Average Booking Value</p>
            <p className="text-xl font-bold text-gray-900 mt-2">
              Rs. {Math.round(analytics.averageBookingValue).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Booking History Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Booking History</h2>
            <p className="text-sm text-gray-600 mt-1">
              {bookings.length} total booking{bookings.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Days
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booked On
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-primary-100 rounded-full p-2 mr-3">
                            <FaUser className="text-primary-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {booking.user?.name || 'Unknown'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.user?.email || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.pickupLocation}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.totalDays} day{booking.totalDays !== 1 ? 's' : ''}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        Rs. {booking.totalPrice.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}>
                          {booking.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(booking.createdAt)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      No bookings found for this car
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCarAnalytics;
