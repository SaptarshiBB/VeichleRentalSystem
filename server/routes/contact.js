import express from 'express';
import { body, validationResult } from 'express-validator';
import ContactMessage from '../models/ContactMessage.js';
import { usingMemoryStore } from '../config/database.js';
import { createContactMessage } from '../data/store.js';

const router = express.Router();

// Contact form submission - Save to database
router.post(
  '/send',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required')
  ],
  async (req, res) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { name, email, subject, message } = req.body;

      const contactMessage = {
        name,
        email,
        subject,
        message,
        status: 'unread'
      };

      if (usingMemoryStore()) {
        createContactMessage(contactMessage);
      } else {
        await new ContactMessage(contactMessage).save();
      }

      res.json({
        success: true,
        message: 'Your message has been received successfully! We will get back to you soon.'
      });

    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

export default router;
