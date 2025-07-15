import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './EmployeeManagement.css';

export default function EmployeeManagement({ onBack }) {
    const [employees, setEmployees] = useState([
        { id: 1, name: 'John Doe', position: 'Manager', email: 'john@example.com', phone: '555-0101', status: 'Active' },
        { id: 2, name: 'Jane Smith', position: 'Cashier', email: 'jane@example.com', phone: '555-0102', status: 'Active' },
        { id: 3, name: 'Bob Johnson', position: 'Other', email: 'bob@example.com', phone: '555-0103', status: 'Inactive' },
    ]);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter employees based on search term
    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddEmployee = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Add New Employee',
            html:
                `<div class="swal2-form">
        <input id="swal-name" class="swal2-input" placeholder="Full Name" required>
        <select id="swal-position" class="swal2-input">
          <option value="">Select Position</option>
          <option value="Manager">Manager</option>
          <option value="Cashier">Cashier</option>
          <option value="Other">Other</option>
        </select>
        <input id="swal-email" class="swal2-input" placeholder="Email" type="email">
        <input id="swal-phone" class="swal2-input" placeholder="Phone">
        <select id="swal-status" class="swal2-input">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Add Employee',
            cancelButtonText: 'Cancel',
            preConfirm: () => {
                return {
                    name: document.getElementById('swal-name').value,
                    position: document.getElementById('swal-position').value,
                    email: document.getElementById('swal-email').value,
                    phone: document.getElementById('swal-phone').value,
                    status: document.getElementById('swal-status').value
                };
            }
        });

        if (formValues) {
            if (!formValues.name || !formValues.position) {
                Swal.showValidationMessage('Name and position are required');
                return false;
            }

            const newEmployee = {
                id: Math.max(...employees.map(emp => emp.id), 0) + 1,
                ...formValues
            };

            setEmployees([...employees, newEmployee]);
            Swal.fire('Success!', 'Employee added successfully', 'success');
        }
    };

    const handleEditEmployee = (employee) => {
        Swal.fire({
            title: 'Edit Employee',
            html:
                `<div class="swal2-form">
        <input id="swal-edit-name" class="swal2-input" value="${employee.name}" required>
        <select id="swal-edit-position" class="swal2-input">
          <option value="Manager" ${employee.position === 'Manager' ? 'selected' : ''}>Manager</option>
          <option value="Cashier" ${employee.position === 'Cashier' ? 'selected' : ''}>Cashier</option>
          <option value="Other" ${employee.position === 'Other' ? 'selected' : ''}>Other</option>
        </select>
        <input id="swal-edit-email" class="swal2-input" value="${employee.email}" type="email">
        <input id="swal-edit-phone" class="swal2-input" value="${employee.phone}">
        <select id="swal-edit-status" class="swal2-input">
          <option value="Active" ${employee.status === 'Active' ? 'selected' : ''}>Active</option>
          <option value="Inactive" ${employee.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
        </select>
      </div>`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Save Changes',
            cancelButtonText: 'Cancel',
            preConfirm: () => {
                return {
                    name: document.getElementById('swal-edit-name').value,
                    position: document.getElementById('swal-edit-position').value,
                    email: document.getElementById('swal-edit-email').value,
                    phone: document.getElementById('swal-edit-phone').value,
                    status: document.getElementById('swal-edit-status').value
                };
            }
        }).then(({ value: formValues }) => {
            if (formValues) {
                setEmployees(employees.map(emp =>
                    emp.id === employee.id ? { ...emp, ...formValues } : emp
                ));
                Swal.fire('Updated!', 'Employee details updated.', 'success');
            }
        });
    };

    const handleDeleteEmployee = (id) => {
        Swal.fire({
            title: 'Delete Employee?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setEmployees(employees.filter(emp => emp.id !== id));
                Swal.fire('Deleted!', 'Employee record has been removed.', 'success');
            }
        });
    };

    return (
        <div className="employee-management-container">
            <div className="employee-header">
                <h2>Employee Management</h2>
                <div className="employee-actions">
                    <button className="btn btn-primary me-2" onClick={handleAddEmployee}>
                        <i className="bi bi-person-plus"></i> Add Employee
                    </button>
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search employees..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="form-control"
                        />
                        <i className="bi bi-search search-icon"></i>
                    </div>
                </div>
            </div>

            <div className="employee-table-container">
                <table className="employee-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Contact</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredEmployees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.position}</td>
                            <td>
                                <div>{employee.email}</div>
                                <div className="text-muted small">{employee.phone}</div>
                            </td>
                            <td>
                  <span className={`status-badge ${employee.status === 'Active' ? 'active' : 'inactive'}`}>
                    {employee.status}
                  </span>
                            </td>
                            <td>
                                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEditEmployee(employee)}>
                                    <i className="bi bi-pencil"></i> Edit
                                </button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteEmployee(employee.id)}>
                                    <i className="bi bi-trash"></i> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}