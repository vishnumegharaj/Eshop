import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useNavigate } from "react-router-dom";

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
    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.count, 0);
    return (
        <div className="container-parent" >
           
            {
                cart && cart.length > 0 ? (
                    <div className="container-parent">
                        <div className="cart-container">

                            {cart.map((item) => (
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
                                            <AddIcon style={{cursor:'pointer'}} onClick={() => increaseCount(item.id)} />
                                            <h3>{item.count}</h3>
                                            <RemoveIcon style={{cursor:'pointer'}} onClick={() => decreaseCount(item.id)} />
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
        </div>
    );
}
