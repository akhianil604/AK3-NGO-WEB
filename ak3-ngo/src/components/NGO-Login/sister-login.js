import React, { useState, useEffect } from 'react';
import { Link, useNavigate} from "react-router-dom";
import '../login.css';

function SisterLogin() {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        usercode: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
          ...loginData,
          [name]: value,
        });
    };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData), 
            });

            if (!response.ok) {
                const errorText = await response.text();  
                throw new Error(errorText);
            }
    
            const result = await response.json(); 
            sessionStorage.setItem('authToken', result.token)
            // sessionStorage.setItem('userid', loginData.usercode)
            console.log('Success:', result);
            navigate('/sister-ngo');
        } catch (error) {
            console.error(error);
        }
    };

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
                        <input type="text" id="username" name="usercode" placeholder="Username" required
                        value={loginData.usercode}
                        onChange={handleChange}/>
                    </div>

                    <div className="splf2">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" placeholder="Password" required 
                        value={loginData.password}
                        onChange={handleChange}/>
                    </div>

                    <button type="submit" className="login-btn-s" onClick={handleSubmit}>Sign In</button>
                </form>
            </section>
        </div>
    );
}

export default SisterLogin;
