import React from 'react';
import { Link } from "react-router-dom";
import '../login.css';

function PoliceLogin() {
    return (
        <div className="police-background"
            style={{
                background: "url('Police_image.jpg') no-repeat center center fixed",
                backgroundSize: "cover"
            }}>
            <section id="police-portal-header">
                <div className="header">
                    <h1>Welcome to the Police Login</h1>
                    <p>This is the police portal where authorized personnel can access and review cases redirected by our NGO.</p>
                    {/* <a href="/" className="back-btn">Go Back to (AK)<sup>3</sup>'s NGO Home Page</a> */}
                    <Link to="/" className="back-btn">Go Back to (AK)<sup>3</sup>'s NGO Home Page</Link>
                </div>
            </section>

            <section id="police-portal-login">
                <p className="pplf_h">Enter your Credentials</p>
                <form className="police-portal-login-form">
                    <div className="pplf1">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" placeholder="Username" required />
                    </div>

                    <div className="pplf2">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" placeholder="Password" required />
                    </div>

                    <button type="submit" className="login-btn-p">Sign In</button>
                </form>
            </section>
        </div>
    );
}

export default PoliceLogin;
