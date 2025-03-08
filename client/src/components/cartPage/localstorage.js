import { getCart } from "../../api/cart";

export const loadState = async () => {
    try {
        console.log("inside loadState function");
        const serializedState = await getCart(); // Wait for the API response
        console.log("serializedState", serializedState);
        return serializedState || undefined; 
    } catch (err) {
        console.error("Error loading state:", err);
        return undefined;
    }
};


export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cart', serializedState);
    } catch (err) {
        console.error("Could not save state", err);
    }
};
