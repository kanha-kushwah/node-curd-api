const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Create
router.post('/adduser', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Read
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    const savedItem = await newItem.save();
    res.json(savedItem);
  }
});

// Update
router.put('/items/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Delete
router.delete('/items/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    res.json(deletedItem);
  } catch (error) {

    const savedItem = await newItem.save();
    res.json(savedItem);
  }
});

module.exports = router;
