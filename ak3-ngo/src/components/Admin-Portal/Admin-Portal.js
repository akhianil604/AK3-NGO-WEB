import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Admin-Portal.css'
import "../Register-Plea";
import TasksContainer from "../Task-Container";

const AdminPortal = () => {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        usercode: '',
    });

    const [MyQueries, setMyQueries] = useState([]);

    const [PendingQueries, setPendingQueries] = useState([]);

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

    const sendToPolice = async (task) => {
        try {
            const token = sessionStorage.getItem('authToken');
            // console.log(token, task);
            const response = await fetch('http://localhost:5000/api/sendQueryToRole', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify({ queryId: task._id, targetRole: 'police' })
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

    const sendToNGO = async (task) => {
        try {
            const token = sessionStorage.getItem('authToken');
            // console.log(token, task);
            const response = await fetch('http://localhost:5000/api/sendQueryToRole', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify({ queryId: task._id, targetRole: 'ngo' })
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

    const deleteQuery = async (task) => {
        try {
            const token = sessionStorage.getItem('authToken');
            // console.log(token, task);
            const response = await fetch('http://localhost:5000/api/deleteQuery', {
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

    const [activeSection, setActiveSection] = useState('Pending')

    return (
        <div className="AdminPortalContainer">
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
                <TasksContainer tasks={PendingQueries} page="admin-pending" handlers={{acceptQuery, sendToPolice, sendToNGO, deleteQuery}}/>
            </section>
            <section className={activeSection === 'Assigned' ? 'page-active' : 'page-hidden'} id="Assigned">
                <TasksContainer tasks={MyQueries} page="admin-assigned" handlers={{resolveQuery, rejectQuery}}/>
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

export default AdminPortal;
