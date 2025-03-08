import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";

import CartItems from "./cart-items"
import EmptyCart from "./empty-cart"
import CartSummary from "./cart-summary"

import './cart.css';

export default function Cart() {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function increaseCount(productId) {
        dispatch({
            type: 'INCREASE_COUNT',
            payload: {
                id: productId
            }
        });
    }

    function decreaseCount(productId) {
        dispatch({
            type: 'DECREASE_COUNT',
            payload: {
                id: productId
            }
        });
    }

    function removeItem(productId) {
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: {
                id: productId
            }
        });
    }

    const subtotal = cart?.reduce((sum, item) => sum + item.cartItems.price * item.cartItems.quantity, 0)

    console.log("cart", cart);
    const totalAmount = cart && cart?.reduce((acc, item) => acc + item.cartItems.price * item.cartItems.quantity, 0);
    return (

        <>

            {/* <div className="container-parent" >
                {
                    cart && cart?.cartItems && cart?.cartItems?.length > 0 ? (
                        <div className="container-parent">
                            <div className="cart-container">

                                {cart.cartItems.map((item) => (
                                    <div key={item.id} className="cart-details">
                                        <div className="flex">
                                            <div>
                                                <img src={item.imageURL} alt="" className="image" />
                                            </div>
                                            <div className="description single-line-text">
                                                <h3>{item.name}</h3>
                                                <p>{item.description}</p>
                                                <h3 className="color">${item.price}</h3>
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <span className="icons flex">
                                                <AddIcon style={{ cursor: 'pointer' }} onClick={() => increaseCount(item.id)} />
                                                <h3>{item.count}</h3>
                                                <RemoveIcon style={{ cursor: 'pointer' }} onClick={() => decreaseCount(item.id)} />
                                            </span>
                                            <div>
                                                <button type="button" className="remove-btn button" onClick={() => removeItem(item.id)}>Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>


                            <div className="cart-summary">
                                <h2 className="summary-title">Order Summary</h2>
                                <div className="summary-row">
                                    <span>Total ({cart.length} items)</span>
                                    <span className="summary-total">${totalAmount.toFixed(2)}</span>
                                </div>
                                <button
                                    className="checkout-button"
                                    onClick={() => navigate("/createOrder")}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    ) : <div className="empty-cart">
                        <ShoppingCartIcon className="empty-cart-icon" />
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven't added any items to your cart yet.</p>
                        <button className="button" onClick={() => navigate("/Products")}>Continue Shopping</button>
                    </div>
                }
            </div> */}


            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-50">
                <div className="container mx-auto px-4 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 5 }}
                        className="mb-8 flex items-center justify-between"
                    >
                        <h1 className="text-3xl font-bold text-indigo-900 md:text-4xl">
                            Your Cart
                            <span className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm text-indigo-800">
                                {cart?.reduce((sum, item) => sum + item.cartItems.quantity, 0)}
                            </span>
                        </h1>
                        {Array.isArray(cart) && cart.length > 0 && (
                            <button
                                // onClick={clearCart}
                                className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-800"
                            >
                                Clear all
                            </button>
                        )}
                    </motion.div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            {cart?.length > 0 ? (
                                <CartItems />
                            ) : (
                                <CartItems />
                                // <EmptyCart />

                            )}
                        </div>

                        {cart?.length > 0 && (
                            <div className="lg:col-span-1">
                                <CartSummary subtotal={subtotal} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>

    );
}
