import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthHeader = () => {
  try {
    // Token is stored separately, not inside the user object!
    const token = localStorage.getItem('token');
    console.log('🔑 Token from localStorage:', token ? token.substring(0, 20) + '...' : 'NULL');
    
    if (!token) {
      console.error('❌ No token in localStorage - user needs to login');
      return { headers: {} };
    }
    
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  } catch (error) {
    console.error('❌ Error getting auth header:', error);
    return { headers: {} };
  }
};

// Get platform statistics
export const getStats = async () => {
  const response = await axios.get(`${API_URL}/admin/stats`, getAuthHeader());
  return response.data;
};

// Get all users
export const getUsers = async (page = 1, limit = 20, search = '') => {
  console.log('Fetching users - page:', page, 'limit:', limit, 'search:', search);
  console.log('Auth header:', getAuthHeader());
  const response = await axios.get(
    `${API_URL}/admin/users?page=${page}&limit=${limit}&search=${search}`,
    getAuthHeader()
  );
  console.log('Users response:', response.data);
  return response.data;
};

// Update user role
export const updateUserRole = async (userId, role) => {
  console.log('Updating user role - userId:', userId, 'role:', role);
  console.log('Request URL:', `${API_URL}/admin/users/${userId}/role`);
  console.log('Auth header:', getAuthHeader());
  const response = await axios.put(
    `${API_URL}/admin/users/${userId}/role`,
    { role },
    getAuthHeader()
  );
  console.log('Update role response:', response.data);
  return response.data;
};

// Delete user
export const deleteUser = async (userId) => {
  console.log('Deleting user - userId:', userId);
  console.log('Request URL:', `${API_URL}/admin/users/${userId}`);
  console.log('Auth header:', getAuthHeader());
  const response = await axios.delete(
    `${API_URL}/admin/users/${userId}`,
    getAuthHeader()
  );
  console.log('Delete user response:', response.data);
  return response.data;
};

// Get all cars (admin view)
export const getCars = async () => {
  console.log('🚗 Fetching cars from admin endpoint...');
  console.log('Request URL:', `${API_URL}/admin/cars`);
  console.log('Auth header:', getAuthHeader());
  
  try {
    const response = await axios.get(`${API_URL}/admin/cars`, getAuthHeader());
    console.log('✅ Cars response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching cars:', error);
    console.error('Error response:', error.response);
    throw error;
  }
};

// Create car
export const createCar = async (carData) => {
  const response = await axios.post(
    `${API_URL}/admin/cars`,
    carData,
    getAuthHeader()
  );
  return response.data;
};

// Update car
export const updateCar = async (carId, carData) => {
  const response = await axios.put(
    `${API_URL}/admin/cars/${carId}`,
    carData,
    getAuthHeader()
  );
  return response.data;
};

// Delete car
export const deleteCar = async (carId) => {
  const response = await axios.delete(
    `${API_URL}/admin/cars/${carId}`,
    getAuthHeader()
  );
  return response.data;
};

// Get car analytics
export const getCarAnalytics = async (carId) => {
  const response = await axios.get(
    `${API_URL}/admin/cars/${carId}/analytics`,
    getAuthHeader()
  );
  return response.data;
};

// Get contact messages
export const getMessages = async (page = 1, limit = 20, status = '') => {
  const response = await axios.get(
    `${API_URL}/admin/messages?page=${page}&limit=${limit}${status ? `&status=${status}` : ''}`,
    getAuthHeader()
  );
  return response.data;
};

// Update message status
export const updateMessageStatus = async (messageId, status) => {
  const response = await axios.patch(
    `${API_URL}/admin/messages/${messageId}/status`,
    { status },
    getAuthHeader()
  );
  return response.data;
};

// Delete message
export const deleteMessage = async (messageId) => {
  const response = await axios.delete(
    `${API_URL}/admin/messages/${messageId}`,
    getAuthHeader()
  );
  return response.data;
};

export default {
  getStats,
  getUsers,
  updateUserRole,
  deleteUser,
  getCars,
  createCar,
  updateCar,
  deleteCar,
  getCarAnalytics,
  getMessages,
  updateMessageStatus,
  deleteMessage
};
