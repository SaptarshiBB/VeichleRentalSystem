import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';

let wss;
const clients = new Map();

// Initialize WebSocket server
export const initWebSocket = (server) => {
  wss = new WebSocketServer({ server });

  wss.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      const port = process.env.PORT || 5000;
      console.error(`Port ${port} is already in use. The backend is probably already running at http://localhost:${port}`);
      process.exit(0);
    }

    console.error('WebSocket server error:', err);
  });

  wss.on('connection', (ws, req) => {
    console.log('🔌 New WebSocket connection');

    // Extract token from query params or headers
    const url = new URL(req.url, `http://${req.headers.host}`);
    const token = url.searchParams.get('token');

    let userId = null;

    // Verify token if provided
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
        clients.set(userId, ws);
        console.log(`✅ User ${userId} authenticated via WebSocket`);
      } catch (error) {
        console.error('WebSocket auth error:', error.message);
      }
    }

    // Send welcome message
    ws.send(JSON.stringify({
      type: 'connection',
      message: 'Connected to Car Rental WebSocket server',
      timestamp: new Date().toISOString()
    }));

    // Handle incoming messages
    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message);
        console.log('📨 Received message:', data);

        // Handle different message types
        switch (data.type) {
          case 'ping':
            ws.send(JSON.stringify({ type: 'pong', timestamp: new Date().toISOString() }));
            break;

          case 'subscribe_car':
            // Subscribe to specific car updates
            ws.carId = data.carId;
            ws.send(JSON.stringify({ 
              type: 'subscribed', 
              carId: data.carId,
              message: `Subscribed to updates for car ${data.carId}` 
            }));
            break;

          case 'unsubscribe_car':
            delete ws.carId;
            ws.send(JSON.stringify({ 
              type: 'unsubscribed', 
              message: 'Unsubscribed from car updates' 
            }));
            break;

          default:
            ws.send(JSON.stringify({ 
              type: 'error', 
              message: 'Unknown message type' 
            }));
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
        ws.send(JSON.stringify({ 
          type: 'error', 
          message: 'Invalid message format' 
        }));
      }
    });

    // Handle connection close
    ws.on('close', () => {
      console.log('🔌 WebSocket connection closed');
      if (userId) {
        clients.delete(userId);
      }
    });

    // Handle errors
    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });

  console.log('✅ WebSocket server initialized');
};

// Broadcast car availability update to all connected clients
export const broadcastCarUpdate = (carId, carData) => {
  if (!wss) return;

  const message = JSON.stringify({
    type: 'car_update',
    carId,
    data: carData,
    timestamp: new Date().toISOString()
  });

  wss.clients.forEach((client) => {
    if (client.readyState === 1) { // OPEN state
      // Send to all clients or only those subscribed to this car
      if (!client.carId || client.carId === carId) {
        client.send(message);
      }
    }
  });

  console.log(`📡 Broadcasted update for car ${carId} to ${wss.clients.size} clients`);
};

// Broadcast booking notification
export const broadcastBookingNotification = (bookingData) => {
  if (!wss) return;

  const message = JSON.stringify({
    type: 'booking_notification',
    data: bookingData,
    timestamp: new Date().toISOString()
  });

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(message);
    }
  });

  console.log(`📡 Broadcasted booking notification to ${wss.clients.size} clients`);
};

// Send message to specific user
export const sendToUser = (userId, message) => {
  const client = clients.get(userId);
  if (client && client.readyState === 1) {
    client.send(JSON.stringify(message));
    return true;
  }
  return false;
};

// Get connected clients count
export const getConnectedClientsCount = () => {
  return wss ? wss.clients.size : 0;
};

export default {
  initWebSocket,
  broadcastCarUpdate,
  broadcastBookingNotification,
  sendToUser,
  getConnectedClientsCount
};
