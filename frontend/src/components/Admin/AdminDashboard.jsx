import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import {
  fetchInventory,
  fetchDepartments,
  createInventory,
  updateInventory,
  deleteInventory,
  fetchTransactions
} from '../api/api'
import EmployeeManagement from './EmployeeManagement'
import TransactionHistory from './TransactionHistory'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('inventory')
  const [inventory, setInventory] = useState([])
  const [departments, setDepartments] = useState([])
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    async function load() {
      const [items, depts, tx] = await Promise.all([
        fetchInventory(),
        fetchDepartments(),
        fetchTransactions()
      ])
      setInventory(items)
      setDepartments(depts)
      setTransactions(tx)
    }
    load()
  }, [])

  const reloadInventory = async () => {
    setInventory(await fetchInventory())
  }

  const handleAdd = async () => {
    const { value } = await Swal.fire({
      title: 'Add Item',
      html:
          '<input id="swal-name" class="swal2-input" placeholder="Name">' +
          '<select id="swal-dept" class="swal2-input">' +
          departments.map(d => `<option value="${d.id}">${d.name}</option>`).join('') +
          '</select>' +
          '<input id="swal-qty" type="number" class="swal2-input" placeholder="Quantity">',
      preConfirm: () => ({
        name: document.getElementById('swal-name').value.trim(),
        departmentId: +document.getElementById('swal-dept').value,
        quantity: +document.getElementById('swal-qty').value
      }),
      showCancelButton: true
    })
    if (value?.name && value.departmentId) {
      await createInventory(value)
      await reloadInventory()
    }
  }

  const handleEdit = async item => {
    const { value } = await Swal.fire({
      title: 'Edit Item',
      html:
          `<input id="swal-name" class="swal2-input" value="${item.name}">` +
          '<select id="swal-dept" class="swal2-input">' +
          departments
              .map(
                  d =>
                      `<option value="${d.id}"${
                          d.id === item.department?.id ? ' selected' : ''
                      }>${d.name}</option>`
              )
              .join('') +
          '</select>' +
          `<input id="swal-qty" type="number" class="swal2-input" value="${item.stock}">`,
      preConfirm: () => ({
        name: document.getElementById('swal-name').value.trim(),
        departmentId: +document.getElementById('swal-dept').value,
        quantity: +document.getElementById('swal-qty').value
      }),
      showCancelButton: true
    })
    if (value?.name && value.departmentId) {
      await updateInventory(item.id, value)
      await reloadInventory()
    }
  }

  const handleRestock = async item => {
    await updateInventory(item.id, {
      departmentId: item.department?.id,
      quantity: item.stock + 10,
      name: item.name
    })
    await reloadInventory()
  }

  const handleDelete = async id => {
    const res = await Swal.fire({
      title: 'Delete?',
      icon: 'warning',
      showCancelButton: true
    })
    if (res.isConfirmed) {
      await deleteInventory(id)
      await reloadInventory()
    }
  }

  const isLow = qty => qty < 10

  return (
      <div className="admin-container">
        <h2>Admin Dashboard</h2>
        <ul className="nav nav-tabs">
          {['inventory', 'employees', 'transactions'].map(tab => (
              <li key={tab} className="nav-item">
                <button
                    className={`nav-link${activeTab === tab ? ' active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              </li>
          ))}
        </ul>

        {activeTab === 'inventory' && (
            <>
              <button className="btn btn-primary mb-3" onClick={handleAdd}>
                + Add New Item
              </button>
              <table className="table">
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Qty</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {inventory.map(item => (
                    <tr
                        key={item.id}
                        className={isLow(item.stock) ? 'table-warning' : ''}
                    >
                      <td>{item.name}</td>
                      <td>{item.department?.name || '—'}</td>
                      <td>{item.stock}</td>
                      <td>
                        {isLow(item.stock) ? (
                            <span className="badge bg-danger">Low Stock</span>
                        ) : (
                            <span className="badge bg-success">OK</span>
                        )}
                      </td>
                      <td>
                        <button
                            className="btn btn-sm btn-success me-1"
                            onClick={() => handleRestock(item)}
                        >
                          +10
                        </button>
                        <button
                            className="btn btn-sm btn-secondary me-1"
                            onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </>
        )}

        {activeTab === 'employees' && <EmployeeManagement />}

        {activeTab === 'transactions' && (
            <TransactionHistory
                transactions={transactions}
                onRefresh={fetchTransactions}
            />
        )}
      </div>
  )
}
