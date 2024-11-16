import React, { useState } from 'react';
import { Link, useNavigate} from "react-router-dom";
import '../login.css';

function PoliceLogin() {

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
                body: JSON.stringify({...loginData, role: "police"}), 
            });

            if (!response.ok) {
                const errorText = await response.text();  
                throw new Error(errorText);
            }
    
            const result = await response.json(); 
            sessionStorage.setItem('authToken', result.token)
            // sessionStorage.setItem('userid', loginData.usercode)
            console.log('Success:', result);
            navigate('/police');
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };

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
                        <input type="text" id="username" name="usercode" placeholder="Username" required 
                        value={loginData.usercode}
                        onChange={handleChange}/>
                    </div>

                    <div className="pplf2">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" placeholder="Password" required 
                        value={loginData.password}
                        onChange={handleChange}/>
                    </div>

                    <button type="submit" className="login-btn-p" onClick={handleSubmit}>Sign In</button>
                </form>
            </section>
        </div>
    );
}

export default PoliceLogin;
