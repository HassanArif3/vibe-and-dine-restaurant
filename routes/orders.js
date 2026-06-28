const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create Order (Open for everyone, but associates user if logged in via token logic in future)
router.post('/', async (req, res) => {
  try {
    const { items, totalAmount, deliveryAddress, phone, user } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    const order = new Order({
      user: user || null,
      items,
      totalAmount,
      deliveryAddress,
      phone
    });

    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get User Orders (Simple query by user ID for demonstration)
router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
