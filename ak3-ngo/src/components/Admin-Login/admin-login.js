import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import '../login.css';

function AdminLogin() {

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
                body: JSON.stringify({...loginData, role: "admin"}), 
            });

            if (!response.ok) {
                const errorText = await response.text();  
                throw new Error(errorText);
            }
    
            const result = await response.json(); 
            sessionStorage.setItem('authToken', result.token)
            // sessionStorage.setItem('userid', loginData.usercode)
            console.log('Success:', result);
            navigate('/admin');
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="user-background"
            style={{
                background: "url('admin_image.jfif') no-repeat center center fixed",
                backgroundSize: "cover"
            }}>
            <section id="user-portal-header">
                <div className="header">
                    <h1>Welcome to the Admin Login</h1>
                    <p>This is the Admin portal.</p>
                    {/* <a href="/" className="back-btn">Go Back to (AK)<sup>3</sup>'s NGO Home Page</a> */}
                    {/* <Link to="/" className="back-btn">Go Back to (AK)<sup>3</sup>'s NGO Home Page</Link> */}
                </div>
            </section>

            <section id="admin-portal-login">
                <p className="aplf_h">Enter your Credentials</p>
                <form className="admin-portal-login-form">
                    <div className="aplf1">
                        <label htmlFor="ID">ID:</label>
                        <input type="text" id="ID" name="usercode" placeholder="ID" required 
                        value={loginData.usercode}
                        onChange={handleChange}/>
                    </div>

                    <div className="aplf2">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" placeholder="Password" required 
                        value={loginData.password}
                        onChange={handleChange}/>
                    </div>

                    <button type="submit" className="login-btn-u" onClick={handleSubmit}>Sign In</button>
                </form>
            </section>
        </div>
    );
}

export default AdminLogin;
