import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import {
    fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from '../api/api'
import './EmployeeManagement.css'

export default function EmployeeManagement() {
    const [employees, setEmployees] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => { load() }, [])

    async function load() {
        try {
            const data = await fetchEmployees()
            setEmployees(data)
        } catch(err) {
            console.error(err)
            Swal.fire('Error','Could not load employees','error')
        }
    }

    async function handleAdd() {
        const { value: vals } = await Swal.fire({
            title: 'Add New Employee',
            html: `
        <input id="swal-name" class="swal2-input" placeholder="Username" required>
        <select id="swal-role" class="swal2-input">
          <option value="">Select Role</option>
          <option>MANAGER</option>
          <option>CASHIER</option>
        </select>
        <input id="swal-pin" class="swal2-input" placeholder="PIN" required>
      `,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => ({
                username: document.getElementById('swal-name').value,
                role:     document.getElementById('swal-role').value,
                passwordHash: document.getElementById('swal-pin').value
            })
        })
        if (vals && vals.username && vals.role && vals.passwordHash) {
            try {
                await createEmployee(vals)
                Swal.fire('Added!','','success')
                load()
            } catch {
                Swal.fire('Error','Could not add','error')
            }
        }
    }

    function handleEdit(emp) {
        Swal.fire({
            title: 'Edit Employee',
            html: `
        <input id="swal-name"  class="swal2-input" value="${emp.username}" required>
        <select id="swal-role" class="swal2-input">
          <option ${emp.role==='MANAGER'?'selected':''}>MANAGER</option>
          <option ${emp.role==='CASHIER'?'selected':''}>CASHIER</option>
        </select>
      `,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => ({
                username: document.getElementById('swal-name').value,
                role:     document.getElementById('swal-role').value,
                passwordHash: emp.passwordHash  // keep existing PIN
            })
        }).then(async ({ value: vals }) => {
            if (vals) {
                try {
                    await updateEmployee(emp.id, vals)
                    Swal.fire('Updated!','','success')
                    load()
                } catch {
                    Swal.fire('Error','Could not update','error')
                }
            }
        })
    }

    function handleDelete(id) {
        Swal.fire({
            title: 'Delete?',
            icon: 'warning',
            showCancelButton: true
        }).then(async res => {
            if (res.isConfirmed) {
                try {
                    await deleteEmployee(id)
                    Swal.fire('Deleted!','','success')
                    load()
                } catch {
                    Swal.fire('Error','Could not delete','error')
                }
            }
        })
    }

    const filtered = employees.filter(e =>
        e.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.role.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="employee-management-container">
            <div className="employee-header">
                <h2>Employee Management</h2>
                <button className="btn btn-primary" onClick={handleAdd}>
                    Add Employee
                </button>
                <input
                    className="form-control ms-3"
                    placeholder="Search…"
                    value={searchTerm}
                    onChange={e=>setSearchTerm(e.target.value)}
                />
            </div>

            <table className="employee-table">
                <thead>
                <tr><th>ID</th><th>Username</th><th>Role</th><th>Actions</th></tr>
                </thead>
                <tbody>
                {filtered.map(emp=>(
                    <tr key={emp.id}>
                        <td>{emp.id}</td>
                        <td>{emp.username}</td>
                        <td>{emp.role}</td>
                        <td>
                            <button onClick={()=>handleEdit(emp)} className="btn btn-sm btn-outline-primary me-2">
                                Edit
                            </button>
                            <button onClick={()=>handleDelete(emp.id)} className="btn btn-sm btn-outline-danger">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
