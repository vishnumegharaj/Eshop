async function AddToCart(productId, price) {
    console.log("API URL:");
    const API = process.env.REACT_APP_API;
    console.log("API URL:", API);
    try {
        const token = localStorage.getItem('accessToken');
  
        const response = await fetch(API + "/api/cart/Add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                productId: productId,
                price: price
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Added to cart: ", data);
        return data;
    } catch (error) {
        console.error("Failed to add to cart: ", error);
    }
    
}

async function getCart() {
    const API = process.env.REACT_APP_API;
    try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(API + "/api/cart/GetByUserId", {
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
        console.log("Cart: ", data);
        return data;
    } catch (error) {
        console.error("Failed to get cart: ", error);
    }
}

async function removeFromCart(productId) {
    const API = process.env.REACT_APP_API;
    try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(API + "/api/cart/delete", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                productId: productId
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Removed from cart: ", data);
        return data;
    } catch (error) {
        console.error("Failed to remove from cart: ", error);
    }
}

export { AddToCart , getCart, removeFromCart };