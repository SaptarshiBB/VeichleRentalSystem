import express from 'express';
import paypal from '@paypal/checkout-server-sdk';
import { protect } from '../middleware/auth.js';
import { findBookingById, updateBooking, findCarById } from '../data/store.js';

const router = express.Router();

// PayPal environment setup
const environment = process.env.PAYPAL_MODE === 'production'
  ? new paypal.core.LiveEnvironment(
      process.env.PAYPAL_CLIENT_ID || 'test-client-id',
      process.env.PAYPAL_CLIENT_SECRET || 'test-secret'
    )
  : new paypal.core.SandboxEnvironment(
      process.env.PAYPAL_CLIENT_ID || 'test-client-id',
      process.env.PAYPAL_CLIENT_SECRET || 'test-secret'
    );

const client = new paypal.core.PayPalHttpClient(environment);

// @route   POST /api/payment/create-order
// @desc    Create PayPal order
// @access  Private
router.post('/create-order', protect, async (req, res) => {
  try {
    const { bookingId } = req.body;

    // Get booking details
    const booking = findBookingById(bookingId);

    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }

    // Verify user owns this booking
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }

    const car = findCarById(booking.car);

    // Create PayPal order
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: booking.totalPrice.toFixed(2),
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: booking.totalPrice.toFixed(2)
            }
          }
        },
        description: `Car Rental: ${car.brand} ${car.name}`,
        items: [{
          name: `${car.brand} ${car.name}`,
          description: `${booking.totalDays} day(s) rental`,
          unit_amount: {
            currency_code: 'USD',
            value: car.pricePerDay.toFixed(2)
          },
          quantity: booking.totalDays.toString()
        }]
      }],
      application_context: {
        brand_name: 'Car Rental Platform',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: `${process.env.CORS_ORIGIN || 'http://localhost:5173'}/payment/success`,
        cancel_url: `${process.env.CORS_ORIGIN || 'http://localhost:5173'}/payment/cancel`
      }
    });

    const order = await client.execute(request);

    // Update booking with PayPal order ID
    updateBooking(bookingId, { paypalOrderId: order.result.id });

    res.json({
      success: true,
      data: {
        orderId: order.result.id,
        links: order.result.links
      }
    });
  } catch (error) {
    console.error('Create PayPal order error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating PayPal order',
      error: error.message 
    });
  }
});

// @route   POST /api/payment/capture-order
// @desc    Capture PayPal payment
// @access  Private
router.post('/capture-order', protect, async (req, res) => {
  try {
    const { orderId, bookingId } = req.body;

    // Capture the order
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    const capture = await client.execute(request);

    if (capture.result.status === 'COMPLETED') {
      // Update booking with payment details
      const booking = findBookingById(bookingId);
      
      if (!booking) {
        return res.status(404).json({ 
          success: false, 
          message: 'Booking not found' 
        });
      }

      const updatedBooking = updateBooking(bookingId, {
        paymentStatus: 'completed',
        status: 'confirmed',
        paypalPaymentId: capture.result.id
      });

      res.json({
        success: true,
        message: 'Payment completed successfully',
        data: {
          captureId: capture.result.id,
          status: capture.result.status,
          booking: updatedBooking
        }
      });
    } else {
      res.status(400).json({ 
        success: false, 
        message: 'Payment not completed',
        status: capture.result.status 
      });
    }
  } catch (error) {
    console.error('Capture PayPal payment error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error capturing payment',
      error: error.message 
    });
  }
});

// @route   GET /api/payment/verify/:orderId
// @desc    Verify PayPal order status
// @access  Private
router.get('/verify/:orderId', protect, async (req, res) => {
  try {
    const request = new paypal.orders.OrdersGetRequest(req.params.orderId);
    const order = await client.execute(request);

    res.json({
      success: true,
      data: {
        orderId: order.result.id,
        status: order.result.status,
        amount: order.result.purchase_units[0].amount
      }
    });
  } catch (error) {
    console.error('Verify PayPal order error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error verifying order',
      error: error.message 
    });
  }
});

export default router;

