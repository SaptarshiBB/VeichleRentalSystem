import { useState, useEffect } from 'react';
import { carsAPI } from '../services/api';
import CarCard from '../components/CarCard';
import FilterSidebar from '../components/FilterSidebar';
import { FaCar } from 'react-icons/fa';

const CarListing = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchCars();
  }, [filters]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await carsAPI.getAllCars(filters);
      setCars(response.data.data);
      setError('');
    } catch (err) {
      console.error('Error fetching cars:', err);
      setError('Failed to load cars. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6">
      <div className="w-full px-3 sm:px-4 lg:px-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2 flex items-center space-x-3">
            <FaCar className="text-primary-600" />
            <span>Browse Cars</span>
          </h1>
          <p className="text-gray-600">
            Find your perfect ride from our collection of {cars.length} available vehicles
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Filters - Desktop */}
          <div className="hidden lg:block lg:col-span-3">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>

          {/* Filters - Mobile */}
          <div className="lg:hidden col-span-full">
            <FilterSidebar onFilterChange={handleFilterChange} isMobile={true} />
          </div>

          {/* Car Grid */}
          <div className="lg:col-span-9">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="spinner"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
                {error}
              </div>
            ) : cars.length === 0 ? (
              <div className="bg-gray-50 border border-gray-200 text-gray-700 px-6 py-12 rounded-lg text-center">
                <FaCar className="text-6xl text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No cars found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more results</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {cars.map((car) => (
                  <CarCard key={car._id} car={car} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarListing;
