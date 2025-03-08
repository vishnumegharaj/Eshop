import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./productDetail.css";

export default function ProductDetail() {
    const { productId } = useParams();
    const cart = useSelector(state => state.cart);
    const isInCart = cart?.find( item => item.id === productId )
    const API = process.env.REACT_APP_API;

    const dispatch = useDispatch();

    const [product, setProduct] = useState();

    async function loadProduct() {
        const response = await fetch(API+"/api/products/" + productId);
        const data = await response.json();
        setProduct(data);
        console.log(data);
        console.log(product);
    }

    function HandleCartEvent(e) {
        e.stopPropagation();
        if (cart.includes(productId)) {
    
        } else {
            dispatch({
                type: 'ADD_TO_CART',
                payload: {
                    id: productId,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    imageURL: product.imageURL,
                    availableItems: product.availableItems,
                    count: 1
                } 
            });

            setTimeout(() => {
                const updatedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
                updatedCart.push({
                    id: productId,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    imageURL: product.imageURL,
                    availableItems: product.availableItems,
                    count: 1
                });
                localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            }, 100); // Delay to ensure state update
        }
    }

    useEffect(() => {
        loadProduct();
    }, []);


    return (
        <div className="cart">
            {product && (
                < >

                    <img className="cart-image" src={product.imageURL} />
                    <div className="space-inBetween">
                        <div>
                            <h2>{product.name}</h2>
                            <h3>Price: ${product.price}/-</h3>
                            {product.manufacturer && (
                                <p> Manufacturer: {product.manufacturer}</p>
                            )}

                            <p> Description: {product.description}</p>
                            <p> Available Items: {product.availableItems}</p>

                        </div>
                        <div>
                            <h3 className="color">  ${product.price}</h3>
                            <button
                                className="order-btn"
                                onClick={(e) => HandleCartEvent(e)}
                                style={{ backgroundColor: isInCart ?  'var(--secondary-color)' :  'var(--primary-color)' }}
                            >
                                {isInCart ? 'added to cart' : 'Add to cart'}
                            </button>
                        </div>

                    </div>
                </>
            )}
        </div>
    )
}