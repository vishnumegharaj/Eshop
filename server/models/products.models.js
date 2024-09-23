const mongoose = require('mongoose');

const Products = mongoose.model('products', new mongoose.Schema({
    name: String,
    category: String,
    manufacturer: String,
    description: String,
    price: Number,
    imageURL: String,
    availableItems: Number
}, { timestamps: true }
));

module.exports = Products;