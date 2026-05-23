import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, [page, filter]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      // Token is stored separately, not inside user object!
      const token = localStorage.getItem('token');
      const actionParam = filter !== 'all' ? `&action=${filter}` : '';
      
      const response = await axios.get(
        `${API_URL}/admin/activity-logs?page=${page}&limit=50${actionParam}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setLogs(response.data.data.logs);
      setPagination(response.data.data.pagination);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch activity logs');
    } finally {
      setLoading(false);
    }
  };

  const getActionBadge = (action) => {
    const badges = {
      login: 'bg-green-100 text-green-800',
      logout: 'bg-gray-100 text-gray-800',
      register: 'bg-blue-100 text-blue-800'
    };
    return badges[action] || 'bg-gray-100 text-gray-800';
  };

  const getActionIcon = (action) => {
    const icons = {
      login: 'Login',
      logout: 'Logout',
      register: 'Register'
    };
    return icons[action] || 'Activity';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Activity Logs</h1>
              <p className="text-gray-600 mt-2">Track user sign-ins and sign-outs</p>
            </div>
            <Link
              to="/admin"
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Filter */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter:</label>
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Activities</option>
              <option value="login">Sign-Ins Only</option>
              <option value="logout">Sign-Outs Only</option>
              <option value="register">Registrations Only</option>
            </select>
            <span className="text-sm text-gray-600">
              {pagination?.total || 0} total records
            </span>
          </div>
        </div>

        {/* Activity Logs Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        IP Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Timestamp
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {logs.length > 0 ? (
                      logs.map((log) => (
                        <tr key={log._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getActionBadge(log.action)}`}>
                              {getActionIcon(log.action)} {log.action.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{log.name}</div>
                            {log.user?.role === 'admin' && (
                              <span className="text-xs text-purple-600 font-semibold">ADMIN</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {log.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {log.ipAddress || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(log.timestamp).toLocaleString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                          No activity logs found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination && pagination.pages > 1 && (
                <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                  <div className="text-sm text-gray-700">
                    Showing page {pagination.page} of {pagination.pages} ({pagination.total} total logs)
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={page === pagination.pages}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminActivityLogs;
