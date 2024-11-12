import React, { useState, useEffect } from "react";
import './Police-Portal.css'
import "../Register-Plea";
import TasksContainer from "../Task-Container";

const PolicePortal = ()=>{
  
  const [MyQueries, setMyQueries] = useState([
    {
        "title": "Minor Girl being forcibly married",
        "category": "Child Marriage",
        "description": "Attend to the immediate requirements of new project planning."
    },
    {
        "title": "News about transaction of individuals",
        "category": "Women & Children Trafficking",
        "description": "Finalize the proposals and funding reports."
    }]);

    const [PendingQueries, setPendingQueries] = useState([
      {
          "title": "Indecent Behaviour at Workplace",
          "category": "Harassment",
          "description": "Complete the urgent documentation for the project."
      },
      {
          "title": "Child Employees at Metal-Refining XYZ Factory",
          "category": "Child Labour",
          "description": "Routine maintenance check for the NGO's software system."
      },
      {
          "title": "Indecent Behaviour at Workplace",
          "category": "Harassment",
          "description": "Complete the urgent documentation for the project."
      },
      {
          "title": "Child Employees at Metal-Refining XYZ Factory",
          "category": "Child Labour",
          "description": "Routine maintenance check for the NGO's software system."
      },
      {
          "title": "Indecent Behaviour at Workplace",
          "category": "Harassment",
          "description": "Complete the urgent documentation for the project."
      },
      {
          "title": "Child Employees at Metal-Refining XYZ Factory",
          "category": "Child Labour",
          "description": "Routine maintenance check for the NGO's software system."
      },
  ]);
    
/*   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getQueriesFromRole', {
          method: 'GET', // The default method is 'GET', so this can be omitted if not changing
          headers: {
            'Content-Type': 'application/json', // Add any other headers you need
            'Authorization': `Bearer ${yourAuthToken}`, // Add your token here
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const result = await response.json();
        setMyQueries(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); */

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
    <div className="policePortalContainer">
      <nav>
        <ul>
          <li>
            <div className="logo">
              <span className="nav-item">POL54132</span>
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
            <button className="logout">
              <i class="fa fa-sign-out" aria-hidden="true"></i>
              <span className="nav-item">Logout</span>
            </button>
          </li>
        </ul>
      </nav>

      <section className={activeSection === 'Pending' ? 'page-active' : 'page-hidden'} id="Pending">
       <TasksContainer tasks={PendingQueries}/>
      </section>
      <section className={activeSection === 'Assigned' ? 'page-active' : 'page-hidden'} id="Assigned">
        <TasksContainer tasks={MyQueries}/>
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
            <h4>Divya</h4>
            <p>USR54132</p>
          </div>
          <div className="right">
            <div class="info">
              <h3>Information</h3>
              <div class="info_data">
                <div class="data">
                  <h4>Name:</h4>
                  <p>Smile Foundation</p>
                </div>
                <div class="data">
                  <h4>Date of Birth:</h4>
                  <p>22-09-1998</p>
                </div>
                <div class="data">
                  <h4>Email:</h4>
                  <p>alex@gmail.com</p>
                </div>
                <div class="data">
                  <h4>Phone:</h4>
                  <p>0001-0453-2423</p>
                </div>
                <div class="data">
                  <h4>Gender:</h4>
                  <p>F</p>
                </div>
                <div class="data">
                  <h4>Educational Qualification:</h4>
                  <p>Undergraduate</p>
                </div>
                <div class="data">
                  <h4>Marital Status:</h4>
                  <p>Unmarried</p>
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
              <input type="text" id="name" value="Smile Foundation" />
            </div>
            <div class="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" value="alex@gmail.com" />
            </div>
            <div class="form-group">
              <label htmlFor="phone">Phone:</label>
              <input type="text" id="phone" value="0001-0453-2423" />
            </div>
            <div class="form-group">
              <label htmlFor="address">Address:</label>
              <textarea id="address">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </textarea>
            </div>
            <div class="form-group">
              <label htmlFor="password">New Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Enter new password"
              />
            </div>
            <div class="form-group">
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
            </div>
            {/* Add remaining settings form fields */}
            <div class="form-group">
              <button type="button" onClick={() => alert("Changes saved!")}>
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
