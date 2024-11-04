import React, { useState, useEffect } from "react";
import "User-Portal.css";

function UserPortal() {
  function navigateTo(section) {
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => {
        sec.classList.add('page-hidden');
        sec.classList.remove('page-active');
    });

    const activeSection = document.getElementById(section);
    activeSection.classList.remove('page-hidden');
    activeSection.classList.add('page-active');

    // Clear the task containers only for My Queries section, since Register a Plea won't load tasks
    if (section === 'Assigned') {
        document.getElementById('assignedTasksContainer').innerHTML = '';
        loadTasks('assignedTasksContainer', MyQueries);
    }
}

document.getElementById('pleaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const victimName = document.getElementById('victimName').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const dob = document.getElementById('dob').value;
    const age = document.getElementById('age').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const maritalStatus = document.querySelector('input[name="maritalStatus"]:checked').value;
    const education = document.getElementById('education').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;

    const newTask = {
        title: victimName,
        category: category,
        description: `${description}\nGender: ${gender}, DOB: ${dob}, Age: ${age}, Phone: ${phone}, Email: ${email}, Marital Status: ${maritalStatus}, Education: ${education}, Address: ${address}, City: ${city}, State: ${state}`
    };

    MyQueries.push(newTask);
    document.getElementById('pleaForm').reset();
    loadTasks('assignedTasksContainer', MyQueries);
});

function loadTasks(containerId, tasks) {
    let tasksContainer = document.getElementById(containerId);
    tasksContainer.innerHTML = '';  
    tasks.forEach((task) => {
        let taskBlock = document.createElement('div');
        taskBlock.className = 'task-block card';

        let taskTitle = document.createElement('h3');
        taskTitle.innerHTML = task.title;
        taskTitle.className = 'task-title';
        taskBlock.appendChild(taskTitle);

        let taskCategory = document.createElement('p');
        taskCategory.innerHTML = '<strong>Category:</strong> ' + task.category;
        taskCategory.className = 'task-category';
        taskBlock.appendChild(taskCategory);

        let taskDescription = document.createElement('p');
        taskDescription.innerHTML = '<strong>Description:</strong> ' + task.description;
        taskDescription.className = 'task-description';

        let acceptButton = document.createElement('button');
        acceptButton.className = 'accept-btn';
        acceptButton.innerHTML = 'Accept';
        acceptButton.style.background = 'green';
        acceptButton.style.color = 'white';
        acceptButton.style.padding = '15px';
        acceptButton.style.borderRadius = '10px';
        acceptButton.style.cursor = 'pointer';

        let rejectButton = document.createElement('button');
        rejectButton.className = 'reject-btn';
        rejectButton.innerHTML = 'Reject';
        rejectButton.style.background = 'orangered';
        rejectButton.style.color = 'white';
        rejectButton.style.padding = '15px';
        rejectButton.style.borderRadius = '10px';
        rejectButton.style.cursor = 'pointer';

        let viewMoreButton = document.createElement('button');
        viewMoreButton.className = 'view-more-btn';
        viewMoreButton.innerHTML = 'View More';
        viewMoreButton.style.background = 'blue';
        viewMoreButton.style.color = 'white';
        viewMoreButton.style.padding = '15px';
        viewMoreButton.style.width = '200px';
        viewMoreButton.style.borderRadius = '10px';
        viewMoreButton.style.cursor = 'pointer';
        viewMoreButton.addEventListener('click', function() {
            showModal(task.title, task.category, task.description);
        });
        
        taskBlock.appendChild(acceptButton);
        taskBlock.appendChild(rejectButton);
        taskBlock.appendChild(viewMoreButton);
        
        tasksContainer.appendChild(taskBlock);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadTasks('assignedTasksContainer', MyQueries); 
});

const MyQueries = [
    {
        "title": "Minor Girl being forcibly married",
        "category": "Child Marriage",
        "description": "Attend to the immediate requirements of new project planning."
    },
    {
        "title": "News about transaction of individuals",
        "category": "Women & Children Trafficking",
        "description": "Finalize the proposals and funding reports."
    }
];

document.getElementById('Pending').addEventListener('click', function() {
    document.getElementById('PendingTask').classList.remove('hidden');
    document.getElementById('AssignedTask').classList.add('hidden');
    loadTasks('pending-tasks-container', pendingTasks);
    this.classList.add('active');
    document.getElementById('Assigned').classList.remove('active');
});

document.getElementById('My-Query').addEventListener('click', function() {
    document.getElementById('PendingTask').classList.add('hidden');
    document.getElementById('AssignedTask').classList.remove('hidden');
    loadTasks('assigned-tasks-container', assignedTasks);
    this.classList.add('active');
    document.getElementById('Pending').classList.remove('active');
});


function showModal(title, category, description) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalCategoryValue').innerText = category;
    document.getElementById('modalDescriptionValue').innerText = description;
    document.getElementById('myModal').style.display = "block";
    const closeModal = document.getElementsByClassName("close")[0];
    closeModal.onclick = function() {
        document.getElementById('myModal').style.display = "none"; 
    };
}

function saveChanges() {
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
}


  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <a href="#" className="logo">
              <span className="nav-item">USR54132</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={() => navigateTo("RegisterPlea")}>
              <span className="nav-item" id="Pending">
                Register A Plea
              </span>
            </a>
          </li>
          <li>
            <a href="#" onClick={() => navigateTo("Assigned")}>
              <span className="nav-item" id="My-Query">
                My Queries
              </span>
            </a>
          </li>
          <li>
            <a href="#" onClick={() => navigateTo("HowToUse")}>
              <span className="nav-item">How to Use?</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={() => navigateTo("Profile")}>
              <span className="nav-item">My Profile</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={() => navigateTo("Settings")}>
              <span className="nav-item">Settings</span>
            </a>
          </li>
          <li>
            <a href="#" className="logout">
              <span className="nav-item">Logout</span>
            </a>
          </li>
        </ul>
      </nav>

      <section id="RegisterPlea">
          <form className="pleaForm" onSubmit={handlePleaSubmit}>
            {/* Form content as per original HTML */}
            <div className="form-group">
              <label for="victimName">Victim's Name:</label>
              <input type="text" id="victimName" name="victimName" required />
            </div>
            <div class="form-group">
              <label>Gender:</label>
              <div class="radio-group">
                <label>
                  <input type="radio" name="gender" value="Male" /> Male
                </label>
                <label>
                  <input type="radio" name="gender" value="Female" /> Female
                </label>
              </div>
            </div>
            <div class="form-group">
              <label for="dob">Date of Birth:</label>
              <input type="date" id="dob" required />
            </div>
            <div class="form-group">
              <label for="phone">Phone:</label>
              <input type="tel" id="phone" required />
            </div>
            <div class="form-group">
              <label for="email">Email Address:</label>
              <input type="email" id="email" required />
            </div>
            <div class="form-group">
              <label>Marital Status:</label>
              <div class="radio-group">
                <label>
                  <input type="radio" name="maritalStatus" value="Minor" />
                  Minor
                </label>
                <label>
                  <input type="radio" name="maritalStatus" value="Unmarried" />
                  Unmarried
                </label>
                <label>
                  <input type="radio" name="maritalStatus" value="Married" />
                  Married
                </label>
              </div>
            </div>
            <div class="form-group">
              <label for="education">Educational Qualification:</label>
              <select id="education" required>
                <option value="None">Schooling Not Completed</option>
                <option value="Primary">10th Grade Pass</option>
                <option value="Secondary">12th Grade Pass</option>
                <option value="Diploma">Diploma</option>
                <option value="UG">Undergraduate</option>
                <option value="PG">Graduate/PostGraduate</option>
              </select>
            </div>
            <div class="form-group">
              <label for="address">Residential Address:</label>
              <textarea id="address" required></textarea>
            </div>
            <div class="form-group">
              <label for="city">City/Town:</label>
              <input type="text" id="city" required />
            </div>
            <div class="form-group">
              <label for="state">State:</label>
              <input type="text" id="state" required />
            </div>
            <div class="form-group">
              <label for="category">Category:</label>
              <select id="category" required>
                <option value="Harassment">Harassment</option>
                <option value="Forced Labour">Forced Labour</option>
                <option value="Human Trafficking">Human Trafficking</option>
                <option value="Child Marriage">Child Marriage</option>
                <option value="Domestic Violence">Domestic Violence</option>
                <option value="Dowry">Dowry</option>
                <option value="Assistance">Rehabilitation-Assistance</option>
              </select>
            </div>
            <div class="form-group">
              <label for="description">Description:</label>
              <textarea id="description" required></textarea>
            </div>
            <div class="form-group">
              <label for="file">Choose File:</label>
              <input type="file" id="file" required />
            </div>
            {/* Add remaining form fields */}
            <button type="submit">Submit</button>
          </form>
        </section>
        <section id="Assigned" className="page-hidden">
          <div className="main-skills" id="assignedTasksContainer"></div>
        </section>
        <section id="HowToUse" className="page-hidden">
          <div className="home-use">
            <h1 id="Pending">Pending Queries</h1>
            <div class="main-skills">
              <div class="card">
                <h3 class="task-title">Case Name</h3>
                <p class="task-category">
                  <strong>Category:</strong>Category Name
                </p>
                <button class="accept-button">Accept!</button>
                <button class="reject-button">Reject!</button>
                <button class="view-more-btn">View More</button>
              </div>
            </div>
            <div id="Accept">
              <button class="accept-button">Accept!</button>
              <p>
                Transfers Query from <strong>Pending Queries</strong> to{" "}
                <strong>My Queries</strong>
              </p>
            </div>
            <div id="Reject">
              <button class="reject-button">Reject!</button>
              <p>
                Sends Query back to <strong>Admin</strong>
              </p>
            </div>
            <div id="View-More">
              <button class="view-more-btn">View More</button>
              <p>
                Opens a <strong>Modal Window</strong> to View Query Details
              </p>
            </div>
            <h1 id="MyQueries">My Queries</h1>
            <div class="main-skills">
              <div class="card">
                <h3 class="task-title">Case Name</h3>
                <p class="task-category">
                  <strong>Category:</strong>Category Name
                </p>
                <button class="accept-button">Resolved</button>
                <button class="reject-button">Decline</button>
                <button class="view-more-btn">View More</button>
              </div>
            </div>
            <div id="Accept">
              <button class="accept-button">Resolved</button>
              <p>
                Case <strong>Resolved</strong>
              </p>
            </div>
            <div id="Reject">
              <button class="reject-button">Decline</button>
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
        <section id="Profile" className="page-hidden">
          <div className="wrapper">
            <div className="left">
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
        <section id="Settings" className="page-hidden">
          <div className="wrapper-settings">
            <form id="settingsForm">
              <div className="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" value="Smile Foundation" />
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" value="alex@gmail.com" />
              </div>
              <div class="form-group">
                <label for="phone">Phone:</label>
                <input type="text" id="phone" value="0001-0453-2423" />
              </div>
              <div class="form-group">
                <label for="address">Address:</label>
                <textarea id="address">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </textarea>
              </div>
              <div class="form-group">
                <label for="password">New Password:</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter new password"
                />
              </div>
              <div class="form-group">
                <label for="gender">Gender:</label>
                <select id="gender">
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label for="marital-status">Marital Status:</label>
                <select id="marital-status">
                  <option value="Unmarried">Unmarried</option>
                  <option value="Married">Married</option>
                  <option value="Minor">Minor</option>
                </select>
              </div>
              <div class="form-group">
                <label for="education">Educational Qualification:</label>
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

export default UserPortal;
