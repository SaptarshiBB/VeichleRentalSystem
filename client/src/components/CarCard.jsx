import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCar, FaUsers, FaGasPump, FaStar } from 'react-icons/fa';
import { useWebSocket } from '../context/WebSocketContext';
import { useEffect, useState } from 'react';

const CarCard = ({ car }) => {
  const { carUpdates } = useWebSocket();
  const [currentCar, setCurrentCar] = useState(car);

  useEffect(() => {
    // Update car data if real-time update is received
    if (carUpdates[car._id]) {
      setCurrentCar(prev => ({ ...prev, ...carUpdates[car._id] }));
    }
  }, [carUpdates, car._id]);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover transform transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={currentCar.images[0]}
          alt={`${currentCar.brand} ${currentCar.model}`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        
        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          {currentCar.available ? (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 pulse-available shadow-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              <span>Available</span>
            </span>
          ) : (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              Booked
            </span>
          )}
        </div>

        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            {currentCar.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {currentCar.brand} {currentCar.model}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <FaMapMarkerAlt className="text-primary-500 mr-2" />
          <span className="text-sm">{currentCar.location}</span>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-gray-600">
          <div className="flex items-center space-x-1">
            <FaUsers className="text-primary-500" />
            <span>{currentCar.specifications.seats} Seats</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaCar className="text-primary-500" />
            <span>{currentCar.specifications.transmission}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaGasPump className="text-primary-500" />
            <span>{currentCar.specifications.fuelType}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="text-sm font-semibold text-gray-700">{currentCar.rating}</span>
          <span className="text-xs text-gray-500 ml-1">
            ({currentCar.totalBookings} bookings)
          </span>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary-600">
              ₹{currentCar.pricePerDay}
            </span>
            <span className="text-sm text-gray-500">/day</span>
          </div>
          <Link
            to={`/cars/${currentCar._id}`}
            className="bg-gradient-to-r from-primary-600 to-primary-500 text-white px-5 py-2 rounded-lg font-semibold hover:shadow-glow transition-all"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
