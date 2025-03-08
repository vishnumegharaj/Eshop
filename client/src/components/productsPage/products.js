import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AddToCart } from "../../api/cart";
import { MdCurrencyRupee } from "react-icons/md";

import { removeFromCart } from "../../api/cart";
import { loadState } from "../cartPage/localstorage";

// import './products.css';

export default function Products() {
    const [products, setProducts] = useState([]);
    const cart = useSelector((state) => state.cart);
    useEffect(() => {
        console.log("cart in poduct page ", cart);
    }, [cart]);

    const [categories, setCategories] = useState([]);
    const [alignment, setAlignment] = useState('All');
    const [showCategories, setShowCategories] = useState(false);
    const API = process.env.REACT_APP_API;

    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAlignment = (newAlignment) => {
        setAlignment(newAlignment);
    };

    const toggleCategories = () => {
        setShowCategories(!showCategories);
    };

    const loadProducts = async () => {
        console.log("fetching product from server");
        try {
            const response = await fetch(API + "/api/products", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProducts(data);

        } catch (error) {
            console.error("Failed to fetch products: ", error);
        }
    };

    const loadCategories = async () => {
        console.log("fetching categories from server");
        try {
            const response = await fetch(API + "/api/products/category", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Failed to fetch categories: ", error);
        }
    };

    async function handleAddToCart(productId, price) {
        console.log("Adding to cart: ", productId, price);
        await AddToCart(productId, price);

        loadState().then((loadedState) => {
            if (loadedState) {
                dispatch({
                    type: 'INITIALIZE_CART',
                    payload: loadedState
                });
            }
        }).catch(error => {
            console.error("Error adding to cart:", error);
        });
    }


    useEffect(() => {
        loadProducts();
        loadCategories();
    }, []);

    const handleCardClickEvent = (productId) => {
        navigate(`/ProductDetail/${productId}`);
    };

    return (
        <div className=" my-8 px-10 bg-color">
            <div className="relative">
                <div className="absolute inset-0">
                    <img
                        className="w-full h-[484px] object-cover"
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
                        alt="Hero"
                    />
                    <div className="absolute inset-0 bg-gray-900 opacity-40"></div>
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl text-left">
                        Discover Your Style
                    </h1>
                    <p className="mt-6 text-xl text-white max-w-3xl text-left">
                        Discover amazing products from top brands at unbeatable prices. Shop now and experience the difference!
                    </p>
                    <div className="mt-10 text-left">
                        <button className="bg-secondary text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300">
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>


            <button className="bg-gray-200 text-black py-2 px-4 rounded mt-8 flex items-center justify-center gap-2" onClick={toggleCategories}>
                {showCategories ? <>Hide Categories <FaChevronUp /></> : <>Filter Categories <FaChevronDown /></>}
            </button>

            <div className="flex flex-wrap items-center justify-center gap-2 my-5">
                {showCategories && (
                    <>
                        <button className={`py-2 px-4 rounded ${alignment === 'All' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-black'}`} onClick={() => handleAlignment('All')}>All</button>
                        {categories.map(category => (
                            <button key={category} className={`py-2 px-4 rounded ${alignment === category ? 'bg-purple-500 text-white' : 'bg-gray-200 text-black'}`} onClick={() => handleAlignment(category)}>
                                {category}
                            </button>
                        ))}
                    </>
                )}
            </div>

            {/* Featured Products */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 bg-color">
                    {products.map((product) => {
                        if (alignment === 'All' || product.category === alignment) {
                            return (
                                <>
                                    <div
                                        key={product.id}
                                        // onClick={() => handleCardClickEvent(product._id)}
                                        className="bg-white border rounded-lg  overflow-hidden"
                                    >
                                        <img
                                            src={product.imageURL}
                                            alt={product.name}
                                            style={{ height: 300, objectFit: 'contain' }}
                                            className="w-full h-min object-cover"
                                        />
                                        <div className="p-6">
                                            <span className="inline-block px-2 py-1 mb-2 text-sm font-medium text-secondary bg-indigo-100  rounded-full">
                                                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                                            </span>
                                            <h3 class="text-xl font-semibold leading-tight text-gray-900">{product.name}</h3>

                                            {/* <div className="flex items-center mt-2">
                                             {[...Array(5)].map((_, i) => (
                                                 <FaStar
                                                     key={i}
                                                     className={`${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"} w-5 h-5`}
                                                  />
                                             ))}
                                               <span className="ml-2 text-gray-600 dark:text-gray-300">{product.rating}</span>
                                                  </div> */}
                                            <div className=" w-full">
                                                <p className="text-2xl font-extrabold leading-tight text-gray-900 block">${product.price}</p>
                                                <button
                                                    onClick={() => handleAddToCart(product._id, product.price)}
                                                    type="button"
                                                    className="mt-2 w-full max-w-[100%] inline-flex items-center justify-center rounded-lg btn px-5 py-2.5 text-sm font-medium text-white transform hover:scale-105 transition duration-300 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-secondary"
                                                >
                                                    <svg className="h-5 w-5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                                                    </svg>
                                                    {cart?.some((item) => item?.productDetails?._id == product._id) ? "Added to Cart" : "Add to cart"}
                                                    {console.log("product", product._id)}
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        }
                    })}
                </div>
            </div>


        </div>
    );
}
