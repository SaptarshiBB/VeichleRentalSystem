import { useState, useEffect } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';
import { carsAPI } from '../services/api';

const FilterSidebar = ({ onFilterChange, isMobile = false }) => {
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    available: 'true',
    minPrice: '',
    maxPrice: '',
    search: '',
  });

  const [carTypes, setCarTypes] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      const [typesRes, locationsRes] = await Promise.all([
        carsAPI.getCarTypes(),
        carsAPI.getLocations(),
      ]);
      setCarTypes(typesRes.data.data || []);
      setLocations(locationsRes.data.data || []);
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      type: '',
      location: '',
      available: 'true',
      minPrice: '',
      maxPrice: '',
      search: '',
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${isMobile ? 'mb-6' : 'sticky top-28'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <FaFilter className="text-primary-600 text-2xl" />
          <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
        </div>
        <button
          onClick={clearFilters}
          className="text-sm text-red-500 hover:text-red-700 font-semibold flex items-center space-x-1"
        >
          <FaTimes />
          <span>Clear</span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Search
        </label>
        <input
          type="text"
          placeholder="Brand or model..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
        />
      </div>

      {/* Car Type */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Car Type
        </label>
        <select
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
        >
          <option value="">All Types</option>
          {carTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Location
        </label>
        <select
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-0">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Price Range (Rs./day)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            className="px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            className="px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
