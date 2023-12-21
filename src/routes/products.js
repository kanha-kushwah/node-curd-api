const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const multer = require('multer');
const path = require('path');




// Middleware to validate product ID
const validateProductID = (req, res, next) => {
    const productId = req.params.productId;
  
    // Validate that the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID format.' });
    }
  
    next();
  };


  router.get('/:productId', validateProductID, async (req, res) => {
    try {
      const productId = req.params.productId;
  
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
      }
  
      res.json({
        id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        stock: product.stock,
        brand: product.brand,
        category: product.category,
        thumbnail: product.thumbnail,
        images: product.images,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  



// Middleware to validate product data
const validateProductData = (req, res, next) => {
  const { title, description, price, discountPercentage, rating, stock, brand, category } = req.body;

  if (!title || !description || !price || !discountPercentage || !rating || !stock || !brand || !category) {
    return res.status(400).json({ message: 'Product data is incomplete.' });
  }

  next();
};

// Multer middleware to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});

const upload = multer({ storage: storage });

// Create a new product with image upload
router.post('/', upload.single('image'), validateProductData, async (req, res) => {
  try {
    const { title, description, price, discountPercentage, rating, stock, brand, category } = req.body;

    const imagePath = req.file ? `uploads/${req.file.filename}` : null;

    const newProduct = new Product({
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      image: imagePath, 
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({ message: 'Product created successfully', product: savedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all products with pagination
router.get('/', async (req, res) => {
  try {
    const { skip = 0, limit = 30 } = req.query;

    const products = await Product.find().skip(parseInt(skip)).limit(parseInt(limit));
    const totalProducts = await Product.countDocuments();

    res.json({
      products,
      total: totalProducts,
      skip: parseInt(skip),
      limit: parseInt(limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
