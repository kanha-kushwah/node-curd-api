const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const itemRoutes = require('./routes/items');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const productRoutes = require('./routes/products');
const serverless = require('serverless-http')
const app = express();
const PORT = process.env.PORT || 4000;
const router = express.Router();

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

mongoose.connect('mongodb+srv://kanha:uYmWj2Cd8jgLwiOq@curd.5l0j1v5.mongodb.net/');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api', itemRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes); // Mount the new route
app.use('/api/products', productRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/.netlify/src/api' ,router)
module.exports.handler = serverless(app);