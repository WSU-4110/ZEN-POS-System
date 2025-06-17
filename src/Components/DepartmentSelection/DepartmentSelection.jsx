import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DepartmentSelection.css';

function DepartmentSelection() {
  const navigate = useNavigate();
  const departments = [
    { id: 1, name: 'Sales' },
    { id: 2, name: 'Information Technology' },
    { id: 3, name: 'Finance' },
    { id: 4, name: 'Management' }
  ];

  const handleSelectDepartment = (dept) => {
    console.log('Selected department:', dept);
    // Navigate to the appropriate page based on department
    navigate('/items'); // Or wherever you want to go after selection
  };

  return (
    <div className="department-selection-container">
      <h2 className="department-title">Select Your Department</h2>
      <div className="department-grid">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="department-card"
            onClick={() => handleSelectDepartment(dept)}
          >
            <div className="department-name">{dept.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DepartmentSelection;