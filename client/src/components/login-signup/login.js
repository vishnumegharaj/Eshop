
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";

export default function Login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false); // Loader state
    const navigate = useNavigate();
    const API = process.env.REACT_APP_API;


    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            navigate('/Products');
        }
    })

    async function onFormSubmit(e) {
        console.log("API is ", API);
        setLoading(true); // Start loading
        e.preventDefault();
        try {
            const response = await fetch(API + '/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }
            const data = await response.json();



            const accessToken = data.authToken // Retrieve the token
            console.log(accessToken);
            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
                console.log("Access Token stored in localStorage:", localStorage.getItem('accessToken'));
            } else {
                console.log('Access token not found in the response.');
            }
            navigate('/Products');
        } catch (err) {
            console.log(err);
        }
        setLoading(false); // Stop loading
    }

    return (
        <div className="auth-container">
            <div className="signup-component">
                <h2 className="m-6 text-center text-2xl font-bold text-gray-900">Sign in to your account</h2>

                <form className="form" onSubmit={onFormSubmit}>
                    <label htmlFor="email" className="text">Email:</label>
                    <input
                        type="email"
                        className="inputField"
                        id="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password" className="text">Password:</label>
                    <input
                        type="password"
                        className="inputField"
                        id="password"
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button className="btnn">
                        {loading ? (
                            // Loader should be here when loading is true
                            <div className="flex justify-center items-center">
                            <div className="animate-spin ease-linear rounded-full w-7 h-7 border-t-2 border-b-2 border-white "></div>
                        </div>
                        ) : (
                           "LogIn"
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
}
