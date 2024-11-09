import React from 'react';
import { Link } from "react-router-dom";
import '../login.css';

function SisterLogin() {
    return (
        <div className="sister-background" 
            style={{
                background: "url('Sister_image.png') no-repeat center center fixed",
                backgroundSize: "cover"
            }}>
            <section id="sister-portal-header">
                <div className="header">
                    <h1>Welcome to the Sister Login</h1>
                    <p>This is the sister portal where you can access resources and information for our NGO’s sister-concern entities.</p>
                    {/* <a href="/" className="back-btn">Go Back to (AK)<sup>3</sup>'s NGO Home Page</a> */}
                    <Link to="/" className="back-btn">Go Back to (AK)<sup>3</sup>'s NGO Home Page</Link>
                </div>
            </section>

            <section id="sister-portal-login">
                <p className="splf_h">Enter your Credentials</p>
                <form className="sister-portal-login-form">
                    <div className="splf1">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" placeholder="Username" required />
                    </div>

                    <div className="splf2">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" placeholder="Password" required />
                    </div>

                    <button type="submit" className="login-btn-s">Sign In</button>
                </form>
            </section>
        </div>
    );
}

export default SisterLogin;