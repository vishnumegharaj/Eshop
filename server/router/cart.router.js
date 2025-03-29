const express = require('express');
const router = express.Router();
const authorize = require('../middleware/auth')

const { addToCart, updateCart, getCartByUserId, deleteFromCart, increaseCount, decreaseCount } = require('../controllers/cart.controller')
console.log("cart router");
debugger;
router.get('/GetByUserId', authorize, getCartByUserId);
router.post('/Add',authorize, addToCart);
router.put('/Update', authorize, updateCart);
router.delete('/delete', deleteFromCart);
router.put('/increaseCount', authorize, increaseCount);
router.put('/decreaseCount', authorize, decreaseCount);

module.exports = router;