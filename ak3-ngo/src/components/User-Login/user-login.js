import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import '../login.css';

function UserLogin() {

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
                body: JSON.stringify({...loginData, role: "user"}), 
            });

            if (!response.ok) {
                const errorText = await response.text();  
                throw new Error(errorText);
            }
    
            const result = await response.json(); 
            sessionStorage.setItem('authToken', result.token)
            // sessionStorage.setItem('userid', loginData.usercode)
            console.log('Success:', result);
            navigate('/user');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };

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
                        <input type="text" id="ID" name="usercode" placeholder="ID given by the NGO" required 
                        value={loginData.usercode}
                        onChange={handleChange}/>
                    </div>

                    <div className="uplf2">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" placeholder="Password used during sign-up" required 
                        value={loginData.password}
                        onChange={handleChange}/>
                    </div>

                    <button type="submit" className="login-btn-u" onClick={handleSubmit}>Sign In</button>
                </form>
            </section>
        </div>
    );
}

export default UserLogin;
