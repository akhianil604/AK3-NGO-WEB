import React from 'react';
import { Link } from "react-router-dom";
import '../login.css';

function UserLogin() {
    return (
        <div className="user-background"
            style={{
                background: "url('User_image.jpg') no-repeat center center fixed",
                backgroundSize: "cover"
            }}>
            <section id="user-portal-header">
                <div className="header">
                    <h1>Welcome to the User Login</h1>
                    <p>This is the user portal where individuals can track their registered pleas and access other services offered by our NGO.</p>
                    {/* <a href="/" className="back-btn">Go Back to (AK)<sup>3</sup>'s NGO Home Page</a> */}
                    <Link to="/" className="back-btn">Go Back to (AK)<sup>3</sup>'s NGO Home Page</Link>
                </div>
            </section>

            <section id="user-portal-login">
                <p className="uplf_h">Enter your Credentials</p>
                <form className="user-portal-login-form">
                    <div className="uplf1">
                        <label htmlFor="ID">ID:</label>
                        <input type="text" id="ID" name="ID" placeholder="ID given by the NGO" required />
                    </div>

                    <div className="uplf2">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" placeholder="Password used during sign-up" required />
                    </div>

                    <button type="submit" className="login-btn-u">Sign In</button>
                </form>
            </section>
        </div>
    );
}

export default UserLogin;
