import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./form.css";

export default function SignUp() {
    const [name, setname] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [contactNumber, setContactNumber] = useState();
    const [loading, setLoading] = useState(false); // Loader state
    const API = process.env.REACT_APP_API;

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            navigate('/Products');
        }
    })

    async function onFormSubmit(e) {
        setLoading(true); // Start loading
        e.preventDefault();
        const response = await fetch(API + "/api/auth/signup", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: name,
                password: password,
                email: email,
                contactNumber: contactNumber
            })
        });

        if (!response.ok) {
            throw new Error('signup failed' + response.statusText);
        }

        navigate('/');
        toast.success("User sucessfully created, Login now")
        setLoading(false); // Stop loading

    }

    return (
        <div className="auth-container">
            <div className="signup-component">
                <h2 className="m-6 text-center text-2xl font-bold text-gray-900">Create your account</h2>

                <form className="form" onSubmit={onFormSubmit}>
                    <label htmlFor="name" className="text">Username:</label>
                    <input type="type" className="inputField" placeholder="Enter your username..." onChange={(e) => setname(e.target.value)} />

                    <label htmlFor="email" className="text">Email:</label>
                    <input type="email" className="inputField" id="email" placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} required />

                    <label htmlFor="password" className="text">Password:</label>
                    <input type="password" className="inputField" id="password" placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)} required />

                    <label htmlFor="password" className="text"> Confirm Password:</label>
                    <input type="password" className="inputField" id="password" placeholder=" Confirm Password" required />

                    <label htmlFor="number" className="text">Contact Number: </label>
                    <input type="text" className="inputField" placeholder="Enter your Contact Number" onChange={(e) => setContactNumber(e.target.value)} required />

                    <button className="btnn">
                        {loading ? (
                            // Loader should be here when loading is true
                            <div className="flex justify-center items-center">
                                <div className="animate-spin ease-linear rounded-full w-7 h-7 border-t-2 border-b-2 border-white "></div>
                            </div>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>

            </div>
        </div >
    )
}