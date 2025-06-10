import React from 'react';
import './DepartmentSelection.css';

function DepartmentSelection({ trigger, setTrigger, onSelectDepartment }) {
  const departments = [
    { id: 1, name: 'Sales' },
    { id: 2, name: 'Information Technology' },
    { id: 3, name: 'Finance' },
    { id: 4, name: 'Management' }
  ];

  return trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button 
          className="close-btn" 
          onClick={() => setTrigger(false)}
        >
          ×
        </button>
        <h3>Select Department</h3>
        <ul className="department-list">
          {departments.map((dept) => (
            <li 
              key={dept.id}
              className="department-item"
              onClick={() => {
                onSelectDepartment(dept);
                setTrigger(false);
              }}
            >
              {dept.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : null;
}

export default DepartmentSelection;