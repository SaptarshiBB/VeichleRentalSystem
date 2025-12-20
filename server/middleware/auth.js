import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  console.log('🔐 Auth middleware - checking authorization...');
  console.log('Authorization header:', req.headers.authorization);

  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      console.log('✅ Token found:', token.substring(0, 20) + '...');

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      console.log('✅ Token verified, user ID:', decoded.id);

      // Get user from token (exclude password)
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        console.log('❌ User not found in database for ID:', decoded.id);
        return res.status(401).json({ 
          success: false, 
          message: 'User not found' 
        });
      }

      console.log('✅ User found:', user.email, 'Role:', user.role);
      req.user = user;

      next();
    } catch (error) {
      console.error('❌ Auth middleware error:', error.message);
      console.error('Error details:', error);
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized, token failed' 
      });
    }
  }

  if (!token) {
    console.log('❌ No token provided');
    return res.status(401).json({ 
      success: false, 
      message: 'Not authorized, no token' 
    });
  }
};

// Admin middleware
export const admin = (req, res, next) => {
  console.log('🔧 Admin middleware - checking admin role...');
  console.log('User:', req.user?.email, 'Role:', req.user?.role);
  
  if (req.user && req.user.role === 'admin') {
    console.log('✅ User is admin, allowing access');
    next();
  } else {
    console.log('❌ User is NOT admin, denying access');
    res.status(403).json({ 
      success: false, 
      message: 'Not authorized as admin' 
    });
  }
};

