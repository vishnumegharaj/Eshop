import React from "react";
import './header.css';
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from "react-redux";

export default function Header() {
    const navigate = useNavigate();

    const token = localStorage.getItem('accessToken');
    function handleLogout() {
        localStorage.removeItem('accessToken');
        navigate('/'); // Redirect to login after logout
    }
    const cart = useSelector((state) => state.cart);

    return (
        <div className="header bg-color border-b">

            <div
                onClick={() => navigate("/Products")}
                className={"logo cursor-pointer"}>
                <ShoppingCartIcon style={{ fontSize: '40px' }} />
                E-Shop
            </div>
            <div>
                {token ? (
                    <div className="flex">
                        <button className="relative cart-btn buttonn" onClick={() => navigate("/cart")}>
                            <ShoppingCartIcon className="h-5 w-5 " />
                            { cart?.reduce((sum, item) => sum + item.cartItems.quantity, 0) > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                                    {cart?.reduce((sum, item) => sum + item.cartItems.quantity, 0)}
                                </span>
                            )}
                        </button>
                        <button className="logout-btn buttonn" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div className="flex">
                        <button className="login-btn buttonn" onClick={() => navigate("/")}>Login</button>
                        <button className="signup-btn buttonn" onClick={() => navigate("/signup")}>Signup</button>
                    </div>
                )}
            </div>
        </div>
    );
}
