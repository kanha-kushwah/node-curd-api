const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  mobile: Number,
  email: String,
  password:String,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
