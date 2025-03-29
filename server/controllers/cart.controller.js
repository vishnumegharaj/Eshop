const Cart = require('../models/cart.models');
const Products = require('../models/products.models');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

async function addToCart(req, res) {
    const { productId, price } = req.body;

    const token = req.header('Authorization');
    if (!token) {
        console.log("unauthorised");
        return res.status(401).send("Unauthorized, please login first");
    }
    const decodedToken = jwt.verify(token, '12345');
    const userId = decodedToken._id;

    var cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = new Cart({
            userId,
            cartItems: [{ productId, quantity: 1, price }]
        })
    } else {
        const itemIndex = cart.cartItems.findIndex(c => c.productId.toString() === productId);

        if (itemIndex > -1) {
            return res.status(400).json({ message: 'Product already in cart. Use update-cart to change quantity.' });
        } else {
            // Add new product to cart
            cart.cartItems.push({ productId, quantity: 1, price });
        }
    }
    await cart.save();
    res.send('Item added to cart');
}

async function updateCart(req, res) {
    const { productId, quantity } = req.body;
    const token = req.header('Authorization');
    if (!token) {
        console.log("unauthorised");
        return res.status(401).send("Unauthorized, please login first");
    }
    const decodedToken = jwt.verify(token, '12345');
    const userId = decodedToken._id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
        return res.status(400).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.cartItems.findIndex(c => c.productId.toString() === productId);
    if (itemIndex > -1) {
        if (quantity === 0) {
            cart.cartItems.splice(itemIndex, 1);
        } else {
            cart.cartItems[itemIndex].quantity = quantity;
        }
    } else {
        return res.status(400).json({ message: 'Product not found in cart' });
    }
    await cart.save();
    return res.status(200).json({ message: 'Cart updated' });
}

async function getCartByUserId(req, res) {
    const token = req.header('Authorization');
    if (!token) {
        console.log("unauthorised");
        return res.status(401).send("Unauthorized, please login first");
    }
    const decodedToken = jwt.verify(token, '12345');
    const userId = decodedToken._id;
    // const cart = await Cart.findOne({ userId });
    const cart = await Cart.aggregate([
        { $match: { userId: new ObjectId(userId) } },  // First, filter by userId
        { $unwind: "$cartItems" },  // Flatten cartItems array
        {
            $lookup: {
                from: "products",
                localField: "cartItems.productId",
                foreignField: "_id",
                as: "productDetails"
            }
        },
        { $unwind: "$productDetails" } // Flatten the productDetails array
    ]);
    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }
    res.send(cart);
}

async function deleteFromCart(req, res) {
    console.log("inside controller deleteFromCart");

    const { productId } = req.body;
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).send("Unauthorized, please login first");
    }

    try {
        const decodedToken = jwt.verify(token, '12345');
        const userId = decodedToken._id;

        // Convert productId to ObjectId
        const productIdObj = new mongoose.Types.ObjectId(productId);

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(400).json({ message: 'Cart not found' });
        }

        const initialLength = cart.cartItems.length;

        // Ensure proper ObjectId comparison
        cart.cartItems = cart.cartItems.filter(item => !item.productId.equals(productIdObj));

        // Mark cartItems as modified
        cart.markModified('cartItems');

        console.log("cart after delete", cart.cartItems);

        if (cart.cartItems.length === initialLength) {
            return res.status(400).json({ message: 'Product not found in cart' });
        }

        await cart.save();
        return res.status(200).json({ message: 'Product removed from cart' });

    } catch (error) {
        console.error("Error deleting from cart:", error);
        return res.status(500).json(error);
    }
}

async function increaseCount(req, res) {
    const { productId } = req.body;
    console.log(productId);
    const token = req.header('Authorization');
    if (!token) {
        console.log("unauthorised");
        return res.status(401).send("Unauthorized, please login first");
    }
    const decodedToken = jwt.verify(token, '12345');
    const userId = decodedToken._id;

    const cart = await Cart.findOne({ userId });
    const product = await Products.findById(productId);
    console.log("product", product);
    if (!cart) {
        return res.status(400).json({ message: 'Cart not found' });
    }


    const itemIndex = cart.cartItems.findIndex(c => c.productId.toString() === productId);
    if(cart.cartItems[itemIndex].quantity >= product.availableItems){
        console.log("inside Product quantity exceeds")
        return res.status(200).json({ message: 'Product quantity exceeds available items' });
    }
    if (itemIndex > -1) {
        cart.cartItems[itemIndex].quantity += 1;
        await cart.save();
        return res.status(200).json({ message: 'Cart updated' });
    } else {
        return res.status(400).json({ message: 'Product not found in cart' });
    }
}
async function decreaseCount(req, res) {
    const { productId } = req.body;
    const token = req.header('Authorization');
    if (!token) {
        console.log("unauthorised");
        return res.status(401).send("Unauthorized, please login first");
    }
    const decodedToken = jwt.verify(token, '12345');
    const userId = decodedToken._id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
        return res.status(400).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.cartItems.findIndex(c => c.productId.toString() === productId);
    if (itemIndex > -1) {
        if (cart.cartItems[itemIndex].quantity > 1) {
            cart.cartItems[itemIndex].quantity -= 1;
            await cart.save();
            return res.status(200).json({ message: 'Cart updated' });
        } else {
            return res.status(400).json({ message: 'Quantity cannot be less than 1' });
        }
    } else {
        return res.status(400).json({ message: 'Product not found in cart' });
    }
}

module.exports = {
    addToCart,
    updateCart,
    getCartByUserId,
    deleteFromCart,
    decreaseCount,
    increaseCount
}