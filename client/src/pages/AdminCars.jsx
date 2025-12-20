import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCars, createCar, updateCar, deleteCar } from '../services/adminService';

const AdminCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    type: 'Sedan',
    pricePerDay: '',
    year: new Date().getFullYear(),
    location: '',
    specifications: {
      seats: 5,
      transmission: 'Manual',
      fuelType: 'Petrol'
    },
    description: '',
    features: '',
    images: '',
    available: true
  });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await getCars();
      setCars(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch cars');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (car = null) => {
    if (car) {
      // Editing existing car
      setEditingCar(car);
      setFormData({
        name: car.name,
        brand: car.brand,
        model: car.model,
        type: car.type,
        pricePerDay: car.pricePerDay,
        year: car.year,
        location: car.location,
        specifications: {
          seats: car.specifications?.seats || 5,
          transmission: car.specifications?.transmission || 'Manual',
          fuelType: car.specifications?.fuelType || 'Petrol'
        },
        description: car.description || '',
        features: Array.isArray(car.features) ? car.features.join(', ') : '',
        images: Array.isArray(car.images) ? car.images[0] : '',
        available: car.available !== undefined ? car.available : true
      });
    } else {
      // Adding new car
      setEditingCar(null);
      setFormData({
        name: '',
        brand: '',
        model: '',
        type: 'Sedan',
        pricePerDay: '',
        year: new Date().getFullYear(),
        location: '',
        specifications: {
          seats: 5,
          transmission: 'Manual',
          fuelType: 'Petrol'
        },
        description: '',
        features: '',
        images: '',
        available: true
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCar(null);
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('specifications.')) {
      const specField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specField]: specField === 'seats' ? parseInt(value) : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Prepare car data
      const carData = {
        ...formData,
        pricePerDay: parseInt(formData.pricePerDay),
        year: parseInt(formData.year),
        features: formData.features.split(',').map(f => f.trim()).filter(f => f),
        images: formData.images ? [formData.images] : []
      };

      if (editingCar) {
        // Update existing car
        await updateCar(editingCar._id, carData);
        setSuccess('Car updated successfully');
      } else {
        // Create new car
        await createCar(carData);
        setSuccess('Car created successfully');
      }

      handleCloseModal();
      fetchCars();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save car');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDeleteCar = async (carId, carName) => {
    if (!window.confirm(`Are you sure you want to delete ${carName}?`)) {
      return;
    }

    try {
      await deleteCar(carId);
      setSuccess('Car deleted successfully');
      fetchCars();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete car');
      setTimeout(() => setError(''), 3000);
    }
  };

  const filteredCars = filter === 'all' 
    ? cars 
    : cars.filter(car => car.available === (filter === 'available'));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Car Management</h1>
              <p className="text-gray-600 mt-2">Manage all vehicles in the platform</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => handleOpenModal()}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Car
              </button>
              <Link
                to="/admin"
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                ← Back to Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            {success}
          </div>
        )}

        {/* Filter */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Cars ({cars.length})</option>
              <option value="available">Available ({cars.filter(c => c.available).length})</option>
              <option value="unavailable">Unavailable ({cars.filter(c => !c.available).length})</option>
            </select>
          </div>
        </div>

        {/* Cars Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <div key={car._id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Car Image */}
                  <div className="h-48 overflow-hidden bg-gray-200">
                    {car.images && car.images[0] ? (
                      <img
                        src={car.images[0]}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Car Details */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {car.brand} {car.model}
                        </h3>
                        <p className="text-sm text-gray-600">{car.year} • {car.type}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        car.available
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {car.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Location:</span> {car.location}
                      </p>
                      <p className="text-lg font-bold text-primary-600 mt-1">
                        ₹{car.pricePerDay}/day
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                      <div>👥 {car.specifications?.seats} Seats</div>
                      <div>⚙️ {car.specifications?.transmission}</div>
                      <div>⛽ {car.specifications?.fuelType}</div>
                      <div>⭐ {car.rating || 'N/A'}</div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2 pt-3 border-t border-gray-200">
                      <Link
                        to={`/admin/cars/${car._id}/analytics`}
                        className="w-full bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors text-center flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        View Analytics
                      </Link>
                      <div className="flex space-x-2">
                        <Link
                          to={`/cars/${car._id}`}
                          className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => handleOpenModal(car)}
                          className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                          title="Edit Car"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteCar(car._id, `${car.brand} ${car.model}`)}
                          className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                          title="Delete Car"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                No cars found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingCar ? 'Edit Car' : 'Add New Car'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Maruti Suzuki"
                  />
                </div>

                {/* Model */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Swift"
                  />
                </div>

                {/* Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Maruti Suzuki Swift"
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Truck">Truck</option>
                    <option value="Traveller">Traveller</option>
                    <option value="Bus">Bus</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>

                {/* Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    min="2000"
                    max={new Date().getFullYear() + 1}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Price Per Day */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Per Day (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="pricePerDay"
                    value={formData.pricePerDay}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., 1200"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Mumbai, Maharashtra"
                  />
                </div>

                {/* Seats */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Seats <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="specifications.seats"
                    value={formData.specifications.seats}
                    onChange={handleInputChange}
                    required
                    min="2"
                    max="50"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Transmission */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transmission <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="specifications.transmission"
                    value={formData.specifications.transmission}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fuel Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="specifications.fuelType"
                    value={formData.specifications.fuelType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="CNG">CNG</option>
                  </select>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Brief description of the car..."
                  />
                </div>

                {/* Features */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Features (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="features"
                    value={formData.features}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., AC, Power Steering, Music System, Central Locking"
                  />
                </div>

                {/* Image Upload Section */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Car Image
                  </label>
                  
                  {/* Image Preview */}
                  {formData.images && (
                    <div className="mb-3">
                      <img
                        src={formData.images}
                        alt="Car preview"
                        className="w-full h-48 object-cover rounded-lg border border-gray-300"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image';
                        }}
                      />
                    </div>
                  )}

                  {/* Upload Options */}
                  <div className="space-y-3">
                    {/* File Upload */}
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Upload Image File</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFormData(prev => ({ ...prev, images: reader.result }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      />
                      <p className="text-xs text-gray-500 mt-1">Supported: JPG, PNG, WebP</p>
                    </div>

                    {/* Paste Area */}
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Or Paste Image (Ctrl+V)</label>
                      <div
                        contentEditable
                        onPaste={(e) => {
                          e.preventDefault();
                          const items = e.clipboardData.items;
                          for (let i = 0; i < items.length; i++) {
                            if (items[i].type.indexOf('image') !== -1) {
                              const blob = items[i].getAsFile();
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setFormData(prev => ({ ...prev, images: reader.result }));
                              };
                              reader.readAsDataURL(blob);
                              break;
                            }
                          }
                        }}
                        className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-[60px] flex items-center justify-center text-sm text-gray-500 cursor-pointer hover:border-primary-400"
                      >
                        Click here and press Ctrl+V to paste image
                      </div>
                    </div>

                    {/* URL Input */}
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Or Enter Image URL</label>
                      <input
                        type="url"
                        name="images"
                        value={formData.images}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        placeholder="https://example.com/car-image.jpg"
                      />
                    </div>
                  </div>
                </div>

                {/* Available */}
                <div className="md:col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="available"
                      checked={formData.available}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      Available for booking
                    </span>
                  </label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  {editingCar ? 'Update Car' : 'Create Car'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCars;
