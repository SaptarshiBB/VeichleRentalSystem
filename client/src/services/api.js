import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/me'),
};

// Cars API
export const carsAPI = {
  getAllCars: (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });
    return api.get(`/cars?${params.toString()}`);
  },
  getCarById: (id) => api.get(`/cars/${id}`),
  getCarTypes: () => api.get('/cars/types/list'),
  getLocations: () => api.get('/cars/locations/list'),
  createCar: (carData) => api.post('/cars', carData),
  updateCar: (id, carData) => api.put(`/cars/${id}`, carData),
  deleteCar: (id) => api.delete(`/cars/${id}`),
};

// Bookings API
export const bookingsAPI = {
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  getUserBookings: (userId) => api.get(`/bookings/user/${userId}`),
  getBookingById: (id) => api.get(`/bookings/${id}`),
  updateBooking: (id, updateData) => api.put(`/bookings/${id}`, updateData),
  cancelBooking: (id) => api.delete(`/bookings/${id}`),
  checkAvailability: (carId, startDate, endDate) => 
    api.get(`/bookings/check-availability/${carId}?startDate=${startDate}&endDate=${endDate}`),
  getBookedDates: (carId) => api.get(`/bookings/car/${carId}/booked-dates`),
};

// Payment API
export const paymentAPI = {
  createOrder: (bookingId) => api.post('/payment/create-order', { bookingId }),
  captureOrder: (orderId, bookingId) => api.post('/payment/capture-order', { orderId, bookingId }),
  verifyOrder: (orderId) => api.get(`/payment/verify/${orderId}`),
};

// Contact API
export const contactAPI = {
  sendMessage: (formData) => api.post('/contact/send', formData),
};

export default api;
