import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './AdminDashboard.css';
import '../../index.css';
import { useCart } from '../../CartContext';
import api from '../../api/api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inventory');
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Milk', category: 'Dairy', quantity: 9, lowStock: false },
    { id: 2, name: 'Custom Burger', category: 'Restaurant', quantity: 12, lowStock: false },
    { id: 3, name: 'Apple', category: 'Produce', quantity: 3, lowStock: true },
  ]);

  const { applyDiscount, removeDiscount, discount } = useCart();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    Swal.fire('Logged out', 'Admin session ended.', 'info');
    navigate('/');
  };

  const handleAddNewItem = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Add New Inventory Item',
      html:
          '<div class="swal2-form">' +
          '<input id="swal-name" class="swal2-input" placeholder="Item Name" required>' +
          '<select id="swal-category" class="swal2-input">' +
          '  <option value="">Select Category</option>' +
          '  <option value="Dairy">Dairy</option>' +
          '  <option value="Restaurant">Restaurant</option>' +
          '  <option value="Produce">Produce</option>' +
          '  <option value="Other">Other</option>' +
          '</select>' +
          '<input id="swal-quantity" class="swal2-input" placeholder="Quantity" type="number" min="0">' +
          '</div>',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Add Item',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        return {
          name: document.getElementById('swal-name').value,
          category: document.getElementById('swal-category').value,
          quantity: parseInt(document.getElementById('swal-quantity').value) || 0,
        };
      },
      validationMessage: 'Please fill all required fields'
    });

    if (formValues) {
      if (!formValues.name || !formValues.category) {
        Swal.showValidationMessage('Name and category are required');
        return false;
      }

      const newItem = {
        id: Math.max(...inventory.map(item => item.id), 0) + 1,
        name: formValues.name,
        category: formValues.category,
        quantity: formValues.quantity,
        lowStock: formValues.quantity < 5
      };

      setInventory([...inventory, newItem]);

      Swal.fire({
        icon: 'success',
        title: 'Item Added!',
        text: `${newItem.name} has been added to inventory`,
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  const handleRestock = (id) => {
    setInventory(inventory.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 10, lowStock: item.quantity + 10 < 5 } : item
    ));
  };

  const handleDeleteItem = (id) => {
    Swal.fire({
      title: 'Delete Item?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setInventory(inventory.filter(item => item.id !== id));
        Swal.fire('Deleted!', 'The item has been removed.', 'success');
      }
    });
  };

  const handleEditItem = (item) => {
    Swal.fire({
      title: 'Edit Item',
      html:
          `<div class="swal2-form">
          <input id="swal-edit-name" class="swal2-input" value="${item.name}" required>
          <select id="swal-edit-category" class="swal2-input">
            <option value="Dairy" ${item.category === 'Dairy' ? 'selected' : ''}>Dairy</option>
            <option value="Restaurant" ${item.category === 'Restaurant' ? 'selected' : ''}>Restaurant</option>
            <option value="Produce" ${item.category === 'Produce' ? 'selected' : ''}>Produce</option>
            <option value="Other" ${item.category === 'Other' ? 'selected' : ''}>Other</option>
          </select>
          <input id="swal-edit-quantity" class="swal2-input" value="${item.quantity}" type="number" min="0">
        </div>`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Save Changes',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        return {
          name: document.getElementById('swal-edit-name').value,
          category: document.getElementById('swal-edit-category').value,
          quantity: parseInt(document.getElementById('swal-edit-quantity').value) || 0,
        };
      }
    }).then(({ value: formValues }) => {
      if (formValues) {
        setInventory(inventory.map(i =>
            i.id === item.id
                ? {
                  ...i,
                  name: formValues.name,
                  category: formValues.category,
                  quantity: formValues.quantity,
                  lowStock: formValues.quantity < 5
                }
                : i
        ));
        Swal.fire('Updated!', 'Item has been updated.', 'success');
      }
    });
  };

  const handleAdminDiscount = async () => {
    if (discount) {
      removeDiscount();
      Swal.fire('Success', 'Discount removed', 'success');
      return;
    }

    const { value: discountInput } = await Swal.fire({
      title: 'Apply System-Wide Discount',
      html:
          '<div class="swal2-form">' +
          '<select id="swal-discount-type" class="swal2-input">' +
          '  <option value="percentage">Percentage</option>' +
          '  <option value="fixed">Fixed Amount</option>' +
          '</select>' +
          '<input id="swal-discount-value" class="swal2-input" placeholder="Value" type="number" min="0" required>' +
          '</div>',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Apply Discount',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        return {
          type: document.getElementById('swal-discount-type').value,
          value: parseFloat(document.getElementById('swal-discount-value').value)
        };
      },
      validationMessage: 'Please enter a valid discount value'
    });

    if (discountInput) {
      applyDiscount(discountInput);
      Swal.fire(
          'Discount Applied!',
          `System-wide ${discountInput.type === 'percentage'
              ? discountInput.value + '%'
              : '$' + discountInput.value} discount activated`,
          'success'
      );
    }
  };

  return (
      <div className="admin-container">
        <button className="btn btn-outline-secondary back-button" onClick={handleLogout}>
          ← Logout
        </button>

        <div className="admin-header">
          <h2>Admin Dashboard</h2>
          <div className="admin-tabs">
            <button className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`} onClick={() => setActiveTab('inventory')}>Inventory</button>
            <button className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>Reports</button>
            <button className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>Settings</button>
          </div>
        </div>

        <div className="admin-discount-control">
          <button onClick={handleAdminDiscount} className={`btn ${discount ? 'btn-danger' : 'btn-info'}`}>
            <i className="bi bi-percent"></i> {discount ? 'Remove System Discount' : 'Apply System Discount'}
          </button>
          {discount && (
              <div className="current-discount-badge">
                Active: {discount.type === 'percentage' ? `${discount.value}%` : `$${discount.value}`} discount
              </div>
          )}
        </div>


        {activeTab === 'inventory' && (
            <div className="inventory-management">
              <div className="inventory-actions mb-4">
                <button className="btn btn-primary me-2" onClick={handleAddNewItem}>
                  <i className="bi bi-plus-circle"></i> Add New Item
                </button>
                <button className="btn btn-success me-2"><i className="bi bi-upload"></i> Import CSV</button>
                <button className="btn btn-warning"><i className="bi bi-download"></i> Export Data</button>
              </div>

              <div className="inventory-table-container">
                <table className="inventory-table">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>Item Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {inventory.map(item => (
                      <tr key={item.id} className={item.lowStock ? 'low-stock' : ''}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.quantity}</td>
                        <td>
                          {item.lowStock ? <span className="badge bg-danger">Low Stock</span> : <span className="badge bg-success">In Stock</span>}
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleRestock(item.id)}>Restock (+10)</button>
                          <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleEditItem(item)}>Edit</button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteItem(item.id)}>Delete</button>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
        )}

        {activeTab === 'reports' && (
            <div className="reports-section">
              <h4>Sales Reports</h4>
              <div className="card p-4">
                <p>Coming soon: Daily, weekly, and monthly sales reports</p>
              </div>
            </div>
        )}

        {activeTab === 'settings' && (
            <div className="settings-section">
              <h4>System Settings</h4>
              <div className="card p-4">
                <p>Coming soon: POS configuration options</p>
              </div>
            </div>
        )}
      </div>
  );
}
