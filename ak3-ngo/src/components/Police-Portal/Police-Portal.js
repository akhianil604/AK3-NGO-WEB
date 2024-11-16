import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Police-Portal.css'
import "../Register-Plea";
import TasksContainer from "../Task-Container";

const PolicePortal = () => {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        usercode: '',
        name: '',
        gender: '',
        dob: '',
        email: '',
        phone: '',
        education: '',
        marital: '',
        address: '',
    });

    const [userFormData, setUserFormData] = useState({
        name: '',
        gender: '',
        dob: '',
        email: '',
        phone: '',
        education: '',
        marital: '',
        address: '',
        password: ''
    });
    
    const [MyQueries, setMyQueries] = useState([]);

    const [PendingQueries, setPendingQueries] = useState([]);

    const handleUserFormChange = (e) => {
        const { name, value } = e.target;
        setUserFormData({
            ...userFormData,
            [name]: value,
        });
    };

    const handleUserFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = sessionStorage.getItem('authToken');
            const response = await fetch('http://localhost:5000/api/updateUserDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify(userFormData),  // Send user data as JSON
            });

            // Check if the response is okay
            if (!response.ok) {
                const errorText = await response.text();  // Get response text if there's an error
                throw new Error(errorText);
            }

            const result = await response.text();  // Parse the JSON response
            console.log('Success:', result);
            alert('Saved new details');
        } catch (error) {
            alert("Error: ", error);
        }
    };

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        fetch('http://localhost:5000/api/getUserDetails', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            }
        })
            .then(response => response.json())
            .then(userDetails => {
                setUserData(userDetails);
                setUserFormData({
                    name: userDetails.name,
                    gender: userDetails.gender,
                    dob: userDetails.dob,
                    email: userDetails.email,
                    phone: userDetails.phone,
                    education: userDetails.education,
                    marital: userDetails.marital,
                    address: userDetails.address,
                    password: ''
                })
            })
            .catch(error => {
                alert('Error fetching data:', error);
            });
    }, []);


    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/getPendingQueries', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }

                const result = await response.json();
                setPendingQueries(result);
            } catch (error) {
                alert(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/getAssignedQueries', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }

                const result = await response.json();
                setMyQueries(result);
            } catch (error) {
                alert(error);
            }
        };

        fetchData();
    }, []);

    const acceptQuery = async (task) => {
        try {
            const token = sessionStorage.getItem('authToken');
            // console.log(token, task);
            const response = await fetch('http://localhost:5000/api/acceptQuery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify({ queryId: task._id })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            setMyQueries(prevQueries => [...prevQueries, task]);
            setPendingQueries(prevQueries => prevQueries.filter(query => query._id !== task._id));

        } catch (error) {
            alert('Error occurred:', error);
        }
    };

    const sendToAdmin = async (task) => {
        try {
            const token = sessionStorage.getItem('authToken');
            // console.log(token, task);
            const response = await fetch('http://localhost:5000/api/sendQueryToRole', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify({ queryId: task._id, targetRole: 'admin' })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
            // console.log(task);
            setPendingQueries(prevQueries => prevQueries.filter(query => query._id !== task._id));

        } catch (error) {
            alert('Error occurred:', error);
        }
    };

    const resolveQuery = async (task) => {
        try {
            const token = sessionStorage.getItem('authToken');
            // console.log(token, task);
            const response = await fetch('http://localhost:5000/api/resolveQuery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify({ queryId: task._id })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            setMyQueries(prevQueries => prevQueries.filter(query => query._id !== task._id));

        } catch (error) {
            alert('Error occurred:', error);
        }
    };

    const rejectQuery = async (task) => {
        try {
            const token = sessionStorage.getItem('authToken');
            // console.log(token, task);
            const response = await fetch('http://localhost:5000/api/rejectQuery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify({ queryId: task._id })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            setPendingQueries(prevQueries => [...prevQueries, task]);
            setMyQueries(prevQueries => prevQueries.filter(query => query._id !== task._id));

        } catch (error) {
            alert('Error occurred:', error);
        }
    };

    const [activeSection, setActiveSection] = useState('Profile')

    return (
        <div className="policePortalContainer">
            <nav>
                <ul>
                    <li>
                        <div className="logo">
                            <span className="nav-item">{userData.usercode}</span>
                        </div>
                    </li>
                    <li>
                        <button onClick={() => setActiveSection("Pending")}>
                            <i class="fa fa-home"></i>
                            <span className="nav-item" id="Pending-Query">
                                Pending Queries
                            </span>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setActiveSection("Assigned")}>
                            <i class="fa fa-check-circle" aria-hidden="true"></i>
                            <span className="nav-item" id="My-Query">
                                My Queries
                            </span>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setActiveSection("HowToUse")}>
                            <i class="fa fa-question-circle"></i>
                            <span className="nav-item">How to Use?</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setActiveSection("Profile")}>
                            <i class="fa fa-user-secret" aria-hidden="true"></i>
                            <span className="nav-item">My Profile</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setActiveSection("Settings")}>
                            <i class="fa fa-cog"></i>
                            <span className="nav-item">Settings</span>
                        </button>
                    </li>
                    <li>
                        <button className="logout" onClick={() => {
                            sessionStorage.clear();
                            navigate('/');
                        }}>
                            <i class="fa fa-sign-out" aria-hidden="true"></i>
                            <span className="nav-item">Logout</span>
                        </button>
                    </li>
                </ul>
            </nav>

            <section className={activeSection === 'Pending' ? 'page-active' : 'page-hidden'} id="Pending">
                <TasksContainer tasks={PendingQueries} page="police-pending" handlers={{acceptQuery, sendToAdmin}}/>
            </section>
            <section className={activeSection === 'Assigned' ? 'page-active' : 'page-hidden'} id="Assigned">
                <TasksContainer tasks={MyQueries} page="police-assigned" handlers={{resolveQuery, rejectQuery}}/>
            </section>
            <section className={activeSection === 'HowToUse' ? 'page-active' : 'page-hidden'} id="HowToUse">
                <div className="home-use">
                    <h1 id="MyQueries">My Queries</h1>
                    <div class="main-skills">
                        <div class="task-block-card">
                            <h3 class="task-title">Case Name</h3>
                            <p class="task-category">
                                <strong>Category:</strong>Category Name
                            </p>
                            <button class="accept-btn">Resolved</button>
                            <button class="reject-btn">Decline</button>
                            <button class="view-more-btn">View More</button>
                        </div>
                    </div>
                    <div id="Accept">
                        <button class="accept-btn">Resolved</button>
                        <p>
                            Case <strong>Resolved</strong>
                        </p>
                    </div>
                    <div id="Reject">
                        <button class="reject-btn">Decline</button>
                        <p>
                            Sends Query back to <strong>Pending Tasks</strong>
                        </p>
                    </div>
                    <div id="View-More">
                        <button class="view-more-btn">View More</button>
                        <p>
                            Opens a <strong>Modal Window</strong> to View Query Details
                        </p>
                    </div>
                    {/* Add remaining content here */}
                </div>
            </section>
            <section className={activeSection === 'Profile' ? 'page-active' : 'page-hidden'} id="Profile">
                <div className="wrapper">
                    <div className="left">
                        <i class="fa fa-user-secret"></i>
                        <h4>{userData.name}</h4>
                        <p>{userData.usercode}</p>
                    </div>
                    <div className="right">
                        <div class="info">
                            <h3>Information</h3>
                            <div class="info_data">
                                <div class="data">
                                    <h4>Name:</h4>
                                    <p>{userData.name}</p>
                                </div>
                                <div class="data">
                                    <h4>Date of Establishment:</h4>
                                    <p>{new Date(userData.dob).toLocaleDateString('en-GB')}</p>
                                </div>
                                <div class="data">
                                    <h4>Email:</h4>
                                    <p>{userData.email}</p>
                                </div>
                                <div class="data">
                                    <h4>Phone:</h4>
                                    <p>{userData.phone}</p>
                                </div>
                            </div>
                            <div class="projects">
                                <h3>Reach Out</h3>
                                <div class="projects_data">
                                    <div class="data">
                                        <h4>Permanant & Mailing Address</h4>
                                        <p>{userData.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Add remaining profile data here */}
                    </div>
                </div>
            </section>
            <section className={activeSection === 'Settings' ? 'page-active' : 'page-hidden'} id="Settings">
                <div className="wrapper-settings">
                    <form id="settingsForm">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" value={userFormData.name} onChange={handleUserFormChange} />
                        </div>
                        <div class="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" value={userFormData.email} onChange={handleUserFormChange} />
                        </div>
                        <div class="form-group">
                            <label htmlFor="phone">Phone:</label>
                            <input type="text" id="phone" value={userFormData.phone} onChange={handleUserFormChange} />
                        </div>
                        <div class="form-group">
                            <label htmlFor="address">Address:</label>
                            <textarea id="address" value={userFormData.address} onChange={handleUserFormChange}>
                            </textarea>
                        </div>
                        <div class="form-group">
                            <label htmlFor="password">New Password:</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter new password"
                                value={userFormData.password}
                                onChange={handleUserFormChange}
                            />
                        </div>
                        {/* <div class="form-group">
                            <label htmlFor="gender">Gender:</label>
                            <select id="gender">
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="O">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label htmlFor="marital-status">Marital Status:</label>
                            <select id="marital-status">
                                <option value="Unmarried">Unmarried</option>
                                <option value="Married">Married</option>
                                <option value="Minor">Minor</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label htmlFor="education">Educational Qualification:</label>
                            <select id="education">
                                <option value="Undergraduate">Undergraduate</option>
                                <option value="Postgraduate">Postgraduate</option>
                                <option value="Doctorate">Doctorate</option>
                                <option value="Diploma">Diploma</option>
                            </select>
                        </div> */}
                        {/* Add remaining settings form fields */}
                        <div class="form-group">
                            <button type="button" onClick={handleUserFormSubmit}>
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Modal structure */}
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close">&times;</span>
                    <h2 id="modalTitle">Modal Title</h2>
                    <p id="modalCategory">
                        Category: <span id="modalCategoryValue"></span>
                    </p>
                    <p id="modalDescription">
                        Description: <span id="modalDescriptionValue"></span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PolicePortal;
