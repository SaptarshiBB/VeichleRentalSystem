import { createContext, useContext, useEffect, useState } from 'react';
import wsService from '../services/websocket';
import { useAuth } from './AuthContext';

const WebSocketContext = createContext(null);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within WebSocketProvider');
  }
  return context;
};

export const WebSocketProvider = ({ children }) => {
  const { token, isAuthenticated } = useAuth();
  const [connected, setConnected] = useState(false);
  const [carUpdates, setCarUpdates] = useState({});

  useEffect(() => {
    if (isAuthenticated && token) {
      // Connect to WebSocket
      wsService.connect(token);

      // Listen for connection status
      wsService.on('connection', (data) => {
        setConnected(data.connected);
      });

      // Listen for car updates
      wsService.on('car_update', (data) => {
        console.log('Car update received:', data);
        setCarUpdates(prev => ({
          ...prev,
          [data.carId]: data.data,
        }));
      });

      // Listen for booking notifications
      wsService.on('booking_notification', (data) => {
        console.log('Booking notification:', data);
        // You can add toast notifications here
      });

      return () => {
        wsService.disconnect();
      };
    }
  }, [isAuthenticated, token]);

  const subscribeToCar = (carId) => {
    wsService.subscribeToCar(carId);
  };

  const unsubscribeFromCar = () => {
    wsService.unsubscribeFromCar();
  };

  const value = {
    connected,
    carUpdates,
    subscribeToCar,
    unsubscribeFromCar,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
