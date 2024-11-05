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
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h3 id="modalTitle">{modalData.title}</h3>
                        <p id="modalCategoryValue"><strong>Category:</strong> {modalData.category}</p>
                        <p id="modalDescriptionValue"><strong>Description:</strong> {modalData.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TasksContainer;
