const Razorpay = require('razorpay')
const crypto = require('crypto')
const Order = require('../models/Order')

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// Create Razorpay order
const createPaymentOrder = async (req, res) => {
  try {
    const { orderId } = req.body

    const order = await Order.findById(orderId)

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    const options = {
      amount: order.totalAmount * 100, // Razorpay uses paise
      currency: 'INR',
      receipt: `receipt_${orderId}`,
    }

    const razorpayOrder = await razorpay.orders.create(options)

    res.status(200).json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Verify payment
const verifyPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = req.body

    const body = razorpayOrderId + '|' + razorpayPaymentId

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex')

    if (expectedSignature !== razorpaySignature) {
      return res.status(400).json({ message: 'Invalid payment signature' })
    }

    // Update order payment status
    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: 'paid',
      stripeSessionId: razorpayPaymentId, // reusing field for payment ID
    })

    res.status(200).json({ message: 'Payment verified successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { createPaymentOrder, verifyPayment }