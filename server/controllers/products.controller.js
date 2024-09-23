const Products = require('../models/products.models');

async function getProducts( req, res) {
    const products = await Products.find({});
    res.send(products);
}

async function getProductCategory(req, res) {
    const categories = await Products.distinct('category');
    res.send(categories);
}

async function getProductById(req, res) {
    const product = await Products.findById(req.params.id);

    if (!product) {
        res.status(404).send(`Product with id ${req.params.id} not found`);
        return;
    }

    res.send(product);
}

module.exports = {
    getProducts,
    getProductCategory,
    getProductById
}