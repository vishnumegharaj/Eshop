const mongoose = require('mongoose');

const Cart = mongoose.model('cart', new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: true
    },
    cartItems: [
        {
            productId: {
                type: mongoose.Schema.ObjectId,
                ref: 'products',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            price: {
                type: Number,
                required: true
            },
        }
    ],
}, { timestamps: true }
));

module.exports = Cart;