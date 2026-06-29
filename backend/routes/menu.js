const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');

// Get all menu items
router.get('/', async (req, res) => {
  const fallbackMenu = [
    { _id: '1', name: 'Beef Smash Burger', description: 'Hand-pressed caramelized beef patties with signature sauce and premium cheese.', price: 750, category: 'Smash Burgers', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80' },
    { _id: '2', name: 'Chicken Smash Burger', description: 'Crispy, juicy hand-pressed chicken patty for chicken lovers.', price: 650, category: 'Smash Burgers', imageUrl: 'https://images.unsplash.com/photo-1615719413546-198b25453f85?w=500&q=80' },
    { _id: '3', name: 'Crown Crust Pizza', description: 'Stunning premium pizza with a cheese-stuffed crust crown on organic whole grain dough.', price: 1500, category: 'Pizzas', imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80' },
    { _id: '4', name: 'Crispy Spring Rolls', description: 'The ultimate snack attack. Crunchy rolls packed with savory fillings.', price: 350, category: 'Appetizers', imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&q=80' },
    { _id: '5', name: 'Loaded Fries', description: 'Crispy fries generously seasoned and topped with melted cheese and signature sauces.', price: 450, category: 'Sides', imageUrl: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&q=80' },
    { _id: '6', name: 'Gathering Group Deal', description: 'Value deal for 5 persons including burgers, pizza, and drinks. (Promotional)', price: 1250, category: 'Deals', imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80' }
  ];

  try {
    // If not connected to MongoDB, serve fallback menu instantly without buffering timeout
    if (mongoose.connection.readyState !== 1) {
      console.log('Database not connected, serving fallback menu instantly.');
      return res.json(fallbackMenu);
    }

    const items = await MenuItem.find().maxTimeMS(800);
    // Return mock data if DB is empty to make the frontend look good immediately
    if (items.length === 0) {
      return res.json(fallbackMenu);
    }
    res.json(items);
  } catch (err) {
    console.log('Database error, serving fallback menu items:', err.message);
    res.json(fallbackMenu);
  }
});

// Add new menu item
router.post('/', async (req, res) => {
  const item = new MenuItem({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    imageUrl: req.body.imageUrl
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
