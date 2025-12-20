import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { carsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useWebSocket } from '../context/WebSocketContext';
import { FaMapMarkerAlt, FaUsers, FaCar, FaGasPump, FaStar, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { carUpdates, subscribeToCar, unsubscribeFromCar } = useWebSocket();
  
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchCar();
    subscribeToCar(id);
    
    return () => {
      unsubscribeFromCar();
    };
  }, [id]);

  useEffect(() => {
    if (carUpdates[id]) {
      setCar(prev => ({ ...prev, ...carUpdates[id] }));
    }
  }, [carUpdates, id]);

  const fetchCar = async () => {
    try {
      const response = await carsAPI.getCarById(id);
      setCar(response.data.data);
    } catch (err) {
      setError('Failed to load car details');
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      alert('Please sign in to book this vehicle! 🚗\n\nYou will be redirected to the login page.');
      navigate('/login', { state: { from: `/booking/${id}` } });
    } else {
      navigate(`/booking/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">{error || 'Car not found'}</p>
          <Link to="/cars" className="text-primary-600 hover:text-primary-700 font-semibold">
            ← Back to Cars
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link to="/cars" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold mb-6">
          <FaArrowLeft className="mr-2" />
          Back to Cars
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
              <img
                src={car.images[selectedImage]}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {car.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${car.brand} ${car.model} ${index + 1}`}
                  onClick={() => setSelectedImage(index)}
                  className={`w-full h-20 object-cover rounded-lg cursor-pointer transition-all ${
                    selectedImage === index ? 'ring-4 ring-primary-500' : 'opacity-70 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {car.brand} {car.model}
                </h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <FaMapMarkerAlt className="text-primary-500 mr-2" />
                  <span>{car.location}</span>
                </div>
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="font-semibold text-gray-700">{car.rating}</span>
                  <span className="text-gray-500 ml-1">({car.totalBookings} bookings)</span>
                </div>
              </div>
              <div>
                {car.available ? (
                  <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold pulse-available">
                    Available
                  </span>
                ) : (
                  <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Booked
                  </span>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <FaUsers className="text-primary-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Seats</p>
                    <p className="font-semibold">{car.specifications.seats}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCar className="text-primary-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Transmission</p>
                    <p className="font-semibold">{car.specifications.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaGasPump className="text-primary-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Fuel Type</p>
                    <p className="font-semibold">{car.specifications.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaCheckCircle className="text-primary-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Mileage</p>
                    <p className="font-semibold">{car.specifications.mileage}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Features</h2>
              <div className="grid grid-cols-2 gap-3">
                {car.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <FaCheckCircle className="text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-gray-600 text-sm">Price per day</p>
                  <p className="text-4xl font-bold text-primary-600">₹{car.pricePerDay}</p>
                </div>
              </div>

              <button
                onClick={handleBookNow}
                disabled={!car.available}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-4 rounded-lg font-bold text-lg hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {car.available ? 'Book Now' : 'Not Available'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
