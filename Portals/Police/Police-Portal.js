function navigateTo(section) {
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => {
        sec.classList.add('page-hidden');
        sec.classList.remove('page-active');
    });

    const activeSection = document.getElementById(section);
    activeSection.classList.remove('page-hidden');
    activeSection.classList.add('page-active');

    // Clear the task containers
    document.getElementById('pendingTasksContainer').innerHTML = '';
    document.getElementById('assignedTasksContainer').innerHTML = '';

    // Load tasks based on the section
    if (section === 'Home') {
        loadTasks('pendingTasksContainer', PendingQueries);
    } else if (section === 'Assigned') {
        loadTasks('assignedTasksContainer', MyQueries);
    }
}

const PendingQueries = [
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
];

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
        viewMoreButton.style.width =  '200px';
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
    loadTasks('pendingTasksContainer', PendingQueries); 
});

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

    document.querySelector('.wrapper .right .info_data .data:nth-child(1) p').innerText = name;
    document.querySelector('.wrapper .right .info_data .data:nth-child(3) p').innerText = email;
    document.querySelector('.wrapper .right .info_data .data:nth-child(4) p').innerText = phone;
    document.querySelector('.wrapper .right .projects_data .data p').innerText = address;

    navigateTo('Profile');
}



