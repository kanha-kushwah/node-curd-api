const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to check for a valid token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get the token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'your_secret_key');
    req.user = decoded; // Store the decoded user information in the request object
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

// Protected route
router.get('/', verifyToken, (req, res) => {
  // Access the decoded user information from the request object
  const userId = req.user.userId;
  
  // Return some data
  res.json({ message: `Welcome, user ${userId}! This is a protected route.` });
});

module.exports = router;
