import React, { useState } from 'react';

function TasksContainer({ tasks }) {
    const [modalData, setModalData] = useState(null);

    const handleViewMoreClick = (task) => {
        setModalData(task);
    };

    const closeModal = () => {
        setModalData(null);
    };

    return (
        <div className="main-skills" id="assignedTasksContainer">
            {/* Render tasks */}
            {tasks.map((task) => (
                <div key={task.id} className="task-block-card">
                    <h3 className="task-title">{task.title}</h3>
                    <p className="task-category"><strong>Category:</strong> {task.category}</p>

                    <button className="accept-btn">Accept</button>
                    <button className="reject-btn">Reject</button>
                    <button className="view-more-btn"
                        onClick={() => handleViewMoreClick(task)}>
                        View More
                    </button>
                </div>
            ))}

            {/* Modal */}
            {modalData && (
                <div className="modal" id="myModal" style={{ display: 'block' }}>
                    <div className="modal-content">
                        {/* <span className="close" onClick={closeModal}>&times;</span>
                        <h3 id="modalTitle">{modalData.title}</h3>
                        <p id="modalCategoryValue"><strong>Category:</strong> {modalData.category}</p>
                        <p id="modalDescriptionValue"><strong>Description:</strong> {modalData.description}</p> */}
                        <span class="close" onClick={closeModal}>&times;</span>
                        <h2 id="modalTitle">{modalData.title}</h2>
                        <p id="modalCategory"><strong>Category: </strong><span id="modalCategoryValue">{modalData.category}</span></p>
                        <p id="modalDescription"><strong>Description: </strong><span id="modalDescriptionValue">{modalData.description}</span></p>
                        <p id="modalName"><strong>Name: </strong><span id="modalNameValue">{modalData.name}</span></p>
                        <p id="modalGender"><strong>Gender: </strong><span id="modalGenderValue">{modalData.gender}</span></p>
                        <p id="modalDOB"><strong>DOB: </strong><span id="modalDOBValue">{modalData.dob}</span></p>
                        <p id="modalPhone"><strong>Phone: </strong><span id="modalPhoneValue">{modalData.phone}</span></p>
                        <p id="modalEmail"><strong>Email: </strong><span id="modalEmailValue">{modalData.email}</span></p>
                        <p id="modalMarital"><strong>Marital Status: </strong><span id="modalMaritalValue">{modalData.marital}</span></p>
                        <p id="modalEducation"><strong>Education: </strong><span id="modalEducationValue">{modalData.education}</span></p>
                        <p id="modalAddress"><strong>Address: </strong><span id="modalAddressValue">{modalData.address}</span></p>
                        <p id="modalCity"><strong>City/Town: </strong><span id="modalCityValue">{modalData.city}</span></p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TasksContainer;
/* 
<div id="myModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <h2 id="modalTitle">Modal Title</h2>
    <p id="modalCategory">Category: <span id="modalCategoryValue"></span></p>
    <p id="modalDescription">Description: <span id="modalDescriptionValue"></span></p>
    <p id="modalName">Name: <span id="modalNameValue"></span></p>
    <p id="modalGender">Gender: <span id="modalGenderValue"></span></p>
    <p id="modalDOB">DOB: <span id="modalDOBValue"></span></p>
    <p id="modalPhone">Phone: <span id="modalPhoneValue"></span></p>
    <p id="modalEmail">Email: <span id="modalEmailValue"></span></p>
    <p id="modalMarital">Marital Status: <span id="modalMaritalValue"></span></p>
    <p id="modalEducation">Education: <span id="modalEducationValue"></span></p>
    <p id="modalAddress">Address: <span id="modalAddressValue"></span></p>
    <p id="modalCity">City/Town: <span id="modalCityValue"></span></p>
  </div>
</div>
 */