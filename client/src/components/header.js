import React from "react";
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
        <div className="sticky top-0 left-0  bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] flex items-center justify-between p-2 m-0 h-[60px] z-[1000]">
            <div className="text-[#E4E4E4] text-[34px] font-bold font-[Teko] italic flex items-center m-1">
                <ShoppingCartIcon className="text-white text-[40px]" />
                E-Shop
            </div>

            <div>
                {token ? (
                    <div className="flex items-center">
                        <button className="bg-[var(--primary-color)] text-white text-[16px] font-bold px-4 py-2 m-1 rounded-md transition-all duration-300 hover:scale-105" 
                            onClick={() => navigate("/cart")}>
                            Cart
                        </button>
                        <button className="bg-[var(--primary-color)] text-white text-[16px] font-bold px-4 py-2 m-1 rounded-md transition-all duration-300 hover:scale-105" 
                            onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center">
                        <button className="bg-[var(--primary-color)] text-white text-[16px] font-bold px-4 py-2 m-1 rounded-md transition-all duration-300 hover:scale-105" 
                            onClick={() => navigate("/")}>
                            Login
                        </button>
                        <button className="bg-[var(--primary-color)] text-white text-[16px] font-bold px-4 py-2 m-1 rounded-md transition-all duration-300 hover:scale-105" 
                            onClick={() => navigate("/signup")}>
                            Signup
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
