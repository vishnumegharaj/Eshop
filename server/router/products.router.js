const express = require('express');
const router = express.Router();
const authorize = require('../middleware/auth')

const {getProducts, getProductById, getProductCategory} = require('../controllers/products.controller')

router.get('/category',authorize, getProductCategory);
router.get('/:id', getProductById );
router.get('/', authorize, getProducts);

module.exports = router;
