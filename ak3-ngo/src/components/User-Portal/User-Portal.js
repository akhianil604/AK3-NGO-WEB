import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import './User-Portal.css'
import RegisterPlea from "../Register-Plea";
import TasksContainer from "../Task-Container";

const UserPortal = ()=>{

  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({ 
      usercode : '',
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
        console.error("Error: ",error);
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
      console.error('Error fetching data:', error);
    });
  }, []);
  // console.log(userData)

  const [MyQueries, setMyQueries] = useState([]);

    
  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getUserQueries', {
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
        console.error(error);
      }
    };

    fetchData();
  }, []); 

  

  const [activeSection, setActiveSection] = useState('Profile')

  

/* function saveChanges() { //This should be replaced by the new api call
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const password = document.getElementById('password').value;
    const gender = document.getElementById('gender').value;
    const education = document.getElementById('education').value;
    const maritalStatus = document.getElementById('marital-status').value;
    document.querySelector('#Profile .left h4').innerText = name;
    document.querySelector('#Profile .info_data .data:nth-child(3) p').innerText = email;
    document.querySelector('#Profile .info_data .data:nth-child(4) p').innerText = phone;
    document.querySelector('#Profile .info_data .data:nth-child(5) p').innerText = gender;
    document.querySelector('#Profile .info_data .data:nth-child(6) p').innerText = education;
    document.querySelector('#Profile .info_data .data:nth-child(7) p').innerText = maritalStatus;
    document.querySelector('#Profile .info_data .data:nth-child(8) p').innerText = address;
    document.getElementById('password').value = '';
} */


  return (
    <div className="userPortalContainer">
      <nav>
        <ul>
          <li>
            <div className="logo">
              <span className="nav-item">{userData.usercode}</span>
            </div>
          </li>
          <li>
            <button onClick={() => setActiveSection("RegisterPlea")}>
              <i class="fa fa-home"></i>
              <span className="nav-item" id="Register-Plea">
                Register A Plea
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
            <button className="logout" onClick={()=>{
              sessionStorage.clear();
              navigate('/');
            }}>
              <i class="fa fa-sign-out" aria-hidden="true"></i>
              <span className="nav-item">Logout</span>
            </button>
          </li>
        </ul>
      </nav>

      <section className={activeSection === 'RegisterPlea' ? 'page-active' : 'page-hidden'} id="RegisterPlea">
        <RegisterPlea MyQueries={MyQueries} setMyQueries={setMyQueries} />
      </section>
      <section className={activeSection === 'Assigned' ? 'page-active' : 'page-hidden'} id="Assigned">
        <TasksContainer tasks={MyQueries} page="user"/>
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
              <button class="delete-btn">Delete</button>
              <button class="view-more-btn">View More</button>
            </div>
          </div>
          <div id="Accept">
            <button class="delete-btn">Delete</button>
            <p>
              Case <strong>Resolved</strong>
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
            <i class="fa fa-users" aria-hidden="true"></i>
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
                  <h4>Date of Birth:</h4>
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
                <div class="data">
                  <h4>Gender:</h4>
                  <p>{userData.gender}</p>
                </div>
                <div class="data">
                  <h4>Educational Qualification:</h4>
                  <p>{userData.education}</p>
                </div>
                <div class="data">
                  <h4>Marital Status:</h4>
                  <p>{userData.marital}</p>
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
              <input type="text" id="name" name="name" value={userFormData.name}  onChange={handleUserFormChange}/>
            </div>
            <div class="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={userFormData.email}  onChange={handleUserFormChange} />
            </div>
            <div class="form-group">
              <label htmlFor="phone">Phone:</label>
              <input type="text" id="phone" name="phone" value={userFormData.phone}  onChange={handleUserFormChange} />
            </div>
            <div class="form-group">
              <label htmlFor="address">Address:</label>
              <textarea id="address" name = "address" value={userFormData.address} onChange={handleUserFormChange}>
              </textarea>
            </div>
            <div class="form-group">
              <label htmlFor="password">New Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Enter new password"
                name="password"
                value={userFormData.password}
                onChange={handleUserFormChange}
              />
            </div>
            <div class="form-group">
              <label htmlFor="gender">Gender:</label>
              <select id="gender" name="gender" value={userFormData.gender} onChange={handleUserFormChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label htmlFor="marital-status">Marital Status:</label>
              <select id="marital-status" name="marital" value={userFormData.marital} onChange={handleUserFormChange}>
                <option value="Unmarried">Unmarried</option>
                <option value="Married">Married</option>
                <option value="Minor">Minor</option>
              </select>
            </div>
            <div class="form-group">
              <label htmlFor="education">Educational Qualification:</label>
              <select id="education" name="education" value={userFormData.education} onChange={handleUserFormChange}>
                <option value="None">Schooling Not Completed</option>
                <option value="Primary">10th Grade Pass</option>
                <option value="Secondary">12th Grade Pass</option>
                <option value="Diploma">Diploma</option>
                <option value="UG">Undergraduate</option>
                <option value="PG">Graduate/Postgraduate</option>
              </select>
            </div>
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

export default UserPortal;
