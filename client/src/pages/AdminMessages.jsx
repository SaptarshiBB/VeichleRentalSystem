import { useState, useEffect } from 'react';
import { FaEnvelope, FaEnvelopeOpen, FaTrash, FaFilter, FaSync } from 'react-icons/fa';
import { getMessages, updateMessageStatus, deleteMessage } from '../services/adminService';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState(''); // '', 'read', 'unread'
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getMessages(1, 100, filter);
      setMessages(response.data.messages);
      setUnreadCount(response.data.unreadCount);
    } catch (err) {
      setError('Failed to load messages');
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (messageId) => {
    try {
      await updateMessageStatus(messageId, 'read');
      fetchMessages();
      if (selectedMessage?._id === messageId) {
        setSelectedMessage({ ...selectedMessage, status: 'read' });
      }
    } catch (err) {
      console.error('Error marking message as read:', err);
    }
  };

  const handleMarkAsUnread = async (messageId) => {
    try {
      await updateMessageStatus(messageId, 'unread');
      fetchMessages();
      if (selectedMessage?._id === messageId) {
        setSelectedMessage({ ...selectedMessage, status: 'unread' });
      }
    } catch (err) {
      console.error('Error marking message as unread:', err);
    }
  };

  const handleDelete = async (messageId) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
      await deleteMessage(messageId);
      fetchMessages();
      if (selectedMessage?._id === messageId) {
        setSelectedMessage(null);
      }
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
          <p className="text-gray-600 mt-2">
            View and manage customer inquiries and feedback
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Messages</p>
                <p className="text-3xl font-bold text-gray-900">{messages.length}</p>
              </div>
              <FaEnvelope className="text-4xl text-primary-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unread</p>
                <p className="text-3xl font-bold text-orange-600">{unreadCount}</p>
              </div>
              <FaEnvelopeOpen className="text-4xl text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Read</p>
                <p className="text-3xl font-bold text-green-600">{messages.length - unreadCount}</p>
              </div>
              <FaEnvelopeOpen className="text-4xl text-green-600" />
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FaFilter className="text-gray-600" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Messages</option>
                <option value="unread">Unread Only</option>
                <option value="read">Read Only</option>
              </select>
            </div>

            <button
              onClick={fetchMessages}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <FaSync />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Messages Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <FaEnvelope className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No messages found</h3>
            <p className="text-gray-600">
              {filter ? 'Try changing the filter' : 'Customer messages will appear here'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Messages List */}
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message._id}
                  onClick={() => {
                    setSelectedMessage(message);
                    if (message.status === 'unread') {
                      handleMarkAsRead(message._id);
                    }
                  }}
                  className={`bg-white rounded-lg shadow p-6 cursor-pointer transition-all hover:shadow-lg ${
                    selectedMessage?._id === message._id ? 'ring-2 ring-primary-500' : ''
                  } ${message.status === 'unread' ? 'border-l-4 border-orange-500' : ''}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{message.name}</h3>
                        {message.status === 'unread' && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{message.email}</p>
                    </div>
                    {message.status === 'unread' ? (
                      <FaEnvelope className="text-orange-500 text-xl" />
                    ) : (
                      <FaEnvelopeOpen className="text-green-500 text-xl" />
                    )}
                  </div>

                  <h4 className="font-medium text-gray-900 mb-2">{message.subject}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{message.message}</p>
                  <p className="text-xs text-gray-500">{formatDate(message.createdAt)}</p>
                </div>
              ))}
            </div>

            {/* Message Detail */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              {selectedMessage ? (
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedMessage.subject}</h2>
                      <div className="flex items-center space-x-2">
                        {selectedMessage.status === 'unread' ? (
                          <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-semibold rounded">
                            Unread
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded">
                            Read
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6 mb-6">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">From</p>
                        <p className="font-semibold text-gray-900">{selectedMessage.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <a
                          href={`mailto:${selectedMessage.email}`}
                          className="font-semibold text-primary-600 hover:text-primary-700"
                        >
                          {selectedMessage.email}
                        </a>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Received</p>
                        <p className="font-semibold text-gray-900">{formatDate(selectedMessage.createdAt)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6 mb-6">
                    <p className="text-sm text-gray-600 mb-2">Message</p>
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>

                  <div className="border-t border-gray-200 pt-6 flex items-center space-x-3">
                    {selectedMessage.status === 'read' ? (
                      <button
                        onClick={() => handleMarkAsUnread(selectedMessage._id)}
                        className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <FaEnvelope />
                        <span>Mark as Unread</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMarkAsRead(selectedMessage._id)}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <FaEnvelopeOpen />
                        <span>Mark as Read</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(selectedMessage._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <FaTrash />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                  <FaEnvelope className="text-6xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No message selected</h3>
                  <p className="text-gray-600">Click on a message to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
