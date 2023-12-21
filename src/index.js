const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const itemRoutes = require('./routes/items');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

mongoose.connect('mongodb://localhost:27017/curd');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api', itemRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes); // Mount the new route
app.use('/api/products', productRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
