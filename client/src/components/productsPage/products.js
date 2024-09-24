import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";


import './products.css';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [alignment, setAlignment] = useState('All');
    const [showCategories, setShowCategories] = useState(false);
    const API = process.env.REACT_APP_API;

    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    const handleAlignment = (newAlignment) => {
        setAlignment(newAlignment);
    };

    const toggleCategories = () => {
        setShowCategories(!showCategories);
    };

    const loadProducts = async () => {
        console.log("fetching product from server");
        try {
            const response = await fetch(API+"/api/products", {
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
            const response = await fetch(API+"/api/products/category", {
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

    useEffect(() => {
        loadProducts();
        loadCategories();
    }, []);

    const handleCardClickEvent = (productId) => {
        navigate(`/ProductDetail/${productId}`);
    };

    return (
        <div className="parent-container">
            <div className="hero">
                <h1>Welcome to E-Shop</h1>
                <p>
                    Your one-stop online store for the latest gadgets, fashion, and home essentials.<br />
                    Shop the best deals and enhance your everyday lifestyle.
                </p>
                <button className="button">Shop Now</button>
            </div>

            {/* Show toggle button only on mobile */}

            <button className="toggle-button margin" onClick={toggleCategories}>
                {showCategories ?
                    <>Hide Categories <FaChevronUp /> </>
                    :
                    <>Filter Categories  <FaChevronDown /></>
                }
            </button>

            <div className="toggle-button-group">

                {showCategories && (
                    <>
                        <button className={`toggle-button ${alignment === 'All' ? 'active' : ''}`} onClick={() => handleAlignment('All')}>All</button>
                        {categories.map(category => (
                            <button key={category} className={`toggle-button ${alignment === category ? 'active' : ''}`} onClick={() => handleAlignment(category)}>
                                {category}
                            </button>
                        ))}
                    </>
                )}
            </div>

            <h1>Featured Products</h1>
            <div className="product-container">
                {products.map((product) => {
                    if (alignment === 'All' || product.category === alignment) {
                        return (
                            <div className="cardComponent" key={product._id} onClick={() => handleCardClickEvent(product._id)}>
                                <img
                                    className="image"
                                    alt={product.name}
                                    style={{ height: 200, objectFit: 'contain' }}
                                    src={product.imageURL}
                                />
                                <div className="cardContent">
                                    <h2 className="single-line-text Playfair">{product.name}</h2>
                                    <p className="single-line-text Playfair">{product.description}</p>
                                    <h3 className="Playfair">
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                                            ${product.price} 
                                        </span>
                                    </h3>

                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}
