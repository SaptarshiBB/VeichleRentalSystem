import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { carsAPI, bookingsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaCalendar, FaMapMarkerAlt, FaCar } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Booking = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    pickupLocation: '',
    returnLocation: '',
  });

  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [availabilityMessage, setAvailabilityMessage] = useState('');
  const [bookedDates, setBookedDates] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    fetchCar();
    fetchBookedDates();
  }, [carId]);

  useEffect(() => {
    calculatePrice();
    checkAvailability();
  }, [formData.startDate, formData.endDate, car]);

  const checkAvailability = async () => {
    if (formData.startDate && formData.endDate && car) {
      setCheckingAvailability(true);
      setAvailabilityMessage('');
      
      try {
        const response = await bookingsAPI.checkAvailability(
          carId,
          formData.startDate,
          formData.endDate
        );
        
        if (!response.data.available) {
          setAvailabilityMessage(response.data.message);
        } else {
          setAvailabilityMessage('Vehicle is available for selected dates');
        }
      } catch (err) {
        console.error('Availability check error:', err);
      } finally {
        setCheckingAvailability(false);
      }
    }
  };

  const fetchCar = async () => {
    try {
      const response = await carsAPI.getCarById(carId);
      setCar(response.data.data);
      setFormData(prev => ({
        ...prev,
        pickupLocation: response.data.data.location,
        returnLocation: response.data.data.location,
      }));
    } catch (err) {
      setError('Failed to load car details');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookedDates = async () => {
    try {
      const response = await bookingsAPI.getBookedDates(carId);
      setBookedDates(response.data.data);
    } catch (err) {
      console.error('Failed to fetch booked dates:', err);
    }
  };

  // Helper function to check if a date is booked
  const isDateBooked = (date) => {
    return bookedDates.some(booking => {
      const start = new Date(booking.start);
      const end = new Date(booking.end);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      date.setHours(0, 0, 0, 0);
      return date >= start && date <= end;
    });
  };

  // Tile class name for calendar
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (isDateBooked(date)) {
        return 'booked-date';
      }
    }
    return null;
  };

  // Disable booked dates
  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      return isDateBooked(date);
    }
    return false;
  };

  const calculatePrice = () => {
    if (formData.startDate && formData.endDate && car) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      
      if (days > 0) {
        setTotalDays(days);
        setTotalPrice(days * car.pricePerDay);
      } else {
        setTotalDays(0);
        setTotalPrice(0);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    console.log('Booking submission started...');
    console.log('Form data:', formData);
    console.log('Total days:', totalDays);
    console.log('Total price:', totalPrice);

    if (totalDays < 1) {
      setError('End date must be after start date');
      setSubmitting(false);
      return;
    }

    try {
      console.log('Sending booking request to API...');
      const response = await bookingsAPI.createBooking({
        carId,
        ...formData,
      });

      console.log('Booking created successfully:', response.data);
      console.log('Booking ID:', response.data.data._id);

      // Navigate to payment page with booking ID
      console.log('Navigating to payment page...');
      navigate(`/payment/${response.data.data._id}`);
    } catch (err) {
      console.error('Booking creation failed:', err);
      console.error('Error response:', err.response);
      console.error('Error message:', err.response?.data?.message);
      
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create booking. Please try again.';
      setError(errorMessage);
      
      // Show alert for better visibility
      alert(`Booking failed: ${errorMessage}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Car not found</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Complete Your Booking</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Booking Details</h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaCalendar className="inline mr-2" />
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaCalendar className="inline mr-2" />
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  min={formData.startDate || new Date().toISOString().split('T')[0]}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Calendar Availability View */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <button
                  type="button"
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="w-full flex items-center justify-between text-left font-semibold text-gray-700 mb-2"
                >
                  <span className="flex items-center">
                    <FaCalendar className="mr-2" />
                    {showCalendar ? 'Hide' : 'Show'} Availability Calendar
                  </span>
                  <span className="text-2xl">{showCalendar ? '−' : '+'}</span>
                </button>
                
                {showCalendar && (
                  <div className="mt-4">
                    <div className="mb-3 flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                        <span>Booked</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-white border border-gray-300 rounded mr-2"></div>
                        <span>Available</span>
                      </div>
                    </div>
                    <Calendar
                      tileClassName={tileClassName}
                      tileDisabled={tileDisabled}
                      minDate={new Date()}
                      className="w-full border-0"
                    />
                    <p className="text-xs text-gray-600 mt-3">
                      Red dates are already booked and cannot be selected.
                    </p>
                  </div>
                )}
              </div>

              {/* Availability Message */}
              {(checkingAvailability || availabilityMessage) && (
                <div className={`px-4 py-3 rounded-lg ${
                  availabilityMessage.includes('available') 
                    ? 'bg-green-50 border border-green-200 text-green-700' 
                    : availabilityMessage 
                    ? 'bg-yellow-50 border border-yellow-200 text-yellow-700'
                    : 'bg-gray-50 border border-gray-200 text-gray-600'
                }`}>
                  {checkingAvailability ? 'Checking availability...' : availabilityMessage}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaMapMarkerAlt className="inline mr-2" />
                  Pickup Location
                </label>
                <input
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaMapMarkerAlt className="inline mr-2" />
                  Return Location
                </label>
                <input
                  type="text"
                  name="returnLocation"
                  value={formData.returnLocation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting || totalDays < 1}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-3 rounded-lg font-bold hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </form>
          </div>

          {/* Booking Summary */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Car Details</h2>
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={car.images[0]}
                  alt={`${car.brand} ${car.model}`}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-bold text-lg">{car.brand} {car.model}</h3>
                  <p className="text-gray-600">{car.type}</p>
                  <p className="text-primary-600 font-semibold">Rs. {car.pricePerDay}/day</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Price Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Price per day</span>
                  <span className="font-semibold">Rs. {car.pricePerDay}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Number of days</span>
                  <span className="font-semibold">{totalDays}</span>
                </div>
                <div className="border-t border-primary-200 pt-3 flex justify-between">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-2xl font-bold text-primary-600">Rs. {totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
