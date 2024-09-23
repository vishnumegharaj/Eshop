import React from "react";
import './header.css';
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Header() {
    const navigate = useNavigate();

    const token = localStorage.getItem('accessToken');
    function handleLogout() {
        localStorage.removeItem('accessToken');
        navigate('/'); // Redirect to login after logout
    }

    return (
        <div className="header">

            <div className={"logo"}>
                <ShoppingCartIcon style={{ fontSize: '40px' }} />
                E-Shop
            </div>
            <div>
                {token ? (
                    <div className="flex">
                        <button className="cart-btn button" onClick={() => navigate("/cart")}>Cart</button>
                        <button className="logout-btn button" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div className="flex">
                        <button className="login-btn button" onClick={() => navigate("/")}>Login</button>
                        <button className="signup-btn button" onClick={() => navigate("/signup")}>Signup</button>
                    </div>
                )}
            </div>
        </div>
    );
}
